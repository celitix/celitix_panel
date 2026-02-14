import React, { useState } from "react";

// ICONS
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { IoMdColorFilter } from "react-icons/io";
import { BsBookHalf } from "react-icons/bs";

// COMPONENTS
import useWidgetStore from "../stores/useWidgetStore";

const General = () => {
  const { colors, selected, actionColors, selectedActionColor, setWidget } =
    useWidgetStore();

  const [generalOpen, setGeneralOpen] = useState(true);
  const [openBgColor, setOpenBgColor] = useState(false);
  const [openAcColor, setOpenAcColor] = useState(false);

  return (
    <div className="bg-white rounded-xl border">
      {/* Accordion header */}
      <button
        onClick={() => setGeneralOpen(!generalOpen)}
        className={`w-full flex justify-between items-center p-4 text-left ${
          generalOpen && "border-b border-gray-200 mb-5"
        }`}
      >
        <h2 className="text-lg font-medium">General</h2>
        {generalOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {generalOpen && (
        <div className="px-4 sm:px-6 pb-6 space-y-8 animate-fadeIn">
          {/* BACKGROUND COLOR */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-20">
            <label className="text-sm font-normal mt-1 sm:mt-2">
              Background color
            </label>

            <div className="relative sm:col-span-3 w-full sm:w-40">
              <button
                onClick={() => setOpenBgColor(!openBgColor)}
                className="w-full flex items-center justify-between border rounded-lg px-3 py-2 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full border"
                    style={{
                      backgroundColor:
                        typeof selected === "string"
                          ? selected
                          : selected?.value,
                    }}
                  ></span>

                  <span className="text-sm text-gray-700 truncate">
                    {typeof selected === "string"
                      ? selected.toUpperCase()
                      : selected?.name}
                  </span>
                </div>

                <IoIosArrowDown
                  className={`transition-transform ${
                    openBgColor ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openBgColor && (
                <div className="absolute z-50 mt-2 w-full bg-white border shadow-lg rounded-xl py-2 animate-fadeIn">
                  {/* Pick custom color */}
                  <div
                    className="px-4 py-2 text-sm flex items-center gap-2 border-b cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      document.getElementById("hiddenBgColorPicker").click()
                    }
                  >
                    <IoMdColorFilter className="text-gray-600" />
                    Pick your color
                  </div>

                  <input
                    id="hiddenBgColorPicker"
                    type="color"
                    className="sr-only"
                    value={selected?.value || "#000000"}
                    onChange={(e) =>
                      setWidget({
                        selected: {
                          name: "Custom Color",
                          value: e.target.value,
                        },
                      })
                    }
                  />

                  {/* Current Color */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div
                      className="h-5 w-5 rounded-full border"
                      style={{
                        backgroundColor:
                          typeof selected === "string"
                            ? selected
                            : selected?.value,
                      }}
                    ></div>
                    <span className="text-gray-700 text-sm">
                      {typeof selected === "string"
                        ? selected.toUpperCase()
                        : selected?.value}
                    </span>
                  </div>

                  {/* Themes */}
                  <div className="px-4 pb-1 text-xs text-gray-400 uppercase tracking-wider">
                    Themes
                  </div>

                  <ul className="max-h-60 overflow-auto">
                    {colors?.map((c) => (
                      <li
                        key={c.name}
                        onClick={() => {
                          setWidget({ selected: c });
                          setOpenBgColor(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer text-sm rounded-md mx-2 hover:bg-gray-100 transition ${
                          selected?.value === c.value
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        <span
                          className="h-4 w-4 rounded-full border"
                          style={{ backgroundColor: c.value }}
                        ></span>
                        {c.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ACTION COLOR */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-20">
            <label className="text-sm font-normal mt-1 sm:mt-2">
              Action color
            </label>

            <div className="relative sm:col-span-3 w-full sm:w-40">
              <button
                onClick={() => setOpenAcColor(!openAcColor)}
                className="w-full flex items-center justify-between border rounded-lg px-3 py-2 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full border"
                    style={{
                      backgroundColor:
                        typeof selectedActionColor === "string"
                          ? selectedActionColor
                          : selectedActionColor?.value,
                    }}
                  ></span>

                  <span className="text-sm text-gray-700 truncate">
                    {typeof selectedActionColor === "string"
                      ? selectedActionColor.toUpperCase()
                      : selectedActionColor?.name}
                  </span>
                </div>

                <IoIosArrowDown
                  className={`transition-transform ${
                    openAcColor ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openAcColor && (
                <div className="absolute z-50 mt-2 w-full bg-white border shadow-lg rounded-xl py-2 animate-fadeIn">
                  {/* Pick custom color */}
                  <div
                    className="px-4 py-2 text-sm flex items-center gap-2 border-b cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      document.getElementById("hiddenAcColorPicker").click()
                    }
                  >
                    <IoMdColorFilter className="text-gray-600" />
                    Pick your color
                  </div>

                  <input
                    id="hiddenAcColorPicker"
                    type="color"
                    className="sr-only"
                    value={selectedActionColor?.value || "#000000"}
                    onChange={(e) =>
                      setWidget({
                        selectedActionColor: {
                          name: "Custom Color",
                          value: e.target.value,
                        },
                      })
                    }
                  />

                  {/* Current Color */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div
                      className="h-5 w-5 rounded-full border"
                      style={{
                        backgroundColor:
                          typeof selectedActionColor === "string"
                            ? selectedActionColor
                            : selectedActionColor?.value,
                      }}
                    ></div>
                    <span className="text-gray-700 text-sm">
                      {typeof selectedActionColor === "string"
                        ? selectedActionColor.toUpperCase()
                        : selectedActionColor?.value}
                    </span>
                  </div>

                  {/* Themes */}
                  <div className="px-4 pb-1 text-xs text-gray-400 uppercase tracking-wider">
                    Themes
                  </div>

                  <ul className="max-h-60 overflow-auto">
                    {actionColors?.map((c) => (
                      <li
                        key={c.name}
                        onClick={() => {
                          setWidget({ selectedActionColor: c });
                          setOpenAcColor(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer text-sm rounded-md mx-2 hover:bg-gray-100 transition ${
                          selectedActionColor?.value === c.value
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        <span
                          className="h-4 w-4 rounded-full border"
                          style={{ backgroundColor: c.value }}
                        ></span>
                        {c.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* BRAND LOGO SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-1">
              <p className="text-sm font-normal">Brand logo</p>
              <p className="text-[10px] text-gray-400 leading-4 mt-1">
                Custom branding in widget and emails
              </p>
            </div>

            <div className="flex sm:col-span-3 items-start gap-2 bg-gray-100 mt-1 p-3 rounded-lg text-gray-600 text-sm leading-5">
              <IoIosInformationCircleOutline className="text-2xl mt-[2px]" />

              <p className="text-black">
                Custom branding is available on the Plus plan.{" "}
                <a className="underline text-gray-800 cursor-pointer">
                  Contact us
                </a>{" "}
                to enable this feature.
              </p>
            </div>
          </div>

          {/* LEARN MORE LINK */}
          <a className="text-blue-600 text-[15px] underline cursor-pointer flex items-center gap-2">
            <BsBookHalf className="text-blue-500 text-lg" />
            Learn how to customize your widget
          </a>
        </div>
      )}
    </div>
  );
};

export default General;
