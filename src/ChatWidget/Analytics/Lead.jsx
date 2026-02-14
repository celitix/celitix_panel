import React, { useState } from "react";

// ICONS
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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

const Lead = () => {
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
  return (
    <div className="p-3 md:p-4 w-full bg-white border border-gray-300 rounded min-h-screen relative overflow-visible">
      <h2 className="text-xl font-semibold text-gray-800">Leads </h2>

    
        <button
          onClick={() => setOpen(!open)}
          className="mt-4 flex items-center gap-2 border rounded-lg bg-white px-4 py-2 shadow text-sm"
        >
          Select Date Range
          <ChevronDown size={16} />
        </button>

        {open && (
        <div className=" absolute left-0 mt-2 bg-white shadow-xl border rounded-xl w-full md:w-[75%] flex flex-col md:flex-row  z-50 p-3 md:p-0 max-h-[80vh] overflow-auto">
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
           ${selectedRange.label === item
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
   


      <div className="mt-8 h-full md:h-[230px] border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-col p-6 md:p-4 ">
        <h2> Your insights will be available soon</h2>
        We're collecting data for you.
        <p> We are still gathering conversion data for you. Come back in a few days to start tracking conversions on your website.
          <br />  We’ll show you actionable insights, so you'll see what’s working and what’s not.</p>
      </div>
    </div>
  );
};

export default Lead;
