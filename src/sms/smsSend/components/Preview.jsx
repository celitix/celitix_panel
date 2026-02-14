
// ICONS
import {
  FaSmile,
  FaImage,
  FaPlus,
  FaMicrophone,
  FaSignal,
  FaWifi,
  FaBatteryFull,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FaReply } from "react-icons/fa6";

export const Preview = ({ inputDetails }) => {
  return (
    <>
      {/* <div className="smartphone">
        <div className="flex items-center justify-between px-4 py-1 bg-gray-100 text-black text-xs font-medium rounded-t-xl">
          <div>9:30</div>
          <div className="w-4 h-4 bg-black rounded-full" />
          <div className="flex items-center gap-1">
            <FaSignal className="text-[10px]" />
            <FaWifi className="text-[10px]" />
            <FaBatteryFull className="text-[12px]" />
          </div>
        </div>

        <div className="smartphone-content">
          <div className="flex border-b items-center gap-2 px-4 py-2">
            <div className="border w-7 h-7 rounded-full bg-white"></div>
            <p>{inputDetails?.senderId || "Sender ID"}</p>
          </div>
          <div className="p-3">
            {inputDetails.message && (
              <div className="bg-blue-500 text-white p-2 rounded-t-2xl rounded-br-2xl shadow-md max-w-lg mx-auto max-h-[15rem] overflow-y-auto">
                <pre className="text-sm font-medium break-words whitespace-pre-wrap px-1 py-2">
                  {inputDetails.message}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-2 py-1 rounded-full bg-white shadow-sm w-66 max-w-md mx-auto my-2">
          <div className="flex items-center flex-1 px-2 gap-2">
            <FaSmile className="text-gray-500 text-sm" />
            <input
              readOnly
              type="text"
              placeholder="Reply..."
              className="flex-1 outline-none text-sm text-gray-700 bg-transparent w-24 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 px-2">
            <FaReply className="text-gray-600 text-sm" />
            <FaImage className="text-gray-600 text-sm" />
            <FaPlus className="text-gray-600 text-sm" />
          </div>
          <div className="ml-2 p-2 bg-green-200 rounded-full hover:bg-green-300 transition duration-200 cursor-pointer">
            <FaMicrophone className="text-green-800 text-sm" />
          </div>
        </div>
      </div> */}
      <div className="flex flex-col items-center justify-center">
        {/* Smartphone Frame */}
        <div
          className="
          relative bg-gray-300 rounded-[2.5rem] p-2 shadow-2xl border-[6px] border-gray-400 
          flex flex-col transition-all duration-300 ease-in-out
          w-[260px] h-[520px]          /* mobile default */
          sm:w-[300px] sm:h-[580px]    /* small tablets */
          md:w-[300px] md:h-[640px]    /* tablets */
          lg:w-[280px] lg:h-[700px]    /* desktop */
          xl:w-[320px] xl:h-[700px]    /* desktop */
        "
        >
          {/* Top Status Bar */}
          <div className="flex items-center justify-between px-4 py-1 text-[11px] text-gray-800 font-medium">
            <span>9:30</span>
            <div className="flex items-center gap-1">
              <FaSignal className="text-gray-700" />
              <FaWifi className="text-gray-700" />
              <FaBatteryFull className="text-gray-700" />
            </div>
          </div>

          {/* Inner Phone Screen */}
          <div className="flex-1 bg-gradient-to-b from-[#fdfdfd] to-[#f5f7fa] rounded-2xl overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#f0f2f5] shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#c5cae9] flex items-center justify-center text-[#3f51b5] font-semibold">
                {inputDetails?.senderId?.charAt(0)?.toUpperCase() || "S"}
              </div>
              <p className="text-gray-800 font-semibold text-sm">
                {inputDetails?.senderId || "Sender ID"}
              </p>
            </div>

            {/* Message Area */}
            <div className="flex-1 px-3 sm:px-4 py-3 overflow-y-auto">
              {inputDetails?.message ? (
                <div className="flex justify-end mb-2">
                  <div className="bg-[#cce5ff] text-gray-900 px-3 py-2 rounded-2xl rounded-br-sm shadow-sm max-w-[80%] text-[12.5px] sm:text-[13.5px] whitespace-pre-wrap break-words">
                    {inputDetails.message}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center text-sm mt-8 italic">
                  Message preview will appear here...
                </div>
              )}
            </div>

            {/* Bottom Input Bar */}
            <div className="flex items-center px-3 sm:px-4 py-2 bg-white border-t shadow-inner">
              <FaSmile className="text-gray-500 text-lg mr-2 cursor-pointer" />
              <input
                type="text"
                placeholder="Message..."
                className="flex-1 text-sm md:text-[15px] outline-none bg-transparent text-gray-800 placeholder-gray-400"
                readOnly
              />
              <div className="flex items-center gap-2 ml-2">
                <FaImage className="text-gray-500 cursor-pointer" />
                <FaPlus className="text-gray-500 cursor-pointer" />
                <FaMicrophone className="text-[#4caf50] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
