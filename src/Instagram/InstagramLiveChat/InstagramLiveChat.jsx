import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { SpeedDial } from "primereact/speeddial";
import moment from "moment";
import { useInstagramContext } from "@/context/InstagramContext";

// ICONS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { LuUndo2 } from "react-icons/lu";

// ASSETS
import { FiSend } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import liveChatAnimation from "@/assets/animation/InstaChatscreen";

// APIS
import { fetchConversations, viewUpdate } from "@/apis/instagram/instagram.js";

// COMPONENTS
import QuickReply, { ShowQuickReply } from "./Components/QuickReply";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { InputData } from "./Components/InputData";
import { ChatSidebar } from "./Components/Sidebar";
import InstaChatScreen from "./Components/InstaChatScreen";

const InstagramLiveChat = () => {
  const {
    chatState,
    setChatState,
    instagramData,
    coversationType,
    setconversationType,
    selectedInstaChat,
    setSelectedInstaChat,
    setInstaChatData,
  } = useInstagramContext();

  const [isLoading, setIsLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatIndex, setChatIndex] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [dates, setDates] = useState({
    from: new Date(),
    to: new Date(),
  });

  const [pageSize, setPageSize] = useState(10);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [showChatSidebar, setShowChatSidebar] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const fetchConversationsByType = async (userActive) => {
    const payload = {
      businessInstaUserId: instagramData?.selectedInstaUserId,
      fromDate: moment(new Date(dates.from)).format("YYYY-MM-DD"),
      toDate: moment(new Date(dates.to)).format("YYYY-MM-DD"),
      // fromDate: "2022-12-01",
      // toDate: "2025-12-30",
      pageSize,
      startIndex: 1,
      userActive,
    };

    const res = await fetchConversations(payload);
    return res?.data;
  };

  const fetchAllConversations = async () => {
    setIsLoading(true);

    const mapActiveValue = {
      All: "",
      Active: 1,
      InActive: 0,
    };

    try {
      if (!initialLoadDone) {
        const [all, active, inactive] = await Promise.all([
          fetchConversationsByType(""),
          fetchConversationsByType(1),
          fetchConversationsByType(0),
        ]);

        setChatState(all);

        setconversationType({
          active,
          inactive,
        });

        setInitialLoadDone(true);
        setHasFetchedOnce(true);

        return;
      }

      // After first load
      const payload = {
        businessInstaUserId: instagramData?.selectedInstaUserId,
        fromDate: moment(new Date(dates.from)).format("YYYY-MM-DD"),
        toDate: moment(new Date(dates.to)).format("YYYY-MM-DD"),
        // fromDate: "2022-01-01",
        // toDate: "2025-12-30",
        pageSize,
        startIndex: 1,
        userActive: mapActiveValue[activeTab],
      };

      const res = await fetchConversations(payload);
      setChatState(res?.data);

      if (payload.userActive === 1) {
        setconversationType((prev) => ({
          ...prev,
          active: res.data,
        }));
      } else if (payload.userActive === 0) {
        setconversationType((prev) => ({
          ...prev,
          inactive: res.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching Instagram chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllConversationsSilent = async () => {
    const mapActiveValue = {
      All: "",
      Active: 1,
      InActive: 0,
    };

    try {
      if (!initialLoadDone) {
        const [all, active, inactive] = await Promise.all([
          fetchConversationsByType(""),
          fetchConversationsByType(1),
          fetchConversationsByType(0),
        ]);

        setChatState(all);

        setconversationType({
          active,
          inactive,
        });

        setInitialLoadDone(true);
        setHasFetchedOnce(true);

        return;
      }

      // After first load (same logic)
      const payload = {
        businessInstaUserId: instagramData?.selectedInstaUserId,
        fromDate: moment(new Date(dates.from)).format("YYYY-MM-DD"),
        toDate: moment(new Date(dates.to)).format("YYYY-MM-DD"),
        // fromDate: "2022-01-01",
        // toDate: "2025-12-30",
        pageSize,
        startIndex: 1,
        userActive: mapActiveValue[activeTab],
      };

      const res = await fetchConversations(payload);
      setChatState(res?.data);

      if (payload.userActive === 1) {
        setconversationType((prev) => ({
          ...prev,
          active: res.data,
        }));
      } else if (payload.userActive === 0) {
        setconversationType((prev) => ({
          ...prev,
          inactive: res.data,
        }));
      }
    } catch (error) {
      console.error("Silent refresh error:", error);
    }
  };

  useEffect(() => {
    if (!instagramData?.selectedInstaUserId || !activeTab || !pageSize) return;

    const interval = setInterval(() => {
      fetchAllConversationsSilent();
    }, 3000);

    return () => clearInterval(interval);
  }, [
    instagramData?.selectedInstaUserId,
    activeTab,
    pageSize,
    initialLoadDone,
    dates,
  ]);

  const viewInstaUpdate = async () => {
    try {
      const payload = {
        businessInstaUserId: instagramData?.selectedAccount,
        instaUserId: instagramData?.selectedInstaUserId,
        // businessInstaUserId: instagramData?.selectedInstaUserId,
        // instaUserId: instagramData?.selectedAccount,
        // instaUserId: selectedInstaChat?.recipientId,
        // businessInstaUserId: 24983023734620084,
        // instaUserId: 17841404630029041,
      };

      const res = await viewUpdate(payload);
    } catch (error) {
      console.error("Error fetching Instagram chats:", error);
    }
  };

  // When pass the instagram account instauserid - viewupdate
  useEffect(() => {
    if (!instagramData?.selectedAccount && !instagramData?.selectedInstaUserId)
      return;

    const interval = setInterval(() => {
      viewInstaUpdate();
    }, 3000);

    return () => clearInterval(interval);
  }, [instagramData?.selectedAccount, instagramData?.selectedInstaUserId]);

  // When pass the reciptient id in instauserid - viewupdate
  // useEffect(() => {
  //   if (!instagramData?.selectedAccount) return;
  //   if (!selectedInstaChat?.recipientId) return;

  //   const interval = setInterval(() => {
  //     viewInstaUpdate();
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [instagramData?.selectedAccount, selectedInstaChat?.recipientId]);

  useEffect(() => {
    if (instagramData?.selectedAccount && activeTab && pageSize) {
      fetchAllConversations();
    }
  }, [instagramData?.selectedAccount, activeTab, pageSize]);

  const chatScreenVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (

    <div className="flex h-[100%] bg-gray-50 rounded-2xl overflow-hidden border ">
      <div
        className={`w-full h-full md:w-100 p-1 border rounded-tl-2xl overflow-hidden border-tl-lg block ${chatState?.active ? "hidden md:grid" : "grid"
          }`}>
        <InputData
          setChatState={setChatState}
          chatState={chatState}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          dates={dates}
          setDates={setDates}
          fetchAllConversations={fetchAllConversations}
          isLoading={isLoading}
          setSelectedInstaChat={setSelectedInstaChat}
          setInstaChatData={setInstaChatData}
        />

        <ChatSidebar
          chatState={chatState}
          setChatState={setChatState}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setSelectedInstaChat={(chat) => {
            setSelectedInstaChat(chat);
            setShowChatSidebar(false); // 👈 HIDE SIDEBAR ON MOBILE
          }}
          selectedInstaChat={selectedInstaChat}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hasFetchedOnce={hasFetchedOnce}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="chat-screen"
          variants={chatScreenVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1 relative h-full w-full transition-all duration-200 "
        >
          <InstaChatScreen
            chatState={chatState}
            setChatState={setChatState}
            selectedInstaChat={selectedInstaChat}
            chatIndex={chatIndex}
            setChatIndex={setChatIndex}
            setChatLoading={setChatLoading}
            chatLoading={chatLoading}
            setSelectedInstaChat={setSelectedInstaChat}
            setShowChatSidebar={setShowChatSidebar}
            instagramData={instagramData}
          />
        </motion.div>
      </AnimatePresence>
    </div>
    // <>
    //   <div className="flex flex-col md:flex-row h-[83vh] md:h-[80vh] bg-gray-50 rounded-2xl border verflow-hidden md:overflow-hidden relative">
    //     {/* SIDEBAR */}
    //     <div
    //       className={`w-full h-full md:w-100 p-1 border rounded-tl-2xl overflow-hidden border-tl-lg block ${
    //         chatState?.active ? "hidden md:flex" : "flex"
    //       }`}
    //     >
    //       {/* Search */}
    //       <div className="flex flex-col w-full h-full">
    //         <InputData
    //           setChatState={setChatState}
    //           chatState={chatState}
    //           activeTab={activeTab}
    //           setActiveTab={setActiveTab}
    //           dates={dates}
    //           setDates={setDates}
    //           fetchAllConversations={fetchAllConversations}
    //           isLoading={isLoading}
    //           setSelectedInstaChat={setSelectedInstaChat}
    //           setInstaChatData={setInstaChatData}
    //         />

    //         <ChatSidebar
    //           chatState={chatState}
    //           setChatState={setChatState}
    //           isLoading={isLoading}
    //           setIsLoading={setIsLoading}
    //           setSelectedInstaChat={(chat) => {
    //             setSelectedInstaChat(chat);
    //             setShowChatSidebar(false); // 👈 HIDE SIDEBAR ON MOBILE
    //           }}
    //           selectedInstaChat={selectedInstaChat}
    //           pageSize={pageSize}
    //           setPageSize={setPageSize}
    //           hasFetchedOnce={hasFetchedOnce}
    //         />
    //       </div>
    //     </div>

    //     {/* CHAT AREA */}
    //     <AnimatePresence mode="wait">
    //       <motion.div
    //         key="chat-screen"
    //         variants={chatScreenVariants}
    //         initial="hidden"
    //         animate="visible"
    //         exit="exit"
    //         className="flex-1 relative h-full w-full transition-all duration-200 "
    //       >
    //         <InstaChatScreen
    //           chatState={chatState}
    //           setChatState={setChatState}
    //           selectedInstaChat={selectedInstaChat}
    //           chatIndex={chatIndex}
    //           setChatIndex={setChatIndex}
    //           setChatLoading={setChatLoading}
    //           chatLoading={chatLoading}
    //           setSelectedInstaChat={setSelectedInstaChat}
    //           setShowChatSidebar={setShowChatSidebar}
    //         />
    //       </motion.div>
    //     </AnimatePresence>
    //   </div>
    // </>
  );
};

export default InstagramLiveChat;
