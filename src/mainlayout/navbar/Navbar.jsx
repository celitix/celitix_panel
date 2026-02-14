import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { motion } from "framer-motion";
import { useMediaQuery, Menu, MenuItem, IconButton } from "@mui/material";
import { collapse } from "@material-tailwind/react";
import { Dialog } from "primereact/dialog";

// ICONS
import { FaBars } from "react-icons/fa";
import { BookOpen, ExternalLink, LifeBuoy } from "lucide-react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  AccountBalanceWalletOutlined as WalletIcon,
  PersonPinCircleOutlined as IpAddress,
  FileDownloadOutlined as DownloadIcon,
  AccountCircleRounded as ProfileIcon,
  SettingsOutlined as SettingsIcon,
  AccountCircle as AccountIcon,
  InfoOutlined as InfoIcon,
  Payments as PaymentsIcon,
  MoreVert as MoreIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  Loop as LoopIcon,
} from "@mui/icons-material";
import {
  FiAlertCircle,
  FiMessageSquare,
  FiSmartphone,
  FiSend,
} from "react-icons/fi";
import { VscVersions } from "react-icons/vsc";

// CONTEXT
import { useUser } from "@/context/auth";
import { useDownload } from "@/context/DownloadProvider";

// ASSETS
import celitixLogo from "@/assets/images/celitix-cpaas-solution-logo.svg";

// APIS
import { getaccountInfo } from "@/apis/user/user";
import { fetchBalance, fetchIpDetails } from "@/apis/settings/setting";
// import { getUserDetails } from "@/apis/user/user";


// COMPONENTS
import UniversalAccountInfo from "@/profile/components/UniversalAccountInfo";
import CustomTooltip from "@/components/common/CustomTooltip";
import SupportTicketDialog from "@/supportticker/SupportTicketDialog";
import { useUserData } from "@/context/UserContext";
// import { SupportTicketDialog } from "@/supportticker/SupportTicketDialog";


const Navbar = ({ isCollapsed, setIsCollapsed }) => {
  const { authLogout, user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [balance, setBalance] = useState(0);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  const [supportAnchorEl, setSupportAnchorEl] = useState(null);

  const handleSupportClick = (event) => setSupportAnchorEl(event.currentTarget);
  const handleSupportClose = () => setSupportAnchorEl(null);

  const handleOpenCreateTicket = () => {
    setIsTicketOpen(true);
    handleSupportClose();
  };

  const handleViewJourney = () => {
    navigate("/support-journey");
    handleSupportClose();
  };

  const { hasNewDownloads } = useDownload();
  const { userData } = useUserData();


  const handleBalance = async () => {
    setIsFetchingBalance(true);
    const res = await fetchBalance();
    setBalance(res.balance || 0);
    setTimeout(() => setIsFetchingBalance(false), 600);
  };

  useEffect(() => {
    if (user?.role === "AGENT") return;
    handleBalance();
  }, []);

  const toggleSidebar = useCallback(
    () => setIsCollapsed((prev) => !prev),
    [setIsCollapsed]
  );

  const handleProfileMenu = useCallback(
    (event) => setProfileAnchorEl(event?.currentTarget || null),
    []
  );

  const handleViewProfile = useCallback(() => {
    handleProfileMenu();
    navigate("/profile");
  }, [navigate]);

  const handleViewDownload = useCallback(() => {
    navigate("/download");
  }, [navigate]);

  const handleLoginDetails = useCallback(() => {
    handleProfileMenu();
    navigate("/loginIpdetails");
  }, [navigate]);

  const handleTransactionHistory = useCallback(() => {
    handleProfileMenu();
    navigate("/transactions");
  }, [navigate]);

  const handleViewSetting = useCallback(() => {
    handleProfileMenu();
    navigate("/settings");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("token");
    toast.success("Logged out successfully!");
    window.location.href = "/login";
    setTimeout(() => authLogout(), 1000);
    // authLogout();
    // setTimeout(() => (window.location.href = "/login"), 1000);
  }, []);

  const handleApiDocs = () => {
    navigate("/docs/quickstart");
  };

  const handleMenu = useCallback(
    (event) => setMenuAnchorEl(event?.currentTarget || null),
    []
  );

  useEffect(() => {
    // console.log("isCollapsed", isCollapsed);
  }, [isCollapsed]);

  const [ipDetails, setIpDetails] = useState([]);

  useEffect(() => {
    const IpDetails = async () => {
      const response = await fetchIpDetails();
      setIpDetails(response[0]);
    };
    IpDetails();
  }, []);

  const [openVersion, setOpenVersion] = useState(false);

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleVersion = () => {
    setOpenVersion(true);
    handleProfileMenuClose();
  };
  const hideVersion = () => setOpenVersion(false);

  return (
    <nav className="flex items-center w-full px-4 bg-white h-14 lg:h-16 md:h-15">
      <div className="flex items-center gap-4">
        <input
          className="toggle-checkbox"
          id="toggle"
          type="checkbox"
          checked={isCollapsed}
          onChange={(event) => {
            setIsCollapsed((prev) => !prev);
          }}
        />
        <label className="hamburger" htmlFor="toggle">
          <div className="bar bg-black"></div>
          <div className="bar bg-black"></div>
          <div className="bar bg-black"></div>
        </label>

        <img src={celitixLogo} width={120} height={80} alt="Celitix Logo" />
      </div>

      {!isMobile ? (
        <div className="flex gap-3 items-center ml-auto">
          {user.role === "DIRECTUSER" && (
            <>
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center">
                  <div className="relative p-[1px] rounded-full overflow-hidden group shadow-sm transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300"></div>

                    <div className="relative flex items-center bg-white rounded-full px-4 py-1.5 gap-3">
                      <div className="flex items-center gap-2 border-r border-slate-100 pr-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">UID</span>
                        <span className="text-[13px] font-mono font-bold text-slate-700">
                          {ipDetails?.user_id || "-"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">IP</span>
                        <div className="flex items-center gap-2 border-r border-slate-100 pr-3">
                          <span className="text-[13px] font-mono font-bold text-slate-700">
                            {ipDetails?.ip || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- SUPPORT BUTTON --- */}

                <CustomTooltip title="Support Helpdesk" placement="bottom" arrow>
                  <div
                    onClick={handleSupportClick}
                    className="relative p-[1px] rounded-full overflow-hidden group shadow-sm active:scale-95 transition-transform cursor-pointer"
                  >
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300"></div>

                    {/* Inner Button Content */}
                    <div className="relative flex items-center gap-2 px-4 py-1.5 bg-white rounded-full">
                      <FiMessageSquare className="text-blue-600 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Support
                      </span>
                    </div>
                  </div>
                </CustomTooltip>


                {/* --- API DOCS BUTTON --- */}

                <Link
                  to="/docs/quickstart"
                  className="relative p-[1px] rounded-full overflow-hidden group shadow-sm active:scale-95 transition-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300"></div>
                  <div className="relative flex items-center gap-2 px-4 py-1.5 bg-white rounded-full">
                    <BookOpen className="h-4 w-4 text-blue-600 transition-transform group-hover:rotate-12" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      API Docs
                    </span>
                  </div>
                </Link>

                {/* Support Dropdown Menu */}
                <Menu
                  anchorEl={supportAnchorEl}
                  open={Boolean(supportAnchorEl)}
                  onClose={handleSupportClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      borderRadius: "12px",
                      mt: 1.5,
                      minWidth: 200,
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.1))',
                      border: '1px solid rgba(0,0,0,0.05)',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 24,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  <MenuItem onClick={handleOpenCreateTicket} className="py-3 px-4 hover:bg-slate-50">
                    <FiSend className="mr-3 text-blue-500" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-700">New Ticket</span>
                      <span className="text-[10px] text-slate-400">Get technical help</span>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleViewJourney} className="py-3 px-4 hover:bg-slate-50">
                    <HistoryIcon className="mr-3 text-slate-400" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-700">My Tickets</span>
                      <span className="text-[10px] text-slate-400">View history</span>
                    </div>
                  </MenuItem>
                </Menu>

                <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
              </div>
            </>
          )}

          {[
            ...(user?.role !== "AGENT"
              ? [
                {
                  title: "Account Info",
                  Icon: InfoIcon,
                  action: () => setShowModal(true),
                },
                {
                  title: `Balance: ₹${balance}`,
                  Icon: isFetchingBalance ? LoopIcon : WalletIcon,
                  action: handleBalance,
                  showBalance: true,
                },
                {
                  title: "Downloads",
                  Icon: DownloadIcon,
                  action: handleViewDownload,
                  customElement: (
                    <motion.div className="relative">
                      <CustomTooltip
                        title="Downloads"
                        placement="bottom"
                        arrow
                      >
                        <button
                          className={` group p-2 w-10 h-10 rounded-full overflow-hidden transition-all duration-300 ${hasNewDownloads
                            ? "bg-green-100 hover:bg-green-200"
                            : "bg-[#e6f4ff] hover:bg-gray-200"
                            }`}
                          onClick={handleViewDownload}
                        >
                          {hasNewDownloads ? (
                            <motion.div
                              animate={{ y: [0, 5, 0] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <DownloadIcon
                                className={`text-[18px] ${hasNewDownloads
                                  ? "text-green-800"
                                  : "text-blue-700"
                                  }`}
                              />
                            </motion.div>
                          ) : (
                            <DownloadIcon
                              className={`text-[18px] ${hasNewDownloads
                                ? "text-green-800"
                                : "text-blue-700"
                                }`}
                            />
                          )}

                          {hasNewDownloads && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "100%" }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="absolute bottom-0 left-0 w-full bg-green-300 z-0 opacity-40"
                              style={{ borderRadius: "50%" }}
                            ></motion.div>
                          )}

                          {hasNewDownloads && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: -28 }}
                              transition={{ delay: 0.5 }}
                              className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 w-40 text-xs text-green-800 rounded-full shadow-md z-[999999]"
                            >
                              Download in progress...
                            </motion.div>
                          )}
                        </button>
                      </CustomTooltip>
                    </motion.div>
                  ),
                },
              ]
              : []),
          ].map(({ title, Icon, action, customElement }, idx) => (
            <div key={idx}>
              {customElement ? (
                customElement
              ) : (
                <CustomTooltip key={idx} title={title} placement="bottom" arrow>
                  <button
                    className="relative p-2 rounded-full bg-[#e6f4ff] group overflow-hidden transition-all duration-300  hover:shadow-md cursor-pointer"
                    onClick={action}
                  >
                    <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 bg-indigo-200 transition-transform origin-bottom duration-300 z-0"></div>
                    <span className="relative z-10 text-blue-700">
                      {title.includes("Balance") && isFetchingBalance ? (
                        <LoopIcon className="text-[18px] animate-spin" />
                      ) : (
                        <Icon className="text-[18px]" />
                      )}
                    </span>
                  </button>
                </CustomTooltip>
              )}
            </div>
          ))}

          {/* Profile Button (Dropdown) */}
          <CustomTooltip title="Profile" placement="bottom" arrow>
            <button
              onClick={handleProfileMenu}
              className="p-2 rounded-full cursor-pointer bg-[#e6f4ff] hover:bg-gray-200"
            >
              <ProfileIcon className="text-xl text-blue-700" />
            </button>
          </CustomTooltip>

          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={() => handleProfileMenu()}
            PaperProps={{
              sx: {
                borderRadius: "15px",
                padding: "5px 0",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              },
              component: motion.div,
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.2 },
            }}
          >
            {[
              {
                text: "Profile",
                icon: <AccountIcon />,
                action: handleViewProfile,
              },
              ...(user?.role !== "AGENT"
                ? [
                  {
                    text: "Login Details",
                    icon: <IpAddress sx={{ fontSize: 26 }} />,
                    action: handleLoginDetails,
                  },
                  {
                    text: "Transaction History",
                    icon: <HistoryIcon />,
                    action: handleTransactionHistory,
                  },
                  {
                    text: "Settings",
                    icon: <SettingsIcon />,
                    action: handleViewSetting,
                  },
                  {
                    text: "Version 2.3",
                    icon: <VscVersions className="text-[20px]" />,
                    action: handleVersion,
                  },
                ]
                : []),
              { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
            ].map(({ text, icon, action }, idx) => (
              <MenuItem
                key={idx}
                sx={{
                  fontSize: "15px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  mx: 1,
                  gap: 0.5,
                  borderRadius: "8px",
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: "3px",
                  "&:hover": {
                    backgroundColor: "#e6f4ff",
                    color: "#1e3a8a",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.09)",
                    scale: 1.01,
                    transition: "all 0.2s ease-in",
                  },
                }}
                onClick={action}
              >
                {icon} <span className="ml-2">{text}</span>
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <div className="ml-auto">
          <IconButton onClick={handleMenu} className="text-gray-700">
            <label className="hamburger">
              <input
                type="checkbox"
                checked={Boolean(menuAnchorEl)}
                onChange={(event) => event?.currentTarget || null}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </IconButton>

          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={() => handleMenu()}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "15px",
                padding: "5px 0",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              },
              "MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-urgdh2-MuiButtonBase-root-MuiMenuItem-root":
              {
                "&:hover": {
                  backgroundColor: "#e6f4ff",
                  color: "#1e3a8a",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.09)",
                  scale: 1.01,
                  transition: "all 0.2s ease-in",
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: "3px",
                },
              },
            }}
            PaperProps={{
              component: motion.div,
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.2 },
            }}
          >
            {[
              {
                text: "Profile",
                icon: <ProfileIcon />,
                action: handleViewProfile,
              },
              ...(user?.role !== "AGENT"
                ? [
                  {
                    text: "Info",
                    icon: <InfoIcon />,
                    action: () => setShowModal(true),
                  },
                  { text: "Balance", icon: <WalletIcon /> },
                  {
                    text: "Download",
                    icon: <DownloadIcon />,
                    action: handleViewDownload,
                  },
                  {
                    text: "Login Details",
                    icon: <IpAddress />,
                    action: handleLoginDetails,
                  },
                  {
                    text: "Settings",
                    icon: <SettingsIcon />,
                    action: handleViewSetting,
                  },
                  {
                    text: "Transactions",
                    icon: <HistoryIcon />,
                    action: handleTransactionHistory,
                  },
                  {
                    text: "API Docs",
                    icon: <BookOpen className="w-auto h-5 inline" />,
                    action: handleApiDocs,
                  },
                  {
                    text: "Version 2.3",
                    icon: <VscVersions className="text-[20px]" />,
                    action: handleVersion,
                  },
                ] : []),
              { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
            ].map(({ text, icon, action }, idx) => (
              <MenuItem
                key={idx}
                sx={{ fontSize: "15px", fontWeight: "500" }}
                onClick={() => {
                  handleMenu();
                  action?.();
                }}
              >
                <div className="flex" >
                  {icon} <span className="ml-2">{text}</span>
                  {balance && text === "Balance" && (
                    <span className="ml-2 text-xs text-gray-500">
                      {balance}
                    </span>
                  )}
                </div>
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}

      {/* ****************Version Dialog********************** */}
      <Dialog
        visible={openVersion}
        onHide={hideVersion}
        draggable={false}
        className="w-[40rem]"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-3 pt-3 px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              <RocketLaunchIcon size={25} />
            </span>
            <h2 className="text-lg font-semibold tracking-wide">
              Version 2.3 Update
            </h2>
          </div>
        </div>

        {/* BODY */}
        <div className="px-4 py-4 space-y-5 text-gray-700 text-sm">
          {/* Utilities Section */}
          <div className="space-y-2">
            <p className="font-semibold text-[13.5px] text-gray-800">
              The following pages are now moved under the Utility menu:
            </p>

            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span> Text to PDF Converter
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span> Manage Contacts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span> WorkFlow
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span> CallBack
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span> Manage Agent
              </li>
            </ul>

            <p className="text-xs text-gray-500 italic pl-1">
              (Add Call Back & Edit Call Back will appear automatically when
              needed)
            </p>
          </div>

          {/* Profile Menu Section */}
          <div className="space-y-2 border-t pt-4">
            <p className="font-semibold text-[13.5px] text-gray-800">
              Also updated inside Profile menu:
            </p>

            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span> Transaction History
              </li>
            </ul>
          </div>
          <div className="space-y-2 border-t pt-4">
            <p className="font-semibold text-[13.5px] text-gray-800">
              Updated Dashboard:
            </p>

            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span> Add Quicklinks
              </li>
            </ul>
          </div>
          <div className="space-y-2 border-t pt-4">
            <p className="font-semibold text-[13.5px] text-gray-800">
              Updated Sidebar:
            </p>

            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span> Auto Close sidebar and quick routes when click on service icons
              </li>
            </ul>
          </div>
          <div className="space-y-2 border-t pt-4">
            <p className="font-semibold text-[13.5px] text-gray-800">
              AI Configuration:
            </p>

            <ul className="space-y-2 pl-1 text-[12.5px] text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                Enable AI services to leverage intelligent message generation, smart
                suggestions, and automated responses across live chat channels.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                Generate AI-powered templates, canned responses, and contextual reply
                suggestions to improve agent productivity and response accuracy.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                Utilize real-time conversation analysis to receive intent-based
                recommendations and sentiment-aware replies.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                Configure AI behavior, tone, and automation rules to align with your brand
                voice and compliance requirements.
              </li>
            </ul>
          </div>
          <div className="space-y-2 border-t pt-4">
            <p className="font-semibold text-[13.5px] text-gray-800">
              Chatbots Section:
            </p>

            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span>
                Configure a centralized chatbot section where you can view WhatsApp, RCS, Instagram, and Messenger chatbots.
              </li>
            </ul>
          </div>

          <div className="space-y-2 border-t pt-4">
            <p className="font-semibold text-[13.5px] text-gray-800">
              WhatsApp:
            </p>

            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <strong>Reports:</strong> Add the User Preference Report and Unsubscribe Report under the User Preference route.
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <strong>Block User:</strong> Move the Block User option to the Live Chat navbar.
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <strong>Manage WABA:</strong> Add the new ES option in Manage WABA.
              </li>
            </ul>
          </div>

          <div className="space-y-2 border-t pt-4">
            <p className="font-semibold text-[13.5px] text-gray-800">
              RCS:
            </p>

            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span>
                Add the RCS bot for users that was previously available in the Chatbots section.
              </li>
            </ul>
          </div>
          <div className="space-y-2 border-t pt-4">
            <p className="font-semibold text-[13.5px] text-gray-800">
              Agent:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span>
                Agents can now access and manage chats across all integrated channels.
              </li>
            </ul>
          </div>


          <p className="text-xs text-green-600 font-medium">
            ✨ More improvements are continuously rolling out!
          </p>
        </div>

        {/* FOOTER */}
        <div className="border-t pt-3 pb-3 px-4 flex justify-end">
          <button
            onClick={hideVersion}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-lg transition shadow-md"
          >
            Okay
          </button>
        </div>
      </Dialog>

      {showModal && (
        <UniversalAccountInfo
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      )}

      <SupportTicketDialog
        visible={isTicketOpen}
        onHide={() => setIsTicketOpen(false)}
        userData={userData}
      />
    </nav>
  );
};

export default Navbar;
