import React, { useState } from "react";
import moment from "moment";

import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import InputField from "@/components/layout/InputField";

import { IoSearch } from "react-icons/io5";

import { DataTable } from "@/components/layout/DataTable";
import { hlrLookupSummaryReport } from "@/apis/HlrLookup/HlrLookup";

import toast from "react-hot-toast";

const DayWiseHLRSummary = ({ selectedUser }) => {

  const [isFetching, setIsFetching] = useState(false);

  const [tableParams, setTableParams] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    mobileNo: "",
  });

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  /* ---------------- Columns ---------------- */

  const columns = [
    { field: "id", headerName: "ID", flex: 0, width: 100, },

    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "operator",
      headerName: "Operator",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "circle",
      headerName: "Circle",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 150,
    },
  ];

  /* ---------------- API CALL ---------------- */

  const handleSearch = async () => {
    try {
      setIsFetching(true);

      const payload = {
        fromdate: moment(tableParams.fromDate).format("YYYY-MM-DD"),
        todate: moment(tableParams.toDate).format("YYYY-MM-DD"),
        userSrNo: selectedUser || 0,
      };

      const res = await hlrLookupSummaryReport(payload);
      console.log(res)

      if (res && res.length > 0) {

        const formatted = res.map((item, index) => ({
          id: index + 1,

          mobile: item.mobile,
          status: item.status,
          operator: item.operator,
          circle: item.circle,
          date: item.date,
        }));

        setRows(formatted);

      } else {
        toast.error("No records found");
        setRows([]);
      }

    } catch (err) {
      console.error("HLR Summary Error:", err);
      toast.error("Failed to load summary report");
      setRows([]);

    } finally {
      setIsFetching(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full">

      {/* Filters */}
      <div className="flex flex-wrap items-end w-full gap-2 mb-5">

        <div className="w-full sm:w-52">
          <UniversalDatePicker
            label="From Date"
            placeholder="Select Date"
            value={tableParams.fromDate}
            onChange={(date) =>
              setTableParams((prev) => ({
                ...prev,
                fromDate: date,
              }))
            }
          />
        </div>

        <div className="w-full sm:w-52">
          <UniversalDatePicker
            label="To Date"
            placeholder="Select Date"
            value={tableParams.toDate}
            onChange={(date) =>
              setTableParams((prev) => ({
                ...prev,
                toDate: date,
              }))
            }
          />
        </div>

        {/* <div className="w-full sm:w-52">
          <InputField
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            value={tableParams.mobileNo}
            onChange={(e) =>
              setTableParams((prev) => ({
                ...prev,
                mobileNo: e.target.value,
              }))
            }
          />
        </div> */}

        <div className="w-full sm:w-52">

          <UniversalButton
            variant="outlined"
            color="primary"
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
            disabled={isFetching}
            onClick={handleSearch}
          />

        </div>

      </div>

      {/* Table */}
      <DataTable
        id="hlr-summary-table"
        name="hlr-summary-table"
        col={columns}
        rows={rows}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        checkboxSelection={false}
      />

    </div>
  );
};

export default DayWiseHLRSummary;
