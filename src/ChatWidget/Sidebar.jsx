import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import {
  Settings,
  BarChart2,
  ChevronRight,
  X,
  Inbox,
  ChevronDown,
  Database,
} from "lucide-react";
import { BsChatLeft } from "react-icons/bs";
import { IoClipboardOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineTeam } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";

// COMPONENTS
import useWidgetStore from "./stores/useWidgetStore";

export default function Sidebar() {
  const {
    activePage,
    setActivePage,
    openSettings,
    setOpenSettings,
    openAnalytics,
    setOpenAnalytics,
    openInbox,
    setOpenInbox,
    openKnowledge,
    setOpenKnowledge,
  } = useWidgetStore();

  const panelRef = useRef(null);

  const closeAll = () => {
    setOpenSettings(false);
    setOpenAnalytics(false);
    setOpenInbox(false);
    setOpenKnowledge(false);
  };

  const handleSettingsClick = () => {
    setOpenSettings((prev) => !prev);
    setOpenAnalytics(false);
    setOpenInbox(false);
    setOpenKnowledge(false);
  };

  const handleAnalyticsClick = () => {
    setOpenAnalytics((prev) => !prev);
    setOpenSettings(false);
    setOpenInbox(false);
    setOpenKnowledge(false);
  };

  const handleInboxClick = () => {
    setOpenInbox((prev) => !prev);
    setOpenSettings(false);
    setOpenAnalytics(false);
    setOpenKnowledge(false);
  };

  const handleKnowledge = () => {
    setOpenKnowledge((prev) => !prev);
    setOpenSettings(false);
    setOpenAnalytics(false);
    setOpenInbox(false);
  };

  useEffect(() => {
    function onDocumentPointer(e) {
      if (!openSettings && !openAnalytics && !openInbox && !openKnowledge)
        return;

      const target = e.target;

      if (panelRef.current && panelRef.current.contains(target)) return;

      if (target.closest?.(".sidebar-trigger")) return;

      closeAll();
    }

    document.addEventListener("pointerdown", onDocumentPointer);
    return () => document.removeEventListener("pointerdown", onDocumentPointer);
  }, [openSettings, openAnalytics, openInbox, openKnowledge]);

  const isSettingsPage = [
    "appearance",
    "chat",
    "account",
    "notification",
    "operatinghours",
  ].includes(activePage);

  const isAnalyticsPage = [
    "overview",
    "humansupport",
    "aisupport",
    "lead",
  ].includes(activePage);

  const isInboxPage = ["inboxui"].includes(activePage);

  const isKnowladgePage = ["dataSources", "products", "suggestions"].includes(
    activePage
  );

  return (
    <div className="flex h-full relative">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex w-16 bg-white border-r flex-col items-center py-6 gap-8 shadow-sm"
      >
        <SidebarIcon
          Icon={Settings}
          active={openSettings}
          onClick={handleSettingsClick}
          onDoubleClick={closeAll}
        />

        <SidebarIcon
          Icon={BarChart2}
          active={openAnalytics}
          onClick={handleAnalyticsClick}
          onDoubleClick={closeAll}
        />

        <SidebarIcon
          Icon={Inbox}
          active={openInbox}
          onClick={handleInboxClick}
          onDoubleClick={closeAll}
        />

        <SidebarIcon
          Icon={Database}
          active={openKnowledge}
          onClick={handleKnowledge}
          onDoubleClick={closeAll}
        />

        <div className="flex-1" />

        <img src="" className="w-10 h-10 rounded-full border" alt="profile" />
      </motion.div>

      {/* MOBILE BOTTOM ICON BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-sm flex md:hidden justify-around py-2 z-30">
        <MobileIcon
          Icon={Settings}
          active={openSettings}
          onClick={handleSettingsClick}
        />
        <MobileIcon
          Icon={BarChart2}
          active={openAnalytics}
          onClick={handleAnalyticsClick}
        />

        <MobileIcon
          Icon={Inbox}
          active={openInbox}
          onClick={handleInboxClick}
        />

        <MobileIcon
          Icon={Database}
          active={openKnowledge}
          onClick={handleKnowledge}
        />
      </div>

      {/* DARK OVERLAY (mobile only) */}
      <AnimatePresence>
        {(openSettings || openAnalytics || openInbox || openKnowledge) && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            onPointerDown={(e) => {
              if (panelRef.current && !panelRef.current.contains(e.target)) {
                closeAll();
              }
            }}
            className="fixed inset-0 bg-black z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* EXPANDING PANEL */}
      <AnimatePresence>
        {(openSettings || openAnalytics || openInbox || openKnowledge) && (
          <motion.div
            key="expandedMenu"
            ref={panelRef}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="
              bg-white border-r shadow-xl h-full 
              w-full md:w-64 fixed md:relative 
              left-0 top-0 md:top-auto 
              z-40 md:z-auto
            "
          >
            {/* MOBILE CLOSE */}
            <div className="md:hidden flex justify-end p-4">
              <button
                onClick={closeAll}
                aria-label="Close"
                className="p-2 rounded hover:bg-gray-100"
              >
                <X size={22} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {openSettings && (
                <Section
                  title="Settings"
                  items={[
                    { label: "Appearances", key: "appearance" },
                    { label: "Chat Page", key: "chat" },
                    { label: "Account", key: "account" },
                    { label: "Notification", key: "notification" },
                    { label: "Operating Hours", key: "operatinghours" },
                  ]}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              )}

              {openAnalytics && (
                <Section
                  title="Analytics"
                  items={[
                    { label: "Overview", key: "overview" },
                    { label: "Human Support", key: "humansupport" },
                    { label: "AI Support", key: "aisupport" },
                    { label: "Lead", key: "lead" },
                  ]}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              )}

              {openInbox && (
                <Section
                  title="Inbox"
                  items={[
                    {
                      label: "Live Conversation",
                      key: "liveconversation",
                      children: [
                        { label: "Unassigned", key: "live-unassigned" },
                        { label: "My Open", key: "live-myopen" },
                        { label: "Solved", key: "live-solved" },
                      ],
                    },
                    {
                      label: "Tickets",
                      key: "tickets",
                      children: [
                        { label: "Unassigned", key: "ticket-unassigned" },
                        { label: "My Open", key: "ticket-myopen" },
                        { label: "Solved", key: "ticket-solved" },
                      ],
                    },
                    { label: "@Mention", key: "@mention" },
                    { label: "AI Agent", key: "aiagent" },

                    {
                      label: "Views",
                      key: "views",
                      children: [
                        { label: "Instagram", key: "instagram" },
                        { label: "Messanger", key: "messanger" },
                        { label: "Whatsapp", key: "whatsapp" },
                      ],
                    },
                    {
                      label: "Agents",
                      key: "agents",
                      children: [{ label: "All Agents", key: "all agents" }],
                    },
                  ]}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              )}

              {openKnowledge && (
                <Section
                  title="Knowledge"
                  items={[
                    { label: "Data Sources", key: "dataSources" },
                    { label: "Products", key: "products" },
                    { label: "Suggestions", key: "suggestions" },
                  ]}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------- ICON COMPONENTS -------- */
function SidebarIcon({ Icon, active, onClick, onDoubleClick }) {
  return (
    <motion.button
      className={`sidebar-trigger p-3 rounded-xl transition ${
        active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick?.();
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      aria-pressed={active}
    >
      <Icon className="w-6 h-6" />
    </motion.button>
  );
}

function MobileIcon({ Icon, active, onClick }) {
  return (
    <button
      className={`sidebar-trigger flex flex-col items-center p-2 ${
        active ? "text-blue-600" : "text-gray-600"
      }`}
      onClick={onClick}
    >
      <Icon size={22} />
    </button>
  );
}

/* ------- MENU SECTION -------- */

const iconMap = {
  liveconversation: <BsChatLeft size={18} />,
  tickets: <IoClipboardOutline size={18} />,
  views: <AiOutlineEye size={18} />,
  agents: <AiOutlineTeam size={18} />,
  default: <RiUserSettingsLine size={18} />,
};

function Section({ title, items, activePage, setActivePage }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    items.forEach((item) => {
      if (item.children?.some((sub) => sub.key === activePage)) {
        setOpenDropdown(item.key);
      }
    });
  }, [activePage]);

  const handleParentClick = (item) => {
    if (item.children) {
      setOpenDropdown(openDropdown === item.key ? null : item.key);
    } else {
      setActivePage(item.key);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-500 text-xs font-bold px-2 uppercase tracking-wide">
        {title}
      </p>

      {items.map((item) => {
        const icon = iconMap[item.key] || iconMap.default;
        const parentActive = activePage === item.key;
        const open = openDropdown === item.key;

        return (
          <div key={item.key} className="w-full">
            {/* Parent */}
            <button
              onClick={() => handleParentClick(item)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                  parentActive || open
                    ? "bg-[#4a3aff] text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="">{icon}</span>
                {item.label}
              </div>

              {item.children && (
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              )}
            </button>

            {/* Sub Menu */}
            <AnimatePresence>
              {item.children && open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="ml-12 mt-1 flex flex-col gap-1"
                >
                  {item.children.map((sub) => {
                    const subActive = activePage === sub.key;
                    return (
                      <button
                        key={sub.key}
                        onClick={() => setActivePage(sub.key)}
                        // onClick={() => {
                        //   setActivePage(sub.key);
                        //   const store = useWidgetStore.getState();
                        //   store.setOpenInbox(false); // AUTO CLOSE SIDEBAR 🚀
                        // }}
                        className={`w-full text-left text-sm py-1.5 rounded-lg px-2 transition-all
                          ${
                            subActive
                              ? "bg-[#4a3aff] text-white shadow"
                              : "text-gray-600 hover:bg-gray-200"
                          }
                        `}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
