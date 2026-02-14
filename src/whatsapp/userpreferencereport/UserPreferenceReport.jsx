import React, { useEffect, useState } from "react";
import moment from "moment";
import { getUserPreference } from "@/apis/whatsapp/whatsapp";
import UniversalButton from "@/components/common/UniversalButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomTabPanel } from "@/whatsapp/managetemplate/components/CustomTabPanel.jsx";
import Unsubscribe from "../unsubscribe/Unsubscribe";

import SummarizeIcon from '@mui/icons-material/Summarize';
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";

const TableSkeleton = ({ rows = 5 }) => (
  <tbody>
    {Array.from({ length: rows }).map((_, i) => (
      <tr key={i}>
        {Array.from({ length: 8 }).map((__, j) => (
          <td key={j} className="border px-3 py-3">
            <div className="h-3 bg-gray-200 rounded animate-pulse" />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

const UserPreferenceReport = () => {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  const fetchUserPreferences = async () => {
    try {
      setLoading(true);
      const res = await getUserPreference({ pageIndex, pageSize });

      if (res?.success) {
        setData(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalElements(res.data.totalElements || 0);
      }
    } catch (error) {
      console.error("Failed to fetch user preference report", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPreferences();
  }, [pageIndex, pageSize]);

  const optOutCount = data.filter(
    (d) => d.value?.toLowerCase() !== "start",
  ).length;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-gray-50 min-h-full p-5 rounded-xl">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Manage Campaigns Tabs"
        textColor="primary"
        indicatorColor="primary"
        scrollButtons="auto"
        allowScrollButtonsMobile
        className="w-full"
        variant="scrollable"
      >
        <Tab
          label={
            <span>
              {" "}
              <SummarizeIcon
                sx={{
                  fontSize: "1.5rem",
                }}
              />{" "}
              User Prefrence Report
            </span>
          }
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
            },
          }}
        />

        <Tab
          label={
            <span>
              {" "}
              <UnsubscribeIcon
                sx={{
                  fontSize: "1.5rem",
                }}
              />{" "}
              Unsubscribed Report
            </span>
          }
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
            },
          }}
        />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        {/* <div className="bg-gray-100 min-h-full p-5 rounded-xl"> */}
        {/* Header */}
        <div className="flex items-center md:justify-between flex-col md:flex-row my-4">
          <div></div>
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-blue-900">
              User Preference Report
            </h1>
            <p className="text-sm text-blue-700 mt-1">
              This report provides visibility into customer opt-in and opt-out
              preferences received via WhatsApp. <br /> It helps you stay
              compliant with messaging regulations and understand user
              engagement behavior.
            </p>
          </div>
          <div className="w-30 flex md:justify-end justify-center">
            <UniversalButton
              disabled={loading}
              label={loading ? "Refreshing..." : "Refresh"}
              onClick={() => fetchUserPreferences()}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-xs text-gray-500">Total Records</p>
            <p className="text-2xl font-semibold text-gray-800">
              {totalElements}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-xs text-gray-500">
              Opt-outs (STOP / UNSUBSCRIBE)
            </p>
            <p className="text-2xl font-semibold text-red-600">{optOutCount}</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-xs text-gray-500">Records per Page</p>
            <p className="text-2xl font-semibold text-blue-700">{pageSize}</p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          {/* Controls */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">
              Showing page {pageIndex} of {totalPages}
            </span>

            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => {
                setPageIndex(1);
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-blue-100 text-blue-900">
                <tr>
                  <th className="border px-3 py-2">#</th>
                  <th className="border px-3 py-2">Mobile Number</th>
                  <th className="border px-3 py-2">Preference</th>
                  <th className="border px-3 py-2">Category</th>
                  <th className="border px-3 py-2">WABA Number</th>
                  <th className="border px-3 py-2">Reason</th>
                  <th className="border px-3 py-2">Event Time</th>
                  <th className="border px-3 py-2">Recorded On</th>
                </tr>
              </thead>

              {loading ? (
                <TableSkeleton rows={5} />
              ) : (
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={item.srno} className="hover:bg-blue-50">
                        <td className="border px-3 py-2 text-center">
                          {(pageIndex - 1) * pageSize + index + 1}
                        </td>
                        <td className="border px-3 py-2">
                          {item.mobileNumber}
                        </td>
                        <td className="border px-3 py-2 font-medium capitalize">
                          {item.value}
                        </td>
                        <td className="border px-3 py-2">{item.category}</td>
                        <td className="border px-3 py-2">{item.wabaNumber}</td>
                        <td className="border px-3 py-2">{item.reason}</td>
                        <td className="border px-3 py-2">
                          {moment(item.timesTamp).format("DD MMM YYYY, HH:mm")}
                        </td>
                        <td className="border px-3 py-2">
                          {moment(item.insertTime).format("DD MMM YYYY, HH:mm")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-6 text-gray-500"
                      >
                        No preference data available
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={pageIndex === 1}
              onClick={() => setPageIndex((p) => p - 1)}
            >
              Previous
            </button>

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={pageIndex === totalPages}
              onClick={() => setPageIndex((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
        {/* </div> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Unsubscribe />
      </CustomTabPanel>
    </div>
  );
};

export default UserPreferenceReport;
