import React, { useState } from "react";
import { motion } from "framer-motion";

// ICONS
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";

// COMPONENTS
import useWidgetStore from "../stores/useWidgetStore";

const VisibilityPosition = () => {
  const [activeVisibiltyTab, setActiveVisibiltyTab] = useState("mobile");
  const [display, setDisplay] = useState(true);
  const [size, setSize] = useState(50);
  const [showBgDropdown, setShowBgDropdown] = useState(false);
  const [showTextDropdown, setShowTextDropdown] = useState(false);

  // const [position, setPosition] = useState("left");
  // const [visibilityOpen, setVisibilityOpen] = useState(true);
  const {
    visibilityOpen,
    setVisibilityOpen,
    position,
    setPosition,
    buttonType,
    setButtonType,
    bgColor,
    textColor,
    minimizedValue,
    setMinimizedValue,
    setBgColor,
    setTextColor,
  } = useWidgetStore();

  const tabOptions = ["desktop", "mobile"];

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      {/* Accordion Header */}
      <button
        onClick={() => setVisibilityOpen(!visibilityOpen)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <h2 className="text-lg font-medium">Visibility and position</h2>
        {visibilityOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {visibilityOpen && (
        <div className="px-4 md:px-6 pb-6 animate-fadeIn">
          {/* Tabs */}
          <div className="flex border-b mb-6 gap-4 md:gap-6 overflow-x-auto">
            <div className="flex gap-6 border-b overflow-x-auto pb-2">
              {tabOptions.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveVisibiltyTab(tab);
                    if (tab.action) tab.action();
                  }}
                  className={`pb-2 flex flex-col items-center gap-1 capitalize min-w-[70px] ${
                    activeVisibiltyTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* DISPLAY TOGGLE */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-5 gap-3">
            <p className="text-sm font-medium text-gray-700 md:col-span-3">
              Display
            </p>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onClick={() => setDisplay(!display)}
              />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-all"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-all"></div>
            </label>
          </div>

          {/* DISPLAY LINKS */}
          {display ? (
            <div className="pl-0 md:pl-24 mb-6 space-y-1">
              <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                Hide on specific pages
              </p>
              <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                Hide or display for specific countries
              </p>
            </div>
          ) : (
            <div className="pl-0 md:pl-24 mb-6">
              <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                Learn about visibility and position
              </p>
            </div>
          )}

          {/* ===================================================================================== */}
          {/* DESKTOP TAB */}
          {/* ===================================================================================== */}
          {display && activeVisibiltyTab === "desktop" && (
            <>
              {/* WIDGET POSITION */}
              <div className="grid grid-cols-1 lg::grid-cols-12 gap-4 items-start mb-10">
                {/* Label */}
                <p className="text-sm font-medium text-gray-700 lg:col-span-3">
                  Widget position
                </p>

                {/* Options */}
                <div className="md:col-span-9 flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-12">
                  {/* Left */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="position"
                      checked={position === "left"}
                      onChange={() => setPosition("left")}
                      className="accent-blue-600"
                    />
                    Left
                  </label>

                  {/* Laptop Preview */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-14 border-2 border-gray-700 rounded-lg"></div>

                    <div className="flex items-center gap-4 mt-2">
                      <div
                        className={`w-3 h-3 rounded-full border ${
                          position === "left"
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-400"
                        }`}
                      ></div>

                      <div
                        className={`w-3 h-3 rounded-full border ${
                          position === "right"
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-400"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Right */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="position"
                      checked={position === "right"}
                      onChange={() => setPosition("right")}
                      className="accent-blue-600"
                    />
                    Right
                  </label>
                </div>
              </div>

              {/* BUTTON TYPE */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-8">
                <p className="text-sm font-medium text-gray-700 md:col-span-3">
                  Button type
                </p>

                <div className="md:col-span-9 flex gap-6 md:gap-10">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="button_type"
                      checked={buttonType === "corner"}
                      onChange={() => setButtonType("corner")}
                      className="accent-blue-600"
                    />
                    Corner
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="button_type"
                      checked={buttonType === "sidebar"}
                      onChange={() => setButtonType("sidebar")}
                      className="accent-blue-600"
                    />
                    Sidebar
                  </label>
                </div>
              </div>

              {/* SIDEBAR CUSTOMIZATION */}
              {buttonType === "sidebar" && (
                <>
                  {/* BACKGROUND COLOR */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start mb-6">
                    <p className="text-sm font-medium text-gray-700 lg:col-span-3">
                      Background color
                    </p>

                    <div className="relative md:col-span-9">
                      <button
                        onClick={() => setShowBgDropdown(!showBgDropdown)}
                        className="w-full md:w-52 border rounded-lg px-3 py-2 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full border"
                            style={{ background: bgColor }}
                          ></div>
                          <span className="text-sm">{bgColor}</span>
                        </div>
                        <IoIosArrowDown />
                      </button>

                      {showBgDropdown && (
                        <div className="mt-2 w-full md:w-60 bg-white shadow-xl rounded-xl border p-4 absolute z-50">
                          <p className="text-sm font-semibold mb-2">
                            Pick your color
                          </p>
                          <div className="space-y-2">
                            {[
                              { name: "Color 1", value: "#5D9CEB" },
                              { name: "Color 2", value: "#8CC751" },
                              { name: "Color 3", value: "#2CA87F" },
                              { name: "Color 4", value: "#D2553E" },
                            ].map((c) => (
                              <div
                                key={c.value}
                                onClick={() => {
                                  setBgColor(c.value);
                                  setShowBgDropdown(false);
                                }}
                                className="flex items-center gap-2 p-1 rounded-md cursor-pointer hover:bg-gray-100"
                              >
                                <div
                                  className="w-5 h-5 rounded-full border"
                                  style={{ background: c.value }}
                                ></div>
                                <span className="text-sm">{c.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TEXT COLOR */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start mb-6">
                    <p className="text-sm font-medium text-gray-700 lg:col-span-3">
                      Text color
                    </p>

                    <div className="relative md:col-span-9">
                      <button
                        onClick={() => setShowTextDropdown(!showTextDropdown)}
                        className="w-full md:w-52 border rounded-lg px-3 py-2 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full border"
                            style={{ background: textColor }}
                          ></div>
                          <span className="text-sm">{textColor}</span>
                        </div>
                        <IoIosArrowDown />
                      </button>

                      {showTextDropdown && (
                        <div className="mt-2 w-full md:w-60 bg-white shadow-xl rounded-xl border p-4 absolute z-50">
                          <p className="text-sm font-semibold mb-2">Themes</p>
                          <div className="space-y-2">
                            {[
                              { name: "White", value: "white" },
                              { name: "Black", value: "black" },
                              { name: "Blue", value: "#2563eb" },
                            ].map((c) => (
                              <div
                                key={c.value}
                                onClick={() => {
                                  setTextColor(c.value);
                                  setShowTextDropdown(false);
                                }}
                                className="flex items-center gap-2 p-1 rounded-md cursor-pointer hover:bg-gray-100"
                              >
                                <div
                                  className="w-5 h-5 rounded-full border"
                                  style={{ background: c.value }}
                                ></div>
                                <span className="text-sm">{c.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* LABEL */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start mb-6">
                    <p className="text-sm font-medium text-gray-700 lg:col-span-3">
                      Label
                    </p>
                    <input
                      type="text"
                      value={minimizedValue}
                      onChange={(e) => setMinimizedValue(e.target.value)}
                      className="border rounded-lg px-3 py-2 w-full md:w-60"
                      placeholder="Chat with us 👋"
                      maxLength={20}
                    />
                  </div>

                  {/* SIDEBAR POSITION */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start mb-10">
                    <p className="text-sm font-medium text-gray-700 lg:col-span-3">
                      Sidebar position
                    </p>

                    <div className="md:col-span-9 flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-12">
                      {/* Left */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sidebar_position"
                          checked={position === "left"}
                          onChange={() => setPosition("left")}
                          className="accent-blue-600"
                        />
                        Left
                      </label>

                      {/* Preview */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-14 border-2 border-gray-700 rounded-lg"></div>
                        <div className="flex items-center gap-4 mt-2">
                          <div
                            className={`w-3 h-3 rounded-full border ${
                              position === "left"
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-400"
                            }`}
                          ></div>
                          <div
                            className={`w-3 h-3 rounded-full border ${
                              position === "right"
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-400"
                            }`}
                          ></div>
                        </div>
                      </div>

                      {/* Right */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sidebar_position"
                          checked={position === "right"}
                          onChange={() => setPosition("right")}
                          className="accent-blue-600"
                        />
                        Right
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Learn More */}
              <div className="text-blue-600 text-sm cursor-pointer hover:underline flex gap-2 items-center mt-4">
                <ImportContactsOutlinedIcon />
                Learn about visibility and position
              </div>
            </>
          )}

          {/* ===================================================================================== */}
          {/* MOBILE TAB */}
          {/* ===================================================================================== */}
          {activeVisibiltyTab === "mobile" && (
            <>
              {display && (
                <>
                  {/* BUTTON POSITION */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start mb-10">
                    <p className="text-sm font-medium text-gray-700 lg:col-span-3">
                      Button position
                    </p>

                    <div className="md:col-span-9 flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-12">
                      {/* Left */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mobile_pos"
                          checked={position === "left"}
                          onChange={() => setPosition("left")}
                          className="accent-blue-600"
                        />
                        Left
                      </label>

                      {/* Preview */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-16 border-2 border-gray-700 rounded-xl"></div>
                        <div className="flex items-center gap-4 mt-2">
                          <div
                            className={`w-3 h-3 rounded-full border ${
                              position === "left"
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-400"
                            }`}
                          ></div>
                          <div
                            className={`w-3 h-3 rounded-full border ${
                              position === "right"
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-400"
                            }`}
                          ></div>
                        </div>
                      </div>

                      {/* Right */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mobile_pos"
                          checked={position === "right"}
                          onChange={() => setPosition("right")}
                          className="accent-blue-600"
                        />
                        Right
                      </label>
                    </div>
                  </div>

                  {/* BUTTON SIZE */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mb-4">
                    <p className="text-sm font-medium text-gray-700 lg:col-span-3">
                      Button size
                    </p>

                    <div className="md:col-span-9">
                      <motion.input
                        type="range"
                        min="0"
                        max="100"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full cursor-pointer"
                        style={{ accentColor: "#2563eb" }}
                      />

                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>small</span>
                        <span>medium</span>
                        <span>large</span>
                      </div>
                    </div>
                  </div>

                  {/* Learn More Footer */}
                  <div className="text-blue-600 text-sm cursor-pointer hover:underline flex gap-2 items-center mt-6">
                    <ImportContactsOutlinedIcon />
                    Learn about visibility and position
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VisibilityPosition;
