import { Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

// CONTEXT
import { useUser } from "@/context/auth";

// COMPONENTS
import ChannelTabBot from "../components/bot/ChannelTabBot";
import WhatsappLiveChat from "@/whatsapp/livechat/WhatsappLiveChat";
import { WhatsappChatBot } from "@/CombineLiveChats/components/ServiceLayout/whatsappChats";
import RcsLiveChat from "@/rcs/rcslivechat/RcsLiveChat";
import InstagramLiveChat from "@/Instagram/InstagramLiveChat/InstagramLiveChat";
import { InstagramChatBot } from "@/CombineLiveChats/components/ServiceLayout/InstagramChats";
import { MessengerChatBot } from "@/CombineLiveChats/components/ServiceLayout/MessengerChats";
import { RcsChatBot } from "@/CombineLiveChats/components/ServiceLayout/RcsChats";
import MessengerLiveChat from "@/messenger/MessengerLiveChat/MessengerLiveChat";
import WhatsappBot from "@/whatsapp/WhatsappBot/WhatsappBot";
import Bot from "@/rcs/Bot/Bot";

const ChatBotLayout = () => {
    const { channel } = useParams();
    const { user } = useUser();
    const allowedServiceIds =
        user?.services?.map((s) => s.service_type_id.toString()) || [];
    // const allowedServiceIds = ["7", "8", "9", "10"]; // dummmy

    const { pathname } = useLocation();
    const tab = pathname.split("/")[2];

    const renderDynamicContent = () => {
        switch (channel) {
            case "wwhatsappbot":
                return allowedServiceIds.includes("2") ? (
                    <WhatsappBot />
                ) : (
                    <WhatsappChatBot />
                );
            case "rcsbot":
                return allowedServiceIds.includes("3") ? <Bot /> : <RcsChatBot />;
            case "instabot":
                return allowedServiceIds.includes("12") ? (
                    <InstagramChatBot />
                ) : (
                    <InstagramChatBot />
                );
            case "messengerbot":
                return allowedServiceIds.includes("10") ? (
                    <MessengerChatBot />
                ) : (
                    <MessengerChatBot />
                );
            default:
                return <Outlet />; // For index route or unknown path
        }
    };
    return (
        <div className="h-[98vh] w-full flex flex-col rounded-2xl">
            <ChannelTabBot />
            <div className="overflow-scroll">
                {/* <Outlet /> */}
                {renderDynamicContent()}
            </div>
        </div>
    );
};

export default ChatBotLayout;