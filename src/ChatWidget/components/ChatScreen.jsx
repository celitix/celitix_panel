import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

// ICONS
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoChevronDown } from "react-icons/io5";

// COMPONENTS
import useWidgetStore from "../stores/useWidgetStore";

//---------------------------------- Utility – Lighten a color ----------------------------------

const lighten = (hex, amount = 0.3) => {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }

  const num = parseInt(hex, 16);
  const r = Math.min(255, (num >> 16) + 255 * amount);
  const g = Math.min(255, ((num >> 8) & 255) + 255 * amount);
  const b = Math.min(255, (num & 255) + 255 * amount);

  return `rgb(${r}, ${g}, ${b})`;
};

const ChatScreen = () => {
  // ----------------------------------Zustand Store ----------------------------------

  const {
    screen,
    chatHeader,
    chatAvatar,
    previewImage,
    chatBgColor,
    chatWelcomeMessage,
    companyUrl,
    chatBubbleColor,
    offlineTicket,
    privacyMsg,
    preChatSurvey,
    setPreChatSurvey,
    surveyFields,
    showNewsLetter,
    emailIntroMsg,
    sendConversationStarter,
    offlineTextMsg,
    setWidget,
  } = useWidgetStore();

  // ----------------------------------Local state ----------------------------------

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const chatRef = useRef(null);

  // ------------Load welcome message----------------------
  useEffect(() => {
    setMessages([
      { from: "bot", text: chatWelcomeMessage || "Hi 👋 How can I help you?" },
    ]);
  }, [chatWelcomeMessage]);

  // -------------Scroll to bottom on message update---------------------

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  // ------------------Inject starter question--------------------------------------------------

  useEffect(() => {
    if (sendConversationStarter) setInput(sendConversationStarter);
  }, [sendConversationStarter]);

  // ---------------------------------- Send a Chat Message ----------------------------------

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((p) => [...p, { from: "user", text: input }]);
    setInput("");

    // setWidget({ preChatSurvey: true });

    setTyping(true);
    setTimeout(() => {
      setMessages((p) => [...p, { from: "bot", text: "Got it! 😊" }]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[640px] relative">
      {/* HEADER */}
      <div className="p-3 border-b flex items-center justify-between relative">
        {/* Left */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWidget({ screen: "home" })}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <ArrowBackIosIcon fontSize="small" />
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={chatAvatar || previewImage}
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          </div>

          {/* Header title */}
          <p className="font-semibold text-gray-700 max-w-[150px] truncate">
            {chatHeader || "Bot Assistant"}
          </p>
        </div>

        {/* Menu */}
        <button onClick={() => setShowOptions((p) => !p)}>
          <MoreVertIcon className="text-gray-500 hover:text-black" />
        </button>

        {/* OPTIONS MENU */}
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-14 right-3 bg-white shadow-lg border rounded-lg p-3 w-40"
          >
            <button className="w-full text-left text-sm hover:bg-gray-100 p-1 rounded">
              Clear chat
            </button>
            <button className="w-full text-left text-sm hover:bg-gray-100 p-1 rounded">
              Restart bot
            </button>
            <button
              className="w-full text-left text-sm hover:bg-gray-100 p-1 rounded"
              onClick={() => {
                if (!companyUrl) return alert("Company URL not set");
                const url = companyUrl.startsWith("http")
                  ? companyUrl
                  : `https://${companyUrl}`;
                window.open(url, "_blank");
              }}
            >
              Help
            </button>
          </motion.div>
        )}
      </div>

      {/* PRIVACY POPUP */}
      {privacyMsg && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90%] bg-gray-100 text-gray-700 text-xs px-4 py-2 rounded-xl shadow flex justify-between">
          <p>
            By using this chat, you agree to our Privacy Policy and Terms of
            Service.
          </p>
          <button onClick={() => setWidget({ privacyMsg: false })}>✕</button>
        </div>
      )}

      {/* MESSAGE LIST */}
      <div
        ref={chatRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto"
        style={{ backgroundColor: chatBgColor }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className="px-3 py-2 rounded-2xl text-sm max-w-[80%]"
              style={{
                backgroundColor:
                  msg.from === "bot"
                    ? lighten(chatBubbleColor, 0.35)
                    : chatBubbleColor,
                color: msg.from === "bot" ? "#333" : "white",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && <p className="text-gray-400 text-xs">Bot is typing...</p>}
      </div>

      {/* INPUT BAR */}
      <div className="p-3 border-t bg-white flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-100 px-3 py-2 rounded-full border outline-none"
          placeholder="Type a message…"
        />
        <button
          onClick={sendMessage}
          className="p-2 rounded-full text-white"
          style={{ backgroundColor: chatBubbleColor }}
        >
          <Send size={18} />
        </button>
      </div>

      {/* --------------------------- OFFLINE TICKET POPUP --------------------------- */}
      {offlineTicket && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-end justify-center z-50 bg-black/30"
        >
          {/* TOP PRIVACY TEXT */}
          <div className="absolute top-[40px] w-full p-4 text-white"></div>

          {/* MAIN POPUP BOX */}
          <div
            className="
              bg-white rounded-t-xl
              w-[90%] max-w-sm
              p-6 shadow-2xl relative
              max-h-[65vh] overflow-y-auto
            "
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => {
                  setOfflineTicket(false);
                }}
              >
                <IoChevronDown className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <p className="text-lg font-semibold text-gray-800 mb-4 whitespace-normal break-words">
              {offlineTextMsg}
            </p>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <textarea
                placeholder="Enter your message..."
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-150"
              onClick={() => alert("Message Sent (Simulated)")}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}

      {/* --------------------------- PRE-CHAT SURVEY POPUP --------------------------- */}
      {preChatSurvey && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-end justify-center z-50 bg-black/30"
        >
          {/* TOP PRIVACY TEXT */}
          <div className="absolute top-[40px] w-full p-4 text-white"></div>

          {/* MAIN POPUP BOX */}
          <div
            className="
              bg-white rounded-t-xl
              w-[90%] max-w-sm
              p-6 shadow-2xl relative
              max-h-[65vh] overflow-y-auto
            "
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => {
                  setPreChatSurvey(false);
                }}
              >
                <IoChevronDown className="h-5 w-5" />
              </button>
            </div>

            <p className="text-lg font-semibold text-gray-800 mb-4 whitespace-normal break-words">
              {emailIntroMsg}
            </p>

            {surveyFields.map((field, index) => (
              <div key={index} className="rounded-lg p-1 space-y-1">
                <div className="flex flex-col gap-3">
                  {field.type === "nameText" || field.type === "tel" ? (
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => {
                        const updated = [...surveyFields];
                        updated[index].value = e.target.value;
                        setSurveyFields(updated);
                      }}
                      className="w-full border rounded-lg px-3 py-2 text-sm text-gray-300 my-1"
                      placeholder={`Enter your ${field.label.toLowerCase()}...`}
                    />
                  ) : null}

                  {/* GDPR checkbox */}
                  {field.type === "textarea" && (
                    <label className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600"
                      />
                      {field.value}
                    </label>
                  )}

                  {field.type === "email" && (
                    <div className="space-y-2 flex flex-col py-2 my-2">
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => {
                          const updated = [...surveyFields];
                          updated[index].value = e.target.value;
                          setSurveyFields(updated);
                        }}
                        className="w-full border rounded-lg text-sm px-3 py-2"
                        placeholder={`Enter your ${field.label.toLowerCase()}...`}
                      />

                      {showNewsLetter && (
                        <label className="flex items-center gap-2 text-sm text-gray-600 my-1">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-blue-600"
                          />
                          Sign up for our newsletter
                        </label>
                      )}
                    </div>
                  )}

                  {/* Department Dropdown */}
                  {field.type === "select" && (
                    <select
                      disabled
                      className="border w-full rounded-lg px-3 py-2 text-sm text-gray-600 my-2"
                    >
                      <option>Select department</option>
                    </select>
                  )}
                </div>
              </div>
            ))}

            <button
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-150"
              onClick={() => alert("Message Sent (Simulated)")}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatScreen;
