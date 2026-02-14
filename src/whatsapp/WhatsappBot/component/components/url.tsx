import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

// MUI MATERIAL
import { Tooltip } from "@mui/material";

// ICONS
import { AiOutlineEye } from "react-icons/ai";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// COMPONENTS
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";

// ASSETS
import files from "@/assets/animation/Files.json";

export const Url = ({
  id,
  nodesInputData,
  setNodesInputData,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selectedOption: nodesInputData[id]?.selectedOption,
        // variableId: nodesInputData[id]?.variableName,
      },
    }));
    // type = nodesInputData[id]?.type;
    // variableId = nodesInputData[id]?.variableName;
  }, []);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        fileUrl: file,
      },
    }));
  };
  // under your other refs
  const [listMode, setListMode] = React.useState<
    Record<string | number, boolean>
  >({});

  function updateBody(newVal: string) {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: { ...prev[id], urlbuttonbody: newVal },
    }));
  }

  function addFormat(formatType: "bold" | "italic" | "strike" | "list") {
    const el = inputRef.current;
    if (!el) return;

    const input = nodesInputData[id]?.urlbuttonbody || "";
    if (input.length >= 1024) return;

    const startSel = el.selectionStart ?? 0;
    const endSel = el.selectionEnd ?? 0;

    const tokens = {
      bold: { start: "*", end: "*" },
      italic: { start: "_", end: "_" },
      strike: { start: "~", end: "~" },
    } as const;

    if (formatType !== "list") {
      const fmt = tokens[formatType];
      if (!fmt) return;

      if (startSel === endSel) {
        const newVal =
          input.slice(0, startSel) + fmt.start + fmt.end + input.slice(endSel);
        updateBody(newVal);
        requestAnimationFrame(() => {
          const pos = startSel + fmt.start.length;
          el.setSelectionRange(pos, pos);
          el.focus();
        });
        return;
      }

      const selected = input.slice(startSel, endSel);
      const newVal =
        input.slice(0, startSel) +
        fmt.start +
        selected +
        fmt.end +
        input.slice(endSel);

      updateBody(newVal);
      requestAnimationFrame(() => {
        const newStart = startSel + fmt.start.length;
        const newEnd = endSel + fmt.start.length;
        el.setSelectionRange(newStart, newEnd);
        el.focus();
      });
      return;
    }

    // LIST handling
    const hasSelection = startSel !== endSel;
    if (hasSelection) {
      const selected = input.slice(startSel, endSel);
      const transformed = selected
        .split(/\r?\n/)
        .map((l) => (l.trim().length ? (l.startsWith("- ") ? l : `- ${l}`) : l))
        .join("\n");

      const newVal =
        input.slice(0, startSel) + transformed + input.slice(endSel);
      updateBody(newVal);

      requestAnimationFrame(() => {
        el.setSelectionRange(startSel, startSel + transformed.length);
        el.focus();
      });
    } else {
      const insert = "- ";
      const newVal = input.slice(0, startSel) + insert + input.slice(startSel);
      updateBody(newVal);
      setListMode((m) => ({ ...m, [id]: true }));

      requestAnimationFrame(() => {
        const pos = startSel + insert.length;
        el.setSelectionRange(pos, pos);
        el.focus();
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!listMode[id]) return;

    const el = e.currentTarget;
    const value = el.value;
    const { selectionStart, selectionEnd } = el;

    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const nextNl = value.indexOf("\n", selectionStart);
    const lineEnd = nextNl === -1 ? value.length : nextNl;
    const currentLine = value.slice(lineStart, lineEnd);

    if (e.key === "Enter") {
      e.preventDefault();

      const trimmed = currentLine.trim();
      if (!trimmed || trimmed === "-") {
        const newVal =
          value.slice(0, selectionStart) + "\n" + value.slice(selectionEnd);
        updateBody(newVal);
        setListMode((m) => ({ ...m, [id]: false }));
        requestAnimationFrame(() => {
          const pos = selectionStart + 1;
          el.setSelectionRange(pos, pos);
          el.focus();
        });
        return;
      }

      const insert = "\n- ";
      const newVal =
        value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
      updateBody(newVal);
      requestAnimationFrame(() => {
        const pos = selectionStart + insert.length;
        el.setSelectionRange(pos, pos);
        el.focus();
      });
    }

    if (e.key === "Backspace") {
      const caretInFirstTwo = selectionStart - lineStart <= 2;
      const startsWithDash = currentLine.startsWith("- ");

      if (caretInFirstTwo && startsWithDash) {
        e.preventDefault();
        const withoutDash = currentLine.replace(/^-\s?/, "");
        const newVal =
          value.slice(0, lineStart) + withoutDash + value.slice(lineEnd);
        updateBody(newVal);

        const shouldExit = withoutDash.trim().length === 0;
        if (shouldExit) setListMode((m) => ({ ...m, [id]: false }));

        requestAnimationFrame(() => {
          el.setSelectionRange(lineStart, lineStart);
          el.focus();
        });
      }
    }
  }

  function insertEmoji(emoji: string) {
    const el = inputRef.current;
    if (!el) return;

    const input = nodesInputData[id]?.urlbuttonbody || "";
    if (input.length >= 1024) return;

    const start = el.selectionStart ?? input.length;
    const end = el.selectionEnd ?? input.length;

    const newText = input.substring(0, start) + emoji + input.substring(end);
    updateBody(newText);

    requestAnimationFrame(() => {
      const pos = start + emoji.length;
      el.setSelectionRange(pos, pos);
      el.focus();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="w-1/3">
          <AnimatedDropdown
            id="type"
            name="type"
            label="Type"
            tooltipContent="Select URL Type"
            options={[
              //   { label: "Text", value: "text" },
              { label: "Image", value: "image" },
              { label: "Video", value: "video" },
              { label: "Document", value: "document" },
            ]}
            value={nodesInputData[id]?.urlbuttonType}
            onChange={(e: any) => {
              setNodesInputData((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  urlbuttonType: e,
                  fileUrl: "",
                },
              }));
            }}
          />
        </div>
        {(nodesInputData[id]?.urlbuttonType === "image" ||
          nodesInputData[id]?.urlbuttonType === "document" ||
          nodesInputData[id]?.urlbuttonType === "video") && (
          <>
            <div className="w-1/3">
              <AnimatedDropdown
                id="selectChoice"
                name="selectChoice"
                tooltipContent="Select Choice"
                label="Select Choice"
                options={[
                  { value: "url", label: "Enter Url" },
                  { value: "upload", label: "Upload" },
                ]}
                value={nodesInputData[id]?.selectedOption}
                onChange={(e) => {
                  setNodesInputData(() => ({
                    ...nodesInputData,
                    [id]: {
                      ...nodesInputData[id],
                      selectedOption: e,
                      text: "",
                      fileUrl: "",
                    },
                  }));
                }}
              />
            </div>
            {nodesInputData[id]?.selectedOption === "upload" && (
              <div className="flex items-end gap-2">
                <div className="flex flex-col gap-2 mt-0">
                  <Label
                    htmlFor="uplaodfile"
                    className="text-sm font-medium text-gray-800 font-"
                  >
                    Upload File
                  </Label>
                  <Input
                    type="file"
                    id="uplaodfile"
                    name="uplaodfile"
                    onChange={handleFileUpload}
                    accept={`${nodesInputData[id]?.type}/*`}
                    required
                    ref={fileRef}
                    className="w-[250px]"
                  />
                </div>
                {/* <button onClick={() => {}} className="cursor-pointer">
                  <AiOutlineEye size={20} className="text-green-700" />
                </button> */}
              </div>
            )}

            {nodesInputData[id]?.selectedOption === "url" && (
              <div className="flex items-end gap-2">
                <InputField
                  id="text"
                  name="text"
                  tooltipContent="Enter URL of media"
                  label={"URL"}
                  value={nodesInputData[id]?.fileUrl}
                  onChange={(e: { target: { value: any } }) => {
                    setNodesInputData((prev) => ({
                      ...prev,
                      [id]: {
                        ...prev[id],
                        fileUrl: e.target.value,
                      },
                    }));
                  }}
                />
                {/* <button onClick={() => {}} className="cursor-pointer">
                  <AiOutlineEye size={20} className="text-green-700" />
                </button> */}
              </div>
            )}
          </>
        )}
        {/* {nodesInputData[id]?.urlbuttonType === "text" && (
          <div className="flex items-end gap-2 w-full">
            <InputField
              id="text"
              name="text"
              tooltipContent="Max 20 characters"
              label={"URL Header"}
              value={nodesInputData[id]?.urlbuttonText}
              onChange={(e: { target: { value: any } }) => {
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    urlbuttonText: e.target.value,
                  },
                }));
              }}
              maxLength="20"
            />
            <p className="text-xs">
              {nodesInputData[id]?.text?.length || 0}/20
            </p>
          </div>
        )} */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div>
            <label className="text-sm font-medium text-gray-900 mb-2 ml-2">
              Body Text
            </label>
            <Textarea
              id="body"
              placeholder="Body Text"
              value={nodesInputData[id]?.urlbuttonbody}
              onChange={(e: { target: { value: any } }) => {
                setNodesInputData((prev) => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    urlbuttonbody: e.target.value,
                  },
                }));
              }}
              className="resize-none h-50 mt-2"
              maxLength={1024}
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
            <div className="flex justify-between">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2 mt-2 bg-white border border-slate-200 rounded-xl px-2 py-2 shadow w-max"
              >
                <Tooltip title="Bold" arrow>
                  <button
                    onClick={() => addFormat("bold")}
                    className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
                  >
                    <FormatBoldOutlined fontSize="small" />
                  </button>
                </Tooltip>
                <Tooltip title="Italic" arrow>
                  <button
                    onClick={() => addFormat("italic")}
                    className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
                  >
                    <FormatItalicOutlined fontSize="small" />
                  </button>
                </Tooltip>
                <Tooltip title="Strikethrough" arrow>
                  <button
                    onClick={() => addFormat("strike")}
                    className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
                  >
                    <FormatStrikethroughOutlined fontSize="small" />
                  </button>
                </Tooltip>
                <Tooltip title="List" arrow>
                  <button
                    onClick={() => addFormat("list")}
                    className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
                  >
                    <FormatListBulletedIcon fontSize="small" />
                  </button>
                </Tooltip>
                <div className="w-px h-5 bg-slate-300 mx-1"></div>
                <Tooltip title="Emoji Picker" arrow>
                  <CustomEmojiPicker position="top" onSelect={insertEmoji} />
                </Tooltip>
              </motion.div>
              <p className="text-xs mt-2">
                {nodesInputData[id]?.urlbuttonbody?.length || 0}/1024
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-54 rounded-lg p-2 ">
          {(!nodesInputData[id]?.urlbuttonType ||
            !nodesInputData[id]?.fileUrl) && (
            <div className="w-full h-full flex items-center justify-center border border-gray-300 rounded-lg mt-0 md:mt-12">
              <Lottie
                animationData={files}
                loop
                autoplay
                className="w-24 h-24"
              />
            </div>
          )}
          {nodesInputData[id]?.urlbuttonType === "video" &&
            nodesInputData[id]?.fileUrl && (
              <video
                src={
                  nodesInputData[id]?.fileUrl
                    ? /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(
                        nodesInputData[id]?.fileUrl
                      )
                      ? nodesInputData[id]?.urlbuttonMediaUrl
                      : URL.createObjectURL(nodesInputData[id]?.fileUrl)
                    : ""
                }
                controls
                className="h-full w-full object-cover border border-gray-300 rounded-lg"
              />
            )}
          {nodesInputData[id]?.urlbuttonType === "image" &&
            nodesInputData[id]?.fileUrl && (
              <img
                src={
                  nodesInputData[id]?.fileUrl
                    ? /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(
                        nodesInputData[id]?.fileUrl
                      )
                      ? nodesInputData[id]?.urlbuttonMediaUrl
                      : URL.createObjectURL(nodesInputData[id]?.fileUrl)
                    : ""
                }
                alt="preview"
                className="h-full w-full object-contain border border-gray-300 rounded-lg"
              />
            )}
          {nodesInputData[id]?.urlbuttonType === "document" &&
            nodesInputData[id]?.fileUrl && (
              <iframe
                src={
                  nodesInputData[id]?.fileUrl
                    ? /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(
                        nodesInputData[id]?.fileUrl
                      )
                      ? nodesInputData[id]?.urlbuttonMediaUrl
                      : URL.createObjectURL(nodesInputData[id]?.fileUrl)
                    : ""
                }
                className="h-full w-full object-cover border border-gray-300 rounded-lg"
              />
            )}
        </div>
      </div>
      <div className="flex items-end w-full gap-2">
        <InputField
          id="text"
          name="text"
          tooltipContent="URL Button Text"
          placeholder="Enter URL Button Text"
          label={"URL Button Text"}
          value={nodesInputData[id]?.urlbuttonText}
          onChange={(e: { target: { value: any } }) => {
            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                urlbuttonText: e.target.value,
              },
            }));
          }}
          maxLength="20"
        />
        <p className="text-xs">
          {nodesInputData[id]?.urlbuttonText?.length || 0}/20
        </p>
      </div>
      <InputField
        id="text"
        name="text"
        type="url"
        tooltipContent="Button URL"
        placeholder="Enter Button URL"
        label={"Button URL"}
        value={nodesInputData[id]?.urlbuttonUrl}
        onChange={(e: { target: { value: any } }) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              urlbuttonUrl: e.target.value,
            },
          }));
        }}
        maxLength="200"
      />

      <div className="flex items-end gap-2 w-full">
        <InputField
          id="text"
          name="text"
          tooltipContent="URL Footer Characters max 20 characters"
          label={"URL Footer"}
          placeholder="Enter URL Footer"
          value={nodesInputData[id]?.urlbuttonFooter}
          onChange={(e: { target: { value: any } }) => {
            setNodesInputData((prev) => ({
              ...prev,
              [id]: {
                ...prev[id],
                urlbuttonFooter: e.target.value,
              },
            }));
          }}
          maxLength="60"
        />
        <p className="text-xs">
          {nodesInputData[id]?.urlbuttonFooter?.length || 0}/60
        </p>
      </div>
    </div>
  );
};
