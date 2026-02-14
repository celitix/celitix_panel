import React, { useState } from "react";

// ICONS
import { Send } from "lucide-react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HouseIcon from "@mui/icons-material/House";

// COMPONENTS
import useWidgetStore from "../stores/useWidgetStore";

const HomeScreen = () => {
  const {
    setScreen,
    selected,
    selectedActionColor,
    homeHeader,
    homeMessage,
    onlineStatus,
    offlineStatus,
    previewImage,
    conversationStarters,
    setSendConversationStarter,
  } = useWidgetStore();

  return (
    <div className="flex flex-col h-full w-full">
      {/* TOP SECTION */}
      <div
        style={{ backgroundColor: selected?.value }}
        className="
      text-white p-4 sm:p-6 pb-10 
      rounded-t-3xl 
      min-h-[180px] sm:min-h-[220px] 
      flex flex-col justify-between
    "
      >
        {/* TOP AVATAR */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center font-bold">
          {previewImage ? (
            <img
              src={previewImage}
              alt="preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center rounded-full">
              B
            </div>
          )}
        </div>

        {/* HEADER + MESSAGE */}
        <div className="mt-3">
          <h2 className="text-lg sm:text-xl font-bold whitespace-normal break-words leading-tight">
            {homeHeader}
          </h2>

          <p className="mt-1 text-xs sm:text-sm whitespace-normal break-words leading-snug">
            {homeMessage}
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      {conversationStarters.some((q) => q.enabled) && (
        <div className="px-3 sm:px-4 -mt-6 mb-6">
          <div
            className="
        bg-white shadow-md rounded-2xl 
        p-2 
        max-h-[200px] sm:max-h-[250px] 
        overflow-y-auto
      "
          >
            {conversationStarters
              .filter((q) => q.enabled)
              .map((item, index) => (
                <div
                  key={index}
                  className="
                flex justify-between items-center 
                p-3 
                border-b last:border-b-0
                cursor-pointer
                hover:bg-gray-50
                rounded-lg
              "
                  onClick={() => {
                    setSendConversationStarter(item.text);
                    setScreen("chat");
                  }}
                >
                  <p className="text-xs sm:text-sm">{item.text}</p>
                  <span className="text-gray-400 text-sm">{">"}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* CHAT WITH US CARD */}
      <div className="px-3 sm:px-4 -mt-6">
        <div
          className="
        bg-white shadow-md rounded-2xl 
        p-4 
        cursor-pointer 
        hover:shadow-xl 
        transition 
        border
      "
          onClick={() => setScreen("chat")}
        >
          <div className="flex justify-between items-center">
            
            <div className="max-w-[70%] sm:max-w-[200px]">
              <p className="font-semibold text-sm sm:text-base">Chat with us</p>
              <p className="text-[10px] sm:text-xs text-gray-500 break-words">
                {offlineStatus}
              </p>
            </div>

            <div className="p-2 rounded-full">
              <Send style={{ color: selectedActionColor?.value }} size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="mt-4 border-t p-3">
        <div className="flex justify-center gap-10 text-gray-500 text-xs sm:text-sm">
          {/* Home */}
          <div
            style={{ color: selectedActionColor?.value }}
            className="flex flex-col items-center"
          >
            <HouseIcon fontSize="small" />
            Home
          </div>

          {/* Chat */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setScreen("chat")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = selectedActionColor?.value)
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
          >
            <ChatBubbleOutlineIcon fontSize="small" />
            Chat
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mb-2 border-t p-3">
        <p className="text-[9px] sm:text-[10px] opacity-60 text-center">
          POWERED BY CHATWIDGET
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
