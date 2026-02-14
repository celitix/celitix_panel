import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { all } from "axios";
// import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
import { LuWandSparkles } from "react-icons/lu";
import QuickreplyOutlinedIcon from "@mui/icons-material/QuickreplyOutlined";

// ASSETS
import rcsicon from "../../assets/icons/RCS02.svg";
import truecaller from "../../assets/icons/truecaller.svg";
import twoway from "../../assets/icons/TWOWAY.svg";
import callback from "../../assets/icons/Callback02.svg";
import missedcall from "../../assets/icons/Missedcall2.svg";
import obd from "../../assets/icons/OBD02.svg";
import ibd from "../../assets/icons/IBD02.svg";
import numberlookup from "../../assets/icons/Numberlookup.svg";
import clicktwocall from "../../assets/icons/Click2Call02.svg";

// COMPONENTS
import { userItems } from "./user";
import { resellerItems } from "./reseller";
import InfoPopoverSidebar from "./component/InfoPopoverSidebar";
import CustomTooltip from "./component/CustomTooltip";

// CONTEXT
import { useUser } from "@/context/auth";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile }) => {
  const { user } = useUser();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [collapseAnimationDone, setCollapseAnimationDone] = useState(
    !isCollapsed
  );
  const [popoverAnchor, setPopoverAnchor] = React.useState(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
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

  useEffect(() => {
    if (!isCollapsed) {
      setPopoverOpen(false);
      setPopoverAnchor(null);
    }
  }, [isCollapsed]);

  // const handleDropdownClick = (dropdownName) => {
  //   if (isCollapsed) {
  //     setIsCollapsed(false);
  //     return;
  //   }
  //   setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  // };

  const handleSingleRouteClick = () => {
    setOpenTooltips({}); // 🔑 HIDE ALL TOOLTIPS
    setPopoverOpen(false); // 🔑 CLOSE POPOVER
    setOpenDropdown(null); // 🔑 CLOSE DROPDOWN
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
      setOpenDropdown(activeMenu.name);
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const menuItems = user?.role === "RESELLERUSER" ? userItems : resellerItems;
  // const menuItems = [];

  const getFilteredMenuItems = (menuItems = [], userState) => {
    let allowedServices = [];
    if (userState.role === "AGENT") {
      return [
        {
          id: "",
          name: "Home",
          icon: <FaHome />,
          label: "Home",
          type: "single",
          to: "/",
        },
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
    // if (userState.role === "RESELLER") {
    //   return menuItems;
    // }

    const alwaysIncludeNames = [
      "Home",
      "apiDocs",
      "CallBack",
      "Managecontacts",
      "chatManagement",
      "converterutility",
      "botManagement",
      // "E-mail"
    ];

    // const allowedServices = menuItems.map((item) => {
    //   if (alwaysIncludeNames.includes(item.name)) {
    //     return item;
    //   }
    //   const hasMatch = userState.services.some(
    //     (service) => service.service_type_id == item.id
    //   );

    //   return {
    //     ...item,
    //     links: hasMatch ? item.links : [],
    //   };
    // });

    // return allowedServices;

    if (userState.role === "RESELLER") {
      alwaysIncludeNames.push("User Management");
      alwaysIncludeNames.push("managefunds");
      alwaysIncludeNames.push("managewaba");
      allowedServices = menuItems.map((item) => {
        if (alwaysIncludeNames.includes(item.name)) {
          return item;
        }
        if (item.name === "Reports") {
          const hasMatch = item.links.filter((link) =>
            userState.services.some(
              (service) => link.id == service.service_type_id
            )
          );

          return {
            ...item,
            links: hasMatch,
          };
        }
      });

      return allowedServices;
    }
    allowedServices = menuItems.map((item) => {
      if (alwaysIncludeNames.includes(item.name)) {
        return item;
      }
      const hasMatch = userState.services.some(
        (service) => service.service_type_id == item.id
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
      className={`mainsidebar h-screen bg-white text-white popf px-0 pt-3 flex flex-col fixed  left-0 overflow-y-auto overflow-x-hidden z-9  
        ${isCollapsed ? "items-center " : "space-y-0"}`}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <div className="w-full">
        {filteredItems.map((item) =>
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
          )
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
