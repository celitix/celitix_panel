import React, { useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import Lottie from "lottie-react";
import Papa from "papaparse";

// icons
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  FaTshirt,
  FaMapMarkerAlt,
  FaPlane,
  FaHome,
  FaCar,
  FaChevronDown,
} from "react-icons/fa";

// components
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/components/common/UniversalButton";

// assets
import mall from "@/assets/animation/Mall.json";

const options = [
  {
    value: "online",
    label: "Online Products",
    icon: <FaTshirt className="text-blue-600" />,
  },
  {
    value: "local",
    label: "Local Products or Services",
    icon: <FaMapMarkerAlt className="text-blue-600" />,
  },
  {
    value: "travel",
    label: "Travel",
    icon: <FaPlane className="text-blue-600" />,
  },
  {
    value: "real_estate",
    label: "Real Estate",
    icon: <FaHome className="text-blue-600" />,
  },
  {
    value: "auto",
    label: "Auto",
    icon: <FaCar className="text-blue-600" />,
  },
];

const REQUIRED_HEADERS = [
  "retailer_id",
  "item_group_id",
  "title",
  "description",
  "image_link",
  "additional_image_link",
  "availability",
  "price",
  "condition",
  "link",
  "size",
  "age_group",
  "color",
  "custom_label_0",
  "custom_label_1",
  "custom_label_2",
  "custom_label_3",
  "custom_label_4",
  "google_product_category",
  "gtin",
  "inventory",
  "manufacturer_part_number",
  "pattern",
  "sale_price",
  "sale_price_effective_date",
  "shipping",
  "country_of_origin",
];
const ConnectCatalog = () => {
  const [activeTab, setActiveTab] = useState("catalogtab");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState([]);
  const [fileStatus, setFileStatus] = useState(null);
  const [catalogId, setCatalogId] = useState("");

  const handleCatalogChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-numeric
    if (value.length <= 15) {
      setCatalogId(value);
    }
  };

  const validateHeaders = (headers) => {
    const normalized = headers.map((h) => h.toLowerCase().trim());

    const missing = REQUIRED_HEADERS.filter((h) => !normalized.includes(h));

    if (missing.length) {
      setFileStatus("error");
      setError(`${missing.join(", ")}`);
      toast.error("Invalid file headers. Please check the header names.");
      return false;
    }

    setFileStatus("success");
    setError("");
    toast.success("File uploaded and validated successfully");
    return true;
  };

  const handleFile = (file) => {
    setFileName(file.name);

    if (file.name.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const headers = result.meta.fields || [];
          validateHeaders(headers);
        },
      });
    } else if (file.name.endsWith(".xlsx")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        validateHeaders(data[0]);
      };
      reader.readAsBinaryString(file);
    } else {
      setError("Unsupported file type");
    }
  };
  return (
    <>
      <div className="flex justify-center mt-12 px-4">
        <div
          className="
          flex flex-col gap-6
          w-full max-w-lg
          p-6
          bg-white
          rounded-xl
          border border-gray-200
          shadow-sm
          text-center
        "
        >
          {/* Marketplace Icon */}
          <div className="flex justify-center">
            <div className="w-25 h-25 rounded-full bg-indigo-200 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <Lottie
                  animationData={mall}
                  loop
                  autoplay
                  className="w-15 h-15"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900">
            Connect Facebook Catalog
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600">
            Connect your product catalog to start selling on Facebook
            Marketplace.
          </p>

          {/* Primary CTA */}
          <button
            id="connectCatalogBtn"
            className="
            w-full
            py-2.5
            text-sm font-semibold text-white
            rounded-md
            bg-[#1877F2]
            hover:bg-[#166FE5]
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-[#1877F2]/40
            flex items-center justify-center gap-2
          "
          >
            Connect Catalog
          </button>

          {/* Helper text */}
          <p className="text-xs text-gray-500">
            By continuing, you agree to Facebook Marketplace policies.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-12 px-4">
        <div
          className="
          flex flex-col gap-3
          w-full max-w-lg
          p-6
          bg-white
          rounded-xl
          border border-gray-200
          shadow-sm
          text-center
        "
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab("catalogtab")}
              className={`
                      flex-1 py-3 text-sm font-medium transition
                      ${activeTab === "catalogtab"
                  ? "text-[#1877F2] border-b-2 border-[#1877F2]"
                  : "text-gray-500 hover:text-gray-700"
                }
                    `}
            >
              Catalog ID
            </button>

            <button
              onClick={() => setActiveTab("addCatalog")}
              className={`
                      flex-1 py-3 text-sm font-medium transition
                      ${activeTab === "addCatalog"
                  ? "text-[#1877F2] border-b-2 border-[#1877F2]"
                  : "text-gray-500 hover:text-gray-700"
                }
                    `}
            >
              Add Catalog
            </button>
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            Connect Facebook Catalog
          </h3>
          {activeTab === "catalogtab" && (
            <div className="flex gap-2">
              <InputField
                className="flex-1"
                placeholder="Enter Catalog ID"
                value={catalogId}
                onChange={handleCatalogChange}
                inputMode="numeric"
                maxLength={15}
              />

              <button
                className="
                        px-4
                        text-sm font-medium text-white
                        rounded-md
                        bg-[#1877F2]
                        hover:bg-[#166FE5]
                        transition-colors duration-200
                        "
                disabled={!catalogId}
              >
                Connect
              </button>
            </div>
          )}

          {activeTab === "addCatalog" && (
            <div className="space-y-4">
              <InputField placeholder="Enter catalog name" />
              <div className="w-full relative">
                {/* <label className="block text-left mb-2 text-sm font-medium text-gray-700">
                  Catalog type
                </label> */}

                {/* Dropdown trigger */}
                <div
                  onClick={toggle}
                  className="w-full px-3 py-2 border rounded-md bg-white text-sm shadow-sm flex justify-between items-center cursor-pointer"
                >
                  {selected ? (
                    <div className="flex items-center gap-2">
                      {selected.icon}
                      <span>{selected.label}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">Select Catalog type</span>
                  )}
                  <FaChevronDown className="text-gray-500" />
                </div>

                {/* Dropdown options */}
                {isOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md">
                    {options.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 ${selected?.value === option.value ? "bg-blue-50" : ""
                          }`}
                      >
                        {option.icon}
                        <span className="text-sm text-gray-700">
                          {option.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <UniversalButton label="Save" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-dashed border-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 border-t border-dashed border-gray-300" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <label
              className={`
            w-full max-w-md
            p-6
            border-2 border-dashed
            rounded-lg
            text-center
            cursor-pointer
            transition
            ${fileStatus === "success"
                  ? "border-green-500"
                  : fileStatus === "error"
                    ? "border-red-500"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
            >
              <input
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              <p className="text-sm font-medium text-gray-700">
                Drag & drop your file here
              </p>
              <p className="text-xs text-gray-500 mt-1">
                or click to upload (CSV, XLSX)
              </p>
            </label>

            {fileName && (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5">
                <span className="text-sm text-gray-700"> {fileName}</span>

                <button
                  onClick={() => {
                    setFileName("");
                    setError("");
                    setFileStatus(null);
                    toast("File removed", {
                      icon: (
                        <MdOutlineDeleteForever
                          className="text-red-500"
                          size={18}
                        />
                      ),
                    });
                  }}
                  className="
                    text-gray-500
                    hover:text-red-600
                    transition
                    "
                  title="Remove file"
                >
                  <MdOutlineDeleteForever className="text-red-500" size={18} />
                </button>
              </div>
            )}

            {error && (
              <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm font-semibold text-red-700 mb-2">
                  Missing columns:
                </p>

                <ul className="list-disc list-inside text-sm text-red-600 text-left columns-3 gap-6">
                  {error.split("\n").map((err, index) => (
                    <li key={index} className="break-inside-avoid">
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectCatalog;
