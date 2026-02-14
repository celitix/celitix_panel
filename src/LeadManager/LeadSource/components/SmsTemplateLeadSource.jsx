import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

// ==================================================ICONS===========================================================
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// ================================================APIS===============================================================
import { getAllTemplates } from "@/apis/sms/sms";
import {
  assignLeadSourceServiceToUser,
  getLeadSourceVariable,
} from "@/apis/leadmanager/leadmanager";

// ================================================COMPONENTS=============================================================
import DropdownWithSearch from "@/admin/components/DropdownWithSearch";
import UniversalButton from "@/admin/components/UniversalButton";

const SmsTemplateLeadSource = ({ userSrNo, leadSourceSrno }) => {
  const [tempList, setTempList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedSenderId, setSelectedSenderId] = useState(null);

  const [activeVar, setActiveVar] = useState(false);
  const [activeUrlVar, setActiveUrlVar] = useState(null);

  const textareaRef = React.useRef(null);

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

  useEffect(() => {
    const fetchAllTemplate = async () => {
      try {
        const res = await getAllTemplates("all");
        console.log("Template List Response:", res);
        setTempList(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllTemplate();
  }, []);

  const selectTemplate = tempList.find(
    (t) => t.templateId === selectedTemplate,
    (t) => t.entityId === selectedTemplate,
  );

  const senderIdOptions =
    selectTemplate?.senderID?.split(",").map((id) => ({
      label: id.trim(),
      value: id.trim(),
    })) || [];

  const GSM_7_REGEX =
    /^[\x00-\x7F€£¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#\$%&'\(\)\*\+,\-\.\/0-9:;<=>\?@A-Z\[\\\]\^_`a-z\{\|\}~\n\r]*$/;

  const isUnicodeMessage = (text = "") => {
    return !GSM_7_REGEX.test(text);
  };

  const indicatorValue = selectedTemplate
    ? isUnicodeMessage(selectTemplate.message)
      ? 1
      : 0
    : 0;

  const handleSmsTemplateSave = async () => {
    try {
      if (!selectedTemplate) {
        toast.error("Please select Template !");
        return;
      }

      if (!selectedSenderId) {
        toast.error("Please select SenderId!");
        return;
      }

      const payload = {
        userSrNo: userSrNo,
        leadSourceSrno: leadSourceSrno,
        type: "sms",
        smsleadSourceConfigPojo: {
          entityId: selectTemplate.entityId,
          senderId: selectedSenderId,
          templateId: selectTemplate.templateId,
          messageFormat: selectTemplate.message,
          isUnicode: indicatorValue.toString(),
          srNo: 0,
        },
      };

      console.log("Saving payload:", payload);

      const res = await assignLeadSourceServiceToUser(payload);
      console.log("SMS TEMPLATE RESPONSE:", res);

      if (res?.success) {
        toast.success("Template assigned successfully" || res?.message);
      } else {
        toast.error(res?.message || "Failed to save");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Indicator = ({ label, active, color }) => {
    const colors = {
      green: {
        bg: "bg-green-100",
        dot: "bg-green-600",
        ping: "bg-green-500",
        text: "text-green-800",
      },
      blue: {
        bg: "bg-blue-100",
        dot: "bg-blue-600",
        ping: "bg-blue-500",
        text: "text-blue-800",
      },
    };

    const c = colors[color];

    return (
      <div
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 shadow-sm ${
          active ? c.bg : "bg-gray-100"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          {active && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${c.ping}`}
            />
          )}
          <span
            className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
              active ? c.dot : "bg-gray-400"
            }`}
          />
        </span>
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            active ? c.text : "text-gray-500"
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  const replaceSelectedVariable = (newVar) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const message = selectTemplate?.message || "";

   
    const regex = /\{#[^}]+#\}/g;
    let match;
    let foundPlaceholder = null;

    while ((match = regex.exec(message)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      if (cursorPos >= start && cursorPos <= end) {
        foundPlaceholder = match[0];
        break;
      }
    }

    if (!foundPlaceholder) {
      toast.error("Please place cursor inside a variable to replace");
      return;
    }

    setTempList((prevList) =>
      prevList.map((template) => {
        if (template.templateId !== selectedTemplate) {
          return template;
        }

        const updatedMessage = template.message.replace(
          foundPlaceholder,
          `{#${newVar}#}`,
        );

        return {
          ...template,
          message: updatedMessage,
        };
      }),
    );

    setActiveVar(false);
  };

  return (
    <div className="space-y-4">
      <DropdownWithSearch
        label="Select Template"
        placeholder="Select Template"
        value={selectedTemplate}
        options={tempList.map((t) => ({
          label: t.templateName,
          value: t.templateId,
        }))}
        onChange={setSelectedTemplate}
      />

      {selectedTemplate && (
        <>
          {/* Language Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex gap-3">
              <Indicator
                label="English"
                color="green"
                active={indicatorValue === 0}
              />

              <Indicator
                label="Unicode"
                color="blue"
                active={indicatorValue === 1}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col md:flex-row gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 w-full">
              <DropdownWithSearch
                label="Sender ID"
                placeholder="Select Sender ID"
                value={selectedSenderId}
                options={senderIdOptions}
                onChange={setSelectedSenderId}
              />
            </div>

            <div className="w-full">
              <p className="text-xs text-gray-500 mb-1 font-semibold">
                Message Preview
              </p>

              <div className="relative w-full">
                <textarea
                  ref={textareaRef}
                  value={selectTemplate?.message || ""}
                  readOnly
                  className="w-full min-h-[120px] rounded-lg bg-gray-50 p-3 pr-14 text-sm text-gray-800 border focus:outline-none"
                />

                {/* {} Button */}
                <button
                  type="button"
                  onClick={() => setActiveVar((prev) => !prev)}
                  className=" absolute  right-3 top-3 h-8 w-8 flex items-center justify-center   rounded-md  bg-gray-100  text-gray-600 text-xs font-mono font-semibold  hover:bg-blue-50 hover:text-blue-600 transition  "
                >
                  {"{}"}
                </button>

                {/* Floating Panel */}
                {activeVar && (
                  <div
                    className=" absolute right-0 mt-2 top-10 w-45 md:w-72 z-50 bg-white  border border-gray-200 shadow-xl  rounded-xl p-4  "
                  >
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
                          onClick={() => replaceSelectedVariable(item)}
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
          </div>
        </>
      )}

      <UniversalButton label="Save" onClick={handleSmsTemplateSave} />
    </div>
  );
};

export default SmsTemplateLeadSource;
