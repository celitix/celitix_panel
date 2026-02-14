import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";

// UTILS
import PdfFormatter from "@/utils/PdfFormatter";

// CSS
import "primereact/resources/primereact.min.css";

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
import PdfPreview from "./components/PdfPreview";
// import Preview from "../components/Preview";

// API
import { addPdfTemplate, updatePdfTemplate } from "@/apis/utility/Utility";
import { uploadImageFile } from "@/apis/whatsapp/whatsapp.js";
import { utilityFileUpload } from "@/apis/utility/Utility";




const DEFAULT_VARIABLES = ["username", "email", "otp", "link"];

const CreatePdfConverter = () => {
  const [form, setForm] = useState({
    name: "",
    variables: [],
    isActive: 1,
    htmlContent: "",
  });

  // const [text, setText] = useState("");
  const [isVariableVisible, setIsVariableVisible] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [customVariables, setCustomVariables] = useState([]);
  const [customVariable, setCustomVariable] = useState("");

  // Watermark states
  const [watermarkFile, setWatermarkFile] = useState(null);
  const [watermarkUrl, setWatermarkUrl] = useState("");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.2);
  const [watermarkPosition, setWatermarkPosition] = useState("center"); // top, bottom, left, right, center
  const [watermarkSize, setWatermarkSize] = useState(60);

  const [templateContentPayload, setTemplateContentPayload] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      buttons: [
        "paragraph",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "image",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "table",
        "source",
        "|",
        "pageBreak",
      ],
      height: 400,
      observer: {
        timeout: 100,
      },
      uploader: {
        insertImageAsBase64URI: true,
      },
      controls: {
        paragraph: {
          list: {
            p: "Paragraph",
            h1: "Heading 1",
            h2: "Heading 2",
            h3: "Heading 3",
          },
        },
        pageBreak: {
          name: "pageBreak",
          icon: "plus", // or your own SVG
          tooltip: "Insert Page Break",
          exec: (editor) => {
            editor.selection.insertHTML('<div class="page-break"></div>');
          },
        },
      },
      saveSelectionOnBlur: true,
      saveSelectionOnFocus: true,
      autofocus: false,
      removeButtons: ["fullsize", "about"],
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
    }),
    []
  );

  const handleBlur = useCallback((newContent) => {
    setForm((prev) => ({ ...prev, htmlContent: newContent }));
  }, []);

  const handleChangeEditor = useCallback((newContent) => {
    setForm((prev) => ({ ...prev, htmlContent: newContent }));
  }, []);

  const MAX_LENGTH = 2000;

  const navigate = useNavigate();
  const editorRef = useRef(null);

  const location = useLocation();
  const pdfTemplate = location.state?.pdfTemplateData;

  const extractWatermarkFromSavedHtml = (savedHtml) => {
    if (!savedHtml) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(savedHtml, "text/html");

    const styleText = Array.from(doc.querySelectorAll("style"))
      .map(s => s.textContent)
      .join(" ");

    // Extract background-image URL
    const urlMatch = styleText.match(/background-image\s*:\s*url\(["']?(data:image[^"')]+|"[^"']+"|'[^']+')["']?\)/i);
    if (urlMatch) {
      const url = urlMatch[1].replace(/^["']|["']$/g, "");
      setWatermarkUrl(url);
    }

    // Extract size
    const sizeMatch = styleText.match(/background-size\s*:\s*([^;]+)/i);
    if (sizeMatch) {
      const size = parseInt(sizeMatch[1]);
      if (!isNaN(size)) setWatermarkSize(size);
    }

    // Extract opacity
    const opacityMatch = styleText.match(/opacity\s*:\s*([^;}]+)/i);
    if (opacityMatch) {
      const opacity = parseFloat(opacityMatch[1]);
      if (!isNaN(opacity)) setWatermarkOpacity(opacity);
    }
  };

  const cleanHtmlForEditor = (html) => {
    if (!html) return "";

    // Remove the entire <style> block that contains background-image/opacity
    return html
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, (match) => {
        // Only remove if it contains background-image or opacity on body
        if (match.includes("background-image") || match.includes("opacity")) {
          return "<style>/* Watermark styles removed for editor */</style>";
        }
        return match;
      })
      .replace(/<body[^>]*>/gi, "<body>") // remove inline styles on body
      .trim();
  };
  useEffect(() => {
    if (pdfTemplate) {
      const cleanedForEditor = cleanHtmlForEditor(pdfTemplate?.templateContent);
      setForm({
        name: pdfTemplate?.templateName,
        // htmlContent: pdfTemplate?.templateContent,
        htmlContent: cleanedForEditor || "",
        variables: Array.isArray(pdfTemplate?.variables)
          ? pdfTemplate.variables
          : [],
        isActive: pdfTemplate?.isActive || 1,
      });

      // New: extract watermark settings
      extractWatermarkFromSavedHtml(pdfTemplate?.templateContent);
    }
  }, [pdfTemplate]);

  const isLimitExceeded = useCallback(
    () => messageContent.length >= MAX_LENGTH,
    [messageContent]
  );

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("userVars") || "[]");
    setCustomVariables(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const insertAtCursor = useCallback((variable) => {
    const tag = `#${variable}#`;
    const jodit = editorRef.current;

    if (!jodit) return;

    jodit.selection.focus();
    jodit.selection.save();
    jodit.selection.insertHTML(tag);
    jodit.selection.restore();

    // Fixed: Update form correctly
    setForm((prev) => ({
      ...prev,
      htmlContent: jodit.value,
      variables: prev.variables.includes(variable)
        ? prev.variables
        : [...prev.variables, variable],
    }));
  }, []);

  const addCustomVariable = () => {
    if (!customVariable.trim()) return;
    const updated = [...customVariables, customVariable.trim()];
    setCustomVariables(updated);
    sessionStorage.setItem("userVars", JSON.stringify(updated));
    setCustomVariable("");
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleWatermarkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setWatermarkFile(file);

    // Convert directly to Base64 (NO API)
    const base64 = await fileToBase64(file);

    // Set Base64 directly as watermark source
    setWatermarkUrl(base64);
  };

  const handleSave = async () => {
    if (!form.name) {
      toast.error("Template name cannot be empty");
      return;
    }

    if (form.name.length >= 30) {
      toast.error("Template should be less than equals to 20 characters");
      return;
    }
    if (!form.htmlContent || form.htmlContent.trim().length === 0) {
      toast.error("PDF content cannot be empty");
      return;
    }

    let watermarkBase64 = "";
    if (watermarkFile) {
      watermarkBase64 = await fileToBase64(watermarkFile);
    }

    function removeWrapperElements(html) {
      if (!html) return html;

      return html
        .replace(/<div class="mainparent">/gi, "")
        .replace(/<\/div>\s*<!--\s*mainparent\s*-->/gi, "")
        .replace(/<div class="pdf-watermark"><\/div>/gi, "")
        .replace(/<div class="pdf-watermark">\s*<\/div>/gi, "")
        .replace(/<div class="pdf-watermark">[\s\S]*?<\/div>/gi, "")
        .trim();
    }

    function sanitizeEditorContent(html) {
      if (!html) return "";

      return html
        .replace(/<!DOCTYPE[^>]*>/gi, "")
        .replace(/<html[^>]*>/gi, "")
        .replace(/<\/html>/gi, "")
        .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
        .replace(/<body[^>]*>/gi, "")
        .replace(/<\/body>/gi, "")
        .replace(/<meta[^>]*>/gi, "")
        .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .trim();
    }

    const raw = form.htmlContent;

    const withoutWrapper = removeWrapperElements(raw);

    const cleanedContent = sanitizeEditorContent(withoutWrapper);

    // const templateContent =
    //   `<!DOCTYPE html>
    //       <html lang="en">
    //         <head>
    //           <meta charset="UTF-8" />
    //           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //           <title></title>

    //           <style>

    //             .mainparent {
    //               position: relative;
    //               z-index: 5;
    //             }

    //             .pdf-watermark {
    //               position: fixed;
    //               left: 0;
    //               top: 0;
    //               width: 100%;
    //               height: 100%;
    //               z-index: -1;
    //               opacity: ${watermarkOpacity};
    //               background-repeat: no-repeat;
    //               background-position: ${watermarkPosition};
    //               background-size: ${watermarkSize}%;
    //               background-image: url("${watermarkBase64}");
    //             }

    //             .page-break {
    //               page-break-before: always;
    //               break-before: page;
    //             }

    //             .pdf-document .page-break {
    //               border-top: 2px dashed #999;
    //               margin: 24px 0;
    //               padding-top: 4px;
    //               height: 0;
    //               position: relative;
    //             }

    //             .pdf-document .page-break::after {
    //               content: "Page Break";
    //               position: absolute;
    //               top: -12px;
    //               left: 45%;
    //               font-size: 12px;
    //               background: #fff;
    //               color: #666;
    //               padding: 0 6px;
    //             }

    //             .pdf-watermark.top {
    //               top: 10%;
    //               left: 50%;
    //               transform: translate(-50%, 0);
    //             }

    //             .pdf-watermark.bottom {
    //               top: 90%;
    //               left: 50%;
    //               transform: translate(-50%, -100%);
    //             }

    //             .pdf-watermark.left {
    //               top: 50%;
    //               left: 10%;
    //               transform: translate(0, -50%);
    //             }

    //             .pdf-watermark.right {
    //               top: 50%;
    //               left: 90%;
    //               transform: translate(-100%, -50%);
    //             }

    //             .pdf-watermark.center {
    //               top: 50%;
    //               left: 50%;
    //               transform: translate(-50%, -50%);
    //             }
    //           </style>
    //         </head>
    //         <body>
    //           <div class="mainparent">
    //             <div class="pdf-watermark"></div>
    //               ${cleanedContent}
    //           </div>
    //         </body>
    //       </html>`

    // const templateContent = `<!DOCTYPE html>
    //       <html lang="en">
    //         <head>
    //           <meta charset="UTF-8">
    //           <title></title>
    //         <style>
    //           @page {
    //             size: A4;
    //             margin: 20mm;
    //           } 
    //           body {
    //             font-family: Arial, sans-serif;
    //             margin: 0;
    //             padding: 20px;
    //             background-image: url("${watermarkBase64}");
    //             background-repeat: no-repeat;
    //             background-position: center;
    //             background-size: ${watermarkSize}%;
    //             opacity: 0.2;
    //           }

    //           .page-break {
    //             display: block;
    //             page-break-after: always;
    //             break-after: page;
    //           }
    //         </style>
    //         </head>
    //         <body>
    //               ${cleanedContent}
    //         </body>
    //       </html>`;

    const templateContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
    <style>
      @page {
        size: A4;
        margin: 20mm;
      } 
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-image: url("${watermarkBase64}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: ${watermarkSize}%;
        background-color: transparent;
        position: relative;
      }

      /* This is the magic: fake opacity only on background image */
      body::before {
        content: "";
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: inherit;
        background-image: inherit;
        background-repeat: inherit;
        background-position: inherit;
        background-size: inherit;
        opacity: ${watermarkOpacity};
        pointer-events: none;
        z-index: -1;
      }

      .page-break {
        display: block;
        page-break-after: always;
        break-after: page;
      }
    </style>
  </head>
  <body>
    ${cleanedContent}
  </body>
</html>`;

    // save to state for preview
    setTemplateContentPayload(templateContent);

    const sanitizeHtmlForApi = (html) => {
      return html
        .replace(/[\n\r]/g, "")
        .replace(/\t+/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();
    };

    const cleanedHtml = sanitizeHtmlForApi(templateContent);

    const payload = {
      templateName: form.name || "New PDF Template",
      // templateContent: templateContent,
      templateContent: cleanedHtml,
      status: form.isActive || 1,
    };

    console.log("payload when save", payload);

    const srNo = pdfTemplate?.id;

    let response;
    let updatedPayload = {
      ...payload,
      srNo,
    };

    // return;

    if (pdfTemplate) {
      response = await addPdfTemplate(updatedPayload);
    } else {
      response = await addPdfTemplate(payload);
    }

    if (response?.status === true) {
      toast.success(response.msg);
      navigate("/texttopdfconverter");
    } else {
      toast.error(response?.msg || "Failed to add Pdf template");
    }
  };

  const watermarkInputRef = useRef(null);
  const removeWatermark = () => {
    setWatermarkUrl("");
    setWatermarkFile(null);

    if (watermarkInputRef.current) {
      watermarkInputRef.current.value = "";
    }
  };


  <style jsx global>{`
    .jodit-wysiwyg,
    .jodit-wysiwyg * {
      opacity: 1 !important;
    }
    .jodit-wysiwyg body {
      opacity: 1 !important;
    }
    .editor-watermark img {
      opacity: ${watermarkOpacity} !important;
    }
  `}</style>


  return (
    <>
      <span className="text-lg font-semibold text-center w-full mb-2 flex items-center justify-center">
        Create PDF Template
      </span>

      <div className="w-full p-3 border rounded-2xl bg-gray-50 space-y-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-1 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
              placeholder="e.g. Welcome Template"
            />
          </div>
        </motion.div>

        <div className="flex rounded-xl gap-4 flex-wrap lg:flex-nowrap">
          <div className="lg:w-3/4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Body
            </label>

            <div className="relative">
              <JoditEditor
                ref={editorRef}
                value={form.htmlContent || ""}
                config={config}
                // tabIndex={1}
                onBlur={handleBlur}
              // onChange={handleChangeEditor}
              />

              {/* WATERMARK OVERLAY (CONSTRAINED INSIDE EDITOR) */}
              {watermarkUrl && (
                <div
                  className="editor-watermark"
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    display: "flex",
                    justifyContent:
                      watermarkPosition === "left"
                        ? "flex-start"
                        : watermarkPosition === "right"
                          ? "flex-end"
                          : "center",
                    alignItems:
                      watermarkPosition === "top"
                        ? "flex-start"
                        : watermarkPosition === "bottom"
                          ? "flex-end"
                          : "center",
                    padding: "10px",
                    marginTop: "38px",
                    marginBottom: "0px",
                  }}
                >
                  <img
                    src={watermarkUrl}
                    alt="Watermark"
                    style={{
                      maxWidth: `${watermarkSize}%`,
                      maxHeight: `${watermarkSize}%`,
                      opacity: watermarkOpacity,
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="lg:w-1/4 w-full">
            {/* WATERMARK UPLOAD + CONTROLS */}
            <div className=" relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Watermark
              </label>

              <input
                ref={watermarkInputRef}
                type="file"
                accept="image/*"
                onChange={handleWatermarkUpload}
                className="block w-full text-sm border border-gray-300 rounded-md bg-white px-3 py-2 cursor-pointer hover:border-gray-400 transition"
              />

              {watermarkUrl && (
                <div
                  onClick={removeWatermark}
                  style={{
                    position: "absolute",
                    top: "29px",
                    right: "10px",
                    cursor: "pointer",
                    background: "#fff",
                    borderRadius: "50%",
                    padding: "3px",
                    // boxShadow: "0 2px 5px rgba(0,0,0,0.25)",
                    zIndex: 20,
                  }}
                >
                  <IoMdCloseCircle size={22} color="red" />
                </div>
              )}

              {watermarkUrl && (
                <>
                  <div className="mt-2">
                    <label className="text-sm font-medium text-gray-600">
                      Watermark Opacity
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="mt-3 ">
                    <label className="text-sm font-medium text-gray-600">
                      Watermark Size ({watermarkSize}%)
                    </label>

                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={watermarkSize}
                      onChange={(e) => setWatermarkSize(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  {/* <div className="mt-3">
                    <label className="text-sm font-medium text-gray-600">
                      Watermark Position
                    </label>
                    <select
                      value={watermarkPosition}
                      onChange={(e) => setWatermarkPosition(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg mt-1 text-sm"
                    >
                      <option value="center">Center</option>
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div> */}
                </>
              )}
            </div>

            <div className="space-y-2 relative border mt-2 rounded-xl px-2 py-2">
              <div className="relative">
                <p className="text-xs text-gray-500 mt-1 italic">
                  Note: If you manually type a value in the format{" "}
                  <span className="font-semibold text-gray-700">
                    #variableName#
                  </span>
                  , it will automatically be recognized and converted into a
                  variable in the editor.
                </p>
                <div className="flex flex-wrap items-center justify-between border-b">
                  <p className="font-semibold text-gray-700 text-sm">
                    Insert Created Variables
                  </p>
                  <button
                    onClick={() => setIsVariableVisible(true)}
                    disabled={isLimitExceeded()}
                    className="font-semibold text-gray-700 text-sm cursor-pointer hover:bg-[#578FCA] hover:text-white transition-all duration-200 border-2 border-[#578FCA] p-2 mb-1 rounded-xl"
                  >
                    + Add Variables
                  </button>
                </div>
                {isVariableVisible && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="absolute bottom-16 -right-5 md:right-0 bg-white border rounded-lg shadow-lg p-3 w-max z-99">
                      <button
                        onClick={() => setIsVariableVisible(false)}
                        className="text-xs text-gray-500 mt-1 absolute right-1 top-0"
                      >
                        <CloseOutlinedIcon sx={{ fontSize: 20 }} />
                      </button>
                      <div className="flex flex-wrap items-end gap-3">
                        <InputField
                          label="Add New Variable"
                          value={customVariable}
                          onChange={(e) => setCustomVariable(e.target.value)}
                          placeholder="e.g. couponCode"
                        />
                        <div className="w-max text-nowrap">
                          <UniversalButton
                            label="Add Variable"
                            onClick={addCustomVariable}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {[...DEFAULT_VARIABLES, ...customVariables].map((v) => (
                  <button
                    key={v}
                    onClick={() => insertAtCursor(v)}
                    className="px-3 py-1 text-sm bg-[#578FCA] text-white rounded-full hover:scale-105 transition"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" border border-gray-200 rounded-lg h-100">
          <PdfFormatter htmlContent={templateContentPayload} />
        </div> */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={handleSave}
            className="bg-[#578FCA] text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-[#3674B5] transition cursor-pointer hover:scale-108 text-sm tracking-wider hover:shadow-xl"
          >
            <FaSave /> {pdfTemplate ? "Update Template" : "Save Template"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePdfConverter;
