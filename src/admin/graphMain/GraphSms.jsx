import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import Loader from "../components/Loader";

// API
import { liveMonitoringSendingService } from "@/apis/admin/admin";

// A single-file React dashboard that matches the provided design
// TailwindCSS classes are used for clean styling

const Header = ({ title, time }) => (
  <div className="flex items-center justify-between bg-[#E6F4FF] text-blue-600 rounded-t-md px-4 py-2">
    <h3 className="text-sm font-semibold tracking-wide uppercase">{title}</h3>
    <span className="text-xs tabular-nums">{time}</span>
  </div>
);

const Card = ({ title, time, children }) => (
  <div className="rounded-md shadow border border-slate-200  bg-white ">
    <Header title={title} time={time} />
    <div className="p-0 h-76 mb-1 overflow-auto">{children}</div>
  </div>
);

const DataCell = ({ children, className = "" }) => (
  <td
    className={
      "px-4 py-2 text-sm text-slate-800 border-b border-slate-200 " + className
    }
  >
    {children}
  </td>
);

const StatusDot = ({ color }) => (
  <span className={`inline-block w-3 h-3 rounded-sm ${color}`} />
);

const HeatCell = ({ status }) => {
  // const colors

  const color =
    status === "green"
      ? "bg-green-700"
      : status === "yellow"
        ? "bg-yellow-300"
        : "bg-red-700";
  return <div className={`h-6 w-6 ${color} rounded-sm shadow-inner`} />;
};

export default function GraphSms() {
  const [sendingServiceData, setsendingServiceData] = useState({});
  const [now, setNow] = useState("");
  const [maxSockets, setmaxSockets] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = (((d.getHours() + 11) % 12) + 1).toString().padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      const ampm = d.getHours() >= 12 ? "PM" : "AM";
      setNow(`${hh}:${mm}:${ss} ${ampm}`);

      // handleliveMonitoringSendingService("Sending Physical Status");
      // handleliveMonitoringSendingService("Offered Physical Status");
      // handleliveMonitoringSendingService("Sending Current Progress");
      // handleliveMonitoringSendingService("Offered Current Progress");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // --- Mock data matching the screenshot ---

  async function handleliveMonitoringSendingService(type) {
    try {
      const res = await liveMonitoringSendingService(type);
      // console.log("res-SendingService", res);
      if (!res?.success) {
        return toast.error(res?.message);
      }

      const saveData = {
        [type]: res?.data,
      };

      setsendingServiceData((prev) => {
        return {
          ...prev,
          ...saveData,
        };
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error("Something Went Wrong!");
    }
  }

  useEffect(() => {
    const rows = sendingServiceData?.["Sending Physical Status"] ?? [];
    const maxSockets = Math.max(
      0,
      ...rows.map((r) => Number(r?.NoOfBindConnection ?? 0))
    );
    setmaxSockets(maxSockets);
    // console.log("maxSockets", maxSockets);
  }, [sendingServiceData]);

  useEffect(() => {
    handleliveMonitoringSendingService("Sending Physical Status");
    handleliveMonitoringSendingService("Offered Physical Status");
    handleliveMonitoringSendingService("Sending Current Progress");
    handleliveMonitoringSendingService("Offered Current Progress");
  }, []);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      handleliveMonitoringSendingService("Sending Physical Status");
      handleliveMonitoringSendingService("Offered Physical Status");
      handleliveMonitoringSendingService("Sending Current Progress");
      handleliveMonitoringSendingService("Offered Current Progress");
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full p-4 bg-slate-100">
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* SERVICE WISE */}
            <Card title="Service Wise" time={now}>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Service Name
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Count
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sendingServiceData["Sending Current Progress"]?.map((row) => (
                    <tr key={row.name} className="odd:bg-white even:bg-slate-50">
                      <DataCell>{row.name}</DataCell>
                      <DataCell>{row.count}</DataCell>
                      <DataCell>{row.time}</DataCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* PLAN WISE */}
            <Card title="Plan Wise" time={now}>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Plan Wise
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Pending
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Busy
                    </th>
                    <th className="text-left px-4 py-2 text-black font-semibold">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sendingServiceData["Offered Current Progress"]?.map(
                    (row, index) => (
                      <tr key={index} className="odd:bg-white even:bg-slate-50">
                        <DataCell>{row.Service || "-"}</DataCell>
                        <DataCell>{row.Pending}</DataCell>
                        <DataCell>{row.Busy}</DataCell>
                        <DataCell>{row.MinTime}</DataCell>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Card>

            {/* SOCKETS STATUS (Heatmap) */}
            <Card title="Sockets Status" time={now} >
              <div className="p-1 relative">
                <div className="overflow-auto">
                  <table className="min-w-[640px] w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                        <th className="px-3 py-2 text-left text-black font-semibold">
                          Sockets
                        </th>
                        {Array.from({ length: maxSockets }).map((_, i) => (
                          <th
                            key={i}
                            className="px-1 py-1 text-left text-black font-semibold"
                          >
                            {i + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {sendingServiceData?.["Sending Physical Status"]?.map(
                        (op, rIdx) => (
                          <tr key={rIdx} className="odd:bg-white even:bg-slate-50">
                            <td className="px-3 py-1 text-sm font-medium text-slate-800 border-b border-slate-200 w-50">
                              {op?.service}
                            </td>

                            {Array.from({ length: maxSockets }).map((_, i) => {
                              // const colors = op?.colors?.split(",")
                              const colors = op?.colors ? op.colors.split(",") : [];
                              
                              return (
                                <td
                                  key={i}
                                  className="border-b border-slate-200 px-1 py-1 text-sm"
                                >

                                  {i < (Number(op?.NoOfBindConnection) || 0) ? (

                                    <HeatCell status={colors[i] || "default"} />
                                  ) : (
                                    <span className="text-slate-300">—</span>
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      )}

                      {/* 
                      {sendingServiceData?.["Sending Physical Status"]?.map(
                        (op, rIdx) => (
                          <tr key={rIdx} className="odd:bg-white even:bg-slate-50">
                            <td className="px-3 py-1 text-sm font-medium text-slate-800 border-b border-slate-200 w-50">
                              {op?.service}
                            </td>

                            {Array.from({ length: maxSockets }).map((_, i) => {
                              const colors = op?.colors?.split(",")
                              return (
                                <td
                                  key={i}
                                  className="border-b border-slate-200 px-1 py-1 text-sm"
                                >
                                  {i < (Number(op?.NoOfBindConnection) || 0) ? (
                                    <HeatCell status={colors[i] || "default"} />
                                  ) : (
                                    <span className="text-slate-300">—</span>
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      )} */}
                    </tbody>
                  </table>
                </div>
                {/* Legend */}
                {/* <div className="flex items-center gap-4 mt-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <StatusDot color="bg-green-700" /> <span>Transmitter</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot color="bg-yellow-300" /> <span>Receiver</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusDot color="bg-red-700" /> <span>Transiver</span>
              </div>
            </div> */}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <StatusDot color="bg-green-700" /> <span>Active</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <StatusDot color="bg-yellow-300" /> <span>Idle</span>
                    </div> */}
                  <div className="flex items-center gap-2">
                    <StatusDot color="bg-red-700" /> <span>Inactive</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* PLAN STATUS */}
            <Card title="Plan Status" time={now}>
              <div className="divide-y divide-slate-200">
                <div className="flex justify-between text-xs uppercase text-slate-500 bg-slate-50 px-4 py-2 w-">
                  <span className="text-black font-semibold w-[40%]">Plan Name</span>
                  <span className="text-black font-semibold w-[60%]">Status</span>
                </div>
                {sendingServiceData["Offered Physical Status"]?.map(
                  (row, index) => (
                    <div
                      key={index}
                      className="flex items-center px-4 py-0.5 w-[100%]"
                    >
                      <span className="text-sm text-slate-800 w-[40%]">
                        {row.service || "-"}
                      </span>
                      <div className="flex items-center gap-3 w-[60%]">
                        <div
                          className={`h-5 flex-1 rounded-sm pl-2 text-sm text-white ${row.status === 1 ? "bg-green-600" : "bg-red-500"
                            }`}
                        >
                          {row?.service2}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
