import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// ========================================================ICONS=======================================================
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { IoSearch } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { FaLocationCrosshairs, FaReply } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// ========================================================APIS=========================================================
import {
  fetchAllAgents,
  fetchAllTemplates,
  fetchTemplateDetails,
} from "@/apis/rcs/rcs";
import {
  assignLeadSourceServiceToUser,
  getLeadSourceVariable,
} from "@/apis/leadmanager/leadmanager";

// ================================================COMPONENTS=============================================================
import DropdownWithSearch from "@/admin/components/DropdownWithSearch";
import UniversalButton from "@/admin/components/UniversalButton";
import InputField from "@/admin/components/InputField";

const RcsTemplateLeadSouce = ({ userSrNo, leadSourceSrno }) => {
  const [agenList, setAgentList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [tempList, setTempList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [tempDetails, setTempDetails] = useState([]);
  const [varValues, setVarValues] = useState({});
  const [suggestionVariables, setSuggestionVariables] = useState({});

  const [activeVar, setActiveVar] = useState(null);
  const [activeUrlVar, setActiveUrlVar] = useState(null);

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
    const fetchAllAgent = async () => {
      try {
        const res = await fetchAllAgents();
        console.log("AGENT LIST RESPONSE:", res);
        setAgentList(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAgent();
  }, []);

  useEffect(() => {
    const fetchAllTemplate = async () => {
      try {
        const res = await fetchAllTemplates(selectedAgent, 1, "");

        console.log("AGENT TEMPLATE RESPONSE:", res?.Data);

        setTempList(Array.isArray(res?.Data) ? res.Data : []);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedAgent) {
      fetchAllTemplate();
    }
  }, [selectedAgent]);

  useEffect(() => {
    const fetchTemplateDetail = async () => {
      try {
        const res = await fetchTemplateDetails(selectedTemplate);
        console.log("TEMPLATE DETAILS RESPONSE:", res);

        setTempDetails(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedTemplate) {
      fetchTemplateDetail();
    }
  }, [selectedTemplate]);

  const extractVariables = (text = "") => {
    const regex = /\{#(.*?)#\}/g;
    const vars = new Set();
    let match;

    while ((match = regex.exec(text))) {
      vars.add(match[1]);
    }

    return Array.from(vars);
  };

  const VARIABLE_REGEX = /\{#[a-z]+(?:_[a-z]+)*#\}/g;

  const extractSuggestionVariables = (value) => {
    return [...new Set(value.match(VARIABLE_REGEX) || [])];
  };

  useEffect(() => {
    if (!tempDetails?.length) {
      setSuggestionVariables({});
      return;
    }

    const vars = {};
    const cards = tempDetails;

    cards.forEach((card) => {
      card.suggestions?.forEach((s) => {
        const extracted = extractSuggestionVariables(s.suggestionValue);
        extracted.forEach((v) => {
          vars[v] = "";
        });
      });
    });

    setSuggestionVariables(vars);
  }, [tempDetails]);

  useEffect(() => {
    if (!tempDetails?.length) {
      setVarValues({});
      return;
    }

    const vars = getTemplateVariables(tempDetails);

    if (vars.length === 0) {
      setVarValues({});
      return;
    }

    const reset = {};
    vars.forEach((v) => {
      reset[v] = "";
    });

    setVarValues(reset);
  }, [tempDetails]);

  const getTemplateVariables = (cards = []) => {
    const vars = new Set();

    cards.forEach((card) => {
      card.variables?.forEach((v) => vars.add(v));

      extractVariables(card.content).forEach((v) => vars.add(v));
    });

    return Array.from(vars);
  };

  const validateAllVariables = () => {
    //  Validate card variables
    const messageVars = getTemplateVariables(tempDetails);

    for (let v of messageVars) {
      if (!varValues[v] || !varValues[v].trim()) {
        toast.error(`Please enter value for message variable: ${v}`);
        return false;
      }
    }

    // Validate suggestion variables
    const suggestionVars = Object.keys(suggestionVariables);

    for (let v of suggestionVars) {
      if (!suggestionVariables[v] || !suggestionVariables[v].trim()) {
        toast.error(`Please enter value for suggestion variable: ${v}`);
        return false;
      }
    }

    return true;
  };

  const templateTypeConfig = {
    "reply button": { css: "bg-gray-200 text-gray-800", icon: <FaReply /> },
    website: { css: "bg-green-500 text-white", icon: <FaExternalLinkAlt /> },
    mobile: { css: "bg-blue-500 text-white", icon: <BsTelephoneFill /> },
    "view location": { css: "bg-yellow-500", icon: <FaLocationCrosshairs /> },
    "share location": {
      css: "bg-red-300 text-white",
      icon: <TbLocationShare />,
    },
  };

  function base64ToUrl(base64) {
    if (!base64) return "";

    const cleanedBase64 = base64.replace(/^data:application\/pdf;base64,/, "");

    const byteCharacters = atob(cleanedBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    return URL.createObjectURL(blob);
  }

  const MobilePreview = ({ cards = [] }) => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
      setIndex(0);
    }, [cards]);

    if (!Array.isArray(cards) || cards.length === 0) {
      return (
        <div className="flex justify-center">
          <div className="w-[360px] rounded-3xl border bg-gray-100 p-4 text-center text-gray-500">
            No preview available
          </div>
        </div>
      );
    }

    const safeIndex = Math.min(index, cards.length - 1);
    const card = cards[safeIndex];

    return (
      <div className="flex justify-center">
        <div className="w-[560px] rounded-3xl border bg-gray-100 p-3 shadow-lg overflow-y-auto">
          {/* MEDIA */}
          {card.imageUrl?.endsWith(".mp4") ? (
            <video controls className="w-full h-48 rounded-lg object-cover">
              <source src={card.imageUrl} />
            </video>
          ) : card.imageUrl ? (
            <img
              src={card.imageUrl}
              className="w-full h-48 rounded-lg object-cover"
              alt=""
            />
          ) : card["pdfBase64 "] ? (
            <div className=" flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={`data:application/pdf;base64,${card["pdfBase64 "]}`}
                className="w-full h-48 rounded-lg"
                title="PDF Preview"
              />
            </div>
          ) : null}

          {/* BODY */}
          <div className="bg-white rounded-xl p-3 mt-3 space-y-2 overflow-y-auto max-h-70">
            {card.contentTitle && (
              <p className="font-semibold">{card.contentTitle}</p>
            )}

            <p className="text-sm whitespace-pre-wrap">{card.content}</p>

            {card.suggestions?.map((sug, idx) => (
              <div key={idx} className="my-2 w-full">
                <button
                  className={`flex items-center px-4 py-2 text-sm rounded-md w-full justify-center ${templateTypeConfig[sug.type]?.css || ""
                    }`}
                  title={sug.suggestionValue}
                >
                  {templateTypeConfig[sug.type]?.icon}
                  <span className="ml-2">{sug.suggestionTitle}</span>
                </button>
              </div>
            ))}
          </div>

          {/* CONTROLS */}
          {cards.length > 1 && (
            <div className="flex justify-between mt-3">
              <button
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                disabled={safeIndex === 0}
                className="text-sm text-gray-600 disabled:opacity-30"
              >
                <ArrowLeftOutlinedIcon /> Prev
              </button>

              <button
                onClick={() =>
                  setIndex((i) => Math.min(i + 1, cards.length - 1))
                }
                disabled={safeIndex === cards.length - 1}
                className="text-sm text-gray-600 disabled:opacity-30"
              >
                Next <ArrowRightOutlinedIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleRcsTemplateSave = async () => {
    if (!selectedAgent) {
      toast.error("Please Select Agent!");
      return;
    }

    if (!selectedTemplate) {
      toast.error("Please Select Template!");
      return;
    }

    if (!validateAllVariables()) return;

    try {
      const payload = {
        userSrNo: userSrNo,
        leadSourceSrno: leadSourceSrno,
        type: "rcs",
        rcsLeadSourceConfig: {
          srNo: 0,
          agentId: selectedAgent,
          templateSrno: selectedTemplate,
          variableList: varValues,
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
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap md:flex-nowrap gap-5">
        <DropdownWithSearch
          label="Select Agent"
          placeholder="Select Agent"
          value={selectedAgent}
          options={agenList.map((a) => ({
            label: a.agent_name,
            value: a.agent_id,
          }))}
          onChange={setSelectedAgent}
        />

        {selectedAgent && (
          <DropdownWithSearch
            label="Select Template"
            placeholder="Select Template"
            value={selectedTemplate}
            options={(tempList || []).map((t) => ({
              label: t.templateName,
              value: t.srno,
            }))}
            onChange={setSelectedTemplate}
          />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 h-full">
          <h3 className="text-sm font-semibold text-gray-700">
            Extracted Template Values
          </h3>

          {tempDetails?.length === 0 && (
            <p className="text-sm text-gray-500">No template selected</p>
          )}

          {tempDetails?.length > 0 && (
            <>
              {/* Template Type */}
              <div className="text-sm text-gray-600">
                Template Type:{" "}
                <span className="font-semibold capitalize">
                  {tempDetails[0].templateType.replace("_", " ")}
                </span>
              </div>

              {/* VARIABLES */}
              {getTemplateVariables(tempDetails).length > 0 ? (
                <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Variable Values
                  </h4>

                  {getTemplateVariables(tempDetails).map((v) => (
                    <div className="relative w-full">
                      <div key={v} className="space-y-1">
                        <InputField
                          label={`Message Parameter `}
                          placeholder={`Enter value for ${v}`}
                          value={varValues[v] || ""}
                          onChange={(e) =>
                            setVarValues((prev) => ({
                              ...prev,
                              [v]: e.target.value,
                            }))
                          }
                          tooltipContent="Message parameter should not contain any space"
                          tooltipPlacement="right"
                        />
                        {/* Right side button */}
                        <button
                          type="button"
                          onClick={() => setActiveVar(v)}
                          className=" absolute right-2 top-12 -translate-y-1/2 h-6 w-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800  transition shadow-sm"
                        >
                          {"{ }"}
                        </button>

                        {activeVar === v && (
                          <div className="absolute z-50 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4 -right-66 top-2">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold text-gray-700">
                                Insert Variable
                              </h4>

                              <button
                                onClick={() => setActiveVar(null)}
                                className="text-gray-400 hover:text-red-500 transition"
                              >
                                <CancelOutlinedIcon fontSize="small" />
                              </button>
                            </div>

                            <div className="max-h-48 overflow-y-auto space-y-1">
                              {leadSourceVariable.map((item, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    setVarValues((prev) => ({
                                      ...prev,
                                      [v]: `{${item}}`,
                                    }));
                                    setActiveVar(null);
                                  }}
                                  className=" px-2 py-1 text-sm rounded-mdcursor-pointer hover:bg-blue-50 hover:text-blue-600 transition"
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                  This template does not contain any variables
                </div>
              )}
            </>
          )}

          {Object.keys(suggestionVariables).length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">
                Suggestion Variables
              </h4>

              {Object.entries(suggestionVariables).map(([key, value]) => (
                <div className="relative w-full">
                  <InputField
                    key={key}
                    label={`Value for ${key}`}
                    placeholder="Enter value"
                    value={value}
                    onChange={(e) =>
                      setSuggestionVariables((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                  {/* Right side button */}
                  <button
                    type="button"
                    onClick={() => setActiveUrlVar(key)}
                    className=" absolute right-2 top-12 -translate-y-1/2 h-6 w-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800  transition shadow-sm"
                  >
                    {"{ }"}
                  </button>

                  {activeUrlVar === key && (
                    <div className="absolute z-50 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4 -right-66 top-2">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Insert Variable
                        </h4>

                        <button
                          onClick={() => setActiveUrlVar(null)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <CancelOutlinedIcon fontSize="small" />
                        </button>
                      </div>

                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {leadSourceVariable.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setSuggestionVariables((prev) => ({
                                ...prev,
                                [key]: `{${item}}`,
                              }));
                              setActiveUrlVar(null);
                            }}
                            className=" px-2 py-1 text-sm rounded-mdcursor-pointer hover:bg-blue-50 hover:text-blue-600 transition"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <MobilePreview cards={tempDetails} />
      </div>

      <UniversalButton label="Save" onClick={handleRcsTemplateSave} />
    </div>
  );
};

export default RcsTemplateLeadSouce;
