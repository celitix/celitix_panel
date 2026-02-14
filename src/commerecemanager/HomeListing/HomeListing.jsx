// Catalog Item Types

// DESTINATION
// FLIGHT
// HOME_LISTING
// HOTEL
// HOTEL_ROOM
// PRODUCT_ITEM
// STORE_PRODUCT_ITEM
// VEHICLE
// VEHICLE_OFFER

// ===========================Home Listing====================================
// ac_type - num - input
// additional_fees_description - string - input
// address - string - textarea
// Agent section title
// agent_company - string - input
// agent_email - string agent_fb_page_id - string - input
// agent_name - string - input
// agent_phone - string - input
// applinks - App links for native platforms, e.g. Android, iOS and Windows Phone - radio button - IOS, andoroid windows and other and when user select other than display a input
// area_size - unsigned integer - input
// area_unit - enum - dropdown - values current add (a,b,c...)
// availability - enum - dropdown - (available,booked)
// co_2_emission_rating_eu - string - input
// currency - string - input
// custom_label_0 - string- input
// custom_label_1 - string- input
// custom_label_2 - string- input
// custom_label_3 - string- input
// custom_label_4 - string- input
// custom_number_0 - unsigned int32- input
// custom_number_1 - unsigned int32- input
// custom_number_2 - unsigned int32- input
// custom_number_3 - unsigned int32- input
// custom_number_4 - unsigned int32- input
// days_on_market - unsigned integer - input
// description - string textarea
// energy_rating_eu - string - 0 - 5 start rating with start icon and clickable and values of each star (0,1,2,3,4,5)
// furnish_type - enum - dropdown current values (a,b,c...)
// group_id - string - input
// heating_type - enum - dropdown current values (a,b,c...)
// home_listing_id - string - input
// image_fetch_status - enum {NO_STATUS, DIRECT_UPLOAD, FETCHED, FETCH_FAILED, PARTIAL_FETCH, OUTDATED} - image upload with radio button selection
// images (t<string>)- upload images
// laundry_type - enum - drodpdown current values (a,b,c...)
// listing_type - enum - drodpdown current values (a,b,c...)
// max_currency - string input
// max_price - string input
// min_currency - string input
// min_price - string input
// name - string input
// num_baths - float input
// num_beds - float input
// num_rooms - float input
// num_units - unsigned integer input
// parking_type - enum input
// partner_verification - enum
// pet_policy - string input
// price - string - input
// property_type - string - drodpdown current values (a,b,c...)
// securitydeposit_currency - string input
// securitydeposit_price - string input
// tags(list<string>) - - drodpdown current values (a,b,c...)
// unit_price - string input
// url - string input
// visibility - ({STAGING, PUBLISHED}) radio
// year_built - int32 - calendar

// =======================DESTINATION=======================
// address,applinks,currency,description,images(list<string>),name,price,price_change,tags(list<string>),types(list<string>),unit_price, url,visibility

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

// components
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/components/layout/InputField";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";

const initialState = {
  ac_type: "",
  additional_fees_description: "",
  address: "",
  agent_company: "",
  agent_email: "",
  agent_fb_page_id: "",
  agent_name: "",
  agent_phone: "",
  applinks: "",
  applinks_other: "",
  area_size: "",
  area_unit: "",
  availability: "",
  co_2_emission_rating_eu: "",
  currency: "",
  custom_label_0: "",
  custom_label_1: "",
  custom_label_2: "",
  custom_label_3: "",
  custom_label_4: "",
  custom_number_0: "",
  custom_number_1: "",
  custom_number_2: "",
  custom_number_3: "",
  custom_number_4: "",
  days_on_market: "",
  description: "",
  energy_rating_eu: 0,
  furnish_type: "",
  group_id: "",
  heating_type: "",
  home_listing_id: "",
  images: [],
  image_fetch_status: "NO_STATUS",
  laundry_type: "",
  listing_type: "",
  max_currency: "",
  max_price: "",
  min_currency: "",
  min_price: "",
  name: "",
  num_baths: "",
  num_beds: "",
  num_rooms: "",
  num_units: "",
  parking_type: "",
  partner_verification: "",
  pet_policy: "",
  price: "",
  property_type: "",
  securitydeposit_currency: "",
  securitydeposit_price: "",
  tags: [],
  unit_price: "",
  url: "",
  visibility: "STAGING",
  year_built: "",
};

const HomeListing = () => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  /* ---------------- VALIDATION ---------------- */

  const isValidUnsignedInt32 = (value) => {
    const num = Number(value);
    return Number.isInteger(num) && num >= 0 && num <= 4294967295;
  };

  const validate = () => {
    if (!data.agent_company)
      return toast.error("Agent company is required"), false;

    if (!data.name) return toast.error("Property name is required"), false;

    if (!data.price) return toast.error("Price is required"), false;

    if (!data.agent_email?.includes("@"))
      return toast.error("Invalid email address"), false;

    if (!data.area_size || Number(data.area_size) <= 0)
      return toast.error("Area size must be positive"), false;

    if (data.applinks === "OTHER" && !data.applinks_other)
      return toast.error("Please specify app link"), false;

    if (!isValidUnsignedInt32(data.custom_number_0))
      return (
        toast.error("Custom number must be a positive whole number"), false
      );

    if (data.num_units < 0 || !Number.isInteger(Number(data.num_units)))
      return toast.error("Units must be a whole number"), false;

    if (data.url && !/^https?:\/\/.+/i.test(data.url))
      return toast.error("Invalid URL format"), false;

    if (!data.property_type)
      return toast.error("Property type is required"), false;

    for (const k of ["num_baths", "num_beds", "num_rooms"]) {
      if (data[k] < 0)
        return toast.error(`${k.replace("_", " ")} cannot be negative`), false;
    }

    return true;
  };

  const handleImageUpload = (files) => {
    const images = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        images.push(reader.result);
        if (images.length === files.length) {
          update("images", images);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (data.images?.length > 0) {
      update("image_fetch_status", "DIRECT_UPLOAD");
    }
  }, [data.images]);

  const handleSubmit = () => {
    const isValid = validate();
    console.log("VALIDATION RESULT:", isValid);
    console.log("ERRORS:", errors);

    if (!isValid) return;
    const payload = {
      ...data,
      area_size: Number(data.area_size),
      days_on_market: Number(data.days_on_market),
      num_baths: Number(data.num_baths),
      num_beds: Number(data.num_beds),
      num_rooms: Number(data.num_rooms),
      num_units: Number(data.num_units),
      year_built: data.year_built
        ? new Date(data.year_built).getFullYear()
        : null,
    };

    console.log("clicked submit");
    console.log("SUBMITTED PAYLOAD ", payload);

    toast.success("Home Listing details submitted successfully !");

    // Optional reset
    setData(initialState);
  };

  return (
    <div className="w-full p-8 space-y-12 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* BASIC INFO */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <InputField
            label="Price"
            placeholder="Enter Price"
            value={data.price}
            onChange={(e) => update("price", e.target.value)}
          />

          <UniversalTextArea
            label="Address"
            placeholder="Enter Address"
            value={data.address}
            onChange={(e) => update("address", e.target.value)}
          />
        </div>
      </div>

      {/* AGENT SECTION */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Agent Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Agent Company"
            placeholder="Enter Agent Company"
            value={data.agent_company}
            onChange={(e) => update("agent_company", e.target.value)}
          />
          <InputField
            label="Agent Name"
            placeholder="Enter Company Name"
            value={data.agent_name}
            onChange={(e) => update("agent_name", e.target.value)}
          />

          <InputField
            label="Agent Email"
            placeholder="Enter Agent Email"
            value={data.agent_email}
            onChange={(e) => update("agent_email", e.target.value)}
          />

          <InputField
            label="Agent Phone"
            placeholder="Enter Agent Phone"
            value={data.agent_phone}
            onChange={(e) => update("agent_phone", e.target.value)}
          />
        </div>
      </div>

      {/* APP LINKS */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          App Links
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <RadioGroup
            value={data.applinks}
            options={["IOS", "ANDROID", "WINDOWS", "OTHER"]}
            onChange={(v) => update("applinks", v)}
          />

          {data.applinks === "OTHER" && (
            <InputField
              label="Other App Link"
              placeholder="Enter Other App Link"
              value={data.applinks_other}
              onChange={(e) => update("applinks_other", e.target.value)}
            />
          )}
        </div>
      </div>

      {/* AREA */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Area
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            type="number"
            label="Area Size"
            placeholder="Enter area size"
            value={data.area_size}
            min={0}
            step={1}
            onChange={(e) => update("area_size", Number(e.target.value))}
          />

          <DropdownWithSearch
            label="Area Unit"
            value={data.area_unit}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("area_unit", selected)}
          />

          <DropdownWithSearch
            label="Availability"
            value={data.availability}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("availability", selected)}
          />

          <InputField
            label="CO₂ Emission Rating (EU)"
            value={data.co_2_emission_rating_eu}
            onChange={(e) => update("co_2_emission_rating_eu", e.target.value)}
            placeholder="e.g. A+, B, 120 g/m²"
          />
        </div>
      </div>

      {/* Currency */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Currency
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputField
            label="Currency"
            placeholder="Enter Currency "
            value={data.currency}
            onChange={(e) => update("currency", e.target.value)}
          />
          <InputField
            label="Custom_label_0"
            placeholder="Enter Custom_label_0"
            value={data.custom_label_0}
            onChange={(e) => update("custom_label_0", e.target.value)}
          />
          <InputField
            label="Custom_label_1"
            placeholder="Enter Custom_label_1"
            value={data.custom_label_1}
            onChange={(e) => update("custom_label_1", selected)}
          />
          <InputField
            label="Custom_label_2"
            placeholder="Enter Custom_label_2"
            value={data.custom_label_2}
            onChange={(e) => update("custom_label_2", e.target.value)}
          />
          <InputField
            label="Custom_label_3"
            placeholder="Enter Custom_label_3 "
            value={data.custom_label_3}
            onChange={(e) => update("custom_label_3", e.target.value)}
          />{" "}
          <InputField
            label="Custom_label_4"
            placeholder="Enter Custom_label_4"
            value={data.custom_label_4}
            onChange={(e) => update("custom_label_4", e.target.value)}
          />
          <InputField
            label="Custom_number_0"
            placeholder="Enter Custom_number_0 "
            value={data.custom_number_0}
            onChange={(e) => update("custom_number_0", e.target.value)}
            min={0}
            step={1}
          />{" "}
          <InputField
            label="Custom_number_1"
            placeholder="Enter Custom_number_1 "
            value={data.custom_number_1}
            onChange={(e) => update("custom_number_1", e.target.value)}
            min={0}
            step={1}
          />{" "}
          <InputField
            label="Custom_number_2"
            placeholder="Enter Custom_number_2"
            value={data.custom_number_2}
            onChange={(e) => update("custom_number_2", e.target.value)}
            min={0}
            step={1}
          />{" "}
          <InputField
            label="Custom_number_3"
            placeholder="Enter Custom_number_3"
            value={data.custom_number_3}
            onChange={(e) => update("custom_number_3", e.target.value)}
            min={0}
            step={1}
          />{" "}
          <InputField
            label="Custom_number_4"
            placeholder="Enter Custom_number_4"
            value={data.custom_number_4}
            onChange={(e) => update("custom_number_4", e.target.value)}
            min={0}
            step={1}
          />
          <InputField
            type="number"
            label="Days on Market"
            placeholder="Enter Days on Market "
            value={data.days_on_market}
            onChange={(e) => update("days_on_market", e.target.value)}
            min={0}
            step={1}
          />
          <UniversalTextArea
            label="Description"
            placeholder="Enter Description"
            rows={4}
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>
      </div>

      {/* ENERGY RATING */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Energy Rating (EU)
        </h2>

        <div className=" ">
          <StarRating
            value={data.energy_rating_eu}
            onChange={(v) => update("energy_rating_eu", String(v))}
          />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Types
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <DropdownWithSearch
            label="Furnish Type"
            value={data.furnish_type}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("furnish_type", selected)}
          />

          <InputField
            label="Group ID"
            placeholder="Enter Group ID"
            value={data.group_id}
            onChange={(e) => update("group_id", e.target.value)}
          />

          <DropdownWithSearch
            label="Heating Type"
            value={data.heating_type}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("heating_type", selected)}
          />

          <InputField
            label="Home Listing ID"
            placeholder="Enter Home Listing ID"
            value={data.home_listing_id}
            onChange={(e) => update("home_listing_id", e.target.value)}
          />
        </div>
      </div>

      {/* IMAGES */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Images
        </h2>

        <div className="grid grid-cols-1  gap-5">
          <RadioGroup
            value={data.image_fetch_status}
            options={[
              "NO_STATUS",
              "DIRECT_UPLOAD",
              "FETCHED",
              "FETCH_FAILED",
              "PARTIAL_FETCH",
              "OUTDATED",
            ]}
            onChange={(v) => update("image_fetch_status", v)}
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <DropdownWithSearch
            label="Laundry Type"
            value={data.laundry_type}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("laundry_type", selected)}
          />
          <DropdownWithSearch
            label="Listing Type"
            value={data.listing_type}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("listing_type", selected)}
          />

          <InputField
            label="Max Currency"
            placeholder="Enter Max Currency"
            value={data.max_currency}
            onChange={(e) => update("max_currency", e.target.value)}
          />

          <InputField
            label="Max Price"
            placeholder="Enter Max price"
            value={data.max_price}
            onChange={(e) => update("max_price", e.target.value)}
          />

          <InputField
            label="Min Price"
            placeholder="Enter Min Price"
            value={data.min_price}
            onChange={(e) => update("min_price", e.target.value)}
          />

          <InputField
            label="Min Currency"
            placeholder="Enter Min Currency"
            value={data.min_currency}
            onChange={(e) => update("min_currency", e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Rooms & Units{" "}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InputField
            type="number"
            label="Number of Bathrooms"
            placeholder="Enter number of bathrooms"
            value={data.num_baths}
            onChange={(e) => update("num_baths", e.target.value)}
            min={0}
            step="0.5"
          />

          <InputField
            type="number"
            label="Number of Beds"
            placeholder="Enter number of beds"
            value={data.num_beds}
            onChange={(e) => update("num_beds", e.target.value)}
            min={0}
            step="0.5"
          />

          <InputField
            type="number"
            label="Number of Rooms"
            placeholder="Enter number of rooms"
            value={data.num_rooms}
            onChange={(e) => update("num_rooms", e.target.value)}
            min={0}
            step="0.5"
          />

          <InputField
            type="number"
            label="Number of Units"
            placeholder="Enter number of units"
            value={data.num_units}
            onChange={(e) => update("num_units", e.target.value)}
            min={0}
            step={1}
          />

          <DropdownWithSearch
            label="Parking Type"
            value={data.parking_type}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("parking_type", selected)}
          />

          <DropdownWithSearch
            label="Partner Verification"
            value={data.partner_verification}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("partner_verification", selected)}
          />

          <InputField
            label="Pet Policy"
            placeholder="e.g. Pets allowed / No pets / Case by case"
            value={data.pet_policy}
            onChange={(e) => update("pet_policy", e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Property Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <DropdownWithSearch
            label="Property Type"
            placeholder="Select Property Type"
            value={data.property_type}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("property_type", selected)}
          />
          <InputField
            label="Security Deposit Currency"
            placeholder="e.g. INR, USD"
            value={data.securitydeposit_currency}
            onChange={(e) => update("securitydeposit_currency", e.target.value)}
          />

          <InputField
            label="Security Deposit Amount"
            placeholder="e.g. 100000"
            value={data.securitydeposit_price}
            onChange={(e) => update("securitydeposit_price", e.target.value)}
          />

          <DropdownWithSearch
            label="Tags"
            placeholder="Select Tag"
            value={data.tags}
            options={["A", "B", "C"].map((o) => ({
              value: o,
              label: o,
            }))}
            onChange={(selected) => update("tags", selected)}
          />

          <InputField
            label="Unit Price"
            placeholder="Price per unit"
            value={data.unit_price}
            onChange={(e) => update("unit_price", e.target.value)}
          />
          <InputField
            label="Listing URL"
            placeholder="https://example.com/property"
            value={data.url}
            onChange={(e) => update("url", e.target.value)}
          />
        </div>
      </div>

      {/* VISIBILITY */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Visibility
        </h2>

        <div className=" gap-5">
          <RadioGroup
            value={data.visibility}
            options={["STAGING", "PUBLISHED"]}
            onChange={(v) => update("visibility", v)}
          />
        </div>
      </div>

      {/* YEAR BUILT */}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Year Built
        </h2>

        <div className=" gap-5">
          <UniversalDatePicker
            type="date"
            label="Year Built"
            value={data.year_built}
            onChange={(e) => update("year_built", e.target.value)}
          />
        </div>
      </div>

      {/*SUBMIT BUTTON */}
      <UniversalButton label=" Submit" onClick={handleSubmit} />
    </div>
  );
};

export default HomeListing;

const RadioGroup = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-6">
    {options.map((o) => (
      <label
        key={o}
        className={`
          flex items-center gap-2 cursor-pointer text-sm
          ${value === o ? "text-blue-600 font-medium" : "text-gray-600"}
        `}
      >
        <input
          type="radio"
          checked={value === o}
          onChange={() => onChange(o)}
          className="accent-blue-600"
        />
        {o}
      </label>
    ))}
  </div>
);

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1 text-2xl">
    {[0, 1, 2, 3, 4, 5].map((v) => (
      <span
        key={v}
        onClick={() => onChange(v)}
        className={`
          cursor-pointer transition
          ${value >= v ? "text-yellow-400" : "text-gray-300"}
          hover:scale-110
        `}
      >
        ★
      </span>
    ))}
  </div>
);
