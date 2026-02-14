// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";

// const data = [
//     { date: "25 May", new: 25, old: 20 },
//     { date: "26 May", new: 30, old: 25 },
//     { date: "27 May", new: 150, old: 15 },
//     { date: "28 May", new: 25, old: 75 },
//     { date: "29 May", new: 40, old: 30 },
//     { date: "30 May", new: 35, old: 30 },
//     { date: "31 May", new: 35, old: 10 },
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//     if (!active || !payload) return null;

//     return (
//         <div className="bg-white shadow-md rounded-xl p-3 text-sm">
//             <p className="font-semibold mb-2">{label}</p>
//             <p className="flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
//                 New Patients: {payload[0]?.value}
//             </p>
//             <p className="flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
//                 Old Patients: {payload[1]?.value}
//             </p>
//         </div>
//     );
// };

// // const CustomTooltip = ({ active, payload, label, coordinate }) => {
// //   if (!active || !payload || !coordinate) return null;

// //   const offsetX = 0;
// //   const offsetY = -40;

// //   return (
// //     <div
// //       className="border bg-white shadow-md rounded-xl p-3 text-sm pointer-events-none"
// //       style={{
// //         position: "absolute",
// //         left: coordinate.x + offsetX,
// //         top: coordinate.y + offsetY,
// //         whiteSpace: "nowrap",
// //         maxWidth: 250,
// //         zIndex: 1000,
// //         opacity: active ? 1 : 0,
// //         transition: "left 0.3s ease, top 0.3s ease, opacity 0.3s ease",
// //         // Optional slight drop shadow smoothness
// //         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //       }}
// //     >
// //       <p className="font-semibold mb-2">{label}</p>
// //       <p className="flex items-center gap-2">
// //         <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
// //         New Patients: {payload[0]?.value}
// //       </p>
// //       <p className="flex items-center gap-2">
// //         <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
// //         Old Patients: {payload[1]?.value}
// //       </p>
// //     </div>
// //   );
// // };

// const PatientsStatistics = () => {
//     return (
//         <div className="bg-white rounded-2xl space-y-2 p-5 shadow-lg">
//             {/* Header */}
//             <div className="flex justify-between items-center ">
//                 <h2 className="font-semibold text-lg">Patients Statistics</h2>
//                 <button className="text-sm px-3 py-1 border hover:cursor-pointer hover:bg-gray-100 rounded-lg">
//                     View All
//                 </button>
//             </div>

//             <div className="   flex flex-col gap-4">

//                 {/* Sub Header */}
//                 <div className="flex justify-between items-center text-md ">
//                     <p>
//                         Total No of Patients : <span className="font-semibold">480</span>
//                     </p>
//                     <div className="flex gap-4">
//                         <span className="flex items-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
//                             New Patients
//                         </span>
//                         <span className="flex items-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
//                             Old Patients
//                         </span>
//                     </div>
//                 </div>

//                 {/* Chart */}
//                 <div className="relative transition-all duration-300   h-80 w-full">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart
//                             data={data}
//                             // style={{ border: "1px solid red" }}
//                             barSize={30}
//                             margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
//                         >
//                             <XAxis
//                                 dataKey="date"
//                                 height={20}
//                                 axisLine={false}
//                                 tickLine={false}
//                                 fontSize={12}
//                             />
//                             <YAxis
//                                 width={25}
//                                 axisLine={false}
//                                 tickLine={false}
//                                 fontSize={12}
//                             />
//                             <Tooltip
//                                 content={<CustomTooltip />}
//                                 cursor={{ fill: "rgba(30, 111, 217, 0.05)" }}

//                             />
//                             <Bar
//                                 dataKey="new"
//                                 stackId="a"
//                                 fill="#1e6fd9"
//                             // radius={[6, 6, 0, 0]}
//                             />
//                             <Bar
//                                 dataKey="old"
//                                 stackId="a"
//                                 fill="#cfe0f1"
//                                 radius={[6, 6, 0, 0]}
//                             />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PatientsStatistics;

import UniversalButton from "@/components/common/UniversalButton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import UniversalButton from "./UniversalButton";

/* ================================
   Generate last 7 days dynamically
================================ */
const generateLast7DaysData = () => {
  const today = new Date();

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - index));

    return {
      date,
      new: Math.floor(Math.random() * 100) + 20,
      old: Math.floor(Math.random() * 80) + 10,
    };
  });
};

const data = generateLast7DaysData();

/* ================================
   Custom Tooltip
================================ */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-3 text-sm">
      <p className="font-semibold mb-2">
        {new Date(label).toLocaleDateString("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      <p className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
        New Patients: {payload[0]?.value}
      </p>

      <p className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
        Old Patients: {payload[1]?.value}
      </p>
    </div>
  );
};

/* ================================
   Main Component
================================ */
const PatientsStatistics = () => {
  const totalPatients = data.reduce(
    (sum, item) => sum + item.new + item.old,
    0
  );

  return (
    <div className="bg-white rounded-2xl space-y-4 p-5 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Patients Statistics</h2>
        {/* <button className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-100">
          View All
        </button> */}

        <UniversalButton
          label="View All"
          variant="primary" // or "secondary" if you want gray
        />
      </div>

      {/* Sub Header */}
      <div className="flex justify-between items-center text-md">
        <p>
          Total No of Patients :{" "}
          <span className="font-semibold">{totalPatients}</span>
        </p>

        <div className="flex gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
            New Patients
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
            Old Patients
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={30}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })
              }
            />

            <YAxis axisLine={false} tickLine={false} fontSize={12} width={30} />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(30, 111, 217, 0.05)" }}
            />

            <Bar dataKey="new" stackId="a" fill="#1e6fd9" />
            <Bar
              dataKey="old"
              stackId="a"
              fill="#cfe0f1"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientsStatistics;

// with filter tabs

// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// /* ================================
//    FILTER OPTIONS
// ================================ */
// const FILTERS = [
//   { label: "This Week", value: "week" },
//   { label: "This Month", value: "month" },
//   { label: "This Year", value: "year" },
// ];

// /* ================================
//    MOCK BACKEND DATA (replace later)
// ================================ */
// const generateMockData = (filter) => {
//   const today = new Date();

//   if (filter === "week") {
//     return Array.from({ length: 7 }).map((_, i) => {
//       const date = new Date();
//       date.setDate(today.getDate() - (6 - i));
//       return {
//         date,
//         new: Math.floor(Math.random() * 60) + 20,
//         old: Math.floor(Math.random() * 50) + 10,
//       };
//     });
//   }

//   if (filter === "month") {
//     return Array.from({ length: 4 }).map((_, i) => {
//       const date = new Date(today.getFullYear(), today.getMonth(), 1 + i * 7);
//       return {
//         date,
//         new: Math.floor(Math.random() * 200) + 100,
//         old: Math.floor(Math.random() * 150) + 80,
//       };
//     });
//   }

//   // year
//   return Array.from({ length: 12 }).map((_, i) => {
//     const date = new Date(today.getFullYear(), i, 1);
//     return {
//       date,
//       new: Math.floor(Math.random() * 1000) + 500,
//       old: Math.floor(Math.random() * 900) + 400,
//     };
//   });
// };

// /* ================================
//    TOOLTIP
// ================================ */
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload || !payload.length) return null;

//   return (
//     <div className="bg-white shadow-md rounded-xl p-3 text-sm">
//       <p className="font-semibold mb-2">
//         {new Date(label).toLocaleDateString("en-IN", {
//           weekday: "short",
//           day: "2-digit",
//           month: "long",
//           year: "numeric",
//         })}
//       </p>

//       <p className="flex items-center gap-2">
//         <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
//         New Patients: {payload[0].value}
//       </p>

//       <p className="flex items-center gap-2">
//         <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
//         Old Patients: {payload[1].value}
//       </p>
//     </div>
//   );
// };

// /* ================================
//    MAIN COMPONENT
// ================================ */
// const PatientsStatistics = () => {
//   const [activeFilter, setActiveFilter] = useState("week");
//   const [data, setData] = useState([]);

//   /* ================================
//      FETCH DATA (Mock now, API later)
//   ================================ */
//   useEffect(() => {
//     // 🔄 Replace this with API later
//     // fetch(`/api/patients/stats?filter=${activeFilter}`)
//     //   .then(res => res.json())
//     //   .then(apiData => setData(apiData.map(d => ({ ...d, date: new Date(d.date) }))));

//     setData(generateMockData(activeFilter));
//   }, [activeFilter]);

//   const totalPatients = data.reduce(
//     (sum, item) => sum + item.new + item.old,
//     0
//   );

//   return (
//     <div className="bg-white rounded-2xl p-5 shadow-lg space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-semibold text-lg">Patients Statistics</h2>

//         <div className="flex gap-2">
//           {FILTERS.map((filter) => (
//             <button
//               key={filter.value}
//               onClick={() => setActiveFilter(filter.value)}
//               className={`px-3 py-1 text-sm rounded-lg border
//                 ${
//                   activeFilter === filter.value
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//             >
//               {filter.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Sub Header */}
//       <div className="flex justify-between items-center">
//         <p>
//           Total No of Patients :{" "}
//           <span className="font-semibold">{totalPatients}</span>
//         </p>

//         <div className="flex gap-4 text-sm">
//           <span className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
//             New Patients
//           </span>
//           <span className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
//             Old Patients
//           </span>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="h-80 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data} barSize={30}>
//             <XAxis
//               dataKey="date"
//               axisLine={false}
//               tickLine={false}
//               fontSize={12}
//               tickFormatter={(date) => {
//                 if (activeFilter === "year") {
//                   return new Date(date).toLocaleDateString("en-IN", {
//                     month: "short",
//                   });
//                 }

//                 return new Date(date).toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                 });
//               }}
//             />

//             <YAxis axisLine={false} tickLine={false} fontSize={12} />

//             <Tooltip
//               content={<CustomTooltip />}
//               cursor={{ fill: "rgba(30, 111, 217, 0.05)" }}
//             />

//             <Bar dataKey="new" stackId="a" fill="#1e6fd9" />
//             <Bar
//               dataKey="old"
//               stackId="a"
//               fill="#cfe0f1"
//               radius={[6, 6, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default PatientsStatistics;

// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// /* ================================
//    FILTER OPTIONS
// ================================ */
// const FILTER_OPTIONS = [
//   { label: "This Week", value: "week" },
//   { label: "This Month", value: "month" },
//   { label: "This Year", value: "year" },
//   { label: "Custom Range", value: "custom" },
// ];

// /* ================================
//    MOCK DATA (Replace with API)
// ================================ */
// const generateMockData = (filter, fromDate, toDate) => {
//   const today = new Date();

//   if (filter === "week") {
//     return Array.from({ length: 7 }).map((_, i) => {
//       const date = new Date();
//       date.setDate(today.getDate() - (6 - i));
//       return {
//         date,
//         new: Math.floor(Math.random() * 60) + 20,
//         old: Math.floor(Math.random() * 50) + 10,
//       };
//     });
//   }

//   if (filter === "month") {
//     return Array.from({ length: 4 }).map((_, i) => ({
//       date: new Date(today.getFullYear(), today.getMonth(), 1 + i * 7),
//       new: Math.floor(Math.random() * 200) + 100,
//       old: Math.floor(Math.random() * 150) + 80,
//     }));
//   }

//   if (filter === "year") {
//     return Array.from({ length: 12 }).map((_, i) => ({
//       date: new Date(today.getFullYear(), i, 1),
//       new: Math.floor(Math.random() * 1000) + 500,
//       old: Math.floor(Math.random() * 900) + 400,
//     }));
//   }

//   // Custom range
//   if (filter === "custom" && fromDate && toDate) {
//     const start = new Date(fromDate);
//     const end = new Date(toDate);
//     const days =
//       (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

//     return Array.from({ length: days + 1 }).map((_, i) => {
//       const date = new Date(start);
//       date.setDate(start.getDate() + i);
//       return {
//         date,
//         new: Math.floor(Math.random() * 70) + 20,
//         old: Math.floor(Math.random() * 60) + 10,
//       };
//     });
//   }

//   return [];
// };

// /* ================================
//    TOOLTIP
// ================================ */
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;

//   return (
//     <div className="bg-white shadow-md rounded-xl p-3 text-sm">
//       <p className="font-semibold mb-2">
//         {new Date(label).toLocaleDateString("en-IN", {
//           weekday: "short",
//           day: "2-digit",
//           month: "long",
//           year: "numeric",
//         })}
//       </p>

//       <p className="flex items-center gap-2">
//         <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
//         New Patients: {payload[0].value}
//       </p>

//       <p className="flex items-center gap-2">
//         <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
//         Old Patients: {payload[1].value}
//       </p>
//     </div>
//   );
// };

// /* ================================
//    MAIN COMPONENT
// ================================ */
// const PatientsStatistics = () => {
//   const [filter, setFilter] = useState("week");
//   const [data, setData] = useState([]);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   useEffect(() => {
//     // 🔌 Replace with API later
//     // fetch(`/api/patients/stats?filter=${filter}&from=${fromDate}&to=${toDate}`)
//     //   .then(res => res.json())
//     //   .then(apiData => setData(apiData.map(d => ({ ...d, date: new Date(d.date) }))));

//     setData(generateMockData(filter, fromDate, toDate));
//   }, [filter, fromDate, toDate]);

//   const totalPatients = data.reduce(
//     (sum, item) => sum + item.new + item.old,
//     0
//   );

//   return (
//     <div className="bg-white rounded-2xl p-5 shadow-lg space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-semibold text-lg">Patients Statistics</h2>

//         <div className="flex gap-2">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border rounded-lg px-3 py-1 text-sm"
//           >
//             {FILTER_OPTIONS.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>

//           <button className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-100">
//             View All
//           </button>
//         </div>
//       </div>

//       {/* Custom Date Picker */}
//       {filter === "custom" && (
//         <div className="flex gap-3 text-sm">
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="border rounded-lg px-3 py-1"
//           />
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="border rounded-lg px-3 py-1"
//           />
//         </div>
//       )}

//       {/* Sub Header */}
//       <div className="flex justify-between items-center">
//         <p>
//           Total No of Patients :{" "}
//           <span className="font-semibold">{totalPatients}</span>
//         </p>

//         <div className="flex gap-4 text-sm">
//           <span className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
//             New Patients
//           </span>
//           <span className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
//             Old Patients
//           </span>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data} barSize={30}>
//             <XAxis
//               dataKey="date"
//               axisLine={false}
//               tickLine={false}
//               fontSize={12}
//               tickFormatter={(date) =>
//                 filter === "year"
//                   ? new Date(date).toLocaleDateString("en-IN", {
//                       month: "short",
//                     })
//                   : new Date(date).toLocaleDateString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                     })
//               }
//             />
//             <YAxis axisLine={false} tickLine={false} fontSize={12} />
//             <Tooltip
//               content={<CustomTooltip />}
//               cursor={{ fill: "rgba(30, 111, 217, 0.05)" }}
//             />
//             <Bar dataKey="new" stackId="a" fill="#1e6fd9" />
//             <Bar dataKey="old" stackId="a" fill="#cfe0f1" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default PatientsStatistics;

// filter drop down

// import { useEffect, useMemo, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// /* ================================
//    FILTER OPTIONS
// ================================ */
// const FILTER_OPTIONS = [
//   { label: "This Week", value: "week" },
//   { label: "This Month", value: "month" },
//   { label: "This Year", value: "year" },
//   { label: "Custom Range", value: "custom" },
// ];

// /* ================================
//    MOCK BACKEND DATA (REPLACE LATER)
// ================================ */
// const generateRawData = (filter, fromDate, toDate) => {
//   const today = new Date();

//   if (filter === "week") {
//     return Array.from({ length: 7 }).map((_, i) => {
//       const date = new Date();
//       date.setDate(today.getDate() - (6 - i));
//       return {
//         date,
//         new: Math.floor(Math.random() * 60) + 20,
//         old: Math.floor(Math.random() * 50) + 10,
//       };
//     });
//   }

//   if (filter === "month") {
//     return Array.from({ length: 30 }).map((_, i) => ({
//       date: new Date(today.getFullYear(), today.getMonth(), i + 1),
//       new: Math.floor(Math.random() * 70) + 30,
//       old: Math.floor(Math.random() * 60) + 20,
//     }));
//   }

//   if (filter === "year") {
//     return Array.from({ length: 12 }).map((_, i) => ({
//       date: new Date(today.getFullYear(), i, 1),
//       new: Math.floor(Math.random() * 1000) + 500,
//       old: Math.floor(Math.random() * 900) + 400,
//     }));
//   }

//   // Custom range (daily raw data)
//   if (filter === "custom" && fromDate && toDate) {
//     const start = new Date(fromDate);
//     const end = new Date(toDate);
//     const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

//     return Array.from({ length: days }).map((_, i) => {
//       const date = new Date(start);
//       date.setDate(start.getDate() + i);
//       return {
//         date,
//         new: Math.floor(Math.random() * 70) + 20,
//         old: Math.floor(Math.random() * 60) + 10,
//       };
//     });
//   }

//   return [];
// };

// /* ================================
//    SMART AGGREGATION
// ================================ */
// const aggregateData = (data, fromDate, toDate, aggregateBy) => {
//   if (!fromDate || !toDate) return data;

//   const diffDays =
//     (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24);

//   // Determine aggregation type if not forced
//   let aggType = aggregateBy;
//   if (!aggType) {
//     if (diffDays <= 31) aggType = "day";
//     else if (diffDays <= 90) aggType = "week";
//     else aggType = "month";
//   }

//   if (aggType === "day") return data;

//   if (aggType === "week") {
//     const weekly = {};
//     data.forEach((item) => {
//       const year = item.date.getFullYear();
//       const month = item.date.getMonth();
//       const week = Math.ceil(item.date.getDate() / 7);
//       const key = `${year}-${month}-W${week}`;
//       if (!weekly[key]) {
//         // Use first date of the week for label
//         const date = new Date(year, month, (week - 1) * 7 + 1);
//         weekly[key] = { date, new: 0, old: 0 };
//       }
//       weekly[key].new += item.new;
//       weekly[key].old += item.old;
//     });
//     return Object.values(weekly);
//   }

//   if (aggType === "month") {
//     const monthly = {};
//     data.forEach((item) => {
//       const year = item.date.getFullYear();
//       const month = item.date.getMonth();
//       const key = `${year}-${month}`;
//       if (!monthly[key]) {
//         monthly[key] = { date: new Date(year, month, 1), new: 0, old: 0 };
//       }
//       monthly[key].new += item.new;
//       monthly[key].old += item.old;
//     });
//     return Object.values(monthly);
//   }

//   return data;
// };

// /* ================================
//    TOOLTIP
// ================================ */
// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;

//   return (
//     <div className="bg-white shadow-md rounded-xl p-3 text-sm">
//       <p className="font-semibold mb-2">
//         {new Date(label).toLocaleDateString("en-IN", {
//           day: "2-digit",
//           month: "long",
//           year: "numeric",
//         })}
//       </p>
//       <p className="flex items-center gap-2">
//         <span className="w-2 h-2 rounded-full bg-[#1e6fd9]" />
//         New Patients: {payload[0].value}
//       </p>
//       <p className="flex items-center gap-2">
//         <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
//         Old Patients: {payload[1].value}
//       </p>
//     </div>
//   );
// };

// /* ================================
//    MAIN COMPONENT
// ================================ */
// const PatientsStatistics = () => {
//   const [filter, setFilter] = useState("week");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [rawData, setRawData] = useState([]);

//   useEffect(() => {
//     setRawData(generateRawData(filter, fromDate, toDate));
//   }, [filter, fromDate, toDate]);

//   const data = useMemo(() => {
//     if (filter === "week") {
//       // Daily data for week
//       return rawData;
//     }
//     if (filter === "month") {
//       // Weekly aggregated data for month
//       if (rawData.length === 0) return [];
//       return aggregateData(
//         rawData,
//         rawData[0]?.date,
//         rawData[rawData.length - 1]?.date,
//         "week"
//       );
//     }
//     if (filter === "year") {
//       // Monthly aggregated data for year
//       if (rawData.length === 0) return [];
//       return aggregateData(
//         rawData,
//         rawData[0]?.date,
//         rawData[rawData.length - 1]?.date,
//         "month"
//       );
//     }
//     if (filter === "custom") {
//       return aggregateData(rawData, fromDate, toDate);
//     }
//     return rawData;
//   }, [rawData, filter, fromDate, toDate]);

//   const totalPatients = data.reduce(
//     (sum, item) => sum + item.new + item.old,
//     0
//   );

//   return (
//     <div className="bg-white rounded-2xl p-4   space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-semibold text-lg">Patients Statistics</h2>

//         <div className="flex gap-2">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border focus:outline-0 rounded-lg px-3 py-1 text-sm"
//           >
//             {FILTER_OPTIONS.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>

//           <button
//             className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
//             onClick={() => {
//               setFromDate("");
//               setToDate("");
//               setFilter("week");
//             }}
//           >
//             View All
//           </button>
//         </div>
//       </div>

//       {/* Custom Date Picker */}
//       {filter === "custom" && (
//         <div className="flex gap-3 text-sm">
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="border rounded-lg px-3 py-1"
//           />
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="border rounded-lg px-3 py-1"
//           />
//         </div>
//       )}

//       {/* Sub Header */}
//       <div className="flex justify-between items-center">
//         <p>
//           Total No of Patients :{" "}
//           <span className="font-semibold">{totalPatients}</span>
//         </p>

//         <div className="flex gap-4 text-sm">
//           <span className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-[#1e6fd9] "/>
//             New Patients
//           </span>
//           <span className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-[#cfe0f1]" />
//             Old Patients
//           </span>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className=" transition-all duration-300  h-80 ">
//         <ResponsiveContainer width="100%" height="100%">
//           {/* <BarChart
//             data={data}
//             barSize={filter === "week" ? 30 : filter === "month" ? 50 : 70}
//             barCategoryGap="30%"
//             margin={{ top: 0, right: 10, left: -10, bottom: 0 }}

//           > */}
//           <BarChart
//             data={data}
//             barSize={filter === "week" ? 30 : filter === "month" ? 40 : 30}
//             barCategoryGap="30%"
//             margin={{ top: 0, right: 0, left: 5, bottom: 0 }} // <-- same as old code, no negative margin
//           >
//             <XAxis
//               dataKey="date"
//               axisLine={false}
//               tickLine={false}
//               fontSize={12}
//               interval="preserveStartEnd"
//               padding={{ left: 0, right: 0 }} // <-- uncomment and set to 0 explicitly
//               tickFormatter={(date) => {
//                 const d = new Date(date);
//                 if (filter === "week" || filter === "custom") {
//                   // Show day & month, e.g. "20 Dec"
//                   return d.toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                   });
//                 }
//                 if (filter === "month") {
//                   // Show week label like "W1", "W2", ...
//                   const weekNum = Math.ceil(d.getDate() / 7);
//                   return `W${weekNum}`;
//                 }
//                 if (filter === "year") {
//                   // Show month short name, e.g. "Jan"
//                   return d.toLocaleDateString("en-IN", { month: "short" });
//                 }
//                 return d.toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                 });
//               }}
//             />
//             <YAxis axisLine={false} tickLine={false} fontSize={12} width={30} />
//             <Tooltip
//               content={<CustomTooltip />}
//               cursor={{ fill: "rgba(30,111,217,0.05)" }}
//             />
//             <Bar dataKey="new" stackId="a" fill="#1e6fd9" />
//             <Bar
//               dataKey="old"
//               stackId="a"
//               fill="#cfe0f1"
//               radius={[6, 6, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//     </div>
//   );
// };

// export default PatientsStatistics;
