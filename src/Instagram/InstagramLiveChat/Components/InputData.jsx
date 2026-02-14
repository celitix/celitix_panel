import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ICONS
import { CiMenuKebab } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { SearchOutlined } from "@mui/icons-material";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

// COMPONENTS
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import UniversalButton from "@/components/common/UniversalButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export const InputData = ({
  chatState,
  setChatState,
  activeTab,
  setActiveTab,
  dates,
  setDates,
  fetchAllConversations,
  isLoading,
  setSelectedInstaChat,
  setInstaChatData,
}) => {
  const [search, setSearch] = useState("");
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const panelRef = useRef(null);
  const datePickerRef = useRef(null);

  // useEffect(() => {
  //   function handleOutsideClick(e) {
  //     if (panelRef.current && !panelRef.current.contains(e.target)) {
  //       setOpenFilterDialog(false);
  //     }
  //   }

  //   if (openFilterDialog) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   }

  //   return () => document.removeEventListener("mousedown", handleOutsideClick);
  // }, [openFilterDialog]);

  useEffect(() => {
    function handleOutsideClick(e) {
      const clickedOutsidePanel =
        panelRef.current && !panelRef.current.contains(e.target);

      const clickedOutsideDatePicker =
        datePickerRef.current && !datePickerRef.current.contains(e.target);

      // Close only if clicking outside BOTH
      if (clickedOutsidePanel && clickedOutsideDatePicker) {
        setOpenFilterDialog(false);
      }
    }

    if (openFilterDialog) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openFilterDialog]);

  function handleSearch() {
    console.log("handle search");
  }

  const tabs = ["All", "Active", "InActive"];

  return (
    <motion.div
      className="px-2 rounded-b-2xl shadow-md pt-4 h-fit"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2 ">
          <div
            id="input"
            className="flex items-center w-full max-w-md mx-auto px-4 py-1.5 border border-gray-300 rounded-full bg-white"
          >
            <SearchOutlined
              className="text-gray-500 hover:text-blue-600 transition mr-2"
              sx={{ fontSize: "18px" }}
            />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search username..."
              className="flex-grow bg-transparent outline-none text-sm placeholder-gray-400"
              value={search}
              onChange={(e) => {
                if (typeof setSearch === "function") setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && typeof handleSearch === "function") {
                  handleSearch();
                }
              }}
            />

            <button
              onClick={() => {
                if (typeof handleSearch === "function") handleSearch();
              }}
              className="ml-2"
            >
              {/* <SearchOutlined className="text-gray-500 hover:text-blue-600 transition" /> */}
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="">
              <FaFilter
                onClick={() => setOpenFilterDialog(!openFilterDialog)}
              />

              {openFilterDialog && (
                <motion.div
                  ref={panelRef}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute w-[250px] h-auto bg-gray-100 md:left-120 left-30 border border-gray-200 rounded-lg shadow-lg z-99"
                >
                  <div className="flex items-center justify-between p-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700 text-sm">
                      Filters
                    </span>
                    <FilterAltOffIcon
                      className="text-gray-600 cursor-pointer"
                      onClick={() =>
                        setDates({
                          from: new Date(),
                          to: new Date(),

                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col p-5 gap-3">
                    <UniversalDatePicker
                      id="fromDate"
                      name="fromDate"
                      label="From:"
                      value={dates.from}
                      onChange={(e) => {
                        setDates((prev) => ({
                          ...prev,
                          from: e,
                        }));
                      }}
                      placeholder="yy-mm-dd"
                      tooltipContent="From"
                      tooltipPlacement="right"
                    />

                    <UniversalDatePicker
                      id="toDate"
                      name="toDate"
                      label="To:"
                      value={dates.to}
                      onChange={(e) => {
                        setDates((prev) => ({ ...prev, to: e }));
                      }}
                      placeholder="yy-mm-dd"
                      tooltipContent="To"
                      tooltipPlacement="right"
                    />
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <UniversalButton
                      icon={<IoSearch />}
                      label={isLoading ? "Searching..." : "Search"}
                      disabled={isLoading}
                      id="search"
                      name="search"
                      onClick={() => {
                        fetchAllConversations();
                        setOpenFilterDialog(false);
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* <CiMenuKebab /> */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 py-4">
        <div className="flex items-center gap-10 bg-gray-100 p-1 rounded-full shadow-inner">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedInstaChat([]);
                  setInstaChatData([]);
                }}
                className="relative px-5 py-2 font-medium text-sm rounded-full transition-all"
              >
                {/* {isActive && (
                  <motion.div
                    layoutId="capsule-pill"
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                    }}
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-md"
                  />
                )}

                <span
                  className={`relative z-10 ${isActive ? "text-white" : "text-gray-700"
                    }`}
                >
                  {tab}
                </span> */}
                {isActive && (
                  <motion.div
                    layoutId="capsule-pill"
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                    }}
                    // We use an absolute container with a padding of 1px or 2px 
                    // and a background gradient to simulate a border
                    className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
                  >
                    {/* This inner div creates the "hollow" effect so only the border shows */}
                    <div className="w-full h-full bg-white rounded-full" />
                  </motion.div>
                )}

                <span
                  className={`relative z-10 ${isActive
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#ee2a7b] to-[#6228d7] font-bold"
                    : "text-gray-500 font-medium"
                    }`}
                >
                  {tab}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
