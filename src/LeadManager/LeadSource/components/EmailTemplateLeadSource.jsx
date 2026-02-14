import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Editor } from "primereact/editor";

// ================================================ICONS=================================================================
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// ================================================APIS===================================================================
import {
  assignLeadSourceServiceToUser,
  getLeadSourceVariable,
} from "@/apis/leadmanager/leadmanager";

// =======================================================COMPONENTS=======================================================
import InputField from "@/admin/components/InputField";
import UniversalButton from "@/admin/components/UniversalButton";
import UniversalTextArea from "@/admin/components/UniversalTextArea";

const EmailTemplateLeadSource = ({ userSrNo, leadSourceSrno }) => {
  const [fromEmail, setFromEmail] = useState("");
  const [replyAddress, setReplyAddress] = useState("");
  const [ccAddress, setCcAddress] = useState("");
  const [bccAddress, setBccAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [bodyFormatter, setBodyFormatter] = useState("");
  const [showVariablePanel, setShowVariablePanel] = useState(false);
  const [variableInput, setVariableInput] = useState("");
  const [variableChips, setVariableChips] = useState([]);

  const [activeVar, setActiveVar] = useState(false);

  const defaultLeadSourceVariables = [
    "UNIQUE_QUERY_ID",
    "QUERY_TYPE",
    "QUERY_TIME",
    "SENDER_NAME",
    "SENDER_MOBILE",
    "SENDER_EMAIL",
    "SUBJECT",
    "SENDER_COMPANY",
    "SENDER_ADDRESS",
    "SENDER_CITY",
    "SENDER_STATE",
    "SENDER_PINCODE",
    "SENDER_COUNTRY_ISO",
    "SENDER_MOBILE_ALT",
    "SENDER_PHONE",
    "SENDER_PHONE_ALT",
    "SENDER_EMAIL_ALT",
    "QUERY_PRODUCT_NAME",
    "QUERY_MESSAGE",
    "QUERY_MCAT_NAME",
    "CALL_DURATION",
    "RECEIVER_MOBILE",
  ];
  const [leadSourceVariable, setLeadSourceVariable] = useState(
    defaultLeadSourceVariables,
  );

  useEffect(() => {
    const fetchLeadSourceVariable = async () => {
      try {
        const res = await getLeadSourceVariable();
        console.log("Lead Source Variable Response:", res?.data);

        if (Array.isArray(res?.data) && res.data.length > 0) {
          setLeadSourceVariable(res.data);
        } else {
          setLeadSourceVariable(defaultLeadSourceVariables);
        }
      } catch (error) {
        console.log(error);

        setLeadSourceVariable(defaultLeadSourceVariables);
      }
    };

    fetchLeadSourceVariable();
  }, []);

  // =============================================================BODY FORMATTER FUCTION ===================================================================
  const editorRef = useRef();

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmailList = (emails) => {
    if (!emails) return true;

    return emails
      .split(",")
      .map((e) => e.trim())
      .every((email) => EMAIL_REGEX.test(email));
  };

  const VARIABLE_REGEX = /\{#[a-z]+(?:_[a-z]+)*#\}/g;

  const extractVariables = (text) => {
    return [...new Set(text.match(VARIABLE_REGEX) || [])];
  };

  const validateVariables = () => {
    const vars = extractVariables(bodyFormatter);

    for (let v of vars) {
      if (!variableChips[v]) {
        toast.error(`Missing value for ${v}`);
        return false;
      }
    }
    return true;
  };

  const handleAddVariable = () => {
    const quill = editorRef.current?.getQuill();
    if (!quill) return;

    const range = quill.getSelection(true);

    quill.insertText(range.index, "{#text#}", "user");
    quill.setSelection(range.index + 8);

    setTimeout(() => {
      setBodyFormatter(quill.root.innerHTML);
    }, 0);

    setShowVariablePanel(true);
  };

  const handleAddVariableValue = () => {
    if (!variableInput.trim()) return;

    const variable = toVariable(variableInput);

    setVariableChips((prev) => ({
      ...prev,
      [variable]: variableInput,
    }));

    setVariableInput("");
    setShowVariablePanel(false);
  };

  const replaceTextPlaceholder = (variable) => {
    const quill = editorRef.current?.getQuill();
    if (!quill) return;

    const html = quill.root.innerHTML.replace("{#text#}", variable);
    quill.root.innerHTML = html;

    setBodyFormatter(html);
  };

  const toVariable = (text) =>
    `{#${text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z_]/g, "")}#}`;

  const PLACEHOLDER = "{#text#}";

  const insertChipVariable = (variable) => {
    const quill = editorRef.current?.getQuill();
    if (!quill) return;

    let html = quill.root.innerHTML;

    if (html.includes(PLACEHOLDER)) {
      html = html.replace(PLACEHOLDER, variable);
      quill.root.innerHTML = html;
      setBodyFormatter(html);
      return;
    }

    const range = quill.getSelection(true);
    quill.insertText(range.index, variable, "user");
    quill.setSelection(range.index + variable.length);

    setTimeout(() => {
      setBodyFormatter(quill.root.innerHTML);
    }, 0);
  };

  const deleteVariableChip = (key) => {
    setVariableChips((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const validateEmailTemplate = () => {
    if (!fromEmail || !EMAIL_REGEX.test(fromEmail)) {
      toast.error("Enter a valid From Email");
      return false;
    }

    if (replyAddress && !EMAIL_REGEX.test(replyAddress)) {
      toast.error("Enter a valid Reply To email");
      return false;
    }

    if (!validateEmailList(ccAddress)) {
      toast.error("Invalid CC email(s)");
      return false;
    }

    if (!validateEmailList(bccAddress)) {
      toast.error("Invalid BCC email(s)");
      return false;
    }

    if (!subject.trim()) {
      toast.error("Email subject is required");
      return false;
    }

    if (!bodyFormatter || bodyFormatter.replace(/<[^>]*>/g, "").trim() === "") {
      toast.error("Email body is empty");
      return false;
    }

    if (!validateVariables()) return false;

    return true;
  };

  const handleSaveEmailTemplate = async () => {
    if (!validateEmailTemplate()) return;

    try {
      const payload = {
        userSrNo: userSrNo,
        leadSourceSrno: leadSourceSrno,
        type: "email",
        emailLeadSourceConfig: {
          srNo: 0,
          fromEmail: fromEmail,
          replyAddress: replyAddress,
          ccAddress: ccAddress,
          bccAddress: bccAddress,
          subject: subject,
          bodyFormat: bodyFormatter,
        },
      };

      console.log("Saving Payload of EmailTemplate:", payload);

      const res = await assignLeadSourceServiceToUser(payload);
      console.log("Email template savinng response:", res);

      if (res?.success) {
        toast.success("Template assigned successfully" || res?.message);
      } else {
        toast.error(res?.message || "Failed to save");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const renderPreviewHTML = () => {
    let html = bodyFormatter || "";

    Object.entries(variableChips).forEach(([key, val]) => {
      html = html.replaceAll(key, val);
    });

    return html;
  };

  const replaceSelectedVariableInEditor = (newVar) => {
    const quill = editorRef.current?.getQuill();
    if (!quill) return;

    quill.focus();

    let range = quill.getSelection();

    if (!range) {
      range = { index: quill.getLength(), length: 0 };
    }

    const variableText = `{#${newVar}#}`;

    quill.insertText(range.index, variableText);

    quill.setSelection(range.index + variableText.length);

    setBodyFormatter(quill.root.innerHTML);

    setActiveVar(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ============================ LEFT SIDE ============================ */}
        <div className="space-y-10">
          {/* EMAIL HEADERS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Email Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="From Email"
                placeholder="no-reply@company.com"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
              />

              <InputField
                label="Reply To"
                placeholder="support@company.com"
                value={replyAddress}
                onChange={(e) => setReplyAddress(e.target.value)}
              />

              <InputField
                label="CC"
                placeholder="example@gmail.com"
                value={ccAddress}
                onChange={(e) => setCcAddress(e.target.value)}
              />

              <InputField
                label="BCC"
                placeholder="example@gmail.com"
                value={bccAddress}
                onChange={(e) => setBccAddress(e.target.value)}
              />
            </div>
          </div>

          {/* SUBJECT */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Email Subject
            </h3>

            <UniversalTextArea
              placeholder="Enter your email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full"
            />
          </div>

          {/* EMAIL BODY */}
          <div>
            <div className="flex flex-wrap gap-3 items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Email Content
              </h3>

              <UniversalButton
                label="Add Variable"
                onClick={handleAddVariable}
              />
            </div>

            <div className="border border-gray-300 rounded-xl shadow-sm relative">
              <Editor
                ref={editorRef}
                value={bodyFormatter}
                onTextChange={(e) => setBodyFormatter(e.htmlValue || "")}
                style={{ height: "320px" }}
              />
              {/* Right side button */}
              <button
                type="button"
                onClick={() => setActiveVar((prev) => !prev)}
                className=" absolute right-2 text-xs md:text-sm top-55 md:top-25 -translate-y-1/2 h-6 w-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800  transition shadow-sm"
              >
                {"{ }"}
              </button>

              {activeVar && (
                <div className="absolute right-0 mt-2 top-10 w-45 md:w-72 z-50  bg-white border border-gray-200 shadow-xl rounded-xl p-4 overflow-x-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Insert Variable
                    </h4>

                    <button
                      onClick={() => setActiveVar(false)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <CancelOutlinedIcon fontSize="small" />
                    </button>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {leadSourceVariable.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => replaceSelectedVariableInEditor(item)}
                        className="px-2 py-1 text-sm rounded-md cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* VARIABLE PANEL */}
          {showVariablePanel && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3 max-w-md">
              <h4 className="text-sm font-semibold text-gray-700">
                Add Variable
              </h4>

              <InputField
                value={variableInput}
                onChange={(e) => setVariableInput(e.target.value)}
                placeholder="Enter variable value"
              />

              <UniversalButton
                label="Add Variable Value"
                onClick={handleAddVariableValue}
                className="w-full"
              />
            </div>
          )}

          {/* VARIABLE CHIPS */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(variableChips).map(([key, val]) => (
              <div
                key={key}
                onClick={() => insertChipVariable(key)}
                className="flex items-center bg-blue-100 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200 transition"
              >
                <span className="text-sm font-medium">{val}</span>

                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteVariableChip(key);
                  }}
                >
                  <CancelOutlinedIcon />
                </button>
              </div>
            ))}
          </div>

          {/* SAVE */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <UniversalButton
              label="Save Email Template"
              onClick={handleSaveEmailTemplate}
              className="px-8"
            />
          </div>
        </div>

        {/* ============================ RIGHT SIDE (PREVIEW) ============================ */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Email Preview
          </h3>

          <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 p-4 space-y-1 text-sm">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700">From:</span>
                <span className="text-gray-600">
                  {fromEmail || "no-reply@company.com"}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="font-semibold text-gray-700">To:</span>
                <span className="text-gray-600">customer@email.com</span>
              </div>

              {ccAddress && (
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-700">CC:</span>
                  <span className="text-gray-600">{ccAddress}</span>
                </div>
              )}

              {bccAddress && (
                <div className="flex gap-2">
                  <span className="font-semibold text-gray-700">BCC:</span>
                  <span className="text-gray-600">{bccAddress}</span>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="border-b border-gray-200 px-4 py-3">
              <h4 className="text-base font-semibold text-gray-900">
                {subject || "Your email subject will appear here"}
              </h4>
            </div>

            {/* Body */}
            <div
              className="p-4 prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: renderPreviewHTML() }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateLeadSource;
