import { Clock, CalendarDays } from "lucide-react";

export default function ScheduleCard() {
    const schedules = [
        { name: "Morning Blast Campaign", time: "09:00 AM", type: "Marketing" },
        { name: "Evening Promo Push", time: "06:30 PM", type: "Engagement" },
        { name: "Weekend Reminder", time: "10:00 AM", type: "Notification" },
        { name: "Lead Retarget Flow", time: "01:15 PM", type: "Automation" },
        { name: "Night Alert Campaign", time: "11:45 PM", type: "Utility" },
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case "Marketing":
                return "bg-gradient-to-r from-blue-500 to-cyan-400 text-white";
            case "Engagement":
                return "bg-gradient-to-r from-indigo-500 to-blue-400 text-white";
            case "Notification":
                return "bg-gradient-to-r from-amber-400 to-yellow-500 text-white";
            case "Automation":
                return "bg-gradient-to-r from-emerald-500 to-green-400 text-white";
            case "Utility":
                return "bg-gradient-to-r from-gray-500 to-slate-400 text-white";
            default:
                return "bg-gray-200 text-gray-700";
        }
    };

    return (
        <div className="group relative bg-white/70 backdrop-blur-xl border border-gray-100 shadow-md rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            {/* Top Gradient Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-2xl">
                        <CalendarDays size={20} />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold tracking-wide">Schedules</h3>
                        <p className="text-xs text-white/80">Upcoming Campaigns</p>
                    </div>
                </div>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    Total: 124
                </span>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col h-[420px]">
                {/* Search Bar */}
                <div className="relative mb-5">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search schedules..."
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                    />
                </div>

                {/* Schedule List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <ul className="relative">
                        {schedules.map((item, i) => (
                            <li
                                key={i}
                                className="relative pl-6 mb-5 flex items-center justify-between group/item"
                            >
                                {/* Timeline line */}
                                {i !== schedules.length - 1 && (
                                    <div className="absolute left-2 top-5 w-0.5 h-10 bg-gradient-to-b from-indigo-300 to-cyan-300 opacity-60" />
                                )}

                                {/* Dot */}
                                <span className="absolute left-1 top-2 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md"></span>

                                {/* Content */}
                                <div className="flex flex-col">
                                    <p className="font-semibold text-gray-800 text-sm">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                                </div>

                                {/* Type Tag */}
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${getTypeColor(
                                        item.type
                                    )}`}
                                >
                                    {item.type}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Accent Glow */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
    );
}
