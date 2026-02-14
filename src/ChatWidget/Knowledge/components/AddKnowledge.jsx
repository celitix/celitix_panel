import React, { useState, useEffect } from "react";

// ICONS
import { Globe, FileText, X } from "lucide-react";
import { BsFiletypeCsv } from "react-icons/bs";
import { SiZendesk } from "react-icons/si";

const AddKnowledge = ({ open, onClose, onSelectSource }) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-dialog-pop"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="
        relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(80,80,160,0.25)]
        max-w-4xl w-[900px] mx-4 p-8 z-10 animate-dialog-pop
      "
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900">
          Add more knowledge
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose how you want to provide Lyro with knowledge.
        </p>

        {/* Option Buttons */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => onSelectSource("website")}
            className="flex flex-col items-start gap-3 border border-gray-200 rounded-2xl p-4 text-left hover:border-blue-500 hover:shadow-sm transition bg-white"
          >
            <Globe size={20} className="text-blue-600" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Website URL
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Provide the URL of your site to fetch knowledge from it.
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectSource("manual")}
            className="flex flex-col items-start gap-3 border border-gray-200 rounded-2xl p-4 text-left hover:border-blue-500 hover:shadow-sm transition bg-white"
          >
            <FileText size={20} className="text-blue-600" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Add manually
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Manually write your own specific Q&amp;A.
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectSource("csv")}
            className="flex flex-col items-start gap-3 border border-gray-200 rounded-2xl p-4 text-left hover:border-blue-500 hover:shadow-sm transition bg-white"
          >
            <BsFiletypeCsv size={20} className="text-blue-600" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Import from .CSV file
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Add multiple Q&amp;As from one .CSV file at once.
              </p>
            </div>
          </button>
        </div>

        {/* Zendesk */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => onSelectSource("zendesk")}
            className="flex flex-col items-start gap-3 border border-gray-200 rounded-2xl p-4 text-left hover:border-blue-500 hover:shadow-sm transition bg-white"
          >
            <SiZendesk size={20} className="text-blue-600" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Import Zendesk articles
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Import knowledge from your Zendesk Help Center articles.
              </p>
            </div>
          </button>
        </div>

        <div className="mt-4 border-t pt-4 text-xs text-gray-500 flex items-center gap-1">
          <span>
            Didn&apos;t find the right option? With Plus plan, we can train Lyro
            for you using any source.
          </span>
          <button className="text-blue-600 hover:underline">Contact us</button>
        </div>
      </div>
    </div>
  );
};

export default AddKnowledge;
