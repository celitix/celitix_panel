// import React, { useEffect, useRef, useState } from "react";
// import { Box, Grid, Paper, Typography, Button, Tooltip } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { Switch } from "@mui/material";
// import { Dialog } from "primereact/dialog";
// import toast from "react-hot-toast";
// import dayjs from "dayjs";
// import { motion, AnimatePresence } from "framer-motion";
// import { RadioButton } from "primereact/radiobutton";

// // ICONS
// import TagIcon from "@mui/icons-material/Tag";
// import EmailIcon from "@mui/icons-material/Email";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import {
//     BiMessageSquareDetail,
//     BiCog,
//     BiUserCircle,
//     BiChevronRight,
// } from "react-icons/bi";
// import { MdOutlineUnsubscribe } from "react-icons/md";
// import { AiOutlineRobot } from "react-icons/ai";
// import { FaHandPointDown, FaWhatsapp } from "react-icons/fa";
// import StorageIcon from "@mui/icons-material/Storage";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import { FiPhoneCall } from "react-icons/fi";
// import { CgUnblock } from "react-icons/cg";

// // APIS
// import {
//     deleteAutoAction,
//     fetchTemplates,
//     fetchTemplatesValue,
//     getAutoAction,
//     getWabaList,
//     saveAutoAction,
//     getWabaTemplateDetails,
//     getTemplateDetialsById,
// } from "@/apis/whatsapp/whatsapp";
// import { deleteblockUser, getblockUser } from "@/apis/whatsapp/whatsapp";
// import { getAgentList } from "@/apis/Agent/Agent";

// // COMPONENTS
// import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
// import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
// import InputField from "@/components/layout/InputField";
// import { Preview } from "@/whatsapp/whatsappLiveChatSetting/components/preview";
// import { Variables } from "@/whatsapp/whatsappLiveChatSetting/components/Variable";
// import UniversalButton from "@/components/common/UniversalButton";
// import CustomTooltip from "@/components/common/CustomTooltip";

// const WabaChatSettingNew = ({ selectedWabaUser }) => {
//     const [blockedUsers, setBlockedUsers] = useState([]);
//     const [allWaba, setAllWaba] = useState([]);
//     const [selectedWaba, setSelectedWaba] = useState(null);
//     const [selectedId, setSelectedId] = useState(null);
//     const [dialogVisible, setDialogVisible] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [search, setSearch] = useState("");
//     const [isBlocking, setIsBlocking] = useState(false);

//     const [fileData, setFileData] = useState({
//         url: "",
//         file: "",
//     });

//     // chat setting
//     const [selectedName, setSelectedName] = useState("");
//     const [selectedAgentName, setSelectedAgentName] = useState("");
//     const [selectedAgentId, setSelectedAgentId] = useState(null);
//     const [workingHoursDialog, setWorkingHoursDialog] = useState(false);
//     const [workingHours, setWorkingHours] = useState({
//         Monday: {
//             enabled: false,
//             start: null,
//             end: null,
//         },
//         Tuesday: {
//             enabled: false,
//             start: null,
//             end: null,
//         },
//         Wednesday: {
//             enabled: false,
//             start: null,
//             end: null,
//         },
//         Thursday: {
//             enabled: false,
//             start: null,
//             end: null,
//         },
//         Friday: {
//             enabled: false,
//             start: null,
//             end: null,
//         },
//         Saturday: {
//             enabled: false,
//             start: null,
//             end: null,
//         },
//         Sunday: {
//             enabled: false,
//             start: null,
//             end: null,
//         },
//     });
//     const [isWorkingHoursEnabled, setIsWorkingHoursEnabled] = useState(true);
//     const [templateList, setTemplateList] = useState([]);
//     const [templateOptions, setTemplateOptions] = useState([]);
//     const [selectedTemplate, setSelectedTemplate] = useState([]);
//     const [selectedTemplateData, setSelectedTemplateData] = useState([]);
//     const [templateDataNew, setTemplateDataNew] = useState(null);

//     // new states for live chat configuration
//     const [formData, setFormData] = useState({});
//     const [imagePreview, setImagePreview] = useState(null);
//     const [inputValues, setInputValues] = useState(null);
//     const [cardIndex, setCardIndex] = useState(null);

//     // new states for live chat configuration

//     const [wabaState, setWabaState] = useState({
//         waba: [],
//         selected: "",
//     });

//     const [cardDetails, setCardDetails] = useState({});
//     const [configureState, setConfigureState] = useState({
//         type: "",
//         open: false,
//     });

//     const [basicDetails, setBasicDetails] = useState({
//         sendMsgCheckbox: true,
//         msgType: "1",
//         message: "",
//         filePath: "",
//         tempJson: "",
//         mediaPath: "",
//     });

//     console.log("basicDetails", basicDetails);
//     const [allTemplates, setAllTemplates] = useState([]);
//     const [specificTemplate, setSpecificTemplate] = useState({});
//     const [variablesData, setVariablesData] = useState({
//         length: 0,
//         data: [],
//         input: [],
//         btn: [],
//         btnInput: [],
//     });

//     const [agent, setallAgents] = useState([]);

//     const [minuteInput, setMinuteInput] = useState("");
//     const [lastSetMinute, setLastSetMinute] = useState("");
//     const [isFetching, setIsFetching] = useState(false);
//     const [inactiveNoOfDays, setInactiveNoOfDays] = useState("");

//     const fetchTemplateDetails = async (wabaNumber) => {
//         try {
//             const response = await getWabaTemplateDetails(wabaNumber, 0);
//             if (response) {
//                 setTemplateList(response);
//                 // const approvedTemplateList = response.filter((template) => template.status === "APPROVED");
//                 // setTemplateOptions(
//                 //   approvedTemplateList.map((template) => ({
//                 //     value: template.vendorTemplateId,
//                 //     label: template.templateName,
//                 //   }))
//                 const approvedTemplateList = response.filter(
//                     (template) => template.status === "APPROVED",
//                 );
//                 setTemplateOptions(approvedTemplateList);
//             } else {
//                 toast.error("Failed to load templates!");
//             }
//         } catch (error) {
//             toast.error("Error fetching template details.");
//         }
//     };

//     useEffect(() => {
//         if (selectedWabaUser?.mobileNo) {
//             fetchTemplateDetails(selectedWabaUser.mobileNo);
//         }
//     }, [selectedWabaUser]);

//     useEffect(() => {
//         const fetchTemplateData = async () => {
//             if (!selectedTemplate || !selectedWabaUser) return;

//             setIsFetching(true);
//             try {
//                 const response = await getTemplateDetialsById(selectedTemplate);

//                 if (!response) {
//                     toast.error("Failed to load template data!");
//                     return;
//                 }

//                 setTemplateDataNew(response);

//                 /* ---------------- BODY VARIABLES ---------------- */
//                 const bodyComponent = response?.components?.find(
//                     (comp) => comp.type === "BODY",
//                 );

//                 let variables = [];
//                 if (bodyComponent?.text) {
//                     const matches = bodyComponent.text.match(/{{\d+}}/g) || [];
//                     variables = [...new Set(matches)].map((item) => ({
//                         key: Number(item.replace(/[{}]/g, "")),
//                         value: "",
//                     }));
//                 }
//                 setVariablesData(variables);

//                 /* ---------------- HEADER MEDIA ---------------- */
//                 const headerComponent = response?.components?.find(
//                     (comp) => comp.type === "HEADER",
//                 );

//                 let specificTemplate = { type: "TEXT" };
//                 let mediaPath = "";
//                 let newCardIndex = -1;

//                 if (headerComponent) {
//                     mediaPath = headerComponent.example?.header_handle?.[0] || "";

//                     switch (headerComponent.format) {
//                         case "IMAGE":
//                             specificTemplate = {
//                                 templateType: "IMAGE",
//                                 mediaUrl: mediaPath,
//                             };
//                             newCardIndex = 0;
//                             break;

//                         case "VIDEO":
//                             specificTemplate = {
//                                 templateType: "VIDEO",
//                                 mediaUrl: mediaPath,
//                             };
//                             newCardIndex = 1;
//                             break;

//                         case "DOCUMENT":
//                             specificTemplate = {
//                                 templateType: "DOCUMENT",
//                                 mediaUrl: mediaPath,
//                                 fileName:
//                                     headerComponent.example?.header_text?.[0] || "Document",
//                             };
//                             newCardIndex = 2;
//                             break;

//                         default:
//                             specificTemplate = { type: "TEXT", url: "" };
//                             newCardIndex = -1;
//                     }

//                     // Prefill uploaded media
//                     setFileData({
//                         url: mediaPath,
//                         file: null,
//                     });

//                     // Sync parent payload
//                     setBasicDetails((prev) => ({
//                         ...prev,
//                         mediaPath,
//                     }));
//                 }

//                 // Set media card index
//                 setCardIndex(newCardIndex);

//                 // Set template meta
//                 setSpecificTemplate(specificTemplate);
//             } catch (error) {
//                 console.error("Error fetching template data:", error);
//                 toast.error("Error fetching template data.");
//             } finally {
//                 setIsFetching(false);
//             }
//         };
//         if (
//             selectedTemplate?.length > 0 &&
//             selectedWabaUser?.wabaSrno &&
//             selectedWabaUser?.mobileNo
//         ) {
//             fetchTemplateData();
//         }
//     }, [selectedTemplate, selectedWabaUser]);

//     const templateLiveOptions = [
//         // { value: null, label: "Please select a template", disabled: true, hidden: true },
//         ...(templateOptions?.map((template) => ({
//             value: template.vendorTemplateId,
//             label: template.templateName,
//         })) || []),
//     ];


//     useEffect(() => {
//         if (!selectedTemplate || !templateOptions?.length) return;

//         const data = templateOptions.find(
//             (template) => template.vendorTemplateId === selectedTemplate,
//         );

//         setSelectedTemplateData(data || null);
//     }, [selectedTemplate, templateOptions]);

//     useEffect(() => {
//         async function handleFetchAgents() {
//             try {
//                 const res = await getAgentList();
//                 const data = res?.data?.map((agent) => ({
//                     value: agent?.sr_no,
//                     label: agent?.name,
//                 }));
//                 setallAgents(data);
//             } catch (e) {
//                 console.log("Error fetching agents:", e);
//                 toast.error("Error Fetching Agents");
//             }
//         }

//         handleFetchAgents();
//     }, []);

//     const fileRef = useRef(null);

//     useEffect(() => {
//         async function handleFetchWaba() {
//             try {
//                 const res = await getWabaList();
//                 setWabaState((prev) => ({
//                     waba: res,
//                     selected: "",
//                 }));
//             } catch (e) {
//                 return toast.error("Error fetching Waba Details");
//             }
//         }

//         handleFetchWaba();
//     }, []);

//     async function handleGetAutoAction() {
//         // if (!wabaState.selected) return;
//         try {
//             const data = {
//                 wabaNumber: selectedWabaUser?.mobileNo,
//                 type: "-1",
//             };
//             const res = await getAutoAction(data);
//             res?.EntityMstActionScenerio &&
//                 res.EntityMstActionScenerio.map(async (item) => {
//                     data["type"] = item.actionScenario;
//                     const res = await getAutoAction(data);
//                     setCardDetails((prev) => ({
//                         ...prev,
//                         [item.actionScenario]: res,
//                     }));
//                 });
//         } catch (e) {
//             return toast.error("Error fetching auto action");
//         }
//     }

//     async function handleFetchAllTemplates() {
//         try {
//             const body = { officialWhatsappSrno: selectedWabaUser?.wabaSrno };
//             const res = await fetchTemplates(body);

//             const temps = Object.keys(res).map((key) => ({
//                 value: key,
//                 label: res[key],
//             }));

//             setAllTemplates(temps);
//         } catch (e) {
//             return toast.error("Error fetching all templates");
//         }
//     }

//     useEffect(() => {
//         handleGetAutoAction();
//         handleFetchAllTemplates();
//     }, [selectedWabaUser?.mobileNo]);

//     function extractVariablesFromText(text) {
//         const regex = /{{(\d+)}}/g;
//         let match;
//         const variables = [];
//         while ((match = regex.exec(text)) !== null) {
//             if (!variables.includes(match[1])) {
//                 variables.push(match[1]);
//             }
//         }
//         return variables;
//     }

//     const extractVariablesFromTemplate = (data) => {
//         console.log("data", data);
//         const variables = [];

//         //  Extract template component parameters
//         data?.template?.components?.forEach((component) => {
//             component?.parameters?.forEach((param, index) => {
//                 if (param?.type === "text") {
//                     variables.push({
//                         key: `${index + 1}`, // WhatsApp style {{1}}, {{2}}
//                         value: param.text,
//                     });
//                 }
//             });
//         });

//         // setFileData((prev) => ({ ...prev, file: file }));
//         console.log("variablesData", variablesData);
//         setVariablesData(variables);
//         console.log("variables", variables);
//         return variables;
//     };

//     function handleConfigure(type) {
//         const cardTypeDetails = cardDetails[type];

//         console.log("cardTypeDetails", cardTypeDetails);
//         const parseTime = (time) => (time ? dayjs(time, "HH:mm:ss") : null);

//         // setConfigureState((prev) => ({
//         //   ...prev,
//         //   type,
//         //   open: true,
//         // }));

//         const dayMap = {
//             1: "Monday",
//             2: "Tuesday",
//             3: "Wednesday",
//             4: "Thursday",
//             5: "Friday",
//             6: "Saturday",
//             7: "Sunday",
//         };

//         if (cardTypeDetails?.agentTiming?.length > 0) {
//             setWorkingHours((prev) => {
//                 const updated = { ...prev };

//                 cardTypeDetails?.agentTiming?.forEach((item) => {
//                     const dayName = dayMap[item.day];
//                     if (!dayName) return;

//                     updated[dayName] = {
//                         enabled: item.status === 1,
//                         start: parseTime(item?.fromTime),
//                         end: parseTime(item?.toTime),
//                     };
//                 });

//                 return updated;
//             });
//         }

//         const selectedDays =
//             cardTypeDetails?.agentTiming?.map((item) => item.day) || [];

//         setInactiveNoOfDays(
//             [1, 2, 3, 4, 5, 6, 7].filter((day) => !selectedDays.includes(day)),
//         );

//         // const defaultHours = {
//         //   Monday: { enabled: false, start: null, end: null },
//         //   Tuesday: { enabled: false, start: null, end: null },
//         //   Wednesday: { enabled: false, start: null, end: null },
//         //   Thursday: { enabled: false, start: null, end: null },
//         //   Friday: { enabled: false, start: null, end: null },
//         //   Saturday: { enabled: false, start: null, end: null },
//         //   Sunday: { enabled: false, start: null, end: null },
//         // };

//         // // 3. Map the data if it exists
//         // let updatedHours = { ...defaultHours };
//         // if (cardTypeDetails?.agentTiming?.length > 0) {
//         //   cardTypeDetails.agentTiming.forEach((item) => {
//         //     const dayName = dayMap[item.day];
//         //     if (dayName) {
//         //       updatedHours[dayName] = {
//         //         enabled: item.status === 1,
//         //         start: parseTime(item.fromTime),
//         //         end: parseTime(item.toTime),
//         //       };
//         //     }
//         //   });
//         // }

//         // Update all states together
//         // setWorkingHours(updatedHours);

//         let tempId = null;
//         const parsedJson =
//             cardTypeDetails &&
//                 Object.keys(cardTypeDetails).length > 0 &&
//                 cardTypeDetails?.tempJson
//                 ? JSON.parse(cardTypeDetails.tempJson)
//                 : null;

//         if (parsedJson?.templateName) {
//             const tempName = parsedJson?.templateName;
//             tempId = allTemplates?.find((item) => item.label === tempName)?.value;
//         }
//         let msgType = "1";
//         if (parsedJson?.templateName) {
//             msgType = "2";
//         }
//         // fileRef.current.value = cardTypeDetails?.mediaPath;

//         const cardTypeDetailsTempJson = JSON.parse(cardTypeDetails?.tempJson);
//         console.log("cardTypeDetails", cardTypeDetailsTempJson);

//         extractVariablesFromTemplate(cardTypeDetailsTempJson);

//         const selectedTemplate = templateLiveOptions.find(
//             (temp) => temp?.label === cardTypeDetailsTempJson?.template?.name,
//         );

//         console.log("selectedTemplate", selectedTemplate);

//         setFileData({
//             url: parsedJson?.mediaPath,
//             file: parsedJson?.mediaPath,
//         });

//         if (cardTypeDetailsTempJson.type === "text") {
//             setBasicDetails((prev) => ({
//                 ...prev,
//                 template: null,
//             }))
//         }

//         setBasicDetails((prev) => ({
//             ...prev,
//             sendMsgCheckbox: true,
//             msgType: cardTypeDetailsTempJson.type === "text" ? "1" : "2",
//             message: cardTypeDetailsTempJson?.text?.body,
//             filePath: cardTypeDetails?.filePath,
//             tempJson: cardTypeDetails?.tempJson,
//             mediaPath: parsedJson?.mediaPath,
//             timeout: cardTypeDetails?.timeout || 0,
//             template: selectedTemplate?.value ?? null,
//         }));

//         setConfigureState({
//             type,
//             open: true,
//         });
//     }


//     async function deleteAction(type) {
//         try {
//             const data = {
//                 wabaNumber: selectedWabaUser?.mobileNo,
//                 type,
//                 wabaSrno: selectedWabaUser?.wabaSrno,
//             };
//             const res = await deleteAutoAction(data);
//             setCardDetails({
//                 ...cardDetails,
//                 [type]: {},
//             });
//             await handleGetAutoAction();
//         } catch (e) {
//             toast.error("Something went wrong");
//             return;
//         }
//     }

//     const getMediaType = (url = "") => {
//         const ext = url.split(".").pop().toLowerCase();

//         if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
//         if (["mp4", "mov", "avi", "webm"].includes(ext)) return "video";
//         if (["pdf", "doc", "docx", "xls", "xlsx"].includes(ext)) return "document";

//         return null;
//     };

//     async function handleAutoAction(actionType, payload = {}) {
//         if (basicDetails.msgType === "2" && !basicDetails.template) {
//             toast.error("Select the template");
//             return;
//         }

//         // if (
//         //   basicDetails.msgType === "2" &&
//         //   variablesData?.some((v) => v.value === "")
//         // ) {
//         //   toast.error("Fill the fields");
//         //   return;
//         // }

//         const buttonUrlData = templateDataNew?.components?.find(
//             (comp) => comp.type === "BUTTONS",
//         );

//         if (buttonUrlData?.buttons[0].value === "") {
//             toast.error("Fill the input field");
//         }
//         try {
//             let successMsg = "Data saved successfully";

//             /* =======================
//              BASE PAYLOAD
//           ======================== */
//             let data = {
//                 actionSenario: actionType,
//                 wabaNumber: selectedWabaUser?.mobileNo,
//                 wabaSrno: selectedWabaUser?.wabaSrno,
//                 sendMsgCheckbox: true,
//             };

//             const dayMap = [
//                 "Monday",
//                 "Tuesday",
//                 "Wednesday",
//                 "Thursday",
//                 "Friday",
//                 "Saturday",
//                 "Sunday",
//             ];

//             const inactiveTimeArray = [];
//             const noDaysSelected = [];

//             dayMap.forEach((day, idx) => {
//                 const wh = workingHours[day];
//                 if (wh?.enabled) {
//                     inactiveTimeArray.push({
//                         status: 1,
//                         fromTime: wh.start?.format("HH:mm") || "",
//                         toTime: wh.end?.format("HH:mm") || "",
//                         day: idx + 1,
//                     });
//                 } else {
//                     noDaysSelected.push(idx + 1);
//                 }
//             });

//             /* =======================
//              CONFIGURE AUTO ACTION
//           ======================== */
//             if (actionType === configureState.type) {
//                 // validations
//                 if (basicDetails.msgType === "1" && !basicDetails.message)
//                     return toast.error("Please enter message");

//                 if (basicDetails.msgType === "2" && !basicDetails.template)
//                     return toast.error("Please select template");

//                 if (basicDetails.msgType === "2" && variablesData?.length > 0) {
//                     const filled = variablesData.filter(Boolean).length;
//                     if (filled !== variablesData.length)
//                         return toast.error("Please fill all variables");
//                 }

//                 /* =======================
//                  VARIABLE REPLACEMENT
//               ======================== */

//                 let updatedTemplate = { ...specificTemplate };

//                 if (basicDetails.msgType === "2" && variablesData?.length > 0) {
//                     updatedTemplate.message = specificTemplate?.message?.replace(
//                         /{{(\d+)}}/g,
//                         (_, i) => variablesData.input[i - 1] || "",
//                     );

//                     updatedTemplate.urlValue = specificTemplate?.url?.replace(
//                         /{{(\d+)}}/g,
//                         (_, i) => variablesData.btnInput[i - 1] || "",
//                     );
//                 }

//                 const carouselMediaData = templateDataNew?.components?.find(
//                     (comp) => comp.type === "CAROUSEL",
//                 );

//                 const isUrlButton = buttonUrlData?.buttons?.some(
//                     (btn) => btn.type === "URL" && /\{\{\d+\}\}/.test(btn.url),
//                 );

//                 const mediaType = getMediaType(basicDetails.mediaPath);

//                 const { template, msgType, message, ...restbasicDetails } =
//                     basicDetails || {};

//                 data = {
//                     ...data,
//                     ...restbasicDetails,

//                     // force override
//                     // message: basicDetails.message,
//                     // tempJson: basicDetails.tempJson,
//                     messageEntity: cardDetails?.["welcome_message"]?.messageEntity
//                         ? String(cardDetails?.["welcome_message"]?.messageEntity)
//                         : "0",
//                     noDaysSelectedArray: "",
//                     inactiveTimeArray: [],
//                     tempJson: JSON.stringify({
//                         ...(basicDetails?.msgType === "2"
//                             ? {
//                                 template: {
//                                     components: [
//                                         ...(basicDetails.mediaPath
//                                             ? [
//                                                 {
//                                                     type: "HEADER",
//                                                     parameters: [
//                                                         {
//                                                             type: mediaType,
//                                                             [mediaType]: {
//                                                                 link: basicDetails.mediaPath,
//                                                             },
//                                                         },
//                                                     ],
//                                                 },
//                                             ]
//                                             : []),
//                                         ...(carouselMediaData
//                                             ? [
//                                                 {
//                                                     type: "CAROUSEL",
//                                                     cards:
//                                                         carouselMediaData?.cards
//                                                             ?.map((card, index) => {
//                                                                 const header = card.components?.find(
//                                                                     (c) => c.type === "HEADER",
//                                                                 );

//                                                                 if (!header) return null;

//                                                                 const format = header.format?.toLowerCase(); // image | video | document

//                                                                 return {
//                                                                     card_index: index,
//                                                                     components: [
//                                                                         {
//                                                                             type: "HEADER",
//                                                                             parameters: [
//                                                                                 {
//                                                                                     type: format,
//                                                                                     [format]: {
//                                                                                         link:
//                                                                                             header?.example
//                                                                                                 ?.header_handle?.[0] || "",
//                                                                                     },
//                                                                                 },
//                                                                             ],
//                                                                         },
//                                                                     ],
//                                                                 };
//                                                             })
//                                                             .filter(Boolean) || [],
//                                                 },
//                                             ]
//                                             : []),

//                                         ...(variablesData?.length
//                                             ? [
//                                                 {
//                                                     type: "BODY",
//                                                     parameters: variablesData.map((item) => ({
//                                                         text: item.value,
//                                                         type: "text",
//                                                     })),
//                                                 },
//                                             ]
//                                             : []),

//                                         ...(isUrlButton
//                                             ? [
//                                                 {
//                                                     sub_type: "url",
//                                                     index: 0,
//                                                     type: "button",
//                                                     parameters: [
//                                                         {
//                                                             text: buttonUrlData?.buttons[0].value,
//                                                             type: "text",
//                                                         },
//                                                     ],
//                                                 },
//                                             ]
//                                             : []),
//                                     ],
//                                     name: templateDataNew.name,
//                                     language: {
//                                         code: templateDataNew.language,
//                                         policy: "deterministic",
//                                     },
//                                 },
//                             }
//                             : {}),

//                         ...(basicDetails?.msgType === "1"
//                             ? {
//                                 text: {
//                                     preview_url: true,
//                                     body: basicDetails.message,
//                                 },
//                             }
//                             : {}),
//                         to: "{{ToMobile}}",
//                         type: basicDetails?.msgType === "1" ? "text" : "template",
//                         messaging_product: "whatsapp",
//                     }),

//                     // conditionally add / override keys
//                     ...(actionType === "15_minutes_message" && {
//                         messageEntity:
//                             String(cardDetails?.["15_minutes_message"]?.messageEntity) || "0",
//                     }),

//                     ...(actionType === "agent_assign_message" && {
//                         // agent: basicDetails?.agent || "",
//                         assignAgentCheckbox: false,
//                         agentEntity: "",
//                         messageEntity:
//                             String(cardDetails?.["agent_assign_message"]?.messageEntity) ||
//                             "0",
//                     }),

//                     ...(actionType === "inactive_agent_timing"
//                         ? {
//                             messageEntity: String(
//                                 cardDetails?.["inactive_agent_timing"]?.messageEntity ?? "0",
//                             ),
//                             inactiveTimeArray,
//                             noDaysSelectedArray: String(inactiveNoOfDays),
//                         }
//                         : {}),
//                 };
//             }

//             //  SAVE API CALL

//             const res = await saveAutoAction(data);
//             if (res?.status === true) {
//                 toast.success(successMsg);
//             } else {
//                 toast.error(res?.msg);
//                 return;
//             }

//             //  POST SUCCESS CLEANUP

//             if (actionType === configureState.type) {
//                 setCardDetails((prev) => ({
//                     ...prev,
//                     [configureState.type]: "",
//                 }));

//                 setConfigureState({ type: "", open: false });

//                 setBasicDetails({
//                     sendMsgCheckbox: true,
//                     msgType: "1",
//                     message: "",
//                     filePath: "",
//                     tempJson: "",
//                     mediaPath: "",
//                 });

//                 setVariablesData({
//                     length: 0,
//                     data: [],
//                     input: [],
//                     btn: [],
//                     btnInput: [],
//                 });

//                 setSpecificTemplate({});
//             }

//             await handleGetAutoAction();
//         } catch (e) {
//             console.error("error", e);
//             toast.error("Error saving data");
//         }
//     }

//     const liveChatCards = [
//         {
//             id: 1,
//             name: "Welcome Message",
//             button: ["Configure"],
//             desc: "Greets users automatically when they message for the first time. Helps create a quick and professional first response.",
//             message: "",
//             type: "welcome_message",
//             tooltip:
//                 "“Hi! 👋 Thanks for reaching out. Our team will connect with you shortly.”",
//         },
//         {
//             id: 2,
//             name: "Agent Inactive Timings",
//             button: ["Configure", "Configure Time"],
//             desc: "Sends a reply to the user’s first message received outside business hours. Useful for informing users about support timing.",
//             message: "",
//             type: "inactive_agent_timing",
//             tooltip: (
//                 <>
//                     <div>
//                         <b>What it does:</b> Sends a one-time auto-reply to the user’s first
//                         message after business hours.
//                     </div>

//                     <div>
//                         <b>Example:</b> “Our team is unavailable now. We’ll reply during our
//                         shift, 10 AM–7 PM.”
//                     </div>
//                 </>
//             ),
//         },
//         {
//             id: 3,
//             name: "Agent-Change",
//             button: ["Configure"],
//             desc: "Sends an automated message when a chat is reassigned or the agent becomes inactive. Keeps the user informed during off-hours.",
//             message: "",
//             type: "agent_assign_message",
//             tooltip: "“All agents are currently unavailable. We’ll reconnect soon.”",
//         },
//         {
//             id: 4,
//             name: "Agent No Response",
//             button: ["Configure"],
//             desc: "Activates auto-replies during agent off-shift times. Ensures customers receive a response even when no one is online.",
//             message: "",
//             type: "15_minutes_message",
//             tooltip: (
//                 <>
//                     <div>
//                         <b>What it does:</b> Auto-replies when no agent is online based on
//                         shift time settings.
//                     </div>

//                     <div>
//                         <b>Example:</b> “No agents are online right now. We'll respond after
//                         10 AM.”
//                     </div>
//                 </>
//             ),
//         },
//         // { id: 4, name: "Agent-No-Response", button: ["Configure Text"], desc: "Automatically greet customers when they message you during off hours.", message: "", type: "agent_no_response" },
//     ];

//     return (
//         <div className="p-2 bg-gray-50 rounded-md h-[87vh]">
//             <div className=" w-full bg-gray-50 overflow-scroll h-screen">
//                 <div className="h-full overflow-y-auto px-2 md:px-4 pb-24 md:pb-6">
//                     <div className="py-6">
//                         {/* Heading */}
//                         <div className="text-center flex flex-col">
//                             <span className="text-2xl font-bold text-gray-700 mb-2">
//                                 Agent Settings
//                             </span>
//                             <span className="text-gray-600  text-sm text-center mb-2">
//                                 Configure and automate your WhatsApp experience for smoother
//                                 customer communication.
//                             </span>
//                         </div>
//                         <div className=" h-auto p-0 md:p-5 ">
//                             <div className=" flex flex-wrap justify-center items-center gap-10 pb-50 lg:pb-auto 2xl:pb-100">
//                                 {liveChatCards.map((card, index) => {
//                                     return (
//                                         <>
//                                             <div
//                                                 key={index}
//                                                 className="relative flex w-90 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
//                                             >
//                                                 <div className=" mx-3 mt-3 h-30 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white  shadow-blue-gray-500/40 bg-gradient-to-r from-green-100 to-green-50">
//                                                     <Box
//                                                         display="flex"
//                                                         alignItems="center"
//                                                         justifyContent="space-between"
//                                                         marginTop={4}
//                                                     >
//                                                         <Box display="flex" alignItems="center" gap={2}>
//                                                             <Box
//                                                                 sx={{
//                                                                     backgroundColor: "#25D3661A",
//                                                                     p: 1.5,
//                                                                     borderRadius: 2,
//                                                                     display: "flex",
//                                                                     alignItems: "center",
//                                                                     justifyContent: "center",
//                                                                     marginLeft: 1,
//                                                                 }}
//                                                             >
//                                                                 <WhatsAppIcon
//                                                                     sx={{ color: "#25D366", fontSize: 28 }}
//                                                                 />
//                                                             </Box>
//                                                             <Typography
//                                                                 variant="h6"
//                                                                 fontWeight={600}
//                                                                 color="#1f2937"
//                                                             >
//                                                                 {card.name}
//                                                             </Typography>
//                                                         </Box>

//                                                         <Box display="flex" alignItems="center" gap={1}>
//                                                             <Switch
//                                                                 color="success"
//                                                                 checked={
//                                                                     cardDetails[card.type]?.messageEntity || 0
//                                                                 }
//                                                                 inputProps={{
//                                                                     "aria-label": `${card.type}-toggle`,
//                                                                 }}
//                                                                 value={
//                                                                     cardDetails[card.type]?.status || false
//                                                                 }
//                                                                 onClick={() => deleteAction(card.type)}
//                                                             />
//                                                         </Box>
//                                                     </Box>
//                                                 </div>

//                                                 <div className="p-3">
//                                                     <p className="mb-2 flex font-sans text-sm  font-normal tracking-normal text-gray-600 antialiased">
//                                                         {card.desc}
//                                                         <CustomTooltip
//                                                             title={card.tooltip}
//                                                             placement="top"
//                                                             arrow
//                                                         >
//                                                             <span className="">
//                                                                 <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
//                                                             </span>
//                                                         </CustomTooltip>
//                                                     </p>
//                                                     <div className="border border-gray-300 rounded-md p-2 bg-gray-100 h-50 overflow-scroll text-wrap">
//                                                         <pre className="text-sm font-normal text-gray-600 text-wrap">
//                                                             {cardDetails[card.type]?.message ||
//                                                                 "Hi! Thanks for connecting. Our team is unavailable right now. We'll be back at 10am tomorrow."}
//                                                         </pre>
//                                                     </div>
//                                                 </div>

//                                                 <div className="p-6 pt-0 flex flex-wrap justify-center items-center gap-2">
//                                                     <Tooltip
//                                                         key={index}
//                                                         title="Click to configure"
//                                                         arrow
//                                                     >
//                                                         <Button
//                                                             variant="contained"
//                                                             size="medium"
//                                                             sx={{
//                                                                 mt: 1,
//                                                                 alignSelf: "flex-start",
//                                                                 backgroundColor: "#25D366",
//                                                                 fontWeight: 600,
//                                                                 textTransform: "none",
//                                                                 px: 3,
//                                                                 ":hover": {
//                                                                     backgroundColor: "#1ebc59",
//                                                                 },
//                                                             }}
//                                                             onClick={() => {
//                                                                 handleConfigure(card.type);
//                                                             }}
//                                                         >
//                                                             Configure
//                                                         </Button>
//                                                     </Tooltip>
//                                                 </div>
//                                             </div>
//                                         </>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>

//                     {configureState?.open && (
//                         <Dialog
//                             header="Configure"
//                             visible={configureState?.open}
//                             style={{ width: "60vw" }}
//                             onHide={() =>
//                                 setConfigureState((prev) => ({ open: false, type: "" }))
//                             }
//                             draggable={false}
//                         >
//                             <div className="space-y-4">
//                                 <div className="flex gap-2">
//                                     <div className="flex gap-2 items-center border p-2 rounded-md">
//                                         <RadioButton
//                                             inputId="templateMessage"
//                                             name="templateMessage"
//                                             value="2"
//                                             onChange={(e) => {
//                                                 setBasicDetails((prev) => ({
//                                                     ...prev,
//                                                     msgType: e.value,
//                                                     // message: "",
//                                                 }));
//                                             }}
//                                             checked={basicDetails?.msgType === "2"}
//                                         />
//                                         <label htmlFor="templateMessage">Template</label>
//                                     </div>
//                                     <div className="flex gap-2 items-center border p-2 rounded-md">
//                                         <RadioButton
//                                             inputId="customMessage"
//                                             name="customMessage"
//                                             value="1"
//                                             onChange={(e) => {
//                                                 setBasicDetails((prev) => ({
//                                                     ...prev,
//                                                     msgType: e.value,
//                                                     mediaPath: "",
//                                                     // template: "",
//                                                 }));
//                                                 setVariablesData({
//                                                     length: 0,
//                                                     data: [],
//                                                     input: [],
//                                                 });
//                                                 setSpecificTemplate({});
//                                             }}
//                                             checked={basicDetails?.msgType === "1"}
//                                         />
//                                         <label htmlFor="customMessage">Custom</label>
//                                     </div>
//                                 </div>

//                                 {basicDetails?.msgType === "1" && (
//                                     <div className="mt-2">
//                                         <UniversalTextArea
//                                             label="Text Message"
//                                             id="textMessage"
//                                             name="textMessage"
//                                             placeholder={"Type something..."}
//                                             value={basicDetails?.message}
//                                             onChange={(e) => {
//                                                 setBasicDetails((prev) => ({
//                                                     ...prev,
//                                                     message: e.target.value,
//                                                 }));
//                                             }}
//                                             className="w-full h-25 resize-none"
//                                         />
//                                     </div>
//                                 )}

//                                 {basicDetails?.msgType === "2" && (
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                         <div className="w-full">
//                                             <DropdownWithSearch
//                                                 id="templateMessage"
//                                                 name="templateMessage"
//                                                 label="Select Template"
//                                                 options={templateLiveOptions}
//                                                 value={basicDetails.template ?? null}
//                                                 onChange={(selected) => {
//                                                     setSelectedTemplate(selected);
//                                                     setBasicDetails((prev) => ({
//                                                         ...prev,
//                                                         template: selected, // selected is the full {value,label} object
//                                                     }));
//                                                     setFileData({ url: "", file: "" });
//                                                     setVariablesData({
//                                                         length: 0,
//                                                         data: [],
//                                                         input: [],
//                                                     });
//                                                 }}
//                                                 className="w-full"
//                                             />
//                                             {basicDetails?.template && (
//                                                 <Variables
//                                                     variablesData={variablesData}
//                                                     setVariablesData={setVariablesData}
//                                                     specificTemplate={specificTemplate}
//                                                     fileRef={fileRef}
//                                                     setBasicDetails={setBasicDetails}
//                                                     fileData={fileData}
//                                                     setFileData={setFileData}
//                                                     onInputChange={(value, variable) =>
//                                                         setFormData((prev) => ({
//                                                             ...prev,
//                                                             [variable]: value,
//                                                         }))
//                                                     }
//                                                     setInputValues={setInputValues}
//                                                     inputValues={inputValues}
//                                                     templateDataNew={templateDataNew}
//                                                     setTemplateDataNew={setTemplateDataNew}
//                                                     cardIndex={cardIndex}
//                                                     setCardIndex={setCardIndex}
//                                                     selectedTemplateData={selectedTemplateData}
//                                                 />
//                                             )}
//                                         </div>
//                                         <div className="w-full">
//                                             <Preview
//                                                 templateDataNew={templateDataNew}
//                                                 // specificTemplate={specificTemplate}
//                                                 variablesData={variablesData}
//                                                 basicDetails={basicDetails}
//                                                 inputValues={inputValues}
//                                                 fileData={fileData}
//                                                 setFileData={setFileData}
//                                                 fileRef={fileRef}
//                                                 setCardIndex={setCardIndex}
//                                             />
//                                         </div>
//                                     </div>
//                                 )}

//                                 <div>
//                                     {configureState?.type === "agent_assign_message" && (
//                                         <div>
//                                             <DropdownWithSearch
//                                                 id="agent"
//                                                 name="agent"
//                                                 label="Select an agent"
//                                                 options={agent}
//                                                 onChange={(e) => {
//                                                     setBasicDetails((prev) => ({
//                                                         ...prev,
//                                                         agent: e,
//                                                     }));
//                                                 }}
//                                                 value={basicDetails?.agent}
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                                 {configureState?.type === "15_minutes_message" && (
//                                     <div className="shadom-md p-3 bg-gray-100 rounded-md w-full flex flex-row gap-5">
//                                         <div className="w-46">
//                                             <InputField
//                                                 label="Set No Response Time: "
//                                                 tooltipContent="Enter only minutes"
//                                                 value={basicDetails.timeout}
//                                                 onChange={(e) =>
//                                                     setBasicDetails((prev) => ({
//                                                         ...prev,
//                                                         timeout: Number(e.target.value),
//                                                     }))
//                                                 }
//                                             />
//                                             {lastSetMinute && (
//                                                 <div className="text-green-600 text-xs font-semibold mt-1">
//                                                     Last set: {lastSetMinute} minutes
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {configureState?.type === "inactive_agent_timing" && (
//                                     <>
//                                         <h2 className="font-semibold">Assign Hours</h2>
//                                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                             <div className="space-y-2">
//                                                 {/* If working hours are not assigned, show a message + Assign Now button */}
//                                                 {Object.keys(workingHours).map((day, index) => (
//                                                     <div
//                                                         key={index}
//                                                         className="flex items-center flex-wrap justify-between bg-white shadow-md gap-2 p-2 rounded-lg"
//                                                     >
//                                                         {/* Toggle Open/Closed */}
//                                                         <div className="flex items-center space-x-2">
//                                                             <Switch
//                                                                 sx={{
//                                                                     "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
//                                                                     {
//                                                                         backgroundColor: "#34C759",
//                                                                     },
//                                                                     "& .MuiSwitch-switchBase.Mui-checked": {
//                                                                         color: "#34C759",
//                                                                     },
//                                                                 }}
//                                                                 checked={workingHours[day].enabled}
//                                                                 onChange={() => {
//                                                                     const isCurrentlyEnabled =
//                                                                         workingHours[day].enabled;

//                                                                     // Toggle workingHours
//                                                                     setWorkingHours((prev) => ({
//                                                                         ...prev,
//                                                                         [day]: {
//                                                                             ...prev[day],
//                                                                             enabled: !prev[day].enabled,
//                                                                         },
//                                                                     }));

//                                                                     // Only when user UNCHECKS
//                                                                     if (isCurrentlyEnabled) {
//                                                                         setInactiveNoOfDays((prev) =>
//                                                                             prev.includes(index + 1)
//                                                                                 ? prev
//                                                                                 : [...prev, index + 1],
//                                                                         );
//                                                                     } else {
//                                                                         // Optional: remove when checked again
//                                                                         setInactiveNoOfDays((prev) =>
//                                                                             prev.filter((d) => d !== index + 1),
//                                                                         );
//                                                                     }
//                                                                 }}
//                                                             />
//                                                             <span className="font-semibold text-blue-600 text-sm">
//                                                                 {day}
//                                                             </span>
//                                                         </div>

//                                                         {/* Time Inputs when Enabled */}
//                                                         {workingHours[day].enabled ? (
//                                                             <div className="flex gap-2">
//                                                                 <TimePicker
//                                                                     value={workingHours[day].start}
//                                                                     onChange={(newTime) =>
//                                                                         setWorkingHours((prev) => ({
//                                                                             ...prev,
//                                                                             [day]: {
//                                                                                 ...prev[day],
//                                                                                 start: newTime,
//                                                                             },
//                                                                         }))
//                                                                     }
//                                                                     ampm
//                                                                     className="w-35 text-xs"
//                                                                 />
//                                                                 <TimePicker
//                                                                     value={workingHours[day].end}
//                                                                     onChange={(newTime) =>
//                                                                         setWorkingHours((prev) => ({
//                                                                             ...prev,
//                                                                             [day]: {
//                                                                                 ...prev[day],
//                                                                                 end: newTime,
//                                                                             },
//                                                                         }))
//                                                                     }
//                                                                     ampm
//                                                                     className="w-35 text-xs"
//                                                                 />
//                                                             </div>
//                                                         ) : (
//                                                             <div className="w-10 flex p-2 pr-10 justify-center items-center">
//                                                                 <span className="text-gray-400 text-sm font-semibold">
//                                                                     Closed
//                                                                 </span>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </LocalizationProvider>
//                                     </>
//                                 )}

//                                 <div className="flex justify-center items-end h-full mt-4">
//                                     <UniversalButton
//                                         label="Save"
//                                         name="saveAction"
//                                         id="saveAction"
//                                         onClick={() => handleAutoAction(configureState?.type)}
//                                     />
//                                 </div>
//                             </div>
//                         </Dialog>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WabaChatSettingNew;




import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Paper, Chip, Divider, CircularProgress, Tooltip } from "@mui/material";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";

// ICONS
import {
    FiMessageSquare, FiClock, FiUserCheck,
    FiAlertCircle, FiEdit3, FiTrash2, FiPlus
} from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";

// APIS
import {
    deleteAutoAction,
    getAutoAction,
    saveAutoAction,
} from "@/apis/whatsapp/whatsapp";

const WabaChatSettingNew = ({ selectedWabaUser }) => {
    const [cardDetails, setCardDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [configureState, setConfigureState] = useState({ type: "", open: false });

    // Constants for the 4 scenarios
    const SCENARIOS = [
        {
            id: "welcome_message",
            title: "Welcome Greeting",
            description: "Automatically responds to a customer's first message to initiate the conversation professionally.",
            icon: <FiMessageSquare size={24} className="text-blue-600" />,
            color: "#2563eb",
        },
        {
            id: "inactive_agent_timing",
            title: "Out-of-Office Response",
            description: "Notifies customers when they reach out outside of your business operating hours.",
            icon: <FiClock size={24} className="text-orange-600" />,
            color: "#ea580c",
        },
        {
            id: "agent_assign_message",
            title: "Agent Assignment",
            description: "Confirms to the customer that their query has been assigned to a specific support representative.",
            icon: <FiUserCheck size={24} className="text-green-600" />,
            color: "#16a34a",
        },
        {
            id: "15_minutes_message",
            title: "Delayed Response Alert",
            description: "Triggered when an agent hasn't responded within your defined SLA (e.g., 15 minutes).",
            icon: <FiAlertCircle size={24} className="text-purple-600" />,
            color: "#9333ea",
        }
    ];

    const fetchAllSettings = async () => {
        if (!selectedWabaUser?.mobileNo) return;
        setLoading(true);
        try {
            const dataMap = {};
            for (const scenario of SCENARIOS) {
                const res = await getAutoAction({
                    wabaNumber: selectedWabaUser.mobileNo,
                    type: scenario.id
                });
                dataMap[scenario.id] = res || {};
            }
            setCardDetails(dataMap);
        } catch (error) {
            toast.error("Failed to sync settings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSettings();
    }, [selectedWabaUser]);

    const handleRemove = async (type) => {
        try {
            await deleteAutoAction({
                wabaNumber: selectedWabaUser?.mobileNo,
                type,
                wabaSrno: selectedWabaUser?.wabaSrno,
            });
            toast.success("Setting removed successfully");
            fetchAllSettings();
        } catch (e) {
            toast.error("Error removing setting");
        }
    };

    // if (loading) {
    //     return (
    //         <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
    //             <CircularProgress sx={{ color: '#10b981' }} />
    //         </Box>
    //     );
    // }

    return (
        <div className="max-w-7xl mx-auto p-8 bg-[#fcfcfc]">
            {/* Header Section */}
            <div className="mb-10">
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
                    Automation Workflows
                </Typography>
                <Typography sx={{ color: '#666', mt: 1, fontSize: '1.1rem' }}>
                    Configure how your WhatsApp Business handles incoming interactions automatically.
                </Typography>
            </div>

            {/* Workflow Cards */}
            <Grid container spacing={4}>
                {SCENARIOS.map((scenario) => {
                    const config = cardDetails[scenario.id];
                    const isActive = config && Object.keys(config).length > 0 && config.tempJson;

                    return (
                        <Grid item xs={12} md={6} key={scenario.id}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: '24px',
                                    border: '1px solid #e5e7eb',
                                    backgroundColor: '#fff',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: scenario.color,
                                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)'
                                    }
                                }}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div
                                        className="p-4 rounded-2xl"
                                        style={{ backgroundColor: `${scenario.color}15` }}
                                    >
                                        {scenario.icon}
                                    </div>
                                    <Chip
                                        label={isActive ? "Configured" : "Not Set"}
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            backgroundColor: isActive ? '#ecfdf5' : '#f3f4f6',
                                            color: isActive ? '#059669' : '#6b7280',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </div>

                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#111827' }}>
                                    {scenario.title}
                                </Typography>
                                <Typography sx={{ color: '#4b5563', mb: 4, fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    {scenario.description}
                                </Typography>

                                {/* Message Preview Area */}
                                <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-4 mb-6 min-h-[100px] flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase' }}>
                                            Live Content
                                        </Typography>
                                        <Tooltip title="This is what the customer sees">
                                            <span><AiOutlineInfoCircle size={14} className="text-gray-400" /></span>
                                        </Tooltip>
                                    </div>
                                    <Typography variant="body2" sx={{ color: isActive ? '#374151' : '#9ca3af', fontStyle: isActive ? 'normal' : 'italic' }}>
                                        {isActive ? (config.message || "Template configuration active") : "No automated response currently active for this scenario."}
                                    </Typography>
                                </div>

                                {/* Action Bar */}
                                <div className="flex gap-3">
                                    {!isActive ? (
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<FiPlus />}
                                            onClick={() => setConfigureState({ type: scenario.id, open: true })}
                                            sx={{
                                                backgroundColor: '#111827',
                                                color: '#fff',
                                                borderRadius: '12px',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                py: 1.5,
                                                '&:hover': { backgroundColor: '#374151' }
                                            }}
                                        >
                                            Configure Now
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                startIcon={<FiEdit3 />}
                                                onClick={() => setConfigureState({ type: scenario.id, open: true })}
                                                sx={{
                                                    borderColor: '#e5e7eb',
                                                    color: '#374151',
                                                    borderRadius: '12px',
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    '&:hover': { borderColor: '#111827', backgroundColor: '#f9fafb' }
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleRemove(scenario.id)}
                                                sx={{
                                                    minWidth: '56px',
                                                    borderColor: '#fee2e2',
                                                    color: '#ef4444',
                                                    borderRadius: '12px',
                                                    '&:hover': { backgroundColor: '#fef2f2', borderColor: '#ef4444' }
                                                }}
                                            >
                                                <FiTrash2 size={18} />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Dialog remains for configuration content, but uses the same clean style */}
            <Dialog
                visible={configureState.open}
                onHide={() => setConfigureState({ type: "", open: false })}
                header={`Configure ${configureState.type.split('_').join(' ')}`}
                draggable={false}
                style={{ width: '50vw' }}
                className="professional-dialog"
            >
                <div className="py-4">
                    <Typography sx={{ color: '#666', mb: 4 }}>
                        Update the message content and parameters for this automation.
                    </Typography>
                    {/* Your existing Form Fields (TextArea, Dropdown, etc.) go here */}
                    <div className="flex justify-end gap-3 mt-8">
                        <Button
                            onClick={() => setConfigureState({ type: "", open: false })}
                            sx={{ color: '#666', textTransform: 'none' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#111827', textTransform: 'none', px: 4, borderRadius: '8px' }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default WabaChatSettingNew;