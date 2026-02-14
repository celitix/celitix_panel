import { useRef, useState, useEffect } from "react";

// icons
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// components
import InputField from "@/components/layout/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import CountryCode from "./components/CountryCode";
import CategoryDropdown from "./components/CategoryDropdown";

// api
import { uploadImageFile } from "@/apis/whatsapp/whatsapp";


const AddProduct = () => {
  const [countryCode, setCountryCode] = useState("");
  const [items, setItems] = useState([
    {
      id: Date.now(),
      variants: [
        {
          id: Date.now(),
          availability: "",
          condition: "",
          size: "",
          age: "",
          color: "",
          saleEnabled: false,
        },
      ],
    },
  ]);

  const updateVariant = (itemIndex, variantIndex, field, value) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === itemIndex
          ? {
            ...item,
            variants: item.variants.map((variant, v) =>
              v === variantIndex ? { ...variant, [field]: value } : variant
            ),
          }
          : item
      )
    );
  };

  const [blocks, setBlocks] = useState([0]);
  const [openItems, setOpenItems] = useState({});
  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const createVariant = () => ({
    id: Date.now(),
    retailerId: "",
    itemGroupId: "",
    country_code: "",
    price: "",
    title: "",
    description: "",
    availability: "",
    condition: "",
    size: "",
    age: "",
    color: "",
    gander: "",
    saleEnabled: false,
    salePrice: "",
    custom_label_0: "",
    custom_label_1: "",
    custom_label_2: "",
    custom_label_3: "",
    custom_label_4: "",
    google_product_category: "",
    manufacturer_part_number: "",
    pattern: "",
    inventory: "",
    gtin: "",
    country_of_origin: "",
    media: [],
  });

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        variants: [createVariant()],
      },
    ]);
  };

  const addVariant = (itemIndex) => {
    setItems((prev) =>
      prev.map((item, index) =>
        index === itemIndex
          ? { ...item, variants: [...item.variants, createVariant()] }
          : item
      )
    );
  };

  const removeVariant = (itemIndex, variantIndex) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === itemIndex
          ? {
            ...item,
            variants: item.variants.filter((_, v) => v !== variantIndex),
          }
          : item
      )
    );
  };

  const inputRef = useRef(null);
  // const [files, setFiles] = useState([]);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const CARD_WIDTH = 100;
  const GAP = 12;
  const SLIDE_AMOUNT = carouselRef.current?.offsetWidth || 0;

  const slideTo = (index) => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;

    carouselRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const width = el.offsetWidth;
      const index = Math.round(el.scrollLeft / width);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const slideLeft = () => {
    slideTo(Math.max(activeIndex - 1, 0));
  };

  const slideRight = (mediaLength) => {
    slideTo(Math.min(activeIndex + 1, mediaLength - 1));
  };

  const handleFiles = (itemIndex, variantIndex, newFiles) => {
    if (!newFiles || !newFiles.length) return;

    const mapped = Array.from(newFiles).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setItems((prev) =>
      prev.map((item, i) =>
        i === itemIndex
          ? {
            ...item,
            variants: item.variants.map((v, vi) =>
              vi === variantIndex
                ? { ...v, media: [...(v.media || []), ...mapped] }
                : v
            ),
          }
          : item
      )
    );
  };

  const handleDrop = (e, itemIndex, variantIndex) => {
    e.preventDefault();
    handleFiles(itemIndex, variantIndex, e.dataTransfer.files);
  };

  const handleRemove = (itemIndex, variantIndex, mediaIndex) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === itemIndex
          ? {
            ...item,
            variants: item.variants.map((v, vi) =>
              vi === variantIndex
                ? {
                  ...v,
                  media: v.media.filter((_, mi) => mi !== mediaIndex),
                }
                : v
            ),
          }
          : item
      )
    );
  };

  const renderVariants = (item, itemIndex) => {
    const layouts = [];

    for (let v = 0; v < item.variants.length; v++) {
      const variant = item.variants[v];
      layouts.push(
        <div
          key={item.variants[v]}
          className="relative flex flex-wrap lg:flex-nowrap border p-4 rounded-md gap-4"
        >
          <div className="lg:w-1/4 w-full">
            <span>Image</span>
            <div className="space-y-5">
              {/* Drag & Drop Area */}
              <div
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, itemIndex, v)}
                className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
              >
                <p className="text-sm text-gray-600 mb-1">
                  Drag & drop images/videos here or click to upload
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  hidden
                  onChange={(e) => handleFiles(itemIndex, v, e.target.files)}
                />
                {/* Add More Slide */}
                <div
                  //   onClick={() => inputRef.current.click()}
                  //   onDragOver={(e) => e.preventDefault()}
                  //  onDrop={(e) => handleDrop(e, itemIndex, v)}
                  className="w-full snap-start  flex items-center justify-center rounded-md cursor-pointer text-gray-500"
                >
                  + Add More
                </div>
              </div>

              {/* Carousel Preview */}
              <div className="relative w-full select-none">
                {/* LEFT ARROW (auto hide) */}
                {activeIndex > 0 && (
                  <button
                    onClick={slideLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-1"
                  >
                    <MdChevronLeft size={22} />
                  </button>
                )}

                {/* CAROUSEL */}
                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
                >
                  {(variant.media || []).map((media, index) => (
                    <div
                      key={index}
                      className="min-w-full w-full h-[300px] snap-start relative border rounded-md overflow-hidden pointer-events-none px-8"
                    >
                      {media.type === "image" ? (
                        <img
                          src={media.url}
                          draggable={false}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={media.url}
                          controls
                          className="w-full h-full object-cover pointer-events-auto"
                        />
                      )}

                      {/* REMOVE */}
                      <button
                        onClick={() => handleRemove(itemIndex, v, index)}
                        className="absolute top-1 right-1 bg-black/60 text-white px-2 py-1 text-xs rounded pointer-events-auto"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* RIGHT ARROW (auto hide) */}
                {(variant.media?.length ?? 0) > 0 &&
                  activeIndex < variant.media.length - 1 && (
                    <button
                      onClick={() => slideRight(variant.media.length)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-1"
                    >
                      <MdChevronRight size={22} />
                    </button>
                  )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {item.variants.length > 1 && (
              <div className="absolute -top-2 -right-3 border rounded-full p-1 bg-white flex ">
                <button
                  onClick={() => removeVariant(itemIndex, v)}
                  className="text-red-500"
                >
                  <MdOutlineDeleteForever size={20} />
                </button>
              </div>
            )}

            <InputField
              label="Retailer Id"
              placeholder="Enter retailer id"
              value={variant.retailerId}
              onChange={(e) =>
                updateVariant(itemIndex, v, "retailerId", e.target.value)
              }
            />

            <InputField
              label="Item Group Id"
              placeholder="Enter item group id"
              value={variant.itemGroupId}
              onChange={(e) =>
                updateVariant(itemIndex, v, "itemGroupId", e.target.value)
              }
            />

            <InputField
              label="Title"
              placeholder="Enter Title"
              value={variant.title}
              maxLength={200}
              onChange={(e) =>
                updateVariant(itemIndex, v, "title", e.target.value)
              }
            />

            <InputField
              label="Description"
              placeholder="Enter description"
              maxLength={9999}
              value={variant.description}
              onChange={(e) =>
                updateVariant(itemIndex, v, "description", e.target.value)
              }
            />
            <div className="">
              <label className="block text-sm font-medium mb-1">Price</label>

              <div className="grid grid-cols-2 gap-2">
                <CountryCode
                  value={variant.country_code}
                  onChange={(code) =>
                    updateVariant(itemIndex, v, "country_code", code)
                  }
                />

                <InputField
                  placeholder="Enter Price"
                  value={variant.price}
                  onChange={(e) =>
                    updateVariant(itemIndex, v, "price", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Sale Price
              </label>

              <div
                className={`flex items-center gap-3 border rounded-md px-3 py-2
            ${variant.saleEnabled ? "bg-white" : "bg-gray-100"}
            `}
              >
                <input
                  type="checkbox"
                  checked={variant.saleEnabled}
                  onChange={(e) =>
                    updateVariant(itemIndex, v, "saleEnabled", e.target.checked)
                  }
                  className="h-4 w-4 cursor-pointer"
                />

                <input
                  type="number"
                  placeholder="Enter Sale price"
                  value={variant.salePrice}
                  disabled={!variant.saleEnabled}
                  onChange={(e) =>
                    updateVariant(itemIndex, v, "salePrice", e.target.value)
                  }
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <AnimatedDropdown
              label="Availability"
              placeholder="Select availability"
              value={variant.availability}
              onChange={(val) =>
                updateVariant(itemIndex, v, "availability", val)
              }
              options={[
                { label: "In Stock", value: "IN_STOCK" },
                { label: "Out of Stock", value: "OUT_OF_STOCK" },
              ]}
            />
            <div className="grid grid-cols-2 gap-2">
              <AnimatedDropdown
                label="Condition"
                placeholder="Select condition"
                value={variant.condition}
                onChange={(val) =>
                  updateVariant(itemIndex, v, "condition", val)
                }
                options={[
                  { label: "New", value: "NEW" },
                  { label: "Old", value: "OLD" },
                ]}
              />
              <AnimatedDropdown
                label="Color"
                placeholder="Select color"
                value={variant.color}
                onChange={(val) => updateVariant(itemIndex, v, "color", val)}
                options={[
                  { label: "Green", value: "Green" },
                  { label: "Red", value: "Red" },
                  { label: "Blue", value: "Blue" },
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <AnimatedDropdown
                label="Size"
                placeholder="Select size"
                value={variant.size}
                onChange={(val) => updateVariant(itemIndex, v, "size", val)}
                options={[
                  { label: "S", value: "S" },
                  { label: "M", value: "M" },
                  { label: "L", value: "L" },
                ]}
              />
              <AnimatedDropdown
                label="Age Group"
                placeholder="Select age group"
                value={variant.age}
                onChange={(val) => updateVariant(itemIndex, v, "age", val)}
                options={[
                  { label: "0-10", value: "0-10" },
                  { label: "10-20", value: "10-20" },
                ]}
              />
            </div>
            <InputField
              label="Custom Label 0"
              placeholder="Enter custom label 0"
              value={variant.custom_label_0}
              onChange={(e) =>
                updateVariant(itemIndex, v, "custom_label_0", e.target.value)
              }
            />
            <InputField
              label="Custom Label 1"
              placeholder="Enter custom label 1"
              value={variant.custom_label_1}
              onChange={(e) =>
                updateVariant(itemIndex, v, "custom_label_1", e.target.value)
              }
            />
            <InputField
              label="Custom Label 2"
              placeholder="Enter custom label 2"
              value={variant.custom_label_2}
              onChange={(e) =>
                updateVariant(itemIndex, v, "custom_label_2", e.target.value)
              }
            />
            <InputField
              label="Custom Label 3"
              placeholder="Enter custom label 3"
              value={variant.custom_label_3}
              onChange={(e) =>
                updateVariant(itemIndex, v, "custom_label_3", e.target.value)
              }
            />
            <InputField
              label="Custom Label 4"
              placeholder="Enter custom label 4"
              value={variant.custom_label_4}
              onChange={(e) =>
                updateVariant(itemIndex, v, "custom_label_4", e.target.value)
              }
            />
            <AnimatedDropdown
              label="Gender"
              placeholder="Select gender"
              value={variant.gender}
              onChange={(val) => updateVariant(itemIndex, v, "gender", val)}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "Female" },
              ]}
            />
            {/* <AnimatedDropdown
              label="google_product_category"
              placeholder="Select google product category"
              value={variant.google_product_category}
              onChange={(val) =>
                updateVariant(itemIndex, v, "google_product_category", val)
              }
              options={[
                {
                  label: "Apparel & Accessories",
                  value: "apparel_accessories",
                },
                { label: "Electronics", value: "electronics" },
              ]}
            /> */}
            <CategoryDropdown
              value={variant.google_product_category_path}
              onChange={(path) =>
                updateVariant(
                  itemIndex,
                  v,
                  "google_product_category_path",
                  path
                )
              }
            />

            <InputField
              label="Gtin"
              placeholder="Enter gtin"
              value={variant.gtin}
              onChange={(e) =>
                updateVariant(itemIndex, v, "gtin", e.target.value)
              }
            />
            <InputField
              label="Pattern"
              placeholder="Enter pattern"
              value={variant.pattern}
              onChange={(e) =>
                updateVariant(itemIndex, v, "pattern", e.target.value)
              }
            />
            <InputField
              label="Inventory"
              placeholder="Enter inventory"
              value={variant.inventory}
              onChange={(e) =>
                updateVariant(itemIndex, v, "inventory", e.target.value)
              }
            />
            <InputField
              label="manufacturer_part_number"
              placeholder="Enter manufacturer_part_number"
              value={variant.manufacturer_part_number}
              onChange={(e) =>
                updateVariant(
                  itemIndex,
                  v,
                  "manufacturer_part_number",
                  e.target.value
                )
              }
            />

            <div>
              <label htmlFor="country_of_origin">country_of_origin</label>
              <CountryCode
                value={variant.country_of_origin}
                onChange={(code) =>
                  updateVariant(itemIndex, v, "country_of_origin", code)
                }
              />
            </div>
          </div>
        </div>
      );
    }

    layouts.push(
      <button
        key="add-variant"
        onClick={() => addVariant(itemIndex)}
        className="px-4 py-2 text-sm font-medium text-white rounded-md bg-slate-600 hover:bg-slate-700"
      >
        + Add Variant
      </button>
    );

    return layouts;
  };

  const renderItems = () => {
    const blocks = [];

    for (let i = 0; i < items.length; i++) {
      blocks.push(
        <div key={items[i].id} className="border rounded-xl bg-white shadow-sm">
          {/* Header */}
          <div
            onClick={() => toggleItem(i)}
            className="flex justify-between items-center px-5 py-4 bg-gray-50 cursor-pointer"
          >
            <h4 className="text-sm font-semibold">Item {i + 1}</h4>

            <div className="flex items-center gap-3">
              {/* Delete Item */}
              {items.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent accordion toggle
                    setItems((prev) => prev.filter((_, index) => index !== i));
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Remove Item"
                >
                  <MdOutlineDeleteForever size={20} />
                </button>
              )}

              {/* Toggle Icon */}
              {openItems[i] ? (
                <MdKeyboardArrowUp size={24} className="text-gray-600" />
              ) : (
                <MdKeyboardArrowDown size={24} className="text-gray-600" />
              )}
            </div>
          </div>

          {/* Body */}
          {openItems[i] && (
            <div className="p-5 space-y-4 border-t">
              {renderVariants(items[i], i)}
            </div>
          )}
        </div>
      );
    }

    return blocks;
  };

  const [payload, setPayload] = useState(null);
  useEffect(() => {
    const generatePayload = () => ({
      items: items.map((item, itemIndex) => ({
        item_id: `ITEM_${itemIndex + 1}`,
        variants: item.variants.map((variant) => ({
          retailer_id: variant.retailerId,
          item_group_id: variant.itemGroupId,
          title: variant.title,
          description: variant.description,

          price: {
            country_code: variant.country_code,
            amount: variant.price,
          },

          sale_price: {
            enabled: variant.saleEnabled,
            amount: variant.saleEnabled ? variant.salePrice : "",
          },

          availability: variant.availability,
          condition: variant.condition,
          size: variant.size,
          age_group: variant.age,
          color: variant.color,
          gender: variant.gender,

          google_product_category:
            variant.google_product_category_path?.join(" > "),

          custom_labels: {
            custom_label_0: variant.custom_label_0,
            custom_label_1: variant.custom_label_1,
            custom_label_2: variant.custom_label_2,
            custom_label_3: variant.custom_label_3,
            custom_label_4: variant.custom_label_4,
          },

          gtin: variant.gtin,
          manufacturer_part_number: variant.manufacturer_part_number,
          pattern: variant.pattern,
          inventory: variant.inventory,
          country_of_origin: variant.country_of_origin,
          media: (variant.media || []).map((m) => m.url),
        })),
      })),
    });

    setPayload(generatePayload());
  }, [items]);

  return (
    <div className="p-5 space-y-6">
      <button
        onClick={addItem}
        className="
          px-4 py-2
          text-sm font-medium text-white
          rounded-md
          bg-indigo-600
          hover:bg-indigo-700
          transition
        "
      >
        Add Item
      </button>
      {/* Render item blocks */}
      {renderItems()}

      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2">Auto Generated Payload</h3>

        <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-auto max-h-96">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AddProduct;
