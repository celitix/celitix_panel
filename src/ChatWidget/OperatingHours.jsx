

import React, { useState } from "react";

// MUI MATERIAL
import Slider from "@mui/material/Slider";

// ICONS
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const defaultHours = {
  Monday: [450, 1035],
  Tuesday: [450, 1035],
  Wednesday: [450, 1035],
  Thursday: [450, 1035],
  Friday: [450, 1035],
  Saturday: null,
  Sunday: null,
};

const days = Object.keys(defaultHours);

// Minutes → 12-hour time
const formatTime = (mins) => {
  const h = (mins / 60) | 0;
  const m = mins % 60;
  const suf = h >= 12 ? "PM" : "AM";
  const hour = ((h + 11) % 12) + 1;
  return `${hour}:${String(m).padStart(2, "0")} ${suf}`;
};

const OperatingHours = () => {
  const [enabled, setEnabled] = useState(false);
  const [hours, setHours] = useState(defaultHours);

  const [hoverDay, setHoverDay] = useState(null);

  const handleSlider = (day, val) => {
    setHours({ ...hours, [day]: val });
  };

  const deleteHours = (day) => {
    setHours({ ...hours, [day]: null });
  };

  const addHours = (day) => {
    setHours({ ...hours, [day]: [540, 1080] }); // Default 9 AM – 6 PM
  };

  return (
    <div className="p-4 w-full">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Operating hours
        </h2>

        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-md border border-green-300">
          <DiamondOutlinedIcon sx={{ fontSize: 15 }} />
          Paid
        </span>
      </div>

      <p className="text-gray-500 text-sm mt-2 max-w-xl">
        Set a schedule when you are available to receive new messages, so it
        will automatically change your online/offline status.
      </p>

      {/* Toggle */}
      <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-800">
        <span className="font-semibold">Operating hours</span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
            className="sr-only peer"
          />

          <div
            className="w-11 h-6 bg-gray-300 rounded-full transition 
                          peer-checked:bg-blue-600"
          ></div>

          <div
            className="absolute left-0.5 top-0.5 w-5 h-5 bg-white
                          rounded-full shadow transition
                          peer-checked:translate-x-5"
          ></div>
        </label>

        <span className="text-gray-800 font-semibold">are enabled.</span>

        <HelpCenterOutlinedIcon
          sx={{ fontSize: 18 }}
          className="text-gray-400 cursor-pointer"
        />

        <span className="ml-4 font-medium">Edit for</span>
        <select className="border rounded-lg px-3 py-1.5 bg-white outline-none w-40">
          <option>Anshu (You)</option>
        </select>
      </div>

      {/* MAIN UI */}
      {enabled && (
        <div className="mt-8 space-y-8 border-t pt-6">
          {days.map((day) => (
            <div
              key={day}
              onMouseEnter={() => setHoverDay(day)}
              onMouseLeave={() => setHoverDay(null)}
            >
              {/* DAY HEADER */}
              <div className="flex justify-between pr-4 mb-1">
                <span className="font-medium text-gray-700">{day}</span>

                {hours[day] ? (
                  <span className="text-sm text-gray-600">
                    {formatTime(hours[day][0])} — {formatTime(hours[day][1])}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500 italic">
                    I'm offline
                  </span>
                )}
              </div>

              {/* SLIDER OR ADD BUTTON */}
              {hours[day] ? (
                <div className="flex flex-col items-center gap-1 w-[70%]">
                  {/* Slider */}
                  <Slider
                    value={hours[day]}
                    min={0}
                    max={1440}
                    onChange={(e, val) => handleSlider(day, val)}
                    sx={{ width: "100%", color: "#2563eb" }}
                  />

                  {/* Delete Button (on hover) */}
                  {hoverDay === day && (
                    <div className="relative group">
                      <button
                        onClick={() => deleteHours(day)}
                        className="text-blue-700 text-sm bg-white shadow-md p-1 rounded-lg absolute"
                      >
                        <DeleteOutlineOutlinedIcon />
                      </button>
                      <span
                        className="absolute left-0 top-12  -translate-y-1/2 
               bg-white text-gray-700 text-xs py-1 px-2 rounded 
               opacity-0 group-hover:opacity-100 transition 
               whitespace-nowrap pointer-events-none shadow-lg"
                      >
                        Delete this time period
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[70%] h-[2px] bg-gray-200 relative flex flex-col justify-center items-center">
                  {/* + ADD BUTTON ON HOVER */}
                  {hoverDay === day && (
                     <div className="relative group">
                    <button
                      onClick={() => addHours(day)}
                      // className="absolute -top-4 left-0 text-blue-600 text-sm hover:underline"
                       className="text-blue-700 text-lg font-semibold bg-white shadow-md px-1 py-1.5 rounded-lg absolute"
                    >
                      + 
                    </button>
                     <span
                        className="absolute left-0 top-12  -translate-y-1/2 
               bg-white text-gray-700 text-xs py-1 px-2 rounded 
               opacity-0 group-hover:opacity-100 transition 
               whitespace-nowrap pointer-events-none shadow-lg"
                      >
                       Add new Time Period
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SAVE BUTTON */}
      {enabled && (
        <div className="mt-10">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default OperatingHours;
