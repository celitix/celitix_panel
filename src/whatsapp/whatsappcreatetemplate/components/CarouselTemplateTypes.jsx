import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@mui/material";
import toast from "react-hot-toast";

// ICONS
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// COMPONENTS
import CustomEmojiPicker from "../../components/CustomEmojiPicker";
import VariableManager from "../components/VariableManager";
import CustomTooltip from "../../components/CustomTooltip";
import { GenerateAiContent } from "@/components/common/CustomContentGenerate";



const CarouselTemplateTypes = ({
  templateFormat,
  setTemplateFormat,
  templateFooter,
  setTemplateFooter,
  cards,
  setCards,
  handleEmojiSelect,
  onPreviewUpdate,
  selectedCardIndex,
  setSelectedCardIndex,
  uploadImageFile,
  setFileUploadUrl,
  setvariables,
  ref,
}) => {
  const [file, setFile] = useState(null);
  const [lastUploadedFileName, setLastUploadedFileName] = useState("");
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);
  const HeaderRef = useRef(null);
  const inputRef = useRef(null);
  const [variables, setVariables] = useState([]);

  const [ai, setAi] = useState({
    isGenerating: false,
    text: "",
    response: "",
    typing: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const updateVariables = (updatedVariables) => {
    setVariables(updatedVariables);
    setvariables(updatedVariables);
    const previewFormat = templateFormat.replace(/{#(.*?)#}/g, (match, id) => {
      const variable = updatedVariables.find((v) => v.id === id);
      return variable ? `[${variable.value || id}]` : match;
    });
    onPreviewUpdate(previewFormat);
  };

  const handleCardBodyChange = (value) => {
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex].body = value;
    setCards(updatedCards);
  };

  const handleEmojiForCardBody = (emoji) => {
    const updatedCards = [...cards];
    if (updatedCards[selectedCardIndex].body.length + emoji.length > 160)
      return;
    updatedCards[selectedCardIndex].body =
      (updatedCards[selectedCardIndex].body || "") + emoji;
    setCards(updatedCards);
  };

  const handleMediaUpload = async () => {
    if (file) {
      const isVideo = cards[selectedCardIndex]?.mediaType === "video";
      const maxSize = isVideo ? 16 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size <= maxSize) {
        const updatedCards = [...cards];
        const res = await uploadImageFile(file, 1);

        updatedCards[selectedCardIndex].mediaUrl = URL.createObjectURL(file);
        updatedCards[selectedCardIndex].uploadUrl = res?.handlerid;

        updatedCards[selectedCardIndex].fileName = file.name;
        setCards(updatedCards);
        setFile(null);
        fileInputRef.current.value = "";
        toast.success(`${isVideo ? "Video" : "Image"} uploaded successfully!`);
      } else {
        toast.error(
          `File size exceeds ${isVideo ? "16MB" : "5MB"
          } limit. Please upload a smaller file.`
        );
      }
    } else {
      toast.error("No file selected for upload!");
    }
  };

  const handleDeleteMedia = () => {
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex].mediaUrl = "";
    // updatedCards[selectedCardIndex].mediaType = "";
    updatedCards[selectedCardIndex].fileName = "";
    updatedCards[selectedCardIndex].uploadUrl = "";
    setCards(updatedCards);
    toast.success("Media removed successfully!");
  };

  useEffect(() => {
    if (selectedCardIndex >= cards.length) {
      setSelectedCardIndex(Math.max(0, cards.length - 1));
    } else if (!cards[selectedCardIndex]) {
      handleCardBodyChange("");
      handleMediaUpload("");
    }
  }, [cards, selectedCardIndex]);

  function addFormat(formatType) {
    const el = inputRef.current;
    if (!el) return;

    const input = templateFormat || ""; // ✅ fixed here
    const selectionStart = el.selectionStart ?? 0;
    const selectionEnd = el.selectionEnd ?? 0;

    const inline = {
      bold: { start: "*", end: "*" },
      italic: { start: "_", end: "_" },
      strike: { start: "~", end: "~" },
    };

    if (formatType !== "list") {
      const selected = input.slice(selectionStart, selectionEnd);
      const { start, end } = inline[formatType];
      const newValue =
        input.slice(0, selectionStart) +
        start +
        selected +
        end +
        input.slice(selectionEnd);

      setTemplateFormat(newValue);

      requestAnimationFrame(() => {
        const pos = selectionEnd + start.length + end.length;
        el.setSelectionRange(pos, pos);
        el.focus();
      });
      return;
    }

    // handle list format
    const hasSelection = selectionStart !== selectionEnd;
    if (hasSelection) {
      const selected = input.slice(selectionStart, selectionEnd);
      const transformed = selected
        .split(/\r?\n/)
        .map((l) => (l.trim().length ? (l.startsWith("- ") ? l : `- ${l}`) : l))
        .join("\n");

      const newValue =
        input.slice(0, selectionStart) +
        transformed +
        input.slice(selectionEnd);
      setTemplateFormat(newValue);

      requestAnimationFrame(() => {
        el.setSelectionRange(
          selectionStart,
          selectionStart + transformed.length
        );
        el.focus();
      });
    } else {
      const insert = "- ";
      const newValue =
        input.slice(0, selectionStart) + insert + input.slice(selectionStart);
      setTemplateFormat(newValue);

      requestAnimationFrame(() => {
        const pos = selectionStart + insert.length;
        el.setSelectionRange(pos, pos);
        el.focus();
      });
    }
  }

  function handleKeyDown(e) {
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

    // BACKSPACE at start of "- " → remove bullet
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

  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <div className="flex items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Template Format
          </label>
          <CustomTooltip
            title="Specify sample values for your parameters. {{1}}:Roy,{{2}}:john"
            placement="right"
            arrow
          >
            <span className="ml-2">
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
            </span>
          </CustomTooltip>
        </div>

        <div className="relative">
          <textarea
            id="templateFormatCarouselTextarea"
            name="templateFormatCarouselTextarea"
            className="w-full p-2 pr-8 pb-20 h-44 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
            value={templateFormat}
            onChange={(e) => setTemplateFormat(e.target.value)}
            maxLength={1024}
            placeholder="Enter template format"
            // ref={ref}
            ref={(el) => {
              textAreaRef.current = el;
              inputRef.current = el;
              ref.current = el;
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute top-0 right-0 mt-2 mr-2 flex space-x-2">
            <CustomEmojiPicker
              onSelect={(emoji) =>
                handleEmojiSelect(
                  setTemplateFormat,
                  emoji,
                  60,
                  "templateFormat"
                )
              }
              position="right"
            />
          </div>
          <GenerateAiContent
            ai={ai}
            setAi={setAi}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            right={10}
            bottom={15}
            setMessageContent={setTemplateFormat}
            messageContent={templateFormat}
            length={2500}
          />

          <div className="absolute -bottom-7 left-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center gap-4 w-max"
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
            </motion.div>
          </div>
        </div>
        <p className="text-sm text-gray-500 flex justify-end mb-1">{templateFormat.length}/1024</p>

        <VariableManager
          templateFormat={templateFormat}
          setTemplateFormat={setTemplateFormat}
          onUpdateVariables={updateVariables}
          ref={ref}
        />

      </div>

      <div className="w-full mb-4">
        <div className="flex items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Card Body {selectedCardIndex + 1}
          </label>
          <CustomTooltip
            title={`Enter the card ${selectedCardIndex + 1
              } body. Max length: 160 characters.`}
            placement="right"
            arrow
          >
            <span className="ml-2">
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
            </span>
          </CustomTooltip>
        </div>

        <div className="relative">
          <textarea
            id="cardBodyCarouselTextarea"
            name="cardBodyCarouselTextarea"
            className="w-full p-2 pr-8 h-24 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
            maxLength={160}
            value={cards[selectedCardIndex]?.body || ""}
            onChange={(e) => handleCardBodyChange(e.target.value)}
            placeholder="Enter Card Body"
          />
          <div className="absolute top-0 right-0 mt-2 mr-2 flex space-x-2">
            <CustomEmojiPicker
              onSelect={handleEmojiForCardBody}
              position="right"
            />
          </div>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">
            {cards[selectedCardIndex]?.body.length || 0}/160
          </p>
        </div>
      </div>

      <div className="w-full mb-4">
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700">
            Upload{" "}
            {cards[selectedCardIndex]?.mediaType === "video"
              ? "Video"
              : "Image"}{" "}
            {selectedCardIndex + 1}
          </label>
          <CustomTooltip
            title={
              cards[selectedCardIndex]?.mediaType === "video"
                ? "Only mp4 and avi files are allowed (16 MB max)"
                : "Only jpg, jpeg, and png files are allowed (5 MB max)"
            }
            placement="right"
            arrow
          >
            <span className="ml-2">
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
            </span>
          </CustomTooltip>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <label
            htmlFor="carouselMediaUpload"
            className="bg-[#212529] hover:bg-[#434851] text-white px-4 py-2 rounded-md cursor-pointer text-sm"
          >
            Select{" "}
            {cards[selectedCardIndex]?.mediaType === "video"
              ? "Video"
              : "Image"}
          </label>
          <input
            type="file"
            id="carouselMediaUpload"
            name="carouselMediaUpload"
            accept={
              cards[selectedCardIndex]?.mediaType === "video"
                ? "video/mp4, video/avi"
                : "image/jpeg, image/png"
            }
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
          />

          {file && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              onClick={handleMediaUpload} // Upload media on button click
            >
              Upload
            </button>
          )}
          {cards[selectedCardIndex]?.mediaUrl && (
            <MdOutlineDeleteForever
              className="text-red-500 cursor-pointer hover:text-red-700"
              size={20}
              onClick={handleDeleteMedia}
            />
          )}
        </div>
        {cards[selectedCardIndex]?.fileName && (
          <span className="text-sm text-gray-600 mt-2 block">
            {cards[selectedCardIndex].fileName}
          </span>
        )}
      </div>

      {/* <div className="w-full mb-4">
        <div className="flex items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Template Footer (Optional)
          </label>
          <CustomTooltip
            title="Enter the template footer"
            placement="right"
            arrow
          >
            <span className="ml-2">
              <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
            </span>
          </CustomTooltip>
        </div>
        <div className="relative">
          <textarea
            id="templateFooterCarouselTextarea"
            name="templateFooterCarouselTextarea"
            className="w-full p-2 border bg-white border-gray-300 pr-8 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
            value={templateFooter}
            onChange={(e) => setTemplateFooter(e.target.value)}
            maxLength={60}
            placeholder="Enter template footer"
          />
          <div className="absolute top-0 right-0 mt-2 mr-2 flex space-x-2">
            <CustomEmojiPicker
              onSelect={(emoji) => handleEmojiSelect(setTemplateFooter, emoji)}
              position="right"
            />
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">{templateFooter.length}/60</p>
      </div> */}
    </div>
  );
};

export default CarouselTemplateTypes;
