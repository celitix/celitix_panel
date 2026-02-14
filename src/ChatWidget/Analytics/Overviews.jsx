import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// ICONS
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BarChartIcon from "@mui/icons-material/BarChart";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

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

const Overviews = () => {
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("Interactions");
  const [graphType, setGraphType] = useState("line");

  const tabs = [
    "Interactions",
    "Lyro AI Agent resolution rate",
    "Leads acquired",
  ];

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

  // ===== Dummy Data  Chart FOR INTERACTIONS =====
  const labels = [
    "Oct 22",
    "Oct 26",
    "Oct 30",
    "Nov 3",
    "Nov 7",
    "Nov 11",
    "Nov 15",
    "Nov 19",
  ];

  const lineData = {
    labels,
    datasets: [
      {
        label: "Replied live conversations",
        data: [3, 4, 2, 6, 5, 3, 4, 2],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        tension: 0.4,
      },
      {
        label: "Replied tickets",
        data: [1, 2, 1, 3, 2, 1, 2, 1],
        borderColor: "#d97706",
        backgroundColor: "rgba(217, 119, 6, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Flows interactions",
        data: [2, 3, 1, 5, 4, 3, 2, 1],
        backgroundColor: "#38bdf8",
      },
      {
        label: "Lyro AI Agent conversations",
        data: [1, 1, 2, 3, 2, 1, 1, 2],
        backgroundColor: "#f472b6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // ===== Dummy Data for Lyro AI Agent resolution rate =====
  const lyroLineData = {
    labels,
    datasets: [
      {
        label: "Resolution rate",
        data: [40, 45, 42, 50, 48, 46, 49, 44],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        tension: 0.4,
      },
      {
        label: "Resolved conversations",
        data: [5, 6, 4, 8, 7, 6, 7, 5],
        borderColor: "#d97706",
        backgroundColor: "rgba(217, 119, 6, 0.3)",
        tension: 0.4,
      },
      {
        label: "Unresolved conversations",
        data: [2, 2, 3, 3, 2, 2, 3, 2],
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6, 182, 212, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const lyroBarData = {
    labels,
    datasets: [
      {
        label: "Resolution rate %",
        data: [40, 45, 42, 50, 48, 46, 49, 44],
        backgroundColor: "#2563eb",
      },
      {
        label: "Resolved",
        data: [5, 6, 4, 8, 7, 6, 7, 5],
        backgroundColor: "#d97706",
      },
      {
        label: "Unresolved",
        data: [2, 2, 3, 3, 2, 2, 3, 2],
        backgroundColor: "#06b6d4",
      },
    ],
  };

  // ===== Dummy Data for Leads Acquired =====
  const leadsLineData = {
    labels,
    datasets: [
      {
        label: "Leads from Live conversations",
        data: [1, 3, 2, 4, 3, 4, 5, 3],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        tension: 0.4,
      },
      {
        label: "Leads from Flows",
        data: [2, 1, 2, 3, 4, 2, 3, 4],
        borderColor: "#d97706",
        backgroundColor: "rgba(217, 119, 6, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const leadsBarData = {
    labels,
    datasets: [
      {
        label: "Live conversation leads",
        data: [1, 3, 2, 4, 3, 4, 5, 3],
        backgroundColor: "#2563eb",
      },
      {
        label: "Flow leads",
        data: [2, 1, 2, 3, 4, 2, 3, 4],
        backgroundColor: "#d97706",
      },
    ],
  };

  return (
    //  <div className="p-10 w-full bg-white border-1 border-gray-300 rounded h-screen overflow-hidden relative ">
    <div className="p-3 md:p-4 w-full bg-white border border-gray-300 rounded min-h-screen relative overflow-visible">
      <h2 className="text-xl font-semibold text-gray-800">Overview</h2>

      <button
        onClick={() => setOpen(!open)}
        className="mt-4 flex items-center gap-2 border rounded-lg bg-white px-4 py-2 shadow text-sm"
      >
        Select Date Range
        <ChevronDown size={16} />
      </button>

      {/* {open && (
        <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-[75%] flex z-50">
          <div className="border-r p-4 w-[65%] ">
            <div className="flex justify-between items-center mb-3 text-sm bg-gray-100 px-2 py-1 rounded">
              <button
                onClick={goPrev}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ChevronLeft size={18} />
              </button>

              <span>
                {monthNames[currentMonth]} {currentYear}
              </span>
              <span>
                {monthNames[secondMonth]} {secondYear}
              </span>

              <button
                onClick={goNext}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Calendar
                year={2025}
                month={9}
                title="September 2025"
                selectedRange={selectedRange}
              />

              <Calendar
                year={2025}
                month={10}
                title="October 2025"
                selectedRange={selectedRange}
              />
            </div>
          </div>

          {/* PRESET RANGES *
          <div className="w-[35%] p-4 pt-2 text-sm text-gray-700">
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
                className={`px-3 py-2 rounded cursor-pointer
           ${
             selectedRange.label === item
               ? "bg-blue-100 text-blue-700"
               : "hover:bg-blue-50"
           }
            `}
              >
                {item}
              </div>
            ))}

            {/* APPLY + CANCEL *
            <div className="mt-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Apply
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-full mt-2 border py-2 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}

      {open && (
        <div className=" absolute left-0 mt-2 bg-white shadow-xl border rounded-xl w-full md:w-[75%] flex flex-col md:flex-row  z-50 p-3 md:p-0 max-h-[80vh] overflow-auto">
          {/* CALENDAR SECTION */}
          <div className="border-b md:border-b-0 md:border-r p-3 md:p-4 w-full md:w-[65%]">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-3 text-sm bg-gray-100 px-2 py-2 rounded">
              <button
                onClick={goPrev}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ChevronLeft size={18} />
              </button>

              <span>
                {monthNames[currentMonth]} {currentYear}
              </span>
              <span>
                {monthNames[secondMonth]} {secondYear}
              </span>

              <button
                onClick={goNext}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Calendars → stack on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Calendar
                year={2025}
                month={9}
                title="September 2025"
                selectedRange={selectedRange}
              />
              <Calendar
                year={2025}
                month={10}
                title="October 2025"
                selectedRange={selectedRange}
              />
            </div>
          </div>

          {/* PRESETS SECTION */}
          <div className="w-full md:w-[35%] p-4 pt-2 text-sm text-gray-700">
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
                className={`
            px-3 py-2 rounded cursor-pointer
            ${
              selectedRange.label === item
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-blue-50"
            }
          `}
              >
                {item}
              </div>
            ))}

            <div className="mt-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Apply
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-full mt-2 border py-2 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* *****************************************************************TAB SECTION*********************************************************** */}

      <div className="bg-white rounded-xl shadow p-4 w-full mt-10">
        {/* ==== TABS ROW ===== */}
        {/* <div className="flex  items-center gap-6 border-b pb-2 w-full"> */}
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

              {/* Help icon */}
              <span className="p-1 rounded shadow bg-white text-gray-500 border hover:bg-gray-100">
                <HelpCenterOutlinedIcon sx={{ fontSize: 16 }} />
              </span>
            </button>
          ))}
        </div>

        {activeTab === "Interactions" && (
          <div className="mt-5">
            {/* ==== LEGEND + GRAPH TOGGLE ==== */}
            <div className="flex flex-col lg:flex-row justify-center md:justify-between items-center mb-4">
              {/* ==== LEGEND ==== */}
              <div className="flex flex-wrap justify-center  items-center  gap-6 text-sm text-gray-700">
                <div className="flex flex-col justify-center  items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Replied live conversations</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span>Replied tickets</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>Flows interactions</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>

                <div className="flex flex-col justify-center  items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                    <span>Lyro AI Agent conversations</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>
              </div>

              {/* ==== GRAPH TOGGLE BUTTONS ==== */}
              <div className="flex items-center gap-2">
                {/* Line Graph */}
                <button
                  onClick={() => setGraphType("line")}
                  className={`p-2 rounded-full border shadow-sm transition ${
                    graphType === "line"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ShowChartIcon sx={{ fontSize: 18 }} />
                </button>

                {/* Bar Graph */}
                <button
                  onClick={() => setGraphType("bar")}
                  className={`p-2 rounded-full border shadow-sm transition ${
                    graphType === "bar"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <BarChartIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>

            {/* ==== GRAPH AREA ==== */}
            <div className="mt-4   h-[180px]  sm:h-[220px]   md:h-[300px]  border rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              {graphType === "line" && (
                <Line
                  data={lineData}
                  options={chartOptions}
                  className="w-full h-full"
                />
              )}

              {graphType === "bar" && (
                <Bar
                  data={barData}
                  options={chartOptions}
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        )}

        {activeTab === "Lyro AI Agent resolution rate" && (
          <div className="mt-5">
            {/* ==== LEGEND + GRAPH TOGGLE ==== */}
             <div className="flex flex-col lg:flex-row justify-center md:justify-between items-center mb-4">
              {/* ==== LEGEND ==== */}
             <div className="flex flex-col md:flex-row justify-center  items-center  gap-6 text-sm text-gray-700">
                <div className="flex flex-col justify-center  items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Resolution rate</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span>Resolved conversations</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>Unresolved conversations</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>
              </div>

              {/* ==== GRAPH TOGGLE BUTTONS ==== */}
              <div className="flex items-center gap-2">
                {/* Line Graph */}
                <button
                  onClick={() => setGraphType("line")}
                  className={`p-2 rounded-full border shadow-sm transition ${
                    graphType === "line"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ShowChartIcon sx={{ fontSize: 18 }} />
                </button>

                {/* Bar Graph */}
                <button
                  onClick={() => setGraphType("bar")}
                  className={`p-2 rounded-full border shadow-sm transition ${
                    graphType === "bar"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <BarChartIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>

            {/* ==== GRAPH AREA ==== */}
            <div className="mt-4  h-[180px]  sm:h-[220px]   md:h-[300px] border rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              {graphType === "line" && (
                <Line data={lyroLineData} options={chartOptions} />
              )}
              {graphType === "bar" && (
                <Bar data={lyroBarData} options={chartOptions} />
              )}
            </div>
          </div>
        )}

        {activeTab === "Leads acquired" && (
          <div className="mt-5">
            {/* ==== LEGEND + GRAPH TOGGLE ==== */}
           <div className="flex flex-col lg:flex-row justify-center md:justify-between items-center mb-4">
              {/* ==== LEGEND ==== */}
              <div className="flex flex-col md:flex-row justify-center  items-center  gap-6 text-sm text-gray-700">
                <div className="flex flex-col justify-center  items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Leads from live conversations</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 ">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span>Leads from Flows</span>
                    <span className="text-gray-400 text-xs cursor-pointer">
                      ?
                    </span>
                  </div>
                  <p className="text-semibold text-gray-800 text-xl">0</p>
                </div>
              </div>

              {/* ==== GRAPH TOGGLE BUTTONS ==== */}
              <div className="flex items-center gap-2">
                {/* Line Graph */}
                <button
                  onClick={() => setGraphType("line")}
                  className={`p-2 rounded-full border shadow-sm transition ${
                    graphType === "line"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ShowChartIcon sx={{ fontSize: 18 }} />
                </button>

                {/* Bar Graph */}
                <button
                  onClick={() => setGraphType("bar")}
                  className={`p-2 rounded-full border shadow-sm transition ${
                    graphType === "bar"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <BarChartIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>

            {/* ==== GRAPH AREA ==== */}
            <div className="mt-4 h-[180px]  sm:h-[220px]   md:h-[300px] border rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              {graphType === "line" && (
                <Line data={leadsLineData} options={chartOptions} />
              )}
              {graphType === "bar" && (
                <Bar data={leadsBarData} options={chartOptions} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overviews;
