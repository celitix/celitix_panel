// import React, { useState } from "react";
// import QRCode from "qrcode"; // npm install qrcode
// import toast from "react-hot-toast";

// // ICONS
// import { TfiReload } from "react-icons/tfi";

// // COMPONENTS
// import UniversalButton from "@/components/common/UniversalButton";
// import InputField from "@/whatsapp/components/InputField";
// import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
// import UniversalInstaButton from "@/instagram/components/UniversalInstaButton";

// const IgMe = () => {
//   const [username, setUsername] = useState("");
//   const [referral, setReferral] = useState("");
//   const [qrCodeUrl, setQrCodeUrl] = useState("");
//   const [finalUrl, setFinalUrl] = useState("");

//   // Generate QR and URL
//   const handleGenerateQR = async () => {
//     if (!username.trim()) {
//       toast.error("Please enter a valid username");
//       return;
//     }
//     let url = `https://instagram.com/${username}`;
//     if (referral.trim()) {
//       url += `?ref=${encodeURIComponent(referral.trim())}`;
//     }

//     setFinalUrl(url);
//     try {
//       const qr = await QRCode.toDataURL(url);
//       setQrCodeUrl(qr);
//     } catch (error) {
//       console.error("QR generation failed", error);
//     }
//   };

//   // Copy link
//   const handleCopy = () => {
//     if (!finalUrl) return toast.error("No link to copy");
//     navigator.clipboard.writeText(finalUrl);
//     toast.success("Link copied to clipboard!");
//   };

//   // Download QR
//   const handleDownload = () => {
//     if (!qrCodeUrl) return toast.error("No QR to download");
//     const link = document.createElement("a");
//     link.href = qrCodeUrl;
//     link.download = "qr-code.png";
//     link.click();
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-3">
//       {/* Left Side Input Section */}
//       <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6 space-y-6 flex flex-col">
//         <h2 className="text-xl font-semibold">Generate Instagram Short Link</h2>
//         <InputField
//           label="Instagram userName"
//           placeholder="@username..."
//           maxLength={20}
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <UniversalTextArea
//           label="Referral Parameter"
//           placeholder="enter referral parameter"
//           value={referral}
//           onChange={(e) => setReferral(e.target.value)}
//         />
//         {/* <UniversalButton label="Generate Link" onClick={handleGenerateQR} /> */}
//         <UniversalInstaButton onClick={handleGenerateQR} label="Generate Link" />
//       </div>

//       {/* Instagram Short Link Card */}
//       <div className="w-full md:w-1/2  bg-white rounded-lg shadow-lg border p-6 text-center space-y-4">
//         <h2 className="text-lg font-semibold">
//           Here is your Instagram short link
//         </h2>
//         <button
//           onClick={() => {
//             setFinalUrl(""); // Clears the generated link
//             setQrCodeUrl(""); // Clears the QR code
//           }}
//           className="absolute right-5 top-5 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//         >
//           <TfiReload className="text-gray-600 text-lg" />
//         </button>
//         <p className="text-sm text-gray-600">
//           Copy and share it on your social media, website, emails or anywhere
//           you want to be contacted instantly by your customers.
//         </p>

//         {/* Instagram Link */}
//         {finalUrl ? (
//           <a
//             href={finalUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-green-600 font-medium text-lg"
//           >
//             {finalUrl.replace("https://", "")}
//           </a>
//         ) : (
//           <p className="text-gray-400">No Link Yet</p>
//         )}

//         {/* QR Code */}
//         <div className="flex justify-center">
//           {qrCodeUrl ? (
//             <img src={qrCodeUrl} alt="QR Code" className="w-70 h-70 " />
//           ) : (
//             <div className="w-70 h-70 bg-gray-100 flex items-center justify-center rounded-md">
//               <span className="text-gray-400 text-sm">No QR Generated</span>
//             </div>
//           )}
//         </div>

//         <p className="text-xs text-gray-500">
//           FREE !! - Track links & much more,{" "}
//           <span className="text-blue-500 cursor-pointer">Sign Up</span> now
//         </p>

//         {/* Action Buttons */}
//         <div className="flex justify-center gap-3">
//           <UniversalButton label="Copy URL" onClick={handleCopy} />
//           <UniversalButton label="Download QR" onClick={handleDownload} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IgMe;

import React, { useEffect, useRef, useState, useCallback } from "react";
import QRCodeStyling from "qr-code-styling";
import toast from "react-hot-toast";
// import Lottie from "lottie-react";
import { toPng } from "html-to-image";

// ICONS
import { TfiReload } from "react-icons/tfi";
import {
  FaInstagram,
  FaLink,
  FaQrcode,
  FaCopy,
  FaDownload,
  FaInfoCircle,
  FaShareAlt,
} from "react-icons/fa";

import { ColorPicker } from "primereact/colorpicker";

import { Checkbox } from "primereact/checkbox";

import { RadioButton } from "primereact/radiobutton";

// COMPONENTS
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalInstaButton from "@/instagram/components/UniversalInstaButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// ASSETS
// import Instagram from "@/assets/animation/Instagram.json";
import instagram from "@/assets/icons/instagram.svg";

// <div className="flex justify-center mb-2">
//   <Lottie animationData={Instagram} loop autoplay className="w-60" />
// </div>

const instaLogo =
  "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";

const dotTypes = ["rounded", "dots", "classy", "classy-rounded", "square"];
const dotTypeOptions = dotTypes.map((type) => ({
  value: type,
  label: type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
}));

const IgMe = () => {
  const qrRef = useRef(null);
  const qrCardRef = useRef(null);

  const [username, setUsername] = useState("");
  const [referral, setReferral] = useState("");
  const [finalUrl, setFinalUrl] = useState("");

  const [isQRGenerated, setIsQRGenerated] = useState(false);

  const [qrColor, setQrColor] = useState("#000000");
  const [dotStyle, setDotStyle] = useState("rounded");

  // Logo
  const [addInstaLogo, setAddInstaLogo] = useState(true);

  // Color mode
  const [colorMode, setColorMode] = useState("gradient"); // solid | gradient
  const [gradientFrom, setGradientFrom] = useState("#ff0080");
  const [gradientTo, setGradientTo] = useState("#7928ca");
  const [gradientDirection, setGradientDirection] = useState("horizontal");

  // Select Card UI
  const [cardStyle, setCardStyle] = useState("classic"); // classic | minimal | dark

  const cardStyles = ["classic", "minimal", "dark", "instagram"];

  // QR tabs
  const tabs = ["classic", "minimal", "dark", "instagram"];
  const activeIndex = tabs.indexOf(cardStyle);
  const tabRefs = useRef([]);
  const sliderRef = useRef(null);

  // QR Tabs Slider
  useEffect(() => {
    const activeIndex = tabs.indexOf(cardStyle);
    const activeTab = tabRefs.current[activeIndex];

    if (activeTab && sliderRef.current) {
      sliderRef.current.style.width = `${activeTab.offsetWidth}px`;
      sliderRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
    }
  }, [cardStyle]);

  //  QR CODE
  const qrCode = useRef(
    new QRCodeStyling({
      width: 220,
      height: 220,
      data: "",
      dotsOptions: {
        color: "#000000",
        type: "rounded",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
    })
  );
  

  const getGradientConfig = useCallback(() => {
    if (gradientDirection === "radial") {
      return {
        type: "radial",
        colorStops: [
          { offset: 0, color: gradientFrom },
          { offset: 1, color: gradientTo },
        ],
      };
    }

    const rotationMap = {
      horizontal: 0,
      vertical: Math.PI / 2,
      diagonal: Math.PI / 4,
    };

    return {
      type: "linear",
      rotation: rotationMap[gradientDirection] ?? 0,
      colorStops: [
        { offset: 0, color: gradientFrom },
        { offset: 1, color: gradientTo },
      ],
    };
  }, [gradientFrom, gradientTo, gradientDirection]);

  // update QR
  const updateQR = useCallback(
    (url) => {
      if (!qrCode.current) return;

      qrCode.current.update({
        data: url,
        dotsOptions:
          colorMode === "solid"
            ? {
                color: qrColor,
                type: dotStyle,
                gradient: undefined,
              }
            : {
                type: dotStyle,
                color: undefined,
                gradient: getGradientConfig(),
              },
        image: addInstaLogo ? instagram : undefined,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
          imageSize: 0.35,
        },
      });
    },
    [qrColor, dotStyle, addInstaLogo, colorMode, getGradientConfig]
  );

  // Generate URL
  useEffect(() => {
    if (!username.trim()) {
      setFinalUrl("");
      qrCode.current.update({ data: "" });
      return;
    }

    let url = `https://instagram.com/${username.trim()}`;
    if (referral.trim()) {
      url += `?ref=${encodeURIComponent(referral.trim())}`;
    }

    setFinalUrl(url);
    updateQR(url);
  }, [username, referral, updateQR]);

  // Call updateQR
  useEffect(() => {
    if (!finalUrl) return;
    updateQR(finalUrl);
  }, [
    qrColor,
    dotStyle,
    addInstaLogo,
    colorMode,
    gradientFrom,
    gradientTo,
    gradientDirection,
    finalUrl,
  ]);

  const handleGenerateQR = () => {
    if (!username.trim()) {
      return toast.error("Please enter Instagram username");
    }

    let url = `https://instagram.com/${username.trim()}`;
    if (referral.trim()) {
      url += `?ref=${encodeURIComponent(referral.trim())}`;
    }

    setFinalUrl(url);
    updateQR(url);
    toast.success("QR generated successfully 🚀");
  };

  const handleReloadQR = () => {
    if (!finalUrl) return toast.error("Generate QR first");

    const randomColor = () =>
      `hsl(${Math.floor(Math.random() * 360)}, 80%, 45%)`;

    qrCode.current.update({
      data: finalUrl,
      dotsOptions: {
        color: randomColor(),
        type: dotTypes[Math.floor(Math.random() * dotTypes.length)],
      },
      cornersSquareOptions: {
        type: Math.random() > 0.5 ? "extra-rounded" : "square",
      },
      image: addInstaLogo ? instaLogo : undefined,
    });

    toast.success("QR style updated ✨");
  };

  const handleCopy = async () => {
    if (!finalUrl) return toast.error("No link to copy");
    try {
      await navigator.clipboard.writeText(finalUrl);
      toast.success("Link copied to clipboard");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = finalUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast.success("Link copied to clipboard");
    }
  };

  const handleDownload = async () => {
    if (!finalUrl) return toast.error("Generate QR first");
    try {
      const dataUrl = await toPng(qrCardRef.current, {
        pixelRatio: 3,
        quality: 1,
      });
      const link = document.createElement("a");
      link.download = "instagram-qr-card.png";
      link.href = dataUrl;
      link.click();
      toast.success("QR Card downloaded 🎉");
    } catch {
      toast.error("Failed to download QR card");
    }
  };

  const handleReset = () => {
    setUsername("");
    setReferral("");
    setFinalUrl("");
    qrCode.current.update({ data: "" });
  };

  const CardQR = ({ minimal, dark }) => (
    <>
      <p
        className={`text-sm font-semibold  ${
          dark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        SCAN ME
      </p>

      <div
        className={`flex justify-center
        ${
          minimal
            ? "p-1 rounded-2xl bg-linear-to-br from-pink-500 via-purple-500 to-orange-400"
            : " "
        }`}
      >
        <div className="bg-white rounded-2xl ">
          <QRBox />
        </div>
      </div>

      {finalUrl && (
        <div className="flex  justify-center gap-1 font-medium w-full max-w-full px-2">
          <FaInstagram className="text-pink-500 mb-auto mt-1 text-base shrink-0" />

          <span className="text-sm text-center break-all line-clamp-5">
            @{username}
          </span>
        </div>
      )}
    </>
  );

  const QRBox = () => (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 235, height: 240 }}
    >
      {finalUrl ? (
        <div
          ref={(node) => {
            if (node) {
              node.innerHTML = ""; // clear old QR
              qrCode.current.append(node); // attach only when URL exists
            }
          }}
        />
      ) : (
        <p className="absolute text-xs text-gray-400 text-center px-4">
          Generate QR to preview
        </p>
      )}
    </div>
  );

  // const isValidUsername = /^[a-zA-Z0-9._]{1,30}$/;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* LEFT SECTION */}
      <div className="bg-gray-50 rounded-xl shadow-md border p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row text-center md:text-start items-center gap-3">
          <div className=" p-1 rounded-full bg-linear-to-r from-pink-500 to-purple-500 text-white">
            <FaInstagram className="text-3xl lg:text-2xl" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold playf">Instagram QR Generator</h2>
            <p className="text-sm text-gray-500">
              Create shareable Instagram links & QR codes
            </p>
          </div>
        </div>

        <InputField
          label="Instagram Username"
          placeholder="your_username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <UniversalTextArea
          label="Referral Parameter (Optional)"
          placeholder="campaign=summer_sale"
          row={3}
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
        />

        {/* QR Controls */}
        <div className="flex flex-col bg-white p-4 gap-4 rounded-xl">
          {/* QR Color Type Dropdown */}
          {/* <div className="flex flex-col md:flex-row gap-2  justify-between items-end"> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-2 items-end">
            <div className="flex flex-col   gap-2">
              <span className="text-sm font-medium text-gray-700">
                QR Color Type
              </span>

              <div className="flex gap-4">
                <div className="flex align-items-center gap-2">
                  <RadioButton
                    inputId="colorSolid"
                    name="colorMode"
                    value="solid"
                    onChange={(e) => setColorMode(e.value)}
                    checked={colorMode === "solid"}
                  />
                  <label
                    htmlFor="colorSolid"
                    className="text-sm cursor-pointer"
                  >
                    Solid
                  </label>
                </div>

                <div className="flex align-items-center gap-2">
                  <RadioButton
                    inputId="colorGradient"
                    name="colorMode"
                    value="gradient"
                    onChange={(e) => setColorMode(e.value)}
                    checked={colorMode === "gradient"}
                  />
                  <label
                    htmlFor="colorGradient"
                    className="text-sm cursor-pointer"
                  >
                    Gradient
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-start   gap-2">
              <Checkbox
                inputId="instaLogo"
                checked={addInstaLogo}
                onChange={(e) => setAddInstaLogo(e.checked)}
              />
              <label
                htmlFor="instaLogo"
                className="text-md text-gray-700 cursor-pointer"
              >
                Add Instagram logo to QR center
              </label>
            </div>
          </div>

          {/* Gradient Direction */}
          {colorMode === "gradient" && (
            <div className="flex flex-col gap-2 ">
              <span className="text-sm font-medium text-gray-700">
                Gradient Direction
              </span>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 xl:gap-2">
                {["horizontal", "vertical", "diagonal", "radial"].map((dir) => (
                  <div key={dir} className="flex align-items-center gap-1">
                    <RadioButton
                      inputId={dir}
                      name="gradientDirection"
                      value={dir}
                      onChange={(e) => setGradientDirection(e.value)}
                      checked={gradientDirection === dir}
                    />
                    <label htmlFor={dir} className="text-sm cursor-pointer">
                      {dir.charAt(0).toUpperCase() + dir.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* solid  ColorPicker  */}
            {colorMode === "solid" && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Select QR Color
                </span>

                <ColorPicker
                  value={qrColor.replace("#", "")}
                  format="hex"
                  onChange={(e) => setQrColor(`#${e.value}`)}
                />
              </div>
            )}

            {/* gradient  ColorPicker  */}
            {colorMode === "gradient" && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Gradient Colors
                </span>

                <div className="flex gap-2">
                  <ColorPicker
                    value={gradientFrom.replace("#", "")}
                    format="hex"
                    onChange={(e) => setGradientFrom(`#${e.value}`)}
                  />

                  <ColorPicker
                    value={gradientTo.replace("#", "")}
                    format="hex"
                    onChange={(e) => setGradientTo(`#${e.value}`)}
                  />
                </div>
              </div>
            )}

            {/* Select Insta Logo */}
            {/* <div className="flex  gap-2">
            <Checkbox
              inputId="instaLogo"
              checked={addInstaLogo}
              onChange={(e) => setAddInstaLogo(e.checked)}
            />
            <label
              htmlFor="instaLogo"
              className="text-sm text-gray-700 cursor-pointer"
            >
              Add Instagram logo to QR center
            </label>
          </div> */}

            {/* Select QR dot color  */}
            <DropdownWithSearch
              id="dotStyle"
              name="dotStyle"
              label="QR Dot Style"
              value={dotStyle}
              onChange={setDotStyle}
              options={dotTypeOptions}
              placeholder="Select dot style"
              tooltipContent="Choose how QR dots should appear"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex gap-2 text-sm text-gray-500 bg-white p-3 rounded-lg">
          <FaInfoCircle className="mt-0.5" />
          Referral helps track ads, influencers, or promotions.
        </div>

        {/* Generate and Reset Button */}
        <div className="flex justify-end gap-3">
          <UniversalInstaButton
            label="Generate Link & QR"
            onClick={handleGenerateQR}
            disabled={!username.trim()}
          />
          <UniversalInstaButton
            label="Reset"
            variant="secondary"
            onClick={handleReset}
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative bg-gray-50 rounded-xl shadow-md border p-6 space-y-5 text-center">
        {/* Reload Button */}
        <button
          onClick={handleReloadQR}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          title="Change QR Design"
        >
          <TfiReload />
        </button>

        <h3 className="text-2xl font-semibold playf">Your Instagram Link</h3>
        <p className="text-sm text-gray-500">
          Share this link or scan the QR to open profile
        </p>

        {/* QR CARD (ONLY ONE AT A TIME) */}
        <div className="flex justify-center">
          {cardStyle !== "instagram" ? (
            /* ================= NORMAL CARDS ================= */
            <div ref={qrCardRef}>
              <div
                className={` overflow-hidden ${
                  finalUrl ? "  h-[424px]" : " h-[402px] "
                }
                  ${
                    cardStyle === "classic"
                      ? "w-70 bg-white rounded-2xl"
                      : cardStyle === "minimal"
                      ? "w-70 bg-white rounded-2xl"
                      : "w-70 bg-black text-white rounded-2xl"
                  } 
                `}
              >
                {cardStyle === "classic" && (
                  <div className=" flex flex-col items-center  justify-center p-1.5 h-full shadow-xl rounded-2xl bg-linear-to-br from-pink-500 via-purple-500 to-orange-400">
                    <div className="flex flex-col items-center justify-center max-w-full bg-white rounded-2xl h-full py-6 px-4 text-center space-y-2">
                      <CardQR />
                    </div>
                  </div>
                )}

                {cardStyle == "minimal" && (
                  <div className=" flex flex-col items-center justify-center max-w-full py-6 px-4 h-full shadow-xl rounded-2xl text-center space-y-2 ">
                    <CardQR minimal={true} />
                  </div>
                )}
                {cardStyle == "dark" && (
                  <div className=" flex flex-col items-center justify-center max-w-full py-6 px-4 h-full shadow-xl  rounded-2xl text-center space-y-2">
                    <CardQR dark={cardStyle === "dark"} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ================= INSTAGRAM MARKETING CARD ================= */
            <div
              ref={qrCardRef}
              className="w-70 min-h-[402px] rounded-2xl   bg-white shadow-xl overflow-hidden"
            >
              {/* HEADER */}
              <div className="bg-linear-to-br from-pink-500 via-purple-500 to-orange-400 p-5 h-40 text-white space-y-1 ">
                <p className="text-xs uppercase ">FOLLOW US ON</p>

                <div className="flex justify-between items-center ">
                  <h3 className="text-2xl text-center w-full font-bold italic">
                    Instagram
                  </h3>
                </div>
              </div>

              {/* FLOATING QR */}
              <div className=" -mt-20 px-5">
                <div className="bg-white rounded-2xl p-4 shadow-lg flex justify-center">
                  <QRBox />
                </div>
              </div>

              <div className="text-center  py-4 space-y-1">
                <p className="text-xs text-gray-600">SCAN THE QR CODE</p>

                {finalUrl && (
                  <div className="flex  justify-center gap-1 font-medium w-full max-w-full px-2">
                    <FaInstagram className="text-pink-500 mb-auto mt-1 text-base shrink-0" />

                    <span className="text-sm text-center break-all line-clamp-5">
                      @{username}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Card Style Switcher */}
        <div className="flex justify-center mb-4">
          <div className="relative flex gap-2 bg-gray-200 rounded-full px-2 py-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {/* Sliding Capsule */}
            <div
              ref={sliderRef}
              className="absolute top-1 left-0 h-[calc(100%-8px)] bg-pink-600 rounded-full transition-all duration-300 ease-out"
            />

            {tabs.map((style, index) => {
              const isActive = cardStyle === style;

              return (
                <button
                  key={style}
                  ref={(el) => (tabRefs.current[index] = el)}
                  onClick={() => setCardStyle(style)}
                  className={`relative z-10 inline-block px-4 py-1.5 text-sm capitalize rounded-full transition-colors
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"
                    }
                  `}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>

        {finalUrl ? (
          <div className="flex  items-center gap-2   rounded-lg bg-green-50 border border-green-200 text-green-700 px-4 py-2">
            <div className="flex w-full items-center justify-center gap-2 text-sm break-all">
              <FaLink className="shrink-0" />
              <a href={finalUrl} target="_blank" rel="noreferrer">
                {finalUrl.replace("https://", "")}
              </a>
              {/* <div className="flex">
              </div> */}
            </div>
            <div className="flex justify-end   ">
              <button
                type="button"
                onClick={handleCopy}
                className=" hover:text-green-600 text-lg hover:cursor-pointer "
              >
                <FaCopy />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-sm">No link generated yet</div>
        )}

        <div className="flex justify-center flex-wrap gap-3 ">
          <div className="flex">
            <UniversalButton
              label="Reload "
              type="button"
              variant="secondary"
              onClick={handleReloadQR}
              icon={<TfiReload />}
            />
          </div>
          {/* <div className="text-nowrap">
            <UniversalButton
              label="Copy "
              type="button"
              onClick={handleCopy}
              icon={<FaCopy />}
            />
          </div> */}
          <div className="text-nowrap">
            <UniversalInstaButton
              label="Download"
              onClick={handleDownload}
              icon={<FaDownload />}
            />
          </div>
          <div className="text-nowrap">
            <UniversalInstaButton
              label="Share"
              icon={<FaShareAlt />}
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(finalUrl)}`,
                  "_blank"
                )
              }
            />
          </div>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>✔ Works in Instagram bio & stories</p>
          <p>✔ No login required • 100% free</p>
          <p>✔ High-quality scan-friendly QR</p>
          <p className="text-blue-500 cursor-pointer">
            Upgrade for analytics →
          </p>
        </div>
      </div>
    </div>
  );
};

export default IgMe;
