import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import Loader from "../components/Loader";
// API
import { liveMonitoringWhatsapp } from "@/apis/admin/admin";

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

const GraphWhatsapp = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    const fetchOnce = async () => {
      try {
        const res = await liveMonitoringWhatsapp(); // { success, message, data: [...] }
        if (!mounted) return;
        setRows(Array.isArray(res?.data) ? res.data : []);
        setLoading(false);
        // console.log("📦 liveMonitoringWhatsapp payload:", res);
      } catch (e) {
        if (!mounted) return;
        setLoading(false);
        toast.error("Failed to load Whatsapp data");
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
        <div className="w-full p-4 bg-slate-100 ">
          <h1 className="text-2xl text-gray-700 font-medium text-center mb-4">
            Whatsapp Live Monitoring
          </h1>
          {/* liveMonitoringRCS table */}
          <Card title="Live Monitoring">
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
        </div>
      )}
    </>
  );
};

export default GraphWhatsapp;
