import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FaRegCalendarAlt } from "react-icons/fa";

// COMPONENTS
import AnimatedDropdown from "../components/AnimatedDropdown";
import UniversalDatePicker from "../components/UniversalDatePicker";
import TemplateType from "./Templates/TemplateType";
import CampaignData from "./Campaigns/CampaignData";
import AnalyticsType from "./Analytics/AnalyticsType";
import WabaOverview from "./Overview/WabaOverview";


// API
import { getWhatsappCampaignScheduledReport } from "@/apis/whatsapp/whatsapp.js";
import {
  getWabaList,
  getWabaTemplateDetails,
  getAllCampaignWhatsapp,
  campaignSummaryInfo,
  getWhatsappCampaignReport,
  getSummaryReport,
} from "../../apis/whatsapp/whatsapp.js";
import { getUserDetails } from "@/apis/user/user";

const WabaDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wabaList, setWabaList] = useState(null);
  const [wabaAccountId, setWabaAccountId] = useState("");
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [selectedWabaMobileNo, setSelectedWabaMobileNo] = useState([]);
  const [selectedWabaSrno, setSelectedWabaSrno] = useState("");
  const [summaryReportData, setSummayReportData] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [campaignListData, setCampaignListData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });
  const [openCampaignList, setOpenCampaignList] = useState(false);
  const [showCalendarBox, setShowCalendarBox] = useState(false);

  useEffect(() => {
    if (!selectedWaba) return;

    const matchedWaba = wabaList.find((waba) => waba.mobileNo === selectedWaba);

    if (matchedWaba) {
      setSelectedWabaSrno(matchedWaba.wabaSrno);
    }
  }, [selectedWaba, wabaList]);

  useEffect(() => {
    if (wabaList && wabaList.length > 0) {
      setSelectedWaba(wabaList[0]);
    }
  }, [wabaList]);

  // WABA LIST
  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  const handleWabaSelect = async (value) => {
    setSelectedWaba(value);
    const selectedWabaDetails = wabaList.find(
      (waba) => waba.mobileNo === value
    );
    setSelectedWabaMobileNo(
      selectedWabaDetails ? [selectedWabaDetails.mobileNo] : []
    );
    setWabaAccountId(selectedWabaDetails?.wabaAccountId || "");
    if (selectedWabaDetails) {
      await fetchTemplateDetails(selectedWabaDetails.mobileNo);
    }
  };

  //  Fetch template details
  const fetchTemplateDetails = async (wabaNumber) => {
    try {
      const response = await getWabaTemplateDetails(wabaNumber, 0);
      if (response) {
        setTemplateList(response);

        const approvedTemplateList = response.filter(
          (template) => template.status === "APPROVED"
        );
        setTemplateOptions(approvedTemplateList);
      } else {
        toast.error("Failed to load templates!");
      }
    } catch (error) {
      console.error("Error fetching template details:", error);
      toast.error("Error fetching template details.");
    }
  };

  //   selecting a WABA
  // const handleWabaSelect = async (waba) => {
  //   setSelectedWaba(waba);
  //   setWabaAccountId(waba?.wabaAccountId || "");
  //   setSelectedWabaMobileNo([waba.mobileNo]);
  //   await fetchTemplateDetails(waba.mobileNo);
  // };

  // Year filteration
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const YearData = [
    {
      year: 2020,
      value: [
        "Jan",
        "Feb",
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
      ],
    },
    {
      year: 2021,
      value: [
        "Jan",
        "Feb",
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
      ],
    },
    {
      year: 2022,
      value: [
        "Jan",
        "Feb",
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
      ],
    },
    {
      year: 2023,
      value: [
        "Jan",
        "Feb",
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
      ],
    },
    {
      year: 2024,
      value: [
        "Jan",
        "Feb",
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
      ],
    },
    {
      year: 2025,
      value: [
        "Jan",
        "Feb",
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
      ],
    },
  ];

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth();

    const foundYear = YearData.find((item) => item.year === currentYear);
    if (foundYear) {
      setSelectedYear(currentYear);
      setSelectedMonth(foundYear.value[currentMonthIndex]);
    }
  }, []);

  //  find selected year's months
  const selectedData = YearData.find((item) => item.year === selectedYear);

  // useEffect(() => {
  //   const getSummaryReportWaba = async () => {
  //     if (!selectedWaba || !selectedWabaSrno) return;

  //     // Convert month name (e.g. "October") to month index (0-based)
  //     const monthIndex = new Date(
  //       `${selectedMonth} 1, ${selectedYear}`
  //     ).getMonth();

  //     // First day of the selected month
  //     const fromDate = `${selectedYear}-${String(monthIndex + 1).padStart(
  //       2,
  //       "0"
  //     )}-01`;

  //     // Last day of the selected month
  //     const now = new Date();
  //     let toDate;

  //     // If the selected month & year are the current ones → use today's date
  //     if (selectedYear === now.getFullYear() && monthIndex === now.getMonth()) {
  //       toDate = now.toISOString().split("T")[0];
  //     } else {
  //       // Otherwise, use the last date of that selected month
  //       const lastDay = new Date(selectedYear, monthIndex + 1, 0).getDate();
  //       toDate = `${selectedYear}-${String(monthIndex + 1).padStart(
  //         2,
  //         "0"
  //       )}-${String(lastDay).padStart(2, "0")}`;
  //     }

  //     const data = {
  //       fromDate: fromDate,
  //       toDate: toDate,
  //       summaryType: "date,user",
  //       campaignType: "",
  //       wabaNumber: selectedWabaSrno,
  //     };
  //     try {
  //       const res = await getSummaryReport(data);
  //       setSummayReportData(res);
  //     } catch (e) {
  //       toast.error("Something went wrong.", e);
  //     }
  //   };
  //   getSummaryReportWaba();
  // }, [selectedMonth, selectedYear]);

  const chips = ["OverView", "Templates", "Campaign", "Analytics", "Billing"];
  const [selectedChip, setSelectedChip] = useState(chips[0]);

  const [showFloatingCard, setShowFloatingCard] = useState(false);
  const cardRef = useRef();

  const scrollRef = useRef(null);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const scrollMonthRef = useRef(null);
  const scrollMonthLeft = () => {
    if (scrollMonthRef.current) {
      scrollMonthRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollMonthRight = () => {
    if (scrollMonthRef.current) {
      scrollMonthRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const calendarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!calendarRef.current?.contains(e.target)) {
        setShowCalendarBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-between items-start w-full px-4 lg:px-6 py-2 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-sm border border-gray-200"> */}
      <div
        className="flex flex-wrap lg:flex-nowrap gap-6 justify-between items-start w-full
  px-6 lg:px-8 py-3
  bg-white/30 backdrop-blur-md border border-white/20
  rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)]
  hover:shadow-[0_6px_40px_rgba(0,0,0,0.1)]
  transition-all duration-300"
      >
        <div className="relative">
          {/* WABA Selector */}
          <div className="relative w-56">
            <input
              type="text"
              readOnly
              value={selectedWaba?.name || ""}
              onClick={() => setOpenCampaignList((prev) => !prev)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm cursor-pointer hover:border-blue-400 transition"
              placeholder="Select WABA"
            />

            {/* Floating list */}
            {openCampaignList && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 shadow-lg rounded-md max-h-60 overflow-y-auto">
                {wabaList.map((waba) => (
                  <div
                    key={waba.mobileNo}
                    onClick={() => {
                      handleWabaSelect(waba);
                      setOpenCampaignList(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 transition 
                ${
                  selectedWaba?.mobileNo === waba.mobileNo
                    ? "bg-blue-100 font-medium"
                    : ""
                }`}
                  >
                    {waba.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chip Navigation */}
        <div className="flex  gap-2 justify-center lg:justify-start">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
          ${
            selectedChip === chip
              ? "bg-blue-400 text-white shadow-md border-1 border-white "
              : "bg-gray-50 shadow-md  border-2 border-blue-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="relative">
          <FaRegCalendarAlt
            onClick={() => setShowCalendarBox((prev) => !prev)}
            className="text-gray-600 text-lg cursor-pointer hover:text-blue-600 transition mt-2 text-[1.5rem]"
          />

          {showCalendarBox && (
            <>
              <div
                ref={calendarRef}
                className="absolute right-0 top-full mt-2 z-50 w-80 bg-gradient-to-br from-blue-50 via-white to-blue-50 border border-gray-200 rounded-2xl shadow-lg px-5 py-4 text-[12px] text-gray-700 animate-fadeIn"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-800">
                    Select Year
                  </h2>

                  <div className="relative">
                    <div
                      className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg px-2 py-1 cursor-pointer hover:shadow-md transition-all duration-200"
                      onClick={() => setShowCalendar((prev) => !prev)}
                    >
                      <span className="text-xs text-gray-700 font-medium">
                        Select Date Range
                      </span>
                      <KeyboardArrowDownSharpIcon
                        className={`transition-transform duration-300 text-gray-600 ${
                          showCalendar ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>

                    {showCalendar && (
                      <div className="absolute right-0 mt-2 w-65 bg-white border border-gray-200 shadow-xl rounded-xl p-4 animate-fadeIn z-50">
                        <div className="flex flex-col gap-4">
                          <UniversalDatePicker
                            id="fromDate"
                            name="fromDate"
                            label="From Date"
                            tooltipContent="Select From Date"
                            onChange={(e) =>
                              setCampaignListData((prev) => ({
                                ...prev,
                                fromDate: e,
                              }))
                            }
                            value={campaignListData.fromDate}
                            maxDate={new Date()}
                          />
                          <UniversalDatePicker
                            id="toDate"
                            name="toDate"
                            label="To Date"
                            tooltipContent="Select To Date"
                            onChange={(e) =>
                              setCampaignListData((prev) => ({
                                ...prev,
                                toDate: e,
                              }))
                            }
                            value={campaignListData.toDate}
                            maxDate={new Date()}
                          />
                        </div>
                        <div className="text-right mt-3">
                          <button
                            onClick={() => setShowCalendar(false)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Year Buttons */}
                <div className="relative w-[60%] flex items-center justify-center mx-auto py-2 select-none">
                  <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-gray-50 via-white/0 to-transparent pointer-events-none" />

                  <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-gray-50 via-white/0 to-transparent pointer-events-none" />

                  <button
                    className="absolute left-0 z-10 bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2 hover:bg-blue-50 hover:scale-105 transition-all duration-200"
                    onClick={scrollLeft}
                  >
                    <ArrowBackIosIcon
                      className="text-gray-600"
                      style={{ fontSize: 11 }}
                    />
                  </button>

                  {/* Scrollable Year List */}
                  <div
                    className="flex overflow-x-auto scrollbar-hide gap-2 px-12 py-2"
                    ref={scrollRef}
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {YearData.map((item) => (
                      <motion.button
                        key={item.year}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedYear(item.year)}
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap border
                          ${
                            selectedYear === item.year
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md border-blue-500"
                              : "bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200 text-gray-700 hover:shadow-md hover:-translate-y-[1px]"
                          }`}
                      >
                        {item.year}

                        {/* Active glow effect */}
                        {selectedYear === item.year && (
                          <motion.span
                            layoutId="yearGlow"
                            className="absolute inset-0 rounded-lg ring-2 ring-blue-200 ring-offset-2 pointer-events-none"
                            transition={{
                              type: "spring",
                              stiffness: 250,
                              damping: 20,
                            }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <button
                    className="absolute right-0 z-10 bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2 hover:bg-blue-50 hover:scale-105 transition-all duration-200"
                    onClick={scrollRight}
                  >
                    <ArrowForwardIosIcon
                      className="text-gray-600"
                      style={{ fontSize: 11 }}
                    />
                  </button>
                </div>

                {/* Months */}
                <AnimatePresence mode="wait">
                  <div className="relative w-[60%] flex items-center justify-center mx-auto">
                    {/* Left Arrow */}
                    <button
                      className="absolute left-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
                      onClick={scrollMonthLeft}
                    >
                      <ArrowBackIosIcon
                        className="text-gray-700"
                        style={{ fontSize: 10 }}
                      />
                    </button>

                    {/* Scrollable month list */}
                    {selectedData && (
                      <div
                        ref={scrollMonthRef}
                        className="flex overflow-x-auto scrollbar-hide gap-3 px-8 py-2 scroll-smooth"
                        style={{ scrollBehavior: "smooth" }}
                      >
                        {selectedData.value.map((month, index) => {
                          const now = new Date();
                          const currentYear = now.getFullYear();
                          const currentMonthIndex = now.getMonth();
                          const isFutureMonth =
                            selectedYear === currentYear &&
                            index > currentMonthIndex;

                          return (
                            <motion.div
                              key={index}
                              className="relative group flex-shrink-0"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <span
                                onClick={() =>
                                  !isFutureMonth && setSelectedMonth(month)
                                }
                                className={`border rounded-full px-3 py-1.5 text-xs shadow-sm transition cursor-pointer whitespace-nowrap
                ${
                  isFutureMonth
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : selectedMonth === month
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
                              >
                                {month}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {/* Right Arrow */}
                    <button
                      className="absolute right-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
                      onClick={scrollMonthRight}
                    >
                      <ArrowForwardIosIcon
                        className="text-gray-700"
                        style={{ fontSize: 10 }}
                      />
                    </button>
                  </div>
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chip Content Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedChip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-4 border rounded-lg bg-white shadow-sm"
        >
          {selectedChip === "OverView" && <WabaOverview />}
          {selectedChip === "Templates" && (
            <TemplateType selectedWaba={selectedWaba} />
          )}
          {selectedChip === "Campaign" && (
            <CampaignData
              selectedWaba={selectedWaba}
              wabaList={wabaList}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />
          )}
          {selectedChip === "Analytics" && (
            <AnalyticsType
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              YearData={YearData}
            />
          )}
          {selectedChip === "Billing" && <div>Billing Content Here</div>}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default WabaDashboard;
