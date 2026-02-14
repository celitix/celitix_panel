import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import {
  FiClock, FiSend, FiInbox, FiRefreshCw,
  FiMessageSquare, FiPaperclip, FiDownload, FiFile, FiCheckCircle, FiChevronLeft, FiSearch, FiLifeBuoy
} from "react-icons/fi";
import { getLocalTickets, saveTicketLocal } from "./utils/ticketStore";
import toast from "react-hot-toast";

const SupportJourney = ({ userData }) => {
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(true); // Mobile toggle
  const chatContainerRef = useRef(null);

  const FD_DOMAIN = import.meta.env.VITE_FRESHDESK_DOMAIN;
  const FD_API_KEY = import.meta.env.VITE_FRESHDESK_API_KEY;
  const AUTH = { Authorization: `Basic ${btoa(FD_API_KEY + ":X")}` };

  const syncWithFreshdesk = useCallback(async () => {
    if (!userData?.email) return;
    setSyncing(true);
    try {
      const query = `custom_string:'${userData?.userId}'`;
      const res = await axios.get(
        `https://${FD_DOMAIN}.freshdesk.com/api/v2/search/tickets?query="${query}"`,
        { headers: AUTH }
      );
      const remoteTickets = res.data.results || [];
      for (const ticket of remoteTickets) { await saveTicketLocal(ticket); }
      setTickets(remoteTickets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      const local = await getLocalTickets();
      setTickets(local.filter(t => t.custom_fields?.cf_userid === userData.userId));
    } finally { setSyncing(false); }
  }, [userData, FD_DOMAIN]);

  useEffect(() => { syncWithFreshdesk(); }, [syncWithFreshdesk]);

  const loadThread = async (ticket) => {
    setActiveTicket(ticket);
    if (window.innerWidth < 768) setShowSidebar(false); // Auto-hide sidebar on mobile
    try {
      const ticketRes = await axios.get(`https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${ticket.id}`, { headers: AUTH });
      const convRes = await axios.get(`https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${ticket.id}/conversations`, { headers: AUTH });

      const initialMsg = {
        body: ticketRes.data.description,
        created_at: ticketRes.data.created_at,
        isTicketRoot: true,
        attachments: ticketRes.data.attachments || []
      };
      setMessages([initialMsg, ...convRes.data]);
    } catch (e) { toast.error("Connection failed"); }
  };

  const sendReply = async () => {
    if (!reply.trim()) return;
    try {
      const payload = { body: reply, private: false, user_id: activeTicket.requester_id };
      await axios.post(`https://${FD_DOMAIN}.freshdesk.com/api/v2/tickets/${activeTicket.id}/notes`,
        payload, { headers: { ...AUTH, 'Content-Type': 'application/json' } }
      );
      setReply("");
      loadThread(activeTicket);
      toast.success("Message sent");
    } catch (e) { toast.error("Failed to reply"); }
  };

  const filteredTickets = tickets.filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-[92vh] bg-[#f8fafc] p-2 md:p-4 gap-4 font-sans antialiased overflow-hidden">

      {/* SIDEBAR: Ticket List */}
      <aside className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[380px] bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden transition-all duration-300`}>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Support Hub</h2>
              <p className="text-xs text-slate-400">Track your active resolutions</p>
            </div>
            <button onClick={syncWithFreshdesk} className={`p-2.5 rounded-xl transition-all ${syncing ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:text-indigo-600'}`}>
              <FiRefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-2 custom-scrollbar">
          {filteredTickets.length > 0 ? (
            filteredTickets.map(t => (
              <div key={t.id} onClick={() => loadThread(t)}
                className={`group p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${activeTicket?.id === t.id ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-100' : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTicket?.id === t.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    #{t.id}
                  </span>
                  <div className={`h-2 w-2 rounded-full ${t.status === 5 ? 'bg-slate-300' : 'bg-emerald-400 animate-pulse'}`} />
                </div>
                <h4 className={`text-sm font-semibold truncate mb-1 ${activeTicket?.id === t.id ? 'text-white' : 'text-slate-700'}`}>{t.subject}</h4>
                <div className={`flex items-center gap-2 text-[10px] ${activeTicket?.id === t.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                  <FiClock size={12} />
                  <span>{moment(t.created_at).fromNow()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                <FiInbox size={24} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-500">No tickets found</p>
              <p className="text-xs text-slate-400 mt-1">Try syncing or changing search</p>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT: Chat Area */}
      <main className={`${!showSidebar ? 'flex' : 'hidden'} md:flex flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col overflow-hidden`}>
        {activeTicket ? (
          <>
            {/* Header */}
            <header className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                <button onClick={() => setShowSidebar(true)} className="md:hidden p-2 text-slate-400">
                  <FiChevronLeft size={24} />
                </button>
                <div className="hidden sm:flex h-12 w-12 bg-indigo-50 rounded-2xl items-center justify-center text-indigo-600">
                  <FiMessageSquare size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 leading-tight truncate max-w-[200px] md:max-w-md">{activeTicket.subject}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Status: <span className={activeTicket.status === 5 ? 'text-slate-500' : 'text-emerald-500'}>{activeTicket.status === 5 ? 'Resolved' : 'In Progress'}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full border border-amber-100 uppercase">
                  {activeTicket.priority === 4 ? 'High Priority' : 'Normal Priority'}
                </span>
              </div>
            </header>

            {/* Messages Thread */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto bg-[#fafbfc] p-4 md:p-8 space-y-8 custom-scrollbar">
              {messages.map((m, i) => {
                const isAgent = !(m.isTicketRoot || m.incoming === true || (m.incoming === false && m.source === 2));
                return (
                  <div key={i} className={`flex w-full ${isAgent ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] md:max-w-[70%] ${isAgent ? 'flex gap-3' : 'flex flex-col items-end'}`}>
                      {isAgent && (
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                          ST
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className={`p-4 md:p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${isAgent
                          ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                          : 'bg-indigo-600 text-white rounded-tr-none'}`}>
                          <div dangerouslySetInnerHTML={{ __html: m.body }} className="prose prose-sm max-w-none prose-slate" />

                          {m.attachments?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-100/20">
                              {m.attachments.map(file => (
                                <a key={file.id} href={file.attachment_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-lg text-[11px] font-medium transition-all">
                                  <FiFile size={12} /> <span className="truncate max-w-[100px]">{file.name}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className={`flex items-center gap-2 px-2 text-[10px] font-medium ${isAgent ? 'text-slate-400' : 'text-indigo-400 justify-end'}`}>
                          <span>{isAgent ? 'Support Agent' : 'You'}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span>{moment(m.created_at).format('hh:mm A')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Footer */}
            <footer className="p-4 md:p-6 bg-white border-t border-slate-50">
              {activeTicket.status === 5 ? (
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">This ticket has been resolved. Please open a new request for further assistance.</p>
                </div>
              ) : (
                <div className="relative max-w-4xl mx-auto">
                  <textarea
                    rows="2"
                    placeholder="Type your message here..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-[1.5rem] py-4 pl-6 pr-16 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all resize-none"
                  />
                  <button
                    onClick={sendReply}
                    disabled={!reply.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-lg shadow-indigo-100"
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              )}
            </footer>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-indigo-100 rounded-full scale-150 blur-2xl opacity-50" />
              <div className="relative w-32 h-32 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-indigo-600">
                <FiLifeBuoy size={48} className="animate-spin-slow" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Support Journey</h3>
            <p className="text-slate-400 text-sm max-w-sm mt-2">
              Select a ticket from the sidebar to view the conversation history or check status updates.
            </p>
            <div className="mt-8 flex gap-3">
              <div className="px-4 py-2 bg-slate-50 rounded-full text-[11px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100">
                24/7 Support Active
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
            `}</style>
    </div>
  );
};

export default SupportJourney;