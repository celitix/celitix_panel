import { useState } from "react";

// ICONS
import { ChevronDown, RefreshCw, Info } from "lucide-react";
import { SiShopify } from "react-icons/si";
import { FiCpu } from "react-icons/fi";

const Products = () => {
  const [businessModel, setBusinessModel] = useState(
    "I provide services (to businesses or customers)"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const businessOptions = [
    "I provide services (to businesses or customers)",
    "I sell products / items",
    "Both services & products",
  ];

  return (
    <div className="p-6 w-full">
      {/* Page Title + Description */}
      <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
      <p className="text-sm text-gray-500 mt-1">
        Provide your product listing so Lyro can answer product-related
        questions.
      </p>

      {/* Main empty state card */}
      <div className="bg-white border border-gray-200 rounded-2xl mt-6 p-8 w-full flex flex-col items-center shadow-sm">
        <h2 className="text-lg font-bold text-gray-700 mb-6">
          Lyro doesn’t know your product listing, yet!
        </h2>

        {/* Business model dropdown */}
        <div className="relative mb-8">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 w-80 border border-gray-300 rounded-lg flex justify-between items-center text-sm text-gray-700 hover:bg-gray-50"
          >
            {businessModel}
            <ChevronDown size={16} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-12 left-0 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
              {businessOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setBusinessModel(opt);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feature cards row */}
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
          {/* Shopify Card */}
          <div className="border border-gray-200 rounded-xl p-5 w-72 hover:border-blue-500 hover:shadow-sm transition cursor-not-allowed opacity-90">
            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
              <SiShopify size={18} />
            </div>

            <div className="flex flex-col mt-3">
              <p className="text-md textgray-800 font-semibold ">
                Shopify product sync
              </p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Your Shopify products sync'd to respond to product questions.
              </p>
            </div>
            <p className="text-sm text-gray-800 mt-2 font-semibold flex items-center gap-1">
              <RefreshCw size={15} /> Automatically updates
            </p>

            <button className="mt-2 text-sm text-gray-700 hover:underline border-t pt-2 w-full flex gap-1">
              <Info size={15} className="mt-1" /> Compatibility criteria
            </button>
          </div>

          {/* API Card */}
          <div className="border border-gray-200 rounded-xl p-5 w-72 hover:border-blue-500 hover:shadow-sm transition cursor-not-allowed opacity-90">
            <div className="flex items-center gap-2 text-black text-sm font-semibold">
              <FiCpu size={18} />
            </div>

            <div className="flex flex-col mt-3">
              <p className="text-md textgray-800 font-semibold ">
                {" "}
                Add products via API{" "}
              </p>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Upload a large number of products and make frequent updates with
                ease. This method requires technical knowledge.
              </p>
            </div>

            <button className="mt-2 text-sm text-gray-700 hover:underline border-t pt-2 w-full flex gap-1">
              <Info size={15} className="mt-1" /> Compatibility criteria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
