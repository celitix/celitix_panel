import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lottie from "lottie-react";
import moment from "moment";

// ICONS
import { CiMenuKebab } from "react-icons/ci";

// CONTEXT
import { useInstagramContext } from "@/context/InstagramContext";

// ASSETS
import instagram_Icon from "@/assets/animation/Instagram_icon.json";
import pointingAnimation from "@/assets/animation/pointing.json";
import Instagram from "@/assets/animation/Instagram.json";
import Datanotfound from "@/assets/animation/Datanotfound.json";

// APIS
import { getUserAgent } from "@/apis/whatsapp/whatsapp";

export const ChatSidebar = ({
  chatState,
  setChatState,
  setSelectedInstaChat,
  selectedInstaChat,
  isLoading,
  pageSize,
  setPageSize,
  hasFetchedOnce,
}) => {
  const { instagramData } = useInstagramContext();
  const transformedChats = chatState?.map((chat, idx) => {
    return {
      srno: chat?.srno.toString(),
      userName: chat.userName,
      timestamp: chat?.timestamp || new Date().toISOString(),
      unreadCount: chat?.unreadCount,
      businessInstaUserId: chat.businessInstaUserId,
      lastMessage: chat?.lastMessage || "",
      recipientId: chat.recipientId || "",
      replyTime: chat?.replyTime,
      senderId: chat?.senderId,
    };
  });

  // function generateDummyChats(count = 60) {
  //   const dummyChats = [];

  //   for (let i = 1; i <= count; i++) {
  //     dummyChats.push({
  //       srno: i.toString(),
  //       userName: `User ${i}`,
  //       timestamp: new Date(Date.now() - i * 1000 * 60 * 5).toISOString(),
  //       unreadCount: Math.floor(Math.random() * 10),
  //       businessInstaUserId: `biz_${i}`,
  //       lastMessage: `Sample last message ${i}`,
  //       recipientId: `recipient_${i}`,
  //       replyTime: `${Math.floor(Math.random() * 30)}m ago`,
  //       senderId: `sender_${i}`,
  //     });
  //   }

  //   return dummyChats;
  // }

  // // Example usage:
  // const transformedChats = generateDummyChats(pageSize);

  return (
    <div className={`mt-2 max-h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ${transformedChats?.length > 8 ? "h-auto pb-0" : "h-[100vh] pb-80 "}`}>
      {/* Select account message */}
      {!instagramData?.selectedAccount && (
        <motion.div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mb-4"
          >
            <Lottie
              animationData={pointingAnimation}
              loop
              autoplay
              className="w-auto h-45"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] bg-clip-text text-transparent"
          >
            Select an account to view chats
          </motion.p>

          <p className="text-center text-sm text-gray-700">
            Use the dropdown above to select your Instagram Business Account.
          </p>
        </motion.div>
      )}

      {/* Skeleton Loader */}
      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="p-3 border-b rounded-md shadow-sm mb-2">
            <div className="flex items-center gap-3">
              <Skeleton circle height={40} width={40} />
              <div className="flex flex-col gap-1">
                <Skeleton width={120} height={10} />
                <Skeleton width={200} height={10} />
              </div>
            </div>
          </div>
        ))}

      {/* Chat list */}
      {!isLoading &&
        instagramData?.selectedAccount &&
        transformedChats?.length > 0 && (
          <>
            {/* {transformedChats
              ?.slice()
              ?.sort((a, b) => new Date(b.replyTime) - new Date(a.replyTime))
              ?.map((chat, index) => (
                <motion.div
                  key={chat.srno || index}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: index * 0.03 }}
                  className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 shadow-sm ${selectedInstaChat?.userName === chat.userName
                    ? "bg-gradient-to-r from-[#F1D3CE] to-[#EECAD5] border-l-6 border-[#ab7a89] text-white"
                    : "bg-gradient-to-br from-[#BCCCDC] to-[#9AA6B2] hover:from-pink-200 hover:to-[#F1D3CE] text-gray-800 transition-colors duration-300"
                    }`}
                  onClick={() => setSelectedInstaChat(chat)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {chat?.profile ? (
                        <img
                          src={chat.profile}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm bg-white text-[#a667d3] shadow">
                          {chat.userName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                      )}

                      <div className="ml-2 w-[180px]">
                        <div className="flex justify-between items-end">
                          <div className="text-sm font-medium truncate text-black mb-1">
                            {chat.userName}
                          </div>
                        </div>

                        <p className="text-xs truncate w-full text-black">
                          {chat?.lastMessage || "Start Chat"}
                        </p>
                      </div>
                    </div>

                    <span
                      className="text-[10px] text-gray-500"
                      title={moment(chat.timestamp).format(
                        "dddd, DD MMM YYYY • hh:mm A"
                      )}
                    >
                      {chat.timestamp &&
                        moment(chat.timestamp).format("DD-MM-YYYY")}
                    </span>
                    <div className="flex gap-1 items-center">
                      {chat.unreadCount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.1 }}
                          className="flex items-center justify-center w-5 h-5 text-xs mt-1 text-[#22577E] border-1 border-green-900 bg-[#25d366] rounded-full font-medium"
                        >
                          {chat.unreadCount}
                        </motion.div>
                      )}
                      <CiMenuKebab className="text-gray-900" />
                    </div>
                  </div>
                </motion.div>
              ))} */}
            {transformedChats
              ?.slice()
              ?.sort((a, b) => new Date(b.replyTime) - new Date(a.replyTime))
              ?.map((chat, index) => {
                const isSelected = selectedInstaChat?.userName === chat.userName;

                return (
                  <motion.div
                    key={chat.srno || index}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1, delay: index * 0.03 }}
                    className={`group  cursor-pointer transition-all duration-200 mb-2 pr-2 relative `}
                    onClick={() => setSelectedInstaChat(chat)}
                  >
                    <div className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${isSelected
                      ? "border-gradient-insta shadow-md translate-x-1"
                      : "bg-white border border-gray-100 hover:border-gray-200"
                      }`}>
                      <div className="flex items-center gap-4 w-full overflow-hidden">
                        {/* Avatar Section */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`p-[2.5px] rounded-full transition-all duration-500 ${isSelected
                              ? "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
                              : "bg-gray-200"
                              }`}
                          >
                            {chat?.profile ? (
                              <img
                                src={chat.profile}
                                alt="avatar"
                                className="w-12 h-12 rounded-full object-cover border-2 border-white"
                              />
                            ) : (
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white uppercase transition-colors ${isSelected ? "bg-white text-[#ee2a7b]" : "bg-gray-50 text-gray-400"
                                  }`}
                              >
                                {chat.userName?.charAt(0) || "?"}
                              </div>
                            )}
                          </div>

                          {/* Status Indicator */}
                          <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${isSelected ? "bg-green-500" : "bg-gray-300"
                            }`}></span>
                        </div>

                        {/* Text Content Section */}
                        <div className="flex flex-col flex-grow min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className={`text-[14px] font-bold truncate tracking-tight transition-colors ${isSelected ? "text-gray-900" : "text-gray-700"
                              }`}>
                              {chat.userName}
                            </h4>
                          </div>

                          <p className={`text-[12.5px] truncate transition-colors ${isSelected ? "text-gray-600 font-medium" : "text-gray-400"
                            }`}>
                            {chat?.lastMessage || "Start a conversation"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between self-stretch min-w-fit pl-2">

                        <span
                          className={`text-[10px] font-bold text-slate-400 `}
                          title={moment(chat.timestamp).format(
                            "dddd, DD MMM YYYY • hh:mm A"
                          )}
                        >
                          {chat.timestamp &&
                            moment(chat.timestamp).format("DD-MM-YYYY")}
                        </span>
                        <div className="flex gap-2 mt-1 items-center">
                          {chat.unreadCount > 0 && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.1 }}
                              className="flex items-center justify-center w-5 h-5 text-xs mt-1 text-[#ffffff]  bg-[#000000] rounded-full font-medium"
                            >
                              {chat.unreadCount}
                            </motion.div>
                          )}
                          <CiMenuKebab className={`text-slate-400 hover:text-slate-600 transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

            {/* Load More */}
            {/* <div className="flex justify-center items-center m-4">
              <p
                className="border-2 border-gray-400 
            p-2 px-5 
            rounded-full 
            cursor-pointer 
            bg-[#F1D3CE]
            transition-colors duration-300 
            hover:bg-[#e8bcb5]
            active:bg-[#d9a39c]"
                onClick={() => setPageSize((prev) => prev + 10)}
              >
                Load more
              </p>
            </div> */}
            <div className="flex justify-center items-center py-8">
              <button
                onClick={() => setPageSize((prev) => prev + 10)}
                disabled={isLoading}
                className="relative group flex items-center gap-3 px-6 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-[#EECAD5] hover:shadow-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Subtle Loading Spinner / Icon */}
                <div className="flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-[#ee2a7b] rounded-full animate-spin" />
                  ) : (
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-[#ee2a7b] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>

                {/* Professional Label */}
                <span className="text-[11px] font-bold tracking-wider text-gray-600 group-hover:text-gray-900 transition-colors uppercase">
                  {isLoading ? "Fetching Chats..." : "Load Earlier Conversations"}
                </span>

                {/* Progress Bar (Visible only when loading) */}
                {isLoading && (
                  <motion.div
                    layoutId="loader"
                    className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-[#f9ce34] to-[#ee2a7b] rounded-full"
                  />
                )}
              </button>
            </div>
          </>
        )}

      {/* No conversations */}
      {hasFetchedOnce &&
        !isLoading &&
        instagramData?.selectedAccount &&
        transformedChats?.length === 0 && (
          <motion.div className="text-md text-gray-900 mb-2 flex flex-col items-center justify-center h-[90%]">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mb-6"
            >
              <Lottie
                animationData={Datanotfound}
                loop
                autoplay
                className="w-70 h-45"
              />
            </motion.div>

            <p className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] bg-clip-text text-transparent">
              No Conversations Found
            </p>

            <p className="text-sm text-gray-600 max-w-md text-center">
              There are currently no chats to display. They’ll appear here when
              available.
            </p>
          </motion.div>
        )}
    </div>
  );
};
