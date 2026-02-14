import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import Loader from "../components/Loader";

// API
import { liveMonitoringRCS, liveMonitoringRCSStatus } from "@/apis/admin/admin";

const DataCell = ({ children }) => (
  <td className="px-4 py-2 text-sm text-slate-700 whitespace-nowrap">
    {children}
  </td>
);

const Card = ({ title, time, children }) => (
  <div className="rounded-md shadow border border-slate-200 bg-white">
    <Header title={title} time={time} />
    <div className="p-0 h-100 mb-1 overflow-auto">{children}</div>
  </div>
);

const Header = ({ title, time }) => (
  <div className="flex items-center justify-between bg-[#E6F4FF] text-blue-600 rounded-t-md px-4 py-2">
    <h3 className="text-sm font-semibold tracking-wide uppercase">{title}</h3>
    <span className="text-xs tabular-nums">{time}</span>
  </div>
);

export default function GraphRcs() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(true);
  const [now, setNow] = useState("");
  const [statusRows, setStatusRows] = useState([]);



  // Status poll
  useEffect(() => {
    let mounted = true;
    const fetchStatus = async () => {
      try {
        const res = await liveMonitoringRCSStatus(); // expect { data: [...] }
        if (!mounted) return;
        const arr = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
            ? res
            : [];
        setStatusRows(arr);
        setStatusLoading(false);
      } catch (e) {
        if (!mounted) return;
        setStatusLoading(false);
        console.error(" Error fetching RCS status:", e);
      }
    };
    fetchStatus();
    const t = setInterval(fetchStatus, 3000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  // Data poll
  useEffect(() => {
    let mounted = true;
    const fetchOnce = async () => {
      try {
        const res = await liveMonitoringRCS(); // { success, message, data: [...] }
        if (!mounted) return;
        setRows(Array.isArray(res?.data) ? res.data : []);
        setLoading(false);
      } catch (e) {
        if (!mounted) return;
        setLoading(false);
        toast.error("Failed to load RCS data");
        console.error(e);
      }
    };
    fetchOnce();
    const poller = setInterval(fetchOnce, 3000);
    return () => {
      mounted = false;
      clearInterval(poller);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full p-4 bg-slate-100">
          <h1 className="text-2xl text-gray-700 font-medium text-center mb-4">RCS Live Monitoring</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* liveMonitoringRCS table */}
            <Card title="Live Monitoring" >

              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      User ID
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Min Time
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Busy
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Pending
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length ? (
                    rows.map((row, i) => (
                      <tr
                        key={row?.user_id ?? i}
                        className="odd:bg-white even:bg-slate-50"
                      >
                        <DataCell>{row?.user_id ?? "-"}</DataCell>
                        <DataCell>{row?.minTime ?? "-"}</DataCell>
                        <DataCell>{row?.busy ?? 0}</DataCell>
                        <DataCell>{row?.pending ?? 0}</DataCell>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-4 text-sm text-slate-500"
                      >
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </Card>

            {/* Status / Meta card (from liveMonitoringRCSStatus) */}
            <Card title="Live Monitoring Status">

              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      User ID
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Min Time
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Busy
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Pending
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {statusRows.length ? (
                    statusRows.map((item, index) => (
                      <tr
                        key={item?.user_id ?? index}
                        className="odd:bg-white even:bg-slate-50"
                      >
                        <DataCell>{item?.user_id ?? "-"}</DataCell>
                        <DataCell>{item?.minTime ?? "-"}</DataCell>
                        <DataCell>{item?.busy ?? 0}</DataCell>
                        <DataCell>{item?.pending ?? 0}</DataCell>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-4 text-sm text-slate-500"
                      >
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
