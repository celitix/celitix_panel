import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Chip } from "@mui/material";

// icons
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

// components
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/components/common/UniversalButton";

const initialState = {
  // =============================Cell Phones & Smart Watches==============================

  cell_phones_color: {
    input: "",
    chips: [],
  },
  cell_phones_brand: {
    input: "",
    chips: [],
  },
  cell_phones_model: "",
  cell_phones_operating_system: "",
  cell_phones_screen_size: "",
  cell_phones_storage_capacity: "",

  // ========================Accessories===================================================

  accessories_color: {
    input: "",
    chips: [],
  },
  compatible_devices: {
    input: "",
    chips: [],
  },

  accessories_product_length: "",
  accessories_product_width: "",
  accessories_product_height: "",

  // ==========================Computers & Tablets=========================================

  computers_model: "",
  computers_brand: "",
  computers_operating_system: "",
  computers_screen_size: "",
  computers_storage_capacity: "",

  // ===========================================Video Game Consoles & Video Games===============
  video_game_model: "",
  video_game_platform: "",
  age_group: "",
  video_game_brand: "",
  // ======================================Software===========================================

  number_of_licenses: "",
  software_system_requirements: {
    input: "",
    chips: [],
  },

  // ====================================Printers & Scanners================================
  scanners_model: "",
  scanners_brand: "",
  scanners_resolution: "",
  scanners_product_length: "",
  scanners_product_width: "",
  scanners_product_height: "",
  scanners_product_depth: "",

  // ==========================TVs & Monitors========================================
  monitors_display_technology: "",
  monitors_screen_size: "",
  monitors_model: "",
  monitors_brand: "",
  monitors_resolution: "",
  monitors_resolution: "",
  monitors_product_length: "",
  monitors_product_width: "",
  monitors_product_height: "",
  monitors_product_depth: "",

  // ==============================Projectors======================================
  projectors_display_technology: "",
  projectors_screen_size: "",
  projectors_model: "",
  projectors_brand: "",
  projectors_resolution: "",
  projectors_product_length: "",
  projectors_product_width: "",
  projectors_product_height: "",
  projectors_product_depth: "",

  // ==============================Cameras========================================
  cameras_model: "",
  cameras_brand: "",
  digital_zoom: "",
  megapixels: "",
  optical_zoom: "",
};
const Electronics = () => {
  const [data, setData] = useState(initialState);

  const update = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    for (const [key, value] of Object.entries(data)) {
      // chip-based fields
      if (typeof value === "object" && value?.chips) {
        if (value.chips.length === 0) {
          toast.error(`${key.replace(/_/g, " ")} is required`);
          return false;
        }
        continue;
      }

      // normal fields
      if (value === "" || value === null || value === undefined) {
        toast.error(`${key.replace(/_/g, " ")} is required`);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    console.log("DATA SNAPSHOT:", data);
  }, [data]);

  const handleSubmit = () => {
    const isValid = validate();

    console.log("VALIDATION RESULT:", isValid);

    if (!isValid) return;

    const payload = {
      ...data,

      //  numeric conversions

      number_of_licenses: Number(data.number_of_licenses) || 0,
      digital_zoom: Number(data.digital_zoom) || 0,
      megapixels: parseFloat(data.megapixels) || 0,
      optical_zoom: Number(data.optical_zoom) || 0,
      scanners_resolution: Number(data.scanners_resolution) || 0,
      monitors_resolution: Number(data.monitors_resolution) || 0,
      projectors_resolution: Number(data.projectors_resolution) || 0,
    };

    console.log("clicked submit");
    console.log("SUBMITTED PAYLOAD:", payload);

    toast.success("Electronics details saved successfully!");

    setData(initialState);
  };

  const handleChipKeyDown = (key) => (e) => {
    const field = data[key];

    if (e.key === "Enter" && field.input.trim()) {
      e.preventDefault();

      const value = field.input.trim();

      if (!field.chips.includes(value)) {
        update(key, {
          input: "",
          chips: [...field.chips, value],
        });
      }
    }
  };

  const removeChip = (key, index) => {
    update(key, {
      ...data[key],
      chips: data[key].chips.filter((_, i) => i !== index),
    });
  };

  return (
    // <div className="w-full p-8 space-y-12 bg-white rounded-2xl shadow-lg border border-gray-100">
    <div className="w-full space-y-6 ">
      {/*   Cell Phones & Smart Watches */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Cell Phones & Smart Watches
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Color"
              placeholder="Enter color"
              value={data.color}
              onChange={(e) => update("color", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Leather, Silicone, Stainless steel, and so on.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Brand"
              placeholder="Enter brand"
              value={data.brand}
              onChange={(e) => update("brand", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 6, 7, 8, Small, Medium, Large.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Model"
              placeholder="Enter Model"
              value={data.model}
              onChange={(e) => update("model", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Diamond, Turquoise, Ruby, Emerald, Sapphire.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Operating system"
              placeholder="Enter operating system"
              value={data.operating_system}
              onChange={(e) => update("operating_system", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Diamond, Turquoise, Ruby, Emerald, Sapphire.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Screen size"
              placeholder="Enter screen size"
              value={data.screen_size}
              onChange={(e) => update("screen_size", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Diamond, Turquoise, Ruby, Emerald, Sapphire.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Storage Capacity"
              placeholder="Enter storage capacity"
              value={data.storage_capacity}
              onChange={(e) => update("storage_capacity", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Diamond, Turquoise, Ruby, Emerald, Sapphire.
            </p>
          </div>
        </div>
      </div>
      {/*Accessories */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Accessories
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Color"
              placeholder="Enter Color"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.cell_phones_color.input}
              onChange={(e) =>
                update("cell_phones_color", {
                  ...data.cell_phones_color,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("cell_phones_color")}
            />
            <p className="text-xs text-gray-500">Sample values: Blue, White.</p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.cell_phones_color.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("cell_phones_color", index)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <InputField
              label=" Compatible Devices"
              placeholder="Enter  compatible devices"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.compatible_devices.input}
              onChange={(e) =>
                update("compatible_devices", {
                  ...data.compatible_devices,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("compatible_devices")}
            />
            <p className="text-xs text-gray-500">
              Sample values: iPad, Tablet Computers, Windows Desktop Computers,
              Apple Computers.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.compatible_devices.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("compatible_devices", index)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <InputField
              label="Product length"
              placeholder="Enter Product length"
              value={data.product_length}
              onChange={(e) => update("product_length", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Product width"
              placeholder="Enter product width"
              value={data.product_width}
              onChange={(e) => update("product_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 1.5 in, 3.8 cm.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Product height"
              placeholder="Enter product height"
              value={data.product_height}
              onChange={(e) => update("product_height", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 1.5 in, 3.8 cm.
            </p>
          </div>
        </div>
      </div>
      {/*Computers & Tablets  */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Computers & Tablets
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Computers model"
              placeholder="Enter computers model"
              value={data.computers_model}
              onChange={(e) => update("computers_model", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Lenovo, Thinkpad, Macbook Pro.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Computers brand"
              placeholder="Enter computers brand"
              value={data.computers_brand}
              onChange={(e) => update("computers_brand", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <InputField
              label="Computers operating  system"
              placeholder="Enter computers operating system"
              value={data.computers_operating_system}
              onChange={(e) =>
                update("computers_operating_system", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: Asscher, Heart, Baguette, Marquis, Oval, Brilliant,
              Round, Square, Princess.
            </p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Computers screen size"
              placeholder="Enter computers screen size"
              value={data.computers_screen_size}
              onChange={(e) => update("computers_screen_size", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 5.</p>
          </div>
          <div className="space-y-1">
            <InputField
              label=" Computers storage capacity"
              placeholder="Enter  computers storage capacity"
              value={data.computers_storage_capacity}
              onChange={(e) =>
                update(" computers_storage_capacity", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">Sample values: 5.</p>
          </div>{" "}
        </div>
      </div>
      {/* Video Game Consoles & Video Games */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Video Game Consoles & Video Games
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Video game model"
              placeholder="Enter video game model"
              value={data.video_game_model}
              onChange={(e) => update("video_game_model", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Sony Playstation 4, Nintendo Wii, Microsoft Xbox
              360.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Video game platform"
              placeholder="Enter video game platform"
              value={data.video_game_platform}
              onChange={(e) => update("video_game_platform", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Xbox 360, Nintendo Wii, PC.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Age group"
              placeholder="Enter Age group"
              value={data.age_group}
              onChange={(e) => update("age_group", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: adult, all ages, teen, kids, toddler, infant,
              newborn.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label=" Video game brand"
              placeholder="Enter  video game brand"
              value={data.video_game_brand}
              onChange={(e) => update(" video_game_brand", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 14k, 22k, 925 Sterling.
            </p>
          </div>
        </div>
      </div>
      {/*Software */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Software
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Number of Licenses"
              placeholder="Enter number of licenses"
              value={data.number_of_licenses}
              onChange={(e) => update("number_of_licenses", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 1, 3, 5.</p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Software System Requirements"
              placeholder="Enter software system requirements"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.software_system_requirements.input}
              onChange={(e) =>
                update("software_system_requirements", {
                  ...data.software_system_requirements,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("software_system_requirements")}
            />
            <p className="text-xs text-gray-500">
              Sample vaSample values: Windows 7 or later, Intel Core 2 Duo 1.8
              Ghz, 15 GB Free Hard Drive Space.
            </p>

            <div className="flex flex-wrap gap-2">
              {data.software_system_requirements.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("software_system_requirements", index)
                  }
                />
              ))}
            </div>
          </div>{" "}
        </div>
      </div>

      {/*Printers & Scanners */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Printers & Scanners
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Scanners model"
              placeholder="Enter Scanners model"
              value={data.scanners_model}
              onChange={(e) => update("scanners_model", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Lenovo Thinkpad, Macbook Pro.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Scanners brand"
              placeholder="Enter Scanners brand"
              value={data.scanners_brand}
              onChange={(e) => update("scanners_brand", e.target.value)}
            />
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Scanners resolution"
              placeholder="Enter Scanners resolution"
              value={data.scanners_resolution}
              onChange={(e) => update("scanners_resolution", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 2, 4, 33.</p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Scanners product length"
              placeholder="Enter Scanners product length"
              value={data.scanners_product_length}
              onChange={(e) =>
                update("scanners_product_length", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label=" Scanners product width"
              placeholder="Enter  Scanners product width"
              value={data.scanners_product_width}
              onChange={(e) => update("scanners_product_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label=" Scanners product height"
              placeholder="Enter  Scanners product height"
              value={data.scanners_product_height}
              onChange={(e) =>
                update("scanners_product_height", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label=" Scanners product depth"
              placeholder="Enter  Scanners product depth"
              value={data.scanners_product_depth}
              onChange={(e) => update("scanners_product_depth", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>
        </div>
      </div>

      {/*TVs & Monitors */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          TVs & Monitors
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Monitors display technology"
              placeholder="Enter Monitors display technology"
              value={data.monitors_display_technology}
              onChange={(e) =>
                update("monitors_display_technology", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: LED, LCD, OLED.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Monitors screen size"
              placeholder="Enter Monitors screen size"
              value={data.monitors_screen_size}
              onChange={(e) => update("monitors_screen_size", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 42 in, 5.5 in.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Monitors model"
              placeholder="Enter Monitors model"
              value={data.monitors_screen_size}
              onChange={(e) => update("monitors_model", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <InputField
              label="Monitors brand"
              placeholder="Enter Monitors brand"
              value={data.monitors_brand}
              onChange={(e) => update("monitors_brand", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <InputField
              label="Monitors resolution"
              placeholder="Enter Monitors resolution"
              value={data.monitors_resolution}
              onChange={(e) => update(" monitors_resolution", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 2, 4, 33.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Monitors  product length"
              placeholder="Enter Monitors product length"
              value={data.monitors_product_length}
              onChange={(e) =>
                update("monitors_product_length", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Monitors  product width"
              placeholder="Enter Monitors product width"
              value={data.monitors_product_widthh}
              onChange={(e) => update("monitors_product_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Monitors  product height"
              placeholder="Enter Monitors product heighth"
              value={data.monitors_product_height}
              onChange={(e) =>
                update("monitors_product_height", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Monitors product depth"
              placeholder="Enter Monitors product depth"
              value={data.monitors_product_depth}
              onChange={(e) => update("monitors_product_depth", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>
        </div>
      </div>

      {/*Projectors */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Projectors
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Projectors display technology"
              placeholder="Enter projectors display technology"
              value={data.projectors_display_technology}
              onChange={(e) =>
                update("projectors_display_technology", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: LED, LCD, OLED.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Projectors model"
              placeholder="Enter projectors model"
              value={data.projectors_model}
              onChange={(e) => update("projectors_model", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <InputField
              label="Projectors brand"
              placeholder="Enter projectors brand"
              value={data.projectors_brand}
              onChange={(e) => update("projectors_brand", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <InputField
              label="Projectors resolution"
              placeholder="Enter  projectors resolution"
              value={data.projectors_resolution}
              onChange={(e) => update(" projectors_resolution", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 2, 4, 33.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Projectors product length"
              placeholder="Enter  projectors product length"
              value={data.projectors_product_length}
              onChange={(e) =>
                update("projectors_product_length", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Projectors product width"
              placeholder="Enter  projectors product width"
              value={data.projectors_product_width}
              onChange={(e) =>
                update("projectors_product_width", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Projectors product height"
              placeholder="Enter  projectors product height"
              value={data.projectors_product_height}
              onChange={(e) =>
                update("projectors_product_height", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Projectors product depth"
              placeholder="Enter  projectors product depth"
              value={data.projectors_product_depth}
              onChange={(e) =>
                update("projectors_product_depth", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 5 in, 2 ft, 60 cm.
            </p>
          </div>
        </div>
      </div>

      {/*Cameras */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Cameras
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Cameras model"
              placeholder="Enter Cameras model"
              value={data.cameras_model}
              onChange={(e) => update("cameras_model", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <InputField
              label="Cameras brand"
              placeholder="Enter Cameras brand"
              value={data.cameras_brand}
              onChange={(e) => update("cameras_brand", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <InputField
              label="Digital zoom"
              placeholder="Enter Digital zoom"
              value={data.digital_zoom}
              onChange={(e) => update("digital_zoom", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 6, 160, 200. Values, such as 20X or 20.4 MP, are
              rejected.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Megapixels"
              placeholder="Enter Megapixels"
              value={data.megapixels}
              onChange={(e) => update("megapixels", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 16.0, 24.2.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Optical zoom"
              placeholder="Enter Optical zoom"
              value={data.optical_zoom}
              onChange={(e) => update("optical_zoom", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 10, 20, 24.</p>
          </div>
        </div>
      </div>
            <div className="flex justify-center ">
        <UniversalButton
          type="button"
          icon={<TipsAndUpdatesOutlinedIcon sx={{ fontSize: 20 }} />}
          label="Save Electronics"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
export default Electronics;
