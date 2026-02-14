import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// components
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// api
import { getCountryList } from "@/apis/common/common.js";

const CountryCode = ({
  value = "",          // selected country code
  onChange,            // callback(code, countryObject)
  disabled = false,
  placeholder = "Country Code",
}) => {
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ---------------------------
  // Fetch country list
  // ---------------------------
  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        setIsLoading(true);
        const response = await getCountryList();

        if (Array.isArray(response)) {
          setCountryList(response);
        } else {
          toast.error("Failed to load country list");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching country list");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryList();
  }, []);

  // ---------------------------
  // Options for dropdown
  // ---------------------------
  const options = countryList
    .slice()
    .sort((a, b) => a.countryName.localeCompare(b.countryName))
    .map((country) => ({
      label: `${country.countryName} (+${country.countryCode})`,
      value: country.countryCode,
    }));

  // ---------------------------
  // Handle selection
  // ---------------------------
  const handleChange = (code) => {
    const selected = countryList.find(
      (c) => String(c.countryCode) === String(code)
    );

    onChange?.(code, selected);
  };

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="w-full">
      <DropdownWithSearch
        id="selectCountryCode"
        name="selectCountryCode"
        placeholder={isLoading ? "Loading..." : placeholder}
        disabled={disabled || isLoading}
        options={options}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default CountryCode;
