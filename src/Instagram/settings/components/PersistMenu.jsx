// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// // ICONS
// import WifiIcon from "@mui/icons-material/Wifi";
// import Battery90Icon from "@mui/icons-material/Battery90";
// import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
// import PhoneIcon from "@mui/icons-material/Phone";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import MenuIcon from "@mui/icons-material/Menu";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// // APIS
// import {
//   getPersistentMenu,
//   createPersistentMenu,
// } from "@/apis/instagram/instagram";

// // COMPONENTS
// import InputField from "@/whatsapp/components/InputField";
// import UniversalButton from "@/components/common/UniversalButton";
// import UniversalInstaButton from "@/instagram/components/UniversalInstaButton";

// const PersistMenu = ({ selectedInstaUser }) => {
//   const [menuName, setMenuName] = useState("");
//   const [persistMenuItems, setPersistMenuItems] = useState([]);
//   const [touchedUrls, setTouchedUrls] = useState({});

//   const [menuItems, setMenuItems] = useState([
//     {
//       buttonType: "web_url",
//       menuName: "",
//       webUrl: "",
//     },
//   ]);
//   const [buttonType, setButtonType] = useState("web_url");
//   const [webUrl, setWebUrl] = useState("");

//   const mapPersistToForm = (persistMenuItems) => {
//     return persistMenuItems.flatMap((localeItem) =>
//       localeItem.persistent_menu.flatMap((menu) =>
//         menu.call_to_actions.map((action) => ({
//           buttonType: action.type,
//           menuName: action.title,
//           webUrl: action.type === "web_url" ? action.url : action.payload || "",
//         }))
//       )
//     );
//   };

//   useEffect(() => {
//     if (!persistMenuItems.length) return;

//     const mappedItems = mapPersistToForm(persistMenuItems);

//     if (mappedItems.length) {
//       setMenuItems(mappedItems);
//     }
//   }, [persistMenuItems]);

//   useEffect(() => {
//     if (selectedInstaUser) {
//       fetchPersistentMenu();
//     }
//   }, [selectedInstaUser]);

//   const fetchPersistentMenu = async () => {
//     const instaUserId = selectedInstaUser;

//     try {
//       const response = await getPersistentMenu(instaUserId);
//       setPersistMenuItems(response?.data?.data || []);
//       console.log("Persistent Menu fetched:", response);
//     } catch (error) {
//       console.error("Error fetching persistent menu:", error);
//     }
//   };

//   const handleCreatePersistentMenu = async () => {
//     const instaUserId = selectedInstaUser;

//     // Validation
//     const isValid = menuItems.every((item) => {
//       if (!item.menuName.trim()) return false;
//       if (item.buttonType === "web_url" && !item.webUrl.trim()) return false;
//       return true;
//     });

//     if (!isValid) {
//       toast.error("Please fill all required menu fields.");
//       return;
//     }

//     if (menuItems.length > 5) {
//       toast.error("Only 5 items can be added.");
//       return;
//     }

//     // Build API payload
//     const data = menuItems.map((item) => ({
//       type: item.buttonType,
//       title: item.menuName,
//       ...(item.buttonType === "web_url"
//         ? { url: item.webUrl }
//         : { payload: item.webUrl }),
//     }));

//     try {
//       const response = await createPersistentMenu(data, instaUserId);

//       if (response?.success) {
//         fetchPersistentMenu();
//         toast.success("Persistent menu created successfully!");

//         // Reset to single empty item
//         setMenuItems([
//           {
//             buttonType: "web_url",
//             menuName: "",
//             webUrl: "",
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error("Error creating persistent menu:", error);
//       toast.error("Failed to create persistent menu.");
//     }
//   };

//   const MAX_MENU_ITEMS = 20;

//   const handleAddMore = () => {
//     setMenuItems((prev) => {
//       if (prev.length >= MAX_MENU_ITEMS) {
//         toast.error(`You can add up to ${MAX_MENU_ITEMS} items only.`);
//         return prev; // do not add more
//       }

//       return [
//         ...prev,
//         {
//           buttonType: "web_url",
//           menuName: "",
//           webUrl: "",
//         },
//       ];
//     });
//   };

//   const updateMenuItem = (index, field, value) => {
//     setMenuItems((prev) =>
//       prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
//     );
//   };

//   const menuActions = persistMenuItems.flatMap(
//     (item) =>
//       item?.persistent_menu?.flatMap((menu) => menu?.call_to_actions || []) ||
//       []
//   );

//   const isValidUrl = (value) => {
//     try {
//       new URL(value);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   return (
//     <div className="">
//       <div className="flex flex-col md:flex-row gap-4">
//         {/* left Panel - add content */}
//         <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4 space-y-6 flex flex-col items-start justify-start">
//           <div className="flex flex-col items-center gap-4 w-full p-3 bg-white rounded-lg shadow ">
//             {menuItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center gap-4 w-full p-3 bg-white rounded-lg shadow"
//               >
//                 {/* Radio buttons */}
//                 <div className="flex gap-6">
//                   <label className="inline-flex items-center gap-2 text-sm text-gray-700">
//                     <input
//                       type="radio"
//                       value="web_url"
//                       checked={item.buttonType === "web_url"}
//                       onChange={(e) =>
//                         updateMenuItem(index, "buttonType", e.target.value)
//                       }
//                       className="accent-blue-600"
//                     />
//                     Web URL
//                   </label>

//                   <label className="inline-flex items-center gap-2 text-sm text-gray-700">
//                     <input
//                       type="radio"
//                       value="postback"
//                       checked={item.buttonType === "postback"}
//                       onChange={(e) =>
//                         updateMenuItem(index, "buttonType", e.target.value)
//                       }
//                       className="accent-blue-600"
//                     />
//                     Postback
//                   </label>
//                 </div>

//                 {/* Menu label */}
//                 <InputField
//                   type="text"
//                   label="Label of menu item"
//                   placeholder="Show products, nearby location ...."
//                   value={item.menuName}
//                   onChange={(e) =>
//                     updateMenuItem(index, "menuName", e.target.value)
//                   }
//                   className="w-46 text-sm"
//                 />

//                 {/* Web URL */}
//                 <InputField
//                   type="text"
//                   label={
//                     item.buttonType === "web_url"
//                       ? touchedUrls[index] &&
//                         item.webUrl &&
//                         !isValidUrl(item.webUrl)
//                         ? "Enter valid URL"
//                         : "Web URL to redirect"
//                       : "Enter callback"
//                   }
//                   placeholder={
//                     item.buttonType === "web_url"
//                       ? "https://www.example.com"
//                       : "Enter callback payload"
//                   }
//                   value={item.webUrl}
//                   onChange={(e) => {
//                     updateMenuItem(index, "webUrl", e.target.value);
//                     setTouchedUrls((prev) => ({ ...prev, [index]: true }));
//                   }}
//                   className="w-46 text-sm"
//                 />
//               </div>
//             ))}

//             <div className="self-end">
//               <UniversalButton label="+ Add more" onClick={handleAddMore} />
//             </div>

//             <div className="w-max-content flex flex-col items-center">
//               {/* <UniversalButton onClick={handleAddMenuItem} label="Add" /> */}
//               <UniversalInstaButton
//                 onClick={handleCreatePersistentMenu}
//                 label="Add"
//               />
//               <div className="text-xs font-semibold mt-1">
//                 Total PersistMenu: {persistMenuItems.length}/20
//               </div>
//             </div>
//           </div>
//           <div className="w-full">
//             <div className="flex h-100 border rounded-2xl">
//               <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4 w-full  rounded-2xl p-2 overflow-y-scroll  ">
//                 {persistMenuItems.length === 0 ? (
//                   <>
//                     <div className="flex items-center justify-center">
//                       <div className="text-xl font-medium">
//                         No menu items added yet.
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-3 justify-center w-full ">
//                       <div className="w-full">
//                         <span className="font-semibold">URL Button</span> <br />
//                         <p className="text-gray-400 text-sm  break-words whitespace-pre-line w-full">
//                           The URL Button opens a web page in the in-app browser.
//                           This allows you to enrich the conversation with a
//                           web-based experience, where you have the full
//                           development flexibility of the web. For example, you
//                           might display a product summary in-conversation, then
//                           use the URL button to open the full product page on
//                           your website.
//                         </p>
//                       </div>
//                       <div className="w-full">
//                         <span className="font-semibold text-sm">
//                           Postback Button
//                         </span>
//                         <p className="text-gray-400 text-xs  break-words whitespace-pre-line w-full">
//                           The postback button sends a messaging_postbacks event
//                           to your webhook with the string set in the payload
//                           property. This allows you to take arbitrary actions
//                           when the button is tapped. For example, you might
//                           display a list of products, then send the product ID
//                           in the postback to your webhook, where it can be used
//                           to query your database and return the product details
//                           as a structured message.
//                         </p>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   menuActions.map((item, index) => (
//                     <div
//                       key={index}
//                       className="p-5 border rounded-lg bg-gray-50 shadow-sm space-y-1 relative flex flex-col items-start"
//                     >
//                       <p className="text-sm font-semibold text-gray-800">
//                         <span className="font-semibold">Title:</span>{" "}
//                         {item.title}
//                       </p>

//                       <p className="text-sm text-gray-800">
//                         <span className="font-semibold">Type:</span> {item.type}
//                       </p>

//                       {item.type === "web_url" && item.url && (
//                         <p className="text-sm text-gray-800 break-all">
//                           <span className="font-semibold">WebUrl:</span>{" "}
//                           <a
//                             href={item.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="underline"
//                           >
//                             {item.url}
//                           </a>
//                         </p>
//                       )}

//                       {item.type === "postback" && item.payload && (
//                         <p className="text-sm text-gray-800">
//                           <span className="font-semibold">Payload:</span>{" "}
//                           {item.payload}
//                         </p>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Chat Preview */}
//         <div className="md:w-[375px] h-[667px] rounded-[2rem] border-4 border-black shadow-lg flex flex-col overflow-hidden relative bg-white">
//           {/* Top Status Bar */}
//           <div className="text-center text-xs text-gray-500 flex justify-between items-center p-4">
//             <p>10:32 AM</p>
//             <div className="flex space-x-1">
//               <AccessAlarmIcon className="text-gray-500" fontSize="small" />
//               <WifiIcon className="text-gray-500" fontSize="small" />
//               <Battery90Icon className="text-gray-500" fontSize="small" />
//             </div>
//           </div>

//           {/* Chat Header */}
//           <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
//             <div className="flex items-center gap-3">
//               <img
//                 src="https://i.pravatar.cc/40?img=12"
//                 alt="User Avatar"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-800">
//                   Lucky Shrub
//                 </h3>
//                 <p className="text-xs text-gray-500">Online</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 text-gray-600">
//               <PhoneIcon fontSize="small" />
//               <VideocamIcon fontSize="small" />
//               <MenuIcon fontSize="small" />
//             </div>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 relative overflow-y-auto text-sm p-4 space-y-4">
//             <div className="flex justify-end">
//               <div className="bg-blue-600 text-white px-4 py-2 rounded-xl max-w-[70%]">
//                 Live chat with a person
//               </div>
//             </div>

//             <div className="text-xs text-gray-400">Shane joined the chat</div>

//             <div className="flex justify-start">
//               <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl max-w-[75%]">
//                 Hi! My name is Shane! I’m a customer support rep with Lucky
//                 Shrub, how can I help you?
//               </div>
//             </div>
//           </div>

//           {/* Bottom Sheet - Persist Menu */}
//           <div className="absolute inset-0 bg-black/20 z-0" />
//           <div className="relative z-10 bg-white p-2 rounded-t-2xl shadow-lg h-[55%] overflow-y-auto">
//             <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
//             <h2 className="text-center text-md font-semibold text-gray-800">
//               More options
//             </h2>
//             <p className="text-center text-xs text-gray-500 mb-4">
//               Tap to send a suggestion from Lucky Shrub
//             </p>

//             <div className="space-y-2 flex flex-col items-center ">
//               {menuActions.length === 0 ? (
//                 <p className="text-gray-400 text-sm">
//                   No menu items added yet.
//                 </p>
//               ) : (
//                 menuActions.map((item, index) => (
//                   <button
//                     key={index}
//                     className="w-auto max-w-xs text-blue-400 text-sm bg-gray-100 font-semibold px-4 py-1.5 rounded-full break-words"
//                   >
//                     {item.title}
//                   </button>
//                 ))
//               )}
//             </div>

//             <div className="mt-1 text-center border-t border-gray-200 pt-4">
//               <a href="#" className="text-sm text-blue-600 underline">
//                 Visit the website
//               </a>
//               <p className="text-xs text-gray-300">www.example.com</p>
//             </div>
//             <div className="w-28 h-1.5 bg-gray-800 rounded-full mx-auto mt-2" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersistMenu;

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import WifiIcon from "@mui/icons-material/Wifi";
import Battery90Icon from "@mui/icons-material/Battery90";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import {
  FaVideo,
  FaInstagram,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaBolt,
  FaQuestionCircle,
  FaChevronRight,
  FaInfoCircle,
  FaTimes,
  FaGlobe,
  FaLock,
} from "react-icons/fa";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { LuMic, LuRefreshCw } from "react-icons/lu";

// APIS
import {
  getPersistentMenu,
  createPersistentMenu,
} from "@/apis/instagram/instagram";

// COMPONENTS
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/components/common/UniversalButton";
import UniversalInstaButton from "@/instagram/components/UniversalInstaButton";

const CardSkeleton = () => (
  <div className="group pl-6 relative bg-gray-50/50 border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse">
    <div className="absolute -left-3 top-6 bg-gray-200 w-8 h-8 rounded-full" />
    <div className="space-y-4 mt-7">
      <div className="h-10 bg-gray-200 rounded-xl w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-12 bg-gray-200 rounded-lg" />
        <div className="h-12 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

const PreviewSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="w-full h-10 bg-gray-100 rounded-xl" />
    ))}
  </div>
);

const PersistMenu = ({ selectedInstaUser, selectedInstaUserDetails }) => {
  const [persistMenuItems, setPersistMenuItems] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [touchedUrls, setTouchedUrls] = useState({});
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [previewResponse, setPreviewResponse] = useState(null);
  const [browserUrl, setBrowserUrl] = useState(null); // Simulated Browser State
  const [isLoading, setIsLoading] = useState(false);

  const [menuItems, setMenuItems] = useState([
    {
      buttonType: "web_url",
      menuName: "",
      webUrl: "",
    },
  ]);
  const [buttonType, setButtonType] = useState("web_url");
  const [webUrl, setWebUrl] = useState("");

  const mapPersistToForm = (persistMenuItems) => {
    return persistMenuItems.flatMap((localeItem) =>
      localeItem.persistent_menu.flatMap((menu) =>
        menu.call_to_actions.map((action) => ({
          buttonType: action.type,
          menuName: action.title,
          webUrl: action.type === "web_url" ? action.url : action.payload || "",
        }))
      )
    );
  };

  const fetchPersistentMenu = async () => {
    const instaUserId = selectedInstaUser;
    setIsLoading(true);

    try {
      const response = await getPersistentMenu(instaUserId);
      const items = response?.data?.data || [];
      setPersistMenuItems(items);
      // if (items.length > 0) {
      //   setMenuItems(mapPersistToForm(items));
      // }
      setTimeout(() => {
        if (items.length > 0) {
          setMenuItems(mapPersistToForm(items));
        } else {
          setMenuItems([{ buttonType: "web_url", menuName: "", webUrl: "" }]);
        }
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching persistent menu:", error);
    }
  };

  useEffect(() => {
    if (selectedInstaUser) {
      fetchPersistentMenu();
    }
  }, [selectedInstaUser]);

  const handleAddMore = () => {
    if (menuItems.length >= 20) {
      toast.error("Maximum 20 items allowed");
      return;
    }
    setMenuItems([
      ...menuItems,
      { buttonType: "web_url", menuName: "", webUrl: "" },
    ]);
  };

  const updateMenuItem = (index, field, value) => {
    setMenuItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleCreatePersistentMenu = async () => {
    // const instaUserId = selectedInstaUser;

    // Validation
    const isValid = menuItems.every(
      (item) =>
        item.menuName.trim() &&
        (item.buttonType !== "web_url" || item.webUrl.trim())
    );
    if (!isValid) return toast.error("Please fill all required fields.");

    // Build API payload
    // setIsSaving(true);
    const data = menuItems.map((item) => ({
      type: item.buttonType,
      title: item.menuName,
      ...(item.buttonType === "web_url"
        ? { url: item.webUrl }
        : { payload: item.webUrl }),
    }));

    // try {
    //   const response = await createPersistentMenu(data, selectedInstaUser);

    //   if (response?.success) {
    //     toast.success("Persistent updated successfully!");
    //     fetchPersistentMenu();

    //     // Reset to single empty item
    //     setMenuItems([
    //       {
    //         buttonType: "web_url",
    //         menuName: "",
    //         webUrl: "",
    //       },
    //     ]);
    //   }
    // } catch (error) {
    //   console.error("Error creating persistent menu:", error);
    //   toast.error("Failed to create persistent menu.");
    // } finally {
    //   setIsSaving(false);
    // }
    const updatePromise = new Promise(async (resolve, reject) => {
      setIsSaving(true);
      try {
        // Artificially wait for at least 2.5 seconds to show the professional loader
        const startTime = Date.now();
        const response = await createPersistentMenu(data, selectedInstaUser);
        const duration = Date.now() - startTime;
        const waitTime = Math.max(0, 2500 - duration);

        setTimeout(() => {
          if (response?.success) {
            fetchPersistentMenu();
            resolve(response);
          } else {
            reject(new Error("Failed to sync"));
          }
        }, waitTime);
      } catch (error) {
        reject(error);
      } finally {
        // We delay the false state slightly to match the toast finish
        setTimeout(() => setIsSaving(false), 3000);
      }
    });

    toast.promise(updatePromise, {
      loading: "Syncing with Meta servers...",
      success: <p>Menu updated successfully!</p>,
      error: <b>Could not sync menu.</b>,
    });
  };

  // Simulation Logic
  // const handlePreviewClick = (item) => {
  //   if (item.buttonType === "web_url") {
  //     let url = item.webUrl;
  //     if (url && !/^https?:\/\//i.test(url)) {
  //       url = "https://" + url;
  //     }
  //     setBrowserUrl(url || "https://example.com");
  //   } else {
  //     setPreviewResponse(`Postback Received: ${item.webUrl}`);
  //     setTimeout(() => setPreviewResponse(null), 3000);
  //   }
  // };

  const handlePreviewClick = (item) => {
    if (item.buttonType === "web_url") {
      let url = item.webUrl;
      if (url && !/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      // We use a proxy URL to try and bypass the X-Frame-Options
      // Note: This works for some sites, but not all depending on their internal scripts
      const proxiedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        url
      )}`;

      // If you just want to TRY the direct iframe again:
      setBrowserUrl(url);
    } else {
      setPreviewResponse(`Automation: ${item.webUrl}`);
      setTimeout(() => setPreviewResponse(null), 3000);
    }
  };

  const openOriginalLink = () => {
    if (browserUrl) {
      window.open(browserUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <AnimatePresence>
        {isSaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[1000] flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-3xl"
          >
            <div className="relative">
              {/* Animated Outer Ring */}
              <div className="w-20 h-20 border-4 border-blue-100 rounded-full" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute top-0 left-0 w-20 h-20 border-4 border-t-blue-600 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FaInstagram className="text-pink-500 text-2xl animate-pulse" />
              </div>
            </div>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-sm font-semibold text-gray-800 tracking-tight"
            >
              UPDATING INSTAGRAM PROFILE
            </motion.p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Optimizing Menu Assets
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* left Panel - add content */}
      <div className="w-full md:w-3/4 space-y-6 ">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4 overflow-scroll h-screen pb-95 lg:pb-70">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-800">
                Configure Menu
              </h2>
              <button
                onClick={() => setShowHelpDialog(true)}
                className="text-blue-500 hover:text-blue-600 transition"
              >
                <FaQuestionCircle size={18} />
              </button>
            </div>
            {!isLoading && (
              <div className="flex items-center gap-2">
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">
                  {menuItems.length}/20 Items
                </span>
                <button
                  onClick={handleAddMore}
                  className="text-sm bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1.5 hover:bg-blue-600 hover:text-white transition-all rounded-full font-semibold"
                >
                  + Add Menu Item
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
            
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 "
              >
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="group pl-6 relative bg-gray-50 hover:bg-white border border-gray-200 hover:border-blue-300 transition-all rounded-2xl p-5 shadow-sm"
                  >
                    <div className="absolute -left-3 top-6 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                      {index + 1}
                    </div>

                    <button
                      onClick={() =>
                        setMenuItems(menuItems.filter((_, i) => i !== index))
                      }
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </button>
                   
                    <div className="space-y-2 mt-7">
                      <div className="flex bg-gray-200/50 p-1 rounded-xl w-full">
                        {["web_url", "postback"].map((type) => (
                          <button
                            key={type}
                            onClick={() =>
                              updateMenuItem(index, "buttonType", type)
                            }
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                              item.buttonType === type
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500"
                            }`}
                          >
                            {type === "web_url"
                              ? "Web URL"
                              : "Automation/Postback"}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                        <InputField
                          label="Item Title"
                          placeholder="e.g. Visit Website"
                          value={item.menuName}
                          onChange={(e) =>
                            updateMenuItem(index, "menuName", e.target.value)
                          }
                        />
                        <InputField
                          label={
                            item.buttonType === "web_url"
                              ? "Redirect URL"
                              : "Postback Payload"
                          }
                          placeholder={
                            item.buttonType === "web_url"
                              ? "https://example.com"
                              : "E.G. START_ORDER"
                          }
                          value={item.webUrl}
                          onChange={(e) =>
                            updateMenuItem(index, "webUrl", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {!isLoading && (
            <div className="mt-8 flex justify-center">
              <UniversalInstaButton
                onClick={handleCreatePersistentMenu}
                label={isSaving ? "Updating Menu..." : "Save Persistent Menu"}
                disabled={isSaving}
              />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: PHONE PREVIEW */}
      <div className="w-full md:w-1/4 overflow-scroll h-150 lg:h-200 pb-25 lg:pb-110 2xl:pb-20">
        <div className=" mx-auto w-[280px] md:w-[340px] lg:w-[250px] 2xl:w-[340px] bg-black rounded-[3.5rem] p-2 shadow-2xl ">
          <div className="w-full relative h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative border-[2px] border-gray-800">
            <AnimatePresence>
              {browserUrl && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute inset-0 z-[100] bg-white flex flex-col"
                >
                  <div className="bg-white border-b px-4 pt-12 pb-3 flex items-center justify-between shadow-sm">
                    <button
                      onClick={() => setBrowserUrl(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                      <FaTimes className="text-gray-800" />
                    </button>

                    <div className="bg-gray-100 px-4 py-1.5 rounded-full flex items-center gap-2 max-w-[200px] border border-gray-200">
                      <FaLock size={8} className="text-green-600" />
                      <span className="text-[10px] font-bold truncate text-gray-700 tracking-tight">
                        {new URL(browserUrl).hostname}
                      </span>
                    </div>

                    <button
                      onClick={() => toast.success("Refreshed Preview")}
                      className="p-2"
                    >
                      <LuRefreshCw size={14} className="text-gray-400" />
                    </button>
                  </div>

                  <div className="flex-1 w-full bg-[#FAFAFA] flex flex-col items-center justify-center p-6">
                    <div className="w-full bg-white border border-gray-200 rounded-[1.5rem] overflow-hidden shadow-xl shadow-gray-200/50">
                      <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center relative group">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-2">
                          <FaInstagram className="text-pink-500 text-3xl" />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Link Preview
                        </p>

                        <div className="absolute top-3 right-3">
                          <div className="bg-black/60 backdrop-blur-md text-[8px] text-white px-2 py-1 rounded-lg font-bold">
                            PROTECTED CONTENT
                          </div>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-[9px] font-bold  text-blue-500 uppercase tracking-normal">
                            {new URL(browserUrl).hostname}
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                          External Website Redirect
                        </h4>

                        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                          You are about to visit{" "}
                          <span className="text-gray-800 font-bold">
                            {new URL(browserUrl).hostname}
                          </span>
                          . Instagram opens these links in a secure in-app
                          browser for your safety.
                        </p>

                        <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-[9px] text-gray-400 font-bold">
                            Connection: HTTPS Secure
                          </span>
                          <FaLock size={8} className="text-gray-300" />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => window.open(browserUrl, "_blank")}
                      className="mt-10 w-full bg-gray-900 text-white py-4 rounded-2xl text-[11px] font-medium tracking-wide shadow-2xl shadow-gray-400 flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95"
                    >
                      <FaExternalLinkAlt size={12} />
                      OPEN LIVE WEBSITE
                    </button>

                    <p className="mt-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      Secure Link Verification
                    </p>
                  </div>

                  <div className="h-10 w-full flex justify-center items-center bg-white border-t border-gray-50">
                    <div className="w-32 h-1.5 bg-gray-900 rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="absolute inset-0 z-0 bg-repeat opacity-[0.2] pointer-events-none"
              style={{
                backgroundImage: "url(/instachatbg.webp)",
                backgroundSize: "100%",
              }}
            />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-gray-800 rounded-full" />
            </div>

            <div className="relative z-20 bg-white/90 backdrop-blur-md border-b px-5 pt-12 pb-3 flex items-center justify-between rounded-t-[44px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FFD600] to-[#D300C5] p-[1.5px]">
                  <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/2293372/pexels-photo-2293372.jpeg"
                      className="object-cover w-full h-full"
                      alt="profile"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-tight">
                    {selectedInstaUserDetails?.userName}
                  </span>
                  <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <div className="flex gap-3 text-gray-600">
                <PhoneOutlinedIcon sx={{ fontSize: 20 }} />
                <FaVideo size={18} />
              </div>
            </div>
            <div className="relative z-10 flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              <div className="text-[10px] text-gray-400 text-center my-2">
                OCT 24, 9:41 AM
              </div>
            </div>

            <div className="flex-1 p-2 flex flex-col gap-2">
              <AnimatePresence>
                {previewResponse && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-100 text-gray-800 p-2.5 rounded-2xl rounded-tl-none text-[10px] max-w-[80%] shadow-sm"
                  >
                    {previewResponse}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-30 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.08)] rounded-t-[2rem] pt-3 pb-2 px-5 border-t ">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
              <h3 className="text-center text-[12px] font-bold text-gray-800">
                Menu
              </h3>
              <p className="text-center text-[9px] text-gray-400 mb-4 font-medium">
                Configure item triggers below
              </p>

              <div className="space-y-2 max-h-70 overflow-scroll">
                {isLoading ? (
                  <PreviewSkeleton />
                ) : (
                  menuItems.map((item, idx) => (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={idx}
                      onClick={() => handlePreviewClick(item)}
                      className="w-full py-2.5 px-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between group active:bg-blue-50 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        {item.buttonType === "web_url" ? (
                          <FaExternalLinkAlt
                            size={10}
                            className="text-blue-400"
                          />
                        ) : (
                          <FaBolt size={10} className="text-amber-400" />
                        )}
                        <span className="text-[11px] font-bold text-gray-700">
                          {item.menuName || "Item Name"}
                        </span>
                      </div>
                      <FaChevronRight
                        size={10}
                        className="text-gray-300 group-hover:text-blue-400"
                      />
                    </motion.button>
                  ))
                )}
                {!isLoading && menuItems.length === 0 && (
                  <div className="py-4 text-center text-[10px] text-gray-300 italic">
                    No items configured
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-10 p-4 bg-white border-t">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-3">
                <FaRegFaceSmile className="text-gray-400" />

                <span className="text-gray-400 text-[13px] flex-1">
                  Message...
                </span>

                <LuMic className="text-gray-400" />
                <IoImageOutline className="text-gray-400" />
              </div>

              <div className="w-28 h-1 bg-black rounded-full mx-auto mt-4" />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={showHelpDialog}
        onHide={() => setShowHelpDialog(false)}
        closable={false}
        showHeader={false}
        style={{
          width: "400px",
          borderRadius: "24px",
          overflow: "hidden",
          border: "none",
        }}
      >
        <div className="bg-white relative">
          <div className="h-32 rounded-2xl mt-6 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white font-black text-xl">Quick Guide</h3>
              <p className="text-blue-100 text-xs mt-1">
                Meta Persistent Menu Rules
              </p>
            </div>
            <FaInstagram className="text-white/10 absolute -right-4 -bottom-4 text-9xl rotate-12" />
          </div>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <FaExternalLinkAlt />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">
                  Web URL Button
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Directly opens your website in the Instagram in-app browser.
                  Best for Shop or Booking links.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                <FaBolt />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">
                  Automation Trigger
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Sends a hidden code to your chatbot. Use this to trigger
                  automated replies like "Live Support".
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
              <FaInfoCircle className="text-blue-500" />
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                Changes take effect after the user re-opens the chat. Instagram
                limits this to 3 items only.
              </p>
            </div>
            <button
              onClick={() => setShowHelpDialog(false)}
              className="w-full bg-gray-900 text-white py-3 rounded-2xl font-bold text-sm hover:bg-black transition"
            >
              Got it
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PersistMenu;
