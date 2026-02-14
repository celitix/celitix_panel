import { useEffect, useRef, useState } from "react";
import { Tooltip } from "@mui/material";
import { SpeedDial } from "primereact/speeddial";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

// ICONS
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import { FiSend } from "react-icons/fi";
import { VscRobot } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa";

// APIS
import { generateAiResponse } from "@/apis/ai/ai.js";

// COMPONENTS
import CannedMessageDropdown from "@/cannedmessage/components/CannedMessageDropdown";
import cannedCategories from "@/cannedmessage/components/CannedMessageDropdown";
import UniversalButton from "@/components/common/UniversalButton";

export const ChatInput = ({
  inputRef,
  input,
  setInput,
  sendMessage,
  selectedImage,
  items,
  insertEmoji,
  isSpeedDialOpen,
  setIsSpeedDialOpen,
  locationPreviewText,
  requestLocationData,
  setChatState,
  chatState,
}) => {
  // const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [showCannedDropdown, setShowCannedDropdown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const isSpeedDialOpenRef = useRef(null);

  // AI Response Generator Start
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [aiResponses, setAiResponses] = useState([]);
  const [aiChatResponseOpen, setAiChatResponseOpen] = useState(false);

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Spanish", value: "Spanish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
    { label: "Arabic", value: "Arabic" },
    { label: "Marathi", value: "Marathi" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Tamil", value: "Tamil" },
    { label: "Telugu", value: "Telugu" },
  ];

  const handleGenerate = async () => {
    if (!input) return;

    const data = {
      userPrompt: input,
      style: "Normal",
      optimizeFor: "Click Rate",
      language: selectedLanguage,
    };

    try {
      const response = await generateAiResponse(data);

      setAiResponses((prev) => ({
        ...prev,
        response: response.data,
        typing: false,
        isGenerating: false,
      }));
    } catch (err) {
      console.error(
        "Error generating content:",
        err.response?.data || err.message,
      );
      toast.error(
        "Failed to generate AI response. Please check your API key and usage.",
      );
    } finally {
      setAiResponses((prev) => ({
        ...prev,
        typing: false,
        isGenerating: false,
      }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSpeedDialOpenRef.current &&
        !isSpeedDialOpenRef.current.contains(event.target)
      ) {
        setIsSpeedDialOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function addBtn(formatType) {
    if (!inputRef.current) return;

    const inputEl = inputRef.current;
    const { selectionStart, selectionEnd } = inputEl;
    const selectedText = input.substring(selectionStart, selectionEnd);

    const data = {
      bold: {
        start: "*",
        end: "*",
      },
      italic: {
        start: "_",
        end: "_",
      },
      strike: {
        start: "~",
        end: "~",
      },
      list: {
        start: "- ",
        end: "",
      },
    };

    const { start, end } = data[formatType];

    const newValue =
      input.substring(0, selectionStart) +
      start +
      selectedText +
      end +
      input.substring(selectionEnd);

    setInput(newValue);

    requestAnimationFrame(() => {
      const pos = selectionEnd + start.length + end.length;
      inputEl.setSelectionRange(pos, pos);
      inputEl.focus();
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center w-full py-2 px-2 bg-white border-t mb-18 md:mb-0 relative"
    >
      <div className="mr-2">
        <CustomEmojiPicker position="top" onSelect={insertEmoji} />
      </div>
      <div className="relative flex items-center justify-center w-full gap-2 border rounded-3xl">
        <textarea
          type="text"
          className="max-h-50 p-3 w-full focus:outline-none resize-none text-sm"
          placeholder="Type / for canned messages"
          ref={inputRef}
          value={input}
          // onChange={(e) => setInput(e.target.value)}
          onChange={(e) => {
            const value = e.target.value;
            setInput(value);
            const lastChar = value[e.target.selectionStart - 1];
            setShowCannedDropdown(lastChar === "/");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
              setAiChatResponseOpen(false);
            }
          }}
        />
        <AnimatePresence>
          {showCannedDropdown && (
            <CannedMessageDropdown
              onSelect={(msg) => {
                const inputEl = inputRef.current;
                if (!inputEl) return;

                const start = inputEl.selectionStart;
                const end = inputEl.selectionEnd;

                const newText =
                  input.substring(0, start - 1) + msg + input.substring(end);

                setInput(newText);
                setShowCannedDropdown(false);

                requestAnimationFrame(() => {
                  const pos = start - 1 + msg.length;
                  inputEl.setSelectionRange(pos, pos);
                  inputEl.focus();
                });
              }}
            />
          )}
        </AnimatePresence>

        {/* <button
          onClick={() => setAiChatResponseOpen(!aiChatResponseOpen)}
          className="flex items-center justify-center w-9 h-9 text-black transition-all  rounded-full hover:text-gray-500 hover:bg-gray-200 cursor-pointer active:scale-105"
        >
          <VscRobot className="text-xl" />
        </button> */}
        <button
          onClick={() => {
            sendMessage();
            setAiChatResponseOpen(false);
            setAiResponses((prev) => ({
              ...prev,
              response: "",
            }));
          }}
          disabled={!selectedImage && !input}
          className="flex items-center justify-center w-9 h-9 text-black transition-all rounded-full hover:text-gray-500 hover:bg-gray-200 cursor-pointer active:scale-105 md:mr-2"
        >
          <FiSend className="text-xl" />
        </button>
        {/* <SpeedDial
          model={items}
          direction="up"
          buttonStyle={{ width: "2rem", height: "2rem" }}
          className="right-19 bottom-1 speeddial-bottom-right"
        /> */}
      </div>
      {aiChatResponseOpen && (
        <div className="md:block absolute bottom-0 md:bottom-20 h-70 border border-gray-300 rounded-md bg-[#F9FAFB] right-0 w-full">
          <div className="p-3">
            <p className="mb-2 text-sm text-gray-600 font-semibold">
              Choose language :
            </p>

            <div className="flex flex-wrap gap-2">
              {languageOptions.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setSelectedLanguage(lang.value)}
                  className={`px-3 py-1 rounded-full text-sm border transition
              ${
                selectedLanguage === lang.value
                  ? "bg-blue-400 text-white border-blue-400"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {selectedLanguage && (
              <p className="mt-3 text-sm text-gray-700">
                Selected:{" "}
                <span className="font-medium">{selectedLanguage}</span>
              </p>
            )}

            {aiResponses?.response && (
              <div className="rounded-xl border-2 border-gray-200 p-2 my-2 shadow-lg bg-gray-200">
                {aiResponses?.response}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <UniversalButton label="Generate" onClick={handleGenerate} />
              <UniversalButton
                label="Insert"
                onClick={() => setInput(aiResponses?.response)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="items-center justify-center hidden gap-1 md:flex">
        <Tooltip title="Bold" arrow placement="top">
          <button
            onClick={() => {
              addBtn("bold");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatBoldOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Italic" arrow placement="top">
          <button
            onClick={() => {
              addBtn("italic");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatItalicOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Strike Through" arrow placement="top">
          <button
            onClick={() => {
              addBtn("strike");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatStrikethroughOutlined />
          </button>
        </Tooltip>
        <Tooltip title="List" arrow placement="top">
          <button
            onClick={() => {
              addBtn("list");
            }}
            className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
          >
            <FormatListBulletedIcon />
          </button>
        </Tooltip>
      </div>

      {/* Custom SpeedDial */}
      <div className="relative ml-4" ref={isSpeedDialOpenRef}>
        <button
          onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
          className={`flex items-center justify-center w-8 h-8 cursor-pointer bg-[#075e54] text-white rounded-full shadow-md transition-transform ${
            isSpeedDialOpen ? "rotate-45" : ""
          }`}
        >
          <FaPlus />
        </button>
        {isSpeedDialOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-15 right-0 mt-2 bg-white shadow-lg rounded-lg p-3 w-56"
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={item.command}
                className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 rounded-md cursor-pointer"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
