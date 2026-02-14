import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Chip } from "@mui/material";

// icons
import ChildCareIcon from "@mui/icons-material/ChildCare";

// components
import InputField from "@/components/layout/InputField"; 
import UniversalButton from "@/components/common/UniversalButton";

const initialState = {
  material: "",
  size: "",
  pattern: "",
  decor_style: "",
  finish: "",

  // Nursery
  additional_features: {
    input: "",
    chips: [],
  },
  character: "",
  comfort_level: "",
  fabric_care_instructions: {
    input: "",
    chips: [],
  },
  fill_material: {
    input: "",
    chips: [],
  },
  is_assembly_required: "Yes",
  mattress_thickness: "",
  number_of_drawers: "",
  number_of_shelves: "",
  shape: "",
  standard_features: {
    input: "",
    chips: [],
  },
  theme: "",

  // Toys
  additional_features_toys: {
    input: "",
    chips: [],
  },
  character_toys: "",
  educational_focus: {
    input: "",
    chips: [],
  },
  theme_toys: "",

  // Baby Feeding
  additional_features_baby_feeding: {
    input: "",
    chips: [],
  },
  allergens: {
    input: "",
    chips: [],
  },
  character_baby_feeding: "",
  color: {
    input: "",
    chips: [],
  },
  flavor: {
    input: "",
    chips: [],
  },
  ingredients: {
    input: "",
    chips: [],
  },
  life_stage: "",
  maximum_weight: "",
  minimum_weight: "",
  package_quantity: "",
  product_form: "",
  product_height: "",
  product_length: "",
  product_width: "",
  theme_baby_feeding: "",

  // Baby Transport
  additional_features_baby_transport: {
    input: "",
    chips: [],
  },
  baby_carrier_position: "",
  baby_carrier_style: "",
  car_seat_facing_direction: "",
  car_seat_max_child_height: "",
  character_baby_transport: "",
  child_car_seat_style: "",
  number_of_seats: "",
  safety_harness_style: "",
  standard_features_baby_transport: {
    input: "",
    chips: [],
  },
  stroller_type: "",
  theme_baby_transport: "",

  // Diapering & Potty Training
  additional_features_diapering_potty_training: {
    input: "",
    chips: [],
  },
  character_diapering_potty_training: "",
  diaper_type: "",
  ingredients_diapering_potty_training: {
    input: "",
    chips: [],
  },
  instructions: {
    input: "",
    chips: [],
  },
  life_stage_diapering_potty_training: "",
  maximum_weight_diapering_potty_training: "",
  minimum_weight_diapering_potty_training: "",
  product_form_diapering_potty_training: "",
  scent: {
    input: "",
    chips: [],
  },
  stop_use_indications: {
    input: "",
    chips: [],
  },
  theme_diapering_potty_training: "",
};

const Kids = () => {
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
      number_of_drawers: Number(data.number_of_drawers),
      number_of_shelves: Number(data.number_of_shelves),
      package_quantity: Number(data.package_quantity),
      number_of_seats: Number(data.number_of_seats),
    };

    console.log("clicked submit");
    console.log("SUBMITTED PAYLOAD:", payload);

    toast.success("Baby & Kids details saved successfully!");

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
      {/* Cell Phones & Smart Watches */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Baby & Kids
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Material */}
          <div className="space-y-1">
            <InputField
              label="Material"
              placeholder="Enter Material"
              value={data.material}
              onChange={(e) => update("material", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Cotton, Linen, Cashmere, Silk.
            </p>
          </div>

          {/* Size */}
          <div className="space-y-1">
            <InputField
              label="Size"
              placeholder="Enter Size"
              value={data.size}
              onChange={(e) => update("size", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Small, Medium, Large, 2, 4, 6, One Size.
            </p>
          </div>

          {/* Pattern */}
          <div className="space-y-1">
            <InputField
              label="Pattern"
              placeholder="Enter Pattern"
              value={data.pattern}
              onChange={(e) => update("pattern", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Plaid, Polka Dot, Gingham, Chevron.
            </p>
          </div>

          {/* Decor Style */}
          <div className="space-y-1">
            <InputField
              label="Decor Style"
              placeholder="Enter Decor Style"
              value={data.decor_style}
              onChange={(e) => update("decor_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Bohemian, Contemporary, Industrial, Mid-Century,
              Modern, Rustic, Vintage.
            </p>
          </div>

          {/* Finish */}
          <div className="space-y-1">
            <InputField
              label="Finish"
              placeholder="Enter Finish"
              value={data.finish}
              onChange={(e) => update("finish", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Natural/Unfinished, Walnut, Pewter, Antiqued.
            </p>
          </div>
        </div>
      </div>

      {/* Nursery */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Nursery
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Additional Features */}
          <div className="space-y-1">
            <InputField
              label="Additional Features"
              placeholder="Enter Additional Features"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.additional_features.input}
              onChange={(e) =>
                update("additional_features", {
                  ...data.additional_features,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("additional_features")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Waterproof, Personalized, Vintage.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.additional_features.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("additional_features", index)}
                />
              ))}
            </div>
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

          {/* Comfort Level */}
          <div className="space-y-1">
            <InputField
              label="Comfort Level"
              placeholder="Enter Comfort Level"
              value={data.comfort_level}
              onChange={(e) => update("comfort_level", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Extra Plush, Plush, Medium, Firm, Extra Firm,
              Adjustable.
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

          {/* Fill Material */}
          <div className="space-y-1">
            <InputField
              label="Fill Material"
              placeholder="Enter Fill Material"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.fill_material.input}
              onChange={(e) =>
                update("fill_material", {
                  ...data.fill_material,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("fill_material")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Polyester, Foam, Latex, Down, Cotton.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.fill_material.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("fill_material", index)}
                />
              ))}
            </div>
          </div>

          {/* Is Assembly Required */}
          <div className="space-y-1">
            <RadioGroup
              label="Is Assembly Required"
              options={["Yes", "No"]}
              value={data.is_assembly_required}
              onChange={(v) => update("is_assembly_required", v)}
            />
            <p className="text-xs text-gray-500">Sample values: Yes, No.</p>
          </div>

          {/* Mattress Thickness */}
          <div className="space-y-1">
            <InputField
              label="Mattress Thickness"
              placeholder="Enter Mattress Thickness"
              value={data.mattress_thickness}
              onChange={(e) => update("mattress_thickness", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: mm, cm, m, in, ft. Sample values: 12 in, 15 in, 30
              cm, 38 cm.
            </p>
          </div>

          {/* Number Of Drawers */}
          <div className="space-y-1">
            <InputField
              label="Number Of Drawers"
              placeholder="Enter Number Of Drawers"
              value={data.number_of_drawers}
              onChange={(e) => update("number_of_drawers", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 2, 4, 8.</p>
          </div>

          {/* Number Of Shelves */}
          <div className="space-y-1">
            <InputField
              label="Number Of Shelves"
              placeholder="Enter Number Of Shelves"
              value={data.number_of_shelves}
              onChange={(e) => update("number_of_shelves", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample values: 2, 4, 8.</p>
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
              Sample values: Rectangle, Square, Oval, Round.
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
              Sample values: Foldable, Wheeled, Antique.
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
              Sample values: Space, Super Heroes, Automobiles.
            </p>
          </div>
        </div>
      </div>

      {/* Toys */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Toys
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Additional Features Toys */}
          <div className="space-y-1">
            <InputField
              label="Additional Features Toys"
              placeholder="Enter Additional Features Toys"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.additional_features_toys.input}
              onChange={(e) =>
                update("additional_features_toys", {
                  ...data.additional_features_toys,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("additional_features_toys")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Waterproof, Personalized, Vintage.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.additional_features_toys.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("additional_features_toys", index)}
                />
              ))}
            </div>
          </div>

          {/* Character_toys */}
          <div className="space-y-1">
            <InputField
              label="Character_toys"
              placeholder="Enter Character_toys"
              value={data.character_toys}
              onChange={(e) => update("character_toys", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Chewbacca, Spongebob.
            </p>
          </div>

          {/* Educational Focus */}
          <div className="space-y-1">
            <InputField
              label="Educational Focus"
              placeholder="Enter Educational Focus"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.educational_focus.input}
              onChange={(e) =>
                update("educational_focus", {
                  ...data.educational_focus,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("educational_focus")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Shape Identification, Language, Motor Skills,
              Pretend Play, Color Identification, Science, Nature, Math,
              Counting, Music, Reading, Writing, Creativity.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.educational_focus.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("educational_focus", index)}
                />
              ))}
            </div>
          </div>

          {/* Theme Toys */}
          <div className="space-y-1">
            <InputField
              label="Theme Toys"
              placeholder="Enter Theme Toys"
              value={data.theme_toys}
              onChange={(e) => update("theme_toys", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample values: Space, Super Heroes, Automobiles.
            </p>
          </div>
        </div>
      </div>

      {/* Baby Feeding */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Baby Feeding
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Additional Features Baby Feeding */}
          <div className="space-y-1">
            <InputField
              label="Additional Features Baby Feeding"
              placeholder="Enter Additional Features Baby Feeding"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.additional_features_baby_feeding.input}
              onChange={(e) =>
                update("additional_features_baby_feeding", {
                  ...data.additional_features_baby_feeding,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("additional_features_baby_feeding")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Waterproof, Personalized, Vintage.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.additional_features_baby_feeding.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip("additional_features_baby_feeding", index)
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* Allergens */}
          <div className="space-y-1">
            <InputField
              label="Allergens"
              placeholder="Enter Allergens"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.allergens.input}
              onChange={(e) =>
                update("allergens", {
                  ...data.allergens,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("allergens")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Contains Peanuts, Soy, Manufactured in a facility
              that processes tree nuts, milk, and eggs.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.allergens.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("allergens", index)}
                />
              ))}
            </div>
          </div>

          {/* Character Baby Feeding */}
          <div className="space-y-1">
            <InputField
              label="Character Baby Feeding"
              placeholder="Enter Character Baby Feeding"
              value={data.character_baby_feeding}
              onChange={(e) => update("character_baby_feeding", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Chewbacca, Spongebob.
            </p>
          </div>

          {/* Color */}
          <div className="space-y-1">
            <InputField
              label="Color"
              placeholder="Enter Color"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.color.input}
              onChange={(e) =>
                update("color", {
                  ...data.color,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("color")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Beige, Black, Blue, Bronze, Brown, Gold, Gray.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.color.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("color", index)}
                />
              ))}
            </div>
          </div>

          {/* Flavor */}
          <div className="space-y-1">
            <InputField
              label="Flavor"
              placeholder="Enter Flavor"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.flavor.input}
              onChange={(e) =>
                update("flavor", {
                  ...data.flavor,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("flavor")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Cinnamon, Peppermint, Bubble Gum, Citrus,
              Chocolate, Berry.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.flavor.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("flavor", index)}
                />
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-1">
            <InputField
              label="Ingredients"
              placeholder="Enter Ingredients"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.ingredients.input}
              onChange={(e) =>
                update("ingredients", {
                  ...data.ingredients,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("ingredients")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Vitamin C, Benzoyl Peroxide, Alpha Hydroxy Acid,
              Hyaluronic Acid, Hydroquinone.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.ingredients.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("ingredients", index)}
                />
              ))}
            </div>
          </div>

          {/* Life Stage */}
          <div className="space-y-1">
            <InputField
              label="Life Stage"
              placeholder="Enter Life Stage"
              value={data.life_stage}
              onChange={(e) => update("life_stage", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Newborn, Infant, Toddler.
            </p>
          </div>

          {/* Maximum Weight */}
          <div className="space-y-1">
            <InputField
              label="Maximum Weight"
              placeholder="Enter Maximum Weight"
              value={data.maximum_weight}
              onChange={(e) => update("maximum_weight", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 35 lb, 45 lb, 15 kg, 20 kg.
            </p>
          </div>

          {/* Minimum Weight */}
          <div className="space-y-1">
            <InputField
              label="Minimum Weight"
              placeholder="Enter Minimum Weight"
              value={data.minimum_weight}
              onChange={(e) => update("minimum_weight", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 35 lb, 45 lb, 15 kg, 20 kg.
            </p>
          </div>

          {/* Package Quantity */}
          <div className="space-y-1">
            <InputField
              label="Package Quantity"
              placeholder="Enter Package Quantity"
              value={data.package_quantity}
              onChange={(e) => update("package_quantity", e.target.value)}
            />
            <p className="text-xs text-gray-500">Sample Values: 12, 24, 36.</p>
          </div>

          {/* Product Form */}
          <div className="space-y-1">
            <InputField
              label="Product Form"
              placeholder="Enter Product Form"
              value={data.product_form}
              onChange={(e) => update("product_form", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid,
              Frozen, Granules, Liquid, Bars, Fresh, Whole, Stewed, Sliced,
              Chopped, Diced, Blended, Powders.
            </p>
          </div>

          {/* Product Height */}
          <div className="space-y-1">
            <InputField
              label="Product Height"
              placeholder="Enter Product Height"
              value={data.product_height}
              onChange={(e) => update("product_height", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          {/* Product Length */}
          <div className="space-y-1">
            <InputField
              label="Product Length"
              placeholder="Enter Product Length"
              value={data.product_length}
              onChange={(e) => update("product_length", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          {/* Product Width */}
          <div className="space-y-1">
            <InputField
              label="Product Width"
              placeholder="Enter Product Width"
              value={data.product_width}
              onChange={(e) => update("product_width", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 5 in, 2 ft, 60 cm.
            </p>
          </div>

          {/* Theme Baby Feeding */}
          <div className="space-y-1">
            <InputField
              label="Theme Baby Feeding"
              placeholder="Enter Theme Baby Feeding"
              value={data.theme_baby_feeding}
              onChange={(e) => update("theme_baby_feeding", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Space, Super Heroes, Automobiles.
            </p>
          </div>
        </div>
      </div>

      {/* Baby Transport */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Baby Transport
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Additional Features Baby Transport */}
          <div className="space-y-1">
            <InputField
              label="Additional Features Baby Transport"
              placeholder="Enter Additional Features Baby Transport"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.additional_features_baby_transport.input}
              onChange={(e) =>
                update("additional_features_baby_transport", {
                  ...data.additional_features_baby_transport,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown(
                "additional_features_baby_transport"
              )}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Waterproof, Personalized, Vintage.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.additional_features_baby_transport.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip("additional_features_baby_transport", index)
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* Baby Carrier Position */}
          <div className="space-y-1">
            <InputField
              label="Baby Carrier Position"
              placeholder="Enter Baby Carrier Position"
              value={data.baby_carrier_position}
              onChange={(e) => update("baby_carrier_position", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: front carry - facing in, front carry - facing out,
              back carry, hip carry, side carry.
            </p>
          </div>

          {/* Baby Carrier Style */}
          <div className="space-y-1">
            <InputField
              label="Baby Carrier Style"
              placeholder="Enter Baby Carrier Style"
              value={data.baby_carrier_style}
              onChange={(e) => update("baby_carrier_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Forward-Facing, Rear-Facing, Convertible.
            </p>
          </div>

          {/* Car Seat Facing Direction */}
          <div className="space-y-1">
            <InputField
              label="Car Seat Facing Direction"
              placeholder="Enter Car Seat Facing Direction"
              value={data.car_seat_facing_direction}
              onChange={(e) =>
                update("car_seat_facing_direction", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: sling, skin-to-skin, wrap, frame carrier.
            </p>
          </div>

          {/* Car Seat Max Child Height */}
          <div className="space-y-1">
            <InputField
              label="Car Seat Max Child Height"
              placeholder="Enter Car Seat Max Child Height"
              value={data.car_seat_max_child_height}
              onChange={(e) =>
                update("car_seat_max_child_height", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: 57 in, 145 cm.
            </p>
          </div>

          {/* Character Baby Transport */}
          <div className="space-y-1">
            <InputField
              label="Character Baby Transport"
              placeholder="Enter Character Baby Transport"
              value={data.character_baby_transport}
              onChange={(e) =>
                update("character_baby_transport", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Chewbacca, Spongebob.{" "}
            </p>
          </div>

          {/* Child Car Seat Style */}
          <div className="space-y-1">
            <InputField
              label="Child Car Seat Style"
              placeholder="Enter Child Car Seat Style"
              value={data.product_form}
              onChange={(e) => update("product_form", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Backless Booster, Combination Seat, Convertible Car
              Seats, 5-Point Convertible, High-back Booster, Infant Seat,
              Overhead Shield Convertible.
            </p>
          </div>

          {/* Number Of Seats */}
          <div className="space-y-1">
            <InputField
              label="Number Of Seats"
              placeholder="Enter Number Of Seats"
              value={data.number_of_seats}
              onChange={(e) => update("number_of_seats", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 1, 2, 4, 6, 8.
            </p>
          </div>

          {/* Safety Harness Style */}
          <div className="space-y-1">
            <InputField
              label="Safety Harness Style"
              placeholder="Enter Safety Harness Style"
              value={data.safety_harness_style}
              onChange={(e) => update("safety_harness_style", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: 3-point harness, 5-point harness, no harness.
            </p>
          </div>

          {/* Standard Features Baby Transport */}
          <div className="space-y-1">
            <InputField
              label="Standard Features Baby Transport"
              placeholder="Enter Standard Features Baby Transport"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.standard_features_baby_transport.input}
              onChange={(e) =>
                update("standard_features_baby_transport", {
                  ...data.standard_features_baby_transport,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("standard_features_baby_transport")}
            />
            <p className="text-xs text-gray-500"> Sample values: Foldable.</p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.standard_features_baby_transport.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip("standard_features_baby_transport", index)
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* Stroller Type */}
          <div className="space-y-1">
            <InputField
              label="Stroller Type"
              placeholder="Enter Stroller Type"
              value={data.stroller_type}
              onChange={(e) => update("stroller_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: jogging, lightweight, umbrella, full-size, sit and
              stand, all-terrain.
            </p>
          </div>

          {/* Theme Baby Transport */}
          <div className="space-y-1">
            <InputField
              label="Theme Baby Transport"
              placeholder="Enter Theme Baby Transport"
              value={data.theme_baby_transport}
              onChange={(e) => update("theme_baby_transport", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Space, Super Heroes, Automobiles.
            </p>
          </div>
        </div>
      </div>

      {/* Diapering & Potty Training */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
        {/* Header */}
        <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Diapering & Potty Training
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Additional Features Diapering Potty Training */}
          <div className="space-y-1">
            <InputField
              label="Additional Features Diapering Potty Training"
              placeholder="Enter Additional Features Diapering Potty Training"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.additional_features_diapering_potty_training.input}
              onChange={(e) =>
                update("additional_features_diapering_potty_training", {
                  ...data.additional_features_diapering_potty_training,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown(
                "additional_features_diapering_potty_training"
              )}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Waterproof, Personalized, Vintage.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.additional_features_diapering_potty_training.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip(
                        "additional_features_diapering_potty_training",
                        index
                      )
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* Character Features Diapering Potty Training */}
          <div className="space-y-1">
            <InputField
              label="Character Features Diapering Potty Training"
              placeholder="Enter Character Features Diapering Potty Training"
              value={data.character_diapering_potty_training}
              onChange={(e) =>
                update("character_diapering_potty_training", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Chewbacca, Spongebob.
            </p>
          </div>

          {/* Diaper Type */}
          <div className="space-y-1">
            <InputField
              label="Diaper Type"
              placeholder="Enter Diaper Type"
              value={data.diaper_type}
              onChange={(e) => update("diaper_type", e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sample Values: Cloth, Disposable, Training Pants.
            </p>
          </div>

          {/* Ingredients Diapering Potty Training */}
          <div className="space-y-1">
            <InputField
              label="Ingredients Diapering Potty Training"
              placeholder="Enter Ingredients Diapering Potty Training"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.ingredients_diapering_potty_training.input}
              onChange={(e) =>
                update("ingredients_diapering_potty_training", {
                  ...data.ingredients_diapering_potty_training,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown(
                "ingredients_diapering_potty_training"
              )}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Vitamin C, Benzoyl Peroxide, Alpha Hydroxy Acid,
              Hyaluronic Acid, Hydroquinone.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.ingredients_diapering_potty_training.chips.map(
                (item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      removeChip("ingredients_diapering_potty_training", index)
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* instructions */}
          <div className="space-y-1">
            <InputField
              label="instructions"
              placeholder="Enter instructions"
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
              {" "}
              Sample values: Spray directly on floors and then wipe away with a
              damp mop, Dilute a bit of the all purpose cleaner in water and use
              the solution to mop your floors.
            </p>
            {/* Chips */}
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

          {/* Life Stage Diapering Potty Training */}
          <div className="space-y-1">
            <InputField
              label="Life Stage Diapering Potty Training"
              placeholder="Enter Life Stage Diapering Potty Training"
              value={data.life_stage_diapering_potty_training}
              onChange={(e) =>
                update("life_stage_diapering_potty_training", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Newborn, Infant, Toddler.
            </p>
          </div>

          {/* Maximum Weight Diapering Potty Training */}
          <div className="space-y-1">
            <InputField
              label="Maximum Weight Diapering Potty Training"
              placeholder="Enter Maximum Weight Diapering Potty Training"
              value={data.maximum_weight_diapering_potty_training}
              onChange={(e) =>
                update(
                  "maximum_weight_diapering_potty_training",
                  e.target.value
                )
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: 35 lb, 45 lb, 15 kg, 20 kg.
            </p>
          </div>

          {/* Minimum Weight Diapering Potty Training */}
          <div className="space-y-1">
            <InputField
              label="Minimum Weight Diapering Potty Training"
              placeholder="Enter Minimum Weight Diapering Potty Training"
              value={data.minimum_weight_diapering_potty_training}
              onChange={(e) =>
                update(
                  "minimum_weight_diapering_potty_training",
                  e.target.value
                )
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: 35 lb, 45 lb, 15 kg, 20 kg.
            </p>
          </div>

          {/* Product Form Diapering Potty Training */}
          <div className="space-y-1">
            <InputField
              label="Product Form Diapering Potty Training"
              placeholder="Enter Product Form Diapering Potty Training"
              value={data.product_form_diapering_potty_training}
              onChange={(e) =>
                update("product_form_diapering_potty_training", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid,
              Frozen, Granules, Liquid, Bars, Fresh, Whole, Stewed, Sliced,
              Chopped, Diced, Blended, Powders.
            </p>
          </div>

          {/* Scent */}
          <div className="space-y-1">
            <InputField
              label="Scent"
              placeholder="Enter Scent"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.scent.input}
              onChange={(e) =>
                update("scent", {
                  ...data.scent,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("scent")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Lavender, Vanilla, Lemon, Coconut, Jasmine, Pine.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.scent.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("scent", index)}
                />
              ))}
            </div>
          </div>

          {/* Stop Use Indications */}
          <div className="space-y-1">
            <InputField
              label="Stop Use Indications"
              placeholder="Enter Stop Use Indications"
              tooltipContent="Enter one item at a time and press Enter. Each entry will appear as a tag below."
              value={data.stop_use_indications.input}
              onChange={(e) =>
                update("stop_use_indications", {
                  ...data.stop_use_indications,
                  input: e.target.value,
                })
              }
              onKeyDown={handleChipKeyDown("stop_use_indications")}
            />
            <p className="text-xs text-gray-500">
              {" "}
              Sample values: Stop using if you experience swelling, rash, or
              fever.
            </p>
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {data.stop_use_indications.chips.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeChip("stop_use_indications", index)}
                />
              ))}
            </div>
          </div>

          {/* Theme Diapering Potty Training */}
          <div className="space-y-1">
            <InputField
              label="Theme Diapering Potty Training"
              placeholder="Enter Theme Diapering Potty Training"
              value={data.theme_diapering_potty_training}
              onChange={(e) =>
                update("theme_diapering_potty_training", e.target.value)
              }
            />
            <p className="text-xs text-gray-500">
              Sample Values: Space, Super Heroes, Automobiles.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center ">
        <UniversalButton
          type="button"
          icon={<ChildCareIcon sx={{ fontSize: 20 }} />}
          label="Save Baby & Kids"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Kids;

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
