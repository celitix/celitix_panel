import React from "react";

// ICONS
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdOutlineSend, MdOutlineEmojiEmotions } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { BiLink } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { LuReply, LuForward } from "react-icons/lu";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

const EmailPreview = ({ subject, toEmail, message, hostName, userName }) => {
  return (
    <div className=" bg-gray-50 p-1 h-full">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden  mx-auto border border-gray-300 ">
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          {/* Left Section */}
          <div>
            {/* Subject Line */}
            <h2 className="text-[17px] font-semibold text-gray-800 mb-1">
              {subject || "Rider Recap: March Month"}
            </h2>
          </div>
          <div className="flex justify-between">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {(hostName && hostName[0]?.toUpperCase()) || "U"}
                </span>
              </div>

              {/* Name + Email */}
              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-900 text-[15px]">
                    {hostName ? hostName.split("@")[0] : "Uber"}
                  </span>
                  <MdVerified className="text-blue-500 text-[16px]" />
                </div>
                <span className="text-sm text-gray-500">
                  {userName || "user-recaps@uber.com"}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-right leading-tight">
              <div className="text-sm text-gray-800 font-medium">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-xs text-gray-500">Just now</div>
            </div>
          </div>
        </div>

        {/* Top Section */}
        <div className="relative bg-[#cfe9e4] p-6 sm:p-6 ">
          {/* Car Image */}
          <div className=" flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/743/743131.png"
              alt="Car"
              className="w-52 sm:w-44"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-2xl mx-auto  shadow-sm bg-white overflow-hidden">
          {/* Top To section */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">To:</span>
              <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-full">
                <div className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-semibold">
                  {(toEmail && toEmail[0]?.toUpperCase()) || "U"}
                </div>
                <span className="text-sm text-gray-800 font-medium">
                  {toEmail || "Uber"}
                </span>
                <span className="text-xs text-gray-400 cursor-pointer hover:text-red-500 transition">
                  ×
                </span>
              </div>
            </div>
            {/* <div className="text-gray-400 text-xs">Cc &nbsp; Bcc</div> */}
          </div>

          {/* Body text area */}
          <div className="p-3">
            <p className="text-gray-700 text-sm leading-relaxed overflow-auto min-h-30 2xl:min-h-40 xl:min-h-40">
              {message ||
                `Hello, I have already unsubscribed from the mailing list, but I am still receiving emails. Could you please ensure that I no longer receive any further messages?`}
            </p>
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-50">
            {/* <div className="flex items-center space-x-3 text-gray-500">
                <span className="text-sm font-semibold text-[#a855f7]">AI</span>
                <AiOutlinePaperClip size={18} />
                <BiLink size={18} />
                <IoMdMail size={18} />
                <MdOutlineEmojiEmotions size={18} />
                <FiTrash2 size={18} />
                </div> */}

            {/* Send button */}
            {/* <button className="flex items-center gap-1 bg-gray-800 hover:bg-gray-900 text-white text-sm px-4 py-1.5 rounded-full">
                <PiPaperPlaneTiltBold size={14} />
                Send
                </button> */}

            <div className="flex items-center justify-between  bg-white py-1 text-sm text-gray-600 gap-5">
              {/* Left: Reply & Forward */}
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                  <LuReply size={16} className="rotate-180" />
                  <span>Reply</span>
                </button>
                <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                  <LuForward size={16} />
                  <span>Forward</span>
                </button>
              </div>

              {/* Right: Mark as unseen */}
              <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                <IoEyeOffOutline size={17} />
                <span>Mark as unseen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
