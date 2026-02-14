import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// ICONS 
import { Mail, PauseCircle } from "lucide-react";

// APIS 
import { getUserDetails } from "@/apis/user/user";
import { fetchAllConversations, getWabaList } from "@/apis/whatsapp/whatsapp";

// COMPONENTS 
import Loader from "@/whatsapp/components/Loader";

// CONTEXT 
import { useUser } from "@/context/auth";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [totalConvo, setTotalConvo] = useState(null);
  const [activeConvo, setActiveConvo] = useState(null);
  const [inactiveConvo, setInActiveConvo] = useState(null);
  const [activeUnreadMsg, setActiveUnreadMsg] = useState(null);
  const [inactiveUnreadMsg, setInactiveUnreadMsg] = useState(null);
  const [wabaState, setWabaState] = useState({
    waba: [],
    selectedWaba: "",
    wabaSrno: "",
  });

  async function fetchWaba() {
    const res = await getWabaList();
    setWabaState((prev) => ({
      ...prev,
      waba: res,
    }));
  }

  useEffect(() => {
    fetchWaba();
  }, [userData]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsFetching(true);

        const data = {
          mobileNo: wabaState?.waba?.[0]?.mobileNo || "",
          srno: 0,
          active: 1,
          search: "",
          agentSrno: "",
        };

        const res = await fetchAllConversations(data);

        setActiveConvo(res.conversationEntityList);
        setActiveUnreadMsg(res.unreadCounts);
      } catch (e) {
        toast.error("Error fetching active conversations");
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    };

    fetchConversations();
  }, [userData]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsFetching(true);

        const data = {
          mobileNo: wabaState?.waba?.[0]?.mobileNo || "",
          srno: 0,
          active: 0,
          search: "",
          agentSrno: "",
        };

        const res = await fetchAllConversations(data);

        setInActiveConvo(res.conversationEntityList);
        setInactiveUnreadMsg(res.unreadCounts);
      } catch (e) {
        toast.error("Error fetching active conversations");
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    };

    fetchConversations();
  }, [userData]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const response = await getUserDetails();

      if (response && response.statusCode === 200) {
        setUserData(response.data);
      } else {
        console.error("Failed to load user details.");
        toast.error("Failed to load user details!");
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const user = {
    name: "Pablo Nicolus",
    location: "NY, USA",
    inbox: 23,
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="bg-white text-gray-900 rounded-3xl md:p-6 p-3 space-y-6 shadow-xl overflow-hidden">
      {/* Welcome Card */}
      <div className="relative bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 rounded-3xl p-6 md:p-8 shadow-md border border-gray-200 overflow-hidden">
        <motion.div
          variants={cardVariants}
          className="relative flex flex-col md:flex-row items-start md:items-center justify-between z-10 h-30"
        >
          {/* Foreground Content */}
          <div className="text-center md:text-left space-y-1 z-10">
            <p className="text-4xl font-extrabold bg-gradient-to-r from-[#2596be] via-[#dba7e5] to-[#2596be] text-transparent bg-clip-text">
              Welcome Back
            </p>
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#2596be]">
              {userData?.name
                ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
                : ""}
            </h1>
          </div>
        </motion.div>

        {/* Background SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[40%] md:h-[60%] z-0"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#0099ff"
            fillOpacity="0.4"
            d="M0,256L40,240C80,224,160,192,240,176C320,160,400,160,480,165.3C560,171,640,181,720,192C800,203,880,213,960,218.7C1040,224,1120,224,1200,202.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
        M0,256L40,240C80,224,160,192,240,176C320,160,400,160,480,165.3C560,171,640,181,720,192C800,203,880,213,960,218.7C1040,224,1120,224,1200,202.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L0,320Z;

        M0,224L40,208C80,192,160,160,240,144C320,128,400,128,480,144C560,160,640,192,720,202.7C800,213,880,203,960,186.7C1040,171,1120,149,1200,144C1280,139,1360,149,1400,154.7L1440,160L1440,320L0,320Z;

        M0,256L40,240C80,224,160,192,240,176C320,160,400,160,480,165.3C560,171,640,181,720,192C800,203,880,213,960,218.7C1040,224,1120,224,1200,202.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L0,320Z"
            />
          </path>
        </svg>
      </div>

      {/* Profile Section */}
      <div className="space-y-6">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 p-6 rounded-xl shadow-sm border border-gray-200">
            {/* Left Side */}
            <div className="text-center md:text-left space-y-1">
              <p className="text-2xl font-extrabold bg-gradient-to-r from-[#2596be] via-[#dba7e5] to-[#2596be] text-transparent bg-clip-text">
                Profile
              </p>
              <h3 className="text-base sm:text-lg font-bold text-[#2596be]">
                {userData?.name &&
                  userData.name.charAt(0).toUpperCase() +
                  userData.name.slice(1)}
              </h3>
              <p className="text-sm text-gray-600">{userData?.email}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 px-3 py-1 rounded-full bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 shadow-sm border border-gray-200">
                  {userData?.departmentName}
                </p>
                {userData?.status === 1 && (
                  <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Avatar */}
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#a7dce5] flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg border-2 border-white">
                {userData?.name?.charAt(0).toUpperCase()}
              </div>
              {userData?.status === 1 && (
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow"></span>
              )}
            </motion.div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-[#E6E6FA] rounded-lg p-3 text-center hover:scale-105 transition">
              <p className="text-[10px] sm:text-xs text-gray-800">
                Total Chats
              </p>
              <p className="font-semibold">
                {activeConvo?.length + inactiveConvo?.length}
              </p>
            </div>
            <div className="bg-[#d3eef2] rounded-lg p-3 text-center hover:scale-105 transition">
              <p className="text-[10px] sm:text-xs text-gray-800">
                Active Chats
              </p>
              <p className="font-semibold">{activeConvo?.length}</p>
            </div>
            <div className="bg-[#d9d3f2] rounded-lg p-3 text-center hover:scale-105 transition">
              <p className="text-[10px] sm:text-xs text-gray-800">
                Inactive Chats
              </p>
              <p className="font-semibold">{inactiveConvo?.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Inbox + Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Inbox Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          variants={cardVariants}
          className="bg-gradient-to-t from-indigo-100 via-purple-50 to-blue-100 rounded-xl p-6 shadow-sm border border-purple-100"
        >
          <p className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-[#2596be] via-[#dba7e5] to-[#2596be] text-transparent bg-clip-text">
            Inbox
          </p>
          <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 gap-4">
            {/* Active Unread */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl shadow-sm bg-indigo-100/60 backdrop-blur-sm border border-gray-200"
            >
              <div className="hidden sm:flex items-center justify-center gap-2 text-gray-800">
                <Mail size={20} />
                <p className="text-sm font-medium">Active Unread</p>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                {activeUnreadMsg?.length}
              </h2>
            </motion.div>

            {/* Inactive Unread */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl shadow-sm bg-indigo-100/60 backdrop-blur-sm border border-gray-200"
            >
              <div className="hidden sm:flex items-center justify-center gap-2 text-gray-800">
                <PauseCircle size={20} />
                <p className="text-sm font-medium">Inactive Unread</p>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                {inactiveUnreadMsg?.length}
              </h2>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Overview */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          variants={cardVariants}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <p className="text-sm font-semibold text-slate-600">Quick Overview</p>
          <motion.div
            className="mt-3 flex flex-col gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-rose-50 rounded-lg p-3 text-center hover:scale-105 transition">
              <p className="text-xs text-rose-600">Total Read Chats</p>
              <p className="font-semibold">
                {activeConvo?.length -
                  activeUnreadMsg?.length +
                  (inactiveConvo?.length - inactiveUnreadMsg?.length)}
              </p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center hover:scale-105 transition">
              <p className="text-xs text-emerald-600">Active Read Chats</p>
              <p className="font-semibold">
                {activeConvo?.length - activeUnreadMsg?.length}
              </p>
            </div>
            <div className="bg-sky-50 rounded-lg p-3 text-center hover:scale-105 transition">
              <p className="text-xs text-sky-600">Inactive Read Chats</p>
              <p className="font-semibold">
                {inactiveConvo?.length - inactiveUnreadMsg?.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
