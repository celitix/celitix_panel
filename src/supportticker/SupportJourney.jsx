import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import {
    FiClock, FiSend, FiInbox, FiRefreshCw,
    FiMessageSquare, FiPaperclip, FiDownload, FiFile, FiCheckCircle,
    FiSearch
} from "react-icons/fi";
import { getLocalTickets, saveTicketLocal } from "./utils/ticketStore";
import toast from "react-hot-toast";

const SupportJourney = ({ userData }) => {
    const [tickets, setTickets] = useState([]);
    const [activeTicket, setActiveTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const chatContainerRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSidebar, setShowSidebar] = useState(true);


    const FD_DOMAIN = import.meta.env.VITE_FRESHDESK_DOMAIN;
    const FD_API_KEY = import.meta.env.VITE_FRESHDESK_API_KEY;
    const AUTH = { Authorization: `Basic ${btoa(FD_API_KEY + ":X")}` };

    // 1. SYNC TICKETS (Fix for 404/Validation Error)
    const syncWithFreshdesk = useCallback(async () => {
        if (!userData?.email) return;
        setSyncing(true);
        try {
            // FIX: Correct Freshdesk Query Syntax using single quotes inside double quotes
            // const query = `email:'${userData.email}'`;
            const query = `custom_string:'${userData?.userId}'`;
            const res = await axios.get(
                `https://${FD_DOMAIN}.freshdesk.com/api/v2/search/tickets?query="${query}"`,
                { headers: AUTH }
            );

            const remoteTickets = res.data.results || [];
            for (const ticket of remoteTickets) {
                await saveTicketLocal(ticket);
            }
            setTickets(remoteTickets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } catch (error) {
            console.error("Sync Error:", error);
            const local = await getLocalTickets();
            setTickets(local.filter(t => t.custom_fields?.cf_userid === userData.userId));
        } finally {
            setSyncing(false);
        }
    }, [userData, FD_DOMAIN]);

    useEffect(() => { syncWithFreshdesk(); }, [syncWithFreshdesk]);

    // API: Get Full Ticket Details + Conversations
    const loadThread = async (ticket) => {
        setLoading(true);
        if (window.innerWidth < 768) setShowSidebar(false);
        try {
            // 1. Fetch Latest Ticket Status (to check if it was closed in Freshdesk)
            const ticketRes = await axios.get(`https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${ticket.id}`, { headers: AUTH });
            const latestTicket = ticketRes.data;
            setActiveTicket(latestTicket);

            // Sync IndexedDB with latest status from Freshdesk
            await saveTicketLocal(latestTicket);

            // 2. Fetch Conversations (Replies)
            const convRes = await axios.get(`https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${ticket.id}/conversations`, { headers: AUTH });

            // 3. Construct Unified Thread
            const initialMsg = {
                body: latestTicket.description,
                created_at: latestTicket.created_at,
                // incoming: true, // For the User, their own initial message is "their" message
                // isOriginal: true,
                isTicketRoot: true,
                attachments: latestTicket.attachments || []
            };

            // Freshdesk "incoming" logic in Conversations:
            // incoming: true means the User replied via Email/Portal
            // incoming: false means the Agent replied via Freshdesk
            setMessages([initialMsg, ...convRes.data]);
        } catch (e) {
            toast.error("Error syncing with Freshdesk server");
        } finally {
            setLoading(false);
        }
    };

    // API: Add Note (User Reply)
    const sendReply = async () => {
        if (!reply.trim()) return;

        if (!activeTicket || !activeTicket.requester_id) {
            toast.error("User identification failed. Please refresh.");
            return;
        }
        try {
            const payload = {
                body: reply,
                private: false, // public note = reply visible to support agents
                // DYNAMIC: Take the ID directly from the ticket data returned by Freshdesk
                user_id: activeTicket.requester_id
            };// Public note = Reply
            await axios.post(`https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${activeTicket.id}/notes`,
                payload,
                { headers: { ...AUTH, 'Content-Type': 'application/json' } }
            );
            toast.success("Reply sent to support team");
            setReply("");
            loadThread(activeTicket);
        } catch (e) {
            toast.error("Failed to post reply");
        }
    };

    // API: Update Ticket (Close Ticket)
    const handleCloseTicket = async () => {
        setActionLoading(true);
        try {
            // Freshdesk status 5 = Closed
            await axios.put(`https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${activeTicket.id}`,
                { status: 5 },
                { headers: { ...AUTH, 'Content-Type': 'application/json' } }
            );
            toast.success("Ticket marked as resolved");
            loadThread(activeTicket);
        } catch (e) {
            toast.error("Failed to close ticket");
        } finally {
            setActionLoading(false);
        }
    };

    const renderAttachments = (files) => {
        if (!files || files.length === 0) return null;
        return (
            <div className="mt-3 flex flex-wrap gap-2 border-t pt-2 border-gray-100/20">
                {files.map((file) => (
                    <a key={file.id} href={file.attachment_url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 p-2 bg-black/5 hover:bg-black/10 rounded-lg transition-all group">
                        <FiFile size={14} />
                        <span className="text-[10px] font-bold truncate max-w-[120px]">{file.name}</span>
                        <FiDownload size={12} className="opacity-50" />
                    </a>
                ))}
            </div>
        );
    };


    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const filteredTickets = tickets.filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex h-[91vh] bg-[#f8fafc] gap-4  antialiased overflow-hidden rounded-3xl">
            {/* TICKET LIST SIDEBAR */}
            <aside className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[380px] bg-white rounded-[1.2rem] border border-slate-200 shadow-sm overflow-hidden transition-all duration-300`}>
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                        <FiInbox className="text-blue-600" /> My Tickets
                    </h2>
                    <button onClick={syncWithFreshdesk} className={`p-2 rounded-xl transition-all ${syncing ? 'bg-blue-50' : 'hover:bg-gray-100'}`}>
                        <FiRefreshCw size={16} className={`${syncing ? 'animate-spin text-blue-500' : 'text-gray-400'}`} />
                    </button>
                </div>
                <div className="overflow-y-auto flex-grow custom-scrollbar p-2 space-y-2">
                    {tickets.map(t => (
                        <div key={t.id} onClick={() => loadThread(t)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all border ${activeTicket?.id === t.id ? 'bg-white border-blue-600 text-gray-900 shadow-lg shadow-blue-100' : 'bg-white border-transparent hover:border-gray-200'}`}>
                            <div className="flex justify-between items-center mb-1">
                                <span className={`text-[10px] font-bold uppercase tracking-wide ${activeTicket?.id === t.id ? 'text-blue-700' : 'text-gray-400'}`}>#{t.id}</span>
                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${activeTicket?.id === t.id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                                    {t.status === 5 ? 'Closed' : 'Active'}
                                </span>
                            </div>
                            <p className="text-sm font-bold truncate">{t.subject}</p>
                            <span className={`text-[10px] ${activeTicket?.id === t.id ? 'text-blue-800' : 'text-gray-400'}`}>{moment(t.created_at).fromNow()}</span>
                        </div>
                    ))}
                </div>
            </aside>


            {/* CONVERSATION AREA */}
            <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
                {activeTicket ? (
                    <>
                        {/* Header */}
                        <div className="p-5 border-b bg-white flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-bold"><FiMessageSquare /></div>
                                <div>
                                    <h2 className="font-bold text-gray-800 tracking-tight">{activeTicket.subject}</h2>
                                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                        <span className="flex items-center gap-1"><FiClock size={12} /> {moment(activeTicket.created_at).format('ll')}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="font-bold text-blue-600 uppercase">Priority: {activeTicket.priority === 4 ? 'Urgent' : 'Standard'}</span>
                                    </div>
                                </div>
                            </div>
                            {/* {activeTicket.status !== 5 && (
                                <button
                                    onClick={handleCloseTicket}
                                    disabled={actionLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-bold hover:bg-green-100 transition-all"
                                >
                                    <FiCheckCircle /> {actionLoading ? "Processing..." : "Mark as Resolved"}
                                </button>
                            )} */}
                        </div>

                        {/* Thread */}
                        <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto bg-[#F9FBFF] space-y-6 custom-scrollbar">
                            {messages.map((m, i) => {
                                /**
                                 * INDUSTRY LOGIC:
                                 * isAgent is FALSE if:
                                 * 1. It's the root ticket (isTicketRoot).
                                 * 2. incoming is true (User replied via email).
                                 * 3. incoming is false but source is 2 (User replied via your CPaaS Panel).
                                 */
                                const isAgent = !(m.isTicketRoot || m.incoming === true || (m.incoming === false && m.source === 2));

                                return (
                                    <div key={i} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[80%] ${isAgent ? '' : 'items-end flex flex-col'}`}>

                                            {/* Professional UI for the start of the journey */}
                                            {m.isTicketRoot && (
                                                <div className="mb-4 text-center w-full">
                                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-blue-200">
                                                        Ticket Discussion Started
                                                    </span>
                                                </div>
                                            )}

                                            <div className={`p-5 rounded-2xl shadow-sm ${isAgent
                                                ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                                                : 'bg-gray-100 text-gray-900 rounded-tr-none shadow-blue-100'
                                                }`}>

                                                {/* Header: Sender Label & Time */}
                                                <div className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex justify-between gap-10 ${isAgent ? 'text-blue-500' : 'text-gray-900'
                                                    }`}>
                                                    <span>{isAgent ? 'Support Team' : 'My Question/Reply'}</span>
                                                    <span className="opacity-60">{moment(m.created_at).format('hh:mm A')}</span>
                                                </div>

                                                {/* Special Subject Display for the first message */}
                                                {m.isTicketRoot && (
                                                    <h4 className="text-sm font-black mb-2 border-b border-blue-400/30 pb-1 italic">
                                                        Subject: {m.subject}
                                                    </h4>
                                                )}

                                                {/* Message Content */}
                                                <div
                                                    className="text-[14px] leading-relaxed prose prose-sm max-w-none break-words"
                                                    dangerouslySetInnerHTML={{ __html: m.body }}
                                                />

                                                {/* Attachment Grid */}
                                                {renderAttachments(m.attachments)}
                                            </div>

                                            {/* Bottom Timestamp */}
                                            <span className="text-[9px] text-gray-400 mt-1.5 px-1">
                                                {moment(m.created_at).calendar()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* User Reply Box */}
                        <div className="p-5 bg-white border-t border-gray-200">
                            {activeTicket.status === 5 ? (
                                <div className="text-center p-3 bg-gray-50 rounded-2xl text-gray-400 text-xs font-medium border border-dashed">
                                    This ticket is resolved. If you have more questions, please create a new ticket.
                                </div>
                            ) : (
                                <div className="relative">
                                    <textarea
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        // placeholder="Update our support team on your issue..."
                                        placeholder="Update our support team on your issue in detail..."
                                        className="w-full pl-5 pr-14 py-4 bg-gray-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all border  focus:border-blue-500 min-h-[100px] max-h-[200px] border-gray-200"
                                    />
                                    <button
                                        onClick={sendReply}
                                        disabled={!reply.trim()}
                                        className="absolute right-2 bottom-4 p-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 transition-all shadow-lg shadow-blue-100"
                                    >
                                        <FiSend size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-300">
                        <div className="p-8 bg-gray-50 rounded-full mb-4">
                            <FiMessageSquare size={60} className="text-gray-200" />
                        </div>
                        <h3 className="text-gray-900 font-bold text-lg">Your Support History</h3>
                        <p className="text-sm text-gray-400 text-center max-w-[280px] mt-1">Select an active or past ticket from the sidebar to view detailed conversation logs.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportJourney;