import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Loader2, RefreshCw, RotateCcw } from "lucide-react";

// ICONS
import { FaServer, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// COMPONENTS
import CustomTooltip from "@/components/common/CustomTooltip";

// API
import { restartEngine } from "@/apis/admin/admin";


// const serverTypes = ["sms", "whatsapp", "rcs", "voice", "Email", "HLR", "IBD", "Instagram"];
const serverTypes = [
    { label: "SMS", value: "sms" },
    { label: "WhatsApp", value: "whatsapp" },
    { label: "RCS", value: "rcs" },
    { label: "Voice", value: "voice" },
    { label: "Email", value: "email" },
    { label: "HLR", value: "hlr" },
    { label: "IBD", value: "ibd" },
    { label: "Instagram", value: "instagram" },
];

const activeServers = ["sms", "voice", "rcs", "whatsapp"];

export default function RestartEnginesPanel() {
    const [loading, setLoading] = useState({});
    const [status, setStatus] = useState({});

    const handleRestart = async (serverType) => {
        setLoading((prev) => ({ ...prev, [serverType]: true }));
        setStatus((prev) => ({ ...prev, [serverType]: "restarting" }));

        try {
            const res = await restartEngine({ serverType });
            // Ensure we handle both direct JSON or fetch-like responses
            const json = res?.data || (typeof res.json === "function" ? await res.json() : res);

            if (!json || json.status !== true) {
                throw new Error(json?.msg || "Failed to restart engine");
            }

            setStatus((prev) => ({ ...prev, [serverType]: "success" }));
            toast.success(`${serverType.toUpperCase()} engine restarted successfully`);
        } catch (err) {
            console.error(err);
            setStatus((prev) => ({ ...prev, [serverType]: "error" }));
            toast.error(`Failed to restart ${serverType.toUpperCase()} engine`);
        } finally {
            setLoading((prev) => ({ ...prev, [serverType]: false }));
        }
    };

    const handleResetIdle = (serverType) => {
        setStatus((prev) => ({ ...prev, [serverType]: undefined }));
        setLoading((prev) => ({ ...prev, [serverType]: false }));
        toast.success(`Reset ${serverType.toUpperCase()} to idle`);
    };

    return (
        <motion.div
            className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-2xl border border-gray-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Channels Engine Control
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {serverTypes.map(({ label, value }) => {
                    const isLoading = loading[value];
                    const state = status[value];
                    const isActive = activeServers.includes(value);

                    return (
                        <div
                            key={value}
                            className={`relative p-4 rounded-xl border shadow text-center transition-colors duration-200 
                ${state === "success"
                                    ? "border-green-400 bg-green-50"
                                    : state === "error"
                                        ? "border-red-400 bg-red-50"
                                        : state === "restarting"
                                            ? "border-blue-400 bg-blue-50"
                                            : "border-gray-200 bg-gray-50"
                                } 
                                ${!isActive ? "opacity-60 blur-[0.5px] pointer-events-none select-none cursor-not-allowed" : ""}
                                `}
                        >
                            {isActive && (
                                <CustomTooltip title="Reset Status to Idle" arrow placement="top">
                                    <button
                                        onClick={() => handleResetIdle(value)}
                                        className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs flex items-center gap-1 cursor-pointer"
                                        title="Reset to idle"
                                    >
                                        <RotateCcw className="w-3 h-3" />
                                    </button>
                                </CustomTooltip>
                            )}
                            <div className="flex flex-col items-center space-y-3">
                                <FaServer className="text-gray-600 text-xl" />
                                <h3 className="capitalize font-semibold text-gray-800">
                                    {label} Server
                                </h3>

                                <div className="text-sm h-5 flex items-center justify-center">
                                    {isLoading ? (
                                        <span className="flex items-center text-blue-600 gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Restarting
                                        </span>
                                    ) : state === "success" ? (
                                        <span className="flex items-center text-green-600 gap-1">
                                            <FaCheckCircle className="w-4 h-4" /> Restarted
                                        </span>
                                    ) : state === "error" ? (
                                        <span className="flex items-center text-red-600 gap-1">
                                            <FaExclamationCircle className="w-4 h-4" /> Failed
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">Idle</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleRestart(value)}
                                    disabled={isLoading}
                                    className={`w-full mt-2 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2
                    ${isLoading
                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Restarting...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-4 h-4" /> Restart
                                        </>
                                    )}
                                </button>

                                {!isActive && (
                                    <span className="absolute top-2 left-2 text-[10px] bg-gray-300 text-gray-700 px-2 py-0.5 rounded-full">
                                        Coming Soon
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
