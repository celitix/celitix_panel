import { Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

// CONTEXT
import { useUser } from "@/context/auth";

// COMPONENTS
import ChannelTabs from "../components/chat/ChannelTabs";
import WhatsappLiveChat from "@/whatsapp/livechat/WhatsappLiveChat";
import WhatsappChats, { WhatsappChatSettingSetup } from "@/CombineLiveChats/components/ServiceLayout/whatsappChats";
import RcsLiveChat from "@/rcs/rcslivechat/RcsLiveChat";
import InstagramLiveChat from "@/Instagram/InstagramLiveChat/InstagramLiveChat";
import InstagramChats, { InstagramChatsSettings } from "../components/ServiceLayout/InstagramChats";
import MessengerChats, { MessengerChatsSetting } from "../components/ServiceLayout/MessengerChats";
import RcsChats, { RcsSettings } from "@/CombineLiveChats/components/ServiceLayout/RcsChats";
import ChannelTabSettings from "../components/Settings/ChannelTabSettings";
import WhatsappLiveChatSettings from "@/whatsapp/whatsappLiveChatSetting/WhatsappLiveChatSettings";
import RCSLiveChatSettings from "@/rcs/rcsLiveChatSettings/RCSLiveChatSettings";
import InstaSettings from "@/instagram/settings/InstaSettings";
import WhatsappLiveChatSet from "@/whatsapp/whatsappLiveChatSetting/WhatsappLiveChatSet";
import { useSettings } from "@/context/LiveChatSettingContext";


const CombineLiveChatSettings = () => {
  const { selectedWabaUser, setSelectedWabaUser } = useSettings();

  const { channel } = useParams();
  const { user } = useUser();
  const allowedServiceIds =
    user?.services?.map((s) => s.service_type_id.toString()) || [];
  // const allowedServiceIds = ["7", "8", "9", "10"]; // dummmy

  // RCSLiveChatSettings - later map this at rcslivechat

  const { pathname } = useLocation();
  const tab = pathname.split("/")[2];

  const renderDynamicContent = () => {
    switch (channel) {
      case "wlcsetting":
        return allowedServiceIds.includes("2") ?
          <WhatsappLiveChatSettings selectedWabaUser={selectedWabaUser} /> :
          // <WhatsappLiveChatSet /> :
          <WhatsappChatSettingSetup />
          ;
      case "rcslcsetting":
        return allowedServiceIds.includes("3") ? <RcsSettings /> : <RcsSettings />;
      case "instalcsetting":
        return allowedServiceIds.includes("12") ?
          // <InstagramLiveChat />
          <InstaSettings /> :
          <InstagramChatsSettings />
          // <InstaSettings />
          ;
      case "messengerlcsetting":
        return allowedServiceIds.includes("5") ?
          <MessengerChatsSetting />
          :
          <MessengerChatsSetting />
          ;
      default:
        return <Outlet />; // For index route or unknown path
    }
  };
  return (
    <div className="h-[91vh] w-full flex flex-col rounded-2xl">
      <ChannelTabSettings />
      <div className="overflow-hidden pt-1">
        {/* <Outlet /> */}
        {renderDynamicContent()}
      </div>
    </div>
  );
};

export default CombineLiveChatSettings;
