import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// MUI MATERIAL
import { Tooltip } from "@mui/material";

// ICONS
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// COMPONENTS
import { Textarea } from "@/components/ui/textarea";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { extractVariable } from "./helper/extractVariable";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";

export const TextNodeContent = ({
  id,
  nodesInputData,
  setNodesInputData,
  allVariables,
  addVariable,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
  addVariable: (data: String) => void;
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    const variable = extractVariable({ message: nodesInputData[id]?.message });

    if (!variable || variable == "") {
      return;
    }

    addVariable(variable);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable: variable,
      },
    }));
  }, []);
  const handleAddVariable = (e: any) => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variable: e,
      },
    }));
    if (!e) return;
    const newTag = `{{${e}}}`;
    const updatedMessage = (nodesInputData[id]?.message || "") + newTag;
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: updatedMessage,
      },
    }));
  };

  const [listMode, setListMode] = React.useState<
    Record<string | number, boolean>
  >({});

  // convenience
  function updateMessage(newVal: string) {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: { ...prev[id], message: newVal },
    }));
  }

  function addFormat(formatType: "bold" | "italic" | "strike" | "list") {
    const el = inputRef.current;
    if (!el) return;

    const input = nodesInputData[id]?.message || "";
    const selectionStart = el.selectionStart ?? 0;
    const selectionEnd = el.selectionEnd ?? 0;

    // inline formats
    const inline = {
      bold: { start: "*", end: "*" },
      italic: { start: "_", end: "_" },
      strike: { start: "~", end: "~" },
    } as const;

    if (formatType !== "list") {
      const selected = input.slice(selectionStart, selectionEnd);
      const { start, end } = inline[formatType];
      const newValue =
        input.slice(0, selectionStart) +
        start +
        selected +
        end +
        input.slice(selectionEnd);

      updateMessage(newValue);

      requestAnimationFrame(() => {
        // keep caret after closing token
        const pos = selectionEnd + start.length + end.length;
        el.setSelectionRange(pos, pos);
        el.focus();
      });
      return;
    }

    // LIST handling
    const hasSelection = selectionStart !== selectionEnd;
    if (hasSelection) {
      // prefix each non-empty selected line with "- "
      const selected = input.slice(selectionStart, selectionEnd);
      const transformed = selected
        .split(/\r?\n/)
        .map((l) => (l.trim().length ? (l.startsWith("- ") ? l : `- ${l}`) : l))
        .join("\n");

      const newValue =
        input.slice(0, selectionStart) +
        transformed +
        input.slice(selectionEnd);
      updateMessage(newValue);

      requestAnimationFrame(() => {
        el.setSelectionRange(
          selectionStart,
          selectionStart + transformed.length
        );
        el.focus();
      });
    } else {
      // insert "- " at caret and enable list mode
      const insert = "- ";
      const newValue =
        input.slice(0, selectionStart) + insert + input.slice(selectionStart);
      updateMessage(newValue);

      setListMode((m) => ({ ...m, [id]: true }));

      requestAnimationFrame(() => {
        const pos = selectionStart + insert.length;
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

    // current line bounds + content
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const nextNl = value.indexOf("\n", selectionStart);
    const lineEnd = nextNl === -1 ? value.length : nextNl;
    const currentLine = value.slice(lineStart, lineEnd);

    // ENTER: continue list or exit on empty bullet
    if (e.key === "Enter") {
      e.preventDefault();

      // exit if current line empty or just "- "
      const trimmed = currentLine.trim();
      if (!trimmed || trimmed === "-") {
        const newVal =
          value.slice(0, selectionStart) + "\n" + value.slice(selectionEnd);
        updateMessage(newVal);
        setListMode((m) => ({ ...m, [id]: false }));

        requestAnimationFrame(() => {
          const pos = selectionStart + 1;
          el.setSelectionRange(pos, pos);
          el.focus();
        });
        return;
      }

      // continue list
      const insert = "\n- ";
      const newVal =
        value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
      updateMessage(newVal);

      requestAnimationFrame(() => {
        const pos = selectionStart + insert.length;
        el.setSelectionRange(pos, pos);
        el.focus();
      });
    }

    // BACKSPACE at start of "- " → remove bullet, maybe exit
    if (e.key === "Backspace") {
      const caretInFirstTwo = selectionStart - lineStart <= 2;
      const startsWithDash = currentLine.startsWith("- ");

      if (caretInFirstTwo && startsWithDash) {
        e.preventDefault();
        const withoutDash = currentLine.replace(/^-\s?/, "");
        const newVal =
          value.slice(0, lineStart) + withoutDash + value.slice(lineEnd);
        updateMessage(newVal);

        const shouldExit = withoutDash.trim().length === 0;
        if (shouldExit) setListMode((m) => ({ ...m, [id]: false }));

        requestAnimationFrame(() => {
          const pos = lineStart;
          el.setSelectionRange(pos, pos);
          el.focus();
        });
      }
    }
  }

  function insertEmoji(emoji: string) {
    if (!inputRef.current) return;
    const input = nodesInputData[id]?.message || "";
    if (input?.length >= 200) return;

    const inputEl = inputRef.current;

    const start = inputEl.selectionStart;
    const end = inputEl.selectionEnd;

    const newText = input.substring(0, start) + emoji + input.substring(end);

    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        message: newText,
      },
    }));

    // requestAnimationFrame(() => {
    //   inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //   inputEl.focus();
    // });

    inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    inputEl.focus();

    // setTimeout(() => {
    //   inputEl.setSelectionRange(start + emoji.length, start + emoji.length);
    //   inputEl.focus();
    // }, 0);
  }
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label
          htmlFor="textBox"
          className="text-sm font-medium text-gray-800 font-p mb-2"
        >
          Message
        </label>
        <Textarea
          id="textBox"
          placeholder="Enter message"
          value={nodesInputData[id]?.message || ""}
          onChange={(e) =>
            setNodesInputData((prev) => ({
              ...prev,
              [id]: { ...prev[id], message: e.target.value },
            }))
          }
          className="resize-none h-50"
          maxLength={4096}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />

        <p className="text-xs mt-2">
          {nodesInputData[id]?.message?.length || 0}/4096
        </p>

        {/* <div className="items-center justify-start hidden gap-1 md:flex mt-2">
          <button
            onClick={() => {
              addFormat("bold");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatBoldOutlined />
          </button>
          <button
            onClick={() => {
              addFormat("italic");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatItalicOutlined />
          </button>
          <button
            onClick={() => {
              addFormat("strike");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatStrikethroughOutlined />
          </button>

          <div className="mr-2">
            <CustomEmojiPicker position="top" onSelect={insertEmoji} />
          </div>
        </div> */}

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
      </div>
      <AnimatedDropdown
        id="selectVaribleDropdown"
        name="selectVaribleDropdown"
        label="Select Variable"
        options={allVariables.map((v) => ({
          label: v,
          value: v,
        }))}
        value={nodesInputData[id]?.variable}
        onChange={(e: any) => {
          handleAddVariable(e);
        }}
      />

      {/* <Variable variable={nodesInputData[id]?.variable} message={nodesInputData[id]?.message} /> */}
    </div>
  );
};
