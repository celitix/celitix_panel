import React, { useState } from "react";

// icons
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { FaVideo } from "react-icons/fa";
import { FaRegFaceSmile } from "react-icons/fa6";
import { LuMic } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";

// assets
import Catalog_Ref_Img from "@/assets/images/catalogreferenceimg.png";
import Cart_Ref_Img from "@/assets/images/cartrefresnceimg.png";

const CommerceSetting = () => {
  const [isCartEnabled, setIsCartEnabled] = useState(true); // is_cart_enabled
  const [isCatalogueVisible, setIsCatalogueVisible] = useState(true); // is_catalog_visible

  const handleSave = () => {
    const payload = {
      is_cart_enabled: isCartEnabled,
      is_catalog_visible: isCatalogueVisible,
    };

    console.log("Saving commerce settings:", payload);

    // setIsCartEnabled(false);
    // setIsCatalogueVisible(false);
  };

  // You can enable or disable the shopping cart and the product catalog on a per-business phone number basis. By default, the shopping cart is enabled and the storefront icon is hidden for all business phone numbers associated with a WhatsApp Business Account.

  // Enable/Disable Cart
  // When enabled, cart-related buttons appear in the chat, catalog, and product details views:
  // When the cart is disabled, customers can see products and their details, but all cart related buttons will not appear in any view. img - cartrefresnceimg

  // Enable/Disable Catalog - img catalogreferenceimg
  // When enabled, the catalog storefront icon and catalog-related buttons appear in chat views and business profile views:
  //   When the catalog is disabled, the storefront icon and catalog-related buttons will not appear in any views and the catalog preview with thumbnails will not appear in the business profile view.
  // If you disable the catalog, wa.me links to your catalog, as well as the View catalog button that appears when you send your catalog link in a message will display an Invalid catalog link warning when tapped.

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* commerce settings  */}
      <div className=" col-span-12 lg:col-span-7 space-y-3 shadow-xl rounded-xl bg-white w-full h-full p-4">
        {/* ================== PAGE HEADER ================== */}
        <div className="border-b border-gray-200 pb-3 mb-6">
          <h2 className="text-2xl font-semibold text-green-600 tracking-tight">
            Commerce Settings
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {/* ================== CATALOG VISIBILITY ================== */}
          <div className="flex flex-col items-center gap-6">
            {/* Header + Toggle */}
            <div className="w-full max-w-3xl flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">
                Catalogue Visibility
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isCatalogueVisible}
                  onChange={() => setIsCatalogueVisible(!isCatalogueVisible)}
                />
                <div className="flex items-center w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.75 after:w-4.75 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />{" "}
              </label>
            </div>

            {/* Info Card */}
            <div className="w-full max-w-3xl flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-200">
              {/* Text */}
              <div className="flex-1 space-y-3">
                <p className="text-sm text-gray-800 leading-relaxed">
                  When enabled, the{" "}
                  <span className="font-medium text-gray-900">
                    catalog storefront icon
                  </span>{" "}
                  and catalog-related buttons appear in chat views and business
                  profile views.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  When the catalog is disabled, the storefront icon and
                  catalog-related buttons will not appear in any views, and the
                  catalog preview with thumbnails will be removed from the
                  business profile view.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  If you disable the catalog,{" "}
                  <span className="font-medium">wa.me links</span> to your
                  catalog and the{" "}
                  <span className="font-medium">View catalog</span> button sent
                  in messages will display an{" "}
                  <span className="font-semibold text-red-600">
                    “Invalid catalog link”
                  </span>{" "}
                  warning when tapped.
                </p>
              </div>

              {/* Image */}
              <div className="flex-shrink-0 self-start rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm">
                <img
                  src={Catalog_Ref_Img}
                  alt="Catalog storefront preview"
                  className="w-full max-w-[220px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* ================== CART ENABLED ================== */}
          <div className="flex flex-col items-center gap-6">
            {/* Header + Toggle */}
            <div className="w-full max-w-3xl flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">
                Cart Enabled
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                {" "}
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isCartEnabled}
                  onChange={() => setIsCartEnabled(!isCartEnabled)}
                />{" "}
                <div className="flex items-center w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.75 after:w-4.75 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />{" "}
              </label>
            </div>

            {/* Info Card */}
            <div className="w-full max-w-3xl flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-200">
              {/* Text */}
              <div className="flex-1 space-y-3">
                <p className="text-sm text-gray-800 leading-relaxed">
                  When enabled,{" "}
                  <span className="font-medium">cart-related buttons</span>{" "}
                  appear in chat, catalog, and product detail views, allowing
                  customers to add products directly to their cart.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  When the cart is disabled, customers can still browse products
                  and view product details, but all cart-related actions and
                  buttons will be hidden across all views.
                </p>
              </div>

              {/* Image */}
              <div className="flex-shrink-0 self-start rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm">
                <img
                  src={Cart_Ref_Img}
                  alt="Cart reference preview"
                  className="w-full max-w-[220px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* mobile preview */}
      <div className="grid col-span-12 lg:col-span-5 h-170 space-y-3 justify-center shadow-xl rounded-xl bg-white w-full h-full py-7">
        <div className="relative mx-auto w-70 md:w-85 bg-black rounded-[3.5rem] p-2 shadow-2xl overflow-hidden">
          <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative border-[2px] border-gray-800">
            {/* Background Layer */}
            <div
              className="absolute inset-0 z-0 bg-repeat opacity-[0.2] pointer-events-none"
              style={{
                backgroundImage: "url(/instachatbg.webp)",
                backgroundSize: "100%",
              }}
            />

            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-10 h-1 bg-gray-800 rounded-full" />
            </div>

            {/* Header */}
            <div className="relative z-20 bg-white/90 backdrop-blur-md border-b px-5 pt-12 pb-3 flex items-center justify-between rounded-t-[44px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#FFD600] to-[#D300C5] p-[1.5px]">
                  <div className="w-full h-full rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/2293372/pexels-photo-2293372.jpeg"
                      className="object-cover w-full h-full"
                      alt="profile"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  {/* <span className="text-sm font-bold text-gray-900 leading-tight">Juan Store</span> */}
                  <span className="text-sm font-bold text-gray-900 leading-tight">
                    {/* {selectedInstaUserDetails?.userName} */}
                    Celitix
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                    Business Account
                  </span>
                </div>
              </div>
              <div className="flex gap-3 relative text-gray-600">
                {/* tooltip */}
                <div className="absolute -top-7 left-3 -translate-x-1/2 bg-black text-white text-nowrap text-xs px-2 py-1 rounded-md animate-bounce-smooth pointer-events-none z-10">
                  {isCatalogueVisible ? "Catalogue" : " Off Catalogue"}
                  <div className="absolute w-2 h-2 -bottom-1 left-1/2 -translate-x-1/2 z-20  bg-black rotate-45"></div>
                </div>

                {isCatalogueVisible ? (
                  <StoreOutlinedIcon sx={{ fontSize: 20 }} />
                ) : (
                  <div className="p-2"></div>
                )}

                <PhoneOutlinedIcon sx={{ fontSize: 20 }} />
                <FaVideo size={18} />
              </div>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {/* Top Info */}
              <div className="text-[10px] text-gray-800 text-center my-2">
                OCT 24, 9:41 AM
              </div>
            </div>

            {/* Simulated Response Bubble */}
            <div className="flex-1 p-4 flex flex-col justify-end items-end gap-2">
              <div className=" flex items-end relative text-white">
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black text-white text-nowrap text-xs px-2 py-1 rounded-md animate-bounce-smooth pointer-events-none z-10">
                  {isCartEnabled ? "Cart" : "Off Cart"}
                  <div className="absolute w-2 h-2 -bottom-1 left-1/2 -translate-x-1/2 z-20  bg-black rotate-45"></div>
                </div>
                <div className=" flex items-center justify-center mb-0 p-2 shadow-xl w-10 h-10 rounded-full bg-white">
                  {isCartEnabled && (
                    <ShoppingCartOutlinedIcon className="text-black" />
                  )}
                </div>
              </div>
            </div>

            {/* BOTTOM SHEET: PERSISTENT MENU */}

            {/* 5. Bottom Input Area */}
            <div className="relative z-10 p-4 bg-white border-t">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-3">
                <FaRegFaceSmile className="text-gray-400" />
                {/* <PhotoCameraIcon sx={{ fontSize: 20, color: '#3797F0' }} /> */}
                <span className="text-gray-400 text-[13px] flex-1">
                  Message...
                </span>

                <LuMic className="text-gray-400" />
                <IoImageOutline className="text-gray-400" />
              </div>
              {/* iPhone Indicator */}
              <div className="w-28 h-1 bg-black rounded-full mx-auto mt-4" />
            </div>
          </div>
        </div>
      </div>

      <div className=""></div>
      <style jsx>{`
        @keyframes bounce-smooth {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-smooth {
          animation: bounce-smooth 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CommerceSetting;
