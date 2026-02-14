// import React, { useState, useEffect } from "react";
// import { IoWarning } from "react-icons/io5";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { FaCheck } from "react-icons/fa";
// import EmojiPicker from "emoji-picker-react";
// import { BsEmojiSmile } from "react-icons/bs";
// import { IoCopyOutline } from "react-icons/io5";
// import UniversalButton from "@/whatsapp/components/UniversalButton";
// import { ColorPicker } from "primereact/colorpicker";

// const ChatPage = ({
//   chatBgColor,
//   setChatBgColor,
//   chatAvatar,
//   setChatAvatar,
//   chatHeader,
//   setChatHeader,
//   chatWelcomeMessage,
//   setChatWelcomeMessage,
//   defaultWelcomeMessage,
//   companyUrl,
//   setCompanyUrl,
//   chatBubbleColor,
//   setChatBubbleColor,
// }) => {
//   const [appearancesOpen, setAppearancesOpen] = useState(false);
//   const [searchEngineOpen, setSearchEngineopen] = useState(false);
//   const [image, setImage] = useState(null);
//   const [selected, setSelected] = useState("white");
//   const [text, setText] = useState("");
//   const [textMsg, setTextMsg] = useState("");
//   const [showPicker, setShowPicker] = useState(false);
//   const [showPickerMsg, setShowPickerMsg] = useState(false);

//   const [chatUrl, setChatUrl] = useState("http://abc......");
//   const [metaTitle, setMetaTitle] = useState("http://abc......");
//   const [metaDesc, setMetaDec] = useState("http://abc......");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // setImage(URL.createObjectURL(file));
//       setChatAvatar(URL.createObjectURL(file));
//     }
//   };

//   const handleEmojiClick = (emojiData) => {
//     setText((prev) => prev + emojiData.emoji);
//     setShowPicker(false);
//   };

//   const handleEmojiClickMsg = (emojiData) => {
//     setTextMsg((prev) => prev + emojiData.emoji);
//     setShowPickerMsg(false);
//   };

//   useEffect(() => {
//     setChatHeader(text);
//   }, [text]);

//   useEffect(() => {
//     setChatWelcomeMessage(textMsg);
//   }, [textMsg]);

//   useEffect(() => {
//     console.log("ChatPage chatBubbleColor (prop) =", chatBubbleColor);
//   }, [chatBubbleColor]);

//   return (
//     <div className="flex flex-col w-auto m-2">
//       {/* Warning Banner */}
//       <div className="bg-orange-200 p-3 text-sm rounded-lg m-3 flex items-center gap-2 text-gray-800">
//         <span className="text-lg text-orange-300">
//           <IoWarning />
//         </span>
//         Chat page feature is available in Starter plan and requires additional
//         verification. Please Upgrade to Starter plan and contact support to
//         unlock this feature.
//       </div>

//       <div className="text-2xl font-semibold m-3">Chat Page</div>

//       <div className="bg-white rounded-xl border">
//         {/* Accordion Button */}
//         <button
//           onClick={() => setAppearancesOpen(!appearancesOpen)}
//           className={`w-full flex justify-between items-center p-4 text-left ${
//             appearancesOpen && "border-b border-gray-200 mb-5"
//           }`}
//         >
//           <h2 className="text-lg font-medium">Appearance</h2>
//           {appearancesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
//         </button>

//         {/* APPEARANCE SECTION */}
//         {appearancesOpen && (
//           <>
//             <div className="grid grid-cols-4 gap-6 px-6 pb-6 space-y-6 animate-fadeIn">
//               {/* LEFT LABELS */}
//               <div className="col-span-1 flex flex-col gap-10 text-sm">
//                 <p>Background color</p>
//                 <p>Chat Bubble Background </p>
//                 {/* <p className="my-4">Company logo</p> */}
//                 <p>Company URL</p>
//                 <p className="my-10">Header</p>
//                 <p>Welcome message</p>
//               </div>

//               {/* RIGHT FIELDS */}
//               <div className="flex flex-col gap-6 col-span-3">
//                 {/* Color Circles */}
//                 <div className="flex items-center gap-4">
//                   {/* White */}
//                   <div
//                     onClick={() => {
//                       setSelected("white");
//                       setChatBgColor("white");
//                     }}
//                     className={`w-8 h-8 rounded-full cursor-pointer
//                    flex items-center justify-center border-2
//                    ${
//                      selected === "white"
//                        ? "border-blue-500"
//                        : "border-gray-600"
//                    }`}
//                     style={{ backgroundColor: "white" }}
//                   >
//                     {selected === "white" && (
//                       <FaCheck className="text-black text-[10px]" />
//                     )}
//                   </div>

//                   {/* Black */}
//                   <div
//                     onClick={() => {
//                       setSelected("black");
//                       setChatBgColor("black");
//                     }}
//                     className={`w-8 h-8 rounded-full cursor-pointer
//                     flex items-center justify-center border-2
//                     ${
//                       selected === "black"
//                         ? "border-blue-500"
//                         : "border-transparent"
//                     }`}
//                     style={{ backgroundColor: "black" }}
//                   >
//                     {selected === "black" && (
//                       <FaCheck className="text-white text-[10px]" />
//                     )}
//                   </div>

//                   {/* Blue */}
//                   <div
//                     onClick={() => {
//                       setSelected("blue");
//                       setChatBgColor("#3B82F6");
//                     }}
//                     className={`w-8 h-8 rounded-full cursor-pointer
//                     flex items-center justify-center border-2
//                    ${
//                      selected === "blue"
//                        ? "border-blue-500"
//                        : "border-transparent"
//                    }`}
//                     style={{ backgroundColor: "#3B82F6" }}
//                   >
//                     {selected === "blue" && (
//                       <FaCheck className="text-white text-[10px]" />
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <ColorPicker
//                     format="hex" // return hex format (#xxxxxx)
//                     value={chatBubbleColor} // current color
//                     onChange={(e) => setChatBubbleColor("#" + e.value)}
//                   />
//                 </div>

//                 {/* Company Logo Upload */}
//                 {/* <div>
//                   <label
//                     htmlFor="rectangleUpload"
//                     className="w-30 h-20 border-2 border-gray-300 rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
//                   >
//                     {image ? (
//                       <img
//                         src={image}
//                         alt="preview"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-gray-500 text-sm">
//                         Click to upload
//                       </span>
//                     )}
//                   </label>

//                   <input
//                     id="rectangleUpload"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageChange}
//                   />
//                 </div> */}

//                 {/* Company URL Input */}
//                 <div className="w-150">
//                   <input
//                     type="text"
//                     value={companyUrl}
//                     onChange={(e) => setCompanyUrl(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* Welcome Textarea */}
//                 <div className="w-150 relative">
//                   <textarea
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     rows={4}
//                     placeholder="Welcome Here"
//                     className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                   ></textarea>

//                   <button
//                     onClick={() => setShowPicker((prev) => !prev)}
//                     className="absolute bottom-2 right-2 text-gray-600 hover:text-blue-500 m-4"
//                   >
//                     <BsEmojiSmile size={20} />
//                   </button>

//                   {showPicker && (
//                     <div className="absolute bottom-12 right-0 shadow-lg z-10">
//                       <EmojiPicker onEmojiClick={handleEmojiClick} />
//                     </div>
//                   )}
//                 </div>

//                 {/* Message Textarea */}
//                 <div className="w-150 relative">
//                   <textarea
//                     value={textMsg}
//                     onChange={(e) => setTextMsg(e.target.value)}
//                     rows={4}
//                     placeholder="Ask anything"
//                     className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                   ></textarea>

//                   <button
//                     onClick={() => setShowPickerMsg((prev) => !prev)}
//                     className="absolute bottom-2 right-2 text-gray-600 hover:text-blue-500 m-4"
//                   >
//                     <BsEmojiSmile size={20} />
//                   </button>

//                   {showPickerMsg && (
//                     <div className="absolute bottom-12 right-0 shadow-lg z-10">
//                       <EmojiPicker onEmojiClick={handleEmojiClickMsg} />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <hr className="w-[60rem] ml-6" />
//             <div className="h-50 grid grid-cols-4 p-8">
//               <div className="col-span-1 flex flex-col gap-10 text-sm">
//                 <p>Chat page URL</p>
//               </div>

//               <div className="col-span-3 relative">
//                 <input
//                   type="text"
//                   value={chatUrl}
//                   onChange={(e) => setChatUrl(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-1 pr-10
//                 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />

//                 {/* Copy icon inside input */}
//                 <button
//                   type="button"
//                   onClick={() => navigator.clipboard.writeText(companyUrl)}
//                   className="absolute right-3 top-[14%] -translate-y-1/2 text-gray-500 hover:text-blue-600"
//                 >
//                   <IoCopyOutline size={18} />
//                 </button>

//                 <div className="mt-4 p-1 w-40 border-2 border-blue-400 rounded-lg hover:bg-blue-500 cursor-pointer">
//                   Open Chat Page
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       <div className="bg-white rounded-xl border mt-5">
//         <button
//           onClick={() => setSearchEngineopen(!searchEngineOpen)}
//           className={`w-full flex justify-between items-center p-4 text-left ${
//             searchEngineOpen && "border-b border-gray-200 mb-5"
//           }`}
//         >
//           <h2 className="text-lg font-medium">Search engine optimization</h2>
//           {searchEngineOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
//         </button>

//         {searchEngineOpen && (
//           <div className="grid grid-cols-4 gap-6 px-6 pb-6 space-y-6 animate-fadeIn">
//             <div className="col-span-1 flex flex-col gap-4 text-sm">
//               <p>Meta title</p>
//               <p className="my-4">Meta description</p>
//             </div>
//             <div className="col-span-3 flex flex-col gap-4">
//               <div className="w-150">
//                 <input
//                   type="text"
//                   value={metaTitle}
//                   onChange={(e) => setMetaTitle(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="w-150">
//                 <input
//                   type="text"
//                   value={metaDesc}
//                   onChange={(e) => setMetaDec(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

// ************************************************************************************New version***************************************************************************************
import React, { useState, useEffect } from "react";
import { ColorPicker } from "primereact/colorpicker";

// ICONS
import { IoWarning } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";

// COMPONENTS
import useWidgetStore from "./stores/useWidgetStore";

const ChatPage = () => {
  /* ----------------------------------------
     LOCAL UI STATES (component only)
     ---------------------------------------- */
  const [appearancesOpen, setAppearancesOpen] = useState(false);
  const [searchEngineOpen, setSearchEngineOpen] = useState(false);
  const [selectedBg, setSelectedBg] = useState("white");
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerMsg, setShowPickerMsg] = useState(false);

  const [text, setText] = useState("");
  const [textMsg, setTextMsg] = useState("");
  const [chatUrl, setChatUrl] = useState("http://abc......");
  const [metaTitle, setMetaTitle] = useState("http://abc......");
  const [metaDesc, setMetaDec] = useState("http://abc......");

  const {} = useWidgetStore();

  /* ----------------------------------------
     ZUSTAND STORE VALUES
     ---------------------------------------- */
  const {
    chatBgColor,
    chatAvatar,
    chatHeader,
    chatWelcomeMessage,
    companyUrl,
    chatBubbleColor,
    setWidget,
  } = useWidgetStore();

  /* ----------------------------------------
     IMAGE UPLOAD
     ---------------------------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setWidget({ chatAvatar: URL.createObjectURL(file) });
    }
  };

  /* ----------------------------------------
     EMOJI HANDLERS
     ---------------------------------------- */
  const handleEmojiClick = (data) => {
    setText((prev) => prev + data.emoji);
    setShowPicker(false);
  };

  const handleEmojiClickMsg = (data) => {
    setTextMsg((prev) => prev + data.emoji);
    setShowPickerMsg(false);
  };

  /* ----------------------------------------
     Sync Zustand on text change
     ---------------------------------------- */
  useEffect(() => {
    setWidget({ chatHeader: text });
  }, [text]);

  useEffect(() => {
    setWidget({ chatWelcomeMessage: textMsg });
  }, [textMsg]);

  return (
    <div className="flex flex-col w-auto m-2">
      {/* Warning Banner */}
      <div className="bg-orange-200 p-3 text-sm rounded-lg m-3 flex items-center gap-2 text-gray-800">
        <span className="text-lg text-orange-300">
          <IoWarning />
        </span>
        Chat page feature is available in Starter plan and requires additional
        verification. Please Upgrade to Starter plan and contact support to
        unlock this feature.
      </div>

      <div className="text-2xl font-semibold m-3">Chat Page</div>

      {/*  -------------------------------- APPEARANCE SECTION ------------------------------- */}
      <div className="bg-white rounded-xl border">
        <button
          onClick={() => setAppearancesOpen(!appearancesOpen)}
          className={`w-full flex justify-between items-center p-4 text-left ${
            appearancesOpen && "border-b border-gray-200 mb-5"
          }`}
        >
          <h2 className="text-lg font-medium">Appearance</h2>
          {appearancesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>

        {appearancesOpen && (
          <>
            <div className="grid grid-cols-1  gap-8 px-4 md:px-8 pb-8">
              {/* LEFT LABELS + INPUTS */}
              <div className="md:col-span-1 flex flex-col gap-10 text-sm text-gray-700">
                {/* Background Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                  <p className="font-semibold text-gray-800">
                    Background color
                  </p>

                  <div className="flex items-center gap-4">
                    {/* White */}
                    <div
                      onClick={() => {
                        setSelectedBg("white");
                        setWidget({ chatBgColor: "white" });
                      }}
                      className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center
              border-2 transition-all duration-200 ${
                selectedBg === "white"
                  ? "border-blue-600 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
              }`}
                      style={{ backgroundColor: "white" }}
                    >
                      {selectedBg === "white" && (
                        <FaCheck className="text-black text-sm" />
                      )}
                    </div>

                    {/* Black */}
                    <div
                      onClick={() => {
                        setSelectedBg("black");
                        setWidget({ chatBgColor: "black" });
                      }}
                      className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center
              border-2 transition-all duration-200 ${
                selectedBg === "black"
                  ? "border-blue-600 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
              }`}
                      style={{ backgroundColor: "black" }}
                    >
                      {selectedBg === "black" && (
                        <FaCheck className="text-white text-sm" />
                      )}
                    </div>

                    {/* Blue */}
                    <div
                      onClick={() => {
                        setSelectedBg("blue");
                        setWidget({ chatBgColor: "#3B82F6" });
                      }}
                      className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center
              border-2 transition-all duration-200 ${
                selectedBg === "blue"
                  ? "border-blue-600 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
              }`}
                      style={{ backgroundColor: "#3B82F6" }}
                    >
                      {selectedBg === "blue" && (
                        <FaCheck className="text-white text-sm" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Chat Bubble */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <p className="font-semibold text-gray-800">
                    Chat Bubble Background
                  </p>

                  <div className="flex items-center">
                    <ColorPicker
                      format="hex"
                      value={chatBubbleColor}
                      onChange={(e) =>
                        setWidget({ chatBubbleColor: "#" + e.value })
                      }
                    />
                  </div>
                </div>

                {/* Company URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <p className="font-semibold text-gray-800">Company URL</p>

                  <div className="w-full min-w-30 ">
                    <input
                      type="text"
                      value={companyUrl}
                      onChange={(e) =>
                        setWidget({ companyUrl: e.target.value })
                      }
                      placeholder="https://yourwebsite.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <p className="font-semibold text-gray-800">Header</p>

                  <div className="w-full  min-w-30  ">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={4}
                      placeholder="Welcome here..."
                      className="w-full border border-gray-300 rounded-lg p-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>

                    <button
                      onClick={() => setShowPicker((prev) => !prev)}
                      className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-700 transition"
                    >
                      <BsEmojiSmile size={20} />
                    </button>

                    {showPicker && (
                      <div className="absolute bottom-14 right-0 shadow-xl rounded-lg overflow-hidden z-20 bg-white">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Welcome Message */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <p className="font-semibold text-gray-800">Welcome message</p>

                  <div className="w-full min-w-30  relative">
                    <textarea
                      value={textMsg}
                      onChange={(e) => setTextMsg(e.target.value)}
                      rows={4}
                      placeholder="Ask anything…"
                      className="w-full border border-gray-300 rounded-lg p-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>

                    <button
                      onClick={() => setShowPickerMsg((prev) => !prev)}
                      className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-700 transition"
                    >
                      <BsEmojiSmile size={20} />
                    </button>

                    {showPickerMsg && (
                      <div className="absolute bottom-14 right-0 shadow-xl rounded-lg overflow-hidden z-20 bg-white">
                        <EmojiPicker onEmojiClick={handleEmojiClickMsg} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="w-full max-w-4xl mx-auto my-6 border-gray-200" />

            {/* Chat URL Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 p-4 md:p-8 gap-6">
              <div className="md:col-span-1 text-sm font-semibold text-gray-800">
                Chat page URL
              </div>

              <div className="md:col-span-3 relative w-full md:max-w-md">
                <input
                  type="text"
                  value={chatUrl}
                  onChange={(e) => setChatUrl(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10  text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(companyUrl)}
                  className="absolute right-3 top-1/2 -translate-y-1/2  text-gray-500 hover:text-gray-700 transition"
                >
                  <IoCopyOutline size={18} />
                </button>

                <div className="mt-6 py-2 text-center border border-blue-500  text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer font-medium">
                  Open Chat Page
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ------------------------------ SEARCH ENGINE OPTIMIZATION -------------------------------- */}
      <div className="bg-white rounded-xl border mt-5">
        <button
          onClick={() => setSearchEngineOpen(!searchEngineOpen)}
          className={`w-full flex justify-between items-center p-4 text-left ${
            searchEngineOpen && "border-b border-gray-200 mb-5"
          }`}
        >
          <h2 className="text-lg font-medium">Search engine optimization</h2>
          {searchEngineOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>

        {searchEngineOpen && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-6 pb-6 animate-fadeIn">
            <div className="md:col-span-1 text-sm">
              <p>Meta title</p>
              <p>Meta description</p>
            </div>

            <div className="md:col-span-3 flex flex-col gap-4">
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-1"
              />
              <input
                type="text"
                value={metaDesc}
                onChange={(e) => setMetaDec(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
