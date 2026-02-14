import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";

// ICONS
import {
    CheckCircle, Sync, Edit, Visibility, Business, LocationOn, Language, Email, Description, WhatsApp, AddCircleOutline,
    BusinessCenter,
    Verified

} from "@mui/icons-material";

const WhatsAppBusinessProfile = () => {
    const [syncing, setSyncing] = useState(false);

    const profile = {
        about: "welcome to proactive",
        address: "Jaipur, Rajasthan",
        description: "Welcome to the Future of Customer Communication - Your Engagement Journey Begins Here.",
        email: "support@celitix.com",
        profile_picture_url:
            "https://pps.whatsapp.net/v/t61.24694-24/490584763_2465145597202191_5581597618359014464_n.jpg?ccb=11-4&oh=01_Q5Aa3AEdn1jYLfGKhbjrnXO8ICLgJitUmEaNRcRoLnYNyAgGVw&oe=691FEA63&_nc_sid=5e03e0&_nc_cat=105",
        websites: ["https://www.proactivesms.in/", "https://www.celitix.com/"],
        vertical: "PROF_SERVICES",
        messaging_product: "whatsapp",
        businessVerificationStatus: "verified",
        wabaSrno: 105,
        businessName: "Proactive_Official",
        businessId: "104536147474747431",
        mobileNo: "919251006474",
        wabaName: "PPSPL",
        phoneNumberId: "65507474747474",
        wabaStatus: "CONNECTED",
        expiryDate: "2025-11-30",
        messagingLimits: "1000",
        isEnabledForInsights: true,
        vendor: "jio",
        name: "Proactive",
        currency: "INR",
        wabaAccountId: "70804474747474",
        apiStatus: "ONBOARDED",
        qualityRate: "GREEN",
    };

    const statusConfig = {
        CONNECTED: {
            color: "bg-green-500", label: "Connected", icon: <CheckCircle className="w-4 h-4" />,
            desc: "Phone number is associated and working perfectly"
        },
        FLAGGED: { color: "bg-orange-500", label: "Flagged", desc: "Number flagged — check quality rating" },
        RESTRICTED: { color: "bg-red-600", label: "Restricted", desc: "24-hour messaging limit reached" },
        BANNED: { color: "bg-red-800", label: "Banned", desc: "Number is banned — contact support" },
    };

    const qualityConfig = {
        GREEN: { color: "bg-green-500", label: "High", desc: "Excellent quality — optimal deliverability" },
        YELLOW: { color: "bg-yellow-500 text-black", label: "Medium", desc: "At risk — review messaging practices" },
        RED: { color: "bg-red-600", label: "Low", desc: "High risk — immediate action required" },
    };

    const currentStatus = statusConfig[profile.wabaStatus] || { color: "bg-gray-500", label: profile.wabaStatus || "Unknown", desc: "Status unknown" };
    const currentQuality = qualityConfig[profile.qualityRate] || { color: "bg-gray-500", label: "Unknown", desc: "Quality not available" };

    const handleSync = () => {
        setSyncing(true);
        setTimeout(() => setSyncing(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-end gap-3 mb-8 justify-between">
                    <div className="flex items-center gap-3" >
                        <WhatsApp className="w-10 h-10 text-[#25D366]" />
                        <h1 className="text-3xl font-bold text-gray-800">WhatsApp Business Profile</h1>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 shadow-sm transition">
                            <BusinessCenter className="w-4 h-4" />
                            Onboard WABA
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00C853] to-[#00B34A] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition">
                            <AddCircleOutline className="w-4 h-4" />
                            Onboard MM Lite
                        </button>
                    </div>
                </div>
                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
                >
                    {/* Hero Section - WhatsApp Green Banner */}
                    <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] h-32 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="relative">
                                <img
                                    src={profile.profile_picture_url}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-2xl object-cover"
                                />
                                {profile.businessVerificationStatus === "verified" && (
                                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1">
                                        <Verified className="w-7 h-7 text-white" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="pt-16 px-8 pb-8">
                        {/* Name & Description */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                {profile.name || profile.businessName}
                                {profile.businessVerificationStatus === "verified" && (
                                    <Tooltip title="Verified Business">
                                        <CheckCircle className="w-7 h-7 text-blue-600" />
                                    </Tooltip>
                                )}
                            </h2>
                            <p className="text-gray-600 mt-2 text-lg italic">{profile.description}</p>
                        </div>

                        {/* Status Badges Row */}
                        <div className="flex flex-wrap gap-6 mb-10">
                            {/* Phone Status */}
                            <Tooltip title={currentStatus.desc} arrow placement="top">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-200 hover:border-green-300 transition">
                                    <div className={`w-3 h-3 rounded-full ${currentStatus.color} mr-3`} />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone Status</p>
                                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                                            {currentStatus.icon}
                                            {currentStatus.label}
                                        </p>
                                    </div>
                                </div>
                            </Tooltip>

                            {/* Quality Rating */}
                            <Tooltip title={currentQuality.desc} arrow placement="top">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-200 hover:border-green-300 transition">
                                    <div className={`w-3 h-3 rounded-full ${currentQuality.color} mr-3`} />
                                    <div>
                                        <p className="text-sm text-gray-500">Quality Rating</p>
                                        <p className="font-semibold text-gray-800">{currentQuality.label}</p>
                                    </div>
                                </div>
                            </Tooltip>

                            {/* Messaging Limit */}
                            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-200">
                                <WhatsApp className="w-5 h-5 text-[#25D366]" />
                                <div>
                                    <p className="text-sm text-gray-500">Daily Limit</p>
                                    <p className="font-semibold text-gray-800">{profile.messagingLimits?.toLocaleString()} messages</p>
                                </div>
                            </div>

                            {/* Expiry */}
                            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-200">
                                <div>
                                    <p className="text-sm text-gray-500">Access Expires</p>
                                    <p className="font-semibold text-gray-800">{profile.expiryDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* About & Contact Section */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <Business className="w-5 h-5 text-[#25D366]" />
                                    Business Details
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <div className="flex items-start gap-3">
                                        <LocationOn className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Address</p>
                                            <p>{profile.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Email className="w-5 h-5 text-gray-400" />
                                        <a href={`mailto:${profile.email}`} className="text-[#25D366] hover:underline">
                                            {profile.email}
                                        </a>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Language className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Websites</p>
                                            {profile.websites.map((site, i) => (
                                                <a
                                                    key={i}
                                                    href={site}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block text-[#25D366] hover:underline"
                                                >
                                                    {site.replace(/^https?:\/\//, "")}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <Description className="w-5 h-5 text-[#25D366]" />
                                    Technical Details
                                </h3>
                                <div className="bg-gray-50 rounded-2xl p-5 space-y-4 text-sm">
                                    {[
                                        ["Display Name", profile.name],
                                        ["WABA Name", profile.wabaName],
                                        ["Phone Number", "+91 92510 06474"],
                                        ["WABA ID", profile.wabaAccountId],
                                        ["Phone Number ID", profile.phoneNumberId],
                                        ["Business ID", profile.businessId],
                                        ["Vendor", profile.vendor?.toUpperCase()],
                                        ["API Status", profile.apiStatus],
                                        ["Insights", profile.isEnabledForInsights ? "Eligible" : "Not Eligible"],
                                        ["Currency", profile.currency],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                                            <span className="text-gray-600">{label}</span>
                                            <span className="font-medium text-gray-800">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center gap-2">
                                <Visibility className="w-5 h-5" />
                                View Details
                            </button>
                            <button
                                onClick={handleSync}
                                className="px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#128C7E] transition flex items-center gap-2 shadow-lg"
                            >
                                {syncing ? (
                                    <svg className="animate-spin h-5 w-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : (
                                    <Sync className="w-5 h-5" />
                                )}
                                Sync Now
                            </button>
                            <button className="px-6 py-3 bg-[#075E54] text-white rounded-xl font-medium hover:bg-[#05473d] transition flex items-center gap-2 shadow-lg">
                                <Edit className="w-5 h-5" />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WhatsAppBusinessProfile;