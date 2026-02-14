import React, { useState } from "react";
import toast from "react-hot-toast";

// ICONS
import { FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { LuMenu } from "react-icons/lu";

//  APIS
import { changeInstaAccStatus } from "@/apis/instagram/Instagram";

const InstaBusinessAccountInfo = ({ instaUsers }) => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;

    const nextValue = !enabled;
    setEnabled(nextValue);

    if (!nextValue) return;

    setLoading(true);

    try {
      const data = {
        businessInstaUserId: instaUsers[0].businessInstaUserId,
        instaOffDetailSrNo: instaUsers[0].instaOffDetailSrNo,
        status: 1,
      };
      const res = await changeInstaAccStatus(data);

      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Status is not update ");
      setEnabled(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-50 bg-gray-100 rounded-xl overflow-scroll">
      {instaUsers.map((acc, i) => (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4 p-2">
          <div
            className="w-full rounded-xl p-5 shadow-lg relative bg-white"
            index={i}
          >
            {/* Top Instagram gradient border */}
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center mb-4">
                <h2 className="text-lg font-bold text-black">{acc.userName}</h2>
                <span className="ml-2 text-white text-md bg-green-600 rounded-full px-1 py-1">
                  <FaCheck className="text-white text-[10px]" />
                </span>
              </div>
              <div className="flex items-center mb-4 gap-2">
                <FaEye className="text-green-600 mr-2 text-[18px]" />
                <TfiReload className="text-green-600 mr-2 text-[16px]" />
                <LuMenu className="text-gray-600 mr-2 text-[18px]" />

                {/* Toggle btn */}
                <button
                  onClick={handleToggle}
                  className={`
        relative inline-flex h-3 w-7 items-center rounded-full
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-green-400
        ${enabled ? "bg-green-500" : "bg-gray-300"}
      `}
                >
                  <span
                    className={`
          inline-block h-2 w-2 transform rounded-full bg-white shadow-md
          transition-transform duration-300
          ${enabled ? "translate-x-5" : "translate-x-1"}
        `}
                  />
                </button>
              </div>
            </div>

            {/* Info rows */}


            <hr className="my-4 border-t border-gray-200" />

            {/* Additional Information */}
            <div className="text-sm space-y-1">
              <div className="flex gap-6 items-center justify-between">
                <p className="text-gray-600 flex flex-col">
                  <span className="font-semibold text-gray-500 text-sm">
                    INSTA Account ID:
                  </span>
                  <span className="text-black font-semibold text-xs">
                    {acc?.instaUserId}
                  </span>
                </p>

                <p className="text-gray-600 flex flex-col">
                  <span className="font-semibold text-gray-500 text-sm">
                    INSTA Name:
                  </span>
                  <span className="text-black font-semibold text-xs">
                    {acc?.userName}
                  </span>
                </p>
                <p className="text-gray-600 flex flex-col">
                  <span className="font-semibold text-gray-500 text-sm">
                    Business ID:
                  </span>
                  <span className="text-black font-semibold text-xs">
                    {acc?.businessInstaUserId}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstaBusinessAccountInfo;
