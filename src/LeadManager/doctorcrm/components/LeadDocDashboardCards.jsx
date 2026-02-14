

// import { FiShoppingBag, FiShoppingCart, FiCheckCircle, FiClock } from 'react-icons/fi';
// import { HiArrowTrendingUp } from 'react-icons/hi2';

// const DashboardCards = () => {
//   const cards = [
//     {
//       icon: <FiShoppingBag className="w-6 h-6" />,
//       title: 'Total Leads',
//       value: '200',
//       bgGradient: 'from-blue-200 to-blue-50',
//       iconBg: 'bg-blue-500',
//       blobColor: 'bg-blue-300'
//     },
//     {
//       icon: <FiShoppingCart className="w-6 h-6" />,
//       title: 'Today Leads',
//       value: '50',
//       bgGradient: 'from-orange-100 to-orange-50',
//       iconBg: 'bg-orange-500',
//       blobColor: 'bg-orange-300'
//     },
//     {
//       icon: <FiCheckCircle className="w-6 h-6" />,
//       title: 'Completed Leads',
//       value: '20',
//       bgGradient: 'from-green-100 to-green-50',
//       iconBg: 'bg-green-500',
//       blobColor: 'bg-green-300'
//     },
//     {
//       icon: <FiClock className="w-6 h-6" />,
//       title: 'Pending Leads',
//       value: '10',
//       bgGradient: 'from-red-100 to-red-50',
//       iconBg: 'bg-red-500',
//       blobColor: 'bg-red-300'
//     }
//   ];

//   return (
//     // <div className=" py-4">
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-6">
//       {cards.map((card, index) => (
//         <div
//           key={index}
//           className={`flex flex-col gap-2 relative w-full shadow-xl bg-linear-to-br ${card.bgGradient} rounded-2xl p-5 overflow-hidden hover:scale-105 transition-all duration-300 `}
//         >
//           {/* Circular rings decoration */}
//           <div className="absolute -top-12 -right-10">
//             <div className={`w-32 h-32 ${card.blobColor} rounded-full opacity-20`}></div>
//             <div className={`absolute top-4 left-4 w-24 h-24 ${card.blobColor} rounded-full opacity-30`}></div>
//             <div className={`absolute top-8 left-8 w-16 h-16 ${card.blobColor} rounded-full opacity-40`}></div>
//           </div>
            
//           {/* Icon circle */}
//           <div className={`w-11 h-11 shadow-xl ${card.iconBg} text-white rounded-full flex items-center justify-center relative z-10`}>
//             {card.icon}
//           </div>

//           {/* Title */}
//           <p className="text-gray-600 text-base font-medium relative z-10">
//             {card.title}
//           </p>

//           {/* Value with arrow */}
//           <div className="flex items-center gap-1.5 relative z-10">
//             <span className="text-xl font-bold text-gray-900">
//               {card.value}
//             </span>
//             <HiArrowTrendingUp className="w-4 h-4 text-gray-700" />
//           </div>
//         </div>
//       ))}
//     </div>
//     // </div>
//   );
// };

// export default DashboardCards;




// pages/Dashboard.jsx
// import StatCard from "@/components/StatCard";
import {
  FiCalendar,
  FiScissors,
  FiUserPlus,
  FiStar,
} from "react-icons/fi";
import StatCard from "./StatCard";

const appointments = [
  { 
    value: 150,
    date: "2025-12-11", 
  },
  { 
    value: 45,
    date: "2025-12-12",
   },
  { 
    value: 100,
    date: "2025-12-13",
   },
  { 
    value: 60,
    date: "2025-12-14",
   },
  { 
    value: 200,
    date: "2025-12-15",
   },
  { 
    value: 50,
    date: "2025-12-16",
   },
  { 
    value: 200,
    date: "2025-12-17",
   },
  { 
    value: 96,
    date: "2025-12-18",
   },
];

const totalLeads = [
  { 
    value: 215,
    date: "2025-12-11"
  },
  { 
    value: 120,
    date: "2025-12-12"
  },
  { 
    value: 310,
    date: "2025-12-13"
  },
  { 
    value: 260,
    date: "2025-12-14"
  },
  { 
    value: 514,
    date: "2025-12-15"
  },
  { 
    value: 250,
    date: "2025-12-16"
  },
  { 
    value: 110,
    date: "2025-12-17"
  },
  { 
    value: 390,
    date: "2025-12-18"
  },
];

const newLeads = [
  { 
    value: 20,
    date: "2025-12-11"
  },
  { 
    value: 30,
    date: "2025-12-12"
  },
  { 
    value: 25,
    date: "2025-12-13"
  },
  { 
    value: 40,
    date: "2025-12-14"
  },
  { 
    value: 35,
    date: "2025-12-15"
  },
  { 
    value: 25,
    date: "2025-12-16"
  },
  { 
    value: 40,
    date: "2025-12-17"
  },
  { 
    value: 35,
    date: "2025-12-18"
  },
];

const pendingFollowUps = [
  { 
    value: 80,
    date: "2025-12-11",
  },
  { 
    value: 145,
    date: "2025-12-12",
  },
  { 
    value: 90,
    date: "2025-12-13",
  },
  { 
    value: 130,
    date: "2025-12-14",
  },
  { 
    value: 50,
    date: "2025-12-15",
  },
  { 
    value: 115,
    date: "2025-12-16",
  },
  { 
    value: 75,
    date: "2025-12-17",
  },
  { 
    value: 170,
    date: "2025-12-18",
  },
];




const LeadDocDashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Leads"
        value="2860"
        icon={FiScissors}
        bgColor="bg-orange-100"
        chartColor="#f97316"
        data={totalLeads}
      />

      <StatCard
        title="Appointments"
        value="839"
        icon={FiCalendar}
        bgColor="bg-purple-100"
        chartColor="#7c3aed"
        data={appointments}
      />


      <StatCard
        title="New Leads"
        value="129"
        icon={FiUserPlus}
        bgColor="bg-green-100"
        chartColor="#22c55e"
        data={newLeads}
      />

      <StatCard
        title="Pending Follow-ups"
        value="425"
        icon={FiStar}
        bgColor="bg-blue-100"
        chartColor="#3b82f6"
        data={pendingFollowUps}
      />
    </div>
  );
};

export default LeadDocDashboardCards;
