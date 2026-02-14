import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// MUI MATERIAL
import { Grid } from "@mui/material";

// ICONS
import {
    WhatsApp,
    Email,
    Call,
    Lock,
    Message,
    PhoneAndroid,
    SyncAlt,
    Person,
    Star,
    TaskAlt,
    TrendingUp,
    Insights,
    SmartToy,
    SupportAgent,
    Feedback,
} from "@mui/icons-material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { BsCreditCard2Back } from "react-icons/bs";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RefreshIcon from "@mui/icons-material/Refresh";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { Loop as LoopIcon } from "@mui/icons-material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

// COMPONENTS
import CustomTooltip from "@/components/common/CustomTooltip";
import ClockCard from "./components/ClockCard";

// ASSETS
import whatsappAnime from "../assets/animation/whatsappanimation.json";
import whatsappAnime2 from "../assets/animation/whatsappanimation2.json";
import smsAnime from "../assets/animation/smsanime.json";
import rcs from "../assets/animation/rcs.json";
import sms from "../assets/animation/sms.json";
import auth from "../assets/animation/auth.json";
import email from "../assets/animation/email.json";
import email2 from "../assets/animation/email2.json";
import Animationsms from "../assets/animation/Animation-sms.json";
import Animationrcs from "../assets/animation/Animation-rcs.json";
import Animationibd from "../assets/animation/Animation-ibd.json";
import Animationobd from "../assets/animation/Animation-obd.json";
import Animationwhatsapp2 from "../assets/animation/Animation-whatsapp2.json";
import twowaysms from "../assets/animation/twowaysms.json";
import { useNavigate } from "react-router-dom";
// API
import { getUserDetails, getCreditLimit } from "@/apis/user/user";
import { fetchBalance } from "@/apis/settings/setting";

// CONTEXT
import { useUser } from "@/context/auth";

const AdminDashboard = () => {
    const [userData, setUserData] = useState([]);
    const [balance, setBalance] = useState(0);
    const [rechargableCredit, setRechargableCredit] = useState(0);
    const [showRefresh, setShowRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { user } = useUser();

    const getBalance = async () => {
        setIsLoading(true);
        try {
            const res = await fetchBalance();
            setBalance(parseFloat(res.balance));
            setRechargableCredit(parseFloat(res.rechargableCredit));
            setRefreshKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error("Error fetching balance:", error);
        } finally {
            setIsLoading(false);
        }
    };



    const fetchUserDetails = async () => {
        setIsLoading(true);
        const res = await getUserDetails();
        if (res && res.statusCode === 200) {
            const user = res.data[0];
            setUserData(user);
        } else {
            console.error("Failed to load user details.");
            toast.error("Failed to load user details!");
        }
        setIsLoading(false);
    };
    useEffect(() => {
        getBalance();
        fetchUserDetails();
    }, []);

    const quickStats = [
        // {
        //     icon: <TaskAlt className="text-green-600" />,
        //     label: "Active Campaigns",
        //     value: 32,
        // },
        {
            icon: <AccountBalanceIcon className="text-green-900" />,
            label: "Current Balance",
            value: (
                <CountUp
                    start={0}
                    end={balance}
                    separator=","
                    decimals={2}
                    duration={1.5}
                    key={refreshKey}
                />
            ),
            showRefreshIcon: true,
        },
        // {
        //     icon: <TrendingUp className="text-blue-600" />,
        //     label: "Engagement Rate",
        //     value: "78%",
        // },
        // {
        //     icon: [
        //         <Star className="text-yellow-500" />,
        //         <Star className="text-yellow-500" />,
        //         <Star className="text-yellow-500" />,
        //         <Star className="text-yellow-500" />,
        //         <StarHalfOutlinedIcon className="text-yellow-500" />,
        //     ],
        //     label: "Client Rating",
        //     value: "4.8/5",
        // },
    ];

    const services = [
        {
            name: "WHATSAPP",
            icon: WhatsApp,
            displayName: "WhatsApp",
            animation: Animationwhatsapp2,
            desc: "Send real-time notifications",
            color: "from-green-100 to-green-300",
            quickLinks: [
                { url: "wlaunchcampaign", label: "Launch Campaigns" },
                { url: "wmanagecampaign", label: "Delivery Report" },
                { url: "managetemplate", label: "Manage Templates" },
                { url: "wqrcode", label: "QR Code" },
                { url: "wmanagewaba", label: "Manage WABA" },
                { url: "wwhatsappconversation", label: "WhatsApp Conversation" },
                { url: "wwhatsappbot", label: "Manage Bot" },
                { url: "wwhatsappflows", label: "Manage Flows" },
            ],
        },
        {
            name: "RCS",
            icon: Message,
            displayName: "RCS",
            animation: Animationrcs,
            desc: "Interactive messaging solution",
            color: "from-purple-100 to-purple-300",
            quickLinks: [
                { url: "sendrcs", label: "Send RCS" },
                { url: "rcsmanagetemplate", label: "Manage Template" },
                { url: "rcssuggestionreport", label: "Suggestion Report" },
                { url: "rcsdeliveryreport", label: "Delivery Report" },

                {
                    url: "/rcsmanagebot",
                    label: "Manage Bot",
                },
            ],
        },
        {
            name: "OBD",
            icon: Call,
            displayName: "OBD",
            animation: Animationobd,
            desc: "Automated outbound dialer",
            color: "from-yellow-100 to-yellow-300",
            quickLinks: [
                { url: "obdcreatecampaign", label: "Create Campaign" },
                { url: "obdmanagecampaign", label: "Delivery Report" },
                { url: "obdmanagevoiceclips", label: "Manage Voice Clips" },
            ],
        },
        {
            name: "IBD",
            icon: Call,
            displayName: "IBD",
            animation: Animationibd,
            desc: "Track inbound communications",
            color: "from-indigo-100 to-indigo-300",
            quickLinks: [
                { url: "ibdcallhistory", label: "Call History" },
                { url: "ibdmanageexecutive", label: "Manage Executive" },
                { url: "ibdivrflow", label: "IVR Flow" },
                { url: "ibdsettings", label: "Settings" },
            ],
        },
        {
            name: "SMS",
            icon: PhoneAndroid,
            displayName: "SMS",
            animation: Animationsms,
            desc: "Send and receive SMS",
            color: "from-pink-100 to-pink-300",
            quickLinks: [
                { url: "sendsms", label: "Send SMS" },
                { url: "smsreports", label: "Delivery Report" },
                { url: "smsdlttemplates", label: "DLT Template" },
            ],
        },
        {
            name: "EMAIL",
            icon: Email,
            displayName: "Email",
            animation: email2,
            desc: "Send campaign and transactional emails",
            color: "from-blue-100 to-blue-300",
            quickLinks: [
                { url: "sendemail", label: "Launch Campaign" },
                { url: "emailmanagement/", label: "Manage Template" },
                { url: "emailreports", label: "Delivery Report" },
            ],
        },
        {
            name: "APP_AUTHENTICATOR",
            icon: Lock,
            displayName: "App Authenticator",
            animation: auth,
            desc: "Secure 2FA login solutions",
            color: "from-gray-100 to-gray-300",
            quickLinks: [
                { url: "authsettings", label: "Settings" },
                { url: "authreports", label: "Delivery Report" },
            ],
        },
        {
            name: "Two-WAY-SMS",
            icon: SyncAlt,
            displayName: "Two-Way SMS",
            animation: twowaysms,
            desc: "Bi-directional messaging",
            color: "from-red-100 to-red-300",
        },
    ];


    // *******************************************************floating quick links card *********************************************************************
    const [selectedService, setSelectedService] = useState(null);
    const selectedServiceHasAccess = selectedService
        ? user.services?.some(
            (s) =>
                s.display_name.toLowerCase() === selectedService.name.toLowerCase()
        )
        : false;

    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-900 rounded-2xl p-4 space-y-6 min-h-[calc(100vh-6rem)]">
            {/* Logged In User Card */}
            <motion.div
                className="rounded-2xl shadow-md p-6 flex items-center justify-between flex-wrap gap-6 bg-gradient-to-br from-blue-50 to-blue-100"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center flex-wrap justify-center gap-3">
                    <div className="bg-blue-200 border-2 border-indigo-400 h-16 w-16 flex items-center justify-center rounded-full shadow-2xl">
                        {/* <Person
                            className="text-blue-600"
                            sx={{
                                fontSize: 30,
                            }}
                        /> */}
                        <span className="text-indigo-600 text-2xl font-semibold">
                            {(userData?.firstName || "U").charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-semibold playf">
                            Welcome back, {userData?.firstName || "User"}
                        </h2>
                        <p className="text-xs opacity-80">
                            You're doing great. Here's a quick overview of your dashboard.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-3">
                    {quickStats.map((stat, i) => (
                        <div
                            key={i}
                            className="relative bg-white rounded-xl shadow p-3 px-4 flex flex-col items-start justify-center w-50 h-28"
                        >
                            {stat.showRefreshIcon && (
                                <CustomTooltip title="Refresh Balance" placement="top" arrow>
                                    <div className="absolute top-2 right-2 cursor-pointer">
                                        {isLoading ? (
                                            <LoopIcon
                                                className="text-[18px] animate-spin text-blue-400 cursor-pointer"
                                                sx={{ color: "blue" }}
                                            />
                                        ) : (
                                            <button onClick={() => {
                                                getBalance()
                                                fetchCreditLimit()
                                            }} className="">
                                                <LoopIcon className="text-blue-400 cursor-pointer" />
                                            </button>
                                        )}
                                    </div>
                                </CustomTooltip>
                            )}
                            <div className="text-2xl">{stat.icon}</div>
                            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            <div className="font-semibold text-lg">{stat.value}</div>
                        </div>
                    ))}
                    {/* <ClockCard /> */}
                </div>
            </motion.div>

            {/* Service Cards */}
            <Grid container spacing={3}>
                {services.map((service, index) => {
                    const IconComponent = service.icon;
                    const hasService = user.services?.some(
                        (s) => s.display_name.toLowerCase() === service.name.toLowerCase()
                    );
                    return (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => setSelectedService(service)}
                                className={`relative rounded-xl bg-gradient-to-br ${service.color
                                    } p-5 h-50 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300 ${hasService ? "ring-1 ring-green-300" : "ring-1 ring-red-300"
                                    } `}
                            >
                                {hasService && (
                                    <>
                                        <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider h-5 w-4 border-2 border-white"></div>
                                        <div className="absolute top-2 right-8 bg-green-600 text-white text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                            Active
                                        </div>
                                    </>
                                )}
                                {!hasService && (
                                    <>
                                        <div className="absolute top-2 right-2 bg-red-400 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider h-5 w-4 border-2 border-white"></div>
                                        <div className="absolute top-2 right-8 bg-red-400 text-white text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                                            inActive
                                        </div>
                                    </>
                                )}
                                <div className="font-semibold text-lg text-gray-800">
                                    {service.displayName}
                                </div>
                                <motion.div className="flex items-center justify-end z-10">
                                    <div className="flex justify-end">
                                        {service.animation ? (
                                            <div className="w-full  h-auto text-left">
                                                <Lottie
                                                    animationData={service.animation}
                                                    loop
                                                    autoplay
                                                    className="w-22 h-auto "
                                                />
                                            </div>
                                        ) : (
                                            <IconComponent className="text-gray-700 group-hover:rotate-6 transition-transform duration-300" />
                                        )}
                                    </div>
                                </motion.div>
                                <p className="text-sm opacity-70 mt-3">{service.desc}</p>
                            </motion.div>
                        </Grid>
                    );
                })}


                {/* ***************************************************************************** Floating Quick card**************************************************************** */}

                {selectedService && (
                    <div
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-md"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="relative w-[420px] max-w-[94%] rounded-3xl bg-white/90 
               backdrop-blur-xl border border-white/40
               shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                        >
                            {/* Glow */}
                            <div
                                className="absolute inset-0 -z-10 rounded-3xl 
                    bg-gradient-to-r from-blue-400/20 to-indigo-500/20 blur-2xl"
                            />

                            {/* Accent */}
                            {/* <div className="h-1 w-full rounded-t-3xl 
                    bg-gradient-to-r from-blue-500 to-indigo-600" /> */}

                            {/* Close */}
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute right-4 top-4 rounded-full bg-black/5 hover:bg-black/10 
                 px-2 py-1 text-gray-600 transition"
                            >
                                ✕
                            </button>

                            {/* Body */}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {selectedService?.displayName}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1 mb-2">
                                    {selectedService?.desc}
                                </p>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-5" />

                                {/* Content */}
                                {selectedServiceHasAccess ? (
                                    <div className="flex flex-col gap-3">
                                        {selectedService?.quickLinks?.length > 0 ? (
                                            selectedService.quickLinks.map((link, i) => (
                                                <motion.button
                                                    key={i}
                                                    whileHover={{ scale: 1.04 }}
                                                    whileTap={{ scale: 0.96 }}
                                                    onClick={() => {
                                                        setSelectedService(null);
                                                        setTimeout(() => navigate(link.url), 10);
                                                    }}
                                                    className="group relative overflow-hidden rounded-xl px-4 py-3 
                           bg-gradient-to-r from-blue-50 to-indigo-50
                           border border-blue-200/40
                           shadow-md hover:shadow-xl transition-all"
                                                >
                                                    {/* Hover shine */}
                                                    <span
                                                        className="absolute inset-0 translate-x-[-100%] 
                                 bg-gradient-to-r from-transparent via-white/40 to-transparent
                                 group-hover:translate-x-[100%] transition-transform duration-700"
                                                    />

                                                    <div className="relative flex items-center justify-between">
                                                        <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                                                            <LinkOutlinedIcon size={18} />
                                                            {link.label}
                                                        </span>

                                                        <span className="text-xs font-semibold text-blue-600">
                                                            OPEN →
                                                        </span>
                                                    </div>
                                                </motion.button>
                                            ))
                                        ) : (
                                            <p className="text-xs text-red-500 text-center">
                                                No Quick Links Found
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
                                        <p className="text-red-600 font-semibold text-lg">
                                            Service Not Active
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Please activate this service to continue.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </Grid>
        </div>
    );
};

export default AdminDashboard;