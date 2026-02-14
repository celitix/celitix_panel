import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import {
    RiWhatsappFill, RiInstagramFill, RiChatSettingsLine,
    RiUserSharedLine, RiSave3Fill, RiInformationLine, RiLoader4Line, RiUserAddLine, RiTeamLine, RiSearchLine
} from "react-icons/ri";

// APIS
import {
    getWhatsappAgentList,
    getRcsAgentList,
    getInstagramAgentList,
    assignWhatsappAgent,
    assignRcsAgent,
    assignInstagramAgent
} from "@/apis/Agent/Agent";
import { getWabaList } from "@/apis/whatsapp/whatsapp.js";
import { fetchAllAgents } from "@/apis/rcs/rcs.js";
import { instaUserList } from "@/apis/instagram/Instagram.js";

// COMPONENTS
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";

// CONTEXT
import { useUser } from "@/context/auth";

const AgentMapping = () => {
    // Tabs & Loading
    const { user } = useUser();
    const allowedServiceIds =
        user?.services?.map((s) => s.service_type_id.toString()) || [];

    // whatsapp 2, rcs,3, instagram 4

    const [activeTab, setActiveTab] = useState("whatsapp"); // 'whatsapp' | 'rcs' | 'instagram'
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isAgentsLoading, setIsAgentsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Data Lists
    const [accounts, setAccounts] = useState([]); // List for the dropdown
    const [agents, setAgents] = useState([]);     // List of agents for the grid
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState("");


    // Selections
    const [selectedAccountId, setSelectedAccountId] = useState("");

    // Configuration for Channels
    const channelConfig = {
        whatsapp: {
            serviceId: "2",
            label: "WhatsApp",
            icon: <RiWhatsappFill className="text-green-500" />,
            fetchAccounts: getWabaList,
            fetchAgents: getWhatsappAgentList,
            saveApi: assignWhatsappAgent,
            idKey: "wabaSrno",
            nameKey: "name",
            payloadKey: "wabaSrNo"
        },
        rcs: {
            serviceId: "3",
            label: "RCS",
            icon: <RiChatSettingsLine className="text-blue-500" />,
            fetchAccounts: fetchAllAgents,
            fetchAgents: getRcsAgentList,
            saveApi: assignRcsAgent,
            idKey: "srno",
            nameKey: "agent_name",
            payloadKey: "rcsAgentMstSrNo"
        },
        instagram: {
            serviceId: "12",
            // serviceId: "3",
            label: "Instagram",
            icon: <RiInstagramFill className="text-pink-500" />,
            fetchAccounts: instaUserList,
            fetchAgents: getInstagramAgentList,
            saveApi: assignInstagramAgent,
            idKey: "instaOffDetailSrNo",
            nameKey: "userName",
            payloadKey: "instaOffSrNo"
        }
    };

    // 1. Fetch Account List when Tab changes
    useEffect(() => {
        const loadAccounts = async () => {
            setIsPageLoading(true);
            setSelectedAccountId(""); // Reset selection
            setAgents([]);
            try {
                const response = await channelConfig[activeTab].fetchAccounts();
                // Normalize response data based on API structure
                const data = activeTab === "instagram" ? response?.data : response;
                setAccounts(data || []);
            } catch (error) {
                toast.error(`Failed to load ${activeTab} accounts`);
            } finally {
                setIsPageLoading(false);
            }
        };
        loadAccounts();
    }, [activeTab]);

    // 2. Fetch Agents when Account is selected
    useEffect(() => {
        if (!selectedAccountId) return;

        const loadAgents = async () => {
            setIsAgentsLoading(true);
            try {
                const res = await channelConfig[activeTab].fetchAgents(selectedAccountId);
                if (res?.success) {
                    setAgents(res.data || []);
                }
            } catch (error) {
                toast.error("Error fetching agent mapping");
            } finally {
                setIsAgentsLoading(false); // Stop skeleton
            }
        };
        loadAgents();
    }, [selectedAccountId, activeTab]);

    // 3. Handle Local Toggle
    const handleToggle = (srNo) => {
        setAgents(prev => prev.map(agent =>
            agent.srNo === srNo ? { ...agent, isAssigned: agent.isAssigned === 1 ? 0 : 1 } : agent
        ));
    };

    // 4. Save Function
    const handleSaveMapping = async () => {
        if (!selectedAccountId) return toast.error("Please select an account first");

        setIsSaving(true);
        const assignedIds = agents.filter(a => a.isAssigned === 1).map(a => a.srNo);

        const payload = {
            [channelConfig[activeTab].payloadKey]: selectedAccountId,
            agentSrNoList: assignedIds
        };

        try {
            const res = await channelConfig[activeTab].saveApi(payload);
            if (res?.success || res?.status === "success") {
                toast.success("Agent assignments updated successfully!");
            }
        } catch (error) {
            toast.error("Failed to save assignments");
        } finally {
            setIsSaving(false);
        }
    };

    const stats = useMemo(() => {
        const assigned = agents.filter(a => a.isAssigned === 1).length;
        const total = agents.length;
        const notAssigned = total - assigned;
        return { assigned, notAssigned, total };
    }, [agents]);

    // Filtered Agents for Search
    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const highlightMatch = (text, query) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={i} className="bg-yellow-300 rounded">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div className="p-4 bg-[#f8fafc] rounded-xl">
            <div className="max-w-full mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Agent Assignment</h1>
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                            <RiInformationLine /> Manage which agents have access to specific channel accounts.
                        </p>
                    </div>

                    <UniversalButton
                        label={isSaving ? "Saving..." : "Save Changes"}
                        variant="primary"
                        icon={isSaving ? <RiLoader4Line className="animate-spin" /> : <RiSave3Fill />}
                        onClick={handleSaveMapping}
                        disabled={isSaving || !selectedAccountId}
                        className="!rounded-xl shadow-lg shadow-indigo-200"
                    />
                </div>

                {/* Tab Navigation */}
                {/* <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-fit mb-8">
                    {Object.entries(channelConfig).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-medium text-sm ${activeTab === key
                                ? "bg-slate-900 text-white shadow-md"
                                : "text-slate-500 hover:bg-slate-50"
                                }`}
                        >
                            {config.icon}
                            {config.label}
                        </button>
                    ))}
                </div> */}
                {/* Upgraded Tab Navigation with Sliding Transition */}
                <div className="relative flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200 w-fit mb-8 overflow-hidden">
                    {Object.entries(channelConfig)
                        .filter(([_, config]) => allowedServiceIds.includes(config.serviceId))
                        .map(([key, config]) => {
                            const isActive = activeTab === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`relative flex items-center gap-2 px-8 py-2.5 rounded-xl transition-colors duration-300 font-semibold text-sm z-10 ${isActive ? "text-indigo-700" : "text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    {/* Animated Icon Container */}
                                    <motion.span
                                        animate={{ scale: isActive ? 1.1 : 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {config.icon}
                                    </motion.span>

                                    {config.label}

                                    {/* The Sliding Background Toggle */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabBackground"
                                            className="absolute inset-0 bg-white shadow-sm border border-indigo-100 rounded-xl -z-10"
                                            transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.6
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel: Account Selection */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                                Step 1: Select Account
                            </h2>
                            <DropdownWithSearch
                                id="accountSelector"
                                label={`Select ${channelConfig[activeTab].label} Account`}
                                placeholder="Search accounts..."
                                options={accounts.map(acc => ({
                                    value: acc[channelConfig[activeTab].idKey],
                                    label: acc[channelConfig[activeTab].nameKey] || "Unnamed Account",
                                }))}
                                value={selectedAccountId}
                                onChange={setSelectedAccountId}
                                disabled={isPageLoading}
                            />

                            {selectedAccountId && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100"
                                >
                                    <p className="text-xs text-indigo-600 font-medium">Currently Configuring:</p>
                                    <p className="text-sm font-bold text-indigo-900 truncate">
                                        {accounts.find(a => a[channelConfig[activeTab].idKey] == selectedAccountId)?.[channelConfig[activeTab].nameKey]}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Agent List */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 space-y-4">
                                <div className="flex flex-wrap items-center justify-between gap-4">

                                    <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                                        <RiUserSharedLine className="text-lg text-indigo-500" />
                                        Step 2: Assign Agents
                                    </h2>
                                    {/* CAPSULES SECTION */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                            <RiUserAddLine />
                                            {stats.assigned} Assigned
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                            <RiTeamLine />
                                            {stats.notAssigned} Not Assigned
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs font-bold">
                                            {stats.total} Total
                                        </div>
                                    </div>
                                </div>
                                {selectedAccountId && (
                                    <div className="relative">
                                        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search agents by name..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="p-6 h-120 overflow-scroll">
                                {!selectedAccountId ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                            <RiUserSharedLine className="text-3xl" />
                                        </div>
                                        <p className="text-sm">Please select an account to see available agents.</p>
                                    </div>
                                ) : isAgentsLoading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
                                        {[...Array(6)].map((_, i) => (
                                            <UniversalSkeleton key={i} height="8rem" width="100%" />
                                        ))}
                                        {/* <UniversalSkeleton height="4rem" width="100%" /> */}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <AnimatePresence>
                                            {filteredAgents.map((agent) => (
                                                <motion.div
                                                    key={agent.srNo}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    whileHover={{ y: -2 }}
                                                    onClick={() => handleToggle(agent.srNo)}
                                                    className={`group cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between ${agent.isAssigned === 1
                                                        ? "border-indigo-500 bg-indigo-50/30"
                                                        : "border-slate-100 hover:border-slate-200"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Checkbox
                                                            checked={agent.isAssigned === 1}
                                                            color="primary"
                                                            sx={{ padding: 0, '& .MuiSvgIcon-root': { fontSize: 24 } }}
                                                        />
                                                        <div>
                                                            <p className={`font-semibold text-sm ${agent.isAssigned === 1 ? "text-indigo-900" : "text-slate-700"}`}>
                                                                {/* {agent.name} */}
                                                                {highlightMatch(String(agent.name || ""), searchTerm)}
                                                            </p>
                                                            <p className="text-[10px] text-slate-400 font-mono">ID: {agent.srNo}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AgentMapping;