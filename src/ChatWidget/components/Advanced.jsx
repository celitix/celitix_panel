import React, { useState } from "react";

// ICONS
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Advanced = () => {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className="rounded-xl border">
      <button
        onClick={() => setAdvancedOpen(!advancedOpen)}
        className={`w-full flex justify-between items-center p-4 text-left ${
          advancedOpen && "border-b border-gray-200 mb-4"
        }`}
      >
        <h2 className="text-lg font-medium">Advanced</h2>
        {advancedOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {advancedOpen && (
        <div className="space-y-7 px-4 pb-4">
          {/* Display widget when agents are offline */}
          <div className="grid grid-cols-4 items-start pr-8">
            <div className="col-span-1">
              <p className="text-sm text-gray-800">
                Display widget when agents are offline
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Visitors will be asked to create Tickets
              </p>
            </div>

            <div className="col-span-3 flex justify-start">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="peer sr-only"
                />

                {/* Track */}
                <div
                  className="w-12 h-7 bg-gray-400 rounded-full border border-gray-500 
                        peer-checked:bg-blue-600 transition"
                ></div>

                {/* Knob */}
                <div
                  className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow 
                        transition peer-checked:translate-x-5"
                ></div>
              </label>
            </div>
          </div>

          {/* Background image */}
          <div className="grid grid-cols-4 items-start pr-8">
            <div className="col-span-1">
              <p className="text-sm text-gray-800">Background image</p>
              <p className="text-xs text-gray-500 mt-1">(Home tab)</p>
            </div>

            <div className="col-span-3 flex justify-start">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="peer sr-only" />

                <div
                  className="w-12 h-7 bg-gray-400 rounded-full border border-gray-500 
                        peer-checked:bg-blue-600 transition"
                ></div>

                <div
                  className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow 
                        transition peer-checked:translate-x-5"
                ></div>
              </label>
            </div>
          </div>

          {/* Enable widget sounds */}
          <div className="grid grid-cols-4 items-start pr-8">
            <div className="col-span-1">
              <p className="text-sm text-gray-800">Enable widget sounds</p>
            </div>

            <div className="col-span-3 flex justify-start">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="peer sr-only"
                />

                <div
                  className="w-12 h-7 bg-gray-400 rounded-full border border-gray-500 
                        peer-checked:bg-blue-600 transition"
                ></div>

                <div
                  className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow 
                        transition peer-checked:translate-x-5"
                ></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advanced;
