import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FileUpload } from "primereact/fileupload";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";

// CSS
import "primereact/resources/primereact.min.css";

// MUI MATERRIAL
import { Divider } from "@mui/material";

// ICONS
import { FaEye, FaSave } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

// COMPONENTS
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import Preview from "./components/preview";

// API
import { uploadImageFile } from "@/apis/whatsapp/whatsapp.js";
import { getSpeicificNotification, saveNotification } from "@/apis/admin/admin";
// import { addEmailTemplate } from "@/apis/email/Email";

const DEFAULT_VARIABLES = ["username", "email", "otp", "link"];

export const Email = ({ state, allVar }) => {
  const [form, setForm] = useState({
    fromEmail: "",
    replyAddress: "",
    ccAddress: "",
    bccAddress: "",
    subject: " ",
    bodyFormat: "",
  });

  const [cursorPos, setCursorPos] = useState(0);
  const editorRef = useRef(null);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (variable) => {
    const quill = editorRef.current?.getQuill();
    if (!quill) return;

    const pos = quill.getSelection()?.index ?? quill.getLength();
    quill.insertText(pos, variable);
    quill.setSelection(pos + variable.length);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Custom Header (no cancel button)
  const customHeaderTemplate = (options) => {
    const { className, chooseButton, uploadButton } = options;
    return (
      <div className={className + " flex justify-start items-center "}>
        <div className="">
          {chooseButton}
          {uploadButton}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const quill = editorRef.current?.getQuill();
    if (!quill) return;

    const handleSelectionChange = (range) => {
      if (range) {
        setCursorPos(range.index); // store caret position
      }
    };

    quill.on("selection-change", handleSelectionChange);

    return () => {
      quill.off("selection-change", handleSelectionChange);
    };
  }, [editorRef.current]);
  // Custom Item Preview (no delete icon)
  const customItemTemplate = (file, props) => {
    const isImage = file.type.startsWith("image/");

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1rem",
          border: "1px solid var(--surface-border)",
          borderRadius: "6px",
          backgroundColor: "var(--surface-50)",
          marginTop: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {isImage ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid var(--surface-border)",
              }}
            />
          ) : (
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#fef2f2",
                borderRadius: "4px",
                border: "1px solid var(--surface-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <i className="pi pi-file-pdf" style={{ color: '#dc2626', fontSize: '1.5rem' }}></i> */}
              <PictureAsPdfIcon sx={{ fontSize: 20, color: "skyblue" }} />
            </div>
          )}
          <div>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "var(--text-color)",
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {file.name}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-color-secondary)",
              }}
            >
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        </div>
        {/* Custom Delete Button inside preview card */}
        <button
          onClick={handleDelete}
          style={{
            padding: "0.5rem 0.75rem",
            backgroundColor: "#dc2626",
            color: "white",
            fontSize: "0.75rem",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#b91c1c")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc2626")}
        >
          <i className="pi pi-trash" style={{ fontSize: "0.75rem" }}></i>
          Delete
        </button>
      </div>
    );
  };

  // Upload handler
  // const handleFileChange = async ({ files }) => {
  //   const file = files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     console.log("File selected:", file.name);
  //     try {
  //       const response = await uploadImageFile(file);
  //       console.log("Upload successful:", response);
  //     } catch (err) {
  //       console.error("Upload failed:", err);
  //     }
  //   }
  // };

  const handleFileChange = async ({ files }) => {
    const file = files?.[0];
    if (file) {
      setSelectedFile(file); // still useful for preview

      try {
        const response = await uploadImageFile(file); // your API call

        // ✅ Save the uploaded file's info (especially fileUrl)
        if (response?.fileUrl) {
          setUploadedFile({
            name: response.fileName,
            url: response.fileUrl,
            type: file.type || response.fileType,
          });
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  // Delete Handler
  const handleDelete = () => {
    setSelectedFile(null);
    fileInputRef.current?.clear();
  };

  const handleSave = async () => {
    let isError = false;

    Object.keys(form).forEach((key) => {
      if (!form[key]) isError = true;
    });
    if (isError) {
      return toast.error("Please fill all the fields");
    }

    try {
      const payload = {
        ...form,
        reminderSrno: state,
        notificationStatus: "on",
      };
      const res = await saveNotification("email", payload);
      if (!res?.success) {
        return toast.error(res?.message);
      }
      toast.success(res?.message);
    } catch (e) {
      toast.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = {
          srno: state,
          type: "email",
        };
        const res = await getSpeicificNotification(payload);
        // if (!res?.success) {
        //   return;
        // }
        if (!res?.success || !Array.isArray(res?.data) || res.data.length === 0) {
          toast.error(res?.message || "No records found");
          return;
        }
        // const agentId = res?.data[0]?.agentId;
        setForm(res?.data);

        const quill = editorRef.current?.getQuill();
        if (quill) {
          quill.clipboard.dangerouslyPasteHTML(res?.data?.bodyFormat);
        }
      } catch (e) {
        // toast.error("Something Went Wrong!");
        toast.error(e?.message || "Something went wrong");
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("form", form);
  // }, [form]);

  return (
    <>
      <div className="w-full flex flex-wrap lg:flex-nowrap gap-4 overflow-scroll h-auto">
        <div className="w-full p-3 border rounded-2xl bg-gray-50 space-y-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Address
              </label>
              <input
                type="text"
                name="fromEmail"
                value={form?.fromEmail}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="johndoe@me.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reply Address
              </label>
              <input
                type="text"
                name="replyAddress"
                value={form?.replyAddress}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="johndoe@me.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form?.subject}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="e.g. Your login code is..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CC
              </label>
              <input
                type="text"
                name="ccAddress"
                value={form?.ccAddress}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="e.g. Your cc email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BCC
              </label>
              <input
                type="text"
                name="bccAddress"
                value={form?.bccAddress}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="e.g. Your bcc email"
              />
            </div>
          </motion.div>

          {/* <div className="card w-full mt-3">
            <p className="block text-sm font-medium text-gray-700 mb-1">
              Add Attachment
            </p>
            <FileUpload
              ref={fileInputRef}
              name="demo[]"
              customUpload
              uploadHandler={handleFileChange}
              multiple={false}
              accept="image/*,application/pdf"
              maxFileSize={1000000}
              headerTemplate={customHeaderTemplate}
              itemTemplate={selectedFile ? customItemTemplate : null}
              chooseOptions={{ className: "p-button-sm" }}
              uploadOptions={{ className: "p-button-sm" }}
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
            />
          </div> */}

          <div className="flex items-center gap-5 justify-between mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-2">
              Body
            </label>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setShowDropdown(true);
                }}
                disabled={false}
                className="font-medium text-gray-700 text-sm hover:underline cursor-pointer mr-2"
              >
                + Add Variables
              </button>

              {showDropdown && (
                <div className="absolute min-w-30 z-99999  left-[35px] max-h-47 overflow-auto  bg-white border border-gray-300 rounded-sm shadow-md top-0 ">
                  {allVar && allVar.length > 0 ? (
                    allVar.map((variable, idx) => (
                      <React.Fragment key={variable + idx}>
                        <button
                          key={idx}
                          className="block w-full py-2 px-1 text-[0.85rem] tracking-wide text-gray-700 hover:bg-gray-100 cursor-pointer text-center whitespace-nowrap focus:outline-none"
                          onClick={() => {
                            handleSelect(variable);
                            setShowDropdown(false);
                          }}
                        >
                          {variable}
                        </button>
                        <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                      </React.Fragment>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center whitespace-nowrap py-1 text-[0.8rem] tracking-wide">
                      No variables!{" "}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl  ">
            <Editor
              name="bodyFormat"
              value={form?.bodyFormat}
              onTextChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  bodyFormat: e.htmlValue,
                }));
              }}
              ref={editorRef}
              style={{
                height: "320px",
                maxWidth: "800px",
                borderBottomRightRadius: "15px",
                borderBottomLeftRadius: "15px",
              }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {form?.bodyFormat?.replace(/<[^>]+>/g, "").length || 0} / 2000
            characters
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handleSave}
              className="bg-[#578FCA] text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-[#3674B5] transition cursor-pointer hover:scale-108 text-sm tracking-wider hover:shadow-xl"
            >
              Save
            </button>
          </div>
        </div>

        <div className="w-full p-3 border rounded-2xl bg-gray-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-md shadow-sm h-full flex flex-col gap-3 "
          >
            <h3 className="text-lg text-center font-semibold text-gray-800 mb-2">
              Preview
            </h3>
            <Preview
              body={form?.bodyFormat}
              senderName="Celitix"
              recipients="Recipient Name"
              uploadedFile={null}
            />
          </motion.div>
        </div>
        {/* Floating Input Box */}
      </div>
    </>
  );
};