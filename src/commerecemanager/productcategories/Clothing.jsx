import React, { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import toast from "react-hot-toast";

// icons
import { GiClothes } from "react-icons/gi";

// components
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/components/common/UniversalButton";

const initialState = {
  //   Recommended Attributes
  material: "",
  size: "",
  height: "",
  length: "",
  width: "",
  pattern: "",

  //   cloths
  activity: {
    input: "",
    chips: [],
  },
  bra_band_size: "",
  bra_cup_size: "",
  character: "",
  chest_size: "",
  closure: "",
  clothing_size_type: "",
  collar_style: "",
  denim_features: {
    input: "",
    chips: [],
  },
  inseam: "",
  is_costume: "Yes",
  is_outfit_set: "Yes",
  jean_wash: "",
  neckline: "",
  pant_fit: "",
  sheerness: "",
  size_system: "",
  skirt_length: "",
  sleeve_length: "",
  sleeve_length_style: "",
  sleeve_style: "",
  sock_rise: "",
  sport: {
    input: "",
    chips: [],
  },
  sports_league: "",
  sports_team: "",
  standard_features: {
    input: "",
    chips: [],
  },
  theme: "",
  upper_body_strap_configuration: "",
  waist_rise: "",
  waist_style: "",

  // Shoes & Footwear
  character_shoes_footwear: "",
  closure_shoes_footwear: "",
  fabric_care_instructions: {
    input: "",
    chips: [],
  },
  heel_height: "",
  heel_style: "",
  shoe_type: "",
  shoe_width: "",
  size_system_shoes_footwear: "",
  sport_shoes_footwear: {
    input: "",
    chips: [],
  },
  sports_league_shoes_footwear: "",
  sports_league_shoes_footwear: "",
  standard_features_shoes_footwear: {
    input: "",
    chips: [],
  },

  //   Clothing Accessories
  character_clothing_accessories: "",
  closure_clothing_accessories: "",
  fabric_care_instructions_clothing_accessories: {
    input: "",
    chips: [],
  },
  is_costume_clothing_accessories: "Yes",
  size_system_clothing_accessories: "",
  sport_clothing_accessories: {
    input: "",
    chips: [],
  },
  sports_league_clothing_accessories: "",
  sports_team_clothing_accessories: "",
  standard_features_clothing_accessories: {
    input: "",
    chips: [],
  },
  sunglasses_lens_color: "",
  sunglasses_lens_technology: {
    input: "",
    chips: [],
  },
  sunglasses_width: "",
  theme_clothing_accessories: "",
  tie_width: "",
};

const Clothing = () => {
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
      bra_band_size: Number(data.bra_band_size),
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
    <div className="w-full space-y-6 ">
      {/*  Recommended Attributes */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Recommended Attributes
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Material */}
          <div className="space-y-1">
            <InputField
              label="Material"
              placeholder="Enter material"
              value={data.material}
              onChange={(e) => update("material", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Cotton, Linen, Cashmere, Silk.
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
              Small, Medium, Large, 2, 4, 6, One Size.
            </p>
          </div>

          {/* Height */}
          <div className="space-y-1">
            <InputField
              label="Height"
              placeholder="Enter height"
              value={data.height}
              onChange={(e) => update("height", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 2.5 ft.
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
        </div>
      </div>

      {/*  Clothing */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Clothing
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Activity */}
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
              {" "}
              Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.
            </p>
            {/* Chips */}
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

          {/* Bra Band Size */}
          <div className="space-y-1">
            <InputField
              label="Bra Band Size"
              placeholder="Enter Bra Band Size"
              value={data.bra_band_size}
              onChange={(e) => update("bra_band_size", e.target.value)}
            />

            <p className="text-xs text-gray-500">Sample values: 32, 34, 36.</p>
          </div>

          {/* Bra Cup Size */}
          <div className="space-y-1">
            <InputField
              label="Bra Cup Size"
              placeholder="Enter Bra Cup Size"
              value={data.bra_cup_size}
              onChange={(e) => update("bra_cup_size", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample Values: A, B, DD, F.</p>
          </div>

          {/* Character */}
          <div className="space-y-1">
            <InputField
              label="Character"
              placeholder="Enter Character"
              value={data.character}
              onChange={(e) => update("character", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Chewbacca, Spongebob.
            </p>
          </div>

          {/* Chest Size */}
          <div className="space-y-1">
            <InputField
              label="Chest Size"
              placeholder="Enter Chest Size"
              value={data.chest_size}
              onChange={(e) => update("chest_size", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 47 cm, 16.9 in, 50 cm, 19.7 in.
            </p>
          </div>

          {/* Closure */}
          <div className="space-y-1">
            <InputField
              label="Closure"
              placeholder="Enter Closure"
              value={data.closure}
              onChange={(e) => update("closure", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Zipper, Button, Snap, Drawstring.
            </p>
          </div>

          {/* Clothing Size Type */}
          <div className="space-y-1">
            <InputField
              label="Clothing Size Type"
              placeholder="Enter Clothing Size Type"
              value={data.clothing_size_type}
              onChange={(e) => update("clothing_size_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Big & Tall, Regular, Big Boys, Big Girls, Full
              Size, Little Boys, Little Girls, Petite, Plus, Maternity, Baby
              Boy, Baby Girls, Toddler Boys, Toddler Girls.
            </p>
          </div>

          {/* Collar Style */}
          <div className="space-y-1">
            <InputField
              label="Collar Style"
              placeholder="Enter Collar Style"
              value={data.collar_style}
              onChange={(e) => update("collar_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Banded, Cutaway, Clifford, Tuxedo.
            </p>
          </div>

          {/* Denim Features */}
          <div className="space-y-1">
            <InputField
              label="Denim Features"
              placeholder="Enter Denim Features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.denim_features.input}
              onChange={(e) =>
                update("denim_features", {
                  ...data.denim_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("denim_features")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Distressed, Wrinkled, Ripped, Embroidered, Raw Hem.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.denim_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("denim_features", index)}
                />
              ))}
            </div>
          </div>

          {/* inseam */}
          <div className="space-y-1">
            <InputField
              label="inseam"
              placeholder="Enter inseam"
              value={data.inseam}
              onChange={(e) => update("inseam", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 30 in, 34 in, 80 cm, 86 cm.
            </p>
          </div>

          {/* Is Costume */}
          <div className="space-y-1">
            <RadioGroup
              label="Is Costume"
              options={["Yes", "No"]}
              value={data.is_costume}
              onChange={(v) => update("is_costume", v)}
            />
            <p className="text-xs text-gray-500">Sample values: Yes, No.</p>
          </div>

          {/* Is Outfit Set */}
          <div className="space-y-1">
            <RadioGroup
              label="Is Outfit Set"
              options={["Yes", "No"]}
              value={data.is_outfit_set}
              onChange={(v) => update("is_outfit_set", v)}
            />
            <p className="text-xs text-gray-500">Sample values: Yes, No.</p>
          </div>

          {/* Jean Wash */}
          <div className="space-y-1">
            <InputField
              label="Jean Wash"
              placeholder="Enter Jean Wash"
              value={data.jean_wash}
              onChange={(e) => update("jean_wash", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Acid Wash, Dark Wash, Vintage Wash.
            </p>
          </div>

          {/* Neckline */}
          <div className="space-y-1">
            <InputField
              label="Neckline"
              placeholder="Enter Neckline"
              value={data.neckline}
              onChange={(e) => update("neckline", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Crew Neck, Sweetheart, V-Neck, Boat Neck,
              Turtleneck.
            </p>
          </div>

          {/* Pant Fit */}
          <div className="space-y-1">
            <InputField
              label="Pant Fit"
              placeholder="Enter Pant Fit"
              value={data.pant_fit}
              onChange={(e) => update("pant_fit", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Relaxed, Slim, Curvy, Cigarette, Boyfriend.
            </p>
          </div>

          {/* Sheerness */}
          <div className="space-y-1">
            <InputField
              label="Sheerness"
              placeholder="Enter Sheerness"
              value={data.sheerness}
              onChange={(e) => update("sheerness", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Opaque, Sheer, Semi-Opaque, Semi-Sheer, Ultra
              Sheer.
            </p>
          </div>

          {/* Size System */}
          <div className="space-y-1">
            <InputField
              label="Size System"
              placeholder="Enter Size System"
              value={data.size_system}
              onChange={(e) => update("size_system", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: US, UK, EU, 'DE', FR, CN, IT, BR, MEX, AU.
            </p>
          </div>

          {/* Skirt Length */}
          <div className="space-y-1">
            <InputField
              label="Skirt Length"
              placeholder="Enter Skirt Length"
              value={data.skirt_length}
              onChange={(e) => update("skirt_length", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 35, 86 cm, 44 in, 140 cm.
            </p>
          </div>

          {/* Sleeve Length */}
          <div className="space-y-1">
            <InputField
              label="Sleeve Length"
              placeholder="Enter Sleeve Length"
              value={data.sleeve_length}
              onChange={(e) => update("sleeve_length", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 25 in, 63 cm, 29 in, 73 cm.
            </p>
          </div>

          {/* Sleeve Length Style */}
          <div className="space-y-1">
            <InputField
              label="Sleeve Length Style"
              placeholder="Enter Sleeve Length Style"
              value={data.sleeve_length_style}
              onChange={(e) => update("sleeve_length_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 3/4 Sleeve, Long Sleeve, Short Sleeve, Sleeveless.
            </p>
          </div>

          {/* Sleeve Style */}
          <div className="space-y-1">
            <InputField
              label="Sleeve Style"
              placeholder="Enter Sleeve Style"
              value={data.sleeve_style}
              onChange={(e) => update("sleeve_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Flutter, Rolled, Puffed.
            </p>
          </div>

          {/* Sock Rise */}
          <div className="space-y-1">
            <InputField
              label="Sock Rise"
              placeholder="Enter Sock Rise"
              value={data.sock_rise}
              onChange={(e) => update("sock_rise", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Ankle, Crew, Knee High, Mid Calf, No Show, Over the
              Knee, Thigh High.
            </p>
          </div>

          {/* Sport */}
          <div className="space-y-1">
            <InputField
              label="Sport"
              placeholder="Enter Sport"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.sport.input}
              onChange={(e) =>
                update("sport", {
                  ...data.sport,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("sport")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.sport.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("sport", index)}
                />
              ))}
            </div>
          </div>

          {/* Sports League */}
          <div className="space-y-1">
            <InputField
              label="Sports League"
              placeholder="Enter Sports League"
              value={data.sports_league}
              onChange={(e) => update("sports_league", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: NFL, NBA, NASCAR.
            </p>
          </div>

          {/* Sports Team */}
          <div className="space-y-1">
            <InputField
              label="Sports Team"
              placeholder="Enter Sports Team"
              value={data.sports_team}
              onChange={(e) => update("sports_team", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Golden State Warriors, San Francisco Giants.
            </p>
          </div>

          {/* Standard Features */}
          <div className="space-y-1">
            <InputField
              label="Standard Features"
              placeholder="Enter Standard Features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.standard_features.input}
              onChange={(e) =>
                update("standard_features", {
                  ...data.standard_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("standard_features")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Waterproof, Water Resistant.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.standard_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("standard_features", index)}
                />
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-1">
            <InputField
              label="Theme"
              placeholder="Enter Theme"
              value={data.theme}
              onChange={(e) => update("theme", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Space, Super Heroes, Automobiles.
            </p>
          </div>

          {/* Upper Body Strap Configuration */}
          <div className="space-y-1">
            <InputField
              label="Upper Body Strap Configuration"
              placeholder="Enter Upper Body Strap Configuration"
              value={data.upper_body_strap_configuration}
              onChange={(e) =>
                update("upper_body_strap_configuration", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Racerback, Halter, Strapless.
            </p>
          </div>

          {/* Waist Rise */}
          <div className="space-y-1">
            <InputField
              label="Waist Rise"
              placeholder="Enter Waist Rise"
              value={data.waist_rise}
              onChange={(e) => update("waist_rise", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Ultra High, Mid, Low.
            </p>
          </div>

          {/* Waist Style */}
          <div className="space-y-1">
            <InputField
              label="Waist Style"
              placeholder="Enter Waist Style"
              value={data.waist_style}
              onChange={(e) => update("waist_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Banded, Dropped, Empire, Paper Bag.
            </p>
          </div>
        </div>
      </div>

      {/*  Shoes & Footwear */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Shoes & Footwear
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Character Shoes Footwear */}
          <div className="space-y-1">
            <InputField
              label="Character Shoes Footwear"
              placeholder="Enter Character Shoes Footwear"
              value={data.character_shoes_footwear}
              onChange={(e) =>
                update("character_shoes_footwear", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Chewbacca, Spongebob.
            </p>
          </div>

          {/* Closure Shoes Footwear */}
          <div className="space-y-1">
            <InputField
              label="Closure Shoes Footwear"
              placeholder="Enter Closure Shoes Footwear"
              value={data.closure_shoes_footwear}
              onChange={(e) => update("closure_shoes_footwear", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Zipper, Button, Snap, Drawstring.
            </p>
          </div>

          {/* Fabric Care Instructions */}
          <div className="space-y-1">
            <InputField
              label="Fabric Care Instructions"
              placeholder="Enter Fabric Care Instructions"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.fabric_care_instructions.input}
              onChange={(e) =>
                update("fabric_care_instructions", {
                  ...data.fabric_care_instructions,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("fabric_care_instructions")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand
              Wash.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.fabric_care_instructions.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("fabric_care_instructions", index)}
                />
              ))}
            </div>
          </div>

          {/* Heel Height */}
          <div className="space-y-1">
            <InputField
              label="Heel Height"
              placeholder="Enter Heel Height"
              value={data.heel_height}
              onChange={(e) => update("heel_height", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 0.5 in, 2 in, 7 cm, 11 cm.
            </p>
          </div>

          {/* Heel Style */}
          <div className="space-y-1">
            <InputField
              label="Heel Style"
              placeholder="Enter Heel Style"
              value={data.heel_style}
              onChange={(e) => update("heel_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Wedge, Block, Stiletto, Kitten.
            </p>
          </div>

          {/* Shoe Type */}
          <div className="space-y-1">
            <InputField
              label="Shoe Type"
              placeholder="Enter Shoe Type"
              value={data.shoe_type}
              onChange={(e) => update("shoe_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Flats, Boots, Heels, Sandals, Slippers, Athletic
              Shoes, Fashion Sneakers.
            </p>
          </div>

          {/* Shoe Width */}
          <div className="space-y-1">
            <InputField
              label="Shoe Width"
              placeholder="Enter Shoe Width"
              value={data.shoe_width}
              onChange={(e) => update("shoe_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: A, B, EE, Narrow, Wide.
            </p>
          </div>

          {/* Size System Shoes Footwear */}
          <div className="space-y-1">
            <InputField
              label="Size System Shoes Footwear"
              placeholder="Enter Size System Shoes Footwear"
              value={data.size_system_shoes_footwear}
              onChange={(e) =>
                update("size_system_shoes_footwear", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: US, UK, EU,DE, FR, JP, CN, IT, BR, MEX, AU.
            </p>
          </div>

          {/* Sport Shoes Footwear */}
          <div className="space-y-1">
            <InputField
              label="Sport Shoes Footwear"
              placeholder="Enter Sport Shoes Footwear"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.sport_shoes_footwear.input}
              onChange={(e) =>
                update("sport_shoes_footwear", {
                  ...data.sport_shoes_footwear,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("sport_shoes_footwear")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.sport_shoes_footwear.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("sport_shoes_footwear", index)}
                />
              ))}
            </div>
          </div>

          {/* Sports League Shoes Footwear */}
          <div className="space-y-1">
            <InputField
              label="Sports League Shoes Footwear"
              placeholder="Enter Sports League Shoes Footwear"
              value={data.sports_league_shoes_footwear}
              onChange={(e) =>
                update("sports_league_shoes_footwear", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: NFL, NBA, NASCAR.
            </p>
          </div>

          {/* Sports Team Shoes Footwear */}
          <div className="space-y-1">
            <InputField
              label="Sports Team Shoes Footwear"
              placeholder="Enter Sports Team Shoes Footwear"
              value={data.sports_team_shoes_footwear}
              onChange={(e) =>
                update("sports_team_shoes_footwear", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Golden State Warriors, San Francisco Giants.
            </p>
          </div>

          {/* Standard Features Shoes Footwear */}
          <div className="space-y-1">
            <InputField
              label="Standard Features Shoes Footwear"
              placeholder="Enter Standard Features Shoes Footwear"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.standard_features_shoes_footwear.input}
              onChange={(e) =>
                update("standard_features_shoes_footwear", {
                  ...data.standard_features_shoes_footwear,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("standard_features_shoes_footwear")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Orthopedic, Waterproof, Water Resistant.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.standard_features_shoes_footwear.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip("standard_features_shoes_footwear", index)
                    }
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  Clothing Accessories */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Clothing Accessories
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* character Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="character Clothing Accessories"
              placeholder="Enter character Clothing Accessories"
              value={data.character_clothing_accessories}
              onChange={(e) =>
                update("character_clothing_accessories", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Chewbacca, Spongebob.
            </p>
          </div>

          {/* Closure Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="Closure Clothing Accessories"
              placeholder="Enter Closure Clothing Accessories"
              value={data.closure_clothing_accessories}
              onChange={(e) =>
                update("closure_clothing_accessories", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Zipper, Button, Snap, Drawstring.
            </p>
          </div>

          {/* Fabric Care Instructions Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="Fabric Care Instructions Clothing Accessories"
              placeholder="Enter Fabric Care Instructions Clothing Accessories"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.fabric_care_instructions_clothing_accessories.input}
              onChange={(e) =>
                update("fabric_care_instructions_clothing_accessories", {
                  ...data.fabric_care_instructions_clothing_accessories,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown(
                "fabric_care_instructions_clothing_accessories",
              )}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand
              Wash.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.fabric_care_instructions_clothing_accessories.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip(
                        "fabric_care_instructions_clothing_accessories",
                        index,
                      )
                    }
                  />
                ),
              )}
            </div>
          </div>

          {/* Is Costume Clothing Accessories */}
          <div className="space-y-1">
            <RadioGroup
              label="Is Costume Clothing Accessories"
              options={["Yes", "No"]}
              value={data.is_costume_clothing_accessories}
              onChange={(v) => update("is_costume_clothing_accessories", v)}
            />
            <p className="text-xs text-gray-500">Sample values: Yes, No.</p>
          </div>

          {/* Size System Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="Size System Clothing Accessories"
              placeholder="Enter Size System Clothing Accessories"
              value={data.size_system_clothing_accessories}
              onChange={(e) =>
                update("size_system_clothing_accessories", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: US, UK, EU, DE, FR, JP, CN, IT, BR, MEX, AU.
            </p>
          </div>

          {/* Sport Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="Sport Clothing Accessories"
              placeholder="Enter Sport Clothing Accessories"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.sport_clothing_accessories.input}
              onChange={(e) =>
                update("sport_clothing_accessories", {
                  ...data.sport_clothing_accessories,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("sport_clothing_accessories")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.sport_clothing_accessories.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("sport_clothing_accessories", index)
                  }
                />
              ))}
            </div>
          </div>

          {/* Sports League Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="Sports League Clothing Accessories"
              placeholder="Enter Sports League Clothing Accessories"
              value={data.sports_league_clothing_accessories}
              onChange={(e) =>
                update("sports_league_clothing_accessories", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: NFL, NBA, NASCAR.
            </p>
          </div>

          {/* Sports Team Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="Sports Team Clothing Accessories"
              placeholder="Enter Sports Team Clothing Accessories"
              value={data.sports_team_clothing_accessories}
              onChange={(e) =>
                update("sports_team_clothing_accessories", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Golden State Warriors, San Francisco Giants.
            </p>
          </div>

          {/* Standard Features Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="Standard Features Clothing Accessories"
              placeholder="Enter Standard Features Clothing Accessories"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.standard_features_clothing_accessories.input}
              onChange={(e) =>
                update("standard_features_clothing_accessories", {
                  ...data.standard_features_clothing_accessories,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown(
                "standard_features_clothing_accessories",
              )}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Orthopedic, Waterproof, Water Resistant.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.standard_features_clothing_accessories.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip(
                        "standard_features_clothing_accessories",
                        index,
                      )
                    }
                  />
                ),
              )}
            </div>
          </div>

          {/* Sunglasses Lens Color */}
          <div className="space-y-1">
            <InputField
              label="Sunglasses Lens Color"
              placeholder="Enter Sunglasses Lens Color"
              value={data.sunglasses_lens_color}
              onChange={(e) => update("sunglasses_lens_color", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Beige, Black, Blue, Bronze, Brown, Gold, Gray,
              Green, Multi-Color, Orange, Pink, Purple, Red, Silver, White,
              Yellow.
            </p>
          </div>

          {/* Sunglasses Lens Technology */}
          <div className="space-y-1">
            <InputField
              label="Sunglasses Lens Technology"
              placeholder="Enter Sunglasses Lens Technology"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.sunglasses_lens_technology.input}
              onChange={(e) =>
                update("sunglasses_lens_technology", {
                  ...data.sunglasses_lens_technology,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("sunglasses_lens_technology")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Anti-Reflective, Gradient, Polarized,
              Photochromatic.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.sunglasses_lens_technology.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() =>
                    removeChip("sunglasses_lens_technology", index)
                  }
                />
              ))}
            </div>
          </div>

          {/* Sunglasses Width */}
          <div className="space-y-1">
            <InputField
              label="Sunglasses Width"
              placeholder="Enter Sunglasses Width"
              value={data.sunglasses_width}
              onChange={(e) => update("sunglasses_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Narrow, Medium, Wide.
            </p>
          </div>

          {/* theme Clothing Accessories */}
          <div className="space-y-1">
            <InputField
              label="theme Clothing Accessories"
              placeholder="Enter theme Clothing Accessories"
              value={data.theme_clothing_accessories}
              onChange={(e) =>
                update("theme_clothing_accessories", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Space, Super Heroes, Automobiles.
            </p>
          </div>

          {/* tie_width */}
          <div className="space-y-1">
            <InputField
              label="tie_width"
              placeholder="Enter tie_width"
              value={data.tie_width}
              onChange={(e) => update("tie_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Classic, Skinny, Wide.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <UniversalButton
          type="button"
          icon={<GiClothes size={18} />}
          label="Save Clothing"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Clothing;

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
