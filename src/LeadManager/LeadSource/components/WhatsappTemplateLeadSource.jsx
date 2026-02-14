import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// ======================================================ICONS============================================================
import { WhatsApp } from "@mui/icons-material";
import { BsTelephoneFill } from "react-icons/bs";
import { FaReply, FaExternalLinkAlt } from "react-icons/fa";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// ================================================APIS===================================================================
import {
  getWabaList,
  getWabaTemplateDetails,
  getTemplateDetialsById,
  uploadImageFile,
} from "@/apis/whatsapp/whatsapp";
import {
  assignLeadSourceServiceToUser,
  getLeadSourceVariable,
} from "@/apis/leadmanager/leadmanager";

// ================================================COMPONENTS=============================================================
import DropdownWithSearch from "@/admin/components/DropdownWithSearch";
import {
  mapApiToPreviewState,
  formatPreview,
} from "@/LeadManager/utils/templatePreviewMapper";
import CarouselPreviewFromApi from "./CarouselPreviewFromApi";
import InputField from "@/admin/components/InputField";
import UniversalButton from "@/admin/components/UniversalButton";

const normalize = (type) => type?.toString().toLowerCase();

export const getBtnIcon = (type) => {
  switch (normalize(type)) {
    case "phone_number":
      return <BsTelephoneFill className="mr-2" />;
    case "quick_reply":
      return <FaReply className="mr-2" />;
    case "copy_code":
      return <ContentCopySharpIcon className="mr-2" />;
    case "url":
      return <AssignmentOutlinedIcon className="mr-2" />;
    default: // url
      return <FaExternalLinkAlt className="mr-2" />;
  }
};

export const getBtnCss = (type) => {
  return "bg-white text-[#128c7e]";
};

export const getBtnTitle = (type, phone, url, text) => {
  switch (normalize(type)) {
    case "phone_number":
      return `Call: ${phone}`;
    case "quick_reply":
      return `Reply: ${text}`;
    case "copy_code":
      return `Copy: ${text}`;
    case "url":
      return `Copy: ${text}`;
    default:
      return `Open: ${url}`;
  }
};

const getMediaType = (file) => {
  if (!file) return "image";

  if (file.type.startsWith("image")) return "image";
  if (file.type.startsWith("video")) return "video";
  if (
    file.type === "application/pdf" ||
    file.type.includes("word") ||
    file.type.includes("officedocument")
  )
    return "document";

  return "image";
};

const WhatsappTemplateLeadSource = ({ userSrNo, leadSourceSrno }) => {
  const [wabaList, setWabaList] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [templateDetails, setTemplateDetails] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateDetailsById, setTemplateDetailsById] = useState([]);
  const [previewState, setPreviewState] = useState(null);
  const [varValues, setVarValues] = useState({});
  const [headerFile, setHeaderFile] = useState(null);
  const [uploadingHeader, setUploadingHeader] = useState(false);
  const [cardFiles, setCardFiles] = useState({});
  const [uploadingCard, setUploadingCard] = useState(null);
  const [urlVarValues, setUrlVarValues] = useState({});
  const [hasUploadedMedia, setHasUploadedMedia] = useState(false);
  const [hasUploadCardMedia, setHasUploadCardMedia] = useState(false);

  const [activeVar, setActiveVar] = useState(null);
  const [activeUrlVar, setActiveUrlVar] = useState(null);
  const [activeCarouselVar, setActiveCarouselVar] = useState(null);

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


  // useEffect(() => {
  //   const fetchLeadSourceVariable = async () => {
  //     try {
  //       const res = await getLeadSourceVariable();
  //       console.log("Lead Source Variable Response:", res?.data);
  //       if (Array.isArray(res?.data)) {
  //         setLeadSourceVariable(res.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchLeadSourceVariable();
  // }, []);

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
    const fetchWabaList = async () => {
      try {
        const res = await getWabaList();
        setWabaList(res);
        console.log("WABALIST:", res);
      } catch (error) {
        console.log("Failed to load WabaList:", error);
      }
    };
    fetchWabaList();
  }, []);

  const wabaOptions = wabaList.map((waba) => ({
    label: `${waba.wabaName} `,
    value: waba.mobileNo,
  }));

  useEffect(() => {
    if (!selectedWaba) return;

    const fetchWabaTemplateDetails = async () => {
      try {
        const res = await getWabaTemplateDetails(selectedWaba, -1);
        console.log("API Response:", res);

        setTemplateDetails(Array.isArray(res) ? res : []);
      } catch (error) {
        console.log("Failed to fetch template details", error);
      }
    };

    fetchWabaTemplateDetails();
  }, [selectedWaba]);

  // const templateOptions = templateDetails
  //   .filter((tpl) => tpl.status === "APPROVED")
  //   .map((tpl) => ({
  //     label: tpl.templateName,
  //     value: tpl.vendorTemplateId,
  //     templateSrno: tpl.templateSrno,
  //     templateName: tpl.templateName,
  //     templateType: tpl.type,
  //   }));

  //   const[tempOption, setTempOption] = useState(templateOptions)

  const [tempOption, setTempOption] = useState([]);

  useEffect(() => {
    const options = templateDetails
      ?.filter((tpl) => tpl.status === "APPROVED")
      .map((tpl) => ({
        label: tpl.templateName,
        value: tpl.vendorTemplateId,
        templateSrno: tpl.templateSrno,
        templateName: tpl.templateName,
        templateType: tpl.type,
      }));

    setTempOption(options);
  }, [templateDetails]);

  useEffect(() => {
    console.log("Selected Template:", selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    if (!selectedTemplate) return;

    const fetchTemplateDetailsByID = async () => {
      try {
        console.log("Calling API with:", selectedTemplate);

        const res = await getTemplateDetialsById(selectedTemplate);

        console.log("API RESPONSE:", res);

        setTemplateDetailsById(res);
        mapApiToPreviewState(res);
      } catch (error) {
        console.log("Failed to fetch template details by id:", error);
      }
    };

    fetchTemplateDetailsByID();
  }, [selectedTemplate]);

  // useEffect(() => {
  //   if (!selectedTemplate?.value) return;
  //   const fetchTemplateDetailsByID = async () => {
  //     try {
  //       const res = await getTemplateDetialsById(selectedTemplate.value);

  //       console.log("API RESPONSE OF TEMPLATE DETAILS BY ID:", res);

  //       setTemplateDetailsById(res);
  //       mapApiToPreviewState(res);
  //     } catch (error) {
  //       console.log("Failed to fetch template details  by id : ", error);
  //     }
  //   };

  //   fetchTemplateDetailsByID();
  // }, [selectedTemplate]);

  // useEffect(() => {
  //   if (!templateDetailsById) return;

  //   const mapped = mapApiToPreviewState(templateDetailsById);
  //   setPreviewState(mapped);
  // }, [templateDetailsById]);

  useEffect(() => {
    if (!templateDetailsById) return;

    const mapped = mapApiToPreviewState(templateDetailsById);
    setPreviewState(mapped);
  }, [templateDetailsById]);




  // ===================================================================BODY VARIABLE FUNCTIONS STARTS HERE========================================================================
  const extractVariables = (text = "") => {
    const matches = text.match(/{{\d+}}/g) || [];
    return [...new Set(matches)];
  };

  const replaceVars = (text = "") => {
    let result = text;
    Object.keys(varValues).forEach((key) => {
      result = result.replaceAll(key, varValues[key] || key);
    });
    return result;
  };

  const validateBodyVars = () => {
    const vars = extractVariables(previewState?.tempJsonBody || "");
    for (const v of vars) {
      if (!varValues?.[v] || varValues[v].trim() === "") {
        toast.error(`Please fill value for ${v}`);
        return false;
      }
    }
    return true;
  };

  const toCommaString = (obj) => {
    if (!obj || Object.keys(obj).length === 0) return "";
    return Object.values(obj).join(",");
  };

  // ===================================================================BODY VARIABLE FUNCTIONS ENDS HERE========================================================================

  // ===================================================================URL VARIABLE FUNCTIONS STARTS HERE========================================================================

  const extractUrlVariable = (buttons = []) => {
    const urlBtn = buttons.find((b) => b.type === "URL");
    if (!urlBtn || !urlBtn.url) return null;

    const match = urlBtn.url.match(/{{\d+}}/);
    return match ? match[0] : null;
  };

  const replaceUrlVars = (text = "") => {
    let result = text;
    Object.keys(urlVarValues).forEach((key) => {
      result = result.replaceAll(key, urlVarValues[key] || key);
    });
    return result;
  };

  const urlVar = extractUrlVariable(previewState?.buttons || []);

  const validateUrlVars = () => {
    const urlVar = extractUrlVariable(previewState?.buttons || []);

    if (
      urlVar &&
      (!urlVarValues[urlVar] || urlVarValues[urlVar].trim() === "")
    ) {
      toast.error(`Please fill URL variable ${urlVar}`);
      return false;
    }

    return true;
  };

  const toUrlCommaString = (obj) => {
    if (!obj || Object.keys(obj).length === 0) return "";
    return Object.values(obj).join(",");
  };

  // ===================================================================URL VARIABLE FUNCTIONS ENDS HERE========================================================================

  const uploadHeaderPreviewMedia = async () => {
    if (!headerFile) {
      toast.error("Please select a file");
      return;
    }

    try {
      setUploadingHeader(true);

      const type = getMediaType(headerFile);
      const res = await uploadImageFile(headerFile, 0);

      if (!res?.status || !res?.fileUrl) {
        throw new Error("Upload failed");
      }

      setPreviewState((prev) => ({
        ...prev,
        headerMedia: {
          type,
          link: res.fileUrl,
          handleId: res.handlerid,
        },
        headerText: "",
        headerLocation: null,
      }));

      toast.success(`${type} uploaded`);
      setHasUploadedMedia(true);

      setHeaderFile(null);
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingHeader(false);
    }
  };

  const uploadCardPreviewMedia = async (index) => {
    const file = cardFiles[index];
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setUploadingCard(index);

      const type = getMediaType(file);
      const res = await uploadImageFile(file, 0);

      if (!res?.status || !res?.fileUrl) {
        throw new Error("Upload failed");
      }

      setPreviewState((prev) => ({
        ...prev,
        carouselCards: prev.carouselCards.map((c, i) =>
          i === index
            ? {
                ...c,
                media: res.fileUrl,
                mediaType: type,
              }
            : c,
        ),
      }));

      toast.success("Card media updated");
      setHasUploadCardMedia(true);
      setCardFiles((prev) => ({ ...prev, [index]: null }));
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingCard(null);
    }
  };

  const selectedWabaObj = wabaList.find(
    (w) => String(w.mobileNo) === String(selectedWaba),
  );

  useEffect(() => {
    setHasUploadedMedia(false);
  }, [selectedTemplate]);

  // =========================================RESET FIELDS=============================
  // useEffect(() => {
  //   // if (
  //   //   !selectedTemplate?.templateSrno ||
  //   //   !previewState ||
  //   //   !Array.isArray(previewState.carouselCards)
  //   // ) {
  //   //   return;
  //   // }

  //   // if (selectedTemplate.templateType !== "carousel") return;
  //   if (
  //     !templateDetailsById?.id ||
  //     !previewState ||
  //     !Array.isArray(previewState.carouselCards)
  //   ) {
  //     return;
  //   }

  //   if (previewState?.templateType !== "carousel") return;

  //   setVarValues({});
  //   setUrlVarValues({});
  //   setCardFiles({});
  //   setHasUploadCardMedia(false);

  //   setPreviewState((prev) => {
  //     if (!prev || !Array.isArray(prev.carouselCards)) return prev;

  //     return {
  //       ...prev,
  //       carouselCards: prev.carouselCards.map((c) => ({
  //         ...c,
  //         media: "",
  //       })),
  //     };
  //   });
  // // }, [selectedTemplate?.templateSrno, previewState?.templateType]);
  // }, [templateDetailsById?.id, previewState?.templateType]);

  useEffect(() => {
    if (!previewState?.tempJsonBody) {
      setVarValues({});
      setUrlVarValues({});
      return;
    }

    const vars = extractVariables(previewState.tempJsonBody);

    const newVarState = {};
    vars.forEach((v) => {
      newVarState[v] = "";
    });

    setVarValues(newVarState);

    const urlVar = extractUrlVariable(previewState?.buttons || []);
    if (urlVar) {
      setUrlVarValues({ [urlVar]: "" });
    } else {
      setUrlVarValues({});
    }

    setActiveVar(null);
    setActiveUrlVar(null);
  }, [templateDetailsById?.id]);

  const validateCarousel = () => {
    // if (selectedTemplate?.templateType !== "carousel") return true;
    if (previewState?.templateType !== "carousel") return true;

    for (let i = 0; i < previewState.carouselCards.length; i++) {
      const media = previewState.carouselCards[i]?.media;

      const hasUploaded =
        typeof media === "string" &&
        media.trim() !== "" &&
        media.startsWith("http");

      if (!hasUploaded) {
        toast.error(`Please upload media for card ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const getCarouselMediaArray = () => {
    // if (selectedTemplate?.templateType !== "carousel") return [];
    if (previewState?.templateType !== "carousel") return [];

    return previewState.carouselCards.map((c) => c.media).filter(Boolean);
  };

  // const handleSave = async () => {
  //   if (!selectedWaba) {
  //     toast.error("Please select a WABA.");
  //     return;
  //   }

  //   if (!selectedTemplate) {
  //     toast.error("Please select an Template.");
  //     return;
  //   }

  //   if (!validateBodyVars()) return;

  //   if (!validateUrlVars()) return;

  //   const type = selectedTemplate?.templateType;

  //   const requiresMedia = ["image", "video", "document"].includes(type);

  //   if (requiresMedia && !hasUploadedMedia) {
  //     toast.error(`Please upload ${type} for this template`);
  //     return;
  //   }

  //   if (!validateCarousel()) return;

  //   try {
  //     const payload = {
  //       userSrNo: userSrNo,
  //       leadSourceSrno: leadSourceSrno,
  //       type: "whatsapp",
  //       whatsappLeadSourceConfigPojo: {
  //         srNo: 0,
  //         wabaSrno: selectedWabaObj.wabaSrno,
  //         templateSrno: selectedTemplate.templateSrno,
  //         mediaPath:
  //           selectedTemplate.templateType === "carousel"
  //             ? ""
  //             : previewState?.headerMedia?.link || "",

  //         mediaPathCarousel:
  //           selectedTemplate.templateType === "carousel"
  //             ? getCarouselMediaArray()
  //             : [],
  //         variableList: toCommaString(varValues),
  //         urlVariable: toUrlCommaString(urlVarValues),
  //         templateType: selectedTemplate?.templateType,
  //         templateName: selectedTemplate.templateName,
  //         templateLanguage: templateDetailsById?.language,
  //       },
  //     };

  //     console.log("Saving payload:", payload);

  //     const res = await assignLeadSourceServiceToUser(payload);

  //     if (res?.success) {
  //       toast.success("Template assigned successfully");
  //     } else {
  //       toast.error(res?.message || "Failed to save");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("API error");
  //   }
  // };

  const handleSave = async () => {
    if (!selectedWaba) {
      toast.error("Please select a WABA.");
      return;
    }

    if (!selectedTemplate) {
      toast.error("Please select a Template.");
      return;
    }

    if (!validateBodyVars()) return;
    if (!validateUrlVars()) return;

    const type = templateDetailsById?.type;

    const requiresMedia = ["image", "video", "document"].includes(type);

    if (requiresMedia && !hasUploadedMedia) {
      toast.error(`Please upload ${type} for this template`);
      return;
    }

    if (!validateCarousel()) return;

    try {
      const payload = {
        userSrNo: userSrNo,
        leadSourceSrno: leadSourceSrno,
        type: "whatsapp",
        whatsappLeadSourceConfigPojo: {
          srNo: 0,
          wabaSrno: selectedWabaObj.wabaSrno,

          templateSrno: templateDetailsById?.id,
          templateName: templateDetailsById?.name,
          templateType: previewState?.templateType,
          templateLanguage: templateDetailsById?.language,

          mediaPath:
            previewState?.templateType === "carousel"
              ? ""
              : previewState?.headerMedia?.link || "",

          mediaPathCarousel:
            previewState?.templateType === "carousel"
              ? getCarouselMediaArray()
              : [],

          variableList: toCommaString(varValues),
          urlVariable: toUrlCommaString(urlVarValues),
        },
      };

      console.log("Saving payload:", payload);

      const res = await assignLeadSourceServiceToUser(payload);

      if (res?.success) {
        toast.success("Template assigned successfully");
      } else {
        toast.error(res?.message || "Failed to save");
      }
    } catch (error) {
      console.error(error);
      toast.error("API error");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white space-y-6 ">
      <div className="border-b pb-4">
        <h2 className="text-sm  md:text-xl text-gray-800 font-semibold">
          WhatsappTemplateLeadSource{" "}
        </h2>
      </div>
      <div className="flex flex-wrap md:flex-nowrap  gap-8">
        <DropdownWithSearch
          label="Select Waba"
          placeholder="Select Waba"
          options={wabaOptions}
          value={selectedWaba}
          onChange={setSelectedWaba}
        />
        <DropdownWithSearch
          label="Select Template Details"
          placeholder="Select Template Details"
          options={tempOption}
          value={selectedTemplate}
          // onChange={setSelectedTemplate}
          onChange={(options) => setSelectedTemplate(options)}
        />
        {/* <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Template
          </label>

          <select
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTemplate?.value || ""}
            onChange={(e) => {
              const selected = templateOptions.find(
                (t) => t.value === e.target.value,
              );
              setSelectedTemplate(selected || null);
            }}
          >
            <option value="">-- Select Template --</option>

            {templateOptions.map((tpl) => (
              <option key={tpl.value} value={tpl.value}>
                {tpl.label}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ">
        {/* ==================================================================================LEFT SIDE========================================================================= */}

        <div className="">
          {previewState && (
            // <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-6 h-full ">
            <div className="bg-white border border-gray-300 rounded-xl p-1 md:p-2 space-y-4 md:space-y-6 h-full w-full overflow-x-hidden ">
              <h3 className="text-sm font-semibold text-gray-700">
                Extracted Template Values
              </h3>
              <div className="bg-[#ece5dd] border border-[#a1dad0] rounded-md shadow-md ">
                {/* Template Type */}
                <div className="bg-[#ece5dd] p-2 text-[#128c7e] text-center rounded-md ">
                  <div className="font-medium  capitalize flex flex-col gap-3">
                    <label className=" mt-2">Template Details</label>
                    <div className="border border-gray-300" />

                    <span>
                      Template Type -
                      {previewState.templateType.replace("_", " ")}{" "}
                    </span>
                  </div>
                </div>

                {/* Body */}
                {previewState.templateType !== "carousel" && (
                  <>
                    {previewState.tempJsonBody && (
                      <>
                        {extractVariables(previewState.tempJsonBody).length >
                          0 && (
                          <div className="mt-4 bg-gray-50 p-4 rounded-lg space-y-3 shadow-md border  ">
                            <h4 className=" text-sm font-semibold text-gray-700">
                              Variable Values
                            </h4>

                            {extractVariables(previewState.tempJsonBody).map(
                              (v) => (
                                <div className="relative w-full">
                                  <InputField
                                    key={v}
                                    label={`Message Parameter 4 ${v}`}
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
                                    className=" pr-1 md:pr-14"
                                  />

                                  {/* Right side button */}
                                  <button
                                    type="button"
                                    onClick={() => setActiveVar(v)}
                                    // className=" absolute right-2 bottom-0.6 md:top-12 -translate-y-1/2 h-6 w-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800  transition shadow-sm"

                                    className="absolute  right-2 -bottom-1 -translate-y-1/2 md:top-12 md:-translate-y-1/2  h-6 w-8 flex items-center justify-center  rounded-md bg-gray-100 text-gray-600  hover:bg-gray-200 hover:text-gray-800 transition shadow-sm"
                                  >
                                    {"{ }"}
                                  </button>

                                  {activeVar === v && (
                                    <div className="absolute z-50 mt-2 md:w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4  lg:right-10 top-10">
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
                              ),
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {/* Action buttons */}
                    {previewState.buttons && (
                      <>
                        {urlVar && (
                          // <div className="mt-4 bg-yellow-50 p-4 rounded-lg border">
                          <div className="mt-4 bg-yellow-50 p-4 rounded-lg space-y-3 shadow-md border">
                            <h4 className="text-sm font-semibold text-gray-700">
                              URL Variable
                            </h4>
                            <div className="relative w-full">
                              <InputField
                                label={`Message Parameter ${urlVar}`}
                                placeholder={`Enter value for ${urlVar}`}
                                value={urlVarValues[urlVar] || ""}
                                onChange={(e) =>
                                  setUrlVarValues((prev) => ({
                                    ...prev,
                                    [urlVar]: e.target.value,
                                  }))
                                }
                              />
0
                              {/* Right side button */}
                              <button
                                type="button"
                                onClick={() => setActiveUrlVar(urlVar)}
                                // className=" absolute right-2 top-12 -translate-y-1/2 h-6 w-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800  transition shadow-sm"
                                    className="absolute  right-2 -bottom-1 -translate-y-1/2 md:top-12 md:-translate-y-1/2  h-6 w-8 flex items-center justify-center  rounded-md bg-gray-100 text-gray-600  hover:bg-gray-200 hover:text-gray-800 transition shadow-sm"
                              >
                                {"{ }"}
                              </button>

                              {activeUrlVar === urlVar && (
                                <div className="absolute z-50 mt-2 md:w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4  right-10 top-10">
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
                                          setUrlVarValues((prev) => ({
                                            ...prev,
                                            [urlVar]: `{${item}}`,
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
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* Header Media */}
                {previewState && (
                  <div className="space-y-4">
                    {/* TEXT header */}
                    {previewState.headerText && (
                      <InputField
                        label="Header Text"
                        value={previewState.headerText}
                        readOnly
                      />
                    )}

                    {/* MEDIA header */}
                    {previewState.headerMedia && (
                      <>
                        <input
                          type="file"
                          hidden
                          id="header-media-input"
                          accept={
                            previewState.headerMedia.type === "image"
                              ? "image/*"
                              : previewState.headerMedia.type === "video"
                                ? "video/*"
                                : ".pdf,.doc,.docx"
                          }
                          onChange={(e) => setHeaderFile(e.target.files[0])}
                        />

                        <div className="flex gap-3 p-2">
                          <label
                            htmlFor="header-media-input"
                            className="px-4 py-2  rounded-full cursor-pointer bg-blue-500 text-white"
                          >
                            Choose File
                          </label>

                          <button
                            onClick={uploadHeaderPreviewMedia}
                            disabled={!headerFile || uploadingHeader}
                            className="px-2 py-2 bg-blue-500 text-white rounded-full disabled:opacity-40"
                          >
                            <UploadFileOutlinedIcon />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="">
                  {/* Carousel Cards */}
                  {previewState.templateType === "carousel" && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg space-y-3 shadow-md">
                      {extractVariables(previewState.tempJsonBody).length >
                        0 && (
                        <div className="bg-white p-3 rounded-lg space-y-2 shadow">
                          <h4 className="text-xs font-semibold text-gray-600">
                            Variables
                          </h4>

                          {/* {extractVariables(previewState.tempJsonBody).map(
                            (v) => (
                              <InputField
                                key={v}
                                label={v}
                                placeholder={`Enter ${v}`}
                                value={varValues[v] || ""}
                                onChange={(e) =>
                                  setVarValues((prev) => ({
                                    ...prev,
                                    [v]: e.target.value,
                                  }))
                                }
                              />

                              
                            ),
                          )} */}

                          {extractVariables(previewState.tempJsonBody).map(
                            (v) => (
                              <div key={v} className="relative w-full">
                                <InputField
                                  label={v}
                                  placeholder={`Enter ${v}`}
                                  value={varValues[v] || ""}
                                  onChange={(e) =>
                                    setVarValues((prev) => ({
                                      ...prev,
                                      [v]: e.target.value,
                                    }))
                                  }
                                  className="pr-10"
                                />

                                {/* Floating Button */}
                                <button
                                  type="button"
                                  onClick={() => setActiveCarouselVar(v)}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 
                 h-6 w-8 flex items-center justify-center
                 rounded-md bg-gray-100 text-gray-600
                 hover:bg-gray-200 hover:text-gray-800
                 transition shadow-sm"
                                >
                                  {"{ }"}
                                </button>

                                {/* Floating Dropdown */}
                                {activeCarouselVar === v && (
                                  <div
                                    className="absolute z-50 mt-2 w-full max-w-[250px]
                      bg-white border border-gray-200
                      shadow-xl rounded-xl p-3
                      top-full right-0"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-sm font-semibold text-gray-700">
                                        Insert Variable
                                      </h4>

                                      <button
                                        onClick={() =>
                                          setActiveCarouselVar(null)
                                        }
                                        className="text-gray-400 hover:text-red-500 transition"
                                      >
                                        <CancelOutlinedIcon fontSize="small" />
                                      </button>
                                    </div>

                                    <div className="max-h-40 overflow-y-auto space-y-1">
                                      {leadSourceVariable.map((item, idx) => (
                                        <div
                                          key={idx}
                                          onClick={() => {
                                            setVarValues((prev) => ({
                                              ...prev,
                                              [v]: `{${item}}`,
                                            }));
                                            setActiveCarouselVar(null);
                                          }}
                                          className="px-2 py-1 text-sm rounded-md cursor-pointer
                         hover:bg-blue-50 hover:text-blue-600 transition"
                                        >
                                          {item}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      )}

                      <div className="relative w-full">
                        {/* Carousel Track */}
                        <div
                          id="carousel-track"
                          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4 px-10 mt-5 mb-5"
                        >
                          {/* Scroll Buttons */}
                          <button
                            onClick={() =>
                              document
                                .getElementById("carousel-track")
                                .scrollBy({
                                  left: -360,
                                  behavior: "smooth",
                                })
                            }
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10"
                          >
                            <KeyboardDoubleArrowLeftOutlinedIcon />
                          </button>

                          <button
                            onClick={() =>
                              document
                                .getElementById("carousel-track")
                                .scrollBy({
                                  left: 260,
                                  behavior: "smooth",
                                })
                            }
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10"
                          >
                            <KeyboardDoubleArrowRightOutlinedIcon />
                          </button>
                          {previewState.carouselCards.map((card, i) => (
                            <div
                              key={i}
                              className="min-w-[260px] bg-gray-50 border rounded-xl p-4 space-y-4 shadow-sm"
                            >
                              <div className="text-lg font-semibold text-gray-700">
                                Card {i + 1}
                              </div>

                              {/* Upload */}
                              <input
                                type="file"
                                hidden
                                id={`card-upload-${i}`}
                                accept={
                                  card.mediaType === "video"
                                    ? "video/*"
                                    : "image/*,.pdf,.doc,.docx"
                                }
                                onChange={(e) =>
                                  setCardFiles((prev) => ({
                                    ...prev,
                                    [i]: e.target.files[0],
                                  }))
                                }
                              />

                              <div className="flex gap-3 p-2">
                                <label
                                  htmlFor={`card-upload-${i}`}
                                  className="px-4 py-2 rounded-full bg-blue-500 text-white cursor-pointer"
                                >
                                  Choose File
                                </label>

                                <button
                                  onClick={() => uploadCardPreviewMedia(i)}
                                  disabled={
                                    !cardFiles[i] || uploadingCard === i
                                  }
                                  className="px-2 py-2 bg-blue-500 text-white rounded-full disabled:opacity-40"
                                >
                                  <UploadFileOutlinedIcon />
                                </button>
                              </div>

                              {cardFiles[i] && (
                                <div className="text-xs text-gray-500">
                                  {cardFiles[i].name}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================================================================================RIGHT SIDE========================================================================= */}
        <div>
          {previewState && (
            <div>
              <div className="flex items-center justify-between px-4 py-2 text-white bg-[#128c7e] rounded-full mb-3">
                <h2 className="font-medium tracking-wide text-md">
                  Template Preview
                </h2>
                <p className="text-sm">
                  <WhatsApp />
                </p>
              </div>
              <div className=" h-[550px] rounded-xl border border-gray-300 shadow-xl overflow-hidden  ">
                <div className=" p-4 text-sm h-full flex flex-col">
                  <div className="flex-1 overflow-auto flex flex-col gap-3 p-2">
                    <div className="rounded-2xl bg-[#ece5dd]  overflow-x-hidden shadow-md p-4">
                      {/* HEADER */}

                      {previewState.headerMedia && (
                        <div className="  mb-10">
                          {previewState.headerMedia.type === "image" && (
                            <img
                              src={previewState.headerMedia.link}
                              className="w-full h-56 object-contain"
                            />
                          )}

                          {previewState.headerMedia.type === "video" && (
                            <video
                              src={previewState.headerMedia.link}
                              controls
                              className="w-full h-56 object-contain"
                            />
                          )}

                          {previewState.headerMedia.type === "document" && (
                            <iframe
                              src={previewState.headerMedia.link}
                              className="w-full h-60"
                            />
                          )}
                        </div>
                      )}

                      {/* CAROUSEL */}
                      {previewState.templateType === "carousel" && (
                        <CarouselPreviewFromApi
                          cards={previewState.carouselCards}
                        />
                      )}

                      <div className="px-4 py-3 space-y-2 text-white ">
                        {/* BODY */}
                        <pre
                          className="border border-gray-200 rounded-md p-2 w-full  text-[0.85rem] text-gray-800  break-words text-wrap"
                          dangerouslySetInnerHTML={{
                            __html: formatPreview(
                              replaceVars(previewState.tempJsonBody),
                            ),
                          }}
                        />
                      </div>

                      {/* LIMITED OFFER */}
                      {previewState.isEnabled && (
                        <div className="mt-3 p-3 rounded-xl bg-[#202c33] text-[#e9edef]">
                          <div className="text-xs text-red-400 font-semibold">
                            LIMITED TIME OFFER
                          </div>
                          <div className="text-sm">
                            {previewState.offerDetails}
                          </div>
                        </div>
                      )}

                      {/* FOOTER */}
                      {previewState.tempFooter && (
                        <div className="text-xs text-[#8696a0] text-center border-t border-gray-300 pt-2">
                          {previewState.tempFooter}
                        </div>
                      )}

                      {/* BUTTONS */}

                      {previewState.buttons.map((btn, i) => (
                        <button
                          key={i}
                          title={getBtnTitle(
                            btn.type,
                            btn.phone_number,
                            btn.url,
                            btn.text,
                          )}
                          className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-sm shadow-sm cursor-pointer rounded-xl w-full  mt-2 ${getBtnCss(
                            btn.type,
                          )}`}
                        >
                          {getBtnIcon(btn.type)}
                          <span className="text-[#00a884]">{btn.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <UniversalButton onClick={handleSave} label="SAVE" />
    </div>
  );
};

export default WhatsappTemplateLeadSource;
