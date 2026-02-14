import React from "react";

// ICONS
import {
  FiPhone,
  FiChevronLeft,
  FiWifi,
  FiBatteryCharging,
  FiMoreVertical,
} from "react-icons/fi";
import { LuReply } from "react-icons/lu";
import { BsThreeDotsVertical, BsCheck2 } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";

const CallingPreview = ({ visibility }) => {
  return (
    <div className="flex justify-center items-center p-6 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-200 h-full">
      <div className="w-[330px] bg-white rounded-2xl overflow-hidden shadow-md border relative">
        {/* --- TOP STATUS BAR (LIKE ANDROID) --- */}
        <div className="flex justify-between px-5 py-2 text-[12px] text-black font-medium">
          <span>12:30</span>
          <div className="flex items-center gap-1">
            <FiWifi size={16} />
            <FiBatteryCharging size={16} />
          </div>
        </div>

        {/* --- CHAT HEADER --- */}
        <div className="px-4 py-3 bg-white flex items-center shadow">
          <FiChevronLeft size={22} />

          <div className="ml-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-[#25D366] text-white font-bold rounded-full flex items-center justify-center">
              S
            </div>

            <div>
              <p className="font-semibold text-[14px]">Spruce</p>
              <p className="text-[11px] text-gray-500 flex items-center">
                Business Account
                <span className="ml-1 w-3 h-3 bg-blue-500 rounded-full"></span>
              </p>
            </div>
          </div>

          {/* Call Button */}
          <div className="ml-auto mr-3">
            <div className="w-10 h-10 flex items-center justify-center">
              {visibility === "show" && (
                <FiPhone size={19} className="text-[#e05d53]" />
              )}
            </div>
          </div>

          <FiMoreVertical size={20} />
        </div>
        <div className="bg-[#D3CFC7] pb-10">
          {/* YESTERDAY TAG */}
          <div className="text-center text-[11px] text-gray-500 py-2">
            Yesterday
          </div>

          {/* GREEN INFO BOX */}
          <div className="mx-3 bg-[#e6fff1] text-[#075E54] text-[11px] p-3 rounded-md border border-[#c6f5dd]">
            This business uses a secure service from Meta to manage this chat.
            Learn more
          </div>

          {/* CHAT AREA */}
          <div className="p-4 space-y-4">
            {/* MESSAGE BUBBLE */}
            <div className="bg-white shadow-sm border rounded-md w-fit max-w-[85%]">
              <div className="p-3">
                <p className="text-sm text-gray-700">Hi, welcome to Spruce</p>
                <p className="text-sm text-gray-700 mt-1">
                  What can we help you with?
                </p>

                {/* TIME + DOUBLE CHECK */}
                <p className="text-[11px] text-gray-400 mt-1 flex justify-end gap-1 items-center">
                  11:59 <BsCheck2 size={14} />
                </p>
              </div>

              <div className="bg-white border-t rounded-md shadow-sm overflow-hidden">
                <button className="w-full flex items-center p-3 border-b text-[#075E54] text-sm font-medium">
                  <LuReply 
                    size={20}
                    className="text-[#075E54] mr-2"
                  />
                  Check delivery status
                </button>

                <button className="w-full flex items-center p-3 border-b text-[#075E54] text-sm font-medium">
                  <LuReply 
                    size={20}
                    className="text-[#075E54] mr-2"
                  />
                  Order issue
                </button>

                <button className="w-full flex items-center p-3 text-[#075E54] text-sm font-medium">
                  <FiPhone size={18} className="mr-2 text-[#075E54]" />
                  Call to reschedule
                </button>
              </div>
            </div>

            {/* INTERACTIVE BUTTON SET */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallingPreview;
