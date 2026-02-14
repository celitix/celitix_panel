import React from "react";
import { motion } from "framer-motion";

const RadioGroupFieldupdownAgent = ({ label, options, value, onChange, id }) => {
    return (
        <div className="flex flex-col gap-2.5 mb-6">
            {label && (
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}

            <div
                id={id}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
            >
                {options.map((option) => {
                    const isActive = value === option.value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange({ target: { value: option.value } })}
                            className={`relative group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${isActive
                                    ? "border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600"
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                                }`}
                        >
                            <div className="flex flex-col items-start">
                                <span className={`text-sm font-medium transition-colors ${isActive ? "text-indigo-900" : "text-slate-600"
                                    }`}>
                                    {option.label}
                                </span>
                                {/* Optional: You can add option.description here if your data has it */}
                            </div>

                            {/* Minimal Custom Radio Circle */}
                            <div className={`flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-300 ${isActive
                                    ? "border-indigo-600 bg-indigo-600"
                                    : "border-slate-300 bg-transparent group-hover:border-slate-400"
                                }`}>
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2 h-2 rounded-full bg-white"
                                    />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioGroupFieldupdownAgent;