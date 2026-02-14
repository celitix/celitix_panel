import React, { useState } from "react";
import toast from "react-hot-toast";

// components
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import UniversalButton from "@/components/common/UniversalButton";

const Vehicle = () => {
  const [formDetails, setFormDetails] = useState({
    address: "",
    appLinks: "",
    availability: "",
    bodyStyle: "",
    firstOnLotDate: "",
    dealerId: "",
    dealerName: "",
    dealerPhone: "",
    description: "",
    exteriorColor: "",
    fbPageId: "",
    drivetrain: "",
    fuelType: "",
    images: [
      {
        image_url: "",
        tags: [],
      },
    ],
    interiorColor: "",
    make: "",
    mileage: "",
    model: "",
    stateOfVehicle: "",
    transmission: "",
    vehicleType: "",
    currency: "",
    condition: "",
  });

  const availabilityOptions = [
    { label: "Available", value: "AVAILABLE" },
    { label: "Not Available", value: "NOT_AVAILABLE" },
    { label: "Pending", value: "PENDING" },
    { label: "Unknown", value: "UNKNOWN" },
  ];

  const bodyStyleOptions = [
    { label: "Convertible", value: "CONVERTIBLE" },
    { label: "Coupe", value: "COUPE" },
    { label: "Crossover", value: "CROSSOVER" },
    { label: "Estate", value: "ESTATE" },
    { label: "Grand Tourer", value: "GRANDTOURER" },
    { label: "Hatchback", value: "HATCHBACK" },
    { label: "Minibus", value: "MINIBUS" },
    { label: "Minivan", value: "MINIVAN" },
    { label: "MPV", value: "MPV" },
    { label: "Pickup", value: "PICKUP" },
    { label: "Roadster", value: "ROADSTER" },
    { label: "Saloon", value: "SALOON" },
    { label: "Sedan", value: "SEDAN" },
    { label: "Small Car", value: "SMALL_CAR" },
    { label: "Sports Car", value: "SPORTSCAR" },
    { label: "Supercar", value: "SUPERCAR" },
    { label: "Supermini", value: "SUPERMINI" },
    { label: "SUV", value: "SUV" },
    { label: "Truck", value: "TRUCK" },
    { label: "Van", value: "VAN" },
    { label: "Wagon", value: "WAGON" },
    { label: "Other", value: "OTHER" },
    { label: "None", value: "NONE" },
  ];

  const currencyOptions = [
    { label: "Indian Rupee (₹)", value: "INR" },
    { label: "US Dollar ($)", value: "USD" },
    { label: "Euro (€)", value: "EUR" },
    { label: "British Pound (£)", value: "GBP" },
    { label: "Japanese Yen (¥)", value: "JPY" },
  ];

  const conditionOptions = [
    { label: "Excellent", value: "EXCELLENT" },
    { label: "Very Good", value: "VERY_GOOD" },
    { label: "Good", value: "GOOD" },
    { label: "Fair", value: "FAIR" },
    { label: "Poor", value: "POOR" },
    { label: "Other", value: "OTHER" },
    { label: "None", value: "NONE" },
  ];

  const drivetrainOptions = [
    { label: "2WD (Two Wheel Drive)", value: "TWO_WD" },
    { label: "4WD (Four Wheel Drive)", value: "FOUR_WD" },
    { label: "AWD (All Wheel Drive)", value: "AWD" },
    { label: "FWD (Front Wheel Drive)", value: "FWD" },
    { label: "RWD (Rear Wheel Drive)", value: "RWD" },
    { label: "Other", value: "OTHER" },
    { label: "None", value: "NONE" },
  ];

  const fuelTypeOptions = [
    { label: "Diesel", value: "DIESEL" },
    { label: "Electric", value: "ELECTRIC" },
    { label: "Gasoline", value: "GASOLINE" },
    { label: "Petrol", value: "PETROL" },
    { label: "Hybrid", value: "HYBRID" },
    { label: "Plug-in Hybrid", value: "PLUGIN_HYBRID" },
    { label: "Flex Fuel", value: "FLEX" },
    { label: "Other", value: "OTHER" },
    { label: "None", value: "NONE" },
  ];

  const stateOfVehicleOptions = [
    { label: "New", value: "NEW" },
    { label: "Used", value: "USED" },
    { label: "Certified Pre-Owned (CPO)", value: "CPO" },
  ];

  const transmissionOptions = [
    { label: "Automatic", value: "AUTOMATIC" },
    { label: "Manual", value: "MANUAL" },
    { label: "Other", value: "OTHER" },
    { label: "None", value: "NONE" },
  ];

  const vehicleTypeOptions = [
    { label: "Boat", value: "BOAT" },
    { label: "Car / Truck", value: "CAR_TRUCK" },
    { label: "Commercial Vehicle", value: "COMMERCIAL" },
    { label: "Motorcycle", value: "MOTORCYCLE" },
    { label: "Powersport", value: "POWERSPORT" },
    { label: "RV / Camper", value: "RV_CAMPER" },
    { label: "Trailer", value: "TRAILER" },
    { label: "Other", value: "OTHER" },
  ];

  const addImage = () => {
    setFormDetails({
      ...formDetails,
      images: [...formDetails.images, { image_url: "", tags: [] }],
    });
  };

  const updateImage = (index, key, value) => {
    const updatedImages = [...formDetails.images];
    updatedImages[index][key] = value;
    setFormDetails({ ...formDetails, images: updatedImages });
  };

  const removeImage = (index) => {
    const updatedImages = formDetails.images.filter((_, i) => i !== index);
    setFormDetails({ ...formDetails, images: updatedImages });
  };

  const REQUIRED_FIELDS = [
    "address",
    "bodyStyle",
    // "currency",
    "description",
    "exteriorColor",
    "images",
    "make",
    "mileage",
    // "price",
    "stateOfVehicle",
    // "title",
    "url",
    "vehicleId",
    "vin",
    "year",
  ];

  const handleFormSubmit = () => {
    const missingFields = REQUIRED_FIELDS.filter(
      (field) => !formDetails[field]
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please fill the following fields:\n${missingFields.join(", ")}`
      );
      return;
    }

    const payload = {
      address: formDetails.address,
      applinks: formDetails.appLinks,
      availability: formDetails.availability,
      body_style: formDetails.bodyStyle,
      date_first_on_lot: formDetails.firstOnLotDate
        ? new Date(formDetails.firstOnLotDate).toISOString()
        : null,

      dealer_id: formDetails.dealerId,
      dealer_name: formDetails.dealerName,
      dealer_phone: formDetails.dealerPhone,
      fb_page_id: formDetails.fbPageId,

      description: formDetails.description,

      exterior_color: formDetails.exteriorColor,
      interior_color: formDetails.interiorColor,

      drivetrain: formDetails.drivetrain,
      fuel_type: formDetails.fuelType,
      transmission: formDetails.transmission,

      images: formDetails.images.map((img) => ({
        image_url: img.image_url,
        tags: img.tags,
      })),

      make: formDetails.make,
      model: formDetails.model,
      mileage: Number(formDetails.mileage) || 0,

      state_of_vehicle: formDetails.stateOfVehicle,
      vehicle_type: formDetails.vehicleType,
    };

    console.log("Form submitted:", payload);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow">
      <div className="text-lg font-semibold">Basic Vehicle Info</div>

      <UniversalTextArea
        label="Address"
        placeholder="Enter Address"
        value={formDetails.address}
        onChange={(e) =>
          setFormDetails({ ...formDetails, address: e.target.value })
        }
      />

      <InputField
        label="Description"
        placeholder="Enter description"
        value={formDetails.description}
        onChange={(e) =>
          setFormDetails({ ...formDetails, description: e.target.value })
        }
      />

      <InputField
        label="App Links"
        placeholder="Enter app links"
        value={formDetails.appLinks}
        onChange={(e) =>
          setFormDetails({ ...formDetails, appLinks: e.target.value })
        }
      />

      <div className="text-lg font-semibold">Availability & Classification</div>

      <DropdownWithSearch
        label="Availability"
        value={formDetails.availability}
        options={availabilityOptions}
        onChange={(e) => setFormDetails({ ...formDetails, availability: e })}
      />

      <DropdownWithSearch
        label="Vehicle Type"
        value={formDetails.vehicleType}
        options={vehicleTypeOptions}
        onChange={(e) => setFormDetails({ ...formDetails, vehicleType: e })}
      />

      <DropdownWithSearch
        label="State of Vehicle"
        value={formDetails.stateOfVehicle}
        options={stateOfVehicleOptions}
        onChange={(e) => setFormDetails({ ...formDetails, stateOfVehicle: e })}
      />

      <UniversalDatePicker
        label="Date First on Lot"
        value={formDetails.firstOnLotDate}
        onChange={(e) => setFormDetails({ ...formDetails, firstOnLotDate: e })}
      />

      <div className="text-lg font-semibold">Dealer Information</div>

      <InputField
        label="Dealer ID"
        placeholder="Enter Dealer Id"
        value={formDetails.dealerId}
        onChange={(e) =>
          setFormDetails({ ...formDetails, dealerId: e.target.value })
        }
      />

      <InputField
        label="Dealer Name"
        placeholder="Enter Dealer Name"
        value={formDetails.dealerName}
        onChange={(e) =>
          setFormDetails({ ...formDetails, dealerName: e.target.value })
        }
      />

      <InputField
        label="Dealer Phone"
        placeholder="Enter Dealer phone"
        value={formDetails.dealerPhone}
        onChange={(e) =>
          setFormDetails({ ...formDetails, dealerPhone: e.target.value })
        }
      />

      <InputField
        label="Facebook Page ID"
        placeholder="Enter facebook page Id"
        value={formDetails.fbPageId}
        onChange={(e) =>
          setFormDetails({ ...formDetails, fbPageId: e.target.value })
        }
      />

      <div className="text-lg font-semibold">Vehicle Specifications</div>

      <InputField
        label="Make"
        placeholder="Enter make"
        value={formDetails.make}
        onChange={(e) =>
          setFormDetails({ ...formDetails, make: e.target.value })
        }
      />
      <InputField
        label="Model"
        placeholder="Enter model"
        value={formDetails.model}
        onChange={(e) =>
          setFormDetails({ ...formDetails, model: e.target.value })
        }
      />
      <InputField
        label="Year"
        placeholder="Enter year"
        value={formDetails.year}
        onChange={(e) =>
          setFormDetails({ ...formDetails, year: e.target.value })
        }
      />
      <InputField
        label="Mileage"
        placeholder="Enter mileage"
        value={formDetails.mileage}
        onChange={(e) =>
          setFormDetails({ ...formDetails, mileage: e.target.value })
        }
      />

      <InputField
        label="Exterior Color"
        placeholder="Enter exterior color"
        value={formDetails.exteriorColor}
        onChange={(e) =>
          setFormDetails({ ...formDetails, exteriorColor: e.target.value })
        }
      />
      <InputField
        label="Interior Color"
        placeholder="Enter interior color"
        value={formDetails.interiorColor}
        onChange={(e) =>
          setFormDetails({ ...formDetails, interiorColor: e.target.value })
        }
      />
      <InputField
        label="Title"
        placeholder="Enter title"
        value={formDetails.title}
        onChange={(e) =>
          setFormDetails({ ...formDetails, title: e.target.value })
        }
      />
      <InputField
        label="Price"
        placeholder="Enter price"
        value={formDetails.price}
        onChange={(e) =>
          setFormDetails({ ...formDetails, price: e.target.value })
        }
        type="number"
      />

      <DropdownWithSearch
        label="Body Style"
        value={formDetails.bodyStyle}
        options={bodyStyleOptions}
        onChange={(e) => setFormDetails({ ...formDetails, bodyStyle: e })}
      />
      <DropdownWithSearch
        label="Drivetrain"
        value={formDetails.drivetrain}
        options={drivetrainOptions}
        onChange={(e) => setFormDetails({ ...formDetails, drivetrain: e })}
      />
      <DropdownWithSearch
        label="Fuel Type"
        value={formDetails.fuelType}
        options={fuelTypeOptions}
        onChange={(e) => setFormDetails({ ...formDetails, fuelType: e })}
      />
      <DropdownWithSearch
        label="Transmission"
        value={formDetails.transmission}
        options={transmissionOptions}
        onChange={(e) => setFormDetails({ ...formDetails, transmission: e })}
      />
      <DropdownWithSearch
        id="condition"
        name="condition"
        label="Condition"
        placeholder="Select condition"
        value={formDetails.condition}
        options={conditionOptions}
        onChange={(e) =>
          setFormDetails({
            ...formDetails,
            condition: e,
          })
        }
      />

      <DropdownWithSearch
        label="Currency"
        value={formDetails.currency}
        placeholder="Select currency"
        options={currencyOptions}
        onChange={(e) => setFormDetails({ ...formDetails, currency: e })}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Images</h3>

        {formDetails.images.map((img, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-3">
            {/* Image URL */}
            <InputField
              label={`Image URL ${index + 1}`}
              placeholder="https://example.com/image.jpg"
              value={img.image_url}
              onChange={(e) => updateImage(index, "image_url", e.target.value)}
              type="url"
              required
            />

            {/* Tags */}
            <InputField
              label="Tags (comma separated)"
              placeholder="front, interior, engine"
              value={img.tags.join(", ")}
              onChange={(e) =>
                updateImage(
                  index,
                  "tags",
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
              type="text"
              required
            />

            {/* Remove Image */}
            {formDetails.images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="text-red-600 text-sm"
              >
                Remove Image
              </button>
            )}
          </div>
        ))}

        {/* Add Image */}
        <button
          type="button"
          onClick={addImage}
          className="px-4 py-2 bg-gray-100 rounded"
        >
          + Add Image
        </button>
      </div>

      <div className="text-lg font-semibold">Identification</div>

      <InputField
        label="VIN"
        placeholder="Enter vin"
        value={formDetails.vin}
        onChange={(e) =>
          setFormDetails({ ...formDetails, vin: e.target.value })
        }
      />
      <InputField
        label="Vehicle ID"
        placeholder="Enter vehicle Id"
        value={formDetails.vehicleId}
        onChange={(e) =>
          setFormDetails({ ...formDetails, vehicleId: e.target.value })
        }
      />
      <InputField
        label="URL"
        placeholder="Enter url"
        value={formDetails.url}
        onChange={(e) =>
          setFormDetails({ ...formDetails, url: e.target.value })
        }
      />
      <InputField
        label="Trim"
        placeholder="Enter trim"
        value={formDetails.trim}
        onChange={(e) =>
          setFormDetails({ ...formDetails, trim: e.target.value })
        }
      />

      <div className="flex items-center justify-center">
        <UniversalButton label="Submit" onClick={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Vehicle;
