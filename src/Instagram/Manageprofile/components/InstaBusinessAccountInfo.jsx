import React from "react";

// ICONS
import { FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { LuMenu } from "react-icons/lu";


const InstaBusinessAccountInfo = () => {
  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex justify-between items-center mb-4 p-2">
        <div className="flex flex-col">
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            <img
              src="https://cdn.simpleicons.org/instagram/E4405F"
              alt="Instagram Logo"
              className="w-6 h-6 mt-3"
            />
            Instagram Business Accounts
          </h1>
          <p className="text-xs text-gray-400 ml-8">
            Manage and monitor your Instagram Business Accounts with ease
          </p>
        </div>

        <div className="flex md:flex-row flex-col gap-2">
          <button className="text-md bg-blue-400 text-white px-2 py-1 rounded-lg hover:bg-blue-500">
            Business Account
          </button>
          <button className="text-md bg-blue-400 text-white px-2 py-1 rounded-lg hover:bg-blue-500">
            Instagram Account
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full h-auto rounded-lg p-4 flex flex-col shadow-lg cursor-pointer bg-white">
          <h1 className="text-lg font-semibold text-gray-600">Total Account</h1>
          <p className="text-md text-black font-bold">1</p>
        </div>
        <div className="w-full h-auto rounded-lg p-4 flex flex-col shadow-lg cursor-pointer bg-white">
          <h1 className="text-md font-semibold text-gray-600">
            Active Account
          </h1>
          <p className="text-md text-black font-bold">1</p>
        </div>
        <div className="w-full h-auto rounded-lg p-4 flex flex-col shadow-lg cursor-pointer bg-white">
          <h1 className="text-md font-semibold text-gray-600">
            High Quality Account
          </h1>
          <p className="text-md text-black font-bold">1</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4 p-2">
        <div className="w-full rounded-xl p-5 shadow-lg relative bg-white">
          {/* Top Instagram gradient border */}
          <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"></div>

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-bold text-black">Proactive</h2>
            <span className="ml-2 text-white text-md bg-green-600 rounded-full px-1 py-1"><FaCheck className="text-white text-[10px]"/></span>
          </div>
          <div className="flex items-center mb-4 gap-2">
            <FaEye className="text-green-600 mr-2 text-[18px]" />
            <TfiReload className="text-green-600 mr-2 text-[16px]" />
            <LuMenu className="text-gray-600 mr-2 text-[18px]" />
            </div>
          </div>

          {/* Info rows */}
          <div className="space-y-2 text-sm">
            <div className="flex gap-8">
              <p className="text-gray-600 flex flex-col">
                <span className="font-semibold text-gray-500 text-sm">
                  INSTA Mobile No:
                </span>{" "}
                <span className="text-black font-semibold text-xs">
                  919251006460
                </span>
              </p>
              <p className="text-gray-600 flex flex-col">
                <span className="font-semibold text-gray-500 text-sm">
                  Created On:
                </span>{" "}
                <span className="text-black font-semibold text-xs">
                  2025-05-14
                </span>
              </p>
            </div>
            <div className="flex gap-17">
              <p className="text-gray-600 flex flex-col">
                <span className="font-semibold text-gray-500 text-sm">
                  Expiry Date:
                </span>{" "}
                <span className="text-black font-semibold text-xs">
                  2025-09-30
                </span>
              </p>
              <p className="text-gray-600 flex flex-col">
                <span className="font-semibold text-gray-500 text-sm">
                  Verification Status:
                </span>{" "}
                <span className="text-black font-semibold text-xs">
                  Verified
                </span>
              </p>
            </div>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-700">Phone Status:</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-green-600 text-white text-xs">
                Connected
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-700">Quality:</span>
              <span className="ml-2 px-2 py-0.5 font-semibold rounded-full text-gray-800 text-xs">
                High Quality
              </span>
            </p>
          </div>

          {/* Divider */}
          <hr className="my-4 border-t border-gray-200" />

          {/* Additional Information */}
          <div className="text-sm space-y-1">
            <div className="flex gap-8">
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                Messaging Limit:
              </span>
              <span className="text-black font-semibold text-xs">1000</span>
            </p>
          

            {/* Business Status */}
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                Business Status:
              </span>
              <span className="text-black font-semibold text-xs">
                APPROVED
              </span>
            </p>
            </div>

            <div className="flex gap-6">
            
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                INSTA Account ID:
              </span>
              <span className="text-black font-semibold text-xs">
                708046548257803
              </span>
            </p>

            
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                INSTA Name:
              </span>
              <span className="text-black font-semibold text-xs">PPSPL</span>
            </p>
            </div>

            <div className="flex gap-6">
            {/* Phone Number ID */}
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                Phone Number ID:
              </span>
              <span className="text-black font-semibold text-xs">
                655075943464110
              </span>
            </p>

            {/* Business Name with Instagram gradient */}
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                Business Name:
              </span>
              <span className="bg-clip-text text-black font-semibold text-xs">
                Proactive_Official
              </span>
            </p>
            </div>

            <div className="flex gap-10">
            {/* Business ID */}
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                Business ID:
              </span>
              <span className="text-black font-semibold text-xs">
                1045361349789731
              </span>
            </p>

            {/* MM Lite Eligibility */}
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                MM Lite Eligibility:
              </span>
              <span className="text-black font-semibold text-xs">
                ONBOARDED
              </span>
            </p>
            </div>

            {/* Insights */}
            <p className="text-gray-600 flex flex-col">
              <span className="font-semibold text-gray-500 text-sm">
                Insights:
              </span>
              <span className="text-black font-semibold text-xs">
                Enabled
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstaBusinessAccountInfo;
