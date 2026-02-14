// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Cardiology", value: 30, color: "#3b82f6" },
//   { name: "Neurology", value: 18, color: "#020617" },
//   { name: "Dermatology", value: 15, color: "#7c3aed" },
//   { name: "Orthopedics", value: 20, color: "#f97316" },
//   { name: "Urology", value: 10, color: "#f59e0b" },
//   { name: "Radiology", value: 25, color: "#1e3a8a" },
// ];

// export default function TopDepartments() {
//   return (
//     <div className="bg-white rounded-xl border p-4 w-full max-w-md">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold text-lg">Top Departments</h3>
//         <button className="text-sm border px-3 py-1 rounded-md">
//           View All
//         </button>
//       </div>

//       {/* Chart + Legend */}
//       <div className="flex items-center gap-6">
//         {/* Chart */}
//         <div className="relative w-40 h-40">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 innerRadius={55}
//                 outerRadius={70}
//                 paddingAngle={3}
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={index} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>

//           {/* Center Text */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-sm text-gray-500">Appointments</span>
//             <span className="text-xl font-bold">3656</span>
//           </div>
//         </div>

//         {/* Legend */}
//         <div className="space-y-2">
//           {data.map((item, index) => (
//             <div key={index} className="flex items-center gap-2 text-sm">
//               <span
//                 className="w-2.5 h-2.5 rounded-full"
//                 style={{ backgroundColor: item.color }}
//               />
//               {item.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Stats */}
//       <div className="grid grid-cols-2 border rounded-lg mt-6">
//         <div className="p-3 text-center border-r">
//           <p className="font-semibold">$2512.32</p>
//           <p className="text-sm text-gray-500">Revenue Generated</p>
//         </div>
//         <div className="p-3 text-center">
//           <p className="font-semibold">3125+</p>
//           <p className="text-sm text-gray-500">
//             Appointments last month
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import UniversalButton from "@/components/common/UniversalButton";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import UniversalButton from "./UniversalButton";

const data = [
  { department: "Radiology", value: 50, color: "#1e3a8a" },
  { department: "Cardiology", value: 45, color: "#3b82f6" },
  { department: "Urology", value: 20, color: "#f59e0b" },
  { department: "Orthopedics", value: 20, color: "#f97316" },
  { department: "Neurology", value: 18, color: "#020617" },
  { department: "Dermatology", value: 15, color: "#7c3aed" },
  { department: "Pediatrics", value: 12, color: "#10b981" },
  { department: "Others", value: 19, color: "#d1d5db" }, // Gray color
];

export default function TopDepartments() {
  // Store selected slice index, default null (none selected)
  const [selectedIndex, setSelectedIndex] = useState(null);

  const totalAppointments = data.reduce((acc, curr) => acc + curr.value, 0);

  function selectedNumbers(index) {
    return index !== null ? data[index].value : totalAppointments;
  }

  return (
    <div className="bg-white rounded-2xl space-y-4  p-4 w-full ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Top Departments</h3>
        <UniversalButton
          label="View All"
          variant="primary" // or "secondary" if you want gray
        />
      </div>

      {/* Chart + Legend */}
      <div className="flex flex-col md:flex-row  justify-center items-center gap-4">
        {/* Chart */}
        <div className="relative w-42  h-40 ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={70}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                    cursor="pointer"
                    outerRadius={selectedIndex === index ? 80 : 70} // This prop on Cell does nothing but just showing idea
                    onClick={() => setSelectedIndex(index)}
                    style={{
                      transform:
                        selectedIndex === index ? "scale(1.1)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "transform 0.3s ease",
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500">
              {selectedIndex !== null
                ? data[selectedIndex].department
                // : "Appointments" }
                : <span className="text-center flex " > Total <br/> Appointments </span> }
            </span>
            <span className="text-xl font-bold">
              {selectedNumbers(selectedIndex)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1 h-70   overflow-y-auto ">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded-md ${
                selectedIndex === index
                  ? "bg-[#b0cfee89]  "
                  : "hover:bg-[#dce0e4]"
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.department}
            </div>
          ))}
          <div
            className={` text-blue-600 text-sm cursor-pointer ${
              selectedIndex === null ? "font-semibold" : ""
            }`}
            onClick={() => setSelectedIndex(null)}
          >
            Clear Selection
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      {/* <div className="grid grid-cols-2 border rounded-lg mt-6">
        <div className="p-3 text-center border-r">
          <p className="font-semibold">$2512.32</p>
          <p className="text-sm text-gray-500">Revenue Generated</p>
        </div>
        <div className="p-3 text-center">
          <p className="font-semibold">3125+</p>
          <p className="text-sm text-gray-500">Appointments last month</p>
        </div>
      </div> */}
    </div>
  );
}

// import { PieChart, Pie, Label } from 'recharts';

// // #region Sample data
// const data = [
//   { name: 'Group A', value: 400, fill: '#0088FE' },
//   { name: 'Group B', value: 300, fill: '#00C49F' },
//   { name: 'Group C', value: 300, fill: '#FFBB28' },
//   { name: 'Group D', value: 200, fill: '#FF8042' },
// ];

// // #endregion
// const MyPie = () => (
//   <Pie data={data} dataKey="value" nameKey="name" outerRadius="80%" innerRadius="60%" isAnimationActive={false} />
// );

// // const data = [
// //   { name: "Cardiology", value: 30, color: "#3b82f6" },
// //   { name: "Neurology", value: 18, color: "#020617" },
// //   { name: "Dermatology", value: 15, color: "#7c3aed" },
// //   { name: "Orthopedics", value: 20, color: "#f97316" },
// //   { name: "Urology", value: 10, color: "#f59e0b" },
// //   { name: "Radiology", value: 25, color: "#1e3a8a" },
// // ];

// // Custom tooltip component
// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const { name, value, payload: entry } = payload[0];
//     return (
//       <div className="bg-white border rounded-md p-2 shadow-md text-sm">
//         <p className="font-semibold" style={{ color: entry.color }}>
//           {name}
//         </p>
//         <p>{value} appointments</p>
//       </div>
//     );
//   }
//   return null;
// };

// export default function TopDepartments() {
//   return (
//     <div className="bg-white rounded-xl border p-4 w-full max-w-md">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold text-lg">Top Departments</h3>
//         <button className="text-sm border px-3 py-1 rounded-md">
//           View All
//         </button>
//       </div>

//       {/* Chart + Legend */}
//       <div className="flex items-center gap-6">

//         {/* <div className="relative w-40 h-40">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 innerRadius={55}
//                 outerRadius={70}
//                 paddingAngle={3}
//                 // Add nameKey so tooltip can access the name
//                 nameKey="name"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={index} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>

//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-sm text-gray-500">Appointments</span>
//             <span className="text-xl font-bold">3656</span>
//           </div>
//         </div> */}

//         <div
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         width: '100%',
//         minHeight: '300px',
//         border: '1px solid #ccc',
//         padding: '10px',
//         justifyContent: 'space-around',
//         alignItems: 'stretch',
//       }}
//     >
//       <PieChart responsive style={{ height: 'calc(100% - 20px)', width: '33%', flex: '1 1 200px', aspectRatio: 1 }}>
//         <MyPie />
//         <Label position="center" fill="#666">
//           Flex: 1 1 200px
//         </Label>
//       </PieChart>

//       <PieChart responsive style={{ height: 'calc(100% - 20px)', width: '33%', maxWidth: '300px', aspectRatio: 1 }}>
//         <MyPie />
//         <Label position="center" fill="#666">
//           maxWidth: &#39;300px&#39;
//         </Label>
//       </PieChart>

//       <PieChart responsive style={{ height: 'calc(100% - 20px)', maxHeight: '20vh', width: '33%', aspectRatio: 1 }}>
//         <MyPie />
//         <Label position="center" fill="#666">
//           maxHeight: &#39;20vh&#39;
//         </Label>
//       </PieChart>
//     </div>

//         {/* Legend */}
//         <div className="space-y-2">
//           {data.map((item, index) => (
//             <div key={index} className="flex items-center gap-2 text-sm">
//               <span
//                 className="w-2.5 h-2.5 rounded-full"
//                 style={{ backgroundColor: item.color }}
//               />
//               {item.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Stats */}
//       <div className="grid grid-cols-2 border rounded-lg mt-6">
//         <div className="p-3 text-center border-r">
//           <p className="font-semibold">$2512.32</p>
//           <p className="text-sm text-gray-500">Revenue Generated</p>
//         </div>
//         <div className="p-3 text-center">
//           <p className="font-semibold">3125+</p>
//           <p className="text-sm text-gray-500">Appointments last month</p>
//         </div>
//       </div>
//     </div>
//   );
// }
