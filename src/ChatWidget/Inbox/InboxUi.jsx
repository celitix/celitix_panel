import { useState } from "react";
import { Link } from "react-router-dom";


// ICONS
import {
  Search,
  Send,
  MessageSquare,
  Instagram,
  Mail,
  MessageCircleMore,
  EllipsisVertical,
  Users,
  Bot,
  Ticket,
  CheckCircle,
} from "lucide-react";
import { FaHandPeace } from "react-icons/fa";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

// COMPONENTS
import InboxConversation from "./InboxConversation";

export default function InboxUI({ activePage }) {
  const [mockMessages, setMockMessages] = useState([
    {
      id: 1,
      from: "user",
      text: "Hi! I need help with my order.",
      time: "10:45 AM",
    },
    {
      id: 2,
      from: "agent",
      text: "Sure! Can you share your order ID?",
      time: "10:46 AM",
    },
  ]);

  const [inputMsg, setInputMsg] = useState("");

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    setMockMessages([
      ...mockMessages,
      { id: Date.now(), from: "agent", text: inputMsg, time: "Now" },
    ]);
    setInputMsg("");
  };

  const [activeTab, setActiveTab] = useState("live");
  const isLive = activeTab === "live";

  const IconMap = {
    "live-unassigned": {
      icon: <FaHandPeace size={22} className="text-yellow-500" />,
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50 text-center ">
          You have no unassigned conversations at the moment.
        </p>
      ),
    },
    "live-myopen": {
      icon: <MessageSquare size={22} className="text-blue-600" />,
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50 text-center">
          You have no unassigned conversations at the moment.
        </p>
      ),
    },
    "live-solved": {
      icon: <CheckCircle size={22} className="text-green-500" />,
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50 text-center">
          You have no unassigned conversations at the moment.
        </p>
      ),
    },

    "ticket-unassigned": {
      icon: <Ticket size={22} className="text-yellow-500" />,
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50 text-center">
          You have no unassigned conversations at the moment.
        </p>
      ),
    },
    "ticket-myopen": {
      icon: <MessageSquare size={22} className="text-blue-600" />,
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50 text-center">
          You have no solved tickets at the moment.
        </p>
      ),
    },
    "ticket-solved": {
      icon: <CheckCircle size={22} className="text-green-500" />,
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50 text-center">
          You have no solved tickets at the moment.
        </p>
      ),
    },

    "@mention": {
      button: (
        <div className="p-4  space-y-3">
          {/* TABS HEADER */}
          <div className="  flex gap-6">
            <button
              onClick={() => setActiveTab("live")}
              className={` font-medium text-sm transition-all ${
                isLive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }
                      `}
            >
              Live Conversation
            </button>

            <button
              onClick={() => setActiveTab("tickets")}
              className={` font-medium text-sm transition-all
                        ${
                          !isLive
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }
                             `}
            >
              Tickets
            </button>
          </div>
        </div>
      ),
    },

    aiagent: {
      icon: <Bot size={26} className="text-blue-500" />,
      desc: (
        <>
          <div className="text-center">
            {isLive ? (
              <p className="flex items-center justify-center m-5 md:mt-50 text-center">
                ACTIVE AGENT LIST
              </p>
            ) : (
              <p className="flex items-center justify-center m-5 md:mt-50 text-center">
                No tickets at the moment. Bot is not enabled for this channel
              </p>
            )}
          </div>
        </>
      ),
      button: (
        <div className="p-4  space-y-3">
          {/* TABS HEADER */}
          <div className="  flex gap-6">
            <button
              onClick={() => setActiveTab("live")}
              className={` font-medium text-sm transition-all ${
                isLive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }
                      `}
            >
              Live Conversation
            </button>

            <button
              onClick={() => setActiveTab("tickets")}
              className={` font-medium text-sm transition-all
                        ${
                          !isLive
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }
                             `}
            >
              Tickets
            </button>
          </div>
        </div>
      ),
    },

    instagram: {
      icon: (
        <Instagram
          size={22}
          className="text-white bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] p-1 rounded-md"
        />
      ),
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50  text-center">
          {" "}
          No active conversations at the moment.{" "}
        </p>
      ),
      menuIcon: <EllipsisVertical size={22} className="cursor-pointer" />,
    },

    messanger: {
      icon: (
        <FaFacebookMessenger
          size={22}
          className="text-white bg-blue-500 p-1 rounded-md"
        />
      ),
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50 text-center">
          {" "}
          No active conversations at the moment.{" "}
        </p>
      ),
      menuIcon: <EllipsisVertical size={22} className="cursor-pointer" />,
    },

    whatsapp: {
      icon: (
        <FaWhatsapp
          size={22}
          className="text-white bg-green-600 p-1 rounded-md"
        />
      ),
      desc: (
        <p className="flex items-center justify-center m-5 md:mt-50 text-center">
          No active conversations at the moment.
        </p>
      ),

      menuIcon: <EllipsisVertical size={22} className="cursor-pointer" />,
    },

    "all agents": {
      icon: <Users size={22} className="text-purple-600" />,
      button: (
        <div className="p-4  space-y-3">
          {/* TABS HEADER */}
          <div className="  flex gap-6">
            <button
              onClick={() => setActiveTab("live")}
              className={` font-medium text-sm transition-all ${
                isLive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }
                      `}
            >
              Live Conversation
            </button>

            <button
              onClick={() => setActiveTab("tickets")}
              className={` font-medium text-sm transition-all
                        ${
                          !isLive
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }
                             `}
            >
              Tickets
            </button>
          </div>
        </div>
      ),
    },
  };

  const renderContent = () => {
    switch (activePage) {
      case "live-unassigned":
        return (
          <>
            <div className="w-full h-full p-10 flex flex-col">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900">
                No active conversations
              </h2>

              {/* Description */}
              <p className="mt-3 text-gray-600 max-w-md">
                Before starting a real conversation with your visitors, simulate
                one to see how things work!
              </p>

              {/* CTA Button */}
              <button className=" bg-blue-600 text-white font-medium px-6 py-2.5  rounded-lg shadow-md mt-6 w-fit hover:bg-blue-700 active:scale-95 transition-all">
                Simulate a conversation
              </button>

              {/* Integrations Section */}
              <div className="mt-12">
                <p className="text-gray-700 font-medium">
                  You can also integrate Chatbot with other apps to keep
                  everything in one place!
                </p>

                {/* Grid for apps */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-5 mt-6 w-full">
                  {/* Whatsapp Integration */}
                  <div className=" border border-gray-200 rounded-xl p-5 w-full md:w-70 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                    <div className="rounded-xl bg-green-500 flex items-center justify-center shadow-md">
                      <FaWhatsapp size={26} className="text-white" />
                    </div>

                    <h4 className="font-semibold text-gray-900">Whatsapp</h4>

                    <p className="text-sm text-gray-500">
                      Integrate with Whatsapp and stay connected with your
                      customers.
                    </p>

                    <Link
                      to="#"
                      className="text-blue-600 text-sm font-medium group-hover:underline"
                    >
                      Integrate →
                    </Link>
                  </div>

                  {/* Instagram Integration */}
                  <div className=" border border-gray-200 rounded-xl p-4 w-full md:w-70 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                    <div className="rounded-xl bg-gradient-to-br  from-[#feda75] via-[#d62976] to-[#4f5bd5] flex items-center justify-center shadow-md">
                      <Instagram size={26} className="text-white" />
                    </div>

                    <h4 className="font-semibold text-gray-900">Instagram</h4>

                    <p className="text-sm text-gray-500">
                      Keep in touch with your Instagram customers.
                    </p>

                    <Link
                      to="#"
                      className="text-blue-600 text-sm font-medium group-hover:underline"
                    >
                      Integrate →
                    </Link>
                  </div>

                  {/* Facebook Messenger Integration */}
                  <div className=" border border-gray-200 rounded-xl p-4 w-full md:w-70 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                    <div className="rounded-xl bg-gradient-to-br  from-[#feda75] via-[#d62976] to-[#4f5bd5] flex items-center justify-center shadow-md">
                      <FaFacebookMessenger size={26} className="text-white" />
                    </div>

                    <h4 className="font-semibold text-gray-900">
                      Facebook Messenger
                    </h4>

                    <p className="text-sm text-gray-500">
                      Do it now and start responding to queries from Messenger.
                    </p>

                    <Link
                      to="#"
                      className="text-blue-600 text-sm font-medium group-hover:underline"
                    >
                      Integrate →
                    </Link>
                  </div>

                  {/* ChatWidget Integration */}
                  <div className=" border border-gray-200 rounded-xl p-4 w-full md:w-70 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                    <div className="rounded-xl bg-blue-300 flex items-center justify-center shadow-md">
                      <MessageCircleMore size={26} className="text-blue-300" />
                    </div>

                    <h4 className="font-semibold text-gray-900">Chat Widget</h4>

                    <p className="text-sm text-gray-500">
                      Install widget and stay support your customers on your
                      websites.
                    </p>

                    <Link
                      to="#"
                      className="text-blue-600 text-sm font-medium group-hover:underline"
                    >
                      Install Chat Widget →
                    </Link>
                  </div>

                  {/* Email Integration */}
                  <div className=" border border-gray-200 rounded-xl p-4 w-full md:w-70 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                    <div className="rounded-xl bg-blue-800 flex items-center justify-center shadow-md p-0.5">
                      <Mail size={26} className="text-white" />
                    </div>

                    <h4 className="font-semibold text-gray-900">Email</h4>

                    <p className="text-sm text-gray-500">
                      Connect your mailbox and recieve and send email from the
                      app.
                    </p>

                    <Link
                      to="#"
                      className="text-blue-600 text-sm font-medium group-hover:underline"
                    >
                      Add Email →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "live-myopen":
        return <InboxConversation />;

      case "live-solved":
        return (
          <div className="flex h-full">
            <EmptyState title="No solved conversations yet" />
          </div>
        );

      case "ticket-unassigned":
        return (
          <div className="flex h-full">
            <EmptyState title="Select something from sidebar" />
          </div>
        );

      case "ticket-myopen":
        return (
          <div className="flex h-full">
            <EmptyState title="Select something from sidebar" />
          </div>
        );

      case "ticket-solved":
        return (
          <div className="flex h-full">
            <EmptyState title="Select something from sidebar" />
          </div>
        );

      case "@mention":
        return (
          <div className="flex-1  h-full">
            {isLive ? (
              /* Live Conversation UI */
              <div className="w-full h-full p-10 flex-1 flex flex-col items-center justify-center text-center gap-2 ">
                <h3 className="text-xl font-semibold text-gray-800">
                  No mentions here!
                </h3>
              </div>
            ) : (
              <div className="w-full h-full p-10 flex-1 flex flex-col items-center justify-center text-center gap-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  No mentions here!
                </h3>
              </div>
            )}
          </div>
        );

      case "aiagent":
        return (
          <div className="flex-1">
            {isLive ? (
              <div className="w-full h-full p-10 flex flex-col">ChatScreen</div>
            ) : (
              <EmptyState title="Select something from sidebar" />
            )}
          </div>
        );

      case "instagram":
        return (
          <>
            <div className="w-full h-full p-10 flex flex-col">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900">
                No active conversations
              </h2>

              {/* Description */}
              <p className="mt-3 text-gray-600 max-w-md">
                New conversations from Instagram will appear here automatically.
              </p>

              {/* Integrations Section */}
              <div className="mt-12">
                <p className="text-gray-700 font-medium">
                  Integrate now to handle Instagram conversations directly in
                  your ChatWidget Inbox!
                </p>

                {/* Instagram Integration */}
                <div className=" border border-gray-200 rounded-xl mt-5 p-4 w-full md:w-80 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                  <div className="rounded-xl bg-gradient-to-br  from-[#feda75] via-[#d62976] to-[#4f5bd5] flex items-center justify-center shadow-md">
                    <Instagram size={26} className="text-white" />
                  </div>

                  <h4 className="font-semibold text-gray-900">Instagram</h4>

                  <p className="text-sm text-gray-500">
                    Keep in touch with your Instagram customers.
                  </p>

                  <Link
                    to="#"
                    className="text-blue-600 text-sm font-medium group-hover:underline"
                  >
                    Integrate →
                  </Link>
                </div>
              </div>
            </div>
          </>
        );

      case "messanger":
        return (
          <>
            <div className="w-full h-full p-10 flex flex-col">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900">
                No active conversations
              </h2>

              {/* Description */}
              <p className="mt-3 text-gray-600 max-w-md">
                New conversations from Messenger will appear here automatically.
              </p>

              {/* Integrations Section */}
              <div className="mt-12">
                <p className="text-gray-700 font-medium">
                  Integrate now to handle Messenger conversations directly in
                  your Tidio Inbox!
                </p>

                {/* Whatsapp Integration */}
                <div className=" border border-gray-200 rounded-xl mt-5 p-5 w-full md:w-80 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                  <div className="rounded-xl bg-gradient-to-br  from-[#feda75] via-[#d62976] to-[#4f5bd5] flex items-center justify-center shadow-md">
                    <FaFacebookMessenger size={26} className="text-white" />
                  </div>

                  <h4 className="font-semibold text-gray-900">Messenger</h4>

                  <p className="text-sm text-gray-500">
                    Integrate with Messenger and stay connected with your
                    customers.
                  </p>

                  <Link
                    to="#"
                    className="text-blue-600 text-sm font-medium group-hover:underline"
                  >
                    Integrate →
                  </Link>
                </div>
              </div>
            </div>
          </>
        );

      case "whatsapp":
        return (
          <>
            <div className="w-full h-full p-10 flex flex-col">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900">
                No active conversations
              </h2>

              {/* Description */}
              <p className="mt-3 text-gray-600 max-w-md">
                New conversations from Whatsapp will appear here automatically.
              </p>

              {/* Integrations Section */}
              <div className="mt-12">
                <p className="text-gray-700 font-medium">
                  Integrate now to handle Whatsapp conversations directly in
                  your ChatWidget Inbox!
                </p>

                {/* whatsapp Integration */}
                <div className=" border border-gray-200 rounded-xl mt-5 p-4 w-full md:w-80 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                  <div className="rounded-xl bg-green-500 flex items-center justify-center shadow-md">
                    <FaWhatsapp size={26} className="text-white" />
                  </div>

                  <h4 className="font-semibold text-gray-900">Whatsapp</h4>

                  <p className="text-sm text-gray-500">
                    Keep in touch with your Whatsapp customers.
                  </p>

                  <Link
                    to="#"
                    className="text-blue-600 text-sm font-medium group-hover:underline"
                  >
                    Integrate →
                  </Link>
                </div>
              </div>
            </div>
          </>
        );

      case "all agents":
        return (
          <div className="flex flex-col w-full h-full bg-white text-gray-700">
            <div className="flex-1">
              {isLive ? (
                /* Live Conversation UI */
                <div className="w-full h-full p-10 flex flex-col">
                  {/* Title */}
                  <h2 className="text-2xl font-semibold text-gray-900">
                    No active conversations
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-gray-600 max-w-md">
                    Before starting a real conversation with your visitors,
                    simulate one to see how things work!
                  </p>

                  {/* CTA Button */}
                  <button className=" bg-blue-600 text-white font-medium px-6 py-2.5  rounded-lg shadow-md mt-6 w-fit hover:bg-blue-700 active:scale-95 transition-all">
                    Simulate a conversation
                  </button>

                  {/* Integrations Section */}
                  <div className="mt-12">
                    <p className="text-gray-700 font-medium">
                      You can also integrate Chatbot with other apps to keep
                      everything in one place!
                    </p>

                    {/* Grid for apps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 w-full">
                      {/* Whatsapp Integration */}
                      <div className=" border border-gray-200 rounded-xl p-5 w-80 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                        <div className="rounded-xl bg-green-500 flex items-center justify-center shadow-md">
                          <FaWhatsapp size={26} className="text-white" />
                        </div>

                        <h4 className="font-semibold text-gray-900">
                          Whatsapp
                        </h4>

                        <p className="text-sm text-gray-500">
                          Integrate with Whatsapp and stay connected with your
                          customers.
                        </p>

                        <Link
                          to="#"
                          className="text-blue-600 text-sm font-medium group-hover:underline"
                        >
                          Integrate →
                        </Link>
                      </div>

                      {/* Instagram Integration */}
                      <div className=" border border-gray-200 rounded-xl p-4 w-80 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                        <div className="rounded-xl bg-gradient-to-br  from-[#feda75] via-[#d62976] to-[#4f5bd5] flex items-center justify-center shadow-md">
                          <Instagram size={26} className="text-white" />
                        </div>

                        <h4 className="font-semibold text-gray-900">
                          Instagram
                        </h4>

                        <p className="text-sm text-gray-500">
                          Keep in touch with your Instagram customers.
                        </p>

                        <Link
                          to="#"
                          className="text-blue-600 text-sm font-medium group-hover:underline"
                        >
                          Integrate →
                        </Link>
                      </div>

                      {/* Facebook Messenger Integration */}
                      <div className=" border border-gray-200 rounded-xl p-4 w-80 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                        <div className="rounded-xl bg-gradient-to-br  from-[#feda75] via-[#d62976] to-[#4f5bd5] flex items-center justify-center shadow-md">
                          <FaFacebookMessenger
                            size={26}
                            className="text-white"
                          />
                        </div>

                        <h4 className="font-semibold text-gray-900">
                          Facebook Messenger
                        </h4>

                        <p className="text-sm text-gray-500">
                          Do it now and start responding to queries from
                          Messenger.
                        </p>

                        <Link
                          to="#"
                          className="text-blue-600 text-sm font-medium group-hover:underline"
                        >
                          Integrate →
                        </Link>
                      </div>

                      {/* ChatWidget Integration */}
                      <div className=" border border-gray-200 rounded-xl p-4 w-80 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                        <div className="rounded-xl bg-blue-300 flex items-center justify-center shadow-md">
                          <MessageCircleMore
                            size={26}
                            className="text-blue-300"
                          />
                        </div>

                        <h4 className="font-semibold text-gray-900">
                          Chat Widget
                        </h4>

                        <p className="text-sm text-gray-500">
                          Install widget and stay support your customers on your
                          websites.
                        </p>

                        <Link
                          to="#"
                          className="text-blue-600 text-sm font-medium group-hover:underline"
                        >
                          Install Chat Widget →
                        </Link>
                      </div>

                      {/* Email Integration */}
                      <div className=" border border-gray-200 rounded-xl p-4 w-80 shadow-xs  hover:shadow-sm hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-start gap-3 ">
                        <div className="rounded-xl bg-blue-800 flex items-center justify-center shadow-md p-0.5">
                          <Mail size={26} className="text-white" />
                        </div>

                        <h4 className="font-semibold text-gray-900">Email</h4>

                        <p className="text-sm text-gray-500">
                          Connect your mailbox and recieve and send email from
                          the app.
                        </p>

                        <Link
                          to="#"
                          className="text-blue-600 text-sm font-medium group-hover:underline"
                        >
                          Add Email →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState title="Select something from sidebar" />
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex h-full">
            <div className="w-90 flex flex-col">
              <div className="p-4 border-b space-y-3">
                <h2 className="text-xl font-semibold capitalize">
                  {activePage?.replace("-", " ")}
                </h2>
              </div>

              <div className="text-center">
                <p className="flex items-center justify-center mt-50">
                  You have no unassigned conversations at the moment.{" "}
                </p>
              </div>
            </div>
            <EmptyState title="Select something from sidebar" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap  w-full h-full bg-white text-gray-700">
      {/* LEFT PANEL */}
      {/* <div className="w-70 border-r flex flex-col"> */}
      <div className="w-full md:w-70  border-b md:border-b-0 md:border-r flex-shrink-0 flex flex-col">
        {/* HEADER  */}
        <div className="p-4 border-b text-xl font-semibold text-gray-800 flex flex-col ">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 capitalize">
              {IconMap[activePage]?.icon}
              {activePage.replace("-", " ")}
            </div>

            {/* Ellipsis (channels only) */}
            {IconMap[activePage]?.menuIcon && (
              <button className="hover:bg-gray-100 p-1 rounded-md transition">
                {IconMap[activePage].menuIcon}
              </button>
            )}
          </div>
          {IconMap[activePage]?.button && IconMap[activePage].button}
        </div>

        {/* DESC (if exists) */}
        {IconMap[activePage]?.desc && (
          <div className=" items-center justify-center px-3 text-center text-md text-gray-600">
            {IconMap[activePage].desc}
          </div>
        )}
      </div>

      {/* RIGHT PANEL / PAGE CONTENT */}
      <div className="w-full h-full overflow-auto  lg:overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}

function EmptyState({ title }) {
  return (
    <div className="w-full h-full p-10 flex-1 flex flex-col items-center justify-center text-center gap-2">
      <h3 className="text-xl font-semibold text-gray-800">
        Manage all messages from ChatWidget.
      </h3>
      <p className="text-gray-500 text-sm ">
        We will automatically create a ticket for every email received in the
        connected mailbox.
      </p>
      <button className="text-white text-md bg-blue-600 hover:bg-blue-800 p-2 rounded-xl mt-2">
        Connect Mialbox{" "}
      </button>
    </div>
  );
}

function ChatScreen({ messages, inputMsg, setInputMsg, sendMessage }) {
  return (
    <div className="flex flex-col h-full">
      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${msg.from === "agent" ? "text-right" : "text-left"}`}
          >
            <span
              className={`px-4 py-2 inline-block rounded-2xl shadow-sm ${
                msg.from === "agent" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {msg.text}
            </span>
            <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="border-t p-4 flex items-center gap-2">
        <input
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-700 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
