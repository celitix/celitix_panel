import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Chip } from "@mui/material";

// icons
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";

// components
import InputField from "@/components/layout/InputField"; 
import UniversalButton from "@/components/common/UniversalButton";

// purchase consideration
// height - input
// length - input
// width - input
// pattern - input
// finish - input
// volume - input
// material -input
// size - input
// scent - input
// decor_style - input

// Home Goods
// capacity - input
// character - input
// is_assembly_required - radio - yes or no deafult yes
// is_powered - radio - yes or no deafult yes
// light_bulb_type - input
// mount_type - input
// number_of_lights - input - numeric
// occasion - input
// power_type - input
// product_weight - input
// recommended_rooms - input
// shape - input
// standard_features - input
// theme - input

// Furniture
// bed_frame_type - input
// character - input
// comfort_level - input
// fabric_care_instructions - input - and comma separated values payload - ["Dry Clean Only", "Machine Washable"]
// fill_material - input - and comma separated values payload - ["Foam", "Cotton"]
// is_assembly_required - radio - yes or no deafult yes
// indoor_outdoor - input
// mattress_thickness - input
// mount_type - input
// number_of_drawers - input - numeric
// number_of_seats - input - numeric
// number_of_shelves - input - numeric
// power_type - input
// product_weight - input
// recommended_rooms - input - and comma separated values payload - ["Family Room", "Home Office"]
// seat_back_height - input
// seat_height - input
// seat_material - input
// shape - input
// standard_features -  input - and comma separated values payload - ["Foldable", "Inflatable"]
// theme - input

// Bedding
// bed_frame_type - input
// closure - input
// fabric_care_instructions - input - and comma separated values payload - ["Do Not Iron", "Hand Wash"]
// fill_material -  input - and comma separated values payload - ["Foam", "Latex"]
// is_set - radio - yes or no deafult yes
// pieces_in_set - input - numeric
// standard_features - input - and comma separated values payload - ["Stain Resistant", "Sustainably Sourced"]
// theme - input

// Appliances
// additional_features - input - and comma separated values payload - [" WiFi Connect", "Customizable Shelving"]
// btu - input - numeric
// fuel_type - input
// is_set - radio - yes or no deafult yes
// load_position - input
// number_of_burners - input - numeric
// number_of_doors - input - numeric
// number_of_shelves - input - numeric
// power_type - input
// product_weight - input
// smart_home_compatibility - input
// sound_rating - input - numeric
// standard_features - input - and comma separated values payload - ["Wi-Fi Compatible", "Remote Control Included"]
// volts - input
// watts - input - numeric

// Cleaning Supplies
// additional_features  - input - and comma separated values payload - [Unscentede"]
// bag_type - input
// capacity - input
// instructions  - input - and comma separated values payload - [pray directly on floors and then wipe away with a damp mop","Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors"]
// product_form - input
// shelf_life - input - numeric
// standard_features - input - and comma separated values payload - ["Biodegradable", "Recyclable"]
// vacuum_type - input
// warnings - input - and comma separated values payload - ["Chemical", "Combustible"]

const initialState = {
  // purchase consideration
  height: "",
  length: "",
  width: "",
  pattern: "",
  finish: "",
  volume: "",
  material: "",
  size: "",
  scent: "",
  decor_style: "",

  // Home Goods
  home_capacity: "",
  character: "",
  is_assembly_required: "Yes",
  is_powered: "Yes",
  light_bulb_type: "",
  mount_type: "",
  number_of_lights: "",
  occasion: "",
  home_power_type: "",
  home_product_weight: "",
  recommended_rooms: "",
  shape: "",
  home_standard_features: "",
  home_theme: "",

  // Furniture
  furniture_bed_frame_type: "",
  comfort_level: "",
  furniture_fabric_care_instructions: {
    input: "",
    chips: [],
  },
  furniture_fill_material: {
    input: "",
    chips: [],
  },
  furniture_recommended_rooms: {
    input: "",
    chips: [],
  },
  furniture_standard_features: {
    input: "",
    chips: [],
  },
  furniture_is_set: "Yes",
  furniture_pieces_in_set: "",
  indoor_outdoor: "",
  mattress_thickness: "",
  number_of_drawers: "",
  number_of_seats: "",
  furniture_number_of_shelves: "",
  seat_back_height: "",
  seat_height: "",
  seat_material: "",

  // Bedding
  bedding_bed_frame_type: "",
  closure: "",
  bedding_fabric_care_instructions: {
    input: "",
    chips: [],
  },

  bedding_fill_material: {
    input: "",
    chips: [],
  },
  bedding_is_set: "Yes",
  bedding_pieces_in_set: "",
  bedding_standard_features: {
    input: "",
    chips: [],
  },

  bedding_theme: "",

  // Appliances
  appliances_additional_features: {
    input: "",
    chips: [],
  },
  btu: "",
  fuel_type: "",
  appliances_is_set: "Yes",
  load_position: "",
  number_of_burners: "",
  number_of_doors: "",
  // number_of_doors: "",
  appliances_number_of_shelves: "",
  appliances_power_type: "",
  appliances_product_weight: "",
  smart_home_compatibility: "",
  sound_rating: "",
  appliances_standard_features: {
    input: "",
    chips: [],
  },
  volts: "",
  watts: "",

  // Cleaning Supplies
  cleaning_additional_features: {
    input: "",
    chips: [],
  },
  bag_type: "",
  cleaning_capacity: "",
  instructions: {
    input: "",
    chips: [],
  },
  product_form: "",
  shelf_life: "",
  cleaning_standard_features: {
    input: "",
    chips: [],
  },
  vacuum_type: "",
  warnings: {
    input: "",
    chips: [],
  },
};

const HomeDecor = () => {
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
      number_of_lights: Number(data.number_of_lights),
      number_of_drawers: Number(data.number_of_drawers),
      number_of_seats: Number(data.number_of_seats),
      number_of_shelves: Number(data.number_of_shelves),
      pieces_in_set: Number(data.pieces_in_set),
      number_of_burners: Number(data.number_of_burners),
      number_of_doors: Number(data.number_of_doors),
      appliances_number_of_shelves: Number(data.appliances_number_of_shelves),
      sound_rating: Number(data.sound_rating),
      shelf_life: Number(data.shelf_life),
    };

    console.log("clicked submit");
    console.log("SUBMITTED PAYLOAD:", payload);

    toast.success("Home Decor details saved successfully!");

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
    <div className="w-full space-y-6  ">
      {/* purchase consideration */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Purchase Consideration
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Height */}
          <div className="space-y-1">
            <InputField
              label="Height"
              placeholder="Enter height"
              value={data.height}
              onChange={(e) => update("height", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 2.5 m
            </p>
          </div>

          {/* Length */}
          <div className="space-y-1">
            <InputField
              label="Length"
              placeholder="Enter length"
              value={data.length}
              onChange={(e) => update("length", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 2.5 m
            </p>
          </div>

          {/* Width */}
          <div className="space-y-1">
            <InputField
              label="Width"
              placeholder="Enter width"
              value={data.width}
              onChange={(e) => update("width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 2.5 m
            </p>
          </div>

          {/* Pattern */}
          <div className="space-y-1">
            <InputField
              label="Pattern"
              placeholder="Enter pattern"
              value={data.pattern}
              onChange={(e) => update("pattern", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Plaid, Polka Dot, Gingham, Chevron
            </p>
          </div>

          {/* Finish */}
          <div className="space-y-1">
            <InputField
              label="Finish"
              placeholder="Enter finish"
              value={data.finish}
              onChange={(e) => update("finish", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Natural / Unfinished, Walnut, Pewter, Antiqued
            </p>
          </div>

          {/* Volume */}
          <div className="space-y-1">
            <InputField
              label="Volume"
              placeholder="Enter volume"
              value={data.volume}
              onChange={(e) => update("volume", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 12 oz, 8 oz, 1 Litre
            </p>
          </div>

          {/* Material */}
          <div className="space-y-1">
            <InputField
              label="Material"
              placeholder="Enter material"
              value={data.material}
              onChange={(e) => update("material", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Cotton, Linen, Cashmere, Silk
            </p>
          </div>

          {/* Size */}
          <div className="space-y-1">
            <InputField
              label="Size"
              placeholder="Enter size"
              value={data.size}
              onChange={(e) => update("size", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Twin, Twin XL, Full, Queen, King, California King
            </p>
          </div>

          {/* Scent */}
          <div className="space-y-1">
            <InputField
              label="Scent"
              placeholder="Enter scent"
              value={data.scent}
              onChange={(e) => update("scent", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Lavender, Vanilla, Lemon, Coconut, Jasmine, Pine
            </p>
          </div>

          {/* Decor Style */}
          <div className="space-y-1">
            <InputField
              label="Decor Style"
              placeholder="Enter decor style"
              value={data.decor_style}
              onChange={(e) => update("decor_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Bohemian, Contemporary, Industrial, Mid-Century,
              Modern, Rustic, Vintage
            </p>
          </div>
        </div>
      </div>

      {/*  Home Goods */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Home Goods
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Capacity */}
          <div className="space-y-1">
            <InputField
              label="Capacity"
              placeholder="Enter capacity"
              value={data.home_capacity}
              onChange={(e) => update("home_capacity", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              {" "}
              Sample values: 500 ml, 1 l.
            </p>
          </div>

          {/* Character */}
          <div className="space-y-1">
            <InputField
              label="Character"
              placeholder="Enter character"
              value={data.home_character}
              onChange={(e) => update("home_character", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Chewbacca, Spongebob.
            </p>
          </div>

          {/* Is_assembly_required */}
          <div className="space-y-1">
            <RadioGroup
              label="Is_assembly_required"
              options={["Yes", "No"]}
              value={data.is_assembly_required}
              onChange={(v) => update("is_assembly_required", v)}
            />

            <p className="text-xs text-gray-500">Sample values: Yes, No.</p>
          </div>

          {/* Is_powered */}
          <div className="space-y-1">
            <RadioGroup
              label="Is_powered"
              options={["Yes", "No"]}
              value={data.home_is_powered}
              onChange={(v) => update("home_is_powered", v)}
            />
            <p className="text-xs text-gray-500">Sample values: Yes, No.</p>
          </div>

          {/* Light_bulb_type */}
          <div className="space-y-1">
            <InputField
              label="Light_bulb_type"
              placeholder="Enter Light_bulb_type"
              value={data.light_bulb_type}
              onChange={(e) => update("light_bulb_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Fluorescent, Halogen, Incandescent, LED.
            </p>
          </div>

          {/* Mount_type */}
          <div className="space-y-1">
            <InputField
              label="Mount_type"
              placeholder="Enter Mount_type"
              value={data.home_mount_type}
              onChange={(e) => update("home_mount_type", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Wall Mount, Ceiling Mount.
            </p>
          </div>

          {/* Number_of_lights */}
          <div className="space-y-1">
            <InputField
              label="Number_of_lights"
              placeholder="Enter Number_of_lights"
              value={data.number_of_lights}
              onChange={(e) => update("number_of_lights", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 1, 2, 5.</p>
          </div>

          {/* Occasion */}
          <div className="space-y-1">
            <InputField
              label="Occasion"
              placeholder="Enter Occasion"
              value={data.occasion}
              onChange={(e) => update("occasion", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Wedding, Graduation, Halloween, Thanksgiving.
            </p>
          </div>

          {/* Power_type */}
          <div className="space-y-1">
            <InputField
              label="Power_type"
              placeholder="Enter Power_type"
              value={data.home_power_type}
              onChange={(e) => update("home_power_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Battery, Hardwired, Plug-In.
            </p>
          </div>

          {/* Product_weight */}
          <div className="space-y-1">
            <InputField
              label="Product_weight"
              placeholder="Enter Product_weight"
              value={data.home_product_weight}
              onChange={(e) => update("home_product_weight", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 45 lb, 120 lb, 54 kg, 80 kg.
            </p>
          </div>

          {/* Recommended_rooms */}
          <div className="space-y-1">
            <InputField
              label="Recommended_rooms"
              placeholder="Enter Recommended_rooms"
              value={data.home_recommended_rooms}
              onChange={(e) => update("home_recommended_rooms", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Family Room, Home Office, Kitchen, Dining Room,
              Bedroom.
            </p>
          </div>

          {/* Shape */}
          <div className="space-y-1">
            <InputField
              label="Shape"
              placeholder="Enter Shape"
              value={data.shape}
              onChange={(e) => update("shape", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Rectangle, Square, Oval, Circle, Triangle.
            </p>
          </div>

          {/* Standard_features */}
          <div className="space-y-1">
            <InputField
              label="Standard_features"
              placeholder="Enter Standard_features"
              value={data.home_standard_features}
              onChange={(e) => update("home_standard_features", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Automatic Shut Off, Energy Star-Certified.
            </p>
          </div>

          {/* Theme */}
          <div className="space-y-1">
            <InputField
              label="Theme"
              placeholder="Enter Theme"
              value={data.home_theme}
              onChange={(e) => update("home_theme", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Space, Super Heroes, Automobiles.
            </p>
          </div>
        </div>
      </div>

      {/* Furniture */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Furniture
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Bed_frame_type */}
          <div className="space-y-1">
            <InputField
              label="Bed frame type"
              placeholder="Enter Bed frame type"
              value={data.furniture_bed_frame_type}
              onChange={(e) =>
                update("furniture_bed_frame_type", e.target.value)
              }
            />

            <p className="text-xs text-gray-500">
              Sample values: Canopy Bed, Platform Bed, Storage Bed, Bunk Bed,
              Four Poster Bed.
            </p>
          </div>

          {/* Character */}
          <div className="space-y-1">
            <InputField
              label="Character"
              placeholder="Enter Character"
              value={data.furniture_character}
              onChange={(e) => update("furniture_character", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Chewbacca, Spongebob.
            </p>
          </div>

          {/* Comfort_level */}
          <div className="space-y-1">
            <InputField
              label="Comfort level"
              placeholder="Enter Comfort level"
              value={data.comfort_level}
              onChange={(e) => update("comfort_level", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Extra Plush, Plush, Medium, Firm, Extra Firm,
              Adjustable.
            </p>
          </div>

          {/* Fabric_care_instructions */}
          <div className="space-y-1">
            <InputField
              label="Fabric care instructions"
              placeholder=" Enter Fabric care instructions"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.furniture_fabric_care_instructions.input}
              onChange={(e) =>
                update("furniture_fabric_care_instructions", {
                  ...data.furniture_fabric_care_instructions,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown(
                "furniture_fabric_care_instructions",
              )}
            />
            <p className="text-xs text-gray-500">
              Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand
              Wash.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.furniture_fabric_care_instructions.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip("furniture_fabric_care_instructions", index)
                    }
                  />
                ),
              )}
            </div>
          </div>

          {/* fill_material */}
          <div className="space-y-1">
            <InputField
              label="Fill material"
              placeholder=" Enter Fill material"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.furniture_fill_material.input}
              onChange={(e) =>
                update("furniture_fill_material", {
                  ...data.furniture_fill_material,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("furniture_fill_material")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Polyester, Foam, Latex, Down, Cotton.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.furniture_fill_material.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("furniture_fill_material", index)}
                />
              ))}
            </div>
          </div>

          {/* furniture_is_set */}
          <div className="space-y-1">
            <RadioGroup
              label="Furniture Is set"
              options={["Yes", "No"]}
              value={data.furniture_is_set}
              onChange={(v) => update("furniture_is_set", v)}
            />

            <p className="text-xs text-gray-500"> Sample values: Yes, No.</p>
          </div>

          {/* Pieces_in_set */}
          <div className="space-y-1">
            <InputField
              label="Pieces in set"
              placeholder="Enter Pieces in set"
              value={data.furniture_pieces_in_set}
              onChange={(e) =>
                update("furniture_pieces_in_set", e.target.value)
              }
            />

            <p className="text-xs text-gray-500">Sample values: 3, 4, 6.</p>
          </div>

          {/* Indoor_outdoor */}
          <div className="space-y-1">
            <InputField
              label="Indoor outdoor"
              placeholder="Enter Indoor outdoor"
              value={data.indoor_outdoor}
              onChange={(e) => update("indoor_outdoor", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Indoor Only, Outdoor Only, Indoor/Outdoor.
            </p>
          </div>

          {/* Mattress_thickness */}
          <div className="space-y-1">
            <InputField
              label="Mattress thickness"
              placeholder="Enter Mattress thickness"
              value={data.mattress_thickness}
              onChange={(e) => update("mattress_thickness", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: 12 in, 15 in, 30 cm, 38 cm.
            </p>
          </div>

          {/* Mount_type */}
          <div className="space-y-1">
            <InputField
              label="Mount type"
              placeholder="Enter Mount type"
              value={data.furniture_mount_type}
              onChange={(e) => update("furniture_mount_type", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Wall Mount, Ceiling Mount.
            </p>
          </div>

          {/* Number_of_drawer */}
          <div className="space-y-1">
            <InputField
              label="Number of drawers"
              placeholder="Enter Number of drawer"
              value={data.number_of_drawers}
              onChange={(e) => update("number_of_drawers", e.target.value)}
            />

            <p className="text-xs text-gray-500">Sample values: 2, 4, 8.</p>
          </div>

          {/* Number_of_seats */}
          <div className="space-y-1">
            <InputField
              label="Number of seats"
              placeholder="Enter Number_of_seats"
              value={data.number_of_seats}
              onChange={(e) => update("number_of_seats", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: 1, 2, 4, 6, 8.
            </p>
          </div>

          {/* Number_of_shelves */}
          <div className="space-y-1">
            <InputField
              label="Number of shelves"
              placeholder="Enter Number_of_shelves"
              value={data.furniture_number_of_shelves}
              onChange={(e) =>
                update("furniture_number_of_shelves", e.target.value)
              }
            />

            <p className="text-xs text-gray-500"> Sample values: 2, 4, 8.</p>
          </div>

          {/* Power_type */}
          <div className="space-y-1">
            <InputField
              label="Power type"
              placeholder="Enter Power type"
              value={data.furniture_power_type}
              onChange={(e) => update("furniture_power_type", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Battery, Hardwired, Plug-In.
            </p>
          </div>

          {/* Product_weight */}
          <div className="space-y-1">
            <InputField
              label="Product weight"
              placeholder="Enter Product weight"
              value={data.furniture_product_weight}
              onChange={(e) =>
                update("furniture_product_weight", e.target.value)
              }
            />

            <p className="text-xs text-gray-500">
              {" "}
              Sample values: 45 lb, 120 lb, 54 kg, 80 kg.
            </p>
          </div>

          {/* Recommended_rooms */}
          <div className="space-y-1">
            <InputField
              label="Recommended rooms"
              placeholder=" Enter Recommended rooms"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.furniture_recommended_rooms.input}
              onChange={(e) =>
                update("furniture_recommended_rooms", {
                  ...data.furniture_recommended_rooms,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("furniture_recommended_rooms")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Family Room, Home Office, Kitchen, Dining Room,
              Bedroom.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.furniture_recommended_rooms.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("furniture_recommended_rooms", index)
                  }
                />
              ))}
            </div>
          </div>

          {/* Seat_back_height */}
          <div className="space-y-1">
            <InputField
              label="Seat back height"
              placeholder="Enter Seat back height"
              value={data.seat_back_height}
              onChange={(e) => update("seat_back_height", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              {" "}
              Sample values: 20 in, 20 cm, 2 ft, 60 cm.
            </p>
          </div>

          {/* Seat_height */}
          <div className="space-y-1">
            <InputField
              label="Seat height"
              placeholder="Enter Seat height"
              value={data.seat_height}
              onChange={(e) => update("seat_height", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              {" "}
              Sample values: 20 in, 20 cm, 2 ft, 60 cm.
            </p>
          </div>

          {/* Seat_material */}
          <div className="space-y-1">
            <InputField
              label="Seat material"
              placeholder="Enter Seat material"
              value={data.seat_material}
              onChange={(e) => update("seat_material", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Leather, Upholstered, Wood.
            </p>
          </div>

          {/* Shape */}
          <div className="space-y-1">
            <InputField
              label="Shape"
              placeholder="Enter Shape"
              value={data.shape}
              onChange={(e) => update("shape", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Rectangle, Square, Oval, Circle, Triangle.
            </p>
          </div>

          {/* Standard_features */}
          <div className="space-y-1">
            <InputField
              label="Standard features"
              placeholder=" Enter Standard features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.furniture_standard_features.input}
              onChange={(e) =>
                update("furniture_standard_features", {
                  ...data.furniture_standard_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("furniture_standard_features")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Automatic Shut Off, Energy Star-Certified.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.furniture_standard_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("furniture_standard_features", index)
                  }
                />
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-1">
            <InputField
              label="Theme"
              placeholder="Enter Theme"
              value={data.furniture_theme}
              onChange={(e) => update("furniture_theme", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Space, Super Heroes, Automobiles.
            </p>
          </div>
        </div>
      </div>

      {/* Bedding */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Bedding
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Bed frame type"
              placeholder="Enter Bed frame type"
              value={data.bedding_bed_frame_type}
              onChange={(e) => update("bedding_bed_frame_type", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Canopy Bed, Platform Bed, Storage Bed, Bunk Bed,
              Four Poster Bed.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Closure"
              placeholder="Enter Closure"
              value={data.closure}
              onChange={(e) => update("closure", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Zipper, Button, Snap, Drawstring, Lace Up, Slip On,
              Buckle.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Fabric care instructions"
              placeholder="Enter Fabric care instructions"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.bedding_fabric_care_instructions.input}
              onChange={(e) =>
                update("bedding_fabric_care_instructions", {
                  ...data.bedding_fabric_care_instructions,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("bedding_fabric_care_instructions")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand
              Wash.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.bedding_fabric_care_instructions.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip("bedding_fabric_care_instructions", index)
                    }
                  />
                ),
              )}
            </div>
          </div>

          <div className="space-y-1">
            <InputField
              label="Fill material"
              placeholder="Enter Fill material"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.bedding_fill_material.input}
              onChange={(e) =>
                update("bedding_fill_material", {
                  ...data.bedding_fill_material,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("bedding_fill_material")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Polyester, Foam, Latex, Down, Cotton.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.bedding_fill_material.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("bedding_fill_material", index)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <RadioGroup
              label="Bedding Is set"
              options={["Yes", "No"]}
              value={data.bedding_is_set}
              onChange={(v) => update("bedding_is_set", v)}
            />

            <p className="text-xs text-gray-500"> Sample values: Yes, No.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Pieces in set"
              placeholder="Enter Pieces in set"
              value={data.bedding_pieces_in_set}
              onChange={(e) => update("bedding_pieces_in_set", e.target.value)}
            />

            <p className="text-xs text-gray-500">Sample values: 3, 4, 6.</p>
          </div>

          <div className="space-y-2">
            <InputField
              label="Standard features"
              placeholder="Type and press Enter"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.bedding_standard_features.input}
              onChange={(e) =>
                update("bedding_standard_features", {
                  ...data.bedding_standard_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("bedding_standard_features")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Hypoallergenic, Reversible, Stain Resistant, Water
              Resistant, Organic, Sustainably Sourced.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.bedding_standard_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("bedding_standard_features", index)
                  }
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <InputField
              label="Theme"
              placeholder="Enter Theme"
              value={data.bedding_theme}
              onChange={(e) => update("bedding_theme", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Space, Super Heroes, Automobiles.
            </p>
          </div>
        </div>
      </div>

      {/*  Appliances */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Appliances
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Additional features"
              placeholder="Enter Additional features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.appliances_additional_features.input}
              onChange={(e) =>
                update("appliances_additional_features", {
                  ...data.appliances_additional_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("appliances_additional_features")}
            />
            <p className="text-xs text-gray-500">
              Sample values: LED Lighting, Built-in Lock, WiFi Connect,
              Customizable Shelving.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.appliances_additional_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("appliances_additional_features", index)
                  }
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <InputField
              label="Btu"
              placeholder="Enter Btu"
              value={data.btu}
              onChange={(e) => update("btu", e.target.value)}
            />

            <p className="text-xs text-gray-500">Sample value: 10,200.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Fuel type"
              placeholder="Enter Fuel type"
              value={data.fuel_type}
              onChange={(e) => update("fuel_type", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Electric, Gas, Dual.
            </p>
          </div>

          <div className="space-y-1">
            <RadioGroup
              label="Appliances Is set"
              options={["Yes", "No"]}
              value={data.appliances_is_set}
              onChange={(v) => update("appliances_is_set", v)}
            />

            <p className="text-xs text-gray-500"> Sample values: Yes, No.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Load Position"
              placeholder="Enter Load Position"
              value={data.load_position}
              onChange={(e) => update("load_position", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Top Load, Front Load.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Number of Burner"
              placeholder="Enter Number of Burner"
              value={data.number_of_burners}
              onChange={(e) => update("number_of_burners", e.target.value)}
            />

            <p className="text-xs text-gray-500">Sample values: 2, 3, 4.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Number of doors"
              placeholder="Enter Number of doors"
              value={data.number_of_doors}
              onChange={(e) => update("number_of_doors", e.target.value)}
            />

            <p className="text-xs text-gray-500">Sample values: 1, 2, 4.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Number of shelves"
              placeholder="Enter Number_of_shelves"
              value={data.appliances_number_of_shelves}
              onChange={(e) =>
                update("appliances_number_of_shelves", e.target.value)
              }
            />

            <p className="text-xs text-gray-500">Sample values: 2, 4, 8.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Power type"
              placeholder="Enter Power type"
              value={data.appliances_power_type}
              onChange={(e) => update("appliances_power_type", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: Battery, Hardwired, Plug-In.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Product weight"
              placeholder="Enter Product weight"
              value={data.appliances_product_weight}
              onChange={(e) =>
                update("appliances_product_weight", e.target.value)
              }
            />

            <p className="text-xs text-gray-500">
              Sample values: 45 lb, 120 lb, 54 kg, 80 kg.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Smart home compatibility"
              placeholder="Enter Smart home compatibility"
              value={data.smart_home_compatibility}
              onChange={(e) =>
                update("smart_home_compatibility", e.target.value)
              }
            />

            <p className="text-xs text-gray-500">
              Sample values: Amazon Alexa, Google Assistant, Nest, Samsung
              SmartThings, WeMo, Philips Hue, Apple HomeKit, Logitech Harmony.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Sound Rating"
              placeholder="Enter Sound Rating"
              value={data.sound_rating} 
              onChange={(e) =>
                update("sound_rating", e.target.value)
              }
              />
            {/* <StarRating
              onChange={(v) => update("sound_rating", String(v))}
            /> */}

            <p className="text-xs text-gray-500">
              Sample values: 44, 46, 48, 50.{" "}
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Standard features"
              placeholder="Enter Standard features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.appliances_standard_features.input}
              onChange={(e) =>
                update("appliances_standard_features", {
                  ...data.appliances_standard_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("appliances_standard_features")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Automatic Shut Off, Energy Star-Certified,
              Bluetooth Compatible, Industrial, Remote Control Included, Wi-Fi
              Compatible.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.appliances_standard_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("appliances_standard_features", index)
                  }
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <InputField
              label="Volts"
              placeholder="Enter Volts"
              value={data.volts}
              onChange={(e) => update("volts", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: 220 V, Input 100 VAC, Output 12VDC.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Watt"
              placeholder="Enter Watt"
              value={data.watts}
              onChange={(e) => update("watts", e.target.value)}
            />

            <p className="text-xs text-gray-500">
              Sample values: 400 W, 1500 W.
            </p>
          </div>
        </div>
      </div>

      {/* Cleaning Supplies */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Cleaning Supplies
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <InputField
              label="Cleaning features"
              placeholder="Enter Cleaning features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.cleaning_additional_features.input}
              onChange={(e) =>
                update("cleaning_additional_features", {
                  ...data.cleaning_additional_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("cleaning_additional_features")}
            />
            <p className="text-xs text-gray-500">Sample value: Unscented.</p>
            <div className="flex flex-wrap gap-2">
              {data.cleaning_additional_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("cleaning_additional_features", index)
                  }
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <InputField
              label="Bag type"
              placeholder="Enter Bag type"
              value={data.bag_type}
              onChange={(e) => update("bag_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Bag, Bagless.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Capacity"
              placeholder="Enter capacity"
              value={data.cleaning_capacity}
              onChange={(e) => update("cleaning_capacity", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: 12 oz, 18 ml.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Instructions"
              placeholder="Enter Instructions"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.instructions.input}
              onChange={(e) =>
                update("instructions", {
                  ...data.instructions,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("instructions")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Spray directly on floors and then wipe away with a
              damp mop, Dilute a bit of the all purpose cleaner in water and use
              the solution to mop your floors.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.instructions.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("instructions", index)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <InputField
              label="Product form"
              placeholder="Enter Product form"
              value={data.height}
              onChange={(e) => update("product_form", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: liquid, gel, aerosol spray.
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Shelf life"
              placeholder="Enter Shelf life"
              value={data.shelf_life}
              onChange={(e) => update("shelf_life", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 15, 30, 100.</p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Standard features"
              placeholder="Enter Standard features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.cleaning_standard_features.input}
              onChange={(e) =>
                update("cleaning_standard_features", {
                  ...data.cleaning_standard_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("cleaning_standard_features")}
            />
            <p className="text-xs text-gray-500">
              Sample values: Biodegradable, Recyclable.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.cleaning_standard_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("cleaning_standard_features", index)
                  }
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <InputField
              label="Vacuum type"
              placeholder="Enter Vacuum type"
              value={data.vacuum_type}
              onChange={(e) => update("vacuum_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 2.5 m
            </p>
          </div>

          <div className="space-y-1">
            <InputField
              label="Warnings"
              placeholder="Enter Warnings"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.warnings.input}
              onChange={(e) =>
                update("warnings", {
                  ...data.warnings,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("warnings")}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 2.5 m
            </p>
            <div className="flex flex-wrap gap-2">
              {data.warnings.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("warnings", index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <UniversalButton
          type="button"
          icon={<ChairOutlinedIcon sx={{ fontSize: 20 }} />}
          label="Save Home Decor"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default HomeDecor;

const RadioGroup = ({ options, label, value, onChange }) => (
  <div className="flex flex-col ">
    {/* {label} */}

    {label && (
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
    )}

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
