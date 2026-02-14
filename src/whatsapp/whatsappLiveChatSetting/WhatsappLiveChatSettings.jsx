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

// // ICONS
// import TagIcon from "@mui/icons-material/Tag";
// import EmailIcon from "@mui/icons-material/Email";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import {
//   BiMessageSquareDetail,
//   BiCog,
//   BiUserCircle,
//   BiChevronRight,
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
//   deleteAutoAction,
//   fetchTemplates,
//   fetchTemplatesValue,
//   getAutoAction,
//   getWabaList,
//   saveAutoAction,
// } from "@/apis/whatsapp/whatsapp";
// import { deleteblockUser, getblockUser } from "@/apis/whatsapp/whatsapp";

// // COMPONENTS
// import AnimatedDropdown from "../components/AnimatedDropdown";
// import { ConfigureDialog } from "./components/configureDialog";
// import UniversalButton from "../components/UniversalButton";
// import CannedMessageManager from "../../cannedmessage/components/CannedMessageManager";
// import { Datasource } from "./components/Datasource";
// import { Ai } from "./components/Ai";
// import CustomTooltip from "../components/CustomTooltip";
// import Unsubscribe from "../unsubscribe/Unsubscribe";
// import WhatsappCalling from "../WhatsappCalling/WhatsappCalling";

// const MotionPaper = motion(Paper);

// const WhatsappLiveChatSettings = ({ selectedWabaUser }) => {
//   const [blockedUsers, setBlockedUsers] = useState([]);
//   const [allWaba, setAllWaba] = useState([]);
//   const [selectedWaba, setSelectedWaba] = useState(null);
//   const [selectedId, setSelectedId] = useState(null);
//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [isBlocking, setIsBlocking] = useState(false);

//   const [fileData, setFileData] = useState({
//     url: "",
//     file: "",
//   });

//   // useEffect(() => {
//   //     // Only for demo: generate 50 dummy users if no real data
//   //     if (selectedWaba && blockedUsers.length === 0 && !loading) {
//   //         const dummy = Array.from({ length: 50 }).map((_, i) => ({
//   //             wa_id: `91999999${(1000 + i).toString().padStart(4, "0")}`,
//   //         }));
//   //         setBlockedUsers(dummy);
//   //     }
//   // }, [selectedWaba, blockedUsers, loading]);

//   // chat setting
//   const [selectedName, setSelectedName] = useState("");
//   const [selectedAgentName, setSelectedAgentName] = useState("");
//   const [selectedAgentId, setSelectedAgentId] = useState(null);
//   const [workingHoursDialog, setWorkingHoursDialog] = useState(false);
//   const [workingHours, setWorkingHours] = useState({});
//   const [isWorkingHoursEnabled, setIsWorkingHoursEnabled] = useState(true);

//   const [wabaState, setWabaState] = useState({
//     waba: [],
//     selected: "",
//   });

//   const [cardDetails, setCardDetails] = useState({});
//   const [configureState, setConfigureState] = useState({
//     type: "",
//     open: false,
//   });

//   const [basicDetails, setBasicDetails] = useState({
//     sendMsgCheckbox: true,
//     msgType: "1",
//     message: "",
//     filePath: "",
//     tempJson: "",
//     mediaPath: "",
//   });

//   const [allTemplates, setAllTemplates] = useState([]);
//   const [specificTemplate, setSpecificTemplate] = useState({});
//   const [variablesData, setVariablesData] = useState({
//     length: 0,
//     data: [],
//     input: [],
//     btn: [],
//     btnInput: [],
//   });

//   const fileRef = useRef(null);

//   useEffect(() => {
//     async function handleFetchWaba() {
//       try {
//         const res = await getWabaList();
//         setWabaState((prev) => ({
//           waba: res,
//           selected: "",
//         }));
//       } catch (e) {
//         return toast.error("Error fetching Waba Details");
//       }
//     }

//     handleFetchWaba();
//   }, []);

//   async function handleGetAutoAction() {
//     // if (!wabaState.selected) return;
//     try {
//       const data = {
//         wabaNumber: selectedWabaUser?.mobileNo,
//         type: "-1",
//       };
//       const res = await getAutoAction(data);
//       res?.EntityMstActionScenerio &&
//         res.EntityMstActionScenerio.map(async (item) => {
//           data["type"] = item.actionScenario;
//           const res = await getAutoAction(data);
//           setCardDetails((prev) => ({
//             ...prev,
//             [item.actionScenario]: res,
//           }));
//         });
//     } catch (e) {
//       return toast.error("Error fetching auto action");
//     }
//   }

//   async function handleFetchAllTemplates() {
//     // if (!wabaState.selected) return;
//     try {
//       // const wabaSrno = wabaState.waba.find(
//       //   (waba) => waba.mobileNo === wabaState.selected
//       // )?.wabaSrno;

//       const body = { officialWhatsappSrno: selectedWabaUser?.wabaSrno };
//       const res = await fetchTemplates(body);

//       const temps = Object.keys(res).map((key) => ({
//         value: key,
//         label: res[key],
//       }));

//       setAllTemplates(temps);
//     } catch (e) {
//       return toast.error("Error fetching all templates");
//     }
//   }

//   useEffect(() => {
//     handleGetAutoAction();
//     handleFetchAllTemplates();
//   }, [selectedWabaUser?.mobileNo]);

//   useEffect(() => {
//     if (!basicDetails?.template) return;
//     async function handleFetchTemplateValues() {
//       try {
//         const res = await fetchTemplatesValue(basicDetails.template);
//         const variable = extractVariablesFromText(res?.message);
//         const btnVar = extractVariablesFromText(res?.url);
//         setVariablesData({
//           length: variable.length,
//           data: variable,
//           input: [],
//           btn: btnVar,
//           btnInput: [],
//         });

//         setSpecificTemplate(res);
//       } catch (e) {
//         return toast.error("Error fetching template values");
//       }
//     }

//     handleFetchTemplateValues();
//   }, [basicDetails]);

//   function extractVariablesFromText(text) {
//     const regex = /{{(\d+)}}/g;
//     let match;
//     const variables = [];
//     while ((match = regex.exec(text)) !== null) {
//       if (!variables.includes(match[1])) {
//         variables.push(match[1]);
//       }
//     }
//     return variables;
//   }

//   function handleConfigure(type) {
//     // if (!wabaState.selected) {
//     //   return toast.error("Please select WABA");
//     // }
//     setConfigureState((prev) => ({
//       ...prev,
//       type,
//       open: true,
//     }));

//     const cardTypeDetails = cardDetails[type];
//     let tempId = null;
//     const parsedJson = JSON.parse(cardTypeDetails?.tempJson);
//     if (parsedJson?.templateName) {
//       const tempName = parsedJson?.templateName;
//       tempId = allTemplates?.find((item) => item.label === tempName)?.value;
//     }
//     let msgType = "1";
//     if (parsedJson?.templateName) {
//       msgType = "2";
//     }
//     // fileRef.current.value = cardTypeDetails?.mediaPath;

//     setFileData({
//       url: parsedJson?.mediaPath,
//       file: parsedJson?.mediaPath,
//     });
//     setBasicDetails((prev) => ({
//       sendMsgCheckbox: true,
//       msgType,
//       message: cardTypeDetails?.message,
//       filePath: cardTypeDetails?.filePath,
//       tempJson: cardTypeDetails?.tempJson,
//       mediaPath: parsedJson?.mediaPath,
//       timeout: cardTypeDetails?.timeout,
//       template: tempId,
//     }));
//   }

//   async function deleteAction(type) {
//     try {
//       const data = {
//         wabaNumber: selectedWabaUser?.mobileNo,
//         type,
//         // wabaSrno: wabaState.waba.find(
//         //   (waba) => waba.mobileNo === wabaState.selected
//         // )?.wabaSrno,
//         wabaSrno: selectedWabaUser?.wabaSrno
//       };
//       const res = await deleteAutoAction(data);
//       setCardDetails({
//         ...cardDetails,
//         [type]: "",
//       });
//       await handleGetAutoAction();
//     } catch (e) {
//       toast.error("Something went wrong");
//       return;
//     }
//   }

//   async function handleSave() {
//     let isError = false;
//     //validation start
//     // if (!wabaState.selected) return toast.error("Please select WABA");
//     if (basicDetails?.msgType === "1" && !basicDetails?.message)
//       return toast.error("Please enter message");
//     if (basicDetails?.msgType === "2" && !basicDetails?.template)
//       return toast.error("Please select template");
//     // if (basicDetails?.msgType === "2" && !basicDetails?.mediaPath)
//     //   return toast.error("Please upload media");
//     if (basicDetails?.msgType === "2" && variablesData.length) {
//       const length = variablesData?.input.filter((item) => item != "").length;

//       if (length !== variablesData?.length) {
//         return toast.error("Please fill all variables");
//       }
//     }
//     //validation end

//     let variablemessage = "";
//     let btnVariable = "";

//     if (basicDetails?.msgType === "2" && variablesData.data.length) {
//       variablemessage = specificTemplate?.message.replace(
//         /{{(\d+)}}/g,
//         (_, index) => variablesData?.input[+index - 1] || ""
//       );
//     }
//     if (basicDetails?.msgType === "2" && variablesData.btn.length) {
//       btnVariable = specificTemplate?.url.replace(
//         /{{(\d+)}}/g,
//         (_, index) => variablesData?.btnInput[+index - 1] || ""
//       );
//     }

//     let message = basicDetails.message || variablemessage;
//     specificTemplate.urlValue = btnVariable;
//     // specificTemplate.message = message;
//     variablemessage && (specificTemplate.message = variablemessage);

//     // const wabaSrno = wabaState.waba.find(
//     //   (waba) => waba.mobileNo === wabaState.selected
//     // )?.wabaSrno;
//     delete basicDetails?.template
//     const data = {
//       actionSenario: configureState?.type,
//       wabaNumber: selectedWabaUser?.mobileNo,
//       wabaSrno: selectedWabaUser?.wabaSrno,
//       ...basicDetails,
//       // message: basicDetails?.message || message,
//       message: message || specificTemplate.message,
//       tempJson: JSON.stringify(specificTemplate),
//       // assignAgentCheckbox: false
//       messageEntity: "0",
//     };

//     try {
//       await deleteAction(configureState.type);

//       const res = await saveAutoAction(data);
//       if (!res?.status) {
//         toast.error("Error saving data");
//         return;
//       }
//       toast.success("Data saved successfully");

//       setCardDetails({
//         ...cardDetails,
//         [configureState.type]: "",
//       });
//       setConfigureState({
//         type: "",
//         open: false,
//       });
//       setBasicDetails({
//         sendMsgCheckbox: true,
//         msgType: "1",
//         message: "",
//         filePath: "",
//         tempJson: "",
//         mediaPath: "",
//         template: "",
//       });
//       setVariablesData({
//         length: 0,
//         data: [],
//         input: [],
//         btn: [],
//         btnInput: [],
//       });
//       setSpecificTemplate({});
//       // if (fileRef) fileRef.current.value = "";
//       await handleGetAutoAction();
//     } catch (e) {
//       toast.error("Error saving data");
//     }
//   }

//   async function handleWorkingSave() {
//     // if (!wabaState.selected) {
//     //   return toast.error("Please select WABA");
//     // }
//     const dayMap = [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ];

//     const inactiveTimeArray = [];
//     const noDaysSelected = [];

//     dayMap.forEach((day, idx) => {
//       const wh = workingHours[day];
//       if (wh && wh.enabled) {
//         inactiveTimeArray.push({
//           status: 1,
//           fromTime: wh.start ? wh.start.format("HH:mm") : "",
//           toTime: wh.end ? wh.end.format("HH:mm") : "",
//           day: idx + 1,
//         });
//       } else {
//         noDaysSelected.push(idx + 1);
//       }
//     });

//     // const wabaSrno = wabaState.waba.find(
//     //   (waba) => waba.mobileNo === wabaState.selected
//     // )?.wabaSrno;

//     const tempJson = JSON.stringify(specificTemplate);

//     const data = {
//       actionSenario: "inactive_agent_timing",
//       sendMsgCheckbox: true,
//       msgType: basicDetails.msgType || "2",
//       message:
//         basicDetails.message ||
//         "Hello dear Mr. rtrt,to resolve your issue please connect with us",
//       filePath: basicDetails.filePath || "",
//       wabaNumber: selectedWabaUser?.mobileNo,
//       inactiveTimeArray,
//       wabaSrno: selectedWabaUser?.wabaSrno,
//       tempJson,
//       mediaPath: basicDetails.mediaPath || "",
//       messageEntity: "0",
//       noDaysSelectedArray:
//         noDaysSelected.join(",") + (noDaysSelected.length ? "," : ""),
//       agent: basicDetails?.agent || "",
//     };

//     try {
//       const res = await saveAutoAction(data);
//       if (!res?.status) {
//         return;
//       }
//       toast.success("Data saved successfully");
//       setWorkingHoursDialog(false);
//       await handleGetAutoAction();
//     } catch (e) {
//       toast.error("Error saving data");
//     }
//   }

//   const liveChatCards = [
//     {
//       id: 1,
//       name: "Welcome Message",
//       button: ["Configure"],
//       desc: "Greets users automatically when they message for the first time. Helps create a quick and professional first response.",
//       message: "",
//       type: "welcome_message",
//       tooltip:
//         "“Hi! 👋 Thanks for reaching out. Our team will connect with you shortly.”",
//     },
//     {
//       id: 2,
//       name: "Agent Inactive Timings",
//       button: ["Configure", "Configure Time"],
//       desc: "Sends a reply to the user’s first message received outside business hours. Useful for informing users about support timing.",
//       message: "",
//       type: "inactive_agent_timing",
//       tooltip: (
//         <>
//           <div>
//             <b>What it does:</b> Sends a one-time auto-reply to the user’s first
//             message after business hours.
//           </div>

//           <div>
//             <b>Example:</b> “Our team is unavailable now. We’ll reply during our
//             shift, 10 AM–7 PM.”
//           </div>
//         </>
//       ),
//     },
//     {
//       id: 3,
//       name: "Agent-Change",
//       button: ["Configure"],
//       desc: "Sends an automated message when a chat is reassigned or the agent becomes inactive. Keeps the user informed during off-hours.",
//       message: "",
//       type: "agent_assign_message",
//       tooltip: "“All agents are currently unavailable. We’ll reconnect soon.”",
//     },
//     {
//       id: 4,
//       name: "Agent No Response",
//       button: ["Configure"],
//       desc: "Activates auto-replies during agent off-shift times. Ensures customers receive a response even when no one is online.",
//       message: "",
//       type: "15_minutes_message",
//       tooltip: (
//         <>
//           <div>
//             <b>What it does:</b> Auto-replies when no agent is online based on
//             shift time settings.
//           </div>

//           <div>
//             <b>Example:</b> “No agents are online right now. We'll respond after
//             10 AM.”
//           </div>
//         </>
//       ),
//     },
//     // { id: 4, name: "Agent-No-Response", button: ["Configure Text"], desc: "Automatically greet customers when they message you during off hours.", message: "", type: "agent_no_response" },
//   ];

//   async function handle15MinTime(minutes) {
//     // if (!wabaState.selected) return toast.error("Please select WABA");

//     // const wabaSrno = wabaState.waba.find(
//     //   (waba) => waba.mobileNo === wabaState.selected
//     // )?.wabaSrno;

//     const data = {
//       actionSenario: "15_minutes_message",
//       sendMsgCheckbox: true,
//       msgType: "2",
//       message: "",
//       filePath: "",
//       // wabaNumber: wabaState.selected,
//       // wabaSrno: wabaSrno,
//       wabaNumber: selectedWabaUser?.mobileNo,
//       wabaSrno: selectedWabaUser?.wabaSrno,
//       // tempJson: JSON.stringify({
//       //   template: {
//       //     replyButtons: [],
//       //     name: "test13",
//       //     language: { code: "en", policy: "deterministic" },
//       //   },
//       //   to: "mobileno",
//       //   type: "template",
//       // }),
//       tempJson: "",
//       mediaPath: "",
//       messageEntity: cardDetails["15_minutes_message"]?.messageEntity || "0",
//       timeout: Number(minutes) || 0,
//     };

//     try {
//       const res = await saveAutoAction(data);
//       if (!res?.status) {
//         // toast.error("Error saving 15 min message");
//         return;
//       }
//       toast.success("15 min message saved successfully");
//       await handleGetAutoAction();
//     } catch (e) {
//       toast.error("Error saving 15 min message");
//     }
//   }

//   return (
//     <div className="p-2 bg-gray-50 rounded-md h-[87vh]">

//       {selectedWabaUser ? (
//         <div className=" w-full overflow-hidden bg-gray-50 p-10 overflow-scroll h-[80vh] pb-40">
//           {/* <div className="h-full overflow-y-auto px-2 md:px-4 pb-24 md:pb-6"> */}
//           <div className="">
//             {/* <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50
//       rounded-xl py-6 px-2 md:px-6 shadow-lg min-h-full"> */}
//             <div className="">
//               {/* <CannedMessageManager /> */}

//               {/* Heading */}
//               <div className="text-center flex flex-col">
//                 <span className="text-2xl font-bold text-gray-700 mb-2">
//                   Agent Settings
//                 </span>
//                 <span className="text-gray-600  text-sm text-center mb-2">
//                   Configure and automate your WhatsApp experience for smoother
//                   customer communication.
//                 </span>
//               </div>
//               <div className="flex justify-end w-full items-center mb-2">
//               </div>
//               {/* <div className="bg-white rounded-2xl shadow-lg h-auto p-0 md:p-5 "> */}
//               <div className="">
//                 {selectedWabaUser?.mobileNo ? (
//                   <div className=" flex flex-wrap justify-center items-center gap-10 pb-50 lg:pb-0 ">
//                     {liveChatCards.map((card, index) => {
//                       return (
//                         <>
//                           <div
//                             key={index}
//                             className="relative flex w-90 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
//                           >
//                             <div className=" mx-3 mt-3 h-30 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white  shadow-blue-gray-500/40 bg-gradient-to-r from-green-100 to-green-50">
//                               <Box
//                                 display="flex"
//                                 alignItems="center"
//                                 justifyContent="space-between"
//                                 marginTop={4}
//                               >
//                                 <Box display="flex" alignItems="center" gap={2}>
//                                   <Box
//                                     sx={{
//                                       backgroundColor: "#25D3661A",
//                                       p: 1.5,
//                                       borderRadius: 2,
//                                       display: "flex",
//                                       alignItems: "center",
//                                       justifyContent: "center",
//                                       marginLeft: 1,
//                                     }}
//                                   >
//                                     <WhatsAppIcon
//                                       sx={{ color: "#25D366", fontSize: 28 }}
//                                     />
//                                   </Box>
//                                   <Typography
//                                     variant="h6"
//                                     fontWeight={600}
//                                     color="#1f2937"
//                                   >
//                                     {card.name}
//                                   </Typography>
//                                 </Box>

//                                 <Box display="flex" alignItems="center" gap={1}>
//                                   <Switch
//                                     color="success"
//                                     checked={
//                                       cardDetails[card.type]?.message || 0
//                                     }
//                                     inputProps={{
//                                       "aria-label": `${card.type}-toggle`,
//                                     }}
//                                     value={
//                                       cardDetails[card.type]?.status || false
//                                     }
//                                     onClick={() => deleteAction(card.type)}
//                                   />
//                                 </Box>
//                               </Box>
//                             </div>

//                             <div className="p-3">
//                               <p className="mb-2 flex font-sans text-sm  font-normal tracking-normal text-gray-600 antialiased">
//                                 {card.desc}
//                                 <CustomTooltip
//                                   title={card.tooltip}
//                                   placement="top"
//                                   arrow
//                                 >
//                                   <span className="">
//                                     <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
//                                   </span>
//                                 </CustomTooltip>
//                               </p>
//                               <div className="border border-gray-300 rounded-md p-2 bg-gray-100 h-50 overflow-scroll text-wrap">
//                                 <pre className="text-sm font-normal text-gray-600 text-wrap">
//                                   {cardDetails[card.type]?.message ||
//                                     "Hi! Thanks for connecting. Our team is unavailable right now. We'll be back at 10am tomorrow."}
//                                 </pre>
//                               </div>
//                             </div>

//                             <div className="p-6 pt-0 flex flex-wrap justify-center items-center gap-2">
//                               {card.button.map((btnLabel, index) => (
//                                 <Tooltip
//                                   key={index}
//                                   title="Click to configure"
//                                   arrow
//                                 >
//                                   <Button
//                                     variant="contained"
//                                     size="medium"
//                                     sx={{
//                                       mt: 1,
//                                       alignSelf: "flex-start",
//                                       backgroundColor: "#25D366",
//                                       fontWeight: 600,
//                                       textTransform: "none",
//                                       px: 3,
//                                       ":hover": { backgroundColor: "#1ebc59" },
//                                     }}
//                                     onClick={() => {
//                                       // if (!wabaState.selected) {
//                                       //   toast.error("Please select WABA");
//                                       //   return;
//                                       // }
//                                       if (btnLabel === "Configure")
//                                         handleConfigure(card.type);
//                                       else if (btnLabel === "Configure Time")
//                                         setWorkingHoursDialog(true);
//                                     }}
//                                   >
//                                     {btnLabel}
//                                   </Button>
//                                 </Tooltip>
//                               ))}
//                             </div>
//                           </div>
//                         </>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center p-5 2xl:p-25">
//                     <AnimatePresence>
//                       <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 30 }}
//                         transition={{ duration: 0.3 }}
//                         className="border-3 p-8 border-indigo-200 rounded-2xl border-dashed shadow-2xl"
//                       >
//                         <motion.div
//                           animate={{ y: [0, -10, 0] }}
//                           transition={{ repeat: Infinity, duration: 1.2 }}
//                           className="mb-2 flex items-center justify-center"
//                         >
//                           <FaHandPointDown
//                             className="text-5xl text-indigo-400"
//                             style={{ transform: "rotate(180deg)" }}
//                           />
//                         </motion.div>
//                         <h3 className="text-xl font-semibold text-green-800 mb-2">
//                           Please select a WABA account
//                         </h3>
//                         <p className="text-gray-500 text-center max-w-xs text-sm">
//                           Choose a WABA from the dropdown above to view blocked
//                           users.
//                         </p>
//                       </motion.div>
//                     </AnimatePresence>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <Dialog
//               header={`Working Hours - ${selectedAgentName}`}
//               visible={workingHoursDialog}
//               onHide={() => setWorkingHoursDialog(false)}
//               className="w-[40rem]"
//               draggable={false}
//             // onClick={handleWorkingSave}
//             >
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <div className="space-y-2">
//                   {/* If working hours are not assigned, show a message + Assign Now button */}
//                   {Object.keys(workingHours).length === 0 ? (
//                     <div className="flex flex-col items-center justify-center text-gray-500 text-lg space-y-5 mt-5">
//                       <p>{selectedAgentName} has not assigned working hours</p>
//                       <button
//                         className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer text-[1rem]"
//                         onClick={() =>
//                           setWorkingHours({
//                             Monday: { enabled: false, start: null, end: null },
//                             Tuesday: { enabled: false, start: null, end: null },
//                             Wednesday: {
//                               enabled: false,
//                               start: null,
//                               end: null,
//                             },
//                             Thursday: {
//                               enabled: false,
//                               start: null,
//                               end: null,
//                             },
//                             Friday: { enabled: false, start: null, end: null },
//                             Saturday: {
//                               enabled: false,
//                               start: null,
//                               end: null,
//                             },
//                             Sunday: { enabled: false, start: null, end: null },
//                           })
//                         }
//                       >
//                         Assign Now
//                       </button>
//                     </div>
//                   ) : (
//                     Object.keys(workingHours).map((day, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center flex-wrap justify-between bg-white shadow-md gap-2 p-2 rounded-lg"
//                       >
//                         {/* Toggle Open/Closed */}
//                         <div className="flex items-center space-x-2">
//                           <Switch
//                             sx={{
//                               "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
//                               {
//                                 backgroundColor: "#34C759",
//                               },
//                               "& .MuiSwitch-switchBase.Mui-checked": {
//                                 color: "#34C759",
//                               },
//                             }}
//                             checked={workingHours[day].enabled}
//                             onChange={() =>
//                               setWorkingHours((prev) => ({
//                                 ...prev,
//                                 [day]: {
//                                   ...prev[day],
//                                   enabled: !prev[day].enabled,
//                                 },
//                               }))
//                             }
//                           />
//                           <span className="font-semibold text-blue-600 text-sm">
//                             {day}
//                           </span>
//                         </div>

//                         {/* Time Inputs when Enabled */}
//                         {workingHours[day].enabled ? (
//                           <div className="flex gap-2">
//                             <TimePicker
//                               value={workingHours[day].start}
//                               onChange={(newTime) =>
//                                 setWorkingHours((prev) => ({
//                                   ...prev,
//                                   [day]: { ...prev[day], start: newTime },
//                                 }))
//                               }
//                               ampm
//                               className="w-35 text-xs"
//                             />
//                             <TimePicker
//                               value={workingHours[day].end}
//                               onChange={(newTime) =>
//                                 setWorkingHours((prev) => ({
//                                   ...prev,
//                                   [day]: { ...prev[day], end: newTime },
//                                 }))
//                               }
//                               ampm
//                               className="w-35 text-xs"
//                             />
//                           </div>
//                         ) : (
//                           <div className="w-10 flex p-2 pr-10 justify-center items-center">
//                             <span className="text-gray-400 text-sm font-semibold">
//                               Closed
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}

//                   {/*  Show Save Button only if there are working hours to update */}
//                   {Object.keys(workingHours).length !== 0 && (
//                     <div className="flex justify-center mt-4">
//                       <UniversalButton
//                         label="Save"
//                         id="workingHoursSave"
//                         name="workingHoursSave"
//                         onClick={handleWorkingSave}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </LocalizationProvider>
//             </Dialog>

//             {configureState?.open && (
//               <ConfigureDialog
//                 configureState={configureState}
//                 setconfigureState={setConfigureState}
//                 setBasicDetails={setBasicDetails}
//                 basicDetails={basicDetails}
//                 handleSave={handleSave}
//                 allTemplates={allTemplates}
//                 specificTemplate={specificTemplate}
//                 variablesData={variablesData}
//                 setVariablesData={setVariablesData}
//                 fileRef={fileRef}
//                 setSpecificTemplate={setSpecificTemplate}
//                 handle15MinTime={handle15MinTime}
//                 fileData={fileData}
//                 setFileData={setFileData}
//               />
//             )}
//           </div>
//         </div>

//       ) : (
//         <div className="flex flex-col items-center justify-center h-full border border-gray-100 rounded-[2rem] bg-white shadow-inner relative overflow-hidden">
//           {/* Subtle Top Accent */}
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#25D366] via-[#20c997] to-[#128C7E] opacity-70"></div>

//           <div className="relative group">
//             {/* WhatsApp Gradient Glow */}
//             <div className="absolute -inset-1 bg-gradient-to-tr from-[#25D366] via-[#20c997] to-[#128C7E] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

//             <div className="relative p-6 bg-white rounded-full shadow-xl mb-6 border border-gray-50">
//               <FaWhatsapp className="text-5xl text-[#25D366]" />
//             </div>
//           </div>

//           <div className="text-center px-6">
//             <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
//               Connect Your WhatsApp Account
//             </h3>
//             <p className="text-gray-500 max-w-sm mx-auto mt-3 leading-relaxed">
//               Select a WhatsApp Business (WABA) account from the dropdown above to start
//               configuring{" "}
//               <span className="font-semibold text-gray-700">
//                 Automation, Agent Settings, Block User
//               </span>{" "}
//               and{" "}
//               <span className="font-semibold text-gray-700">
//                 Unsubscribe Report.
//               </span>
//             </p>
//           </div>

//           {/* Visual Cue */}
//           <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#25D366] animate-bounce">
//             <div className="w-1 h-1 rounded-full bg-[#25D366]"></div>
//             Waiting for selection
//             <div className="w-1 h-1 rounded-full bg-[#25D366]"></div>
//           </div>
//         </div>
//       )}
//     </div>

//   );
// };

// export default WhatsappLiveChatSettings;

//========================== Please don't remove above code ==========================================

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Tooltip,
  Chip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Switch } from "@mui/material";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { RadioButton } from "primereact/radiobutton";

// ICONS
import TagIcon from "@mui/icons-material/Tag";
import EmailIcon from "@mui/icons-material/Email";
import InventoryIcon from "@mui/icons-material/Inventory";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  BiMessageSquareDetail,
  BiCog,
  BiUserCircle,
  BiChevronRight,
} from "react-icons/bi";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { AiOutlineRobot } from "react-icons/ai";
import { FaHandPointDown, FaWhatsapp } from "react-icons/fa";
import StorageIcon from "@mui/icons-material/Storage";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { CgUnblock } from "react-icons/cg";
import {
  FiMessageSquare,
  FiClock,
  FiUserCheck,
  FiAlertCircle,
  FiEdit3,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

// APIS
import {
  deleteAutoAction,
  fetchTemplates,
  fetchTemplatesValue,
  getAutoAction,
  getWabaList,
  saveAutoAction,
  getWabaTemplateDetails,
  getTemplateDetialsById,
} from "@/apis/whatsapp/whatsapp";
import { deleteblockUser, getblockUser } from "@/apis/whatsapp/whatsapp";
import { getAgentList } from "@/apis/Agent/Agent";

// COMPONENTS
import UniversalButton from "../components/UniversalButton";
import CustomTooltip from "../components/CustomTooltip";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import InputField from "../components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { Preview } from "./components/preview";
import { Variables } from "./components/Variable";
import { Card } from "@material-tailwind/react";

const WhatsappLiveChatSettings = ({ selectedWabaUser }) => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [allWaba, setAllWaba] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isBlocking, setIsBlocking] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: null,
  });
  const [loadingConfigs, setLoadingConfigs] = useState(false);

  const [fileData, setFileData] = useState({
    url: "",
    file: "",
  });

  // chat setting
  const [selectedName, setSelectedName] = useState("");
  const [selectedAgentName, setSelectedAgentName] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [workingHoursDialog, setWorkingHoursDialog] = useState(false);
  const [workingHours, setWorkingHours] = useState({
    Monday: {
      enabled: false,
      start: null,
      end: null,
    },
    Tuesday: {
      enabled: false,
      start: null,
      end: null,
    },
    Wednesday: {
      enabled: false,
      start: null,
      end: null,
    },
    Thursday: {
      enabled: false,
      start: null,
      end: null,
    },
    Friday: {
      enabled: false,
      start: null,
      end: null,
    },
    Saturday: {
      enabled: false,
      start: null,
      end: null,
    },
    Sunday: {
      enabled: false,
      start: null,
      end: null,
    },
  });
  const [isWorkingHoursEnabled, setIsWorkingHoursEnabled] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const [selectedTemplateData, setSelectedTemplateData] = useState([]);
  const [templateDataNew, setTemplateDataNew] = useState(null);

  // new states for live chat configuration
  const [formData, setFormData] = useState({});
  const [inputValues, setInputValues] = useState(null);
  const [cardIndex, setCardIndex] = useState(null);
  const [showAgentCheckBox, setShowAgentCheckBox] = useState(false);

  // new states for live chat configuration

  const [wabaState, setWabaState] = useState({
    waba: [],
    selected: "",
  });

  const [cardDetails, setCardDetails] = useState({});
  const [configureState, setConfigureState] = useState({
    type: "",
    open: false,
  });

  const [basicDetails, setBasicDetails] = useState({
    sendMsgCheckbox: true,
    msgType: "1",
    message: "",
    filePath: "",
    tempJson: "",
    mediaPath: "",
  });

  // const [allTemplates, setAllTemplates] = useState([]);
  const [specificTemplate, setSpecificTemplate] = useState({});
  const [variablesData, setVariablesData] = useState({
    length: 0,
    data: [],
    input: [],
    btn: [],
    btnInput: [],
  });

  console.log("variablesData", variablesData);

  const [agent, setallAgents] = useState([]);

  const [minuteInput, setMinuteInput] = useState("");
  const [lastSetMinute, setLastSetMinute] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [inactiveNoOfDays, setInactiveNoOfDays] = useState("");

  const fetchTemplateDetails = async (wabaNumber) => {
    try {
      const response = await getWabaTemplateDetails(wabaNumber, 0);
      if (response) {
        setTemplateList(response);
        // const approvedTemplateList = response.filter((template) => template.status === "APPROVED");
        // setTemplateOptions(
        //   approvedTemplateList.map((template) => ({
        //     value: template.vendorTemplateId,
        //     label: template.templateName,
        //   }))
        const approvedTemplateList = response.filter(
          (template) => template.status === "APPROVED",
        );
        setTemplateOptions(approvedTemplateList);
      } else {
        toast.error("Failed to load templates!");
      }
    } catch (error) {
      toast.error("Error fetching template details.");
    }
  };

  useEffect(() => {
    if (selectedWabaUser?.mobileNo) {
      fetchTemplateDetails(selectedWabaUser.mobileNo);
    }
  }, [selectedWabaUser]);

  const fetchTemplateData = async (selectedTemplate) => {
    if (!selectedTemplate || !selectedWabaUser) return;

    setIsFetching(true);
    try {
      const response = await getTemplateDetialsById(selectedTemplate);

      if (!response) {
        toast.error("Failed to load template data!");
        return;
      }

      setTemplateDataNew(response);

      /* ---------------- BODY VARIABLES ---------------- */
      const bodyComponent = response?.components?.find(
        (comp) => comp.type === "BODY",
      );

      let variables = [];
      if (bodyComponent?.text) {
        const matches = bodyComponent.text.match(/{{\d+}}/g) || [];
        variables = [...new Set(matches)].map((item) => ({
          key: Number(item.replace(/[{}]/g, "")),
          value: "",
        }));
      }
      setVariablesData(variables);

      /* ---------------- HEADER MEDIA ---------------- */
      const headerComponent = response?.components?.find(
        (comp) => comp.type === "HEADER",
      );

      let specificTemplate = { type: "TEXT" };
      let mediaPath = "";
      let newCardIndex = -1;

      if (headerComponent) {
        mediaPath = headerComponent.example?.header_handle?.[0] || "";

        switch (headerComponent.format) {
          case "IMAGE":
            specificTemplate = {
              templateType: "IMAGE",
              mediaUrl: mediaPath,
            };
            newCardIndex = 0;
            break;

          case "VIDEO":
            specificTemplate = {
              templateType: "VIDEO",
              mediaUrl: mediaPath,
            };
            newCardIndex = 1;
            break;

          case "DOCUMENT":
            specificTemplate = {
              templateType: "DOCUMENT",
              mediaUrl: mediaPath,
              fileName: headerComponent.example?.header_text?.[0] || "Document",
            };
            newCardIndex = 2;
            break;

          default:
            specificTemplate = { type: "TEXT", url: "" };
            newCardIndex = -1;
        }

        // Prefill uploaded media
        setFileData({
          url: mediaPath,
          file: null,
        });

        // Sync parent payload
        // setBasicDetails((prev) => ({
        //   ...prev,
        //   mediaPath,
        // }));
      }

      // Set media card index
      setCardIndex(newCardIndex);

      // Set template meta
      setSpecificTemplate(specificTemplate);
    } catch (error) {
      console.error("Error fetching template data:", error);
      toast.error("Error fetching template data.");
    } finally {
      setIsFetching(false);
    }
  };

  const fetchTemplateDataAgain = async (selectedTemplate) => {
    if (!selectedTemplate || !selectedWabaUser) return;

    setIsFetching(true);
    try {
      const response = await getTemplateDetialsById(selectedTemplate);

      if (!response) {
        toast.error("Failed to load template data!");
        return;
      }

      setTemplateDataNew(response);

      /* ---------------- BODY VARIABLES ---------------- */
      const bodyComponent = response?.components?.find(
        (comp) => comp.type === "BODY",
      );

      /* ---------------- HEADER MEDIA ---------------- */
      const headerComponent = response?.components?.find(
        (comp) => comp.type === "HEADER",
      );

      let specificTemplate = { type: "TEXT" };
      let mediaPath = "";
      let newCardIndex = -1;

      if (headerComponent) {
        mediaPath = headerComponent.example?.header_handle?.[0] || "";

        switch (headerComponent.format) {
          case "IMAGE":
            specificTemplate = {
              templateType: "IMAGE",
              mediaUrl: mediaPath,
            };
            newCardIndex = 0;
            break;

          case "VIDEO":
            specificTemplate = {
              templateType: "VIDEO",
              mediaUrl: mediaPath,
            };
            newCardIndex = 1;
            break;

          case "DOCUMENT":
            specificTemplate = {
              templateType: "DOCUMENT",
              mediaUrl: mediaPath,
              fileName: headerComponent.example?.header_text?.[0] || "Document",
            };
            newCardIndex = 2;
            break;

          default:
            specificTemplate = { type: "TEXT", url: "" };
            newCardIndex = -1;
        }

        // Prefill uploaded media
        // setFileData({
        //   url: mediaPath,
        //   file: null,
        // });

        // Sync parent payload
        // setBasicDetails((prev) => ({
        //   ...prev,
        //   mediaPath,
        // }));
      }

      // Set media card index
      setCardIndex(newCardIndex);

      // Set template meta
      setSpecificTemplate(specificTemplate);
    } catch (error) {
      console.error("Error fetching template data:", error);
      toast.error("Error fetching template data.");
    } finally {
      setIsFetching(false);
    }
  };

  // useEffect(() => {
  //   if (
  //     selectedTemplate?.length > 0 &&
  //     selectedWabaUser?.wabaSrno &&
  //     selectedWabaUser?.mobileNo
  //   ) {
  //     fetchTemplateData();
  //   }
  // }, [selectedTemplate, selectedWabaUser]);

  const templateLiveOptions = [
    // { value: null, label: "Please select a template", disabled: true, hidden: true },
    ...(templateOptions?.map((template) => ({
      value: template.vendorTemplateId,
      label: template.templateName,
    })) || []),
  ];

  useEffect(() => {
    if (!selectedTemplate || !templateOptions?.length) return;

    const data = templateOptions.find(
      (template) => template.vendorTemplateId === selectedTemplate,
    );

    setSelectedTemplateData(data || null);
  }, [selectedTemplate, templateOptions]);

  useEffect(() => {
    async function handleFetchAgents() {
      try {
        const res = await getAgentList();
        const data = res?.data?.map((agent) => ({
          value: agent?.sr_no,
          label: agent?.name,
        }));
        setallAgents(data);
      } catch (e) {
        console.log("Error fetching agents:", e);
        toast.error("Error Fetching Agents");
      }
    }

    handleFetchAgents();
  }, []);

  const fileRef = useRef(null);

  useEffect(() => {
    async function handleFetchWaba() {
      try {
        const res = await getWabaList();
        setWabaState((prev) => ({
          waba: res,
          selected: "",
        }));
      } catch (e) {
        return toast.error("Error fetching Waba Details");
      }
    }

    handleFetchWaba();
  }, []);

  // async function handleGetAutoAction() {
  //   // if (!wabaState.selected) return;
  //   try {
  //     const data = {
  //       wabaNumber: selectedWabaUser?.mobileNo,
  //       type: "-1",
  //     };
  //     const res = await getAutoAction(data);
  //     res?.EntityMstActionScenerio &&
  //       res.EntityMstActionScenerio.map(async (item) => {
  //         data["type"] = item.actionScenario;
  //         const res = await getAutoAction(data);
  //         setCardDetails((prev) => ({
  //           ...prev,
  //           [item.actionScenario]: res,
  //         }));
  //       });
  //   } catch (e) {
  //     return toast.error("Error fetching auto action");
  //   }
  // }

  async function handleGetAutoAction() {
    if (!selectedWabaUser?.mobileNo) return;
    setLoadingConfigs(true);

    try {
      const data = {
        wabaNumber: selectedWabaUser?.mobileNo,
        type: "-1",
      };

      const res = await getAutoAction(data);

      if (res?.EntityMstActionScenerio) {
        const updatedDetails = {};

        const detailPromises = res.EntityMstActionScenerio.map(async (item) => {
          const specificRes = await getAutoAction({
            ...data,
            type: item.actionScenario
          });
          updatedDetails[item.actionScenario] = specificRes;
        });

        await Promise.all(detailPromises);

        setCardDetails(updatedDetails);
      } else {
        setCardDetails({});
      }
    } catch (e) {
      console.error("Error fetching auto action:", e);
      toast.error("Error updating configuration buttons");
      setCardDetails({});
    } finally {
      setLoadingConfigs(false); 
    }
  }

  // async function handleFetchAllTemplates() {
  //   try {
  //     const body = { officialWhatsappSrno: selectedWabaUser?.wabaSrno };
  //     const res = await fetchTemplates(body);

  //     const temps = Object.keys(res).map((key) => ({
  //       value: key,
  //       label: res[key],
  //     }));

  //     setAllTemplates(temps);
  //   } catch (e) {
  //     return toast.error("Error fetching all templates");
  //   }
  // }

  // useEffect(() => {
  //   handleGetAutoAction();
  // }, [selectedWabaUser?.mobileNo]);

  useEffect(() => {
    // 1. Clear previous account details so buttons reset to "Configure Now"
    setCardDetails({});

    // 2. Fetch new details if a user is selected
    if (selectedWabaUser?.mobileNo) {
      handleGetAutoAction();
    }
  }, [selectedWabaUser?.mobileNo, selectedWabaUser?.wabaSrno]);

  function extractVariablesFromText(text) {
    const regex = /{{(\d+)}}/g;
    let match;
    const variables = [];
    while ((match = regex.exec(text)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    return variables;
  }

  const extractVariablesFromTemplate = (data) => {
    const variables = [];
    let mediaUrl = "";
    let templateType = "";

    console.log("data", data);

    data?.template?.components?.forEach((component) => {
      if (component?.type === "BODY") {
        component?.parameters?.forEach((param, index) => {
          if (param?.type === "text") {
            variables.push({
              key: `${index + 1}`,
              value: param.text || "",
            });
          }
        });
      }

      // HEADER image
      if (component.type === "HEADER") {
        component?.parameters?.forEach((param) => {
          if (param.type === "image" && param.image?.link) {
            mediaUrl = param.image.link;
            templateType = param.type.toUpperCase();
          }
        });
      }
    });

    // Set states
    setVariablesData(variables);
    setSpecificTemplate({
      mediaUrl,
      templateType,
    });

    // Optional return if needed
    return { variables, mediaUrl, templateType };
  };

  function handleConfigure(type) {
    const cardTypeDetails = cardDetails[type];

    // const parseTime = (time) => (time && dayjs(time, "hh:mm:ss"));
    const parseTime = (time) => {
      if (!time) return null;
      return dayjs(`1970-01-01 ${time}`, "YYYY-MM-DD HH:mm:ss");
    };

    const dayMap = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };

    if (cardTypeDetails?.agentTiming?.length > 0) {
      setWorkingHours((prev) => {
        const updated = { ...prev };

        cardTypeDetails?.agentTiming?.forEach((item) => {
          const dayName = dayMap[item.day];
          if (!dayName) return;

          updated[dayName] = {
            enabled: item.status === 1,
            start: parseTime(item?.fromTime),
            end: parseTime(item?.toTime),
          };
        });

        return updated;
      });
    }

    const selectedDays =
      cardTypeDetails?.agentTiming?.map((item) => item.day) || [];

    setInactiveNoOfDays(
      [1, 2, 3, 4, 5, 6, 7].filter((day) => !selectedDays.includes(day)),
    );

    let tempId = null;
    const parsedJson =
      cardTypeDetails &&
        Object.keys(cardTypeDetails).length > 0 &&
        cardTypeDetails?.tempJson
        ? JSON.parse(cardTypeDetails.tempJson)
        : null;

    const cardTypeDetailsTempJson = parsedJson;

    console.log("cardTypeDetailsTempJson", cardTypeDetailsTempJson);

    extractVariablesFromTemplate(cardTypeDetailsTempJson);

    const selectedTemplate = templateLiveOptions?.find(
      (temp) => temp?.label === cardTypeDetailsTempJson?.template?.name,
    );

    if (selectedTemplate?.value) {
      fetchTemplateDataAgain(selectedTemplate?.value);
    }

    const cards =
      cardTypeDetailsTempJson?.template?.components?.[0]?.cards || [];

    const imageArray = cards.map((card) => ({
      url: card?.components?.[0]?.parameters?.[0]?.image?.link || "",
      file: card?.components?.[0]?.parameters?.[0]?.image?.link || "",
    }));

    setFileData(imageArray);

    const buttonUrlVar = cardTypeDetailsTempJson?.template?.components?.find(
      (comp) => comp.type === "button" && comp.sub_type === "url",
    )?.parameters?.[0]?.text;

    setBasicDetails((prev) => ({
      ...prev,
      sendMsgCheckbox: true,
      msgType: cardTypeDetailsTempJson?.type === "text" ? "1" : "2",
      message: cardTypeDetailsTempJson?.text?.body,
      filePath: cardTypeDetails?.filePath,
      tempJson: cardTypeDetails?.tempJson,
      // mediaPath:
      //   cardTypeDetailsTempJson?.template?.components[0]?.parameters[0]?.image
      //     ?.link,
      timeout: cardTypeDetails?.timeout || 0,
      template: selectedTemplate?.value ?? null,
      agent: cardTypeDetails?.agent,
      buttonUrlVar: buttonUrlVar,
    }));

    setConfigureState({
      type,
      open: true,
    });
  }

  async function deleteAction(type) {
    try {
      const data = {
        wabaNumber: selectedWabaUser?.mobileNo,
        type,
        wabaSrno: selectedWabaUser?.wabaSrno,
      };
      const res = await deleteAutoAction(data);
      setCardDetails({
        ...cardDetails,
        [type]: "",
      });
      await handleGetAutoAction();
    } catch (e) {
      toast.error("Something went wrong");
      return;
    }
  }

  const getMediaType = (url = "") => {
    const ext = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
    if (["mp4", "mov", "avi", "webm"].includes(ext)) return "video";
    if (["pdf", "doc", "docx", "xls", "xlsx"].includes(ext)) return "document";

    return null;
  };

  async function handleAutoAction(actionType, payload = {}) {
    if (basicDetails.msgType === "2" && !basicDetails.template) {
      toast.error("Select the template");
      return;
    }

    // if (
    //   basicDetails.msgType === "2" &&
    //   variablesData?.some((v) => v.value === "")
    // ) {
    //   toast.error("Fill the fields");
    //   return;
    // }

    const buttonUrlData = templateDataNew?.components?.find(
      (comp) => comp.type === "BUTTONS",
    );

    const otpValue = buttonUrlData?.buttons?.find((btn) => btn.type === "URL")
      ?.values?.["{{1}}"];

    if (buttonUrlData?.buttons[0].value === "") {
      toast.error("Fill the input field");
    }

    try {
      let successMsg = "Data saved successfully";

      /* =======================
       BASE PAYLOAD
    ======================== */
      let data = {
        actionSenario: actionType,
        wabaNumber: selectedWabaUser?.mobileNo,
        wabaSrno: selectedWabaUser?.wabaSrno,
        sendMsgCheckbox: true,
      };

      const dayMap = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const inactiveTimeArray = [];
      const noDaysSelected = [];

      dayMap.forEach((day, idx) => {
        const wh = workingHours[day];
        if (wh?.enabled) {
          inactiveTimeArray.push({
            status: 1,
            fromTime: wh.start?.format("HH:mm") || "",
            toTime: wh.end?.format("HH:mm") || "",
            day: idx + 1,
          });
        } else {
          noDaysSelected.push(idx + 1);
        }
      });

      /* =======================
       CONFIGURE AUTO ACTION
    ======================== */
      if (actionType === configureState.type) {
        // validations
        if (basicDetails.msgType === "1" && !basicDetails.message)
          return toast.error("Please enter message");

        if (basicDetails.msgType === "2" && !basicDetails.template)
          return toast.error("Please select template");

        if (basicDetails.msgType === "2" && variablesData?.length > 0) {
          const filled = variablesData.filter(Boolean).length;
          if (filled !== variablesData.length)
            return toast.error("Please fill all variables");
        }

        /* =======================
         VARIABLE REPLACEMENT
      ======================== */

        let updatedTemplate = { ...specificTemplate };

        if (basicDetails.msgType === "2" && variablesData?.length > 0) {
          updatedTemplate.message = specificTemplate?.message?.replace(
            /{{(\d+)}}/g,
            (_, i) => variablesData.input[i - 1] || "",
          );

          updatedTemplate.urlValue = specificTemplate?.url?.replace(
            /{{(\d+)}}/g,
            (_, i) => variablesData.btnInput[i - 1] || "",
          );
        }

        const carouselMediaData = templateDataNew?.components?.find(
          (comp) => comp.type === "CAROUSEL",
        );

        console.log("carouselMediaData", carouselMediaData);

        const isUrlButton = buttonUrlData?.buttons?.some(
          (btn) => btn.type === "URL" && /\{\{\d+\}\}/.test(btn.url),
        );

        const mediaType = getMediaType(basicDetails.mediaPath);

        const {
          template,
          msgType,
          message,
          buttonUrlVar,
          mediaPath,
          ...restbasicDetails
        } = basicDetails || {};

        data = {
          ...data,
          ...restbasicDetails,

          // force override
          // message: basicDetails.message,
          // tempJson: basicDetails.tempJson,
          messageEntity: cardDetails?.["welcome_message"]?.messageEntity
            ? String(cardDetails?.["welcome_message"]?.messageEntity)
            : "0",
          noDaysSelectedArray: "",
          inactiveTimeArray: [],
          tempJson: JSON.stringify({
            ...(basicDetails?.msgType === "2"
              ? {
                template: {
                  components: [
                    ...(basicDetails.mediaPath
                      ? [
                        {
                          type: "HEADER",
                          parameters: [
                            {
                              type: mediaType,
                              [mediaType]: {
                                link: basicDetails.mediaPath,
                              },
                            },
                          ],
                        },
                      ]
                      : []),
                    ...(carouselMediaData
                      ? [
                        {
                          type: "CAROUSEL",
                          cards:
                            carouselMediaData?.cards
                              ?.map((card, index) => {
                                const header = card.components?.find(
                                  (c) => c.type === "HEADER",
                                );

                                if (!header) return null;

                                const format = header.format?.toLowerCase(); // image | video | document

                                return {
                                  card_index: index,
                                  components: [
                                    {
                                      type: "HEADER",
                                      parameters: [
                                        {
                                          type: format,
                                          [format]: {
                                            link:
                                              header?.example
                                                ?.header_handle?.[0] || "",
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                };
                              })
                              .filter(Boolean) || [],
                        },
                      ]
                      : []),

                    ...(variablesData?.length
                      ? [
                        {
                          type: "BODY",
                          parameters: variablesData.map((item) => ({
                            text: item.value,
                            type: "text",
                          })),
                        },
                      ]
                      : []),

                    ...(isUrlButton
                      ? [
                        {
                          sub_type: "url",
                          index: 0,
                          type: "button",
                          parameters: [
                            {
                              text: otpValue,
                              type: "text",
                            },
                          ],
                        },
                      ]
                      : []),
                  ],
                  name: templateDataNew.name,
                  language: {
                    code: templateDataNew.language,
                    policy: "deterministic",
                  },
                },
              }
              : {}),

            ...(basicDetails?.msgType === "1"
              ? {
                text: {
                  preview_url: true,
                  body: basicDetails.message,
                },
              }
              : {}),
            to: "{{ToMobile}}",
            type: basicDetails?.msgType === "1" ? "text" : "template",
            messaging_product: "whatsapp",
          }),

          // conditionally add / override keys
          ...(actionType === "15_minutes_message" && {
            messageEntity: cardDetails?.["15_minutes_message"]?.messageEntity
              ? String(cardDetails?.["15_minutes_message"]?.messageEntity)
              : "0",
          }),

          ...(actionType === "agent_assign_message" && {
            agent: showAgentCheckBox ? basicDetails.agent : -1,
            assignAgentCheckbox: showAgentCheckBox,
            agentEntity: "",
            messageEntity: cardDetails?.["agent_assign_message"]?.messageEntity
              ? String(cardDetails?.["agent_assign_message"]?.messageEntity)
              : "0",
          }),

          ...(actionType === "inactive_agent_timing"
            ? {
              messageEntity: cardDetails?.["inactive_agent_timing"]
                ?.messageEntity
                ? String(
                  cardDetails?.["inactive_agent_timing"]?.messageEntity,
                )
                : "0",

              inactiveTimeArray,
              noDaysSelectedArray: String(inactiveNoOfDays),
            }
            : {}),
        };
      }

      //  SAVE API CALL

      const res = await saveAutoAction(data);
      if (res?.status === true) {
        toast.success(successMsg);
      } else {
        toast.error(res?.msg);
        return;
      }

      //  POST SUCCESS CLEANUP

      if (actionType === configureState.type) {
        setCardDetails((prev) => ({
          ...prev,
          [configureState.type]: "",
        }));

        setConfigureState({ type: "", open: false });

        setBasicDetails({
          sendMsgCheckbox: true,
          msgType: "1",
          message: "",
          filePath: "",
          tempJson: "",
          mediaPath: "",
        });

        setVariablesData({
          length: 0,
          data: [],
          input: [],
          btn: [],
          btnInput: [],
        });

        setSpecificTemplate({});
      }

      await handleGetAutoAction();
    } catch (e) {
      console.error("error", e);
      toast.error("Error saving data");
    }
  }

  const liveChatCards = [
    {
      id: 1,
      name: "Welcome Message",
      button: ["Configure"],
      desc: "Greets users automatically when they message for the first time. Helps create a quick and professional first response.",
      message: "",
      type: "welcome_message",
      tooltip:
        "“Hi! 👋 Thanks for reaching out. Our team will connect with you shortly.”",
      // icon: <FiMessageSquare size={24} className="text-blue-600" />,
      // color: "#2563eb",
      icon: <FiMessageSquare size={24} className="text-[#075e54]" />,
      color: "#075e54",
    },
    {
      id: 2,
      name: "Agent Inactive Timings",
      button: ["Configure", "Configure Time"],
      desc: "Sends a reply to the user’s first message received outside business hours. Useful for informing users about support timing.",
      message: "",
      type: "inactive_agent_timing",
      tooltip: (
        <>
          <div>
            <b>What it does:</b> Sends a one-time auto-reply to the user’s first
            message after business hours.
          </div>

          <div>
            <b>Example:</b> “Our team is unavailable now. We’ll reply during our
            shift, 10 AM–7 PM.”
          </div>
        </>
      ),
      // icon: <FiClock size={24} className="text-orange-600" />,
      // color: "#ea580c",
      icon: <FiClock size={24} className="text-[#075e54]" />,
      color: "#075e54",
    },
    {
      id: 3,
      name: "Agent-Change",
      button: ["Configure"],
      desc: "Sends an automated message when a chat is reassigned or the agent becomes inactive. Keeps the user informed during off-hours.",
      message: "",
      type: "agent_assign_message",
      tooltip: "“All agents are currently unavailable. We’ll reconnect soon.”",
      // icon: <FiUserCheck size={24} className="text-green-600" />,
      // color: "#16a34a",
      icon: <FiUserCheck size={24} className="text-[#075e54]" />,
      color: "#075e54",
    },
    {
      id: 4,
      name: "Agent No Response",
      button: ["Configure"],
      desc: "Activates auto-replies during agent off-shift times. Ensures customers receive a response even when no one is online.",
      message: "",
      type: "15_minutes_message",
      tooltip: (
        <>
          <div>
            <b>What it does:</b> Auto-replies when no agent is online based on
            shift time settings.
          </div>

          <div>
            <b>Example:</b> “No agents are online right now. We'll respond after
            10 AM.”
          </div>
        </>
      ),
      // icon: <FiAlertCircle size={24} className="text-purple-600" />,
      // color: "#9333ea",
      icon: <FiAlertCircle size={24} className="text-[#075e54]" />,
      color: "#075e54",
    },
  ];

  const deletingCardName =
    liveChatCards.find((card) => card.type === deleteConfirm.type)?.name ||
    "this configuration";

  return (
    <div className="p-2 bg-gray-50 rounded-md h-screen">
      {selectedWabaUser ? (
        <>
          <div className=" w-full bg-gray-50 overflow-scroll h-full">
            <div className="h-full overflow-y-auto px-2 md:px-4 pb-24 md:pb-50">
              {/* Heading */}
              <div className="text-center flex flex-col mb-5">
                <span className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Agent Settings
                </span>
                <span className="text-[#666]  text-sm text-center mb-2">
                  Configure and automate your WhatsApp experience for smoother
                  customer communication.
                </span>
              </div>

              {/* <div className=" h-auto p-0 md:p-5 ">
                  <div className=" flex flex-wrap justify-center items-center gap-10 pb-50 lg:pb-auto 2xl:pb-100">
                    {liveChatCards.map((card, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="relative flex w-90 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
                          >
                            <div className=" mx-3 mt-3 h-30 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white  shadow-blue-gray-500/40 bg-gradient-to-r from-green-100 to-green-50">
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                marginTop={4}
                              >
                                <Box display="flex" alignItems="center" gap={2}>
                                  <Box
                                    sx={{
                                      backgroundColor: "#25D3661A",
                                      p: 1.5,
                                      borderRadius: 2,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      marginLeft: 1,
                                    }}
                                  >
                                    <WhatsAppIcon
                                      sx={{ color: "#25D366", fontSize: 28 }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    color="#1f2937"
                                  >
                                    {card.name}
                                  </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1}>
                                  <Switch
                                    color="success"
                                    checked={
                                      cardDetails[card.type]?.messageEntity || 0
                                    }
                                    inputProps={{
                                      "aria-label": `${card.type}-toggle`,
                                    }}
                                    value={
                                      cardDetails[card.type]?.status || false
                                    }
                                    onClick={() => deleteAction(card.type)}
                                  />
                                </Box>
                              </Box>
                            </div>

                            <div className="p-3">
                              <p className="mb-2 flex font-sans text-sm  font-normal tracking-normal text-gray-600 antialiased">
                                {card.desc}
                                <CustomTooltip
                                  title={card.tooltip}
                                  placement="top"
                                  arrow
                                >
                                  <span className="">
                                    <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
                                  </span>
                                </CustomTooltip>
                              </p>
                              <div className="border border-gray-300 rounded-md p-2 bg-gray-100 h-50 overflow-scroll text-wrap">
                                <pre className="text-sm font-normal text-gray-600 text-wrap">
                                  {cardDetails[card.type]?.message ||
                                    "Hi! Thanks for connecting. Our team is unavailable right now. We'll be back at 10am tomorrow."}
                                </pre>
                              </div>
                            </div>

                            <div className="p-6 pt-0 flex flex-wrap justify-center items-center gap-2">
                              <Tooltip
                                key={index}
                                title="Click to configure"
                                arrow
                              >
                                <Button
                                  variant="contained"
                                  size="medium"
                                  sx={{
                                    mt: 1,
                                    alignSelf: "flex-start",
                                    backgroundColor: "#25D366",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    px: 3,
                                    ":hover": {
                                      backgroundColor: "#1ebc59",
                                    },
                                  }}
                                  onClick={() => {
                                    handleConfigure(card.type);
                                  }}
                                >
                                  Configure
                                </Button>
                              </Tooltip>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div> */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {liveChatCards.map((card, index) => {
                  const config = cardDetails[card.type];
                  const isActive = Boolean(config && config.tempJson);

                  if (loadingConfigs) {
                    return (
                      <Paper
                        key={`skeleton-${index}`}
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: "24px",
                          border: "1px solid #e5e7eb",
                          height: "350px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2
                        }}
                        className="animate-pulse" // Adds the shimmering effect
                      >
                        <div className="flex justify-between items-start">
                          <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                          <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="w-3/4 h-6 bg-gray-200 rounded-md mt-4"></div>
                        <div className="w-full h-4 bg-gray-100 rounded-md"></div>
                        <div className="w-full h-4 bg-gray-100 rounded-md"></div>
                        <div className="mt-auto w-full h-12 bg-gray-200 rounded-xl"></div>
                      </Paper>
                    );
                  }
                  return (
                    <div className="">
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: "24px",
                          border: "1px solid #e5e7eb",
                          backgroundColor: "#fff",
                          transition: "all 0.3s ease",
                          display: "flex",
                          flexDirection: "column",
                          height: "350px", // FIXED CARD HEIGHT
                          "&:hover": {
                            borderColor: card.color,
                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)",
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div
                            className="p-4 rounded-2xl"
                            style={{ backgroundColor: `${card.color}15` }}
                          >
                            {card.icon}
                          </div>

                          <div className="flex items-center">
                            {isActive ? (
                              <div
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm"
                                id="second"
                              >
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">
                                  Configured
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
                                <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
                                  Not Configured
                                </span>
                              </div>
                            )}
                          </div>

                          {/* <Chip
                            label={isActive ? "Configured" : "Not Set"}
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              backgroundColor: isActive ? "#ecfdf5" : "#f3f4f6",
                              color: isActive ? "#059669" : "#6b7280",
                              borderRadius: "8px",
                            }}
                          /> */}
                        </div>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 1, color: "#111827" }}
                        >
                          {card.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#4b5563",
                            mb: 3,
                            fontSize: "0.95rem",
                            lineHeight: 1.5,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3, // LIMITS TEXT TO 3 LINES
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {card.desc}
                        </Typography>
                        <div className="flex-grow"></div>
                        {/* <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-2xl p-4 mb-6 h-28 flex flex-col overflow-hidden">
                          <div className="flex items-center gap-2 mb-1">
                            <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}>
                              Current Content
                            </Typography>
                            <CustomTooltip title={card.tooltip}>
                              <span><AiOutlineInfoCircle size={14} className="text-gray-400 cursor-pointer" /></span>
                            </CustomTooltip>
                          </div>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isActive ? '#374151' : '#9ca3af',
                              fontStyle: isActive ? 'normal' : 'italic',
                              lineHeight: 1.4,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2, // LIMITS PREVIEW TO 2 LINES
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {isActive ? (config.message || "Template configuration active") : "No automated response currently active."}
                          </Typography>
                        </div> */}

                        <div className="flex gap-3" id="third">
                          {!isActive ? (
                            <>
                              <Button
                                variant="contained"
                                fullWidth
                                startIcon={<FiPlus />}
                                onClick={() => handleConfigure(card.type)}
                                sx={{
                                  backgroundColor: "#128c7e",
                                  color: "#fff",
                                  borderRadius: "12px",
                                  textTransform: "none",
                                  fontWeight: 600,
                                  py: 1.5,
                                  boxShadow: "none",
                                  "&:hover": {
                                    backgroundColor: "#128c7e",
                                    boxShadow: "none",
                                  },
                                }}
                              >
                                Configure Now
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<FiEdit3 />}
                                onClick={() => {
                                  handleConfigure(card.type);
                                }}
                                sx={{
                                  borderColor: "#e5e7eb",
                                  color: "#374151",
                                  borderRadius: "12px",
                                  textTransform: "none",
                                  fontWeight: 600,
                                  py: 1.5,

                                  "&:hover": {
                                    borderColor: "#111827",
                                    backgroundColor: "#f9fafb",
                                  },
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  minWidth: "56px",
                                  borderColor: "#fee2e2",
                                  color: "#ef4444",
                                  borderRadius: "12px",
                                  "&:hover": {
                                    backgroundColor: "#fef2f2",
                                    borderColor: "#ef4444",
                                  },
                                }}
                                onClick={() =>
                                  setDeleteConfirm({
                                    open: true,
                                    type: card.type,
                                  })
                                }
                              >
                                <FiTrash2 size={18} />
                              </Button>
                            </>
                          )}
                        </div>
                      </Paper>
                    </div>
                  );
                })}
              </div>
            </div>

            {configureState?.open && (
              <Dialog
                header="Configure"
                visible={configureState?.open}
                style={{ width: "60vw" }}
                onHide={() =>
                  setConfigureState((prev) => ({ open: false, type: "" }))
                }
                draggable={false}
              >
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex gap-2 items-center border p-2 rounded-md">
                      <RadioButton
                        inputId="templateMessage"
                        name="templateMessage"
                        value="2"
                        onChange={(e) => {
                          setBasicDetails((prev) => ({
                            ...prev,
                            msgType: e.value,
                            // message: "",
                          }));
                        }}
                        checked={basicDetails?.msgType === "2"}
                      />
                      <label htmlFor="templateMessage">Template</label>
                    </div>
                    <div className="flex gap-2 items-center border p-2 rounded-md">
                      <RadioButton
                        inputId="customMessage"
                        name="customMessage"
                        value="1"
                        onChange={(e) => {
                          setBasicDetails((prev) => ({
                            ...prev,
                            msgType: e.value,
                            mediaPath: "",
                            // template: "",
                          }));
                          setVariablesData({
                            length: 0,
                            data: [],
                            input: [],
                          });
                          setSpecificTemplate({});
                        }}
                        checked={basicDetails?.msgType === "1"}
                      />
                      <label htmlFor="customMessage">Custom</label>
                    </div>
                  </div>

                  {basicDetails?.msgType === "1" && (
                    <div className="mt-2">
                      <UniversalTextArea
                        label="Text Message"
                        id="textMessage"
                        name="textMessage"
                        placeholder={"Type something..."}
                        value={basicDetails?.message}
                        onChange={(e) => {
                          setBasicDetails((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }));
                        }}
                        className="w-full h-25 resize-none"
                      />
                    </div>
                  )}

                  {basicDetails?.msgType === "2" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      <div className="w-full">
                        <DropdownWithSearch
                          id="templateMessage"
                          name="templateMessage"
                          label="Select Template"
                          options={templateLiveOptions}
                          value={basicDetails.template ?? null}
                          onChange={(selected) => {
                            setSelectedTemplate(selected);
                            fetchTemplateData(selected);
                            setBasicDetails((prev) => ({
                              ...prev,
                              template: selected, // selected is the full {value,label} object
                            }));
                            setFileData({ url: "", file: "" });
                            setVariablesData({
                              length: 0,
                              data: [],
                              input: [],
                            });
                          }}
                          className="w-full"
                        />
                        {basicDetails?.template && (
                          <Variables
                            variablesData={variablesData}
                            setVariablesData={setVariablesData}
                            specificTemplate={specificTemplate}
                            fileRef={fileRef}
                            setBasicDetails={setBasicDetails}
                            fileData={fileData}
                            setFileData={setFileData}
                            onInputChange={(value, variable) =>
                              setFormData((prev) => ({
                                ...prev,
                                [variable]: value,
                              }))
                            }
                            setInputValues={setInputValues}
                            inputValues={inputValues}
                            templateDataNew={templateDataNew}
                            setTemplateDataNew={setTemplateDataNew}
                            cardIndex={cardIndex}
                            setCardIndex={setCardIndex}
                            selectedTemplateData={selectedTemplateData}
                            basicDetails={basicDetails}
                          />
                        )}
                      </div>
                      <div className="w-full">
                        <Preview
                          templateDataNew={templateDataNew}
                          specificTemplate={specificTemplate}
                          variablesData={variablesData}
                          basicDetails={basicDetails}
                          inputValues={inputValues}
                          fileData={fileData}
                          setFileData={setFileData}
                          fileRef={fileRef}
                          setCardIndex={setCardIndex}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    {configureState?.type === "agent_assign_message" && (
                      <>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="selectAgent"
                            checked={showAgentCheckBox}
                            onChange={(e) =>
                              setShowAgentCheckBox(e.target.checked)
                            }
                          />
                          <label
                            htmlFor="selectAgent"
                            className="text-sm cursor-pointer my-2 text-lg font-semibold"
                          >
                            Select an Agent
                          </label>
                        </div>

                        {showAgentCheckBox && (
                          <div>
                            <DropdownWithSearch
                              id="agent"
                              name="agent"
                              options={agent}
                              onChange={(e) => {
                                setBasicDetails((prev) => ({
                                  ...prev,
                                  agent: e,
                                }));
                              }}
                              value={basicDetails?.agent}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {configureState?.type === "15_minutes_message" && (
                    <div className="shadom-md p-3 bg-gray-100 rounded-md w-full flex flex-row gap-5">
                      <div className="w-46">
                        <InputField
                          label="Set No Response Time: "
                          tooltipContent="Enter only minutes"
                          value={basicDetails.timeout}
                          onChange={(e) =>
                            setBasicDetails((prev) => ({
                              ...prev,
                              timeout: Number(e.target.value),
                            }))
                          }
                        />
                        {lastSetMinute && (
                          <div className="text-green-600 text-xs font-semibold mt-1">
                            Last set: {lastSetMinute} minutes
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {configureState?.type === "inactive_agent_timing" && (
                    <>
                      <h2 className="font-semibold">Assign Hours</h2>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="space-y-2">
                          {/* If working hours are not assigned, show a message + Assign Now button */}
                          {Object.keys(workingHours).map((day, index) => (
                            <div
                              key={index}
                              className="flex items-center flex-wrap justify-between bg-white shadow-md gap-2 p-2 rounded-lg"
                            >
                              {/* Toggle Open/Closed */}
                              <div className="flex items-center space-x-2">
                                <Switch
                                  sx={{
                                    "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                                    {
                                      backgroundColor: "#34C759",
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                      color: "#34C759",
                                    },
                                  }}
                                  checked={workingHours[day].enabled}
                                  onChange={() => {
                                    const isCurrentlyEnabled =
                                      workingHours[day].enabled;

                                    // Toggle workingHours
                                    setWorkingHours((prev) => ({
                                      ...prev,
                                      [day]: {
                                        ...prev[day],
                                        enabled: !prev[day].enabled,
                                      },
                                    }));

                                    // Only when user UNCHECKS
                                    if (isCurrentlyEnabled) {
                                      setInactiveNoOfDays((prev) =>
                                        prev.includes(index + 1)
                                          ? prev
                                          : [...prev, index + 1],
                                      );
                                    } else {
                                      // Optional: remove when checked again
                                      setInactiveNoOfDays((prev) =>
                                        prev.filter((d) => d !== index + 1),
                                      );
                                    }
                                  }}
                                />
                                <span className="font-semibold text-blue-600 text-sm">
                                  {day}
                                </span>
                              </div>

                              {/* Time Inputs when Enabled */}
                              {workingHours[day].enabled ? (
                                <div className="flex gap-2">
                                  <TimePicker
                                    value={workingHours[day].start}
                                    onChange={(newTime) =>
                                      setWorkingHours((prev) => ({
                                        ...prev,
                                        [day]: {
                                          ...prev[day],
                                          start: newTime,
                                        },
                                      }))
                                    }
                                    slotProps={{
                                      textField: {
                                        error: false,
                                        size: "small",
                                      },
                                    }}
                                    ampm
                                    className="w-35 text-xs"
                                  />
                                  <TimePicker
                                    value={workingHours[day].end}
                                    onChange={(newTime) =>
                                      setWorkingHours((prev) => ({
                                        ...prev,
                                        [day]: {
                                          ...prev[day],
                                          end: newTime,
                                        },
                                      }))
                                    }
                                    slotProps={{
                                      textField: {
                                        error: false,
                                        size: "small",
                                      },
                                    }}
                                    ampm
                                    className="w-35 text-xs"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 flex p-2 pr-10 justify-center items-center">
                                  <span className="text-gray-400 text-sm font-semibold">
                                    Closed
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </LocalizationProvider>
                    </>
                  )}

                  <div className="flex justify-center items-end h-full mt-4">
                    <UniversalButton
                      label="Save"
                      name="saveAction"
                      id="saveAction"
                      onClick={() => handleAutoAction(configureState?.type)}
                    />
                  </div>
                </div>
              </Dialog>
            )}

            <Dialog
              header={
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="text-red-500 text-base" />
                  <span className="font-semibold text-gray-900">
                    Delete configuration
                  </span>
                </div>
              }
              visible={deleteConfirm.open}
              style={{ width: "420px" }}
              onHide={() => setDeleteConfirm({ open: false, type: null })}
              draggable={false}
              closable
            >
              <div className="space-y-6">
                {/* Message */}
                <div className="text-sm text-gray-600 leading-relaxed">
                  Are you sure you want to delete the configuration for{" "}
                  <span className="font-medium text-gray-900">
                    {deletingCardName}
                  </span>
                  ?
                  <br />
                  <span className="text-gray-500">
                    This will permanently remove all related settings.
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() =>
                      setDeleteConfirm({ open: false, type: null })
                    }
                    className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg
                   border border-gray-300 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      deleteAction(deleteConfirm.type);
                      setDeleteConfirm({ open: false, type: null });
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 rounded-lg
                   border border-red-200 hover:bg-red-50 transition"
                  >
                    Delete configuration
                  </button>
                </div>
              </div>
            </Dialog>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full border border-gray-100 rounded-[2rem] bg-white shadow-inner relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#25D366] via-[#20c997] to-[#128C7E] opacity-70"></div>

          <div className="relative group">
            {/* WhatsApp Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#25D366] via-[#20c997] to-[#128C7E] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

            <div className="relative p-6 bg-white rounded-full shadow-xl mb-6 border border-gray-50">
              <FaWhatsapp className="text-5xl text-[#25D366]" />
            </div>
          </div>

          <div className="text-center px-6">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Connect Your WhatsApp Account
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-3 leading-relaxed">
              Select a WhatsApp Business (WABA) account from the dropdown above
              to start configuring{" "}
              <span className="font-semibold text-gray-700">
                Automation, Agent Settings,
              </span>{" "}
            </p>
          </div>

          {/* Visual Cue */}
          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#25D366] animate-bounce">
            <div className="w-1 h-1 rounded-full bg-[#25D366]"></div>
            Waiting for selection
            <div className="w-1 h-1 rounded-full bg-[#25D366]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappLiveChatSettings;
