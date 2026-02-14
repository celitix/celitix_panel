// import React from "react";
// import { useState } from "react";

// const doctors = [
//   {
//     id: 1,
//     name: "Dr. Rahul Sharma",
//     specialization: "Cardiologist",
//     experience: "10 Years",
//     phone: "9876543210",
//     email: "rahul@gmail.com",
//   },
//   {
//     id: 2,
//     name: "Dr. Neha Verma",
//     specialization: "Dermatologist",
//     experience: "7 Years",
//     phone: "9876501234",
//     email: "neha@gmail.com",
//   },
//   {
//     id: 3,
//     name: "Dr. Amit Singh",
//     specialization: "Orthopedic",
//     experience: "12 Years",
//     phone: "9876512345",
//     email: "amit@gmail.com",
//   },
// ];

// const Doctors = () => {
//   const [view, setView] = useState("grid");

//   return (
//     <div>
//       <section>
//         <div className="container mt-4">
//           {/* Header + Buttons */}
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5>Doctors List</h5>

//             <div className="btn-group">
//               <button
//                 className={`btn btn-sm ${
//                   view === "grid" ? "btn-primary" : "btn-outline-primary"
//                 }`}
//                 onClick={() => setView("grid")}
//               >
//                 Grid View
//               </button>

//               <button
//                 className={`btn btn-sm ${
//                   view === "table" ? "btn-primary" : "btn-outline-primary"
//                 }`}
//                 onClick={() => setView("table")}
//               >
//                 Table View
//               </button>
//             </div>
//           </div>

//           {/* Views */}
//           {view === "grid" ? (
//             // <DoctorsGrid />
//             <div className="row">
//               {doctors.map((doc) => (
//                 <div className="col-md-4 mb-3" key={doc.id}>
//                   <div className="card shadow-sm h-100">
//                     <div className="card-body">
//                       <h6 className="fw-bold">{doc.name}</h6>
//                       <p className="mb-1">
//                         <strong>Specialization:</strong> {doc.specialization}
//                       </p>
//                       <p className="mb-1">
//                         <strong>Experience:</strong> {doc.experience}
//                       </p>
//                       <p className="mb-1">
//                         <strong>Phone:</strong> {doc.phone}
//                       </p>
//                       <p className="mb-0">
//                         <strong>Email:</strong> {doc.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             // <DoctorsTable />
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Name</th>
//                     <th>Specialization</th>
//                     <th>Experience</th>
//                     <th>Phone</th>
//                     <th>Email</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {doctors.map((doc) => (
//                     <tr key={doc.id}>
//                       <td>{doc.name}</td>
//                       <td>{doc.specialization}</td>
//                       <td>{doc.experience}</td>
//                       <td>{doc.phone}</td>
//                       <td>{doc.email}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//         {/* ); }; */}
//       </section>
//     </div>
//   );
// };

// export default Doctors;

// import { useMemo, useState } from "react";
// import {
//   FaTh,
//   FaTable,
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaUserMd,
// } from "react-icons/fa";

// /* =========================
//    SAMPLE DATA
// ========================= */
// const doctors = [
//   {
//     id: 1,
//     name: "Dr. Rahul Sharma",
//     specialization: "Cardiologist",
//     experience: 10,
//     phone: "9876543210",
//     email: "rahul@gmail.com",
//   },
//   {
//     id: 2,
//     name: "Dr. Neha Verma",
//     specialization: "Dermatologist",
//     experience: 7,
//     phone: "9876501234",
//     email: "neha@gmail.com",
//   },
//   {
//     id: 3,
//     name: "Dr. Amit Singh",
//     specialization: "Orthopedic",
//     experience: 12,
//     phone: "9876512345",
//     email: "amit@gmail.com",
//   },
//   {
//     id: 4,
//     name: "Dr. Pooja Jain",
//     specialization: "Neurologist",
//     experience: 9,
//     phone: "9876523456",
//     email: "pooja@gmail.com",
//   },
//   {
//     id: 5,
//     name: "Dr. Rakesh Meena",
//     specialization: "Cardiologist",
//     experience: 15,
//     phone: "9876534567",
//     email: "rakesh@gmail.com",
//   },
// ];

// /* =========================
//    MAIN COMPONENT
// ========================= */
// export default function Doctors() {
//   const [view, setView] = useState("grid");
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [page, setPage] = useState(1);

//   const pageSize = 4;

//   /* =========================
//      FILTER + SEARCH
//   ========================= */
//   const filteredDoctors = useMemo(() => {
//     return doctors.filter((d) => {
//       const matchSearch =
//         d.name.toLowerCase().includes(search.toLowerCase()) ||
//         d.specialization.toLowerCase().includes(search.toLowerCase());

//       const matchFilter =
//         filter === "All" || d.specialization === filter;

//       return matchSearch && matchFilter;
//     });
//   }, [search, filter]);

//   /* =========================
//      PAGINATION
//   ========================= */
//   const totalPages = Math.ceil(filteredDoctors.length / pageSize);
//   const paginatedData = filteredDoctors.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   );

//   /* =========================
//      ACTIONS
//   ========================= */
//   const handleView = (doc) => alert(`Viewing ${doc.name}`);
//   const handleEdit = (doc) => alert(`Editing ${doc.name}`);
//   const handleDelete = (doc) => alert(`Deleting ${doc.name}`);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Doctors</h2>

//         <div className="flex gap-2">
//           <button
//             onClick={() => setView("grid")}
//             className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${
//               view === "grid"
//                 ? "bg-blue-600 text-white"
//                 : "border text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             <FaTh /> Grid
//           </button>

//           <button
//             onClick={() => setView("table")}
//             className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${
//               view === "table"
//                 ? "bg-blue-600 text-white"
//                 : "border text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             <FaTable /> Table
//           </button>
//         </div>
//       </div>

//       {/* SEARCH & FILTER */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
//         <input
//           className="border rounded px-3 py-2 text-sm"
//           placeholder="Search doctor or specialization..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />

//         <select
//           className="border rounded px-3 py-2 text-sm"
//           value={filter}
//           onChange={(e) => {
//             setFilter(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="All">All Specializations</option>
//           <option value="Cardiologist">Cardiologist</option>
//           <option value="Dermatologist">Dermatologist</option>
//           <option value="Orthopedic">Orthopedic</option>
//           <option value="Neurologist">Neurologist</option>
//         </select>
//       </div>

//       {/* VIEW */}
//       <div className="transition-all duration-300">
//         {view === "grid" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {paginatedData.map((doc) => (
//               <div
//                 key={doc.id}
//                 className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
//               >
//                 <h3 className="font-semibold flex items-center gap-2">
//                   <FaUserMd className="text-blue-600" />
//                   {doc.name}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {doc.specialization}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {doc.experience} Years Experience
//                 </p>

//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() => handleView(doc)}
//                     className="p-2 rounded border hover:bg-gray-100"
//                   >
//                     <FaEye />
//                   </button>
//                   <button
//                     onClick={() => handleEdit(doc)}
//                     className="p-2 rounded border hover:bg-gray-100 text-green-600"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(doc)}
//                     className="p-2 rounded border hover:bg-gray-100 text-red-600"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white rounded shadow">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-100 text-left">
//                 <tr>
//                   <th className="p-3">Name</th>
//                   <th>Specialization</th>
//                   <th>Experience</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedData.map((doc) => (
//                   <tr
//                     key={doc.id}
//                     className="border-t hover:bg-gray-50"
//                   >
//                     <td className="p-3">{doc.name}</td>
//                     <td>{doc.specialization}</td>
//                     <td>{doc.experience} Years</td>
//                     <td>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleView(doc)}
//                           className="p-2 hover:bg-gray-100 rounded"
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           onClick={() => handleEdit(doc)}
//                           className="p-2 hover:bg-gray-100 rounded text-green-600"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(doc)}
//                           className="p-2 hover:bg-gray-100 rounded text-red-600"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex gap-2 mt-4">
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-3 py-1 rounded text-sm ${
//                 page === i + 1
//                   ? "bg-blue-600 text-white"
//                   : "border hover:bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useRef, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FaTh,
  FaTable,
  FaEye,
  FaEdit,
  FaTrash,
  // FaSync,
  // FaPrint,
  // FaCloudUploadAlt,
  FaPlus,
} from "react-icons/fa";
import { FaEllipsisV, FaSortAmountDown } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { TablePagination } from "@mui/material";
// import UniversalButton from "@/components/UniversalButton";
// import DropdownWithSearch from "@/components/DropdownWithSearch";
// import { useDebounce } from "@/hooks/useDebounce";

// import DoctorProfileDialog from "@/components/DoctorProfileDialog";
import UniversalButton from "@/components/common/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { useDebounce } from "../hooks/useDebounce";
import DoctorProfileDialog from "../components/DoctorProfileDialog";

/* =========================
    SAMPLE DATA
    ========================= */

const doctorsData = [
  {
    id: "#DR0005",
    firstName: "Abhishek",
    lastName: "Bhatt",
    displayName: "Dr. Abhishek Bhatt",
    username: "abhishek.bhatt",
    phone: "+91 98765 43210",
    email: "abhishek.bhatt@gmail.com",
    dob: "1991-06-15",
    gender: "male",

    department: "cardiology",
    specialist: "heart",
    fees: 500,
    registrationNo: "REG123456",

    languages: ["english", "hindi"],

    address: "123 MG Road, Andheri East",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    pinCode: "400069",

    image: "https://i.pravatar.cc/150?img=22",

    education: [
      { institute: "AIIMS Delhi", qualification: "MBBS", year: "2015-01-01" },
      {
        institute: "PGIMER Chandigarh",
        qualification: "MD Cardiology",
        year: "2018-01-01",
      },
    ],

    experience: [
      {
        hospital: "Apollo Hospital",
        role: "Cardiologist",
        from: "2018-02-01",
        to: "2022-12-01",
      },
    ],

    socialMedia: {
      facebook: "https://facebook.com/drabhishek",
      twitter: "https://twitter.com/drabhishek",
      linkedin: "https://linkedin.com/in/drabhishek",
    },

    membership: [
      {
        organization: "Indian Medical Association",
        description: "Life Member",
        year: "2019-01-01",
      },
    ],

    awards: [
      {
        title: "Best Cardiologist Award",
        description: "For excellence in patient care",
        year: "2021-01-01",
      },
    ],

    experienceLabel: "4+ years",
    appointments: 200,
    status: "Available",
  },

  {
    id: "#DR0006",
    firstName: "Katherine",
    lastName: "Brooks",
    displayName: "Dr. Katherine Brooks",
    username: "katherine.brooks",
    phone: "+91 91234 56789",
    email: "katherine.brooks@gmail.com",
    dob: "1993-03-12",
    gender: "female",

    department: "dermatology",
    specialist: "skin",
    fees: 400,
    registrationNo: "REG654321",

    languages: ["english"],

    address: "45 Park Street",
    country: "India",
    state: "West Bengal",
    city: "Kolkata",
    pinCode: "700016",

    image: "https://i.pravatar.cc/150?img=2",

    education: [
      { institute: "CMC Vellore", qualification: "MBBS", year: "2016-01-01" },
      {
        institute: "CMC Vellore",
        qualification: "MD Dermatology",
        year: "2019-01-01",
      },
    ],

    experience: [
      {
        hospital: "Fortis Hospital",
        role: "Dermatologist",
        from: "2019-03-01",
        to: "2025-01-01",
      },
    ],

    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "https://linkedin.com/in/drkatherine",
    },

    membership: [],
    awards: [],

    experienceLabel: "3+ years",
    appointments: 350,
    status: "Not Available",
  },

  {
    id: "#DR0007",
    firstName: "Rahul",
    lastName: "Mehta",
    displayName: "Dr. Rahul Mehta",
    username: "rahul.mehta",
    phone: "+91 99887 66554",
    email: "rahul.mehta@gmail.com",
    dob: "1988-11-21",
    gender: "male",

    department: "orthopedics",
    specialist: "bones",
    fees: 600,
    registrationNo: "REG789012",

    languages: ["english", "hindi"],

    address: "Sector 18",
    country: "India",
    state: "Haryana",
    city: "Gurgaon",
    pinCode: "122015",

    image: "https://i.pravatar.cc/150?img=12",

    education: [
      { institute: "KGMU Lucknow", qualification: "MBBS", year: "2012-01-01" },
      {
        institute: "KGMU Lucknow",
        qualification: "MS Orthopedics",
        year: "2016-01-01",
      },
    ],

    experience: [
      {
        hospital: "Medanta Hospital",
        role: "Orthopedic Surgeon",
        from: "2016-06-01",
        to: "2024-01-01",
      },
    ],

    socialMedia: { facebook: "", twitter: "", linkedin: "" },
    membership: [],
    awards: [],

    experienceLabel: "7+ years",
    appointments: 500,
    status: "Available",
  },

  {
    id: "#DR0008",
    firstName: "Ananya",
    lastName: "Iyer",
    displayName: "Dr. Ananya Iyer",
    username: "ananya.iyer",
    phone: "+91 90909 11223",
    email: "ananya.iyer@gmail.com",
    dob: "1990-08-10",
    gender: "female",

    department: "neurology",
    specialist: "brain",
    fees: 800,
    registrationNo: "REG345678",

    languages: ["english", "tamil", "hindi"],

    address: "Adyar",
    country: "India",
    state: "Tamil Nadu",
    city: "Chennai",
    pinCode: "600020",

    image: "https://i.pravatar.cc/150?img=47",

    education: [
      {
        institute: "Madras Medical College",
        qualification: "MBBS",
        year: "2013-01-01",
      },
      {
        institute: "NIMHANS",
        qualification: "DM Neurology",
        year: "2019-01-01",
      },
    ],

    experience: [
      {
        hospital: "MIOT Hospital",
        role: "Neurologist",
        from: "2019-07-01",
        to: "2025-01-01",
      },
    ],

    socialMedia: { facebook: "", twitter: "", linkedin: "" },
    membership: [],
    awards: [],

    experienceLabel: "5+ years",
    appointments: 280,
    status: "Not Available",
  },

  {
    id: "#DR0009",
    firstName: "Sanjay",
    lastName: "Verma",
    displayName: "Dr. Sanjay Verma",
    username: "sanjay.verma",
    phone: "+91 95555 33221",
    email: "sanjay.verma@gmail.com",
    dob: "1985-02-18",
    gender: "male",

    department: "pediatrics",
    specialist: "children",
    fees: 300,
    registrationNo: "REG901234",

    languages: ["english", "hindi"],

    address: "Alambagh",
    country: "India",
    state: "Uttar Pradesh",
    city: "Lucknow",
    pinCode: "226005",

    image: "https://i.pravatar.cc/150?img=33",

    education: [
      { institute: "BHU", qualification: "MBBS", year: "2010-01-01" },
      { institute: "BHU", qualification: "MD Pediatrics", year: "2014-01-01" },
    ],

    experience: [
      {
        hospital: "Rainbow Hospital",
        role: "Pediatrician",
        from: "2014-04-01",
        to: "2025-01-01",
      },
    ],

    socialMedia: { facebook: "", twitter: "", linkedin: "" },
    membership: [],
    awards: [],

    experienceLabel: "10+ years",
    appointments: 800,
    status: "Available",
  },
];

const calculateExperienceLabel = (experience = []) => {
  if (!Array.isArray(experience) || experience.length === 0) return "0 years";

  const fromYear = new Date(experience[0].from).getFullYear();
  const toYear = experience[0].to
    ? new Date(experience[0].to).getFullYear()
    : new Date().getFullYear();

  const years = Math.max(0, toYear - fromYear);
  return `${years}+ years`;
};

const doctorsListData = doctorsData.map((doc) => ({
  id: doc.id,
  name: doc.displayName,
  phone: doc.phone,
  avatar: doc.image,
  department: doc.department,
  qualification: doc.education?.[0]?.qualification || "MBBS",
  experience: calculateExperienceLabel(doc.experience), // ✅ string
  appointments: doc.appointments,
  status: doc.status,
}));

// function useDebounce(value, delay = 300) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [value, delay]);

//   return debouncedValue;
// }

/* =========================
    MAIN COMPONENT
    ========================= */

export default function Doctors() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    department: "All",
    experience: "All",
  });

  // Action menu
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const [page, setPage] = useState(0); // 0-based index (like MUI)
  const [rowsPerPage, setRowsPerPage] = useState(10); // DEFAULT = 10

  // Doctor Profile
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const departmentOptions = useMemo(() => {
    const unique = [...new Set(doctorsListData.map((d) => d.department))];

    return [
      { label: "All", value: "All" },
      ...unique.map((dep) => ({
        label: dep,
        value: dep,
      })),
    ];
  }, []);

  const experienceOptions = [
    { label: "All", value: "All" },
    { label: "0-2 years", value: "0-2 years" },
    { label: "3-5 years", value: "3-5 years" },
    { label: "6-10 years", value: "6-10 years" },
    { label: "10+ years", value: "10+ years" },
  ];

  const getExperienceNumber = (exp) => {
    if (!exp) return 0;

    // Ensure it's a string
    const expStr = String(exp);

    const match = expStr.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  /* =========================
        FILTER + SEARCH
    ========================= */

  /* =========================
    FILTER + SEARCH
========================= */
  const debouncedSearch = useDebounce(search, 300);

  const filteredDoctors = useMemo(() => {
    const searchLower = debouncedSearch.trim().toLowerCase();

    return doctorsListData.filter((doc) => {
      /* ===== NAME SEARCH (startsWith) ===== */
      let nameMatch = true;
      if (searchLower) {
        const nameWithoutDr = doc.name.replace(/^dr\.?\s*/i, "");
        const firstName = nameWithoutDr.split(" ")[0].toLowerCase();
        nameMatch = firstName.startsWith(searchLower);
      }

      /* ===== DEPARTMENT FILTER ===== */
      let departmentMatch =
        filters.department === "All" || doc.department === filters.department;

      /* ===== EXPERIENCE FILTER ===== */
      let experienceMatch = true;
      const exp = getExperienceNumber(doc.experience);

      switch (filters.experience) {
        case "0-2 years":
          experienceMatch = exp <= 2;
          break;
        case "3-5 years":
          experienceMatch = exp >= 3 && exp <= 5;
          break;
        case "6-10 years":
          experienceMatch = exp >= 6 && exp <= 10;
          break;
        case "10+ years":
          experienceMatch = exp > 10;
          break;
        default:
          experienceMatch = true;
      }

      return nameMatch && departmentMatch && experienceMatch;
    });
    // }, [debouncedSearch, filters]);
  }, [debouncedSearch, filters]);

  // const filteredDoctors = useMemo(() => {
  //   const searchLower = search.trim().toLowerCase();

  //   if (!searchLower) return doctorsData;

  //   return doctorsData.filter((doc) => {
  //     const nameWithoutDr = doc.name.replace(/^dr\.?\s*/i, "");
  //     const firstName = nameWithoutDr.split(" ")[0].toLowerCase();
  //     return firstName.startsWith(searchLower);
  //   });
  // }, [search]);

  /* =========================
    PAGINATION
========================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDoctors.length / rowsPerPage)
  );

  const paginatedDoctors = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredDoctors.slice(start, end);
  }, [page, rowsPerPage, filteredDoctors]);

  /* =========================
        ACTIONS
    ========================= */
  const handleView = (doc) => {
    const fullDoctor = doctorsData.find((d) => d.id === doc.id);
    setSelectedDoctor({
      ...doc,
      ...fullDoctor,
    });
    setOpenProfile(true);
  };

  const handleEdit = (doc) => alert(`Editing ${doc.name}`);
  const handleDelete = (doc) => alert(`Deleting ${doc.name}`);

  return (
    <div className="p-6 bg-gray-50 rounded-2xl space-y-6 ">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-2 items-start justify-between sm:items-center ">
        {/* PAGE HEADER */}
        <div className="">
          <h1 className="text-3xl font-semibold text-blue-600">Doctors</h1>
          {/* <p className="text-sm text-gray-500">Home » Doctors</p> */}
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-wrap justify-between items-center gap-4 ">
          {/* LEFT */}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded border hover:cursor-pointer transition ${view === "grid"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "hover:bg-blue-100"
                }`}
            >
              <FaTh />
            </button>

            <button
              onClick={() => setView("table")}
              className={`p-2 rounded border hover:cursor-pointer transition ${view === "table"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "hover:bg-blue-100"
                }`}
            >
              <FaTable />
            </button>

            {/* <button className="p-2 rounded border hover:bg-gray-100">
              <FaSync />
            </button>

            <button className="p-2 rounded border hover:bg-gray-100">
              <FaPrint />
            </button>

            <button className="p-2 rounded border hover:bg-gray-100">
              <FaCloudUploadAlt />
            </button> */}
          </div>

          {/* RIGHT */}
          <Link to="/leadmanagement/doctorcrm/adddoctor">
            <UniversalButton label="New Doctor" icon={<FaPlus />} />
          </Link>

          {/* <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm">
            <FaPlus /> New Doctor
          </button> */}
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-lg shadow">
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-4  ">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-xl">Total Doctors</h2>
            <span className="bg-green-700 text-white font-medium text-sm px-3 py-0.5 rounded-full">
              {doctorsData.length}
            </span>
          </div>

          {/* <button className="flex items-center gap-2 border rounded px-3 py-1.5 text-sm hover:bg-gray-50">
            <FaSortAmountDown className="text-gray-600" />
            Sort By : Newest
          </button> */}
        </div>
        {/* filter */}
        <div className="pb-4  px-4 border-gray-200 ">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  items-end gap-4">
            {/* Search */}
            <div className="flex flex-col gap-1 ">
              <div className="">
                <span className="font-medium text-sm">Search</span>
              </div>
              <input
                type="text"
                placeholder="Search name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className=" w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none  "
              />
            </div>

            {/* Department */}
            <div className="">
              <DropdownWithSearch
                label="Department"
                value={filters.department}
                options={departmentOptions}
                placeholder="Select department"
                onChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    department: value || "All",
                  }))
                }
              />
            </div>

            {/* Status */}
            <div className="">
              <DropdownWithSearch
                label="Experience"
                value={filters.experience}
                options={experienceOptions}
                placeholder="Select experience"
                onChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    experience: value || "All",
                  }))
                }
              />
            </div>

            {/* Clear */}
            <div className="">
              {/* <button
                        onClick={() => {
                            setSearch("");
                            setFilters({ department: "All", status: "All" });
                        }}
                        className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer "
                        >
                        Clear Filters
                        </button> */}
              <UniversalButton
                label="Clear Filters"
                onClick={() => {
                  setSearch("");
                  setFilters({
                    department: "All",
                    experience: "All",
                  });
                  setPage(0);
                }}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        {/* VIEW SWITCH */}
        {view === "grid" ? (
          /* ================= GRID VIEW ================= */
          <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {filteredDoctors.length === 0 ? (
              <div className="col-span-full pt-4 text-lg text-center text-gray-500">
                Doctor not found
              </div>
            ) : (
              paginatedDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-xs text-gray-500">{doc.department}</p>
                    </div>
                  </div>

                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-gray-500">Phone:</span> {doc.phone}
                    </p>
                    <p>
                      <span className="text-gray-500">Qualification:</span>{" "}
                      {doc.qualification}
                    </p>
                    <p>
                      <span className="text-gray-500">Experience:</span>{" "}
                      {doc.experience}
                    </p>
                    <p>
                      <span className="text-gray-500">Appointments:</span>{" "}
                      {doc.appointments}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center ">
                    <div className="">
                      <span
                        className={`px-2 py-1 text-xs rounded ${doc.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                          }`}
                      >
                        {doc.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(doc)}
                        className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-2 border rounded hover:bg-gray-100 text-green-600 cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(doc)}
                        className="p-2 border rounded hover:bg-gray-100 text-red-600 cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* ================= TABLE VIEW ================= */
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm min-w-250 ">
              <thead className="bg-gray-100 text-left  text-gray-700">
                <tr>
                  <th className="px-5 py-3">Doctor ID</th>
                  <th>Doctor Name</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  {/* <th>Total Appointments</th> */}
                  <th>Status</th>
                  {/* <th className="w-10"></th> */}
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center text-lg pt-4 text-gray-500"
                    >
                      Doctor not found
                    </td>
                  </tr>
                ) : (
                  paginatedDoctors.map((doc, index) => {
                    const isBottomRow = index >= paginatedDoctors.length - 2;

                    return (
                      <tr key={doc.id} className="border-t hover:bg-gray-50">
                        <td className="px-5 py-4 font-medium text-blue-600">
                          {doc.id}
                        </td>

                        <td>
                          <div className="flex items-center gap-3">
                            <img
                              src={doc.avatar}
                              alt={doc.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                        </td>

                        <td>{doc.phone}</td>
                        <td>{doc.department}</td>
                        <td>{doc.qualification}</td>
                        <td>{doc.experience}</td>

                        <td>
                          <span
                            className={`px-2 py-1 text-xs rounded ${doc.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                              }`}
                          >
                            {doc.status}
                          </span>
                        </td>

                        {/* ACTION MENU */}
                        <td className="relative">
                          <button
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === doc.id ? null : doc.id
                              )
                            }
                            className="p-2 rounded hover:bg-gray-100"
                          >
                            <FaEllipsisV />
                          </button>

                          {openMenuId === doc.id && (
                            <div
                              ref={menuRef}
                              className={`absolute right-8 z-50 w-40 bg-white border rounded-md shadow-md
                  ${isBottomRow ? "bottom-0 right-16 " : "top-10 right-16 "}
                `}
                            >
                              <button
                                onClick={() => {
                                  handleView(doc);
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full"
                              >
                                <FaEye /> View Details
                              </button>

                              <button
                                onClick={() => {
                                  handleEdit(doc);
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full"
                              >
                                <FaEdit /> Edit
                              </button>

                              <button
                                onClick={() => {
                                  handleDelete(doc);
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={filteredDoctors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            const newRowsPerPage = parseInt(event.target.value, 10);
            setRowsPerPage(newRowsPerPage);
            setPage(0); // reset to first page
          }}
          labelDisplayedRows={() => `${page + 1} of ${totalPages}`}
          labelRowsPerPage="Rows per page:"
        />
      </div>

      {/* Doctor Profile */}
      <DoctorProfileDialog
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
}
