import React, { useState } from "react";
import { motion } from "framer-motion";

// ICONS
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosInformationCircleOutline,
} from "react-icons/io";

const MultiLang = () => {
  const [multiLangOpen, setMultiLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (US)");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <button
        onClick={() => setMultiLangOpen(!multiLangOpen)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <h2 className="text-lg font-medium">MultiLanguage</h2>
        {multiLangOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {multiLangOpen && (
        <div className="px-6 pb-6 animate-fadeIn">
          <p className="text-sm text-gray-500 mb-4 flex items-center">
            Enable as many languages as you want, and add the ones you need. The
            widget will match your users default browser language. To add a new
            translation select from the dropdown.
          </p>
          <div>
            <p className="text-sm text-gray-400 flex items-center">
              The default language is used when your customers do not have the
              language in their browser that you added as translations.
            </p>
            <div className="grid grid-cols-12 items-start mb-6 relative">
              {/* Label */}
              <p className="col-span-3 text-sm font-medium text-gray-700 mt-2">
                Default language
              </p>

              {/* Dropdown */}
              <div className="col-span-9">
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="w-52 border rounded-lg px-3 py-2 flex items-center justify-between bg-white hover:border-gray-400 transition"
                >
                  <div className="flex items-center gap-2">
                    {/* Flag / color placeholder */}
                    <div className="w-5 h-5 rounded-full border bg-gray-200"></div>

                    <span className="text-sm">{selectedLang}</span>
                  </div>

                  <IoIosArrowDown />
                </button>

                {/* Dropdown Menu */}
                {showLangDropdown && (
                  <div className="absolute mt-2 w-60 bg-white shadow-xl rounded-xl border p-3 z-50">
                    <p className="text-xs text-gray-500 mb-2">
                      Available languages
                    </p>

                    <div className="space-y-1">
                      {[
                        { name: "English (US)", flag: "🇺🇸" },
                        { name: "English (UK)", flag: "🇬🇧" },
                        { name: "Hindi", flag: "🇮🇳" },
                        { name: "Spanish", flag: "🇪🇸" },
                      ].map((lang) => (
                        <div
                          key={lang.name}
                          onClick={() => {
                            setSelectedLang(lang.name);
                            setShowLangDropdown(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
                        >
                          {/* Flag */}
                          <span className="text-lg">{lang.flag}</span>

                          <span className="text-sm">{lang.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiLang;
