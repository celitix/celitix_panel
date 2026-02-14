import React from "react";
import { FiMail, FiUser, FiCornerDownLeft } from "react-icons/fi";

const Preview = ({
  subject,
  fromName,
  fromEmail,
  replyEmail,
  emailContent,
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-full">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 flex items-center gap-3">
        <FiMail size={22} />
        <h2 className="text-lg font-semibold tracking-wide">
          Email Preview
        </h2>
      </div>

      {/* Main Card */}
      <div className="p-5 space-y-4">

        {/* Subject */}
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
          {subject || "No Subject"}
        </h3>

        {/* Meta Info */}
        <div className="bg-gray-50 rounded-xl p-3 border text-sm space-y-2">

          <div className="flex items-center gap-2">
            <FiUser className="text-blue-500" />
            <span className="font-semibold text-gray-700">
              From:
            </span>
            <span>
              {fromName || "—"}
              
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiMail className="text-blue-500" />
            <span className="font-semibold text-gray-700">
              From Email:
            </span>
            <span>
              {fromEmail || "—"}{" "}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FiCornerDownLeft className="text-green-500" />
            <span className="font-semibold text-gray-700">
              Reply To:
            </span>
            <span>
              {replyEmail || "—"}
            </span>
          </div>

        </div>

        {/* Body */}
        <div className="bg-white rounded-xl border shadow-inner p-4 min-h-[360px] max-h-[320px] overflow-y-auto">

          <p className="text-sm font-semibold text-gray-600 mb-2">
            Message Content
          </p>

          {emailContent ? (
            <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {emailContent}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">
              Select a template to see preview...
            </p>
          )}

        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full bg-gray-50 py-3 text-xs text-center text-gray-500 border-t ">
        ✨ Live Preview • Auto Updates
      </div>

    </div>
  );
};

export default Preview;
