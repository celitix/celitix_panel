// import React from "react";
// import { RiFileList3Line, RiCalendarEventLine, RiMapPinUserLine, RiCheckDoubleLine } from "react-icons/ri";

// const FlowReplyPreview = ({ jsonString }) => {
//     let data = {};
//     try {
//         data = typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
//     } catch (e) {
//         return <p className="text-red-500 text-xs">Invalid Flow Data</p>;
//     }

//     // Helper to format keys (textInput_one -> Text Input One)
//     const formatKey = (key) => {
//         return key
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .replace(/^./, (str) => str.toUpperCase())
//             .trim();
//     };

//     return (
//         <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-[280px]">
//             {/* Header */}
//             <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex items-center gap-2">
//                 <RiFileList3Line className="text-[#128C7E]" />
//                 <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
//                     Flow Submission
//                 </span>
//             </div>

//             {/* Body */}
//             <div className="p-3 space-y-3">
//                 {Object.entries(data).map(([key, value]) => {
//                     // Skip flow_token or internal IDs
//                     if (key === "flow_token") return null;

//                     return (
//                         <div key={key} className="flex flex-col gap-0.5">
//                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
//                                 {formatKey(key)}
//                             </label>

//                             {/* Handle different data types */}
//                             <div className="text-sm text-slate-800 font-medium">
//                                 {/* 1. Date Ranges (Calendar) */}
//                                 {typeof value === "object" && value["start-date"] ? (
//                                     <div className="flex items-center gap-2 text-[#128C7E] bg-teal-50 px-2 py-1 rounded-md border border-teal-100">
//                                         <RiCalendarEventLine size={14} />
//                                         <span className="text-[12px]">
//                                             {value["start-date"]} — {value["end-date"]}
//                                         </span>
//                                     </div>
//                                 ) :

//                                     /* 2. Chips / Multi-select Arrays */
//                                     Array.isArray(value) ? (
//                                         <div className="flex flex-wrap gap-1 mt-1">
//                                             {value.map((v, i) => (
//                                                 <span key={i} className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full text-[11px] font-bold">
//                                                     {v}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     ) :

//                                         /* 3. Standard Text/Date Strings */
//                                         (
//                                             <span className="break-words">
//                                                 {String(value)}
//                                             </span>
//                                         )}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Footer */}
//             <div className="bg-[#E7F3EF] px-3 py-1.5 flex items-center justify-between">
//                 <span className="text-[10px] text-[#128C7E] font-bold">Verified Form</span>
//                 <RiCheckDoubleLine className="text-[#128C7E]" />
//             </div>
//         </div>
//     );
// };

// export default FlowReplyPreview;

import React from "react";
import {
    RiFileList3Line,
    RiCalendarEventLine,
    RiCheckDoubleLine,
    RiImageLine,
    RiFileTextLine
} from "react-icons/ri";

const FlowReplyPreview = ({ jsonString }) => {
    let data = {};
    try {
        data = typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
    } catch (e) {
        return <p className="text-red-500 text-xs">Invalid Flow Data</p>;
    }

    const formatKey = (key) => {
        return key
            .replace(/_/g, " ")
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
    };

    /**
     * Helper function to safely render ANY value type
     * This prevents the "Objects are not valid as React child" error
     */
    const renderValue = (val) => {
        if (val === null || val === undefined) return "N/A";

        // 1. Handle Arrays (like chipSelector_one or document_one)
        if (Array.isArray(val)) {
            return (
                <div className="flex flex-col gap-1 mt-1">
                    {val.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
                            {/* Check if the item is a document/image object */}
                            {typeof item === "object" ? (
                                <>
                                    {item.mime_type?.includes("image") ? <RiImageLine className="text-blue-500" /> : <RiFileTextLine />}
                                    <span className="text-[11px] truncate max-w-[200px]">
                                        {item.file_name || item.id || "Attached File"}
                                    </span>
                                </>
                            ) : (
                                // If it's just a simple string/number array
                                <span className="text-[11px] font-bold text-blue-600">{String(item)}</span>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        // 2. Handle Objects (like calendar_one)
        if (typeof val === "object") {
            // Specific check for your calendar format
            if (val["start-date"] && val["end-date"]) {
                return (
                    <div className="flex items-center gap-2 text-[#128C7E] bg-teal-50 px-2 py-1 rounded-md border border-teal-100">
                        <RiCalendarEventLine size={14} />
                        <span className="text-[12px] font-medium">
                            {val["start-date"]} — {val["end-date"]}
                        </span>
                    </div>
                );
            }
            // Generic object fallback to avoid crash
            return <span className="text-[11px] text-slate-500 italic">Complex Data</span>;
        }

        // 3. Simple strings/numbers
        return <span className="break-words">{String(val)}</span>;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-[280px] min-w-[240px]">
            {/* Header */}
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex items-center gap-2">
                <RiFileList3Line className="text-[#128C7E]" />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Flow Submission
                </span>
            </div>

            {/* Body */}
            <div className="p-3 space-y-3">
                {Object.entries(data).map(([key, value]) => {
                    if (key === "flow_token") return null;

                    return (
                        <div key={key} className="flex flex-col gap-0.5 border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                                {formatKey(key)}
                            </label>
                            <div className="text-sm text-slate-800">
                                {renderValue(value)}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="bg-[#E7F3EF] px-3 py-1.5 flex items-center justify-between">
                <span className="text-[10px] text-[#128C7E] font-bold">Verified Form</span>
                <RiCheckDoubleLine className="text-[#128C7E]" />
            </div>
        </div>
    );
};

export default FlowReplyPreview;