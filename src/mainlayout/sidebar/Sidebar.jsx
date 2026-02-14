import React, { useState, useRef, useEffect } from "react";
import { all } from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// MUI MATERIAL
// import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

// ICONS
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { MdExpandLess, MdExpandMore, MdOutlineEmail } from "react-icons/md";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { FaHome, FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { SiGoogleauthenticator } from "react-icons/si";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import { FaListUl } from "react-icons/fa6";
import { PiToolbox } from "react-icons/pi";
import { MdOutlineNotificationAdd } from "react-icons/md";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ThreePOutlinedIcon from "@mui/icons-material/ThreePOutlined";
import QuickreplyOutlinedIcon from "@mui/icons-material/QuickreplyOutlined";
import { LuWorkflow } from "react-icons/lu";
import { FaServer } from "react-icons/fa";
import InstagramIcon from "@mui/icons-material/Instagram";
import rcsicon from "@/assets/icons/RCS02.svg";
import twoway from "@/assets/icons/TWOWAY.svg";
import callback from "@/assets/icons/Callback02.svg";
import missedcall from "@/assets/icons/Missedcall2.svg";
import obd from "@/assets/icons/OBD02.svg";
import ibd from "@/assets/icons/IBD02.svg";
import numberlookup from "@/assets/icons/Numberlookup.svg";
import clicktwocall from "@/assets/icons/Click2Call02.svg";
import truecaller from "@/assets/icons/truecaller.svg";
import { LuWandSparkles } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import { TbMessageChatbot } from "react-icons/tb";

// CONTEXT
import { useUser } from "@/context/auth";
import { useUserAndAdminContext } from "@/context/UserAndAdminContext";
import InfoPopoverSidebar from "./component/InfoPopoverSidebar";
import CustomTooltip from "./component/CustomTooltip";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile }) => {
  const { user } = useUser();
  const [popoverAnchor, setPopoverAnchor] = React.useState(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userOpenDropdown, setUserOpenDropdown] = useState(null);
  const [collapseAnimationDone, setCollapseAnimationDone] = useState(
    !isCollapsed
  );
  const [activeTab, setActiveTab] = useState("Admin");
  const tabs = [
    { name: "Admin", icon: <AdminPanelSettingsIcon fontSize="small" /> },
    { name: "User", icon: <ThreePOutlinedIcon fontSize="small" /> },
  ];

  const location = useLocation();
  const [openTooltips, setOpenTooltips] = useState({});
  const dropdownRefs = useRef({});
  const navigate = useNavigate();
  const { currentRole, setCurrentRole } = useUserAndAdminContext();

  const handleTooltipOpen = (key) => {
    setOpenTooltips((prev) => ({ ...prev, [key]: true }));
  };

  const handleTooltipClose = (key) => {
    setOpenTooltips((prev) => ({ ...prev, [key]: false }));
  };

  useEffect(() => {
    if (!isCollapsed) {
      setOpenTooltips({});
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (isCollapsed) {
      setUserOpenDropdown(null);
      setOpenDropdown(null);
    }
  }, [isCollapsed]);

  // const handleDropdownClick = (dropdownName) => {
  //   if (isCollapsed) {
  //     setIsCollapsed(false);
  //     return;
  //   }
  //   setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  // };

  const handleUserDropdownClick = (dropdownName) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setUserOpenDropdown(dropdownName);
      return;
    }

    // setOpenDropdown(dropdownName);
    setUserOpenDropdown((prev) =>
      prev === dropdownName ? null : dropdownName
    );
  };

  const handleDropdownClick = (name, event) => {
    setOpenTooltips((prev) => ({ ...prev, [name]: false }));

    if (isCollapsed) {
      setPopoverAnchor(event.currentTarget);
      setPopoverOpen(true);
      setOpenDropdown(name);
    } else {
      setOpenDropdown(openDropdown === name ? null : name);
    }
  };

  useEffect(() => {
    if (!isCollapsed) {
      setPopoverOpen(false);
      setPopoverAnchor(null);
    }
  }, [isCollapsed]);

  const handleSingleRouteClick = () => {
    setOpenTooltips({}); 
    setPopoverOpen(false);
    setOpenDropdown(null); 
    setIsCollapsed(true);
  };

  const isActiveRoute = (route) => {
    if (route === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(route);
  };

  const collapsedClass = isCollapsed
    ? "justify-center px-0 "
    : "justify-start px-4 ";

  useEffect(() => {
    const activeMenu = menuItems.find((item) =>
      item.links?.some((link) => isActiveRoute(link.to))
    );
    if (activeMenu && isCollapsed === false) {
      // setOpenDropdown(activeMenu.name);
    } else {
      // setOpenDropdown(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const activeMenu = menuUserItems.find((item) =>
      item.links?.some((link) => isActiveRoute(link.to))
    );
    if (activeMenu && isCollapsed === false) {
      // setOpenDropdown(activeMenu.name);
    } else {
      // setOpenDropdown(null);
    }
  }, [location.pathname]);

  const menuItems = [
    {
      id: "",
      name: "Home",
      icon: <FaHome />,
      label: "Dashboard",
      type: "single",
      to: "/",
      roles: ["ADMIN", "AGENT"],
    },
    {
      id: "",
      name: "User Management",
      icon: <IoWalletOutline />,
      label: "User Management",
      type: "dropdown",
      links: [
        { to: "/manageuser", label: "Manage User" },
        // { to: "/managesalesperson", label: "Manage Sales Person" },
        // { to: "/accountmanager", label: "Account Manager" },
      ],
      roles: ["ADMIN"],
    },
    // {
    //   id: "",
    //   name: "manageai",
    //   icon: <HiOutlineSparkles className="h-4.5 w-4.5" />,
    //   label: "Manage AI",
    //   type: "dropdown",
    //   links: [
    //     { to: "/userPricingAI", label: "AI Pricing" },
    //     // { to: "/userPricingAIConfig", label: "AI Pricing" }
    //     // { to: "/managesalesperson", label: "Manage Sales Person" },
    //     // { to: "/accountmanager", label: "Account Manager" },
    //   ],
    //   roles: ["ADMIN"],
    // },
    {
      id: "",
      name: "admin",
      icon: <IoPersonOutline />,
      label: "Admin",
      type: "dropdown",
      links: [
        // { to: "/manageplan", label: "Manage Plan" },
        { to: "/manageprefix", label: "Manage Prefix" },
        // { to: "/blockNumber", label: "Block Number" },
        // { to: "/blackList", label: "Black List" },
        { to: "/blacklistManager", label: "Black List" },
        { to: "/addoperator", label: "Manage Prefix", isHide: true },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "Reports",
      icon: <img src={numberlookup} className="w-4 h-4" />,
      label: "Reports",
      type: "dropdown",
      links: [
        { to: "/smsreports", label: "SMS", id: "1" },
        { to: "/rcsdeliveryreport", label: "RCS", id: "3" },
        { to: "/wmanagecampaign", label: "Whatsapp", id: "2" },
        { to: "/obdmanagecampaign", label: "OBD", id: "7" },
        { to: "/lookupreports", label: "HLR Lookup" },
        { to: "/obdCampaignDetailslog", label: "OBD", isHide: true, id: "7" },
        {
          to: "/smscampaigndetaillogs",
          label: "Sms Details Logs",
          isHide: true,
        },
        {
          to: "/rcsdeliverycampaigndetails",
          label: "Delivery Campaign Report",
          isHide: true,
          id: "3",
        },
        { to: "/apicampaigninfo", label: "apicampaigninfo", isHide: true },
        {
          to: "/smscampaigndetailsreport",
          label: "smsreportsdetails",
          isHide: true,
        },
        {
          to: "/smsAttachmentdetaillog",
          label: "Sms Details Logs",
          isHide: true,
        },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "monitoring",
      icon: <ScreenSearchDesktopOutlinedIcon sx={{ fontSize: "18px" }} />,
      label: "Monitoring",
      type: "dropdown",
      links: [
        // { to: "/graphmain", label: "Graph Main" },
        // { to: "/graphuserwise", label: "Graph User Wise" },
        { to: "/graphsms", label: "SMS" },
        { to: "/graphrcs", label: "RCS" },
        { to: "/graphwhatsapp", label: "Whatsapp" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "wabaadmin",
      icon: <FaWhatsapp />,
      label: "WABA Admin",
      type: "dropdown",
      links: [
        { to: "/managewabaadmin", label: "Manage Waba" },
        // { to: "/CreateWhatsappTemplateAdmin", label: "whatsapp Library" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "smsadmin",
      icon: <LuMessageSquareMore />,
      label: "SMS Admin",
      type: "dropdown",
      links: [
        // { to: "/managedlttemplate", label: "Manage DLT Template" },
        { to: "/manageSMPP", label: "Manage SMPP", isHide: false },
        { to: "/managerouting", label: "Manage Routing", isHide: false },
        { to: "/manageplan", label: "Manage Plan", isHide: false },
        { to: "/SMPPerrorcode", label: "SMPP Error Code", isHide: false },
        {
          to: "/summaryutilityreport",
          label: "Summary Utility Report",
          isHide: false,
        },
        {
          to: "/SMPPmissingerrorcode",
          label: "SMPP Missing Error Code",
          isHide: false,
        },
        { to: "/SMPPsummary", label: "SMPP Summary", isHide: false },
        {
          to: "/drAnalysis",
          label: "DR Analysis",
          isHide: false,
          id: "3",
        },
        { to: "/addrouting", label: "addrouting", isHide: true },
        { to: "/editrouting", label: "editrouting", isHide: true },
        // { to: "/manageprefix", label: "Manage Prefix" },
        // { to: "/addoperator", label: "Manage Prefix", isHide:true },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "rcsadmin",
      icon: <img src={rcsicon} className="w-4 h-4" />,
      label: "RCS Admin",
      type: "dropdown",
      links: [{ to: "/rcsmanagebot", label: "Manage Bot" }],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "emailadmin",
      icon: <MdOutlineEmail />,
      label: "Email Admin",
      type: "dropdown",
      links: [
        { to: "/sendsmtp", label: "Send SMTP" },
        { to: "/addsmtp", label: "Manage SMTP" },
        { to: "/emailwhitelist", label: "Email WhiteList" },
        { to: "/managelibrary", label: "Manage Library" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "instaadmin",
      icon: <InstagramIcon sx={{ fontSize: "20px" }} />,
      label: "Insta Admin",
      type: "dropdown",
      links: [
        // { to: "/assignuserinsta", label: "Assign User" },
        { to: "/manageinstausers", label: "Manage Instagram" },
        // { to: "/addsmtp", label: "Manage SMTP" }
      ],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "",
      name: "managefunds",
      icon: <IoWalletOutline />,
      label: "Manage Funds",
      type: "dropdown",
      links: [
        { to: "/recharge", label: "Recharge" },
        { to: "/user/transactions", label: "User Transaction History" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "othersadmin",
      icon: <FaListUl fontSize="15px" />,
      label: "Others",
      type: "dropdown",
      links: [
        // { to: "/blacklist", label: "Blacklist" },
        { to: "/notification", label: "Manage Notifications" },
        { to: "/planconfigurations", label: "Manage Plans" },
        { to: "/managesmpperrorcode", label: "Manage SMPP Error" },
        { to: "/manageoperatormain", label: "Manage Operator" },
        { to: "/manageutilityreport", label: "Manage Utility Report" },
        // { to: "/wabamanagetemplatelibrary", label: "Manage Templates" },
        // { to: "/leadsourcemanager", label: "Lead Source" },
        // { to: "/managevoiceclips", label: "Manage Voice Clips" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "restartEngine",
      icon: <FaServer fontSize="15px" />,
      label: "Restart Engine",
      type: "single",
      to: "/restartengine",
      roles: ["ADMIN", "AGENT"],
    },
    {
      id: "",
      name: "tools",
      icon: <PiToolbox fontSize="18px" />,
      label: "Tools",
      type: "single",
      to: "/jsontoolpage",
      roles: ["ADMIN", "AGENT"],
    },
  ];

  const menuUserItems = [
    // {
    //   id: "",
    //   name: "Home",
    //   icon: <FaHome />,
    //   // icon: <img src={dash3} className="w-4 h-4" />,
    //   label: "Dashboard",
    //   type: "single",
    //   to: "/userdash",
    //   roles: ["ADMIN", "AGENT"],
    // },
    // {
    //   id: "",
    //   name: "ResellerDash",
    //   icon: <FaHome />,
    //   label: "ResellerDash",
    //   type: "single",
    //   to: "/resellerdash",
    // },
    // {
    //     name: 'Dummy',
    //     icon: <BlockOutlinedIcon fontSize='20' />,
    //     label: 'Dummy',
    //     type: "single",
    //     to: "/dummy",
    // },
    {
      id: "1",
      name: "USER SMS",
      icon: <LuMessageSquareMore />,
      label: "SMS",
      type: "dropdown",
      links: [
        { to: "/sendsms", label: "Send SMS" },
        { to: "/smsreports", label: "Delivery Report" },
        { to: "/smsdlttemplates", label: "DLT Template" },
        {
          to: "/smscampaigndetaillogs",
          label: "Sms Details Logs",
          isHide: true,
        },
        {
          to: "/smsAttachmentdetaillog",
          label: "Sms Details Logs",
          isHide: true,
        },
        { to: "/smscampaigndetailsreport", label: "Create Bot", isHide: true },
      ],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "",
      name: "Two Way SMS",
      icon: <img src={twoway} className="w-4 h-4" />,

      label: "Two Way SMS",
      type: "dropdown",
      links: [
        // { to: "/managekeywords", label: "Manage Keyword" },
        // { to: "/twowayreports", label: "Reports" },
        // { to: "/twowayintegration", label: "Integration" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "3",
      name: "RCS",
      icon: <img src={rcsicon} className="w-4 h-4" />,
      label: "RCS",
      type: "dropdown",
      links: [
        { to: "/sendrcs", label: "Send RCS" },
        { to: "/rcsmanagetemplate", label: "Manage Template" },
        // { to: "/rcslivechats", label: "Live Chats" },
        { to: "/rcssuggestionreport", label: "Suggestion Report" },
        { to: "/rcsdeliveryreport", label: "Delivery Report" },
        {
          to: "/rcsdeliverycampaigndetails",
          label: "Delivery Campaign Report",
          isHide: true,
        },
        {
          to: "/rcsaddtemplatercs",
          label: "RcsAddTemplate",
          isHide: true,
        },
        {
          to: "/rcsmanagebot",
          label: "Manage Bot",
        },
      ],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "2",
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      type: "dropdown",
      links: [
        // { to: "/wabadashboard", label: "Dashboard" },
        { to: "/wlaunchcampaign", label: "Launch Campaigns" },
        // { to: "/wlivechat", label: "Live Chats" },
        { to: "/wmanagecampaign", label: "Delivery Report" },
        { to: "/whatsappuserpreference", label: "User Preference Report" },
        { to: "/managetemplate", label: "Manage Templates" },
        // { to: "/wmanageoptin", label: "Manage Optin" },
        // { to: "/wchatwidget", label: "Chat Widget" },
        { to: "/wqrcode", label: "QR Code" },
        // { to: "/wlcsetting", label: "Live Chats Settings" },
        { to: "/wmanagewaba", label: "Manage WABA" },
        { to: "/wwhatsappconversation", label: "WhatsApp Conversation" },
        // { to: "/wwhatsappmanageagent", label: "Manage Agent" },
        // { to: "/wwhatsappbot", label: "Manage Bot" },
        { to: "/wwhatsappflows", label: "Manage Flows" },
        // { to: "/commercemanager", label: "Commerce Manager" },
        // { to: "/inventorymanagement", label: "Inventory Management" },
        // { to: "/orderMangement", label: "Order Mangement" },
        // { to: "/wblockuser", label: "Block User" },
        // { to: "/wmmlite", label: "MM Lite" },
        { to: "/createwhatsappbot", label: "Create Bot", isHide: true },
        { to: "/wcampaigndetailsreport", label: "Create Bot", isHide: true },
        { to: "/smscampaigndetailsreport", label: "Create Bot", isHide: true },
        { to: "/createtemplate", label: "Create Bot", isHide: true },
        { to: "/wflowcreation", label: "Create Whatsapp Flow", isHide: true },
        { to: "/apicampaigninfo", label: "apicampaigninfo", isHide: true },
      ],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "",
      name: "TRUECALLER",
      icon: <img src={truecaller} className="w-4 h-4" />,
      label: "Truecaller",
      type: "dropdown",
      links: [
        // { to: "/sendtruecallercamp", label: "Send Campaign" },
      ],
      roles: ["ADMIN", "DIRECTUSER"],
    },
    {
      id: "",
      name: "chatManagement",
      icon: (
        <QuickreplyOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />
      ),
      label: "Live Chat",
      type: "dropdown",
      links: [
        { to: "/liveChatMain/", label: "Chats" },
        { to: "/combineLiveChatSettings", label: "Chats Settings" },
        { to: "/cannedmessagemanager", label: "Canned Message" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "botManagement",
      icon: (
        <TbMessageChatbot fontSize="20" style={{ fontSize: "17px" }} />
      ),
      label: "Chat Bots",
      type: "dropdown",
      links: [
        { to: "/ChatBotMain/", label: "Chat Bots" },
        { to: "/ChatBotSettings", label: "Chat Bots Settings" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "Number Lookup",
      icon: <img src={numberlookup} className="w-4 h-4" />,
      label: "Number Lookup",
      type: "dropdown",
      links: [
        { to: "/hlrlookup", label: "HLR Lookup" },
        { to: "/lookupreports", label: "LookUp Report" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "App Authenticator",
      icon: <SiGoogleauthenticator />,
      label: "App Authenticator",
      type: "dropdown",
      links: [
        // { to: "/authsettings", label: "Settings" },
        // { to: "/authreports", label: "Reports" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "E-mail",
      icon: <MdOutlineEmail />,
      label: "E-mail",
      type: "dropdown",
      links: [
        { to: "/sendemail", label: "Launch Campaign" },
        { to: "/emailmanagement/", label: "Manage Template" },
        { to: "/emailreports", label: "Delivery Report" },
        // { to: "/emailwhitelist", label: "Email WhiteList" },
        // { to: "/sendsmtp", label: "Send SMTP" },
        // { to: "/addsmtp", label: "Manage SMTP" }
      ],
      roles: ["ADMIN"],
    },
    {
      id: "7",
      name: "OBD",
      icon: <img src={obd} className="w-4 h-4" />,
      label: "OBD",
      type: "dropdown",
      links: [
        { to: "/obdcreatecampaign", label: "Create Campaign" },
        { to: "/obdmanagecampaign", label: "Delivery Report" },
        { to: "/obdmanagevoiceclips", label: "Manage Voice Clips" },
        // { to: "/obdIntegration", label: "Integration" },
        {
          to: "/obdCampaignDetailslog",
          label: "obdCampaignDetailslog",
          isHide: true,
        },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "IBD",
      icon: <img src={ibd} className="w-4 h-4" />,
      label: "IBD",
      type: "dropdown",
      links: [
        // { to: "/ibdcallhistory", label: "Call History" },
        // { to: "/ibdmanageexecutive", label: "Manage Executive" },
        // { to: "/ibdivrflow", label: "IVR Flow" },
        // { to: "/ibdsettings", label: "Settings" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "Missed Call",
      icon: <img src={missedcall} className="w-4 h-4" />,
      label: "Missed Call",
      type: "dropdown",
      links: [
        // { to: "/missedcallhistory", label: "Call History" },
        // { to: "/missedcallsettings", label: "Settings" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "",
      name: "Click-2-Call",
      icon: <img src={clicktwocall} className="w-4 h-4" />,

      label: "Click-2-Call",
      type: "dropdown",
      links: [
        // { to: "/clicktohistory", label: "Call History" },
        // { to: "/clicktosettings", label: "Settings" },
      ],
      roles: ["ADMIN"],
    },
    // {
    //   id: "",
    //   name: "CallBack",
    //   // icon: <MdOutlineEmail />,
    //   icon: <img src={callback} className="w-4.5 h-4.5" />,
    //   label: "Callback",
    //   type: "dropdown",
    //   links: [
    //     { to: "/callback", label: "Call Back" },
    //     { to: "/addcallback", label: "Add Call Back", isHide: true },
    //     { to: "/editcallback", label: "Edit Call Back", isHide: true },
    //   ],
    //   roles: [],
    // },
    {
      id: "",
      name: "converterutility",
      icon: <HiOutlineSparkles className="h-4.5 w-4.5" />,
      label: "Utility",
      type: "dropdown",
      // to: "/texttopdfconverter",
      links: [
        { to: "/texttopdfconverter", label: "Text To PDF Converter" },
        { to: "/managecontacts", label: "Manage Contacts" },
        { to: "/workflow", label: "Work Flow" },
        { to: "/callback", label: "CallBack" },
        { to: "/manageallagent", label: "Manage Agent" },
        { to: "/addcallback", label: "Add Call Back", isHide: true },
        { to: "/editcallback", label: "Edit Call Back", isHide: true },
        {
          to: "/createpdfconverter",
          label: "Create PDF Converter",
          isHide: true,
        },
      ],
      roles: ["ADMIN"],
    },
    // {
    //   id: "",
    //   name: "managefunds",
    //   icon: <IoWalletOutline />,
    //   label: "Manage Funds",
    //   type: "dropdown",
    //   links: [
    //     { to: "/selfrecharge", label: "Recharge" },
    //     { to: "/transactions", label: "Transaction History" },
    //   ],
    //   roles: ["ADMIN"],
    // },
    // {
    //   id: "",
    //   name: "Managecontacts",
    //   icon: <GroupOutlinedIcon fontSize="20" />,
    //   label: "Manage Contacts",
    //   type: "single",
    //   to: "/managecontacts",
    //   roles: ["ADMIN", "DIRECTUSER"],
    // },
    // {
    //   id: "",
    //   name: "blockNumber",
    //   icon: <GroupOutlinedIcon fontSize="20" />,
    //   label: "Block Number",
    //   type: "single",
    //   to: "/blockNumber",
    //   roles: ["ADMIN", "DIRECTUSER"],
    // },
    // {
    //   id: "",
    //   name: "Unsubscribe",
    //   icon: <UnsubscribeOutlinedIcon fontSize="20" />,
    //   label: "Unsubscribe",
    //   type: "single",
    //   to: "/unsubscribe",
    //   roles: ["ADMIN", "DIRECTUSER"],
    // },
    // {
    //   id: "",
    //   name: "Leadmanagement",
    //   icon: (
    //     <LeaderboardOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />
    //   ),
    //   label: "Lead Management",
    //   type: "single",
    //   to: "/leadmanagement/leaddash",
    //   // links: [
    //   //   to: "/leadmanagement/leaddash"
    //   // ]
    //   roles: ["ADMIN"],
    // },
    // {
    //   id: "",
    //   name: "Aiconfiguration",
    //   icon: <HiOutlineSparkles className="h-4.5 w-4.5" />,
    //   label: "Ai Configuration",
    //   type: "single",
    //   to: "/aiconfiguration",
    //   roles: ["ADMIN"],
    // },
    // {
    //   id: "",
    //   name: "Workflow",
    //   icon: <LuWorkflow fontSize="20" style={{ fontSize: "17px" }} />,
    //   label: "Workflow",
    //   type: "single",
    //   to: "/workflow",
    //   roles: ["ADMIN"],
    // },
    // {
    //   id: "",
    //   name: "recharge",
    //   icon: <AssuredWorkloadOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />,
    //   label: "Recharge",
    //   type: "single",
    //   to: "/selfrecharge",
    //   roles: ["ADMIN"],
    // },
    // {
    //   id: "",
    //   name: "Wishmanagement",
    //   icon: <LuWandSparkles fontSize="20" style={{ fontSize: "17px" }} />,
    //   label: "Wish Management",
    //   type: "single",
    //   to: "/smswishmanagement",
    //   roles: ["ADMIN"],
    // },
    // {
    //   id: "",
    //   name: "tagmanager",
    //   icon: <LiaTagsSolid fontSize="20" style={{ fontSize: "17px" }} />,
    //   label: "Tag Manager",
    //   type: "single",
    //   to: "/tagmanager",
    //   roles: ["ADMIN"],
    // },
    // {
    //   id: "",
    //   name: "apiDocs",
    //   icon: <DescriptionOutlinedIcon fontSize="20" />,
    //   label: "API Docs",
    //   type: "single",
    //   onClick: () => navigate("/docs/quickstart"),
    //   roles: ["ADMIN"],
    // },
    // {
    //     name: 'Logout',
    //     icon: <FaSignOutAlt />,
    //     label: 'Logout',
    //     type: "single",
    //     onClick: handleLogout
    // },
  ];

  const agentMenuItems = [
    {
      id: "",
      name: "Home",
      icon: <FaHome />,
      label: "Home",
      type: "single",
      to: "/",
      roles: ["AGENT"],
    },
    // {
    //   id: "",
    //   name: "WhatsApp LiveChat",
    //   icon: <FaWhatsapp />,
    //   label: "WhatsApp LiveChat",
    //   type: "single",
    //   to: "/wlivechat",
    //   roles: ["AGENT"],
    // },
    {
      id: "",
      name: "chatManagement",
      icon: (
        <QuickreplyOutlinedIcon
          fontSize="20"
          style={{ fontSize: "17px" }}
        />
      ),
      label: "Live Chat",
      type: "dropdown",
      links: [{ to: "/liveChatMain/", label: "Chats" }],
      roles: ["AGENT"],
    },
  ];



  return (
    <motion.div
      layout
      initial={{ x: isMobile ? -240 : 0, width: isCollapsed ? 64 : 240 }}
      animate={{
        x: isMobile ? (isCollapsed ? -240 : 0) : 0,
        width: isCollapsed ? 64 : 240,
      }}
      transition={{ type: "tween", stiffness: 260, damping: 30 }}
      onAnimationStart={() => {
        if (isCollapsed) setCollapseAnimationDone(false);
      }}
      onAnimationComplete={() => {
        setCollapseAnimationDone(!isCollapsed);
      }}
      className={`mainsidebar h-screen bg-white text-white popf px-0 flex flex-col fixed  left-0 overflow-y-auto overflow-x-hidden z-100
        ${isCollapsed ? "items-center " : "space-y-0"}`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <div className="w-full">
        {/* <div
          className={`flex border-b border-gray-200 text-sm font-medium relative
            ${isCollapsed ? "flex-col border-b-0 border-r gap-0" : "flex-row"}
          `}
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
                setCurrentRole(tab.name);
                setUserOpenDropdown(null);
                setOpenDropdown(null);
              }}
              className={`relative flex items-center gap-0 w-full transition-all duration-200
                        ${isCollapsed
                  ? "flex-col border-b-0 border-r py-2"
                  : "flex-row gap-2 px-5 py-2.5"
                }
                      ${activeTab === tab.name
                  ? "text-blue-500 font-semibold"
                  : "text-gray-800 hover:text-gray-800"
                }
                    `}
            >
              <span className="flex-shrink-0 text-lg">{tab.icon}</span>
              <motion.span
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.15 }}
                className={`whitespace-nowrap font-semibold ${isCollapsed ? "w-0 hidden" : "w-auto ml-2"
                  }`}
              >
                {tab.name}
              </motion.span>
              {activeTab === tab.name && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div> */}
        {user.role !== "AGENT" && (
          <div
            className={`flex border-b border-gray-200 text-sm font-medium relative
            ${isCollapsed ? "flex-col border-b-0 border-r gap-0" : "flex-row"}
          `}
          >
            {tabs.map((tab) => (
              <CustomTooltip
                key={tab.name}
                show={isCollapsed && openTooltips[tab.name]}
                text={isCollapsed ? tab.name : ""}
              >
                <button
                  onMouseEnter={() => handleTooltipOpen(tab.name)}
                  onMouseLeave={() => handleTooltipClose(tab.name)}
                  onClick={() => {
                    setActiveTab(tab.name);
                    setCurrentRole(tab.name);
                    setUserOpenDropdown(null);
                    setOpenDropdown(null);
                    handleTooltipClose(tab.name); // Close tooltip on click
                  }}
                  className={`relative flex items-center gap-0 w-full transition-all duration-200
            ${isCollapsed
                      ? "flex-col border-b-0 border-r py-3" // Increased padding for better tap target
                      : "flex-row gap-2 px-5 py-2.5"
                    }
            ${activeTab === tab.name
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800 hover:text-blue-500"
                    }
          `}
                >
                  <span className="flex-shrink-0 text-lg">{tab.icon}</span>

                  <motion.span
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    className={`whitespace-nowrap font-semibold ${isCollapsed ? "w-0 hidden" : "w-auto ml-2"
                      }`}
                  >
                    {tab.name}
                  </motion.span>

                  {activeTab === tab.name && (
                    <motion.span
                      layoutId="underline"
                      className={`absolute bg-blue-500 rounded-full ${isCollapsed
                        ? "right-0 top-0 h-full w-[2px]" // Vertical line when collapsed
                        : "left-0 bottom-0 h-[2px] w-full" // Horizontal line when expanded
                        }`}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              </CustomTooltip>
            ))}
          </div>
        )}


        {/* Admin */}
        {activeTab === "Admin" && user.role === "ADMIN" && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
          >
            {menuItems.map((item) =>
              item.type === "dropdown" ? (
                <CustomTooltip
                  show={isCollapsed && openTooltips[item.name]}
                  text={isCollapsed ? item.label : ""}
                >
                  {/* REQUIRED: relative wrapper for absolute dropdown */}
                  <div
                    className=" w-full "
                    onMouseEnter={() => handleTooltipOpen(item.name)}
                    onMouseLeave={() => handleTooltipClose(item.name)}
                  >
                    <motion.div
                      onClick={(e) => handleDropdownClick(item.name, e)}
                      className={`flex items-center py-2 w-full cursor-pointer hover:bg-[#e6f4ff] text-left text-gray-800 transition-all duration-300 ${collapsedClass}

${item.links?.some((link) => isActiveRoute(link.to))
                          ? isCollapsed
                            ? "bg-[#e6f4ff] " // w-64 (collapsed)
                            : "" // w-240 (expanded)
                          : ""}
`}
                    >
                      <span className="text-black flex-shrink-0">
                        {item.icon}
                      </span>

                      <motion.span
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.15 }}
                        className={`overflow-hidden whitespace-nowrap font-semibold ml-2 ${isCollapsed ? "w-0" : "w-auto"
                          }`}
                      >
                        {item.label}
                      </motion.span>

                      {!isCollapsed && (
                        <div
                          className={`ml-auto transition-transform duration-300 ${openDropdown === item.name
                            ? "rotate-180"
                            : "rotate-0"
                            }`}
                        >
                          {openDropdown === item.name ? (
                            <MdExpandLess />
                          ) : (
                            <MdExpandMore />
                          )}
                        </div>
                      )}
                    </motion.div>

                    {/* INLINE DROPDOWN (ONLY WHEN SIDEBAR IS EXPANDED) */}
                    {!isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={
                          openDropdown === item.name ? "open" : "collapsed"
                        }
                        variants={{
                          open: {
                            height: "auto",
                            opacity: 1,
                            transition: { duration: 0.3 },
                          },
                          collapsed: {
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.3 },
                          },
                        }}
                        className="overflow-hidden"
                        ref={(el) => (dropdownRefs[item.name] = el)}
                      >
                        {item.links.map((link) => {
                          if (link.isHide) return null;
                          const isActive = isActiveRoute(link.to);
                          return (
                            <React.Fragment key={link.to}>
                              <Link
                                to={link.to}
                                onClick={handleSingleRouteClick}
                                className={`block px-4 py-2.5 text-sm transition-all duration-300
                        ${isActive
                                    ? "bg-[#e6f4ff] text-blue-800"
                                    : "text-gray-800"
                                  }
                        hover:bg-[#e6f4ff]`}
                              >
                                <FiberManualRecordIcon
                                  sx={{
                                    color: isActive ? "blue" : "black",
                                    fontSize: "10px",
                                    marginRight: "10px",
                                  }}
                                />
                                <span
                                  className={`font-[600] ${isActive ? "text-blue-800" : "text-gray-800"
                                    }`}
                                >
                                  {link.label}
                                </span>
                              </Link>
                              <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                            </React.Fragment>
                          );
                        })}
                      </motion.div>
                    )}

                    {/* ABSOLUTE DROPDOWN (ONLY WHEN SIDEBAR IS COLLAPSED) */}
                    {/* {isCollapsed && openDropdown === item.name && (
                <InfoPopover
                  anchorEl={popoverAnchor}
                  open={popoverOpen}
                  onClose={() => {
                    setPopoverOpen(false);
                    setOpenDropdown(null);
                  }}
                  placement="right-start"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  // className="absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-md z-[99999]"
                  >
                    {item.links.filter((link) => !link.isHide).length === 0 ? (
                      <div className="px-2 py-2 font-[600] text-gray-800 whitespace-nowrap text-center">
                        No service available
                      </div>
                    ) : (
                      <>
                        {item.links.map((link) => {
                          if (link.isHide) return null;
                          const isActive = isActiveRoute(link.to);
                          return (
                            <React.Fragment key={link.to}>
                              <Link
                                to={link.to}
                                onClick={handleSingleRouteClick}
                                className={`block px-4 py-2.5 text-sm transition-all duration-300
                        ${isActive
                                    ? "bg-[#e6f4ff] text-blue-800"
                                    : "text-gray-800"
                                  }
                        hover:bg-[#e6f4ff]`}
                              >
                                <FiberManualRecordIcon
                                  sx={{
                                    color: isActive ? "blue" : "black",
                                    fontSize: "10px",
                                    marginRight: "10px",
                                  }}
                                />
                                <span
                                  className={`font-[600] ${isActive ? "text-blue-800" : "text-gray-800"
                                    }`}
                                >
                                  {link.label}
                                </span>
                              </Link>
                              <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                            </React.Fragment>
                          );
                        })}
                      </>
                    )}
                  </motion.div>
                </InfoPopover>
              )} */}

                    {isCollapsed && openDropdown === item.name && (
                      <InfoPopoverSidebar
                        divClassName="p-0"
                        anchorEl={popoverAnchor}
                        open={popoverOpen}
                        onClose={() => {
                          setPopoverOpen(false);
                          setOpenDropdown(null);
                        }}
                        placement="right-start"
                        // Crucial: Make the MUI Popover container invisible to let our custom div shine
                        PaperProps={{
                          style: {
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            overflow: "visible",
                            marginLeft: "12px", // Gap between sidebar and popover
                          },
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          className="w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden ring-1 ring-black/5"
                        >
                          {/* Header: Gives the popover "Identity" */}
                          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-gray-900 leading-none">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-medium">
                                Services
                              </span>
                            </div>
                          </div>

                          {/* Body: The Menu Items */}
                          <div className="p-2">
                            {item.links.filter((link) => !link.isHide)
                              .length === 0 ? (
                              <div className="py-6 text-center text-gray-400 text-sm italic">
                                No options available
                              </div>
                            ) : (
                              <div className="space-y-1">
                                {item.links.map((link) => {
                                  if (link.isHide) return null;
                                  const isActive = isActiveRoute(link.to);

                                  return (
                                    <Link
                                      key={link.to}
                                      to={link.to}
                                      onClick={handleSingleRouteClick}
                                      className="relative group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 no-underline"
                                    >
                                      {/* Hover/Active Background */}
                                      <div
                                        className={`absolute inset-0 rounded-xl transition-all duration-200 ${isActive
                                          ? "bg-blue-50/80 border border-blue-100/50"
                                          : "group-hover:bg-gray-100/80"
                                          }`}
                                      />

                                      {/* Dot Indicator */}
                                      <div
                                        className={`relative w-1.5 h-1.5 rounded-full transition-all duration-300 mr-3 ${isActive
                                          ? "bg-blue-600 scale-125"
                                          : "bg-gray-300 group-hover:bg-gray-400"
                                          }`}
                                      />

                                      {/* Label */}
                                      <span
                                        className={`relative text-sm transition-colors duration-200 ${isActive
                                          ? "text-blue-700 font-semibold"
                                          : "text-gray-600 group-hover:text-gray-900 font-medium"
                                          }`}
                                      >
                                        {link.label}
                                      </span>

                                      {/* Right Arrow - Visible on Hover */}
                                      <div
                                        className={`relative ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 ${isActive
                                          ? "text-blue-500 opacity-100"
                                          : "text-gray-300"
                                          }`}
                                      >
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="9 5l7 7-7 7"
                                          />
                                        </svg>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Footer: Optional visual weight */}
                          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20" />
                        </motion.div>
                      </InfoPopoverSidebar>
                    )}
                  </div>
                </CustomTooltip>
              ) : (
                <CustomTooltip
                  show={isCollapsed && openTooltips[item.name]}
                  key={item.name}
                  text={isCollapsed ? item.label : ""}
                >
                  <div
                    className="w-full"
                    onMouseEnter={() => handleTooltipOpen(item.name)}
                    onMouseLeave={() => handleTooltipClose(item.name)}
                  >
                    {item.onClick ? (
                      <motion.div
                        onClick={() => {
                          item.onClick();
                          handleSingleRouteClick();
                        }}
                        className={`flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 ${isCollapsed ? "justify-center" : ""
                          }`}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span
                          className={`${isCollapsed ? "hidden" : ""
                            } font-[600]`}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={handleSingleRouteClick}
                        className={`flex items-center gap-0  py-2 w-full text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 transition-all duration-300 ${collapsedClass} ${isActiveRoute(item.to)
                          ? "bg-[#e6f4ff] text-blue-800 "
                          : ""
                          }`}
                      >
                        <span className="flex-shrink-0 text-lg">
                          {item.icon}
                        </span>
                        <motion.span
                          animate={{ opacity: isCollapsed ? 0 : 1 }}
                          transition={{ duration: 0.15 }}
                          className={`whitespace-nowrap font-semibold ${isCollapsed ? "w-0 overflow-hidden" : "w-auto ml-2"
                            }`}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    )}
                  </div>
                </CustomTooltip>
              )
            )}
          </motion.div>
        )}

        {/* User */}
        {activeTab === "User" && user.role === "ADMIN" && (
          <motion.div
            key="user"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
          >
            {menuUserItems.map((item) =>
              item.type === "dropdown" ? (
                <CustomTooltip
                  show={
                    isCollapsed &&
                    openTooltips[item.name] &&
                    openDropdown !== item.name
                  }
                  text={item.label}
                  key={item.name}
                >
                  {/* REQUIRED: relative wrapper for absolute dropdown */}
                  <div
                    className=" w-full"
                    onMouseEnter={() => handleTooltipOpen(item.name)}
                    onMouseLeave={() => handleTooltipClose(item.name)}
                  >
                    <motion.div
                      onClick={(e) => handleDropdownClick(item.name, e)}
                      className={`flex items-center py-2 w-full cursor-pointer hover:bg-[#e6f4ff] text-left text-gray-800 transition-all duration-300  ${collapsedClass}

${item.links?.some((link) => isActiveRoute(link.to))
                          ? isCollapsed
                            ? "bg-[#e6f4ff] " // w-64 (collapsed)
                            : "bg-blue-50/80 border border-blue-100/50" // w-240 (expanded)
                          : ""
                        }
`}
                    >
                      <span className="text-black flex-shrink-0">
                        {item.icon}
                      </span>

                      <motion.span
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.15 }}
                        className={`overflow-hidden whitespace-nowrap font-semibold ml-2 ${isCollapsed ? "w-0" : "w-auto"
                          }`}
                      >
                        {item.label}
                      </motion.span>

                      {!isCollapsed && (
                        <div
                          className={`ml-auto transition-transform duration-300 ${openDropdown === item.name
                            ? "rotate-180"
                            : "rotate-0"
                            }`}
                        >
                          {openDropdown === item.name ? (
                            <MdExpandLess />
                          ) : (
                            <MdExpandMore />
                          )}
                        </div>
                      )}
                    </motion.div>

                    {/* INLINE DROPDOWN (ONLY WHEN SIDEBAR IS EXPANDED) */}
                    {!isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={
                          openDropdown === item.name ? "open" : "collapsed"
                        }
                        variants={{
                          open: {
                            height: "auto",
                            opacity: 1,
                            transition: { duration: 0.3 },
                          },
                          collapsed: {
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.3 },
                          },
                        }}
                        className="overflow-hidden"
                        ref={(el) => (dropdownRefs[item.name] = el)}
                      >
                        {item.links.map((link) => {
                          if (link.isHide) return null;
                          const isActive = isActiveRoute(link.to);
                          return (
                            <React.Fragment key={link.to}>
                              <Link
                                to={link.to}
                                onClick={handleSingleRouteClick}
                                className={`block px-4 py-2.5 text-sm transition-all duration-300
                        ${isActive
                                    ? "bg-[#e6f4ff] text-blue-800"
                                    : "text-gray-800"
                                  }
                        hover:bg-[#e6f4ff]`}
                              >
                                <FiberManualRecordIcon
                                  sx={{
                                    color: isActive ? "blue" : "black",
                                    fontSize: "10px",
                                    marginRight: "10px",
                                  }}
                                />
                                <span
                                  className={`font-[600] ${isActive ? "text-blue-800" : "text-gray-800"
                                    }`}
                                >
                                  {link.label}
                                </span>
                              </Link>
                              <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                            </React.Fragment>
                          );
                        })}
                      </motion.div>
                    )}

                    {/* ABSOLUTE DROPDOWN (ONLY WHEN SIDEBAR IS COLLAPSED) */}
                    {/* {isCollapsed && openDropdown === item.name && (
                <InfoPopover
                  anchorEl={popoverAnchor}
                  open={popoverOpen}
                  onClose={() => {
                    setPopoverOpen(false);
                    setOpenDropdown(null);
                  }}
                  placement="right-start"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  // className="absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-md z-[99999]"
                  >
                    {item.links.filter((link) => !link.isHide).length === 0 ? (
                      <div className="px-2 py-2 font-[600] text-gray-800 whitespace-nowrap text-center">
                        No service available
                      </div>
                    ) : (
                      <>
                        {item.links.map((link) => {
                          if (link.isHide) return null;
                          const isActive = isActiveRoute(link.to);
                          return (
                            <React.Fragment key={link.to}>
                              <Link
                                to={link.to}
                                onClick={handleSingleRouteClick}
                                className={`block px-4 py-2.5 text-sm transition-all duration-300
                        ${isActive
                                    ? "bg-[#e6f4ff] text-blue-800"
                                    : "text-gray-800"
                                  }
                        hover:bg-[#e6f4ff]`}
                              >
                                <FiberManualRecordIcon
                                  sx={{
                                    color: isActive ? "blue" : "black",
                                    fontSize: "10px",
                                    marginRight: "10px",
                                  }}
                                />
                                <span
                                  className={`font-[600] ${isActive ? "text-blue-800" : "text-gray-800"
                                    }`}
                                >
                                  {link.label}
                                </span>
                              </Link>
                              <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                            </React.Fragment>
                          );
                        })}
                      </>
                    )}
                  </motion.div>
                </InfoPopover>
              )} */}

                    {isCollapsed && openDropdown === item.name && (
                      <InfoPopoverSidebar
                        divClassName="p-0"
                        anchorEl={popoverAnchor}
                        open={popoverOpen}
                        onClose={() => {
                          setPopoverOpen(false);
                          setOpenDropdown(null);
                        }}
                        placement="right-start"
                        // Crucial: Make the MUI Popover container invisible to let our custom div shine
                        PaperProps={{
                          style: {
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            overflow: "visible",
                            marginLeft: "12px", // Gap between sidebar and popover
                          },
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          className="w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden ring-1 ring-black/5"
                        >
                          {/* Header: Gives the popover "Identity" */}
                          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-gray-900 leading-none">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-medium">
                                Services
                              </span>
                            </div>
                          </div>

                          {/* Body: The Menu Items */}
                          <div className="p-2">
                            {item.links.filter((link) => !link.isHide)
                              .length === 0 ? (
                              <div className="py-6 text-center text-gray-400 text-sm italic">
                                No options available
                              </div>
                            ) : (
                              <div className="space-y-1">
                                {item.links.map((link) => {
                                  if (link.isHide) return null;
                                  const isActive = isActiveRoute(link.to);

                                  return (
                                    <Link
                                      key={link.to}
                                      to={link.to}
                                      onClick={handleSingleRouteClick}
                                      className="relative group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 no-underline"
                                    >
                                      {/* Hover/Active Background */}
                                      <div
                                        className={`absolute inset-0 rounded-xl transition-all duration-200 ${isActive
                                          ? "bg-blue-50/80 border border-blue-100/50"
                                          : "group-hover:bg-gray-100/80"
                                          }`}
                                      />

                                      {/* Dot Indicator */}
                                      <div
                                        className={`relative w-1.5 h-1.5 rounded-full transition-all duration-300 mr-3 ${isActive
                                          ? "bg-blue-600 scale-125"
                                          : "bg-gray-300 group-hover:bg-gray-400"
                                          }`}
                                      />

                                      {/* Label */}
                                      <span
                                        className={`relative text-sm transition-colors duration-200 ${isActive
                                          ? "text-blue-700 font-semibold"
                                          : "text-gray-600 group-hover:text-gray-900 font-medium"
                                          }`}
                                      >
                                        {link.label}
                                      </span>

                                      {/* Right Arrow - Visible on Hover */}
                                      <div
                                        className={`relative ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 ${isActive
                                          ? "text-blue-500 opacity-100"
                                          : "text-gray-300"
                                          }`}
                                      >
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="9 5l7 7-7 7"
                                          />
                                        </svg>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Footer: Optional visual weight */}
                          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20" />
                        </motion.div>
                      </InfoPopoverSidebar>
                    )}
                  </div>
                </CustomTooltip>
              ) : (
                <CustomTooltip
                  show={isCollapsed && openTooltips[item.name]}
                  text={item.label}
                  key={item.name}
                >
                  <div
                    className="w-full"
                    onMouseEnter={() => handleTooltipOpen(item.name)}
                    onMouseLeave={() => handleTooltipClose(item.name)}
                  >
                    {item.onClick ? (
                      <motion.div
                        onClick={() => {
                          item.onClick();
                          handleSingleRouteClick();
                        }}
                        className={`flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 ${isCollapsed ? "justify-center" : ""
                          }`}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span
                          className={`${isCollapsed ? "hidden" : ""
                            } font-[600]`}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    ) : (
                      <Link
                        to={item.to}
                        onMouseEnter={() => handleTooltipOpen(item.name)} // 👈 Add this
                        onMouseLeave={() => handleTooltipClose(item.name)}
                        onClick={handleSingleRouteClick}
                        className={`flex items-center gap-0  py-2 w-full text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 transition-all duration-300 ${collapsedClass} ${isActiveRoute(item.to)
                          ? "bg-[#e6f4ff] text-blue-800 "
                          : ""
                          }`}
                      >
                        <span className="flex-shrink-0 text-lg">
                          {item.icon}
                        </span>
                        <motion.span
                          animate={{ opacity: isCollapsed ? 0 : 1 }}
                          transition={{ duration: 0.15 }}
                          className={`whitespace-nowrap font-semibold ${isCollapsed ? "w-0 overflow-hidden" : "w-auto ml-2"
                            }`}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    )}
                  </div>
                </CustomTooltip>
              )
            )}
          </motion.div>
        )}

        {user.role === "AGENT" && (
          <div>
            {agentMenuItems.map((item) =>
              item.type === "dropdown" ? (
                <CustomTooltip
                  show={isCollapsed && openTooltips[item.name]}
                  text={isCollapsed ? item.label : ""}
                >
                  {/* REQUIRED: relative wrapper for absolute dropdown */}
                  <div
                    className=" w-full "
                    onMouseEnter={() => handleTooltipOpen(item.name)}
                    onMouseLeave={() => handleTooltipClose(item.name)}
                  >
                    <motion.div
                      onClick={(e) => handleDropdownClick(item.name, e)}
                      className={`flex items-center py-2 w-full cursor-pointer hover:bg-[#e6f4ff] text-left text-gray-800 transition-all duration-300 ${collapsedClass}

                          ${item.links?.some((link) => isActiveRoute(link.to))
                          ? isCollapsed
                            ? "bg-[#e6f4ff] " // w-64 (collapsed)
                            : "" // w-240 (expanded)
                          : ""}
                            `}
                    >
                      <span className="text-black flex-shrink-0">
                        {item.icon}
                      </span>

                      <motion.span
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.15 }}
                        className={`overflow-hidden whitespace-nowrap font-semibold ml-2 ${isCollapsed ? "w-0" : "w-auto"
                          }`}
                      >
                        {item.label}
                      </motion.span>

                      {!isCollapsed && (
                        <div
                          className={`ml-auto transition-transform duration-300 ${openDropdown === item.name
                            ? "rotate-180"
                            : "rotate-0"
                            }`}
                        >
                          {openDropdown === item.name ? (
                            <MdExpandLess />
                          ) : (
                            <MdExpandMore />
                          )}
                        </div>
                      )}
                    </motion.div>

                    {/* INLINE DROPDOWN (ONLY WHEN SIDEBAR IS EXPANDED) */}
                    {!isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={
                          openDropdown === item.name ? "open" : "collapsed"
                        }
                        variants={{
                          open: {
                            height: "auto",
                            opacity: 1,
                            transition: { duration: 0.3 },
                          },
                          collapsed: {
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.3 },
                          },
                        }}
                        className="overflow-hidden"
                        ref={(el) => (dropdownRefs[item.name] = el)}
                      >
                        {item.links.map((link) => {
                          if (link.isHide) return null;
                          const isActive = isActiveRoute(link.to);
                          return (
                            <React.Fragment key={link.to}>
                              <Link
                                to={link.to}
                                onClick={handleSingleRouteClick}
                                className={`block px-4 py-2.5 text-sm transition-all duration-300
                        ${isActive
                                    ? "bg-[#e6f4ff] text-blue-800"
                                    : "text-gray-800"
                                  }
                        hover:bg-[#e6f4ff]`}
                              >
                                <FiberManualRecordIcon
                                  sx={{
                                    color: isActive ? "blue" : "black",
                                    fontSize: "10px",
                                    marginRight: "10px",
                                  }}
                                />
                                <span
                                  className={`font-[600] ${isActive ? "text-blue-800" : "text-gray-800"
                                    }`}
                                >
                                  {link.label}
                                </span>
                              </Link>
                              <Divider variant="middle" sx={{ mx: 0, p: 0 }} />
                            </React.Fragment>
                          );
                        })}
                      </motion.div>
                    )}

                    {isCollapsed && openDropdown === item.name && (
                      <InfoPopoverSidebar
                        divClassName="p-0"
                        anchorEl={popoverAnchor}
                        open={popoverOpen}
                        onClose={() => {
                          setPopoverOpen(false);
                          setOpenDropdown(null);
                        }}
                        placement="right-start"
                        // Crucial: Make the MUI Popover container invisible to let our custom div shine
                        PaperProps={{
                          style: {
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            overflow: "visible",
                            marginLeft: "12px", // Gap between sidebar and popover
                          },
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          className="w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden ring-1 ring-black/5"
                        >
                          {/* Header: Gives the popover "Identity" */}
                          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-gray-900 leading-none">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-medium">
                                Services
                              </span>
                            </div>
                          </div>

                          {/* Body: The Menu Items */}
                          <div className="p-2">
                            {item.links.filter((link) => !link.isHide)
                              .length === 0 ? (
                              <div className="py-6 text-center text-gray-400 text-sm italic">
                                No options available
                              </div>
                            ) : (
                              <div className="space-y-1">
                                {item.links.map((link) => {
                                  if (link.isHide) return null;
                                  const isActive = isActiveRoute(link.to);

                                  return (
                                    <Link
                                      key={link.to}
                                      to={link.to}
                                      onClick={handleSingleRouteClick}
                                      className="relative group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 no-underline"
                                    >
                                      {/* Hover/Active Background */}
                                      <div
                                        className={`absolute inset-0 rounded-xl transition-all duration-200 ${isActive
                                          ? "bg-blue-50/80 border border-blue-100/50"
                                          : "group-hover:bg-gray-100/80"
                                          }`}
                                      />

                                      {/* Dot Indicator */}
                                      <div
                                        className={`relative w-1.5 h-1.5 rounded-full transition-all duration-300 mr-3 ${isActive
                                          ? "bg-blue-600 scale-125"
                                          : "bg-gray-300 group-hover:bg-gray-400"
                                          }`}
                                      />

                                      {/* Label */}
                                      <span
                                        className={`relative text-sm transition-colors duration-200 ${isActive
                                          ? "text-blue-700 font-semibold"
                                          : "text-gray-600 group-hover:text-gray-900 font-medium"
                                          }`}
                                      >
                                        {link.label}
                                      </span>

                                      {/* Right Arrow - Visible on Hover */}
                                      <div
                                        className={`relative ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 ${isActive
                                          ? "text-blue-500 opacity-100"
                                          : "text-gray-300"
                                          }`}
                                      >
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="9 5l7 7-7 7"
                                          />
                                        </svg>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Footer: Optional visual weight */}
                          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20" />
                        </motion.div>
                      </InfoPopoverSidebar>
                    )}
                  </div>
                </CustomTooltip>
              ) : (
                <CustomTooltip
                  show={isCollapsed && openTooltips[item.name]}
                  key={item.name}
                  text={isCollapsed ? item.label : ""}
                >
                  <div
                    className="w-full"
                    onMouseEnter={() => handleTooltipOpen(item.name)}
                    onMouseLeave={() => handleTooltipClose(item.name)}
                  >
                    {item.onClick ? (
                      <motion.div
                        onClick={() => {
                          item.onClick();
                          handleSingleRouteClick();
                        }}
                        className={`flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 ${isCollapsed ? "justify-center" : ""
                          }`}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span
                          className={`${isCollapsed ? "hidden" : ""
                            } font-[600]`}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={handleSingleRouteClick}
                        className={`flex items-center gap-0  py-2 w-full text-gray-800 hover:bg-[#e6f4ff] hover:text-blue-800 transition-all duration-300 ${collapsedClass} ${isActiveRoute(item.to)
                          ? "bg-[#e6f4ff] text-blue-800 "
                          : ""
                          }`}
                      >
                        <span className="flex-shrink-0 text-lg">
                          {item.icon}
                        </span>
                        <motion.span
                          animate={{ opacity: isCollapsed ? 0 : 1 }}
                          transition={{ duration: 0.15 }}
                          className={`whitespace-nowrap font-semibold ${isCollapsed ? "w-0 overflow-hidden" : "w-auto ml-2"
                            }`}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    )}
                  </div>
                </CustomTooltip>
              )
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
