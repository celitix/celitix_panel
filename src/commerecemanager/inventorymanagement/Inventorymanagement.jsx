import React, { useState, useEffect } from "react";
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

// Add this above your main return if not already defined
const productCount = 1;
const variantCount = 1;

const mockProducts = [
  {
    id: "p1",
    name: "Product 1",
    image: "https://via.placeholder.com/40",
    availability: "In Stock",
    price: 199.99,
  },
  {
    id: "p2",
    name: "Product 2",
    image: "https://via.placeholder.com/40",
    availability: "Out of Stock",
    price: 299.99,
  },
  {
    id: "p3",
    name: "Product 3",
    image: "https://via.placeholder.com/40",
    availability: "In Stock",
    price: 399.99,
  },
];

const FilterSection = ({ label, children, isOpen, toggle }) => (
  <div className="mb-2 p-2">
    <button
      onClick={toggle}
      className="flex items-center justify-between w-full text-sm font-medium text-gray-700 bg-gray-100 p-1"
    >
      {label} {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    {isOpen && <div className="mt-2 pl-1">{children}</div>}
  </div>
);

const InventoryManagement = () => {
  const [openSection, setOpenSection] = useState(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
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
      image: "https://via.placeholder.com/40",
      availability: "In Stock",
      price: 199.99,
    },
    {
      id: "p2",
      name: "Product 2",
      image: "https://via.placeholder.com/40",
      availability: "Out of Stock",
      price: 299.99,
    },
    {
      id: "p3",
      name: "Product 3",
      image: "https://via.placeholder.com/40",
      availability: "In Stock",
      price: 399.99,
    },
  ]);

 const toggle = (section) => {
  setOpenSection(prev => (prev === section ? null : section));
};

  const toggleFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filtered = mockProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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
    <div className="h-full flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-72 border bg-white rounded shadow-sm text-sm">
  <h2 className="text-base font-semibold mb-1 text-gray-800 p-2">
    Attributes
  </h2>

  {/* Availability */}
  <FilterSection
    label="Availability"
    isOpen={openSection === "availability"}
    toggle={() => toggle("availability")}
  >
    <label className="flex items-center gap-2">
      <input type="checkbox" />
      In stock
      <span className="ml-auto text-xs text-gray-400">1</span>
    </label>
  </FilterSection>

  {/* Gender */}
  <FilterSection
    label="Gender"
    isOpen={openSection === "gender"}
    toggle={() => toggle("gender")}
  >
    <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded">
      Your current selection has not returned any options for this filter.
    </div>
  </FilterSection>

  {/* Condition */}
  <FilterSection
    label="Condition"
    isOpen={openSection === "condition"}
    toggle={() => toggle("condition")}
  >
    <label className="flex items-center gap-2">
      <input type="checkbox" />
      New
      <span className="ml-auto text-xs text-gray-400">1</span>
    </label>
  </FilterSection>

  {/* Brand */}
  <FilterSection
    label="Brand"
    isOpen={openSection === "brand"}
    toggle={() => toggle("brand")}
  >
    <div className="flex items-center border rounded px-2 py-1 gap-2 mb-2">
      <FaSearch className="text-gray-400 text-xs" />
      <input
        type="text"
        placeholder="Search for Brand"
        className="w-full text-sm outline-none"
      />
    </div>
    <label className="flex items-center gap-2">
      <input type="checkbox" /> test
      <span className="ml-auto text-xs text-gray-400">1</span>
    </label>
  </FilterSection>

  {/* Google product category */}
  <FilterSection
    label="Google product category"
    isOpen={openSection === "category"}
    toggle={() => toggle("category")}
  >
    <div className="flex items-center border rounded px-2 py-1 gap-2 mb-2">
      <FaSearch className="text-gray-400 text-xs" />
      <input
        type="text"
        placeholder="Search for Google product category"
        className="w-full text-sm outline-none"
      />
    </div>
    <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded">
      Your current selection has not returned any options for this filter.
    </div>
  </FilterSection>

  {/* Price */}
  <FilterSection
    label="Price"
    isOpen={openSection === "price"}
    toggle={() => toggle("price")}
  >
    <div className="flex flex-col gap-2">
      <div>
        <label className="text-xs text-gray-500">From</label>
        <input
          type="number"
          placeholder="₹"
          className="w-full px-2 py-1 border rounded text-sm"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500">To</label>
        <input
          type="number"
          placeholder="₹"
          className="w-full px-2 py-1 border rounded text-sm"
        />
      </div>
    </div>
  </FilterSection>

  {/* Media */}
  <FilterSection
    label="Media"
    isOpen={openSection === "media"}
    toggle={() => toggle("media")}
  >
    <label className="flex items-center gap-2">
      <input type="checkbox" />
      video
      <span className="ml-auto text-xs text-gray-400">0</span>
    </label>
    <label className="flex items-center gap-2 mt-1">
      <input type="checkbox" />
      backgrounds
      <span className="ml-auto text-xs text-gray-400">0</span>
    </label>
    <label className="flex items-center gap-2 mt-1">
      <input type="checkbox" />
      models
      <span className="ml-auto text-xs text-gray-400">0</span>
    </label>
  </FilterSection>

  {/* Vendor ID */}
  <FilterSection
    label="Vendor ID"
    isOpen={openSection === "vendorId"}
    toggle={() => toggle("vendorId")}
  >
    <input
      type="text"
      placeholder="Search for Vendor ID"
      className="w-full border px-2 py-1 rounded text-sm mb-1"
    />
    <div className="bg-gray-100 text-gray-500 text-xs p-2 rounded border">
      Your current selection has not returned any options for this filter.
    </div>
  </FilterSection>

  {/* Sets */}
  <FilterSection
    label="Sets"
    isOpen={openSection === "sets"}
    toggle={() => toggle("sets")}
  >
    <select className="w-full border px-2 py-1 rounded text-sm">
      <option>Select a set</option>
    </select>

    <button className="w-full mt-2 bg-green-600 text-white py-1.5 rounded text-sm hover:bg-green-700">
      Create set
    </button>
  </FilterSection>
</aside>


      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-hidden">
        {/* Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Left: Product + Variant Count */}
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Total Products */}
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg shadow-sm">
              <div className="text-blue-600 text-xl font-bold">
                {productCount}
              </div>
              <div className="text-gray-600 text-sm">
                Products
                <div className="text-xs text-gray-400 font-normal">
                  Total listed items
                </div>
              </div>
            </div>

            {/* Total Variants */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 px-4 py-2 rounded-lg shadow-sm">
              <div className="text-green-600 text-xl font-bold">
                {variantCount}
              </div>
              <div className="text-gray-600 text-sm">
                Variants
                <div className="text-xs text-gray-400 font-normal">
                  All available versions
                </div>
              </div>
            </div>
          </div>

          {/* Right: Search Bar + Filters Button */}
          <div className="flex items-center gap-2 w-full md:max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search all products"
                className="w-full border px-3 py-2 pr-10 rounded-md text-sm shadow-sm"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white hover:bg-gray-100 text-sm text-gray-700 shadow-sm">
              <FaSlidersH className="text-gray-500" />
              Filters
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 items-center text-sm mb-4">
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-green-50 text-green-700">
            <FaCheck /> Make active
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-yellow-50 text-yellow-700">
            <FaArchive /> Archive
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-red-50 text-red-600">
            <FaTrash /> Delete
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100 text-gray-800">
            <FaEdit /> Edit
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100 text-gray-700 ">
            Request review
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-blue-50 text-blue-700">
            <FaPlus /> Create set
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-purple-50 text-purple-700">
            <FaBullhorn /> Advertise set
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100 text-gray-800">
            <FaTimes /> {selected.length} selected
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white border rounded-lg shadow overflow-x-auto max-h-screen overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr className="uppercase text-xs tracking-wide">
                <th className="p-3">
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={
                      selected.length === products.length && products.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>
                <th className="p-3">Name</th>
                <th className="p-3">Variants</th>
                <th className="p-3">Availability</th>
                <th className="p-3">Price</th>
              </tr>
            </thead>
            <tbody className="max-h-[100px] overflow-y-auto">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50 border-t ">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selected.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                    />
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={p.image}
                      alt="img"
                      className="w-10 h-10 rounded-md"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-500">
                        Content ID: {p.id}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-500">–</td>
                  <td className="p-3 text-green-700 font-medium">
                    {p.availability}
                  </td>
                  <td className="p-3 font-semibold text-gray-700">
                    ₹{p.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selection Count */}
        {selected.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            {selected.length} selected
          </div>
        )}
      </main>
    </div>
  );
};

export default InventoryManagement;



