import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import Lottie from "lottie-react";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
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
  ComposedChart,
} from "recharts";
import moment from "moment";

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
import { FaShopify, FaFacebookMessenger, FaSlack } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { AiFillApi } from "react-icons/ai";
import { FaWhatsapp, FaPhone, FaRegCommentDots, FaSms } from "react-icons/fa";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RefreshIcon from "@mui/icons-material/Refresh";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { Loop as LoopIcon } from "@mui/icons-material";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { SiZendesk, SiZapier, SiZoho } from "react-icons/si";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Mail, Phone, User, Briefcase, UserX } from "lucide-react";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useNavigate } from "react-router-dom";

// ASSETS
import whatsappAnime from "@/assets/animation/whatsappanimation.json";
import whatsappAnime2 from "@/assets/animation/whatsappanimation2.json";
import smsAnime from "@/assets/animation/smsanime.json";
import rcs from "@/assets/animation/rcs.json";
import sms from "@/assets/animation/sms.json";
import auth from "@/assets/animation/auth.json";
import email from "@/assets/animation/email.json";
import email2 from "@/assets/animation/email2.json";
import integration from "@/assets/animation/integration.json";
import Animationsms from "@/assets/animation/Animation-sms.json";
import Animationrcs from "@/assets/animation/Animation-rcs.json";
import Animationibd from "@/assets/animation/Animation-ibd.json";
import Animationobd from "@/assets/animation/Animation-obd.json";
import zohoicon from "@/assets/icons/zoho.svg";
import zapier from "@/assets/icons/zapier.svg";
import wordpress from "@/assets/icons/wordpress.svg";
import woocommerce from "@/assets/icons/woocommerce.svg";
import telegram from "@/assets/icons/telegram.svg";
import slack from "@/assets/icons/slack.svg";
import shopify from "@/assets/icons/shopify.svg";
import instagram from "@/assets/icons/instagram.svg";
import freshdesk from "@/assets/icons/freshdesk.svg";
import facebookmessenger from "@/assets/icons/facebookmessenger.svg";
import Animationwhatsapp2 from "@/assets/animation/Animation-whatsapp2.json";
import twowaysms from "@/assets/animation/twowaysms.json";
import twowaysmsnew from "@/assets/animation/twowaysmsnew.json";

// CONTEXT
import { useUser } from "@/context/auth";

// APIS
import { getUserDetails } from "@/apis/user/user";
import { getUserPreference } from "@/apis/whatsapp/whatsapp";
import {
  dailySeriveUsage,
  dailyWalletUsage,
  fetchBalance,
  getOldApiKey,
} from "@/apis/settings/setting";

// COMPONENTS
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import ClockCard from "./components/ClockCard";
import RevenueChartWithFilter from "./components/balanceChart";
import LineGraphChart from "./components/account";
import MetricsDashboard from "./components/bots";
import ServiceUsageDashboard from "./components/ServiceUsageDashboard";
// import ParticleRing from "./components/ParticleRing";
import AccountExpiryFormat from "./components/AccountExpiryFormat";
import WalletUsage from "./components/walletUsage";

const revenueData = [
  { name: "Mon", online: 14000, offline: 11000 },
  { name: "Tue", online: 16000, offline: 12000 },
  { name: "Wed", online: 8000, offline: 22000 },
  { name: "Thu", online: 17000, offline: 7000 },
  { name: "Fri", online: 13000, offline: 11000 },
  { name: "Sat", online: 16000, offline: 14000 },
  { name: "Sun", online: 20000, offline: 12000 },
];

const satisfactionData = [
  { name: "Week 1", last: 400, current: 600 },
  { name: "Week 2", last: 380, current: 800 },
  { name: "Week 3", last: 410, current: 900 },
  { name: "Week 4", last: 600, current: 1057 },
];

const targetRealityData = [
  { name: "Jan", reality: 5000, target: 7000 },
  { name: "Feb", reality: 6000, target: 9000 },
  { name: "Mar", reality: 7000, target: 9500 },
  { name: "Apr", reality: 8200, target: 11000 },
  { name: "May", reality: 9000, target: 12000 },
  { name: "Jun", reality: 9400, target: 12500 },
  { name: "Jul", reality: 9800, target: 13000 },
];

// const quickStats = [
//     {
//         icon: <TaskAlt className="text-green-600" />,
//         label: "Active Campaigns",
//         value: 32,
//     },
//     {
//         icon: <TrendingUp className="text-blue-600" />,
//         label: "Engagement Rate",
//         value: "78%",
//     },
//     {
//         icon: <Star className="text-yellow-500" />,
//         label: "Client Rating",
//         value: "4.8/5",
//     },
// ];

const bots = [
  {
    name: "Support Bot",
    desc: "Handles common queries 24/7",
    icon: SupportAgent,
  },
  {
    name: "Onboarding Bot",
    desc: "Welcomes and guides new users",
    icon: SmartToy,
  },
  { name: "Feedback Bot", desc: "Collects customer feedback", icon: Feedback },
];

const ResellerDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
  });
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

  useEffect(() => {
    getBalance();
  }, []);

  // =======================================daily service usage end=================================================

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [walletUsageData, setWalletUsageData] = useState([]);
  const [activeServices, setActiveServices] = useState([]);
  const [salesPerson, setSalesPerson] = useState({});

  const FILTERS = ["Day", "Month", "Year"];

  const icons = {
    whatsapp: <FaWhatsapp className="text-green-500 text-2xl" />,
    voice: <FaPhone className="text-blue-500 text-2xl" />,
    rcs: <FaRegCommentDots className="text-indigo-500 text-2xl" />,
    sms: <FaSms className="text-yellow-500 text-2xl" />,
  };

  const [filter, setFilter] = useState("Day");
  const [usageData, setUsageData] = useState(null);

  const dailyServiceUsage = async () => {
    const payload = {
      userSrno: 0,
      fromDate: moment(startDate).format("YYYY-MM-DD"),
      toDate: moment(endDate).format("YYYY-MM-DD"),
    };
    setIsLoading(true);
    try {
      const data = await dailySeriveUsage(payload);

      if (data && Object.keys(data).length > 0) {
        setUsageData(data);
      } else {
        setUsageData({});
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setUsageData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const servicesDailyUsage = ["whatsapp", "voice", "rcs", "sms"];

  const chartData = servicesDailyUsage.map((s) => {
    const item = usageData?.[s]?.[0] || {};
    return {
      name: s.toUpperCase(),
      totalSent: item.totalSent || 0,
      totalCharge: item.totalCharge || 0,
    };
  });

  // useEffect(() => {
  //   dailyServiceUsage();
  // }, []);

  useEffect(() => {
    const today = new Date();

    if (filter === "Day") {
      const newStart = new Date(today);
      const newEnd = new Date(today);
      setStartDate(newStart);
      setEndDate(newEnd);
    } else if (filter === "Month") {
      setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setEndDate(today);
    } else if (filter === "Year") {
      setStartDate(new Date(today.getFullYear(), 0, 1));
      setEndDate(today);
    }
  }, [filter]);

  const getUserPref = async () => {
    try {
      const data = {
        pageIndex: "",
        pageSize: ""
      }
      const res = await getUserPreference(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserPref()
  }, [])

  useEffect(() => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      dailyServiceUsage();
    }
  }, [startDate, endDate]);

  // ======================================daily service usage end=================================================

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await getUserDetails();
        if (res?.statusCode === 200) {
          const user = res.data[0];
          setUserData(user);

          // 2) Derive the flat list of ACTIVE service names:
          const names = Array.isArray(user.services)
            ? user.services.map((s) => s.display_name.toUpperCase())
            : [];
          setActiveServices(names);

          if (user.salesPersonDetail) {
            const { name, mobileNumber, emailId } = user.salesPersonDetail;
            setSalesPerson({
              name: name || "N/A",
              mobileNumber: mobileNumber || "N/A",
              emailId: emailId || "N/A",
            });
          }
        } else {
          throw new Error("Non-200 status code");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user details!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const quickStats = [
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
    {
      icon: <TrendingUp className="text-blue-600" />,
      label: "Engagement Rate",
      value: "78%",
    },
    // {
    //   icon: <ManageAccountsIcon className="text-blue-600" />,
    //   label: "Sales User Details",
    //   value: (
    //     <div className="text-sm text-gray-700 leading-tight">
    //       <p className="text-xs"><strong>Name:</strong> {salesPerson.name}</p>
    //       <p className="text-xs"><strong>Mobile:</strong> {salesPerson.mobileNumber}</p>
    //       <p className="text-xs"><strong>Email:</strong> {salesPerson.emailId}</p>
    //     </div>
    //   ),
    // },
    {
      icon: [
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <Star className="text-yellow-500" />,
        <StarHalfOutlinedIcon className="text-yellow-500" />,
      ],
      label: "Client Rating",
      value: "4.8/5",
    },
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
    // {
    //   name: "Two-WAY-SMS",
    //   icon: SyncAlt,
    //   displayName: "Two-Way SMS",
    //   animation: twowaysms,
    //   desc: "Bi-directional messaging",
    //   color: "from-red-100 to-red-300",
    // },
    {
      name: "HLR",
      icon: SyncAlt,
      displayName: "Number Lookup",
      animation: twowaysms,
      desc: "Real-time number validation",
      color: "from-red-100 to-red-300",
      quickLinks: [
        { url: "hlrlookup", label: "HLR Lookup" },
        { url: "lookupreports", label: "LookUp Report" },
      ],
    },
  ];

  const rawData = [
    { date: "2025-07-01T10:00:00Z", online: 1200, offline: 800, balance: 5000 },
    { date: "2025-07-02T15:30:00Z", online: 300, offline: 200, balance: 5300 },
  ];

  const rawDatanew = [
    {
      date: "2025-07-01T10:00:00Z",
      whatsapp: 1200,
      rcs: 800,
      sms: 500,
      obd: 700,
    },
    {
      date: "2025-07-01T15:00:00Z",
      whatsapp: 300,
      rcs: 200,
      sms: 150,
      obd: 100,
    },
    {
      date: "2025-07-02T10:00:00Z",
      whatsapp: 1500,
      rcs: 600,
      sms: 400,
      obd: 600,
    },
  ];

  //==================================== Add Integrations start=============================================
  const [oldApiKey, setOldApiKey] = useState("");
  const [visible, setVisible] = useState(false);
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  useEffect(() => {
    const handlegetOldApiKey = async () => {
      try {
        const res = await getOldApiKey();
        if (res.status === 200) {
          setOldApiKey(res.oldkey);
        } else {
          toast.error("Error fetching old API Key else");
        }
      } catch (e) {
        // console.log(e);
        toast.error("Error fetching old API Key");
      }
    };
    handlegetOldApiKey();
  }, []);

  const integrationUrl = `https://int.celitix.com/?user_id=${oldApiKey}&api_key=AIzaSyBqlfMk-_yK_3ICUUYej_nVUDXz0cP327Y`;
  // console.log("final integration url", integrationUrl);

  const iconSize = 48;

  function generateRandomPath() {
    const points = [];
    const pointCount = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < pointCount; i++) {
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      points.push(`${i === 0 ? "M" : "L"}${x},${y}`);
    }

    return points.join(" ");
  }

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
        className="rounded-2xl shadow-md p-6 flex items-center justify-center sm:justify-between flex-wrap gap-6 bg-linear-to-br from-blue-50 to-blue-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex gap-4 items-center">
            <div className="bg-blue-200 border-2 border-indigo-400 h-16 w-16 flex items-center justify-center rounded-full shadow-2xl">
              {/* <Person
              className="text-blue-600"
              sx={{
                fontSize: 30,
                }}
            /> */}
              <span className="text-indigo-600 text-2xl font-semibold">
                {(userData.firstName || "U").charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="">
              <h2 className="text-3xl font-semibold playf">
                Welcome back, {userData.firstName || "User"}{" "}
              </h2>
              <p className="text-xs opacity-80">
                You're doing great. Here's a quick overview of your dashboard.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-5">
            {quickStats.map((stat, i) => (
              <div
                key={i}
                className="relative bg-white rounded-xl shadow p-3 px-4 flex flex-col items-start justify-center md:w-50"
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
                        <button onClick={getBalance} className="">
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
        </div>
        {/* {salesPerson?.name && salesPerson.name !== "N/A" ? (
          <div
            className="glass-card w-full sm:w-[340px] h-60 py-4 px-5 rounded-2xl flex flex-col justify-start transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer bg-gray-50"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.38)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full bg-linear-to-br from-blue-200 via-blue-300 to-blue-100 flex items-center justify-center font-bold text-xl text-gray-700 ring-2 ring-gray-800/50 shadow-lg"
              >
                {salesPerson.name?.charAt(0) || "S"}
              </div>

              <div>
                <h3 className="text-gray-800 font-semibold text-base drop-shadow-sm">
                  {salesPerson.name}
                </h3>
                <p className="text-xs text-gray-800 flex items-center gap-1">
                  <Briefcase size={13} className="text-gray-800" />
                  Sales Executive
                </p>
              </div>
            </div>

            <div className="w-full my-2"></div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-gray-800 ">
                <Phone size={16} className="text-gray-800/90" />
                <span className="font-medium">
                  {salesPerson.mobileNumber || "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-800">
                <Mail size={16} className="text-gray-800/90" />
                <span className="font-medium break-all">
                  {salesPerson.emailId || "N/A"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )} */}

        {/* {salesPerson?.name && salesPerson.name !== "N/A" ? (
          <div className="relative w-full sm:w-[370px] h-64 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white">

            <div className="absolute top-0 left-0 w-full h-[40%] bg-[#0A4D92]"></div>

            <svg
              className="absolute top-[28%] left-0 w-full"
              viewBox="0 0 500 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C150,120 350,-20 500,80 L500,00 L0,0 Z"
                fill="#0A4D92"
              />
            </svg>

            <div className="relative z-10 p-5 pt-6 text-gray-800 h-full flex flex-col justify-between">

              <div className="text-center -mt-1">
                <p className="text-sm font-semibold text-white drop-shadow-sm flex items-center justify-center gap-1">
                  <Briefcase size={14} /> Account Manager
                </p>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="w-16 h-16 bg-white rounded-full shadow-md ring-1 ring-gray-200 flex items-center justify-center font-bold text-2xl text-[#0A4D92]">
                  {salesPerson.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {salesPerson.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">Sales Executive</p>
                </div>
              </div>

              <div className="space-y-3 text-sm mt-2">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#0A4D92]" />
                  <span className="font-medium">{salesPerson.mobileNumber || "N/A"}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#0A4D92]" />
                  <span className="font-medium break-all">{salesPerson.emailId || "N/A"}</span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div></div>
        )} */}

        {salesPerson?.name && salesPerson.name !== "N/A" ? (
          // <div className="relative w-full sm:w-[360px] h-54 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white">
          //   {/* Top Solid Color Section */}
          //   <div className="absolute top-0 left-0 w-full h-[20%] bg-[#003A77] flex items-center px-5 z-[999]">
          //     <p className="text-white text-sm font-medium flex items-center gap-1">
          //       <Briefcase size={14} /> Account Manager
          //     </p>
          //   </div>

          //   {/* Curve Divider – positioned lower */}
          //   <svg
          //     className="absolute top-[8%] left-0 w-full -z-0"
          //     viewBox="0 0 500 120"
          //     preserveAspectRatio="none"
          //   >
          //     <path
          //       d="M0,40 C160,120 340,-20 500,60 L500,00 L0,0 Z"
          //       fill="#003A77"
          //     />
          //   </svg>

          //   {/* Main Content */}
          //   <div className="relative z-10 px-5 pt-14">
          //     {/* Profile + Name */}
          //     <div className="flex items-center gap-3">
          //       <div className="w-14 h-14 bg-white rounded-xl shadow-md ring-1 ring-[#003A77]/20 flex items-center justify-center text-[#003A77] font-bold text-xl">
          //         {salesPerson.name?.charAt(0)}
          //       </div>

          //       <div className="flex flex-col leading-tight">
          //         <span className="text-[17px] font-semibold text-gray-900">
          //           {salesPerson.name}
          //         </span>
          //         <span className="text-xs text-gray-500">Sales Executive</span>
          //       </div>
          //     </div>

          //     {/* Contact Box */}
          //     <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
          //       <div className="flex items-center gap-2 mb-2 text-sm">
          //         <Phone size={15} className="text-[#003A77]" />
          //         <span className="font-medium text-gray-800">
          //           {salesPerson.mobileNumber || "N/A"}
          //         </span>
          //       </div>

          //       <div className="flex items-center gap-2 text-sm">
          //         <Mail size={15} className="text-[#003A77]" />
          //         <span className="font-medium text-gray-800 break-all">
          //           {salesPerson.emailId || "N/A"}
          //         </span>
          //       </div>
          //     </div>
          //   </div>
          // </div>

          <div className="relative w-full sm:w-[360px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <Briefcase size={15} />
                Account Manager
              </div>

              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                Active
              </span>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                {salesPerson.name?.charAt(0)}
              </div>

              <div className="flex flex-col">
                <span className="text-[16px] font-semibold text-gray-900">
                  {salesPerson.name}
                </span>
                <span className="text-xs text-gray-500">Sales Executive</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-gray-200" />

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={14} className="text-indigo-500" />
                <span className="font-medium">
                  {salesPerson.mobileNumber || "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Mail size={14} className="text-indigo-500" />
                <span className="font-medium break-all">
                  {salesPerson.emailId || "N/A"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </motion.div>

      {/* service cards start */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Service Cards */}
        <Grid container spacing={3}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const hasService = user.services?.some(
              (s) => s.display_name.toLowerCase() === service.name.toLowerCase()
            );
            return (
              // <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
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
                  <div className="font-semibold text-lg text-gray-900">
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
            // <div
            //   className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
            //   onClick={() => setSelectedService(null)}>
            //   <motion.div
            //     onClick={(e) => e.stopPropagation()}
            //     initial={{ scale: 0.7, opacity: 0 }}
            //     animate={{ scale: 1, opacity: 1 }}
            //     exit={{ scale: 0.7, opacity: 0 }}
            //     className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative max-w-[90%]"
            //   >
            //     {/* Close Button */}
            //     <button
            //       onClick={() => setSelectedService(null)}
            //       className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            //     >
            //       ✕
            //     </button>

            //     {/* Header */}
            //     <h2 className="text-xl font-semibold mb-2 text-gray-900">
            //       {selectedService?.displayName}
            //     </h2>
            //     <p className="text-sm text-gray-600 mb-4">
            //       {selectedService?.desc}
            //     </p>

            //     {/* Link section */}
            //     {selectedServiceHasAccess ? (
            //       <div className="flex flex-col gap-3">
            //         {selectedService?.quickLinks?.length > 0 ? (
            //           selectedService.quickLinks.map((link, i) => (
            //             <button
            //               key={i}
            //               onClick={() => {
            //                 setSelectedService(null);
            //                 setTimeout(() => navigate(link.url), 10);
            //               }}
            //               className="flex items-center justify-center gap-2 bg-blue-300 hover:bg-blue-400 text-gray-800 px-3 py-2 rounded-xl shadow hover:shadow-lg transition-all font-medium text-sm"
            //             >
            //               <LinkOutlinedIcon size={20} />
            //               {link.label}
            //             </button>
            //           ))
            //         ) : (
            //           <p className="text-xs text-red-600 col-span-2 text-center">
            //             No Quick Links Found!
            //           </p>
            //         )}
            //       </div>
            //     ) : (
            //       <div className="flex flex-col items-center gap-3 text-center">
            //         <span className="text-red-600 text-lg font-semibold">
            //           Service Not Active
            //         </span>
            //         <p className="text-sm text-gray-600">
            //           Please activate this service to use these features.
            //         </p>
            //       </div>
            //     )}
            //   </motion.div>
            // </div>

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
      </motion.div>

      {/* service cards end */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
        <div className="w-full">
          {/* Add Integrations Start */}
          {user.role === "DIRECTUSER" && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={openDialog}
              className="cursor-pointer group relative p-6 rounded-2xl shadow-md bg-gradient-to-tr from-blue-50 via-white to-blue-100 border-2 border-dashed border-blue-200 hover:shadow-xl transition-all overflow-hidden h-full"
            >
              <div className="relative  flex-col md:flex-row items-center justify-around space-y-2">
                <div className="flex flex-col items-center">
                  <Lottie
                    animationData={integration}
                    loop
                    autoplay
                    className="w-35 h-auto"
                  />
                  <h2 className="text-4xl font-extrabold text-gray-800 playf bluetxt">
                    Add Integrations
                  </h2>
                  <p className="text-gray-500 text-center text-sm">
                    Connect Freshdesk, Zoho, Shopify, and more from a single
                    dashboard.
                  </p>
                </div>

                <motion.div
                  layout
                  className="flex justify-center items-center flex-wrap mt-4 transition-all duration-500 gap-12 group-hover:gap-13"
                >
                  {[
                    { icon: <img src={zohoicon} alt="" className="w-22" /> },
                    { icon: <img src={zapier} alt="" className="w-12" /> },
                    { icon: <img src={wordpress} alt="" className="w-12" /> },
                    { icon: <img src={woocommerce} alt="" className="w-14" /> },
                    { icon: <img src={slack} alt="" className="w-12" /> },
                    { icon: <img src={telegram} alt="" className="w-12" /> },
                    { icon: <img src={shopify} alt="" className="w-12" /> },
                    { icon: <img src={instagram} alt="" className="w-12" /> },
                    { icon: <img src={freshdesk} alt="" className="w-25" /> },
                    {
                      icon: (
                        <img src={facebookmessenger} alt="" className="w-10" />
                      ),
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className={`transition-all duration-300`}
                      whileHover={{ scale: 1.25 }}
                      animate={{ scale: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <p className="relative text-xs text-gray-400 mt-5 text-center">
                Click to configure integrations
              </p>
            </motion.div>
          )}
        </div>

        <div className="w-full">
          <WalletUsage />
        </div>
      </div>
      <Dialog
        header="CPaaS Integrations Panel"
        visible={visible}
        // style={{ width: "70vw", maxWidth: "75vw", height: "70vh" }}
        className="lg:w-[70vw] md:w-[45rem] w-[25rem]"
        style={{ height: "70vh" }}
        onHide={() => setVisible(false)}
        draggable={false}
        maximizable
      >
        {/* <div>
          <button onClick={() => window.open(integrationUrl, "_blank")}>Open</button>
        </div> */}
        <iframe
          src={integrationUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          className="rounded-md"
        ></iframe>
      </Dialog>
      {/* Add Integrations End */}

      {/* <ParticleRing /> */}
      {/* Account expiry format start */}
      <AccountExpiryFormat />
      {/* Account expiry format end */}

      {/*Service Usage Overview start  */}
      {user.role === "DIRECTUSER" && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ServiceUsageDashboard />
        </motion.div>
      )}
      {/* Service Usage Overview End  */}

      {/* bots & flows start */}
      {user.role === "DIRECTUSER" && (
        <motion.div
          className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-md p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MetricsDashboard />
        </motion.div>
      )}
      {/* bots & flows End */}
    </div>
  );
};

export default ResellerDashboard;
