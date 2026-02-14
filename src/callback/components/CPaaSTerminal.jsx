import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Play, Pause, Database,
    ShieldCheck, Globe, Clock, ChevronRight,
    Download, Filter, AlertTriangle, Code, Copy,
    CheckCircle2, XCircle, Info
} from 'lucide-react';

const CPaaSTerminalLight = () => {
    const [logs, setLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [isLive, setIsLive] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeChannel, setActiveChannel] = useState("ALL");

    // Production-grade mock data stream
    useEffect(() => {
        if (!isLive) return;
        const timer = setInterval(() => {
            const id = Math.random().toString(36).substr(2, 9).toUpperCase();
            const channels = ['SMS', 'WhatsApp', 'RCS'];
            const channel = channels[Math.floor(Math.random() * channels.length)];

            const newLog = {
                id,
                timestamp: new Date().toISOString(),
                channel,
                method: 'POST',
                url: 'https://customer-api.com/webhooks/callback',
                status: Math.random() > 0.15 ? 200 : 401,
                latency: Math.floor(Math.random() * 300) + 'ms',
                headers: {
                    'Authorization': 'Basic YWRtaW46c2VjcmV0',
                    'X-CPaaS-Signature': 'sha256=7af5...',
                    'Content-Type': 'application/json'
                },
                payload: {
                    to: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                    from: "CPaaS_Global",
                    body: `Your OTP is: ${Math.floor(100000 + Math.random() * 900000)}`,
                    messageId: `msg_${id}`
                }
            };
            setLogs(prev => [newLog, ...prev].slice(0, 100));
        }, 2000);
        return () => clearInterval(timer);
    }, [isLive]);

    const filteredLogs = useMemo(() => {
        return logs.filter(log =>
            (activeChannel === "ALL" || log.channel === activeChannel) &&
            (log.id.includes(searchQuery.toUpperCase()) || log.payload.to.includes(searchQuery))
        );
    }, [logs, activeChannel, searchQuery]);

    return (
        <div className="flex h-[85vh] w-full bg-slate-50 text-slate-700 overflow-hidden font-sans border border-slate-200 rounded-xl shadow-sm">
            {/* Sidebar - Callback Configurations */}
            <aside className="w-72 border-r border-slate-200 bg-white flex flex-col">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-tight text-xl">
                        <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                            <Database size={20} />
                        </div>
                        <span>Dummy Console</span>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <p className="px-3 text-[11px] uppercase text-slate-400 font-bold tracking-widest mb-3">Active Endpoints</p>
                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl cursor-pointer shadow-sm group">
                        <div className="text-sm font-semibold text-indigo-700 flex justify-between items-center">
                            Primary Webhook
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <div className="text-[11px] text-indigo-400 truncate mt-1">https://api.yourdomain.com/v1/cb</div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-all group">
                        <div className="text-sm font-medium text-slate-600 group-hover:text-indigo-600">SMS Fallback</div>
                        <div className="text-[11px] text-slate-400">Disabled</div>
                    </div>
                </nav>
            </aside>

            {/* Main Terminal Area */}
            <main className="flex-1 flex flex-col relative bg-white">
                {/* Top Header/Toolbar */}
                <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
                            {['ALL', 'SMS', 'WhatsApp', 'RCS'].map(ch => (
                                <button
                                    key={ch}
                                    onClick={() => setActiveChannel(ch)}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeChannel === ch ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {ch}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                            <input
                                type="text"
                                placeholder="Search logs..."
                                className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className='w-full text-xl font-semibold'>DUMMY LOGS</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsLive(!isLive)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isLive ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-green-50 text-green-600 border border-green-200'}`}
                        >
                            {isLive ? <Pause size={16} /> : <Play size={16} />}
                            {isLive ? 'PAUSE' : 'RESUME'}
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-600"><Download size={18} /></button>
                    </div>
                </header>

                {/* Data Grid */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-slate-50/90 backdrop-blur border-b border-slate-200 text-[11px] uppercase text-slate-400 tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold">Channel</th>
                                <th className="px-6 py-4 font-bold">Event ID</th>
                                <th className="px-6 py-4 font-bold">Destination</th>
                                <th className="px-6 py-4 font-bold text-right">Latency</th>
                                <th className="px-6 py-4 font-bold text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <AnimatePresence>
                                {filteredLogs.map((log) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={log.id}
                                        onClick={() => setSelectedLog(log)}
                                        className={`border-b border-slate-50 hover:bg-indigo-50/30 cursor-pointer transition-colors ${selectedLog?.id === log.id ? 'bg-indigo-50/80' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            {log.status === 200 ?
                                                <span className="flex items-center gap-1.5 text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-lg w-fit border border-green-100">
                                                    <CheckCircle2 size={12} /> 200 OK
                                                </span> :
                                                <span className="flex items-center gap-1.5 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded-lg w-fit border border-red-100">
                                                    <XCircle size={12} /> {log.status}
                                                </span>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-semibold text-slate-700 uppercase text-[11px]">
                                                <span className={`w-2 h-2 rounded-full ${log.channel === 'SMS' ? 'bg-sky-400' : log.channel === 'WhatsApp' ? 'bg-emerald-400' : 'bg-violet-400'}`} />
                                                {log.channel}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 font-mono text-xs">{log.id}</td>
                                        <td className="px-6 py-4 text-slate-900 font-medium">{log.payload.to}</td>
                                        <td className="px-6 py-4 text-slate-400 text-right font-mono text-xs">{log.latency}</td>
                                        <td className="px-6 py-4 text-slate-400 text-right text-xs italic">{new Date(log.timestamp).toLocaleTimeString()}</td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Detail Drawer (Light) */}
            <AnimatePresence>
                {selectedLog && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="w-[500px] bg-white border-l border-slate-200 shadow-2xl flex flex-col z-20"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <Info size={20} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">Payload Inspection</h3>
                                    <p className="text-[11px] text-slate-500 font-mono tracking-tighter uppercase">{selectedLog.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-white rounded-full border border-slate-200 text-slate-400 transition-all">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest"><Globe size={14} /> Destination URL</h4>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded uppercase tracking-tighter">Active Endpoint</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 flex items-center gap-3">
                                    <span className="text-indigo-600 font-bold bg-white px-2 py-1 rounded-md border border-indigo-100">{selectedLog.method}</span>
                                    {selectedLog.url}
                                </div>
                            </section>

                            <section>
                                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"><ShieldCheck size={14} /> Security Headers</h4>
                                <div className="bg-slate-900 p-6 rounded-2xl text-[12px] font-mono leading-relaxed shadow-lg">
                                    {Object.entries(selectedLog.headers).map(([k, v]) => (
                                        <div key={k} className="flex gap-3 mb-1">
                                            <span className="text-indigo-400 min-w-[120px]">{k}:</span>
                                            <span className="text-indigo-100 break-all">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest"><Code size={14} /> JSON Response</h4>
                                    <button className="text-indigo-600 text-[11px] font-bold flex items-center gap-1.5 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-all"><Copy size={13} /> Copy JSON</button>
                                </div>
                                <pre className="bg-white p-6 rounded-2xl border border-slate-200 text-[13px] text-slate-800 font-mono shadow-sm overflow-x-auto ring-4 ring-slate-50">
                                    {JSON.stringify(selectedLog.payload, null, 2)}
                                </pre>
                            </section>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-slate-400 font-bold">Transmission Time</span>
                                <span className="text-sm font-semibold text-slate-700">{selectedLog.latency}</span>
                            </div>
                            <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                                Retry Webhook
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CPaaSTerminalLight;