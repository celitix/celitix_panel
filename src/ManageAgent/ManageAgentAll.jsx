// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import Checkbox from "@mui/material/Checkbox";

// // APIS
// import {
//   getWhatsappAgentList,
//   getRcsAgentList,
//   getInstagramAgentList,
//   assignWhatsappAgent,
//   assignInstagramAgent,
//   assignRcsAgent,
// } from "@/apis/Agent/Agent";
// import { getWabaList } from "@/apis/whatsapp/whatsapp.js";
// import { fetchAllAgents } from "@/apis/rcs/rcs.js";
// import { instaUserList } from "@/apis/instagram/Instagram.js";

// // COMPONENTS
// import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
// import UniversalButton from "@/components/common/UniversalButton";

// const ManageAgentAll = () => {
//   const [wabaList, setWabaList] = useState([]);
//   const [selectedWaba, setSelectedWaba] = useState("");
//   const [allAgents, setAllAgents] = useState([]);
//   const [selectedAgent, setSelectedAgent] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [userList, setUserList] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [agentList, setAgentList] = useState([]);
//   const [agentResponse, setAgentResponse] = useState([]);
//   const [checkedMap, setCheckedMap] = useState({});
//   const [rcsCheckedMap, setRcsCheckedMap] = useState({});
//   const [instaCheckedMap, setInstaCheckedMap] = useState({});
//   const [rcsAgentResponse, setRcsAgentResponse] = useState([]);
//   const [userResponseList, setUserResponseList] = useState([]);
//   const [activePlatform, setActivePlatform] = useState(null);
//   const [channelTab, setChannelTab] = useState("whatsapp");

//   const tabs = [
//     { name: "whatsapp", label: "Whatsapp" },
//     { name: "rcs", label: "Rcs" },
//     { name: "instagram", label: "Instagram" },
//   ];

//   // ====================================================================================== WHATSAPP WABA FUNCTIONS STARTS HERE ======================================================================================
//   // WABA LIST
//   useEffect(() => {
//     const fetchWabaList = async () => {
//       try {
//         setIsLoading(true);
//         const response = await getWabaList();

//         if (response) {
//           setWabaList(response);
//           console.log("wabaList: ", response);
//         } else {
//           console.error("Failed to fetch WABA details");
//           toast.error("Failed to load WABA details!");
//         }
//       } catch (error) {
//         console.error("Error fetching WABA list:", error);
//         toast.error("Error fetching WABA list.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchWabaList();
//   }, []);

//   const fetchWhatsappAgentList = async () => {
//     try {
//       const res = await getWhatsappAgentList(selectedWaba);

//       if (res?.success) {
//         setAgentResponse(res.data || []);
//       } else {
//         setAgentResponse([]);
//         toast.error("Failed to fetch agents");
//       }
//     } catch (error) {
//       console.log("error", error);
//       toast.error("Error fetching agent list");
//     }
//   };

//   useEffect(() => {
//     if (selectedWaba) {
//       fetchWhatsappAgentList();
//     }
//   }, [selectedWaba]);

//   // CHECKBOX FUNCTION
//   useEffect(() => {
//     if (!agentResponse?.length) return;

//     const map = {};
//     agentResponse.forEach((a) => {
//       map[a.srNo] = a.isAssigned === 1;
//     });

//     setCheckedMap(map);
//   }, [agentResponse]);

//   const handleSave = async () => {
//     try {
//       const agentSrNoList = Object.keys(checkedMap)
//         .filter((srNo) => checkedMap[srNo])
//         .map(Number);

//       const res = await assignWhatsappAgent({
//         wabaSrNo: Number(selectedWaba),
//         agentSrNoList,
//       });

//       if (res?.success) {
//         toast.success(res?.message || "Saved successfully");
//         // UPDATE isAssigned AFTER SAVE
//         setAgentResponse((prev) =>
//           prev.map((agent) => ({
//             ...agent,
//             isAssigned: checkedMap[agent.srNo] ? 1 : 0,
//           }))
//         );
//       } else {
//         toast.error(res?.message || "Save failed");
//       }
//     } catch (error) {
//       console.error("Assign Agent Error:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   // ====================================================================================== WHATSAPP WABA FUNCTIONS ENDS HERE ======================================================================================

//   // ======================================================================================  RCS AGENT FUNCTIONS STARTS HERE ======================================================================================

//   // RCS AGENT LIST
//   useEffect(() => {
//     async function handleFetchAllAgents() {
//       try {
//         const res = await fetchAllAgents(selectedAgent);
//         setAllAgents(res);
//         console.log(res, "RESPONSE");
//       } catch (e) {
//         toast.error("Something went wrong.");
//       }
//     }
//     handleFetchAllAgents();
//   }, []);

//   const fetchRcsAgentList = async () => {
//     try {
//       const res = await getRcsAgentList(selectedAgent);
//       if (res?.success) {
//         setRcsAgentResponse(res?.data || []);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedAgent) {
//       fetchRcsAgentList();
//     }
//   }, [selectedAgent]);

//   // CHECKBOX FUNCTION
//   useEffect(() => {
//     if (!rcsAgentResponse?.length) return;

//     const map = {};
//     rcsAgentResponse.forEach((a) => {
//       map[a.srNo] = a.isAssigned === 1;
//     });

//     setRcsCheckedMap(map);
//   }, [rcsAgentResponse]);

//   const handleRcsSave = async () => {
//     try {
//       const agentSrNoList = Object.keys(rcsCheckedMap)
//         .filter((srNo) => rcsCheckedMap[srNo])
//         .map(Number);

//       const res = await assignRcsAgent({
//         rcsAgentMstSrNo: Number(selectedAgent),
//         agentSrNoList,
//       });

//       if (res?.success) {
//         toast.success(res?.message || "Saved successfully");
//         // UPDATE isAssigned AFTER SAVE
//         setRcsAgentResponse((prev) =>
//           prev.map((agent) => ({
//             ...agent,
//             isAssigned: rcsCheckedMap[agent.srNo] ? 1 : 0,
//           }))
//         );
//       } else {
//         toast.error(res?.message || "Save failed");
//       }
//     } catch (error) {
//       console.error("Assign Agent Error:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   //  ==========================================================================  RCS AGENT FUNCTIONS ENDS HERE  ======================================================================================

//   // ===========================================================================   INSTAGRAMUSERLIST FUNCTIONS STARTS HERE ============================================================================
//   // INSTAGRAMUSERLIST
//   useEffect(() => {
//     const fetchInstaUserList = async () => {
//       try {
//         const res = await instaUserList();
//         setUserList(res?.data || []);
//         console.log("UserList :", res);
//       } catch (err) {
//         toast.error("Error fetching USER list.");
//       }
//     };
//     fetchInstaUserList();
//   }, []);

//   const fetchInstagramAgentList = async () => {
//     try {
//       const res = await getInstagramAgentList(selectedUser);

//       if (res?.success) {
//         setUserResponseList(res?.data || []);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedUser) {
//       fetchInstagramAgentList();
//     }
//   }, [selectedUser]);

//   // CHECKBOX FUNCTION

//   useEffect(() => {
//     if (!userResponseList?.length) return;

//     const map = {};
//     userResponseList.forEach((u) => {
//       map[u.srNo] = u.isAssigned === 1;
//     });

//     setInstaCheckedMap(map);
//   }, [userResponseList]);

//   const handleInstaSave = async () => {
//     try {
//       const agentSrNoList = Object.keys(instaCheckedMap)
//         .filter((srNo) => instaCheckedMap[srNo])
//         .map(Number);

//       const res = await assignInstagramAgent({
//         instaOffSrNo: Number(selectedUser),
//         agentSrNoList,
//       });

//       if (res?.success) {
//         toast.success(res?.message || "Saved successfully");
//         // UPDATE isAssigned AFTER SAVE
//         setUserResponseList((prev) =>
//           prev.map((user) => ({
//             ...user,
//             isAssigned: instaCheckedMap[user.srNo] ? 1 : 0,
//           }))
//         );
//       } else {
//         toast.error(res?.message || "Save failed");
//       }
//     } catch (error) {
//       console.error("Assign Agent Error:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   // ======================================================================================   INSTAGRAMUSERLIST FUNCTIONS ENDS HERE ======================================================================================

//   return (
//     <div className="w-full space-y-10">
//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col gap-1">
//         <h1 className="text-2xl font-bold text-gray-900">Manage Agent</h1>
//         <p className="text-sm text-gray-500">
//           Assign and manage agents across different channels
//         </p>
//       </div>

//       {/* ================= TAB SECTION ================= */}

//       <div className="flex gap-3 mb-6">
//         {tabs.map((t) => (
//           <button
//             key={t.name}
//             onClick={() => setChannelTab(t.name)}
//             className={`px-4 py-2 rounded-full text-sm font-semibold transition
//         ${channelTab === t.name
//                 ? "bg-white text-gray-900 border border-blue-600"
//                 : "bg-gray-100 text-gray-700 hover:bg-blue-200"
//               }`}
//           >
//             {t.label}
//           </button>
//         ))}
//       </div>

//       {/* ================= WHATSAPP ================= */}
//       {channelTab === "whatsapp" && (
//         <>
//           <div className="bg-white rounded-xl shadow-sm border p-3">
//             <DropdownWithSearch
//               id="launchSelectWABA"
//               name="launchSelectWABA"
//               label="Select WABA"
//               tooltipContent="Select your whatsapp business account"
//               tooltipPlacement="right"
//               placeholder="Select WABA"
//               options={
//                 wabaList.length > 0
//                   ? wabaList.map((waba) => ({
//                     value: waba.wabaSrno,
//                     label: waba.name,
//                   }))
//                   : []
//               }
//               value={selectedWaba}
//               onChange={setSelectedWaba}
//               disabled={isLoading}
//             />
//           </div>
//           <div className="bg-white rounded-xl shadow-sm border p-6 space-y-5">
//             <h2 className="text-lg font-semibold text-gray-800">
//               WhatsApp Agent List
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {agentResponse.map((agent) => (
//                 <div
//                   key={agent.srNo}
//                   className="flex items-center justify-between gap-3 border rounded-lg px-4 py-3 hover:shadow-sm transition"
//                 >
//                   <Checkbox
//                     checked={checkedMap[agent.srNo] ?? false}
//                     onChange={(e) =>
//                       setCheckedMap((prev) => ({
//                         ...prev,
//                         [agent.srNo]: e.target.checked,
//                       }))
//                     }
//                   />

//                   <span className="flex-1 text-sm font-medium text-gray-800 truncate">
//                     {agent.name}
//                   </span>

//                   <span
//                     className={`text-xs px-2 py-1 rounded-full font-semibold ${agent.isAssigned === 1
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                       }`}
//                   >
//                     {agent.isAssigned === 1 ? "Assigned" : "Not Assigned"}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-4">
//               <UniversalButton label="Save" onClick={handleSave} />
//             </div>
//           </div>
//         </>
//       )}

//       {/* ================= RCS ================= */}
//       {channelTab === "rcs" && (
//         <>
//           <div className="bg-white rounded-xl shadow-sm border p-3">
//             <DropdownWithSearch
//               id="rcsagentlist"
//               name="rcsagentlist"
//               label="Select Agent"
//               tooltipContent="Select your Agent"
//               tooltipPlacement="right"
//               placeholder="Select Agent"
//               options={allAgents?.map((agent) => ({
//                 value: agent.srno,
//                 label: agent.agent_name,
//               }))}
//               value={selectedAgent}
//               onChange={setSelectedAgent}
//             />
//           </div>
//           <div className="bg-white rounded-xl shadow-sm border p-6 space-y-5">
//             <h2 className="text-lg font-semibold text-gray-800">
//               RCS Agent List
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {rcsAgentResponse.map((agent) => (
//                 <div
//                   key={agent.srNo}
//                   className="flex items-center justify-between gap-3 border rounded-lg px-4 py-3 hover:shadow-sm transition"
//                 >
//                   <Checkbox
//                     checked={rcsCheckedMap[agent.srNo] ?? false}
//                     onChange={(e) =>
//                       setRcsCheckedMap((prev) => ({
//                         ...prev,
//                         [agent.srNo]: e.target.checked,
//                       }))
//                     }
//                   />

//                   <span className="flex-1 text-sm font-medium text-gray-800 truncate">
//                     {agent.name}
//                   </span>

//                   <span
//                     className={`text-xs px-2 py-1 rounded-full font-semibold ${agent.isAssigned === 1
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                       }`}
//                   >
//                     {agent.isAssigned === 1 ? "Assigned" : "Not Assigned"}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-4">
//               <UniversalButton label="Save" onClick={handleRcsSave} />
//             </div>
//           </div>
//         </>
//       )}

//       {/* ================= INSTAGRAM ================= */}

//       {channelTab === "instagram" && (
//         <>
//           <div className="bg-white rounded-xl shadow-sm border p-3">
//             <DropdownWithSearch
//               id="instauserlist"
//               name="instauserlist"
//               label="Select User"
//               tooltipContent="Select your User"
//               tooltipPlacement="right"
//               placeholder="Select User"
//               options={userList.map((user) => ({
//                 value: user.instaOffDetailSrNo,
//                 label: user.userName,
//               }))}
//               value={selectedUser}
//               onChange={setSelectedUser}
//             />
//           </div>
//           <div className="bg-white rounded-xl shadow-sm border p-6 space-y-5">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Instagram User List
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {userResponseList.map((user) => (
//                 <div
//                   key={user.srNo}
//                   className="flex items-center justify-between gap-3 border rounded-lg px-4 py-3 hover:shadow-sm transition"
//                 >
//                   <Checkbox
//                     checked={instaCheckedMap[user.srNo] ?? false}
//                     onChange={(e) =>
//                       setInstaCheckedMap((prev) => ({
//                         ...prev,
//                         [user.srNo]: e.target.checked,
//                       }))
//                     }
//                   />

//                   <span className="flex-1 text-sm font-medium text-gray-800 truncate">
//                     {user.name}
//                   </span>

//                   <span
//                     className={`text-xs px-2 py-1 rounded-full font-semibold ${user.isAssigned === 1
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                       }`}
//                   >
//                     {user.isAssigned === 1 ? "Assigned" : "Not Assigned"}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-4">
//               <UniversalButton label="Save" onClick={handleInstaSave} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ManageAgentAll;


import React, { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// ICONS
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { BsJournalArrowDown } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineAssignmentInd } from "react-icons/md";

// COMPONENTS
import ManageAgent from "@/whatsapp/manageagent/ManageAgent";
import AgentMapping from "./AgentMapping";



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ManageAgentAll = () => {
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Manage Campaigns Tabs"
          textColor="primary"
          indicatorColor="primary"
          scrollButtons="auto"
          allowScrollButtonsMobile
          className="w-full"
          variant="scrollable"
        >
          <Tab
            label={
              <span className="flex items-center gap-2">
                <IoPersonOutline size={20} /> Manage Agent
              </span>
            }
            {...a11yProps(0)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "#f0f4ff",
                borderRadius: "8px",
              },
            }}
          />
          <Tab
            label={
              <span className="flex items-center gap-2">
                <MdOutlineAssignmentInd size={22} /> Agent Mapping
              </span>
            }
            {...a11yProps(1)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "#f0f4ff",
                borderRadius: "8px",
              },
            }}
          />
        </Tabs>
        <CustomTabPanel value={value} index={0} className="">
          <ManageAgent />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1} className="">
          <AgentMapping />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default ManageAgentAll