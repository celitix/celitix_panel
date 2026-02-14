import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import moment from "moment";

// ICONS 
import {
    Users,
    DollarSign,
    Repeat,
    BarChart3,
    ArrowUpRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// APIS 
import { dailySeriveUsage } from "@/apis/settings/setting";

// Chart Data
const userData = [
    { uv: 20 },
    { uv: 40 },
    { uv: 35 },
    { uv: 55 },
    { uv: 45 },
    { uv: 65 },
    { uv: 60 },
];
const revenueData = [
    { uv: 1200 },
    { uv: 1600 },
    { uv: 1300 },
    { uv: 1800 },
    { uv: 1400 },
    { uv: 2000 },
    { uv: 1700 },
];
const conversionData = [
    { uv: 9 },
    { uv: 10.2 },
    { uv: 9.8 },
    { uv: 11.5 },
    { uv: 10.8 },
    { uv: 12 },
    { uv: 12.2 },
];

// Donut Chart Colors (soft pastel tones)
const COLORS = ["#A78BFA", "#A3E635", "#38BDF8", "#F59E0B", "#D1D5DB"];

const weekData = [
    { name: "Product", value: 30 },
    { name: "Restorans and bars", value: 23 },
    { name: "Internet and media", value: 18 },
    { name: "Pay for workplace", value: 17 },
    { name: "Other", value: 13 },
];

const monthData = [
    { name: "Product", value: 25 },
    { name: "Restorans and bars", value: 28 },
    { name: "Internet and media", value: 22 },
    { name: "Pay for workplace", value: 15 },
    { name: "Other", value: 10 },
];

const yearData = [
    { name: "Product", value: 20 },
    { name: "Restorans and bars", value: 18 },
    { name: "Internet and media", value: 25 },
    { name: "Pay for workplace", value: 22 },
    { name: "Other", value: 15 },
];

// Card Component
const Card = ({ title, value, percent, colorFrom, colorTo, data, icon }) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 w-full">
        <div className="flex items-center justify-between">
            <div
                className="p-3 rounded-xl text-white"
                style={{
                    background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
                    boxShadow: `0 4px 10px ${colorTo}40`,
                }}
            >
                {icon}
            </div>
            <div className="text-right text-xs">
                <p
                    className={`${percent > 0 ? "text-green-500" : "text-red-500"
                        } font-semibold`}
                >
                    {percent > 0 ? "▲" : "▼"} {Math.abs(percent)}%
                </p>
                <span className="text-gray-400">This week</span>
            </div>
        </div>

        <p className="mt-5 text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>

        <div className="mt-3 h-20">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Tooltip contentStyle={{ display: "none" }} />
                    <defs>
                        <linearGradient
                            id={title.replace(/\s/g, "")}
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <stop offset="5%" stopColor={colorFrom} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={colorTo} stopOpacity={0.8} />
                        </linearGradient>
                    </defs>
                    <Line
                        type="monotone"
                        dataKey="uv"
                        stroke={`url(#${title.replace(/\s/g, "")})`}
                        strokeWidth={2.5}
                        dot={{
                            r: 4,
                            fill: colorTo,
                            strokeWidth: 0,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

// Main Dashboard
const AnalyticsType = ({ selectedYear, selectedMonth, YearData }) => {
    const [activeTab, setActiveTab] = useState("Week");
    const [usageData, setUsageData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        if (selectedYear && selectedMonth) {
            const monthIndex = YearData.find(
                (y) => y.year === selectedYear
            ).value.indexOf(selectedMonth);
            const start = new Date(selectedYear, monthIndex, 1);
            const end = new Date(selectedYear, monthIndex + 1, 0);
            setStartDate(start);
            setEndDate(end);
        }
    }, [selectedYear, selectedMonth]);

    const fetchWhatsappUsage = async () => {
        setIsLoading(true);
        try {
            const payload = {
                userSrno: 0,
                fromDate: moment(startDate).format("YYYY-MM-DD"),
                toDate: moment(endDate).format("YYYY-MM-DD"),
            };

            console.log("payload", payload);

            const res = await dailySeriveUsage(payload);
            console.log("FULL API RESPONSE:", res);

            const whatsappArray = Array.isArray(res?.whatsapp)
                ? res.whatsapp
                : res?.whatsapp
                    ? [res.whatsapp]
                    : [];

            console.log("Parsed WhatsApp Data:", whatsappArray);

            setUsageData(whatsappArray);
        } catch (err) {
            console.error("WhatsApp fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchWhatsappUsage();
    }, [startDate, endDate]);

    const data =
        activeTab === "Week"
            ? weekData
            : activeTab === "Month"
                ? monthData
                : yearData;

    const icons = {
        WHATSAPP: <FaWhatsapp className="text-green-500 text-2xl" />,
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 space-y-10">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
                <Card
                    title="Total Users"
                    value="23K"
                    percent={12.5}
                    colorFrom="#FACC15"
                    colorTo="#FBBF24"
                    data={userData}
                    icon={<Users className="w-6 h-6" />}
                />
                <Card
                    title="Total Revenue"
                    value="$2.4K"
                    percent={-7.5}
                    colorFrom="#60A5FA"
                    colorTo="#3B82F6"
                    data={revenueData}
                    icon={<DollarSign className="w-6 h-6" />}
                />
                <Card
                    title="Conversion Rate"
                    value="12.2%"
                    percent={2.4}
                    colorFrom="#34D399"
                    colorTo="#10B981"
                    data={conversionData}
                    icon={<Repeat className="w-6 h-6" />}
                />
            </div>

            {/* Transfer History */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm w-full max-w-lg mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="text-gray-700 w-5 h-5" />
                        <h2 className="text-gray-800 text-lg font-semibold">
                            Transfer history
                        </h2>
                    </div>
                    <ArrowUpRight className="text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>

                <p className="text-gray-500 text-sm mb-5">
                    Monitor how your money is being utilized
                </p>

                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-2xl p-1 w-fit mb-6">
                    {["Week", "Month", "Year"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${activeTab === tab
                                ? "bg-white text-gray-800 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Donut Chart + Labels */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    {/* Legend */}
                    <div className="flex flex-col gap-3">
                        {data.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-3">
                                <span
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></span>
                                <p className="text-gray-700 text-sm">
                                    {item.name}{" "}
                                    <span className="text-gray-500 ml-1">{item.value}%</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Donut */}
                    <div className="w-[180px] h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip contentStyle={{ display: "none" }} />
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="value"
                                    paddingAngle={4}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            stroke="none"
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Rendered Whatsapp data only  */}
            <div className="flex gap-4 w-70 p-6 bg-gray-50 shadow-md rounded-md border-1 border-blue-100 jutify-center">
                {Array.isArray(usageData) && usageData.length > 0 ? (
                    usageData.map((item, i) => (
                        <motion.div key={i} className=" ">
                            <p className="text-md font-medium text-gray-800">Total Sent: <span className="text-md font-medium text-gray-700"> {item.totalSent}</span>  </p>
                           <p className="text-md font-medium text-gray-800">Total Charge: <span className="text-md font-medium text-gray-700">₹{item.totalCharge.toFixed(2)} </span> </p>
                        </motion.div>
                    ))
                ) : (
                    <div className="">
                     <p className="text-gray-6
                     00 text-sm font-medium">No WhatsApp data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyticsType;
