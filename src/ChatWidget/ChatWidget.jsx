import React from "react";

// COMPONENTS
import Sidebar from "./Sidebar";
import BotUi from "./components/BotUi";
import Appearances from "./Appearances";
import ChatPage from "./ChatPage";
import AccountSetting from "./AccountSetting";
import Notification from "./Notification";
import OperatingHours from "./OperatingHours";
import Overviews from "./Analytics/Overviews";
import HumanSupport from "./Analytics/HumanSupport";
import AISupport from "./Analytics/AISupport";
import Lead from "./Analytics/Lead";
import UniversalButton from "@/components/common/UniversalButton";
import useWidgetStore from "./stores/useWidgetStore";
import InboxUI from "./Inbox/InboxUi";
import DataSources from "./Knowledge/DataSources";
import Products from "./Knowledge/Product";
import Suggestions from "./Knowledge/Suggestions";


const ChatWidget = () => {
  // SAFE — individual selectors = stable references
  const activePage = useWidgetStore((s) => s.activePage);
  const openSettings = useWidgetStore((s) => s.openSettings);
  const openAnalytics = useWidgetStore((s) => s.openAnalytics);
  const openInbox = useWidgetStore((s) => s.openInbox);
  const openKnowledge = useWidgetStore((s) => s.openKnowledge);

  const setWidget = useWidgetStore((s) => s.setWidget);
  const setActivePage = useWidgetStore((s) => s.setActivePage);
  const toggleSettings = useWidgetStore((s) => s.toggleSettings);
  const toggleAnalytics = useWidgetStore((s) => s.toggleAnalytics);
  const toggleInbox = useWidgetStore((s) => s.settoggleInbox);

  const handleWidgetSave = () => {
    const snapshot = useWidgetStore.getState();
    const {
      setWidget,
      setActivePage,
      toggleSettings,
      toggleAnalytics,
      toggleInbox,
      reset,
      ...payload
    } = snapshot;
    console.log("Widget settings saved:", payload);
  };

  return (
    <div className="flex h-screen w-full bg-[#F7F9FC] overflow-hidden">
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        className="
      flex-1 
      p-3 md:p-2 
      overflow-y-auto 
      pb-24 md:pb-8   /* space for mobile bottom bar */
    "
      >
        {activePage === "appearance" && <Appearances />}
        {activePage === "chat" && <ChatPage />}
        {activePage === "account" && <AccountSetting />}
        {activePage === "notification" && <Notification />}
        {activePage === "operatinghours" && <OperatingHours />}
        {activePage === "overview" && <Overviews />}
        {activePage === "humansupport" && <HumanSupport />}
        {activePage === "aisupport" && <AISupport />}
        {activePage === "lead" && <Lead />}
        {[
          "live-unassigned",
          "live-myopen",
          "live-solved",
          "ticket-unassigned",
          "ticket-myopen",
          "ticket-solved",
          "@mention",
          "aiagent",
          "instagram",
          "messanger",
          "whatsapp",
          "all agents",
        ].includes(activePage) && <InboxUI activePage={activePage} />}

        {activePage === "dataSources" && <DataSources />}
        {activePage === "products" && <Products/>}
        {activePage === "suggestions" && <Suggestions/>}
        {/* STICKY SAVE BUTTON */}
        <div
          className="
        sticky bottom-0 
        bg-white 
        p-4 
        border-t 
        mt-6 
        shadow-sm
      "
        >
          <UniversalButton label="Save Changes" onClick={handleWidgetSave} />
        </div>
      </main>

      {/* BOT UI */}
      <aside>
        <BotUi />
      </aside>
    </div>
  );
};

export default ChatWidget;
