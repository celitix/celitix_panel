import React, { useEffect, useState } from "react";
import { useSettings } from "@/context/LiveChatSettingContext";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { getWabaList } from "@/apis/Whatsapp/Whatsapp";
import {
  BiMessageSquareDetail,
  BiCog,
  BiUserCircle,
  BiChevronRight,
} from "react-icons/bi";
import { FaInstagram, FaRegCommentDots } from "react-icons/fa";
import CustomTabsMaterial from "@/instagram/components/CustomTabsMaterial";
import { BlockUser } from "../blockUser";
import Unsubscribe from "../unsubscribe/Unsubscribe";
import WhatsappLiveChatSettings from "./WhatsappLiveChatSettings";
import { FaWhatsapp } from "react-icons/fa";
const WhatsappLiveChatSet = () => {
  const { selectedWabaUser, setSelectedWabaUser } = useSettings();
  const tabsData = [
    {
      label: "Agent Settings",
      value: "agentsettings",
      icon: BiCog,
      content: <WhatsappLiveChatSettings selectedWabaUser={selectedWabaUser} />,
    },
    {
      label: "Block User",
      value: "blockusers",
      icon: BiUserCircle,
      content: <BlockUser selectedWabaUser={selectedWabaUser} />,
    },
    {
      label: "Unsubscribe Report",
      value: "unsubscribe",
      icon: MdOutlineUnsubscribe,
      content: <Unsubscribe selectedWabaUser={selectedWabaUser} />,
    },
  ];

  return (
    <div>
      <div className="p-2 bg-gray-50 rounded-md h-[87vh]">
        {selectedWabaUser ? (
          <div className="animate-in fade-in duration-500">
            <CustomTabsMaterial
              tabsData={tabsData}
              defaultValue="agentsettings"
            />
          </div>
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
                Select a WhatsApp Business (WABA) account from the dropdown above to start
                configuring{" "}
                <span className="font-semibold text-gray-700">
                  Automation, Agent Settings, Block User
                </span>{" "}
                and{" "}
                <span className="font-semibold text-gray-700">
                  Unsubscribe Report.
                </span>
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
    </div>
  );
};

export default WhatsappLiveChatSet;
