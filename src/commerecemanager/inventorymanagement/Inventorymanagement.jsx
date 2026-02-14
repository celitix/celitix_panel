// import React, { useState, useEffect } from "react";
// import Checkbox from "@mui/material/Checkbox";

// // icons
// import {
//   FaSearch,
//   FaEdit,
//   FaTrash,
//   FaBoxOpen,
//   FaBullhorn,
//   FaCheck,
//   FaArchive,
//   FaTimes,
//   FaPlus,
//   FaChevronDown,
//   FaChevronUp,
//   FaSlidersH,
// } from "react-icons/fa";

// // Add this above your main return if not already defined
// const productCount = 1;
// const variantCount = 1;

// const mockProducts = [
//   {
//     id: "p1",
//     name: "Product 1",
//     image: "https://via.placeholder.com/40",
//     availability: "In Stock",
//     price: 199.99,
//   },
//   {
//     id: "p2",
//     name: "Product 2",
//     image: "https://via.placeholder.com/40",
//     availability: "Out of Stock",
//     price: 299.99,
//   },
//   {
//     id: "p3",
//     name: "Product 3",
//     image: "https://via.placeholder.com/40",
//     availability: "In Stock",
//     price: 399.99,
//   },
// ];

// const FilterSection = ({ label, children, isOpen, toggle }) => (
//   <div className=" flex flex-col gap-0 ">
//     <button
//       onClick={toggle}
//       className="flex items-center justify-between w-full text-sm font-medium text-gray-700 bg-gray-100 p-1.5 px-2 rounded-lg"
//     >
//       {label} {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//     </button>
//     {isOpen && <div className="">{children}</div>}
//   </div>
// );

// const checkboxLabel = {
//   inputProps: { "aria-label": "availability checkbox" },
// };

// const InventoryManagement = () => {
//   const [openSection, setOpenSection] = useState(null);
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [filters, setFilters] = useState({
//     availability: true,
//     gender: false,
//     condition: false,
//     brand: true,
//     category: false,
//     price: false,
//     media: false,
//     vendorId: false,
//     sets: false,
//   });

//   const [products] = useState([
//     {
//       id: "p1",
//       name: "Product 1",
//       image: "https://via.placeholder.com/40",
//       availability: "In Stock",
//       price: 199.99,
//     },
//     {
//       id: "p2",
//       name: "Product 2",
//       image: "https://via.placeholder.com/40",
//       availability: "Out of Stock",
//       price: 299.99,
//     },
//     {
//       id: "p3",
//       name: "Product 3",
//       image: "https://via.placeholder.com/40",
//       availability: "In Stock",
//       price: 399.99,
//     },
//   ]);

//   const toggle = (section) => {
//     setOpenSection((prev) => (prev === section ? null : section));
//   };

//   const toggleFilter = (key) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const filtered = mockProducts.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   const toggleSelect = (id) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
//     );
//   };

//   const toggleAll = () => {
//     if (selected.length === products.length) {
//       setSelected([]); // Unselect all
//     } else {
//       setSelected(products.map((p) => p.id)); // Select all
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl space-y-4">
//       <div className="flex justify-center">
//         <span className="text-2xl font-medium underline "> Inventory Management </span>
//       </div>
//       <div className="h-full flex flex-col md:flex-row bg-gray-50">
//         {/* Sidebar */}
//         <aside className="flex flex-col gap-2 w-full md:w-72  bg-white rounded  text-sm">
//           <h2 className="text-base font-semibold  text-gray-800 p-1.5 px-2">
//             Attributes
//           </h2>

//           {/* Availability */}
//           <FilterSection
//             label="Availability"
//             isOpen={openSection === "availability"}
//             toggle={() => toggle("availability")}
//             >
//             <label className="flex items-center gap-2">
//               <Checkbox
//                 {...checkboxLabel}
//                 checked={filters.availability}
//                 onChange={() => toggleFilter("availability")}
//                 size="small"
//               />
//               {/* <input type="checkbox" /> */}
//               In stock
//               <span className="ml-auto text-sm text-gray-400">10</span>
//             </label>
//           </FilterSection>

//           {/* Gender */}
//           <FilterSection
//             label="Gender"
//             isOpen={openSection === "gender"}
//             toggle={() => toggle("gender")}
//           >
//             <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded">
//               Your current selection has not returned any options for this
//               filter.
//             </div>
//           </FilterSection>

//           {/* Condition */}
//           <FilterSection
//             label="Condition"
//             isOpen={openSection === "condition"}
//             toggle={() => toggle("condition")}
//           >
//             <label className="flex items-center gap-2">
//               <input type="checkbox" />
//               New
//               <span className="ml-auto text-xs text-gray-400">1</span>
//             </label>
//           </FilterSection>

//           {/* Brand */}
//           <FilterSection
//             label="Brand"
//             isOpen={openSection === "brand"}
//             toggle={() => toggle("brand")}
//           >
//             <div className="flex items-center border rounded px-2 py-1 gap-2 mb-2">
//               <FaSearch className="text-gray-400 text-xs" />
//               <input
//                 type="text"
//                 placeholder="Search for Brand"
//                 className="w-full text-sm outline-none"
//               />
//             </div>
//             <label className="flex items-center gap-2">
//               <input type="checkbox" /> test
//               <span className="ml-auto text-xs text-gray-400">1</span>
//             </label>
//           </FilterSection>

//           {/* Google product category */}
//           <FilterSection
//             label="Google product category"
//             isOpen={openSection === "category"}
//             toggle={() => toggle("category")}
//           >
//             <div className="flex items-center border rounded px-2 py-1 gap-2 mb-2">
//               <FaSearch className="text-gray-400 text-xs" />
//               <input
//                 type="text"
//                 placeholder="Search for Google product category"
//                 className="w-full text-sm outline-none"
//               />
//             </div>
//             <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded">
//               Your current selection has not returned any options for this
//               filter.
//             </div>
//           </FilterSection>

//           {/* Price */}
//           <FilterSection
//             label="Price"
//             isOpen={openSection === "price"}
//             toggle={() => toggle("price")}
//           >
//             <div className="flex flex-col gap-2">
//               <div>
//                 <label className="text-xs text-gray-500">From</label>
//                 <input
//                   type="number"
//                   placeholder="₹"
//                   className="w-full px-2 py-1 border rounded text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500">To</label>
//                 <input
//                   type="number"
//                   placeholder="₹"
//                   className="w-full px-2 py-1 border rounded text-sm"
//                 />
//               </div>
//             </div>
//           </FilterSection>

//           {/* Media */}
//           <FilterSection
//             label="Media"
//             isOpen={openSection === "media"}
//             toggle={() => toggle("media")}
//           >
//             <label className="flex items-center gap-2">
//               <input type="checkbox" />
//               video
//               <span className="ml-auto text-xs text-gray-400">0</span>
//             </label>
//             <label className="flex items-center gap-2 mt-1">
//               <input type="checkbox" />
//               backgrounds
//               <span className="ml-auto text-xs text-gray-400">0</span>
//             </label>
//             <label className="flex items-center gap-2 mt-1">
//               <input type="checkbox" />
//               models
//               <span className="ml-auto text-xs text-gray-400">0</span>
//             </label>
//           </FilterSection>

//           {/* Vendor ID */}
//           <FilterSection
//             label="Vendor ID"
//             isOpen={openSection === "vendorId"}
//             toggle={() => toggle("vendorId")}
//           >
//             <input
//               type="text"
//               placeholder="Search for Vendor ID"
//               className="w-full border px-2 py-1 rounded text-sm mb-1"
//             />
//             <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded border">
//               Your current selection has not returned any options for this
//               filter.
//             </div>
//           </FilterSection>

//           {/* Sets */}
//           <FilterSection
//             label="Sets"
//             isOpen={openSection === "sets"}
//             toggle={() => toggle("sets")}
//           >
//             <select className="w-full border px-2 py-1 rounded text-sm">
//               <option>Select a set</option>
//             </select>

//             <button className="w-full mt-2 bg-green-600 text-white py-1.5 rounded text-sm hover:bg-green-700">
//               Create set
//             </button>
//           </FilterSection>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-4 overflow-y-hidden">
//           {/* Search */}
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
//             {/* Left: Product + Variant Count */}
//             <div className="flex flex-wrap gap-4 mt-4">
//               {/* Total Products */}
//               <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg shadow-sm">
//                 <div className="text-blue-600 text-xl font-bold">
//                   {productCount}
//                 </div>
//                 <div className="text-gray-600 text-sm">
//                   Products
//                   <div className="text-xs text-gray-400 font-normal">
//                     Total listed items
//                   </div>
//                 </div>
//               </div>

//               {/* Total Variants */}
//               <div className="flex items-center gap-3 bg-green-50 border border-green-200 px-4 py-2 rounded-lg shadow-sm">
//                 <div className="text-green-600 text-xl font-bold">
//                   {variantCount}
//                 </div>
//                 <div className="text-gray-600 text-sm">
//                   Variants
//                   <div className="text-xs text-gray-400 font-normal">
//                     All available versions
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right: Search Bar + Filters Button */}
//             <div className="flex items-center gap-2 w-full md:max-w-md">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search all products"
//                   className="w-full border px-3 py-2 pr-10 rounded-md text-sm shadow-sm"
//                 />
//                 <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               </div>
//               <button className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white hover:bg-gray-100 text-sm text-gray-700 shadow-sm">
//                 <FaSlidersH className="text-gray-500" />
//                 Filters
//               </button>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-wrap gap-2 items-center text-sm mb-4">
//             <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-green-50 text-green-700">
//               <FaCheck /> Make active
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-yellow-50 text-yellow-700">
//               <FaArchive /> Archive
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-red-50 text-red-600">
//               <FaTrash /> Delete
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100 text-gray-800">
//               <FaEdit /> Edit
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100 text-gray-700 ">
//               Request review
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-blue-50 text-blue-700">
//               <FaPlus /> Create set
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-purple-50 text-purple-700">
//               <FaBullhorn /> Advertise set
//             </button>
//             <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100 text-gray-800">
//               <FaTimes /> {selected.length} selected
//             </button>
//           </div>

//           {/* Product Table */}
//           <div className="bg-white border rounded-lg shadow overflow-x-auto max-h-screen overflow-y-auto">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 text-gray-600">
//                 <tr className="uppercase text-xs tracking-wide">
//                   <th className="p-3">
//                     <input
//                       type="checkbox"
//                       className="accent-blue-500"
//                       checked={
//                         selected.length === products.length &&
//                         products.length > 0
//                       }
//                       onChange={toggleAll}
//                     />
//                   </th>
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Variants</th>
//                   <th className="p-3">Availability</th>
//                   <th className="p-3">Price</th>
//                 </tr>
//               </thead>
//               <tbody className="max-h-[100px] overflow-y-auto">
//                 {filtered.map((p) => (
//                   <tr key={p.id} className="hover:bg-blue-50 border-t ">
//                     <td className="p-3">
//                       <input
//                         type="checkbox"
//                         className="accent-blue-500"
//                         checked={selected.includes(p.id)}
//                         onChange={() => toggleSelect(p.id)}
//                       />
//                     </td>
//                     <td className="p-3 flex items-center gap-3">
//                       <img
//                         src={p.image}
//                         alt="img"
//                         className="w-10 h-10 rounded-md"
//                       />
//                       <div>
//                         <div className="font-medium text-gray-800">
//                           {p.name}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           Content ID: {p.id}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-3 text-gray-500">–</td>
//                     <td className="p-3 text-green-700 font-medium">
//                       {p.availability}
//                     </td>
//                     <td className="p-3 font-semibold text-gray-700">
//                       ₹{p.price.toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Selection Count */}
//           {selected.length > 0 && (
//             <div className="mt-4 text-sm text-gray-600">
//               {selected.length} selected
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default InventoryManagement;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Checkbox from "@mui/material/Checkbox";

// icons
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaBullhorn,
  FaCheck,
  FaArchive,
  FaTimes,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
  FaSlidersH,
} from "react-icons/fa";

// components
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/components/layout/InputField";

// Add this above your main return if not already defined
const productCount = 1;
const variantCount = 1;

const mockProducts = [
  {
    id: "p1",
    name: "Product 1",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 199.99,
  },
  {
    id: "p2",
    name: "Product 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8h-mBtvKR53CHjq5LrgYUVMDPHpAfBWxg9F91rfi3Hw&s",
    availability: "Out of Stock",
    price: 299.99,
  },
  {
    id: "p3",
    name: "Product 3",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p4",
    name: "Product 4",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p5",
    name: "Product 5",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p6",
    name: "Product 6",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p7",
    name: "Product 7",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p8",
    name: "Product 8",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p9",
    name: "Product 9",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p10",
    name: "Product 10",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p11",
    name: "Product 11",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p12",
    name: "Product 12",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p13",
    name: "Product 13",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p14",
    name: "Product 14",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p15",
    name: "Product 15",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p16",
    name: "Product 16",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p17",
    name: "Product 17",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p18",
    name: "Product 18",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
  {
    id: "p19",
    name: "Product 19",
    image:
      "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
    availability: "In Stock",
    price: 399.99,
  },
];

const AnimatedFilterSection = ({ label, isOpen, onToggle, children }) => {
  return (
    <div className="flex flex-col gap-1">
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-sm font-medium text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-all duration-100"
      >
        <span>{label}</span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.span>
      </button>

      {/* Animated Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="overflow-hidden px-2 py-0.5"
          >
            <div className=" ">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InventoryManagement = () => {
  const [openSection, setOpenSection] = useState(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const [filters, setFilters] = useState({
    availability: true,
    gender: false,
    condition: false,
    brand: true,
    category: false,
    price: false,
    media: false,
    vendorId: false,
    sets: false,
  });

  const [products] = useState([
    {
      id: "p1",
      name: "Product 1",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 199.99,
    },
    {
      id: "p2",
      name: "Product 2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8h-mBtvKR53CHjq5LrgYUVMDPHpAfBWxg9F91rfi3Hw&s",
      availability: "Out of Stock",
      price: 299.99,
    },
    {
      id: "p3",
      name: "Product 3",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p4",
      name: "Product 4",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p5",
      name: "Product 5",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p6",
      name: "Product 6",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p7",
      name: "Product 7",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p8",
      name: "Product 8",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p9",
      name: "Product 9",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p10",
      name: "Product 10",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p11",
      name: "Product 11",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p12",
      name: "Product 12",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p13",
      name: "Product 13",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p14",
      name: "Product 14",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p15",
      name: "Product 15",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p16",
      name: "Product 16",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p17",
      name: "Product 17",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p18",
      name: "Product 18",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
    {
      id: "p19",
      name: "Product 19",
      image:
        "https://img.freepik.com/premium-vector/cosmetics-product-sale-social-media-advertisement-poster-design-vector-with-blue-color_1003782-1812.jpg?semt=ais_hybrid&w=740&q=80",
      availability: "In Stock",
      price: 399.99,
    },
  ]);

  const toggle = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filtered = mockProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selected.length === products.length) {
      setSelected([]); // Unselect all
    } else {
      setSelected(products.map((p) => p.id)); // Select all
    }
  };

  return (
    <div className="p-6 bg-white h-[90vh] rounded-2xl space-y-6 overflow-hidden">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
        <div className="flex justify-start   ">
          <span className="text-2xl font-medium  "> Inventory Management </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-md rounded-md  shadow-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search all products"
              className="w-full border px-3 py-2 pr-10 rounded-md outline-none text-sm"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="   ">
            {/* <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white hover:bg-gray-100 text-sm text-gray-700 hover:shadow-lg"
            >
              <FaSlidersH className="text-gray-500" />
              Filters
            </button> */}
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="relative flex items-center w-full text-nowrap gap-2 px-3 py-2 border rounded-md bg-white hover:bg-gray-100 text-sm hover:shadow-lg"
            >
              <FaSlidersH className="text-gray-500" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
              {/* Filters */}
              {isFilterOpen && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-blue-600 rounded-full" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="h-full flex flex-col gap-6 md:flex-row overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 292, opacity: 1 }} // 72 * 4 = 288px (w-72)
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              // className="flex flex-col gap-2 p-3 text-nowrap bg-gray-100 rounded-lg text-sm overflow-scroll h-full border mb-12"
              className="flex flex-col gap-2 p-1 text-nowrap bg-gray-100 rounded-lg text-sm pb-3 mb-14"
            >
              <div className="flex flex-col  p-2   h-auto overflow-x-hidden overflow-y-auto gap-3">
                {/* Availability */}
                <AnimatedFilterSection
                  label="Availability"
                  isOpen={openSection === "availability"}
                  onToggle={() => toggle("availability")}
                >
                  <label className="flex items-center gap-0">
                    <Checkbox
                      size="small"
                      checked={filters.availability}
                      onChange={() => toggleFilter("availability")}
                    />
                    In stock
                    <span className="ml-auto text-sm text-gray-400">10</span>
                  </label>
                </AnimatedFilterSection>

                {/* Gender */}
                <AnimatedFilterSection
                  label="Gender"
                  isOpen={openSection === "gender"}
                  onToggle={() => toggle("gender")}
                >
                  <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded">
                    Your current selection has not returned any options for this
                    filter.
                  </div>
                </AnimatedFilterSection>

                {/* Condition */}
                <AnimatedFilterSection
                  label="Condition"
                  isOpen={openSection === "condition"}
                  onToggle={() => toggle("condition")}
                >
                  <label className="flex items-center gap-2">
                    <Checkbox size="small" />
                    New
                    <span className="ml-auto text-xs text-gray-400">1</span>
                  </label>
                </AnimatedFilterSection>

                {/* Brand */}
                <AnimatedFilterSection
                  label="Brand"
                  isOpen={openSection === "brand"}
                  onToggle={() => toggle("brand")}
                >
                  <div className="flex items-center p-1 gap-2">
                    <DropdownWithSearch
                      id={"brand"}
                      name={"brand"}
                      placeholder={"Search With Brand"}
                      // label={"Callback Type"}
                      // value={formValues.callBackType}
                      // options={callBackType}
                      // onChange={(e) => {
                      //   setFormValues({
                      //     ...formValues,
                      //     callBackType: e,
                      //   });
                      // }}
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <Checkbox size="small" /> test
                    <span className="ml-auto text-xs text-gray-400">1</span>
                  </label>
                </AnimatedFilterSection>

                {/* Google product category */}
                <AnimatedFilterSection
                  label="Google product category"
                  isOpen={openSection === "category"}
                  onToggle={() => toggle("category")}
                >
                  <div className="flex items-center p-1 gap-2">
                    <DropdownWithSearch
                      id={"googleProductCategory"}
                      name={"googleProductCategory"}
                      placeholder={"Google product category"}
                    />
                  </div>
                  <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded">
                    Your current selection has not returned any options for this
                    filter.
                  </div>
                </AnimatedFilterSection>

                {/* Price */}
                <AnimatedFilterSection
                  label="Price"
                  isOpen={openSection === "price"}
                  onToggle={() => toggle("price")}
                >
                  <div className="flex flex-col gap-1">
                    <div className="p-1">
                      <InputField
                        type="number"
                        label="From ₹"
                        placeholder="Enter Starting Price"
                      />
                    </div>
                    <div>
                      <InputField
                        type="number"
                        label="To ₹"
                        placeholder="Enter Ending Price"
                      />
                    </div>
                  </div>
                </AnimatedFilterSection>

                {/* Media */}
                <AnimatedFilterSection
                  label="Media"
                  isOpen={openSection === "media"}
                  onToggle={() => toggle("media")}
                >
                  <label className="flex items-center gap-2">
                    <Checkbox size="small" />
                    video
                    <span className="ml-auto text-xs text-gray-400">0</span>
                  </label>
                  <label className="flex items-center gap-2 mt-1">
                    <Checkbox size="small" />
                    backgrounds
                    <span className="ml-auto text-xs text-gray-400">0</span>
                  </label>
                  <label className="flex items-center gap-2 mt-1">
                    <Checkbox size="small" />
                    models
                    <span className="ml-auto text-xs text-gray-400">0</span>
                  </label>
                </AnimatedFilterSection>

                {/* Vendor ID */}
                <AnimatedFilterSection
                  label="Vendor ID"
                  isOpen={openSection === "vendorId"}
                  onToggle={() => toggle("vendorId")}
                >
                  <div className="flex items-center p-1 gap-2">
                    <DropdownWithSearch
                      id={"vendorID"}
                      name={"vendorID"}
                      placeholder="Search for Vendor ID"
                    />
                  </div>
                  <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded border">
                    Your current selection has not returned any options for this
                    filter.
                  </div>
                </AnimatedFilterSection>

                {/* Sets */}
                <AnimatedFilterSection
                  label="Sets"
                  isOpen={openSection === "sets"}
                  onToggle={() => toggle("sets")}
                >
                  <div className="flex items-center p-1 gap-2">
                    <DropdownWithSearch
                      id={"set"}
                      name={"set"}
                      placeholder={"Set"}
                    />
                  </div>

                  <button className="w-full mt-2 bg-green-600 text-white py-1.5 rounded text-sm hover:bg-green-700">
                    Create set
                  </button>
                </AnimatedFilterSection>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex flex-col gap-4 flex-1 p-0  overflow-y-hidden  mb-14">
          {/* Actions */}
          <div className="flex flex-wrap gap-3 items-center text-sm ">
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow-lg hover:bg-green-50 text-green-700">
              <FaCheck /> Make active
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow-lg hover:bg-yellow-50 text-yellow-700">
              <FaArchive /> Archive
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow-lg hover:bg-red-50 text-red-600">
              <FaTrash /> Delete
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow-lg hover:bg-gray-100 text-gray-800">
              <FaEdit /> Edit
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow-lg hover:bg-gray-100 text-gray-700 ">
              Request review
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow-lg hover:bg-blue-50 text-blue-700">
              <FaPlus /> Create set
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow-lg hover:bg-purple-50 text-purple-700">
              <FaBullhorn /> Advertise set
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:shadow-lg hover:bg-gray-100 text-gray-800">
              <FaTimes /> {selected.length} selected
            </button>
          </div>

          {/* Product Table */}
          <div className="bg-white border rounded-lg shadow overflow-hidden">
            <table className="min-w-full relative text-sm text-left table-fixed">
              <thead className="bg-gray-100 sticky top-0 z-10 text-gray-600 block">
                <tr className="uppercase text-xs tracking-wide table w-full">
                  <th className="p-3">
                    <Checkbox
                      size="small"
                      checked={
                        selected.length === products.length &&
                        products.length > 0
                      }
                      indeterminate={
                        selected.length > 0 && selected.length < products.length
                      }
                      onChange={toggleAll}
                      aria-label="Select all products"
                    />
                  </th>
                  <th className="p-3 w-1/3">Name</th>
                  <th className="p-3 w-1/6">Variants</th>
                  <th className="p-3 w-1/6">Availability</th>
                  <th className="p-3 w-1/6">Price</th>
                </tr>
              </thead>
              <tbody className="block h-[80vh] overflow-y-auto">
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-blue-50 border-t table w-full"
                  >
                    <td className="p-3 w-12">
                      {/* <input
                        type="checkbox"
                        className="accent-blue-500"
                        checked={selected.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                      /> */}
                      <Checkbox
                        size="small"
                        checked={selected.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        aria-label={`Select product ${p.name}`}
                      />
                    </td>
                    <td className="p-3 w-full flex items-center gap-3 justify-center">
                      <img
                        src={p.image}
                        alt="img"
                        className="w-10 h-10 rounded-md"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          {p.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Content ID: {p.id}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 w-1/6 text-gray-500">–</td>
                    <td className="p-3 w-1/6 text-green-700 font-medium">
                      {p.availability}
                    </td>
                    <td className="p-3 w-1/6 font-semibold text-gray-700">
                      ₹{p.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selection Count */}
          {selected.length > 0 && (
            <div className="  text-sm text-gray-600">
              {selected.length} selected
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InventoryManagement;
