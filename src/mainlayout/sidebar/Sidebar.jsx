import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { all } from "axios";

// ICONS
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { MdExpandLess, MdExpandMore, MdOutlineEmail } from "react-icons/md";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import UnsubscribeOutlinedIcon from "@mui/icons-material/UnsubscribeOutlined";
import { FaHome, FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { SiGoogleauthenticator } from "react-icons/si";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { LiaTagsSolid } from "react-icons/lia";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import QuickreplyOutlinedIcon from "@mui/icons-material/QuickreplyOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LuWorkflow } from "react-icons/lu";
import { LuWandSparkles } from "react-icons/lu";
import { RiAiGenerate2 } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { TbMessageChatbot } from "react-icons/tb";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// ASSETS
import rcsicon from "@/assets/icons/RCS02.svg";
import twoway from "@/assets/icons/TWOWAY.svg";
import callback from "@/assets/icons/Callback02.svg";
import missedcall from "@/assets/icons/Missedcall2.svg";
import obd from "@/assets/icons/OBD02.svg";
import ibd from "@/assets/icons/IBD02.svg";
import numberlookup from "@/assets/icons/Numberlookup.svg";
import clicktwocall from "@/assets/icons/Click2Call02.svg";
import aigenerate from "@/assets/icons/ai-generate.webp";
import dash1 from "@/assets/icons/business.png";
import dash2 from "@/assets/icons/dashboard.png";
import dash3 from "@/assets/icons/layout.png";
import truecaller from "@/assets/icons/truecaller.svg";
import aigenerate2 from "@/assets/icons/aigenerate2.jpg";

// CONTEXT
import { useUser } from "@/context/auth";
import InfoPopover from "@/components/common/InfoPopover";
import CustomTooltip from "./component/CustomTooltip";
import InfoPopoverSidebar from "./component/InfoPopoverSidebar";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile }) => {
  const { user } = useUser();
  const [popoverAnchor, setPopoverAnchor] = React.useState(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [collapseAnimationDone, setCollapseAnimationDone] =
    useState(!isCollapsed);

  const location = useLocation();
  const [openTooltips, setOpenTooltips] = useState({});
  const dropdownRefs = useRef({});
  const navigate = useNavigate();

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
    if (!isCollapsed) setOpenDropdown(null);
  }, [isCollapsed]);

  // const handleDropdownClick = (dropdownName) => {
  //   if (isCollapsed) {
  //     // ✅ DO NOT EXPAND SIDEBAR
  //     setOpenDropdown((prev) =>
  //       prev === dropdownName ? null : dropdownName
  //     );
  //     return;
  //   }

  //   setOpenDropdown((prev) =>
  //     prev === dropdownName ? null : dropdownName
  //   );
  // };

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
    // setOpenDropdown(null);
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
      item.links?.some((link) => isActiveRoute(link.to)),
    );
    if (activeMenu && isCollapsed === false) {
      setOpenDropdown(activeMenu.name);
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const menuItems = [
    {
      id: "",
      name: "Home",
      icon: <FaHome />,
      // icon: <img src={dash3} className="w-4 h-4" />,
      label: "Dashboard",
      type: "single",
      to: "/",
      roles: ["ADMIN", "AGENT"],
    },
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
      name: "SMS",
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
        { to: "/managekeywords", label: "Manage Keyword" },
        { to: "/twowayreports", label: "Delivery Report" },
        { to: "/twowayintegration", label: "Integration" },
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
        {
          to: "/rcsonboarding",
          label: "RCS Onboarding",
        },
        // {
        //   to: "/rcsbot",
        //   label: "Chat Bot",
        // },
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
        // { to: "/newwabaui", label: "Manage WABA UI" },
        // { to: "/newwabaembedded", label: "Manage WABA New" },
        // { to: "/wmanagewabanew", label: "Manage WABA New" },
        { to: "/wwhatsappconversation", label: "WhatsApp Conversation" },
        // { to: "/wwhatsappmanageagent", label: "Manage Agent" },
        // { to: "/wwhatsappbot", label: "Manage Bot" },
        { to: "/wwhatsappflows", label: "Manage Flows" },
        // { to: "/whatsappcalling", label: "Calling" },
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
    // {
    //   id: "22",
    //   name: "commercemanagermain",
    //   icon: <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />,
    //   label: "Commerce Manager",
    //   type: "dropdown",
    //   links: [
    //     { to: "/commercemanager", label: "Commerce Manager" },
    //     { to: "/homelisting", label: "Home Listing" },
    //     { to: "/vehicle", label: "Vehicle " },
    //     { to: "/inventorymanagement", label: "Inventory Management" },
    //     { to: "/orderMangement", label: "Order Mangement" },
    //     { to: "/cmproductcategories", label: "Product Categories" },
    //     { to: "/commerecesetting", label: "Commerece Settting" },
    //   ],
    //   roles: ["ADMIN", "DIRECTUSER"],
    // },
    {
      id: "12",
      name: "instagram",
      icon: <InstagramIcon sx={{ fontSize: "20px" }} />,
      label: "Instagram",
      type: "dropdown",
      links: [
        {
          to: "/manageinstaprofile",
          label: "Manage Profile",
        },
        // { to: "/instalivechats", label: "Live Chats" },
        { to: "/manageinstatemplate", label: "Templates" },
        { to: "/commentmoderation", label: "Comment Moderation" },
        { to: "/insight", label: "Insight" },
        { to: "/postcontainer", label: "Create" },
        { to: "/instareferral", label: "Referral" },
        { to: "/instagramembedded", label: "instagramembedded" },
      ],
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
      icon: <TbMessageChatbot fontSize="20" style={{ fontSize: "17px" }} />,
      label: "Chat Bots",
      type: "dropdown",
      links: [
        { to: "/ChatBotMain/", label: "Chat Bots" },
        { to: "/ChatBotSettings", label: "Chat Bots Settings" },
      ],
      roles: ["ADMIN"],
    },
    {
      id: "8",
      name: "HLR",
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
        { to: "/authsettings", label: "Settings" },
        { to: "/authreports", label: "Delivery Report" },
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
        // { to: "/sendemail", label: "Launch Campaign" },
        { to: "/emailmanagement/", label: "Manage Template" },
        { to: "/emailreports", label: "Delivery Report" },
        { to: "/emailwhitelist", label: "Email WhiteList" },
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
        { to: "/ibdcallhistory", label: "Call History" },
        { to: "/ibdmanageexecutive", label: "Manage Executive" },
        { to: "/ibdivrflow", label: "IVR Flow" },
        { to: "/ibdsettings", label: "Settings" },
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
        { to: "/missedcallhistory", label: "Call History" },
        { to: "/missedcallsettings", label: "Settings" },
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
        { to: "/clicktohistory", label: "Call History" },
        { to: "/clicktosettings", label: "Settings" },
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
    // {
    //   id: "",
    //   name: "managefunds",
    //   icon: <IoWalletOutline />,
    //   label: "Manage Funds",
    //   type: "dropdown",
    //   links: [
    //     // { to: "/selfrecharge", label: "Recharge" },
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
    //   name: "Leadmanagement",
    //   icon: <LeaderboardOutlinedIcon fontSize="20" style={{ fontSize: "17px" }} />,
    //   label: "Lead Management",
    //   type: "single",
    //   to: "/leadmanagement/leadtags",
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
        // { to: "/agentmapping", label: "Agent Mapping" },
        // { to: "/wwhatsappmanageagent", label: "Manage Agent" },
        { to: "/manageallagent", label: "Manage Agent" },
        { to: "/blockNumber", label: "Block Number" },
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

  const getFilteredMenuItems = (menuItems, userState) => {
    // let allowedServices = [];

    if (userState.role === "ADMIN") {
      return menuItems;
    }

    if (userState.role === "AGENT") {
      return [
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
    }

    const alwaysIncludeNames = [
      "Home",
      "apiDocs",
      "CallBack",
      "Managecontacts",
      "Workflow",
      "chatManagement",
      "managefunds",
      "E-mail",
      "instagram",
      "converterutility",
      "botManagement",
      "commercemanagermain",
    ];

    // menuItems.forEach((item) => {
    //   // if (item.roles.includes(userState.role)) allowedServices.push(item);
    //   // userState.services.forEach((service, index) => {
    //   //   if (item.id == service.service_type_id) {
    //   //     allowedServices.push(item);
    //   //   }
    //   // });
    //   // if (item.name === "Home") {
    //   //   allowedServices.push(item);
    //   // }
    //   // if (item.name === "apiDocs") {
    //   //   allowedServices.push(item);
    //   // }
    //   // if (item.name === "CallBack") {
    //   //   allowedServices.push(item);
    //   // }
    //   // if (item.name === "Managecontacts") {
    //   //   allowedServices.push(item);
    //   // }
    //   // userState.services.forEach((service, index) => {
    //   //   if (item.id == service.service_type_id) {
    //   //     allowedServices.push(item);
    //   //   }
    //   // });
    // });

    const allowedServices = menuItems.map((item) => {
      if (alwaysIncludeNames.includes(item.name)) {
        return item;
      }
      const hasMatch = userState.services.some(
        (service) => service.service_type_id == item.id,
      );

      return {
        ...item,
        links: hasMatch ? item.links : [],
      };
    });

    return allowedServices;
  };

  const filteredItems = getFilteredMenuItems(menuItems, user);

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
      className={`mainsidebar h-screen bg-white text-white popf px-0 pt-3 flex flex-col fixed left-0 overflow-y-auto overflow-x-hidden z-9
    ${isCollapsed ? "items-center" : "space-y-0"}`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <div className="w-full">
        {filteredItems.map((item) =>
          item.type === "dropdown" ? (
            <CustomTooltip
              // key={item.name}
              // title={item.label}
              // placement="right"
              // arrow
              // open={isCollapsed ? openTooltips[item.name] : false}
              // onOpen={() => handleTooltipOpen(item.name)}
              // onClose={() => handleTooltipClose(item.name)}
              // disableHoverListener={!isCollapsed}
              // disableFocusListener={!isCollapsed}
              // disableTouchListener={!isCollapsed}

              show={isCollapsed && openTooltips[item.name]}
              text={isCollapsed ? item.label : ""}
            >
              {/* REQUIRED: relative wrapper for absolute dropdown */}
              <div
                className="w-full"
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
                      : ""
                    }
`}
                >
                  <span className="text-black flex-shrink-0">{item.icon}</span>

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
                      className={`ml-auto transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : "rotate-0"
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
                    animate={openDropdown === item.name ? "open" : "collapsed"}
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
                        {item.links.filter((link) => !link.isHide).length ===
                          0 ? (
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
              // key={item.name}
              // title={isCollapsed ? item.label : ""}
              // placement="right"
              // arrow
              // open={isCollapsed ? openTooltips[item.name] : false}
              // onOpen={() => handleTooltipOpen(item.name)}
              // onClose={() => handleTooltipClose(item.name)}
              // disableHoverListener={!isCollapsed}
              // disableFocusListener={!isCollapsed}
              // disableTouchListener={!isCollapsed}
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
                      className={`${isCollapsed ? "hidden" : ""} font-[600]`}
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
                    <span className="flex-shrink-0 text-lg">{item.icon}</span>
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
          ),
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
