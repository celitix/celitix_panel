import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import toast from "react-hot-toast";
import clsx from "clsx";
import { motion } from "framer-motion";

import { themeColors } from "../../themeColors";

// ICONS
import {
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaWhatsapp,
} from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdOutlineEmail } from "react-icons/md";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { SiGoogleauthenticator } from "react-icons/si";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { SiGoogledocs } from "react-icons/si";
import { IoHelpCircleOutline } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import { FaRegMessage } from "react-icons/fa6";
import { MdPhoneMissed } from "react-icons/md";
import { VscCallOutgoing } from "react-icons/vsc";
import { VscCallIncoming } from "react-icons/vsc";
import { MdOutlineTouchApp } from "react-icons/md";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";

// CONTEXT
import { useUser } from "@/context/auth";
import { useTheme } from "@/ApiDocs/context/ThemeContext";

// ASSETS
import rcsicon from "@/assets/icons/RCS02.svg";
import twoway from "@/assets/icons/TWOWAY.svg";
import callback from "@/assets/icons/Callback02.svg";
import missedcall from "@/assets/icons/Missedcall2.svg";
import obd from "@/assets/icons/OBD02.svg";
import ibd from "@/assets/icons/IBD02.svg";
import numberlookup from "@/assets/icons/Numberlookup.svg";
import clicktwocall from "@/assets/icons/Click2Call02.svg";

// import CustomTooltip from "../../../components/common/CustomTooltip";
import InfoPopoverSidebar from "@/mainLayout/sidebar/component/InfoPopoverSidebar";
import CustomTooltip from "@/mainlayout/sidebar/component/CustomTooltip";

const DocsSidebar = ({ isCollapsed, setIsCollapsed, isMobile }) => {
  const { user } = useUser();
  const location = useLocation();

  const [popoverAnchor, setPopoverAnchor] = React.useState(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [collapseAnimationDone, setCollapseAnimationDone] = useState(
    !isCollapsed
  );
  const dropdownRefs = useRef({});

  const collapsedClass = isCollapsed
    ? "justify-center px-0 "
    : "justify-start px-4 ";
  const [openTooltips, setOpenTooltips] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (!isCollapsed) setOpenDropdown(null);
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (!isCollapsed) {
      setOpenTooltips({});
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (isCollapsed) {
      setOpenDropdown(null);
    }
  }, [isCollapsed]);

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

  // const isActiveRoute = (route) => location.pathname.startsWith(route);
  const handleTooltipOpen = (key) =>
    setOpenTooltips((s) => ({ ...s, [key]: true }));
  const handleTooltipClose = (key) =>
    setOpenTooltips((s) => ({ ...s, [key]: false }));

  const isActiveRoute = (route) => {
    const updatedRoute = route.replace(/^\/docs/, "");

    if (route === "/") {
      return location.pathname === "/";
    }
    const removedDocsPathName = location.pathname.replace(/^\/docs\/?/, "");
    return removedDocsPathName.startsWith(updatedRoute);
  };
  // const navigate = useNavigate();
  // const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     toast.success("Logged out successfully!");
  //     // window.location.href = "/login";
  //     setTimeout(() => {
  //         window.location.href = "/login";
  //     }, 1000)
  // };

  useEffect(() => {
    const activeMenu = menuItems.find((item) =>
      item.links?.some((link) => isActiveRoute(link.to))
    );

    if (activeMenu) {
      setOpenDropdown(activeMenu.name);
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const handleSingleRouteClick = () => {
    setOpenTooltips({});
    setPopoverOpen(false);
    setOpenDropdown(null);
    setIsCollapsed(true);
    // setOpenDropdown(null);
  };

  const { isDarkMode } = useTheme();

  const colors = themeColors(isDarkMode);
  const menuItems = [
    {
      name: "Quickstart",
      icon: <MdOutlineRocketLaunch />,
      label: "Quickstart",
      type: "single",
      to: "quickstart",
    },
    {
      name: "Sms",
      icon: <LuMessageSquareMore />,
      label: "SMS",
      type: "dropdown",
      links: [
        // { to: "sms", label: "Introduction" },
        { to: "submit-template-sms", label: "Submit Template" },
        // { to: "update-template-sms", label: "Update Template" },
        // { to: "delete-template-sms", label: "Delete Template" },
      ],
    },
    {
      name: "Whatsapp",
      icon: <FaWhatsapp />,
      label: "Whatsapp",
      type: "dropdown",
      links: [
        // { to: "whatsapp", label: "Introduction" },
        { to: "send-messages-whatsapp", label: "Send Message" },
        { to: "get-template-whatsapp", label: "Get Template" },
        // { to: "submit-template-whatsapp", label: "Submit Template old" },
        // { to: "send-template-whatsapp", label: "Send Template old" },
        // { to: "send-message-whatsapp", label: "Send Message" },
      ],
    },
    {
      name: "Instagram",
      icon: <InstagramIcon sx={{ fontSize: "20px" }} />,
      label: "Instagram ",
      type: "dropdown",
      links: [{ to: "instagramSetting", label: "Instagram Setting" }],
    },
    {
      name: "RCS",
      icon: <FaRegMessage />,
      label: "RCS",
      type: "dropdown",
      links: [
        // { to: "rcs", label: "Introduction" },
        // { to: "submit-template-rcs", label: "Submit Template" },
        // { to: "update-template-rcs", label: "Update Template" },
        // { to: "manage-template-rcs", label: "Manage Template" },
        // { to: "delete-template-rcs", label: "Delete Template" },
      ],
    },
    {
      name: "Twowaysms",
      icon: <TbMessages />,
      label: "Two Way SMS",
      type: "dropdown",
      links: [
        // { to: "twowaysms", label: "Introduction" },
        // { to: "submit-template-twowaysms", label: "Submit Template" },
        // { to: "update-template-twowaysms", label: "Update Template" },
        // { to: "delete-template-twowaysms", label: "Delete Template" },
      ],
    },
    {
      name: "Outbound",
      icon: <VscCallOutgoing />,
      label: "OBD",
      type: "dropdown",
      links: [
        // { to: "outbound", label: "Introduction" },
        { to: "submit-template-outbound", label: "Submit Template" },
        // { to: "update-template-outbound", label: "Update Template" },
        // { to: "delete-template-outbound", label: "Delete Template" },
      ],
    },
    {
      name: "Inbound",
      icon: <VscCallIncoming />,
      label: "Inbound",
      type: "dropdown",
      links: [
        // { to: "inbound", label: "Introduction" },
        // { to: "submit-template-inbound", label: "Submit Template" },
        // { to: "update-template-inbound", label: "Update Template" },
        // { to: "delete-template-inbound", label: "Delete Template" },
      ],
    },
    {
      name: "sendEmailDocs",
      icon: <EmailOutlinedIcon fontSize="small" />,
      label: "Email",
      type: "dropdown",
      links: [{ to: "sendEmailDocs", label: "Send Email" }],
    },
    {
      name: "Missedcall",
      icon: <MdPhoneMissed />,
      label: "Missed Call",
      type: "dropdown",
      links: [
        // { to: "missedcall", label: "Introduction" },
        // { to: "submit-template-missedcall", label: "Submit Template" },
        // { to: "update-template-missedcall", label: "Update Template" },
        // { to: "delete-template-missedcall", label: "Delete Template" },
      ],
    },
    {
      name: "Clicktwocall",
      icon: <MdOutlineTouchApp />,
      label: "Click 2 Call",
      type: "dropdown",
      links: [
        // { to: "clicktwocall", label: "Introduction" },
        // { to: "submit-template-clicktwocall", label: "Submit Template" },
        // { to: "update-template-clicktwocall", label: "Update Template" },
        // { to: "delete-template-clicktwocall", label: "Delete Template" },
      ],
    },
    {
      name: "Authentication",
      icon: <SiGoogleauthenticator />,
      label: "OTP Generator",
      type: "dropdown",
      links: [
        // { to: "authentication", label: "Introduction" },
        // { to: "submit-template-authentication", label: "Submit Template" },
        // { to: "update-template-authentication", label: "Update Template" },
        // { to: "delete-template-authentication", label: "Delete Template" },
      ],
    },
    // {
    //   name: "Help",
    //   icon: <IoHelpCircleOutline />,
    //   label: "Help",
    //   type: "single",
    //   to: "help",
    // },
    {
      name: "gsmerrorcode",
      icon: <MdOutlineRocketLaunch />,
      label: "GSM Error Code",
      type: "single",
      to: "gsmerrorcode",
    },
  ];

  const getFilteredMenuItems = (items, userState) => {
    return items;
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
      className={`mainsidebar h-full ${
        isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-gray-800"
      }h-screen text-white  popf px-0 pt-3 flex flex-col fixed  left-0 overflow-y-auto overflow-x-hidden z-9  {isCollapsed ? "items-center" : "space-y-0"
        }`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <nav
        className={clsx(
          `mt-1 ${
            isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-gray-800"
          }`
        )}
      >
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
                  className={`${colors.textPrimary}
                                      group flex items-center py-2 w-full cursor-pointer
                       hover:bg-[#585656ec] text-left text-gray-800 hover:text-gray-100
                     transition-all duration-300 ${collapsedClass}

                              ${
                                item.links?.some((link) =>
                                  isActiveRoute(link.to)
                                )
                                  ? isCollapsed
                                    ? "bg-[#585656ec] " // w-64 (collapsed)
                                    : "" // w-240 (expanded)
                                  : ""
                              }
                  `}
                >
                  <span
                    className={`flex-shrink-0 transition-colors duration-300 
                   ${isActiveRoute(`/${item.name}`) ? "text-gray-100" : ""}
                 group-hover:text-gray-100`}
                  >
                    {item.icon}
                  </span>

                  <motion.span
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    className={`overflow-hidden whitespace-nowrap font-semibold ml-2 ${
                      isCollapsed ? "w-0" : "w-auto"
                    }`}
                  >
                    {item.label}
                  </motion.span>

                  {!isCollapsed && (
                    <div
                      className={`ml-auto transition-transform duration-300 ${
                        openDropdown === item.name ? "rotate-180" : "rotate-0"
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
                           hover:bg-[#585656ec] hover:text-gray-100 
                           ${
                             isActiveRoute(link.to)
                               ? "bg-[#585656ec] text-white"
                               : isDarkMode
                               ? "text-white"
                               : "text-gray-800"
                           }`}
                          >
                            <FiberManualRecordIcon
                              sx={{
                                fontSize: "10px",
                                marginRight: "10px",
                                color: isActiveRoute(link.to)
                                  ? "#ffffff"
                                  : isDarkMode
                                  ? "#ffffff"
                                  : "",
                              }}
                            />
                            <span
                              className={`font-[600] ${
                                isActive ? "text-gray-100 " : "text-gray-700"
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
                        <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600">
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
                                    className={`absolute inset-0 rounded-xl transition-all duration-200  ${
                                      isActive
                                        ? "bg-gray-100/60 border border-gray-100/10"
                                        : "group-hover:bg-gray-100/80"
                                    }`}
                                  />

                                  {/* Dot Indicator */}
                                  <div
                                    className={`relative w-1.5 h-1.5 rounded-full transition-all duration-300 mr-3 ${
                                      isActive
                                        ? "bg-gray-600 scale-125"
                                        : "bg-gray-300  "
                                    }`}
                                  />

                                  {/* Label */}
                                  <span
                                    className={`relative text-sm transition-colors duration-200  ${
                                      isActive
                                        ? "text-gray-600 font-semibold  "
                                        : "  font-medium"
                                    }`}
                                  >
                                    {link.label}
                                  </span>

                                  {/* Right Arrow - Visible on Hover */}
                                  <div
                                    className={`relative ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 ${
                                      isActive
                                        ? "text-gray-500 opacity-100"
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
                    className={`flex items-center gap-4 px-4 py-2 transition-all w-full text-left cursor-pointer text-gray-100   hover:bg-[#585656ec] hover:text-gray-100 ${
                      isCollapsed ? "justify-center" : ""
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
                    className={`flex items-center gap-0  py-2 w-full text-gray-100  hover:bg-[#585656ec] hover:text-gray-100 transition-all duration-300 ${collapsedClass} ${
                      isActiveRoute(item.to)
                        ? "bg-[#585656ec] text-white"
                        : isDarkMode
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    <span className="flex-shrink-0 text-lg">{item.icon}</span>
                    <motion.span
                      animate={{ opacity: isCollapsed ? 0 : 1 }}
                      transition={{ duration: 0.15 }}
                      className={`whitespace-nowrap font-semibold ${
                        isCollapsed ? "w-0 overflow-hidden" : "w-auto ml-2"
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
      </nav>
    </motion.div>
  );
};

export default DocsSidebar;
