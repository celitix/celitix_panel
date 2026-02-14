import React from "react";
import { motion } from "framer-motion";

// Icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const BotCard = ({ icon, title, description, color }) => (
    <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 transition"
    >
        <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: color + "20", color }}
        >
            {icon}
        </div>

        <h3 className="text-sm font-semibold text-gray-800 mb-1">
            {title}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed">
            {description}
        </p>

        <div className="mt-4 text-xs text-gray-400 flex items-center gap-1">
            <SettingsIcon sx={{ fontSize: 14 }} />
            Configuration coming soon
        </div>
    </motion.div>
);

const ChatBotSettings = () => {
    return (
        <div className="bg-gradient-to-br from-[#f5f7ff] via-white to-[#eef2ff] min-h-[90vh] rounded-3xl p-4 md:p-6 overflow-scroll">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-5xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                        <RocketLaunchIcon sx={{ color: "#4f46e5", fontSize: 28 }} />
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        ChatBot Settings
                    </h1>
                    <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
                        Centralized configuration for all your messaging chatbots.
                        Advanced automation, AI flows, and personalization options
                        are launching soon.
                    </p>
                </div>

                {/* Bot Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <BotCard
                        icon={<WhatsAppIcon />}
                        title="WhatsApp ChatBot"
                        description="Automate customer support, order updates, and notifications on WhatsApp."
                        color="#25D366"
                    />

                    <BotCard
                        icon={<MessageIcon />}
                        title="RCS ChatBot"
                        description="Engage users with rich messages, quick replies, and branded RCS experiences."
                        color="#2563eb"
                    />

                    <BotCard
                        icon={<InstagramIcon />}
                        title="Instagram ChatBot"
                        description="Instantly respond to DMs, comments, and story replies on Instagram."
                        color="#E1306C"
                    />

                    <BotCard
                        icon={<ChatBubbleOutlineIcon />}
                        title="Messenger ChatBot"
                        description="Automated conversations, lead capture, and follow-ups on Messenger."
                        color="#0084FF"
                    />
                </div>

                {/* Footer Note */}
                <div className="mt-10 bg-white border border-dashed rounded-2xl p-5 text-center shadow-sm">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                        🚀 Coming Soon
                    </p>
                    <p className="text-xs text-gray-500 max-w-xl mx-auto">
                        You’ll soon be able to design conversation flows, enable AI-powered
                        responses, track performance metrics, and manage all chatbot
                        channels from one unified dashboard.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ChatBotSettings;
