import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";

// ICONS
import { FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";

// COMPONENTS
import InputField from "@/components/layout/InputField";
import SmsHeadersTableTable from "./components/SmsHeadersTable";
import UniversalButton from "@/components/common/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";


const SmsHeaders = () => {
  const [addtemplateheader, setAddTemplateHeader] = useState(false);
  const [cetegory, setCetegory] = useState(null);
  const [smsType, setSmsType] = useState(null);
  const [query, setQuery] = useState(""); // input state
  const [result, setResult] = useState(""); // value to show on click
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = () => {
    setResult(query); // store input value into result
  };
  const handleAddHeaderTemplate = () => {
    setAddTemplateHeader(true); // open dialog
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 items-end mb-4 w-full">
        <div className="w-full sm:w-56">
          <InputField label="Header" placeholder="Enter Header" />
        </div>
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Status"
            placeholder="select Status"
            options={[
              { label: "Select Status", value: "" },
              { label: "Active", value: "1" },
              { label: "inactive", value: "2" },
            ]}
            onChange={(newValue) => setCetegory(newValue)}
          />
        </div>
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            label="Header Status "
            placeholder="select Header Status "
            options={[
              { label: "Select Header Status", value: "" },
              { label: "Pending", value: "1" },
              { label: "Approved", value: "2" },
              { label: "Rejected", value: "3" },
            ]}
            onChange={(newValue) => setCetegory(newValue)}
          />
        </div>
        <div className="w-max-content">
          <UniversalButton
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
          />
        </div>
        <div className="w-max-content">
          <UniversalButton
            label="Add Header"
            id="dltAddTemplate"
            name="dltAddTemplate"
            onClick={handleAddHeaderTemplate}
          />
        </div>
      </div>
      <SmsHeadersTableTable />

      <Dialog
        header="Add Header"
        visible={addtemplateheader}
        onHide={() => setAddTemplateHeader(false)}
        className="lg:w-[70rem] md:w-[50rem] w-[25rem]"
        draggable={false}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="space-y-4 col-span-12 md:col-span-8 bg-gray-100 p-6 border rounded-md">
            <div>
              <DropdownWithSearch
                label="Select Cetegory"
                options={[
                  { label: "Real Estate", value: "1" },
                  { label: "Education", value: "2" },
                  { label: "Health", value: "3" },
                  { label: "consumer goods and automobiles", value: "4" },
                  {
                    label: "Communication/Broadcasting/Entertainment/IT",
                    value: "5",
                  },
                  { label: "Tourism and Leisure", value: "6" },
                  { label: "Food and Beverages", value: "7" },
                  { label: "Other", value: "8" },
                ]}
                id="category"
                name="category"
                value={cetegory}
                onChange={(newValue) => setCetegory(newValue)}
              />
            </div>
            <div>
              <label className=" cursor-pointer text-sm font-semibold">
                Template Type
              </label>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mt-1">
                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                  <RadioButton
                    inputId="smsTypetrans"
                    name="smsType"
                    value="transactional"
                    onChange={(e) => setSmsType(e.value)}
                    checked={smsType === "transactional"}
                  />
                  <label
                    htmlFor="smsTypetrans"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Transactional
                  </label>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                  <RadioButton
                    inputId="smsTypepro"
                    name="smsType"
                    value="promotional"
                    onChange={(e) => setSmsType(e.value)}
                    checked={smsType === "promotional"}
                  />
                  <label
                    htmlFor="smsTypepro"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Promotional
                  </label>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                  <RadioButton
                    inputId="smsTypeIntl"
                    name="smsType"
                    value="international"
                    onChange={(e) => setSmsType(e.value)}
                    checked={smsType === "international"}
                  />
                  <label
                    htmlFor="smsTypeIntl"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    International
                  </label>
                </div>
              </div>
            </div>
            <div>
              {/* Search Box */}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full ">
                <input
                  type="text"
                  placeholder="Find your Header"
                  className="flex-grow px-3 py-2 text-sm text-gray-700 outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="bg-gray-100 px-3 flex items-center justify-center hover:bg-gray-200"
                >
                  <FaSearch className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              {/* Show result */}
              <div className="mt-3 text-gray-700 font-medium">
                {result && `You searched for: ${result}`}
              </div>
            </div>
            <div>
              <div className="space-y-2">
                {/* File input */}
                <input
                  type="file"
                  className="block w-full text-sm px-3 py-2 text-gray-600 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                />

                {/* Download sample link */}
                <a
                  href="/sample.csv" // <-- replace with your sample file path
                  download
                  className="text-green-600 text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  Download Sample File <FaDownload className="text-green-600" />
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm">
                Your Agreement/allocation letter with service provider from
                where the telecom resources are allocated with reference to the
                above numbers
              </p>
            </div>
            <div>
              <UniversalTextArea label="Sender ID" />
            </div>
            <div className="flex flex-wrap gap-3">
              <UniversalButton label="Save" />
              <UniversalButton label="Cancel" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="bg-gray-100 p-6 max-w-md border rounded-md h-full">
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800">
                Header (Sender ID) registration:
              </h2>

              {/* Highlighted info */}
              <div className="bg-yellow-100 text-yellow-800 text-sm font-medium p-3 rounded mt-3">
                Every header gets a unique Header ID
              </div>

              {/* Message classification */}
              <p className="mt-4 text-gray-800 font-medium">
                Messages are classified into:
              </p>
              <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
                <li>Promotional</li>
                <li>Transactional</li>
                <li>Service Explicit</li>
                <li>Service Implicit</li>
              </ol>

              {/* Button */}
              <button className="mt-4 px-4 py-2 border border-gray-800 text-gray-800 text-sm font-semibold rounded shadow hover:bg-gray-100 flex items-center gap-2">
                KNOW MORE <span>➤</span>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SmsHeaders;
