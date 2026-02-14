import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// MUI MATERIAL
import RefreshIcon from "@mui/icons-material/Refresh";

// ICONS
import { IoSearch } from "react-icons/io5";

// COMPONENT
import SMPPSummaryTable from "./components/SMPPSummaryTable";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// API
import { smppServiceWiseSummaryData } from "@/apis/admin/admin";

const SMPPSummary = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [isFetching, setIsFetching] = useState(false);
  const [summaryTableData, setSummaryTableData] = useState([]);

  // const handleSummarySearch = async () => {
  //     try {
  //       setIsFetching(true);
  //       const res = await smppServiceWiseSummaryData();

  //       if (Array.isArray(res) && res.length > 0) {
  //         setSummaryTableData(res);
  //       } else {
  //         setSummaryTableData([]);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching Summary data:", err);
  //       toast.error("Failed to fetch Summary data.");
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };

  //   const handleRefresh = () => {
  //     console.log("Refreshing data...");
  //     setData([...data]);
  //   };

  const handleSummarySearch = async () => {
    try {
      setIsFetching(true);
      const res = await smppServiceWiseSummaryData({
        year: selectedYear || "",
        month: selectedMonth || "1",
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });

      if (Array.isArray(res) && res.length > 0) {
        setSummaryTableData(res);
      } else if (Array.isArray(res?.data)) {
        setSummaryTableData(res.data);
      } else {
        setSummaryTableData([]);
      }
    } catch (err) {
      console.error("Error fetching Summary data:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleSummarySearch();
  }, [
    selectedYear,
    selectedMonth,
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  return (
    <div className="w-full ">
      <h1 className="flex justify-center items-center font-semibold text-2xl text-gray-700">
        SMPP SUMMARY
      </h1>
      <div className="flex flex-wrap w-full  items-end gap-2">
        <div className="flex flex-wrap gap-2">
          {/* Year Dropdown */}
          <div className="w-full sm:w-56">
            <DropdownWithSearch
              id="yearSelect"
              name="yearSelect"
              label="Select Year"
              tooltipContent="Select Year"
              tooltipPlacement="right"
              options={Array.from({ length: 2025 - 1990 + 1 }, (_, i) => {
                const year = 1990 + i;
                return { value: String(year), label: String(year) };
              }).reverse()}
              value={selectedYear}
              onChange={(value) => setSelectedYear(value)}
              placeholder="Select Year"
            />
          </div>

          {/* Month Dropdown */}
          <div className="w-full sm:w-56">
            <DropdownWithSearch
              id="monthSelect"
              name="monthSelect"
              label="Select Month"
              tooltipContent="Select Month"
              tooltipPlacement="right"
              options={[
                { value: 1, label: "January" },
                { value: 2, label: "February" },
                { value: 3, label: "March" },
                { value: 4, label: "April" },
                { value: 5, label: "May" },
                { value: 6, label: "June" },
                { value: 7, label: "July" },
                { value: 8, label: "August" },
                { value: 9, label: "September" },
                { value: 10, label: "October" },
                { value: 11, label: "November" },
                { value: 12, label: "December" },
              ]}
              value={selectedMonth}
              onChange={(value) => setSelectedMonth(value)}
              placeholder="Select Month"
            />
          </div>
        </div>
        <div className="flex item-end">
          <UniversalButton
            variant="outlined"
            color="primary"
            label={isFetching ? "Searching..." : "Search"}
            id="campaignsearch"
            name="campaignsearch"
            onClick={handleSummarySearch}
            icon={<IoSearch />}
            disabled={isFetching}
          />
        </div>
      </div>
      <div className="mt-5">
        <SMPPSummaryTable
          data={summaryTableData}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </div>
    </div>
  );
};

export default SMPPSummary;
