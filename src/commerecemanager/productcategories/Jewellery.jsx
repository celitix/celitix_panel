import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Chip } from "@mui/material";

// icons
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";

// components
import InputField from "@/components/layout/InputField"; 
import UniversalButton from "@/components/common/UniversalButton";

const initialState = {
  material: "",
  size: "",
  gemstone: {
    input: "",
    chips: [],
  },
  chain_length: "",
  clasp_type: "",
  earring_back_finding: "",
  earring_drop_length: "",
  gemstone_clarity: "",
  gemstone_color: "",
  gemstone_creation_method: "",
  jewellery_gemstone_cut: "",
  gemstone_height: "",
  gemstone_length: "",
  gemstone_treatment: {
    input: "",
    chips: [],
  },
  jewellery_gemstone_weight: "",
  gemstone_width: "",
  inscription: {
    input: "",
    chips: [],
  },
  jewellery_setting_style: "",
  metal_stamp_or_purity: "",
  occasion: {
    input: "",
    chips: [],
  },

  plating_material: "",
  size_system: "",
  jewellery_standard_feature: {
    input: "",
    chips: [],
  },
  total_gemstone_weight: "",
  activity: {
    input: "",
    chips: [],
  },

  battery_life: "",
  display_technology: "",
  watches_gemstone_cut: {
    input: "",
    chips: [],
  },

  watches_gemstone_weight: "",
  metal_stamp_or_purity: "",
  plating_material: "",
  power_type: "",
  watches_standard_features: {
    input: "",
    chips: [],
  },

  watches_total_gemstone_weight: "",
  watch_band_width: "",
  watch_case_thickness: "",
  watch_movement_type: "",
};

const Jewellery = () => {
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
      gemstone_height: Number(data.gemstone_height),
      gemstone_length: Number(data.gemstone_length),
      jewellery_gemstone_weight: Number(data.jewellery_gemstone_weight),
      gemstone_width: Number(data.gemstone_width),
      // jewellery_gemstone_weight: Number(data.jewellery_gemstone_weight),
      gemstone_weight: parseFloat(data.gemstone_weight) || 0,
      watches_total_gemstone_weight: Number(data.watches_total_gemstone_weight),
    };

    console.log("clicked submit");
    console.log("SUBMITTED PAYLOAD:", payload);

    toast.success("Jewellery & Watches details saved successfully!");

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
      {/* purchase consideration */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Purchase Consideration
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Material"
              placeholder="Enter material"
              value={data.material}
              onChange={(e) => update("material", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Leather, Silicone, Stainless steel, and so on.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Size"
              placeholder="Enter size"
              value={data.size}
              onChange={(e) => update("size", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 6, 7, 8, Small, Medium, Large.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Gemstone"
              placeholder="Enter gemstone"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.gemstone.input}
              onChange={(e) =>
                update("gemstone", {
                  ...data.gemstone,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("gemstone")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Diamond, Turquoise, Ruby, Emerald, Sapphire.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.gemstone.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("gemstone", index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*Jewelry */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Jewelry
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Chain length"
              placeholder="Enter Chain length"
              value={data.chain_length}
              onChange={(e) => update("chain_length", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 12 in, 20 cm.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Clasp type"
              placeholder="Enter clasp type"
              value={data.clasp_type}
              onChange={(e) => update("clasp_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Lobster Clasp, Toggle Clasp, Barrel Clasp, Fishhook
              Clasp.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Earringback_finding"
              placeholder="Enter Earring_back_finding"
              value={data.earring_back_finding}
              onChange={(e) => update("earring_back_finding", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Clip-On, FishHook, Snap Posts, Screw Back,
              Shepherds Hook.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Earring drop length"
              placeholder="Enter Earring drop length"
              value={data.earring_drop_length}
              onChange={(e) => update("earring_drop_length", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 1.5 in, 3.8 cm.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Gemstone clarity"
              placeholder="Enter Gemstone clarity"
              value={data.gemstone_clarity}
              onChange={(e) => update("gemstone_clarity", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Gemstone color"
              placeholder="Enter Gemstone color"
              value={data.gemstone_color}
              onChange={(e) => update("gemstone_color", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Colorless, Near-Colorless, Color-Changing.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Gemstone creation method"
              placeholder="Enter Gemstone creation method"
              value={data.gemstone_creation_method}
              onChange={(e) =>
                update("gemstone_creation_method", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: Natural, Simulated, Synthetic, Lab-Created.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Jewellery Gemstone Cut"
              placeholder="Enter Jewellery Gemstone Cut"
              value={data.jewellery_gemstone_cut}
              onChange={(e) => update("jewellery_gemstone_cut", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Asscher, Heart, Baguette, Marquis, Oval, Brilliant,
              Round, Square, Princess.
            </p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Gemstone height"
              placeholder="Enter Gemstone height"
              value={data.gemstone_height}
              onChange={(e) => update("gemstone_height", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 5.</p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Gemstone length"
              placeholder="Enter Gemstone length"
              value={data.gemstone_length}
              onChange={(e) => update("gemstone_length", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 5.</p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Gemstone treatment"
              placeholder="Enter Gemstone treatment"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.gemstone_treatment.input}
              onChange={(e) =>
                update("gemstone_treatment", {
                  ...data.gemstone_treatment,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("gemstone_treatment")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Dyed, Heat Treated, Coated, Reconstituted,
              Bleached, Not-Treated, Filled.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.gemstone_treatment.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("gemstone_treatment", index)}
                />
              ))}
            </div>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label=" Gemstone width"
              placeholder="Enter  Gemstone width"
              value={data.gemstone_width}
              onChange={(e) => update("gemstone_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 5 mm.</p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Jewellery Gemstone weight"
              placeholder="Enter Jewellery Gemstone weight"
              value={data.jewellery_gemstone_weight}
              onChange={(e) =>
                update("jewellery_gemstone_weight", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">Sample values: 1.29, 0.70.</p>
          </div>
          <div className="space-y-1">
            <InputField
              label=" Inscription"
              placeholder="Enter  inscription"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.inscription.input}
              onChange={(e) =>
                update("inscription", {
                  ...data.inscription,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("inscription")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Best Friends Forever, I love you, M & T.
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.inscription.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("inscription", index)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <InputField
              label="Jewelry setting style"
              placeholder="Enter jewelry setting style"
              value={data.jewellery_setting_style}
              onChange={(e) =>
                update("jewellery_setting_style", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample values: 2 prong, 3 stone, Solitaire, Pave, Waterfall,
              Illusion.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Metal stamp or purity"
              placeholder="Enter metal stamp or purity"
              value={data.metal_stamp_or_purity}
              onChange={(e) => update("metal_stamp_or_purity", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 14k, 22k, 925 Sterling.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Occasion"
              placeholder="Enter Occasion"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.occasion.input}
              onChange={(e) =>
                update("occasion", {
                  ...data.occasion,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("occasion")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Anniversary, Wedding, Graduation.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.occasion.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("occasion", index)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <InputField
              label="Plating material"
              placeholder="Enter plating material"
              value={data.plating_material}
              onChange={(e) => update("plating_material", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Silver, Gold, Platinum.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Size system"
              placeholder="Enter size system"
              value={data.size_system}
              onChange={(e) => update("size_system", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: US, UK, EU, 'DE', FR, CN, IT, BR, MEX, AU.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Standard Feature"
              placeholder="Enter Standard Feature"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.jewellery_standard_feature.input}
              onChange={(e) =>
                update("jewellery_standard_feature", {
                  ...data.jewellery_standard_feature,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("jewellery_standard_feature")}
            />
            <p className="text-xs text-gray-500"> Sample value: Resizable.</p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.jewellery_standard_feature.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("jewellery_standard_feature", index)
                  }
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <InputField
              label="Total Gemstone width"
              placeholder="Enter Total Gemstone width"
              value={data.total_gemstone_weight}
              onChange={(e) => update("total_gemstone_weight", e.target.value)}
            />
            <p className="text-xs text-gray-500"> Sample values: 1.29, 0.70.</p>
          </div>
        </div>
      </div>

      {/* Watches */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Watches
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Activity"
              placeholder="Enter Activity"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.activity.input}
              onChange={(e) =>
                update("activity", {
                  ...data.activity,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("activity")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Yoga, Sailing, Diving, Running.
            </p>

            <div className="flex flex-wrap gap-2">
              {data.activity.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("activity", index)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <InputField
              label="Battery_life"
              placeholder="Enter Battery_life"
              value={data.battery_life}
              onChange={(e) => update("battery_life", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 8 d, 12 h, 24 h.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Display technology"
              placeholder="Enter Display technology"
              value={data.display_technology}
              onChange={(e) => update("display_technology", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Analog, Digital, LED, LCD.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Watches Gemstone Cut"
              placeholder="Enter watches gemstone cut"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.watches_gemstone_cut.input}
              onChange={(e) =>
                update("watches_gemstone_cut", {
                  ...data.watches_gemstone_cut,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("watches_gemstone_cut")}
            />
            <p className="text-xs text-gray-500">
              Sample values: 1.5 in, 3.8 cm.
            </p>

            <div className="flex flex-wrap gap-2">
              {data.watches_gemstone_cut.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("watches_gemstone_cut", index)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <InputField
              label="Gemstone weight"
              placeholder="Enter Gemstone weight"
              value={data.watches_gemstone_weight}
              onChange={(e) =>
                update("watches_gemstone_weight", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">Sample values: 1.29, 0.70.</p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Metal stamp or purity"
              placeholder="Enter Metal stamp or purity"
              value={data.metal_stamp_or_purity}
              onChange={(e) => update("metal_stamp_or_purity", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 14k, 22k, 925 Sterling.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Plating material"
              placeholder="Enter Plating material"
              value={data.plating_material}
              onChange={(e) => update("plating_material", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Silver, Gold, Platinum.
            </p>
          </div>
          <div className="space-y-1">
            <InputField
              label="Power type"
              placeholder="Enter Power type"
              value={data.power_type}
              onChange={(e) => update(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Battery Powered.
            </p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Watch Standard features"
              placeholder="Enter Watch standard features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.watches_standard_features.input}
              onChange={(e) =>
                update("watches_standard_features", {
                  ...data.watches_standard_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("watches_standard_features")}
            />
            <p className="text-xs text-gray-500">
              Sample value: Water Resistant.
            </p>

            <div className="flex flex-wrap gap-2">
              {data.watches_standard_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("watches_standard_features", index)
                  }
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <InputField
              label=" Total Gemstone weight"
              placeholder="Enter Total Gemstone weight"
              value={data.watches_total_gemstone_weight}
              onChange={(e) =>
                update("watches_total_gemstone_weight", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">Sample values: 1.29, 0.70.</p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Watch band width"
              placeholder="Enter Watch band width"
              value={data.watch_band_width}
              onChange={(e) => update("watch_band_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 22 mm, 0.87 in.
            </p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Watch case thickness"
              placeholder="Enter Watch case thickness"
              value={data.watch_case_thickness}
              onChange={(e) => update("watch_case_thickness", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 5 mm.</p>
          </div>{" "}
          <div className="space-y-1">
            <InputField
              label="Watch movement type"
              placeholder="Enter Watch movement type"
              value={data.watch_movement_type}
              onChange={(e) => update("watch_movement_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 1.29, 0.70.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <UniversalButton
          type="button"
          icon={<WatchOutlinedIcon sx={{ fontSize: 20 }} />}
          label="Save Jewellery & Watches"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Jewellery;
