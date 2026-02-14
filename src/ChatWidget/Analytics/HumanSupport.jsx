import React, { useState } from "react";

// ICONS
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Mail,
  MessageSquare,
  Instagram,
  Phone,
} from "lucide-react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = ({ year, month, title, selectedRange }) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div>
      <h3 className="text-center font-semibold text-gray-700 mb-2">{title}</h3>

      <div className="grid grid-cols-7 text-xs text-gray-600 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {days.map((day, idx) => {
          const dateKey = day
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(
                day
              ).padStart(2, "0")}`
            : null;

          // 🔵 Highlight Logic
          const isInRange =
            selectedRange?.start &&
            selectedRange?.end &&
            dateKey &&
            dateKey >= selectedRange.start &&
            dateKey <= selectedRange.end;

          const isStart = selectedRange?.start === dateKey;
          const isEnd = selectedRange?.end === dateKey;

          return (
            <div
              key={idx}
              className={`
        h-8 flex items-center justify-center border rounded
        ${!day ? "bg-gray-50 cursor-default" : ""}
        ${isStart || isEnd ? "bg-blue-800 text-white" : ""}
        ${isInRange && !isStart && !isEnd ? "bg-blue-100 text-blue-700" : ""}
        ${day && !isInRange ? "hover:bg-blue-100 cursor-pointer" : ""}
      `}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HumanSupport = () => {
  const [activeTab, setActiveTab] = useState("Live conversations");

  const tabs = [
    "Live conversations",
    "Tickets",
    "Agents performance",
    "Online hours",
  ];

  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const formatKey = (date) => date.toISOString().split("T")[0];

  const handlePreset = (type) => {
    const today = new Date();
    let start, end;

    switch (type) {
      case "Today":
        start = end = today;
        break;

      case "Yesterday":
        start = end = new Date(today.setDate(today.getDate() - 1));
        break;

      case "Last week":
        end = new Date();
        start = new Date();
        start.setDate(start.getDate() - 7);
        break;

      case "This month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;

      case "Last 30 days":
        end = new Date();
        start = new Date();
        start.setDate(start.getDate() - 30);
        break;

      case "Last 90 days":
        end = new Date();
        start = new Date();
        start.setDate(start.getDate() - 90);
        break;

      default:
        return;
    }

    setSelectedRange({
      start: formatKey(new Date(start)),
      end: formatKey(new Date(end)),
    });

    // To highlight the START DATE in calendar
    setSelectedDate(formatKey(new Date(start)));
  };

  // MONTH STATE
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(8);

  // BUTTON HANDLERS
  const goPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // SECOND CALENDAR
  const secondMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const secondYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const channels = [
    { name: "Live chat", icon: <MessageCircle size={18} color="#2563eb" /> },
    { name: "Email", icon: <Mail size={18} color="#d97706" /> },
    { name: "Messenger", icon: <MessageSquare size={18} color="#6366f1" /> },
    { name: "Instagram", icon: <Instagram size={18} color="#ec4899" /> },
    { name: "WhatsApp", icon: <Phone size={18} color="#22c55e" /> },
  ];

  const [selectedChannels, setSelectedChannels] = useState([]);
  const toggleChannel = (item) => {
    setSelectedChannels((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  // conversetional
  const hours = [
    "12am",
    "2am",
    "4am",
    "6am",
    "8am",
    "10am",
    "12pm",
    "2pm",
    "4pm",
    "6pm",
    "8pm",
    "10pm",
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // TICKET
  const [ticketOpen, setTicketOpen] = useState(false);
  const [openDaily, setOpenDaily] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);

  return (
    <div className="p-3 md:p-4 w-full bg-white border border-gray-300 rounded min-h-screen relative overflow-visible">
      <h2 className="text-xl font-semibold text-gray-800">Human Support</h2>

      <div className="bg-white rounded-xl shadow p-6 w-full mt-10">
        {/* ==== TABS ROW ===== */}
        <div className="flex items-center gap-6 border-b pb-2 w-full overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`
          relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all
          ${
            activeTab === t
              ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }
        `}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === "Live conversations" && (
          <div className="mt-6">
            <div className="flex flex-wrap justify-center md:justify-between items-center mb-4 gap-5">
              {/* DATE RANGE DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  22 Oct 2025 - 20 Nov 2025
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div
                    className="absolute mt-2 bg-white shadow-2xl border rounded-xl 
                          w-[750px] flex z-50 p-3 animate-fadeIn"
                  >
                    {/* LEFT: CALENDARS */}
                    <div className="border-r p-4 w-[65%]">
                      <div
                        className="flex justify-between items-center mb-4 text-sm 
                              bg-gray-100 px-3 py-2 rounded-lg shadow-inner"
                      >
                        <button
                          onClick={goPrev}
                          className="p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <span className="font-medium text-gray-700">
                          {monthNames[currentMonth]} {currentYear}
                        </span>

                        <span className="font-medium text-gray-700">
                          {monthNames[secondMonth]} {secondYear}
                        </span>

                        <button
                          onClick={goNext}
                          className="p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <Calendar
                          year={currentYear}
                          month={currentMonth}
                          title={`${monthNames[currentMonth]} ${currentYear}`}
                          selectedRange={selectedRange}
                        />

                        <Calendar
                          year={secondYear}
                          month={secondMonth}
                          title={`${monthNames[secondMonth]} ${secondYear}`}
                          selectedRange={selectedRange}
                        />
                      </div>
                    </div>

                    {/* RIGHT: PRESETS */}
                    <div className="w-[35%] p-4 text-sm text-gray-700">
                      {[
                        "Today",
                        "Yesterday",
                        "Last week",
                        "This month",
                        "Last 30 days",
                        "Last 90 days",
                      ].map((item) => (
                        <div
                          key={item}
                          onClick={() => handlePreset(item)}
                          className={`px-3 py-2 rounded cursor-pointer transition-all
                    ${
                      selectedRange.label === item
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "hover:bg-blue-50"
                    }
                  `}
                        >
                          {item}
                        </div>
                      ))}

                      <div className="mt-5 space-y-2">
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition">
                          Apply
                        </button>

                        <button
                          onClick={() => setOpen(false)}
                          className="w-full border py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>



              {/* CHANNEL DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setChannelOpen(!channelOpen)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  {selectedChannels.length === 0
                    ? "Any Channel"
                    : selectedChannels.join(", ")}

                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      channelOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {channelOpen && (
                  <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-56 p-2 text-sm text-gray-700 z-50">
                    {channels.map((c) => (
                      <label
                        key={c.name}
                        className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-blue-700 border-gray-300 rounded"
                          checked={selectedChannels.includes(c.name)}
                          onChange={() => toggleChannel(c.name)}
                        />

                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* USER DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Anshu (You)
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      userOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userOpen && (
                  <div
                    className="absolute mt-2 bg-white shadow-xl border rounded-xl 
                          w-40 p-2 text-sm text-gray-700 z-50"
                  >
                    <div className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                      Anshu (You)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ===== SUMMARY STATS ROW ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {/* New live conversations */}
              <div
                className="border  rounded-xl  bg-white  shadow-sm text-center p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center min-h-[110px]  w-full" >
                {/* Label */}
                <div
                  className=" flex items-center justify-center  gap-1 text-gray-700 text-xs  sm:text-sm font-medium ">
                  New live conversations
                  <span className="text-gray-400 text-[10px] sm:text-xs cursor-pointer">
                    ?
                  </span>
                </div>

                {/* Value */}
                <div
                  className=" mt-2 text-2xl sm:text-3xl md:text-4xl  font-semibold text-gray-900 "
                >
                  0
                </div>
              </div>

              {/* Replied live conversations */}
              <div  className="border  rounded-xl  bg-white  shadow-sm text-center p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center min-h-[110px]  w-full" >
                <div  className=" flex items-center justify-center  gap-1 text-gray-700 text-xs  sm:text-sm font-medium ">
                  Replied live conversations
                  <span className="text-gray-400 text-[10px] sm:text-xs cursor-pointer">
                    ?
                  </span>
                </div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </div>

              {/* Missed live conversations */}
              <div  className="border  rounded-xl  bg-white  shadow-sm text-center p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center min-h-[110px]  w-full" >
                <div  className=" flex items-center justify-center  gap-1 text-gray-700 text-xs  sm:text-sm font-medium ">
                  Missed live conversations
                   <span className="text-gray-400 text-[10px] sm:text-xs cursor-pointer">
                    ?
                  </span>
                </div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </div>

              {/* Taken over by Flow */}
             <div  className="border  rounded-xl  bg-white  shadow-sm text-center p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center min-h-[110px]  w-full" >
                <div  className=" flex items-center justify-center  gap-1 text-gray-700 text-xs  sm:text-sm font-medium ">
                  Live conversations taken over by Flow
                   <span className="text-gray-400 text-[10px] sm:text-xs cursor-pointer">
                    ?
                  </span>
                </div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </div>
            </div>

            {/* ===== second MAIN BOXES ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* LEFT BOX */}
              <div className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                    Live conversations
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>

                  <button className="flex items-center gap-1 text-sm border rounded-lg px-2 py-1 bg-white hover:bg-gray-50">
                    Daily <ChevronDown size={14} />
                  </button>
                </div>

                <div className="mt-5 text-gray-500 text-sm">On average</div>
                <div className="text-3xl font-semibold text-gray-800">0</div>

                <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-center text-gray-400">
                  (Chart UI placeholder)
                </div>
              </div>

              {/* RIGHT BOX */}
              <div className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  First response time
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>

                <div className="mt-5 text-gray-500 text-sm">On average</div>
                <div className="text-3xl font-semibold text-gray-800">0sec</div>

                <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center text-center justify-center text-gray-400">
                  (Chart UI placeholder)
                </div>
              </div>
            </div>

            {/* ===== Third MAIN BOXES ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* LEFT BOX */}
              <div className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                    Live conversations
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>

                  <button className="flex items-center gap-1 text-sm border rounded-lg px-2 py-1 bg-white hover:bg-gray-50">
                    Daily <ChevronDown size={14} />
                  </button>
                </div>

                <div className="mt-5 text-gray-500 text-sm">On average</div>
                <div className="text-3xl font-semibold text-gray-800">0</div>

                <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center text-center justify-center text-gray-400">
                  (Chart UI placeholder)
                </div>
              </div>

              {/* RIGHT BOX */}
              <div className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  First response time
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>

                <div className="mt-5 text-gray-500 text-sm">On average</div>
                <div className="text-3xl font-semibold text-gray-800">0sec</div>

                <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex text-center items-center justify-center text-gray-400">
                  (Chart UI placeholder)
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-xl p-6 mt-10 border border-gray-200">
              {/* Title Row */}
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Conversations started by visitors
                </h3>
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Hover over the tile to see more details
              </div>

              {/* Grid Wrapper */}
              <div className="mt-4 flex gap-4">
                {/* Left Hour Labels */}
                <div className="flex flex-col justify-between text-xs text-gray-600 min-w-[40px]">
                  {hours.map((h) => (
                    <div key={h} className="h-6 flex items-center">
                      {h}
                    </div>
                  ))}
                </div>

                {/* Heatmap Grid */}
                <div className="grid grid-cols-7 gap-3 flex-1">
                  {days.map((day) => (
                    <div key={day} className="flex flex-col gap-1">
                      {/* 12 time slots per day */}
                      {Array(12)
                        .fill(0)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="h-4 rounded-sm bg-gray-100 hover:bg-blue-200 transition"
                          ></div>
                        ))}

                      {/* Day label */}
                      <div className="text-center text-xs text-gray-600 mt-2">
                        {day}
                      </div>

                      {/* Bottom small zero */}
                      <div className="text-center text-xs text-gray-400">0</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Tickets" && (
          <div className="mt-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center mb-4 gap-5">
              {/* DATE RANGE DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  22 Oct 2025 - 20 Nov 2025
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div
                    className="absolute mt-2 bg-white shadow-2xl border rounded-xl 
                          w-[750px] flex z-50 p-3 animate-fadeIn"
                  >
                    {/* LEFT: CALENDARS */}
                    <div className="border-r p-4 w-[65%]">
                      <div
                        className="flex justify-between items-center mb-4 text-sm 
                              bg-gray-100 px-3 py-2 rounded-lg shadow-inner"
                      >
                        <button
                          onClick={goPrev}
                          className="p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <span className="font-medium text-gray-700">
                          {monthNames[currentMonth]} {currentYear}
                        </span>

                        <span className="font-medium text-gray-700">
                          {monthNames[secondMonth]} {secondYear}
                        </span>

                        <button
                          onClick={goNext}
                          className="p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <Calendar
                          year={currentYear}
                          month={currentMonth}
                          title={`${monthNames[currentMonth]} ${currentYear}`}
                          selectedRange={selectedRange}
                        />

                        <Calendar
                          year={secondYear}
                          month={secondMonth}
                          title={`${monthNames[secondMonth]} ${secondYear}`}
                          selectedRange={selectedRange}
                        />
                      </div>
                    </div>

                    {/* RIGHT: PRESETS */}
                    <div className="w-[35%] p-4 text-sm text-gray-700">
                      {[
                        "Today",
                        "Yesterday",
                        "Last week",
                        "This month",
                        "Last 30 days",
                        "Last 90 days",
                      ].map((item) => (
                        <div
                          key={item}
                          onClick={() => handlePreset(item)}
                          className={`px-3 py-2 rounded cursor-pointer transition-all
                    ${
                      selectedRange.label === item
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "hover:bg-blue-50"
                    }
                  `}
                        >
                          {item}
                        </div>
                      ))}

                      <div className="mt-5 space-y-2">
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition">
                          Apply
                        </button>

                        <button
                          onClick={() => setOpen(false)}
                          className="w-full border py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CHANNEL DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setChannelOpen(!channelOpen)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  {selectedChannels.length === 0
                    ? "Any Channel"
                    : selectedChannels.join(", ")}

                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      channelOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {channelOpen && (
                  <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-56 p-2 text-sm text-gray-700 z-50">
                    {channels.map((c) => (
                      <label
                        key={c.name}
                        className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-blue-700 border-gray-300 rounded"
                          checked={selectedChannels.includes(c.name)}
                          onChange={() => toggleChannel(c.name)}
                        />

                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* USER DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Anshu (You)
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      userOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userOpen && (
                  <div
                    className="absolute mt-2 bg-white shadow-xl border rounded-xl 
                          w-40 p-2 text-sm text-gray-700 z-50"
                  >
                    <div className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                      Anshu (You)
                    </div>
                  </div>
                )}
              </div>

              {/* TICKET DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setTicketOpen(!ticketOpen)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Any ticket tag
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      ticketOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {ticketOpen && (
                  <div
                    className="absolute mt-2 bg-white shadow-xl border rounded-xl 
                          w-40 p-2 text-sm text-gray-700 z-50"
                  >
                    <div className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                      No option
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ===== SUMMARY STATS ROW ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {/*  New tickets */}
              <div className="border rounded-xl p-4 shadow-sm bg-white">
                <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                  New tickets
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </div>

              {/*  Replied tickets */}
              <div className="border rounded-xl p-4 shadow-sm bg-white">
                <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                  Replied tickets
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </div>

              {/* Solved tickets */}
              <div className="border rounded-xl p-4 shadow-sm bg-white">
                <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                  Solved tickets
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </div>

              {/* Taken over by Flow */}
              <div className="border rounded-xl p-4 shadow-sm bg-white">
                <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                  One-touch tickets
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>
                <div className="text-3xl font-semibold mt-2">0</div>
              </div>
            </div>

            {/* ===== second MAIN BOXES ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* LEFT BOX */}
              <div className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                    New tickets
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setOpenDaily(!openDaily)}
                      className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Daily{" "}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          openDaily ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDaily && (
                      <div
                        className="absolute mt-2 bg-white shadow-xl border rounded-xl 
                          w-40 p-2 text-sm text-gray-700 z-50"
                      >
                        <div className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                          Day
                        </div>
                        <div className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                          Month
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 text-gray-500 text-sm">On average</div>
                <div className="text-3xl font-semibold text-gray-800">0</div>

                <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-center text-gray-400">
                  (Chart UI placeholder)
                </div>
              </div>

              {/* RIGHT BOX */}
              <div className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  First response time
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>

                <div className="mt-5 text-gray-500 text-sm">On average</div>
                <div className="text-3xl font-semibold text-gray-800">0sec</div>

                <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-center text-gray-400">
                  (Chart UI placeholder)
                </div>
              </div>
            </div>

            {/* ===== Third MAIN BOXES ===== */}
            <div className="mt-10 grid grid-cols-1">
              <div className="bg-white border shadow rounded-xl p-6">
                {/* Title + Legend */}
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center gap-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      New vs. replied vs. solved tickets
                    </h3>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      New tickets
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Replied tickets
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      Solved tickets
                    </div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="mt-6 h-[260px] border rounded-xl bg-gray-50 flex items-center justify-center text-center text-gray-400">
                  (Chart UI placeholder)
                </div>

                {/* Timeline */}
                <div className="flex flex-wrap justify-between text-xs text-gray-500 mt-3 px-1">
                  <span>Oct 22</span>
                  <span>Oct 26</span>
                  <span>Oct 30</span>
                  <span>Nov 3</span>
                  <span>Nov 7</span>
                  <span>Nov 11</span>
                  <span>Nov 15</span>
                  <span>Nov 19</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* LEFT BOX */}
              <div className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="mt-5 text-gray-500 text-sm">On average</div>
                <div className="text-3xl font-semibold text-gray-800">0</div>

                <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-center text-gray-400">
                  (Chart UI placeholder)
                </div>
              </div>

              {/* RIGHT BOX */}
              <div className="border rounded-xl p-5 shadow-sm bg-white">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  Resolution time
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>

                <div className="mt-5 text-gray-500 text-sm">On average</div>
                <div className="text-3xl font-semibold text-gray-800">0sec</div>

                <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-center text-gray-400">
                  (Chart UI placeholder)
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Agents performance" && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-4 relative">
              {/* DATE RANGE DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  22 Oct 2025 - 20 Nov 2025
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div
                    className="absolute mt-2 bg-white shadow-2xl border rounded-xl 
                          w-[750px] flex z-50 p-3 animate-fadeIn"
                  >
                    {/* LEFT: CALENDARS */}
                    <div className="border-r p-4 w-[65%]">
                      <div
                        className="flex justify-between items-center mb-4 text-sm 
                              bg-gray-100 px-3 py-2 rounded-lg shadow-inner"
                      >
                        <button
                          onClick={goPrev}
                          className="p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <span className="font-medium text-gray-700">
                          {monthNames[currentMonth]} {currentYear}
                        </span>

                        <span className="font-medium text-gray-700">
                          {monthNames[secondMonth]} {secondYear}
                        </span>

                        <button
                          onClick={goNext}
                          className="p-1.5 hover:bg-gray-200 rounded transition"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <Calendar
                          year={currentYear}
                          month={currentMonth}
                          title={`${monthNames[currentMonth]} ${currentYear}`}
                          selectedRange={selectedRange}
                        />

                        <Calendar
                          year={secondYear}
                          month={secondMonth}
                          title={`${monthNames[secondMonth]} ${secondYear}`}
                          selectedRange={selectedRange}
                        />
                      </div>
                    </div>

                    {/* RIGHT: PRESETS */}
                    <div className="w-[35%] p-4 text-sm text-gray-700">
                      {[
                        "Today",
                        "Yesterday",
                        "Last week",
                        "This month",
                        "Last 30 days",
                        "Last 90 days",
                      ].map((item) => (
                        <div
                          key={item}
                          onClick={() => handlePreset(item)}
                          className={`px-3 py-2 rounded cursor-pointer transition-all
                    ${
                      selectedRange.label === item
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "hover:bg-blue-50"
                    }
                  `}
                        >
                          {item}
                        </div>
                      ))}

                      <div className="mt-5 space-y-2">
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition">
                          Apply
                        </button>

                        <button
                          onClick={() => setOpen(false)}
                          className="w-full border py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* AGENT DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setAgentOpen(!agentOpen)}
                  className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 
                     shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Agent
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      agentOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {agentOpen && (
                  <div
                    className="absolute mt-2 bg-white shadow-xl border rounded-xl 
                          w-40 p-2 text-sm text-gray-700 z-50"
                  >
                    <div className="hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">
                      Anshu (You)
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* === LIVE CONVERSATIONS TABLE === */}
            <div className="border rounded-xl bg-white shadow-sm mt-8 w-full">
              {/* Header Row */}
              <div
                className="
      hidden      
      lg:grid       
      grid-cols-7 
      text-sm font-medium text-gray-700 
      px-6 py-4 border-b
    "
              >
                <div>Agent</div>
                <div>
                  Replied live conversations{" "}
                  <span className="text-gray-400 text-xs">?</span>
                </div>
                <div>
                  Online hours <span className="text-gray-400 text-xs">?</span>
                </div>
                <div>Live conversations per hour</div>
                <div>
                  First response time{" "}
                  <span className="text-gray-400 text-xs">?</span>
                </div>
                <div>Satisfaction rate</div>
                <div>Conversation duration</div>
              </div>

              {/* Mobile/Table Layout */}
              <div
                className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-2 
      lg:hidden
      gap-4 
      p-4
      text-sm
    "
              >
                {[
                  "Agent",
                  "Replied live conversations",
                  "Online hours",
                  "Live conversations per hour",
                  "First response time",
                  "Satisfaction rate",
                  "Conversation duration",
                ].map((label, i) => (
                  <div
                    key={i}
                    className="
          p-3 
          border rounded-lg 
          bg-gray-50
          text-gray-700 
          flex flex-col gap-1
        "
                  >
                    <span className="font-semibold">{label}</span>
                    <span className="text-gray-500 text-xs">No data</span>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-16 text-center text-gray-700">
                <div className="opacity-70 mb-4">
                  <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.03 2 11C2 13.39 3.07 15.53 4.78 17.09L4 22L8.74 19.4C9.78 19.78 10.87 20 12 20C17.52 20 22 15.97 22 11C22 6.03 17.52 2 12 2Z"
                      stroke="#9ca3af"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="11"
                      r="3"
                      stroke="#9ca3af"
                      strokeWidth="1.3"
                    />
                  </svg>
                </div>

                <div className="text-gray-800 font-semibold text-lg">
                  We did not find any active agents during this period.
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Check date selector on top.
                </div>
              </div>
            </div>

            {/* === TICKETS TABLE === */}
            <div className="border rounded-xl bg-white shadow-sm mt-8 w-full">
              {/* ===== DESKTOP HEADER (visible only from lg screens) ===== */}
              <div
                className="
      hidden lg:grid 
      grid-cols-6 
      text-sm font-medium text-gray-700 
      px-6 py-4 border-b
    "
              >
                <div>Agent</div>
                <div>Replied tickets</div>
                <div>
                  Online hours <span className="text-gray-400 text-xs">?</span>
                </div>
                <div>Tickets per hour</div>
                <div>
                  First response time{" "}
                  <span className="text-gray-400 text-xs">?</span>
                </div>
                <div>Satisfaction rate</div>
              </div>

              {/* ===== MOBILE/TABLET RESPONSIVE CARDS ===== */}
              <div className=" grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-2  lg:hidden gap-4 p-4 text-sm ">
                {[
                  "Agent",
                  "Replied tickets",
                  "Online hours",
                  "Tickets per hour",
                  "First response time",
                  "Satisfaction rate",
                ].map((label, idx) => (
                  <div
                    key={idx}
                    className=" p-3  border rounded-lg  bg-gray-50 flex flex-col gap-1 shadow-sm "
                  >
                    <span className="font-semibold text-gray-800">{label}</span>
                    <span className="text-gray-500 text-xs">No data</span>
                  </div>
                ))}
              </div>

              {/* ===== EMPTY STATE (same for all devices) ===== */}
              <div className="flex flex-col items-center justify-center py-16 text-center text-gray-700">
                <div className="opacity-70 mb-4">
                  <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.03 2 11C2 13.39 3.07 15.53 4.78 17.09L4 22L8.74 19.4C9.78 19.78 10.87 20 12 20C17.52 20 22 15.97 22 11C22 6.03 17.52 2 12 2Z"
                      stroke="#9ca3af"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="11"
                      r="3"
                      stroke="#9ca3af"
                      strokeWidth="1.3"
                    />
                  </svg>
                </div>

                <div className="text-gray-800 font-semibold text-lg">
                  We did not find any active agents during this period.
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Check date selector on top.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Online hours" && (
          <>
            <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full mt-6 border border-gray-200">
              {/* ===== TOP SUMMARY ROW ===== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 mb-6 ">
                {/* Replied Live Conversations */}
                <div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                    Replied live conversations
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                    0
                  </div>
                </div>

                {/* Missed Live Conversations */}
                <div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                    Missed live conversations
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                    0
                  </div>
                </div>

                {/* Agents Availability */}
                <div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                    Agents' availability
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                    7h 20min
                  </div>
                </div>
              </div>

              {/* ===== ONLINE HOURS TIMELINE WRAPPER ===== */}
              <div className="mt-6 border rounded-xl bg-white shadow-sm p-4 sm:p-5">
                {/* Section Title */}
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-base font-semibold text-gray-800">
                    Online hours
                  </h3>
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>

                {/* ===== TIME LABELS — Hidden on small screens ===== */}
                <div
                  className="
        hidden 
        sm:flex 
        justify-between 
        text-xs 
        text-gray-500 
        px-2 
        mb-2
      "
                >
                  <span className="w-16">Agent</span>
                  <span>12am</span>
                  <span>6am</span>
                  <span>12pm</span>
                  <span>6pm</span>
                  <span>12am</span>
                </div>

                {/* ===== TIMELINE ROW ===== */}
                <div
                  className="
        flex 
        items-start 
        gap-3 
        mt-2 
        overflow-x-auto 
        scrollbar-thin 
        scrollbar-thumb-gray-300 
        scrollbar-track-gray-100
        pb-3
      "
                >
                  {/* Agent Column */}
                  <div className="flex items-center gap-3 flex-shrink-0 w-24 sm:w-28">
                    <img
                      src=""
                      className="w-8 h-8 rounded-full border object-cover"
                      alt="agent"
                    />
                    <span className="text-sm text-gray-700">Anshu</span>
                  </div>

                  {/* TIMELINE BARS (scrollable on mobile) */}
                  <div className="flex-1 min-w-[800px] sm:min-w-0 grid grid-cols-48 gap-[2px]">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div
                        key={i}
                        className={`
                h-3 sm:h-4 rounded
                ${i >= 20 && i <= 30 ? "bg-green-300" : "bg-gray-100"}
              `}
                      ></div>
                    ))}
                  </div>

                  {/* Right label */}
                  <div className="text-xs text-gray-500 w-20 sm:w-24 flex-shrink-0 text-right">
                    0 live conversations
                  </div>
                </div>

                {/* Small footer label */}
                <div className="mt-3 text-xs text-gray-500">
                  Online <strong>7h 20min</strong>
                </div>

                {/* FEEDBACK TEXT */}
                <div className="flex justify-end mt-4 text-xs text-gray-600">
                  Missing any data?
                  <span className="text-blue-600 cursor-pointer ml-1 underline">
                    Give feedback
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HumanSupport;
