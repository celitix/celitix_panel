import React from "react";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "primereact/dialog";
import { flushSync } from "react-dom";

// ICONS
import { FiSend } from "react-icons/fi";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import { BsJournalArrowDown } from "react-icons/bs";
import { FaReply } from "react-icons/fa6";
import { FaFileWord, FaPlus } from "react-icons/fa";
import { PiFilePdf, PiMicrosoftExcelLogo } from "react-icons/pi";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";


// COMPONENTS
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";
import CannedMessageDropdown from "@/cannedmessage/components/CannedMessageDropdown";
import CustomTooltip from "@/components/common/CustomTooltip";

export const ChatInput = ({
  input,
  setInput,
  sendMessage,
  inputRef,
  fileInputRef,
  documentInputRef,
  isSpeedDialOpen,
  setIsSpeedDialOpen,
  isTemplateMessage,
  setIsTemplateMessage,
  selectedMedia,
  setSelectedMedia,
}) => {
  // const [isSpeedDialOpen, setIsSpeedDialOpen] = React.useState(false);
  const [showCannedDropdown, setShowCannedDropdown] = React.useState(false);


  // const items = [
  //   {
  //     label: "Attachment",
  //     icon: <AttachmentOutlinedIcon style={{ color: "#4CAF50" }} />,
  //     command: () => {
  //       fileInputRef.current.click();
  //     },
  //   },
  //   {
  //     label: "Document",
  //     icon: <FilePresentOutlinedIcon />,
  //     command: () => {
  //       documentInputRef.current.click();
  //     },
  //   },
  //   // {
  //   //   label: "Photos & Videos",
  //   //   icon: <ImageOutlinedIcon style={{ color: "#FF9800" }} />, // Orange
  //   //   command: () => {
  //   //     fileInputRef.current.click();
  //   //   },
  //   // },
  //   // {
  //   //   label: "Template",
  //   //   icon: <BsJournalArrowDown style={{ color: "#3F51B5" }} />,
  //   //   command: () => {
  //   //     setIsTemplateMessage(true);
  //   //   },
  //   // },
  //   {
  //     label: "Excel",
  //     icon: <TableChartOutlinedIcon style={{ color: "#009688" }} />, // Teal
  //     command: () => {
  //       fileInputRef.current.click();

  //   },
  //   },
  // ];

  const items = [
    {
      label: "Document",
      icon: <FilePresentOutlinedIcon style={{ color: "#3F51B5" }} />,
      command: () => {
        if (documentInputRef.current) {
          documentInputRef.current.dataset.type = "document";
          documentInputRef.current.click();
        }
      },
    },
    {
      label: "Excel",
      icon: <TableChartOutlinedIcon style={{ color: "#009688" }} />,
      command: () => {
        if (excelInputRef.current) {
          excelInputRef.current.dataset.type = "excel";
          excelInputRef.current.click();
        }
      },
    },
    {
      label: "Attachment",
      icon: <InsertDriveFileIcon style={{ color: "#795548" }} />,
      command: () => {
        if (attachmentInputRef.current) {
          attachmentInputRef.current.dataset.type = "attachment";
          attachmentInputRef.current.click();
        }
      },
    },
  ];

  // function sendMessage() {}

  function insertEmoji(emoji) {
    const el = inputRef.current;
    if (!el) return;

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const before = input.slice(0, start);
    const after = input.slice(end);

    const newText = before + emoji + after;
    const newPos = start + emoji.length;
    setInput(newText);

    requestAnimationFrame(() => {
      // ...then slam the caret into place
      el.setSelectionRange(newPos, newPos);
      el.focus();
    });
  }

  function getFileType(extension) {
    switch (extension) {
      case "xlsx":
        return <PiMicrosoftExcelLogo size={25} />;
      case "csv":
        return <PiMicrosoftExcelLogo size={25} />;
      case "docx":
        return <FaFileWord size={25} />;
      case "pdf":
        return <PiFilePdf size={25} />;
      default:
        return <InsertDriveFileIcon size={25} />;
    }
  }

  function renderImage(url) {
    return <img src={url} alt="arihant" className="object-cover w-20 h-20" />;
  }
  function renderVideo(url) {
    return (
      <video
        src={url}
        alt="arihant"
        controls
        className="object-cover rounde-lg w-full"
      />
    );
  }
  // function renderDocument(url, type, name) {
  //   return (
  //     <button
  //       className="w-full flex items-center p-3 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
  //       title={name}
  //     >
  //       {/* Icon Section */}
  //       <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-inner flex items-center justify-center text-blue-500">
  //         {getFileType(type)}
  //       </div>

  //       {/* Text Info */}
  //       <div className="flex flex-col ml-4 overflow-hidden">
  //         <span className="font-medium text-gray-800 truncate">
  //           {name || "Untitled Document"}
  //         </span>
  //         <span className="text-sm text-gray-500 mt-1">
  //           {selectedFile?.size || "Unknown size"}
  //         </span>
  //       </div>
  //     </button>
  //   );
  // }

  function renderDocument(url, type, name) {
    return (
      <div className="w-full">
        <div className="w-full h-[32rem] border border-gray-200 rounded-2xl overflow-hidden shadow-md">
          <iframe
            src={url}
            title={name || "PDF Document"}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }

  const [selectMediaDialog, setSelectMediaDialog] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const imageInputRef = useRef(null);
  const attachmentInputRef = useRef(null);
  const excelInputRef = useRef(null);

  const fileTypes = {
    image: { accept: "image/*", label: "Image" },
    video: { accept: "video/*", label: "Video" },
    excel: {
      accept:
        ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      label: "Excel",
    },
    document: { accept: ".pdf,.doc,.docx,.txt", label: "Document" },
    attachment: { accept: "*/*", label: "Attachment" },
  };

  const handleClick = (type) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = fileTypes[type].accept;
      fileInputRef.current.dataset.type = type;
      fileInputRef.current.click();
    }
  };

  // const handleFileSelected = (e) => {
  //   console.log("I am here")
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   console.log("e.target", e)
  //   const type = e.target.dataset.type;
  //   console.log("type", type)

  //   const inputRef = e.target;
  //   const allowedExtensions = inputRef.accept
  //     .split(",")
  //     .map((ext) => ext.replace(/\*/g, "").toLowerCase());
  //   const fileExt = file.name.split(".").pop().toLowerCase();
  //   const isValid =
  //     allowedExtensions.includes(fileExt) || inputRef.accept === "*/*";

  //   if (isValid) {
  //     setSelectedFile({ file, type });
  //     setError("");

  //     // ✅ Create preview URL and open dialog
  //     const fileUrl = URL.createObjectURL(file);
  //     console.log("Dialog trigger check:", { file, type, fileUrl });
  //     setSelectedMedia({
  //       name: file.name,
  //       size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
  //       mimeType: file.type.startsWith("image")
  //         ? "image"
  //         : file.type.startsWith("video")
  //         ? "video"
  //         : "application",
  //       file,
  //       fileUrl,
  //       fileType: fileExt,
  //     });

  //     setSelectMediaDialog(true);
  //   } else {
  //     setSelectedFile(null);
  //     setError(`Please select a valid ${type} file.`);
  //   }

  //   e.target.value = "";
  // };

  const handleFileSelected = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const inputRef = e.target;
    const type = inputRef.dataset.type || "unknown";

    const fileExt = file.name.split(".").pop().toLowerCase();
    const mimeType = file.type.toLowerCase();

    // ✅ Determine allowed types more robustly
    const allowedImage = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    const allowedVideo = ["video/mp4", "video/webm", "video/ogg"];
    const allowedPdf = ["application/pdf"];

    // let detectedType = "other";

    // if (allowedImage.includes(mimeType) || mimeType.startsWith("image/")) {
    //   detectedType = "image";
    // } else if (
    //   allowedVideo.includes(mimeType) ||
    //   mimeType.startsWith("video/")
    // ) {
    //   detectedType = "video";
    // } else if (allowedPdf.includes(mimeType)) {
    //   detectedType = "pdf";
    // }

    // console.log("Detected File Type:", detectedType);

    let detectedType = "application"; // default to document/attachment

    if (allowedImage.includes(mimeType) || mimeType.startsWith("image/")) {
      detectedType = "image";
    } else if (
      allowedVideo.includes(mimeType) ||
      mimeType.startsWith("video/")
    ) {
      detectedType = "video";
    }

    // ✅ Validation
    if (detectedType === "other") {
      setSelectedFile(null);
      setError(`Unsupported file type: ${fileExt.toUpperCase()}`);
      return;
    }

    // ✅ Save and preview
    setSelectedFile({ file, type: detectedType });
    setError("");

    const fileUrl = URL.createObjectURL(file);

    setSelectedMedia({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      mimeType: detectedType,
      file,
      fileUrl,
      fileType: fileExt,
    });

    setSelectMediaDialog(true);

    // Reset input so same file can be re-uploaded if needed
    e.target.value = "";
  };

  return (
    <div>
      {selectedMedia?.fileUrl && (
        <Dialog
          // header=""
          // visible={true}
          visible={selectMediaDialog}
          onHide={() => setSelectMediaDialog(false)}
          className="w-[40rem]"
          draggable={false}
        >
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 bottom-17 w-full bg-gray-50 border-1 border-red-300 rounded-md shadow-md px-4 py-2 mb-4"
          > */}
          <div className="relative justify-center items-center flex flex-col">
            {selectedMedia.mimeType === "image" && (
              <button className="flex items-center gap-1">
                <img
                  src={selectedMedia?.fileUrl}
                  alt=""
                  className="mb-2 w-full object-fit-contain h-100 pointer-events-none rounded-md"
                />
              </button>
            )}
            {selectedMedia.mimeType === "video" &&
              renderVideo(selectedMedia.fileUrl)}
            {/* {selectedMedia.mimeType === "application" &&
              renderDocument(
                selectedMedia?.fileUrl,
                selectedMedia.fileType,
                selectedMedia.name
              )} */}

            {selectedMedia.mimeType === "application" &&
              renderDocument(
                selectedMedia?.fileUrl,
                selectedMedia.fileType,
                selectedMedia.name
              )}

            {/* <span
              className="absolute text-red-500 cursor-pointer top-1 right-1"
              onClick={() =>
                setSelectedMedia({
                  name: "",
                  size: "0MB",
                  mimeType: "text",
                  file: null,
                  fileUrl: null,
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span> */}
            {/* <span
                className="absolute text-gray-500 cursor-pointer top-0 right-0 bg-gray-200 hover:bg-gray-400 rounded-full p-0.5"
                onClick={() =>
                  setSelectedMedia({
                    name: "",
                    size: "0MB",
                    mimeType: "text",
                    file: null,
                    fileUrl: null,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span> */}

            <button
              onClick={sendMessage}
              className="flex items-center gap-2 mt-2 px-4 py-2 text-black bg-gray-100 rounded-full hover:bg-gray-200 hover:text-gray-700 transition-all active:scale-95 cursor-pointer"
            >
              <FiSend className="text-xl" />
              <span className="font-medium">Send</span>
            </button>
          </div>
          {/* </motion.div> */}
        </Dialog>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center w-full py-2 px-2 bg-white border-t mb-25 md:mb-0"
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
          <button
            onClick={sendMessage}
            //   disabled={!selectedImage && !input}
            className="flex items-center justify-center w-9 h-9 text-black transition-all  rounded-full hover:text-gray-500 hover:bg-gray-200 cursor-pointer active:scale-105 md:mr-2"
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

        <div className="relative flex items-center gap-2 ml-2">
          <CustomTooltip title="Template" placement="top" arrow>
            <div
              onClick={() => setIsTemplateMessage(true)}
              className="cursor-pointer p-1.5 rounded-full hover:bg-gray-200 hover:text-blue-400 text-blue-900 transition-all duration-200"
            >
              <BsJournalArrowDown fontSize="18px" />
            </div>
          </CustomTooltip>
          {/* <CustomTooltip
            title="Photos & Videos"
            placement="top"
            arrow
          >
            <div
              // onClick={() => fileInputRef.current.click()}
              onClick={() => handleClick("image")}
              className="cursor-pointer p-1.5 rounded-full hover:bg-gray-200 hover:text-orange-800 text-[#FF9800] transition-all duration-200">
              <ImageOutlinedIcon sx={{
                fontSize: 23
              }} />
            </div>
          </CustomTooltip> */}
          <CustomTooltip title="Photos & Videos" placement="top" arrow>
            <div
              onClick={() => imageInputRef.current.click()}
              className="cursor-pointer p-1.5 rounded-full hover:bg-gray-200 hover:text-orange-800 text-[#FF9800] transition-all duration-200"
            >
              <ImageOutlinedIcon sx={{ fontSize: 23 }} />
            </div>
          </CustomTooltip>

          {/* 
          <button
            onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
            className={`flex items-center justify-center w-8 h-8 cursor-pointer bg-[#22577E] text-white rounded-full shadow-md transition-transform ${isSpeedDialOpen ? "rotate-45" : ""
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
                  // onClick={item.command}
                onClick={() => handleClick(item.accept)}
                  className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </motion.div>
          )} */}

          <button
            onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
            className={`flex items-center justify-center w-8 h-8 cursor-pointer bg-[#22577E] text-white rounded-full shadow-md transition-transform ${
              isSpeedDialOpen ? "rotate-45" : ""
            }`}
          >
            <FaPlus />
          </button>

          {/* SpeedDial Menu */}
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

          {/* Hidden Inputs */}
          <input
            ref={imageInputRef}
            type="file"
            style={{ display: "none" }}
            multiple
            accept="image/*,video/*"
            onChange={(e) => handleFileSelected(e, "image")}
          />
          <input
            ref={attachmentInputRef}
            type="file"
            style={{ display: "none" }}
            multiple
            accept="*/*"
            onChange={(e) => handleFileSelected(e, "")}
          />
          <input
            ref={documentInputRef}
            type="file"
            style={{ display: "none" }}
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => handleFileSelected(e)}
          />
          <input
            ref={excelInputRef}
            type="file"
            style={{ display: "none" }}
            multiple
            accept=".xls,.xlsx,.csv"
            onChange={(e) => handleFileSelected(e)}
          />
        </div>
      </motion.div>
    </div>
  );
};
