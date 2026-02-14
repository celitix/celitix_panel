import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";

// ICONS
import {
  EllipsisVertical,
  Send,
  Check,
  Paperclip,
  Mic,
  Smile,
  ChevronLeft,
  X,
  Ticket,
  Video
} from "lucide-react";
import { Link2 } from "lucide-react";

// import CustomEmojiPicker from "../common/CustomEmojiPicker";


export default function InboxConversation({ onClose }) {
  const [isActive, setIsActive] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const getDisplayText = (text) => {
    return text.replace(/🔗\[(.*?)\]\((.*?)\)/g, "$1");
  };

  const insertLink = (linkText, linkUrl) => {
    const textarea = inputRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = input.substring(start, end) || linkText;

    const finalMessage =
      input.slice(0, start) +
      `🔗[${selectedText}](${linkUrl})` +
      input.slice(end);

    setInput(finalMessage);
    setShowLinkDialog(false);
  };

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 How can I assist you today?",
      sender: "agent",
      time: new Date(),
      status: "delivered",
      isBot: true,
    },
  ]);

  const [input, setInput] = useState("");

  const [typing, setTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(scrollToBottom, [messages]);

  const fileRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim() && !selectedFile) return;

    const newMessage = {
      id: Date.now(),
      text: selectedFile ? selectedFile.file.name : input,
      file: selectedFile?.file,
      fileUrl: selectedFile?.fileUrl,
      isImage: selectedFile?.isImage,
      sender: "you",
      time: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    scrollToBottom();
    setInput("");
    setSelectedFile(null);

    setTyping(true);
    setTimeout(() => {
      // Bot reply
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Got it! 😊",
          sender: "agent",
          time: new Date(),
          status: "seen",
          isBot: true,
        },
      ]);
      setTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim() && !selectedFile) return;

    if (selectedFile) {
      const newMessage = {
        id: Date.now(),
        text: "",
        sender: "you",
        time: new Date(),
        status: "sent",
        file: selectedFile.fileUrl,
        isImage: selectedFile.isImage,
      };

      setMessages([...messages, newMessage]);

      setSelectedFile(null);
      if (fileRef.current) fileRef.current.value = "";
    }

    if (input.trim()) {
      const newMessage = {
        id: Date.now() + 1,
        text: input,
        sender: "you",
        time: new Date(),
        status: "sent",
      };

      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    }

    scrollToBottom();
  };

  const formatTime = (date) =>
    new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(date));

  const TickIcon = ({ status }) =>
    status === "sent" ? (
      <Check size={10} className="text-gray-400" />
    ) : (
      <Check size={10} className="text-blue-500" />
    );

  // Ticket Dialog
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [ticketMessage, setTicketMessage] = useState(null);
  // const [ticketMessage, setTicketMessage] = useState(null);

  const openTicketModal = (msg) => {
    setTicketMessage(msg);
    setTicketModalVisible(true);
  };

  return (
    <div className="flex w-full h-full bg-white text-gray-700 relative">
      {/* ************************************************************LEFT MAIN CHAT AREA**************************************************************************** */}
      <div className="flex-1 flex flex-col">
        {/* HEADER BAR */}
        <div className="px-4 py-3 border-b bg-white flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm font-medium">
            {isActive ? "Anshu" : "Unassigned"}
          </div>

          {/* Mobile toggle right panel */}
          <button
            onClick={() => setShowInfo(true)}
            className="md:hidden bg-gray-100 p-2 rounded-lg"
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        {/* CHAT CONTENT */}
        <div className="flex-1 overflow-hidden px-6 py-3 space-y-4">
          {!isActive && (
            <p className="text-center text-gray-500 text-xs">
              This conversation is marked solved
            </p>
          )}

         
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`relative group flex ${
                msg.sender === "you" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Ticket Icon (ONLY for sent messages) */}
              {msg.sender === "you" && (
                <button
                  onClick={() => openTicketModal(msg)}
                  className="absolute right-27 top-2 opacity-0 group-hover:opacity-100 transition
                   bg-gray-50 text-gray-600 hover:text-black hover:bg-gray-300
                   p-1 rounded-full shadow"
                  title="Create Ticket"
                >
                  <Ticket size={22} className="text-yellow-500" />
                </button>
              )}

              {/* Avatar */}
              {msg.sender !== "you" && (
                <div
                  className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center 
                      justify-center mr-2 text-xs"
                >
                  {msg.isBot ? "🤖" : "A"}
                </div>
              )}

              <div className="max-w-xs bg-gray-100 rounded-lg shadow-sm overflow-hidden">
                {/* IMAGE PREVIEW */}
                {msg.isImage ? (
                  <img
                    src={msg.file}
                    alt="uploaded"
                    className="rounded-md w-full max-h-56 object-cover cursor-pointer"
                    onClick={() => window.open(msg.file, "_blank")}
                  />
                ) : (
                  <div className="px-4 py-2 text-sm break-words">
                    {/* LINK SUPPORT */}
                    {msg.text &&
                      msg.text.split(/🔗/g).map((segment, index) => {
                        if (!segment.trim()) return null;

                        const textMatch = segment.match(/\[(.*?)\]/);
                        const urlMatch = segment.match(/\((.*?)\)/);

                        if (!textMatch || !urlMatch) {
                          return <span key={index}>{segment}</span>;
                        }

                        const previewText = textMatch[1].trim();
                        let url = urlMatch[1].trim();

                        if (!url.startsWith("http")) {
                          url = "https://" + url;
                        }

                        return (
                          <span
                            key={index}
                            className="text-blue-600 font-medium cursor-pointer hover:underline"
                            onClick={() =>
                              window.open(url, "_blank", "noopener,noreferrer")
                            }
                          >
                            {previewText}
                          </span>
                        );
                      })}
                  </div>
                )}

                {/* =========================================    Ticket Dialog (One Global Modal)   ========================================= */}

                <Dialog
                  visible={ticketModalVisible}
                  onHide={() => setTicketModalVisible(false)}
                  header={null}
                  style={{ width: "720px" }}
                  modal
                  className="ticket-dialog"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center  ">
                    <h2 className="text-lg text-gray-800 font-semibold">
                      Create a ticket
                    </h2>
                  </div>

                  <div className="px-5 py-4 space-y-4 max-h-[65vh] overflow-y-auto">
                    {/* Subject */}
                    <input
                      type="text"
                      placeholder="Ticket Subject"
                      className="border rounded-lg w-full px-3 py-2 text-sm"
                    />

                    {/* Email Inputs */}
                    <div className="space-y-1">
                      <input
                        type="email"
                        placeholder="To (customer email address)"
                        className="border rounded-lg w-full px-3 py-2 text-sm"
                      />
                      <button className="text-blue-600 text-xs">
                        Cc / Bcc
                      </button>
                    </div>

                    {/* ChatWidget Email Inputs */}

                    <div>
                      <label className="text-xs text-gray-500">
                        From (sender address)
                      </label>
                      <select className="border rounded-lg w-full px-3 py-2 text-sm">
                        <option>ChatWidget domain</option>
                      </select>
                    </div>

                    {/* Sender + Assignee */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">
                          Priority
                        </label>
                        <select className="border rounded-lg w-full px-3 py-2 text-sm">
                          <option>Low</option>
                          <option>Normal</option>
                          <option>Urgent</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Assignee
                        </label>
                        <select className="border rounded-lg w-full px-3 py-2 text-sm">
                          <option>Anshu (You)</option>
                        </select>
                      </div>
                    </div>

                    {/* Yellow internal note */}
                    {ticketMessage && (
                      <div className="bg-yellow-100 px-4 py-2 rounded text-xs text-gray-700">
                        <p>
                          <strong>You wrote</strong> —{" "}
                          {new Date().toLocaleDateString()}
                        </p>
                        <p className="text-blue-600 underline cursor-pointer">
                          {ticketMessage.text}
                        </p>
                      </div>
                    )}

                    {/* Email Body */}
                    <textarea
                      placeholder="Send an email to the customer"
                      className="border rounded-lg w-full px-3 py-2 text-sm h-32 resize-none"
                    ></textarea>
                  </div>

                  {/* FOOTER */}
                  <div className="p-4 border-t flex justify-end gap-3">
                    <button
                      onClick={() => setTicketModalVisible(false)}
                      className="px-4 py-2 rounded-lg border text-sm"
                    >
                      Cancel
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Submit as OPEN
                    </button>
                  </div>
                </Dialog>

                {/* TIME + TICK */}
                <div className="flex justify-end items-center gap-1 text-[10px] py-1 px-2 text-gray-400">
                  {formatTime(msg.time)}
                  {msg.sender === "you" && <TickIcon status={msg.status} />}
                </div>
              </div>

              {/* Sender profile placeholder bubble */}
              {msg.sender === "you" && (
                <div className="w-8 h-8 rounded-full bg-gray-300 ml-2"></div>
              )}
            </div>
          ))}

          {/* Typing */}
          {typing && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center animate-pulse">
                🤖
              </div>
              <div className="text-sm text-gray-500">Typing...</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {selectedFile && selectedFile.isImage && (
          <div className="px-4 pb-2 flex justify-between items-center gap-3">
            <div className="relative">
              <img
                src={selectedFile.fileUrl}
                className="h-20 w-20 object-cover rounded-lg border cursor-pointer"
                alt="preview"
              />
              <button
                onClick={() => {
                  setSelectedFile(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {showLinkModal && (
          <div className="absolute inset-0  flex items-center justify-center z-50 ">
            <div className="bg-white p-5 rounded-lg w-72 shadow-lg space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Insert Link
              </h3>

              <input
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Text to display"
                className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500"
              />

              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowLinkModal(false);
                    setLinkText("");
                    setLinkUrl("");
                  }}
                  className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (!linkText || !linkUrl) return;
                    setInput((prev) => prev + `🔗[${linkText}](${linkUrl})`);
                    setShowLinkModal(false);
                    setLinkText("");
                    setLinkUrl("");
                  }}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER — INPUT BOX */}
        {isActive ? (
          <div className="p-3 border-t flex items-center gap-2 relative">
            {/*  Upload File Button */}
            <button
              onClick={() => document.getElementById("fileUpload").click()}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <Paperclip size={18} />
            </button>

            <input
              id="fileUpload"
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const fileUrl = URL.createObjectURL(file);
                const isImage = file.type.startsWith("image/");

                setSelectedFile({
                  file,
                  fileUrl,
                  isImage,
                });

                scrollToBottom();
              }}
            />

            {/*  Video Call Button */}
            <button
              className="p-2 hover:bg-gray-100 rounded-md"
              onClick={() =>
                alert("📞 Starting video call… (WebRTC setup pending)")
              }
            >
              {/* Camera Icon */}
              <Video size={18} />
            </button>

            {/*  Insert Link Button */}

            <button
              onClick={() => setShowLinkModal(true)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <Link2 size={18} />
            </button>

            {/* 😊 Emoji Button */}
            <button
              onClick={() => setShowEmoji((v) => !v)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <Smile size={18} />
            </button>

            {/* <CustomEmojiPicker
              onSelect={(emoji) => setInput((prev) => prev + emoji)}
              position="top" 
            /> */}

            {showEmoji && (
              <div className="absolute bottom-14 left-2 z-50">
                {/* <CustomEmojiPicker
                  onSelect={(emoji) => setInput((prev) => prev + emoji)}
                  position="top"
                /> */}
              </div>
            )}

            {/* Text Input */}
            <input
              ref={inputRef}
              // value={input}
              value={getDisplayText(input)}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a message…"
              className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none"
            />

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-lg"
            >
              <Send size={16} />
            </button>
          </div>
        ) : (
          <div className="p-4 border-t bg-white flex justify-end">
            <button
              onClick={() => setIsActive(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Start new conversation
            </button>
          </div>
        )}
      </div>

      {/* ********************************************************************RIGHT INFO PANEL — DESKTOP*********************************************************** */}
      <div className="hidden md:flex w-72 border-l p-4 flex-col text-sm bg-white">
        <RightInfo />
      </div>

      {/* **********************************************RIGHT INFO Drawer — MOBILE****************************************************************************** */}
      {showInfo && (
        <div className="md:hidden fixed top-0 right-0 w-9/12 h-full bg-white shadow-xl border-l z-50 p-4">
          <button
            onClick={() => setShowInfo(false)}
            className="mb-3 flex items-center gap-1"
          >
            <ChevronLeft /> Back
          </button>
          <RightInfo />
        </div>
      )}
    </div>
  );
}

function RightInfo() {
  return (
    <>
      <h3 className="font-semibold text-gray-900 text-sm">Customer Info</h3>
      <div className="mt-3 space-y-2 text-xs text-gray-600">
        <p>📧 an@gmail.com</p>
        <p>Phone…</p>
        <p>Add tag…</p>
      </div>

      <div className="mt-6 text-xs">
        <h4 className="font-semibold">Last viewed page</h4>
        <p className="text-gray-500">Nov 26, 2025 — 9:50 AM</p>
      </div>
    </>
  );
}
