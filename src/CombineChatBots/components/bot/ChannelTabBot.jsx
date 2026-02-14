import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import {
    FaWhatsapp,
    FaFacebookMessenger,
    FaInstagram,
    FaCommentDots,
    FaThLarge,
    FaUserTie,
    FaUserCheck,
    FaUserClock,
    FaBolt,
    FaCog,
} from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import QuickreplyOutlinedIcon from "@mui/icons-material/QuickreplyOutlined";

// CONTEXT
import { useUser } from "@/context/auth";
import { useSettings } from "@/context/LiveChatSettingContext";

// APIS (Importing your existing API)
import { instaUserList } from "@/apis/Instagram/Instagram";

const channels = [
    //   {
    //     service_type_id: "1",
    //     label: "Dashboard",
    //     value: "",
    //     icon: <FaThLarge className="text-gray-500 text-lg" />,
    //   },
    {
        service_type_id: "2",
        label: "WhatsApp Bot",
        value: "wwhatsappbot",
        icon: <FaWhatsapp className="text-green-500 text-lg" />,
    },
    {
        service_type_id: "3",
        label: "RCS Bot",
        value: "rcsbot",
        icon: <FaCommentDots className="text-purple-500 text-lg" />,
    },
    {
        service_type_id: "12",
        label: "Instagram Bot",
        value: "instabot",
        icon: <FaInstagram className="text-pink-500 text-lg" />,
    },
    {
        service_type_id: "5",
        label: "Messenger Bot",
        value: "messengerbot",
        icon: <FaFacebookMessenger className="text-blue-500 text-lg" />,
    },
];

const ChannelTabBot = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const activeTab = pathname.split("/")[2];
    const [showActions, setShowActions] = useState(false);
    const { user } = useUser();

    const selectedChannel = channels.find((ch) => ch.value === activeTab);
    const allowedServiceIds =
        user?.services?.map((s) => s.service_type_id.toString()) || [];

    // Instagram Specific States
    const [instaUsers, setInstaUsers] = useState([]);
    // const [selectedInstaUser, setSelectedInstaUser] = useState(null);
    const [isInstagramOpen, setIsInstagramOpen] = useState(false);
    const instagramRef = useRef(null);
    const { selectedInstaUser, setSelectedInstaUser } = useSettings();

    const handleInstaSelect = (userId) => {
        setSelectedInstaUser(userId);
        setIsInstagramOpen(false);
    };

    // Fetch Instagram Users (Like in your InstaSettings file)
    useEffect(() => {
        const fetchInstaUsers = async () => {
            try {
                const response = await instaUserList();
                if (response.statusCode === 200) setInstaUsers(response.data);
            } catch (error) {
                console.error("Error fetching insta users: ", error);
            }
        };
        if (activeTab === "instalcsetting") fetchInstaUsers();
    }, [activeTab]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                instagramRef.current &&
                !instagramRef.current.contains(event.target)
            ) {
                setIsInstagramOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getSelectedInstaName = () => {
        const user = instaUsers.find((u) => u.instaUserId === selectedInstaUser);
        return user ? user.userName : "Select Instagram Account";
    };

    const getQuickActions = () => {
        if (!selectedChannel) return [];

        switch (selectedChannel.service_type_id) {
            case "2": // WhatsApp
                return [
                    {
                        label: "Whatsapp Chat",
                        icon: <QuickreplyOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />,
                        // onClick: () => navigate("/liveChatMain/wlivechat"),
                    },
                ];

            case "3": // RCS
                return [
                    {
                        label: "RCS Chat",
                        icon: <QuickreplyOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />,
                        // onClick: () => navigate("/liveChatMain/rcslivechats"),
                    },
                ];

            case "12": // Instagram
                return [
                    {
                        isDropdown: true,
                        label: getSelectedInstaName(),
                        dropdownType: "instagram", // Added identifier
                        icon: <FaInstagram className="text-pink-500 text-sm" />,
                        onClick: () => setIsInstagramOpen(!isInstagramOpen),
                        active: !!selectedInstaUser,
                    },
                    {
                        label: "Instagram Chat",
                        icon: <QuickreplyOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />,
                        // onClick: () => navigate("/liveChatMain/instachats"),
                    },
                ];

            case "5": // Messenger
                return [
                    {
                        label: "Messanger Chat",
                        icon: <QuickreplyOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />,
                        onClick: () => navigate("/liveChatMain/messengerchats"),
                    },
                ];

            default:
                return [];
        }
    };

    const currentActions = getQuickActions();

    return (
        <div className="flex flex-col gap-1 relative z-10">
            <div className="flex border-b bg-white shadow-sm px-4 relative z-10 rounded-2xl overflow-auto">
                {channels.map((ch) => (
                    <button
                        key={ch.value}
                        onClick={() => navigate(`/ChatBotMain/${ch.value}`)}
                        className="relative group px-4 py-3 text-sm font-medium cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            {ch.icon}
                            <span>{ch.label}</span>
                        </div>
                        {activeTab === ch.value && (
                            <motion.div
                                layoutId="activeTabIndicator"
                                className="absolute left-0 bottom-0 h-[3px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                            />
                        )}
                    </button>
                ))}

                {/* <div className="flex items-center">
                    <motion.button
                        onClick={() => setShowActions((prev) => !prev)}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <motion.div
                            key={showActions ? "up" : "down"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.5, 1] }}
                            transition={{ duration: 0.4 }}
                        >
                            {showActions ? (
                                <FaAngleDoubleUp className="text-lg" />
                            ) : (
                                <FaAngleDoubleDown className="text-lg" />
                            )}
                        </motion.div>
                    </motion.button>
                </div> */}
            </div>

            {/* Quick Actions Bar */}
            <AnimatePresence>
                {showActions && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-visible"
                    >
                        <div className="px-4 py-2 flex flex-wrap items-center gap-3 bg-white shadow rounded-md border border-gray-100 mt-1 relative z-50">
                            {getQuickActions().map((action, i) => (
                                <div
                                    key={i}
                                    className="relative"
                                    ref={
                                        action.dropdownType === "instagram" ? instagramRef : null
                                    }
                                >
                                    <button
                                        onClick={action.onClick}
                                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium transition-all ${action.active
                                            ? "bg-pink-100 text-pink-700 border border-pink-200"
                                            : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600 border border-transparent"
                                            }`}
                                    >
                                        {action.icon}
                                        {action.label}
                                        {action.isDropdown && (
                                            <FaAngleDoubleDown
                                                className={`text-[10px] transition-transform ${isInstagramOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </button>

                                    {/* Instagram Specific Dropdown List */}
                                    {action.dropdownType === "instagram" && isInstagramOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-2xl rounded-xl z-[999999] overflow-hidden"
                                        >
                                            <ul className="text-sm">
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b text-gray-400 italic"
                                                    onClick={() => handleInstaSelect(null)}
                                                >
                                                    -- No Selection --
                                                </li>
                                                {instaUsers.map((acc) => (
                                                    <li
                                                        key={acc.instaUserId}
                                                        className={`px-4 py-2 cursor-pointer border-b hover:bg-pink-50 transition-colors ${selectedInstaUser === acc.instaUserId
                                                            ? "bg-pink-100 text-pink-700 font-bold"
                                                            : "text-gray-700"
                                                            }`}
                                                        onClick={() => handleInstaSelect(acc.instaUserId)}
                                                    >
                                                        {acc.userName}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}

                                    {/* Add future dropdowns here using action.dropdownType === 'rcs' etc. */}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChannelTabBot;