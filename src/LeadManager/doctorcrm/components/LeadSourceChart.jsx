import CustomTooltip from '@/components/common/CustomTooltip';
import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// import CustomTooltip from "./CustomTooltip";


const DATA = {
  Daily: [
    { name: "Instagram", value: 22, color: "#6366F1" },
    { name: "WhatsApp", value: 15, color: "#22C55E" },
    { name: "Referral", value: 20, color: "#F59E0B" },
    { name: "Phone Calls", value: 18, color: "#17aaed" },
  ],
  Weekly: [
    { name: "Instagram", value: 150, color: "#6366F1" },
    { name: "WhatsApp", value: 50, color: "#22C55E" },
    { name: "Referral", value: 22, color: "#F59E0B" },
    { name: "Phone Calls", value: 110, color: "#17aaed" },
  ],
  Monthly: [
    { name: "Instagram", value: 410, color: "#6366F1" },
    { name: "WhatsApp", value: 256, color: "#22C55E" },
    { name: "Referral", value: 178, color: "#F59E0B" },
    { name: "Phone Calls", value: 963, color: "#17aaed" },
  ],
};

export default function LeadSourceChart() {
  const [activeTab, setActiveTab] = useState("Daily");

  const data = DATA[activeTab];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    // <div className="flex flex-col gap-4 w-full bg-white rounded-2xl shadow-md p-5">
    <div className="flex flex-col gap-4 w-full h-full min-h-0 bg-white rounded-2xl shadow-md p-5  overflow-hidden">

      {/* Header */}
      <h2 className="text-lg font-semibold ">Lead Source </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 text-sm font-medium ">
        {["Daily", "Weekly", "Monthly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 ${activeTab === tab
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative   h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            {/* <Tooltip content={<CustomTooltip />} /> */}
            {/* <Tooltip
  content={<CustomTooltip />}
  allowEscapeViewBox={{ x: false, y: false }}
  cursor={false}
  wrapperStyle={{ pointerEvents: "none" }}
/> */}
            <Tooltip
              content={(props) => <CustomTooltip {...props} />}
              cursor={false}
            />

          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-sm text-gray-500">Total People</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2  gap-4 ">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm"
              style={{ backgroundColor: item.color }}
            >
              ☣
            </span>
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">{item.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
