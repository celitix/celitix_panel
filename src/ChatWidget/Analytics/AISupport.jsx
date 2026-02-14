import React, { useState } from "react";

// ICONS
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";

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

const AISupport = () => {
  const [activeTab, setActiveTab] = useState("Live conversations");

  const tabs = ["Live conversations", "Emails", "Knowledge performance"];

  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const [graphType, setGraphType] = useState("line");

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

  const [openDaily, setOpenDaily] = useState(false);
  return (
    <div className="p-3 md:p-4 w-full bg-white border border-gray-300 rounded min-h-screen relative overflow-visible">
      <h2 className="text-xl font-semibold text-gray-800">AI Support </h2>

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

              {/* Help icon */}
              <span className="p-1 rounded shadow bg-white text-gray-500 border hover:bg-gray-100">
                <HelpCenterOutlinedIcon sx={{ fontSize: 16 }} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Live conversations" && (
        <>
          <div className="flex flex-wrap justify-center md:justify-between items-center mb-4 gap-5">
            <button
              onClick={() => setOpen(!open)}
              className="mt-4 flex items-center gap-2 border rounded-lg bg-white px-4 py-2 shadow text-sm"
            >
              Select Date Range
              <ChevronDown size={16} />
            </button>

            {open && (
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

                {/* PRESET RANGES */}
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

                  {/* APPLY + CANCEL */}
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

            <div className="relative mt-4">
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

          {/* ===== SUMMARY STATS ROW ===== */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {/*  All conversations */}
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                All conversations
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>
              <div className="text-3xl font-semibold mt-2">0</div>
            </div>

            {/* Resolved conversations */}
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                Resolved conversations
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>
              <div className="text-3xl font-semibold mt-2">0</div>
            </div>

            {/* Resolution rate */}
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                Resolution rate
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>
              <div className="text-3xl font-semibold mt-2">0</div>
            </div>

            {/* Transferred to agent */}
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                Transferred to agent
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>
              <div className="text-3xl font-semibold mt-2">0</div>
            </div>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* LEFT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  Conversation resolution
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>

            {/* RIGHT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                Conversations resolution share
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-5 shadow-sm bg-white mt-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                Resolution rate
              </div>
            </div>

            <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
              We're collecting data for you.
              <p> Come back later for updates.</p>
            </div>
          </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* LEFT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  Asked questions
                </div>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>

            {/* RIGHT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                Answer rate
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* LEFT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  Answers by intent
                </div>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>

            {/* RIGHT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                Satisfaction rate
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "Emails" && (
        <>
        <div className="flex flex-wrap justify-center md:justify-between items-center mb-4 gap-5">
            <button
              onClick={() => setOpen(!open)}
              className="mt-4 flex items-center gap-2 border rounded-lg bg-white px-4 py-2 shadow text-sm"
            >
              Select Date Range
              <ChevronDown size={16} />
            </button>

            {open && (
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

                {/* PRESET RANGES */}
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

                  {/* APPLY + CANCEL */}
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

            <div className="relative mt-4">
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
          {/* ===== SUMMARY STATS ROW ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {/*  All conversations */}
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                All conversations
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>
              <div className="text-3xl font-semibold mt-2">0</div>
            </div>

            {/* Resolved conversations */}
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                Resolved conversations
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>
              <div className="text-3xl font-semibold mt-2">0</div>
            </div>

            {/* Resolution rate */}
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                Resolution rate
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>
              <div className="text-3xl font-semibold mt-2">0</div>
            </div>

            {/* Transferred to agent */}
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                Transferred to agent
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>
              <div className="text-3xl font-semibold mt-2">0</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* LEFT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  Emails resolution
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>

            {/* RIGHT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                Emails resolution share
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-5 shadow-sm bg-white mt-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                Answers to first emails
              </div>
            </div>

            <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
              We're collecting data for you.
              <p> Come back later for updates.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* LEFT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                  Resolution rate
                  <span className="text-gray-400 text-xs cursor-pointer">
                    ?
                  </span>
                </div>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>

            {/* RIGHT BOX */}
            <div className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                First-answer rate
                <span className="text-gray-400 text-xs cursor-pointer">?</span>
              </div>

              <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
                We're collecting data for you.
                <p> Come back later for updates.</p>
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-5 shadow-sm bg-white mt-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                Satisfaction rate
              </div>
            </div>

            <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
              We're collecting data for you.
              <p> Come back later for updates.</p>
            </div>
          </div>
        </>
      )}

      {activeTab === "Knowledge performance" && (
        <div className="mt-8 h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col">
          We're collecting data for you.
          <p> Come back later for updates.</p>
        </div>
      )}
    </div>
  );
};

export default AISupport;
