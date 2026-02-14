// import React, { useState } from "react";
// import QRCode from "qrcode";
// import toast from "react-hot-toast";

// // ASSETS
// import qrPlaceholder from "@/assets/images/QRcode.png";
// import userPng from "@/assets/images/user.png";

// // COMPONENTS
// import InputField from "../components/InputField";
// import UniversalTextArea from "../components/UniversalTextArea";
// import UniversalButton from "../components/UniversalButton";

// const WhatsappQrCode = () => {
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [qrImage, setQrImage] = useState(qrPlaceholder);
//   const [qrLink, setQrLink] = useState("https://wa.me/xxxxx?text=hello");

//   const sendMessage = () => {
//     if (message.trim()) {
//       const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//       window.open(url, "_blank");
//     }
//   };

//   const generateQRCode = async () => {
//     if (!phone.trim()) {
//       toast.error("Please enter a valid phone number.");
//       return;
//     }
//     const formattedMessage = encodeURIComponent(message);
//     const url = `https://wa.me/${phone}?text=${formattedMessage}`;
//     setQrLink(url);
//     QRCode.toDataURL(url, (err, url) => {
//       if (!err) {
//         setQrImage(url);
//         toast.success("QR Code generated successfully!");
//       } else {
//         toast.error("Failed to generate QR Code. Please try again.");
//       }
//     });
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard
//       .writeText(qrLink)
//       .then(() => {
//         toast.success("Copied to clipboard!");
//       })
//       .catch(() => {
//         toast.error("Failed to copy to clipboard. Please try again.");
//       });
//   };

//   return (
//     <div className="bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] w-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
//       {/* form */}
//       <div className=" bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col gap-[15px] h-120" >
//         <InputField
//           label="WhatsApp QR Code Generator"
//           id="whatsAppqrCodeGenerator"
//           name="whatsAppQrCodeGenerator"
//           placeholder="Ex.: 91XXXXXXXXXX"
//           type="number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <UniversalTextArea
//           label="Prefilled Message"
//           id="PrefilledMessage"
//           name="PrefilledMessage"
//           placeholder="Ex.: Hello World!"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           row="10"
//         />
//         <UniversalButton
//           id="generateQrCodeBtn"
//           name="generateQrCodeBtn"
//           label="Generate QR Code"
//           onClick={generateQRCode}
//         />
//       </div>

//       {/* whats'App View */}
//       <div className=" bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col gap-[15px] h-120">
//         <div style={{
//           width: "100%", height: "100%", background: "#e5ddd5", borderRadius: "10px", padding: "10px", fontFamily: "Arial, sans-serif", position: "relative"
//         }}>
//           <div style={{
//             display: "flex", alignItems: "center", background: "#075e54", padding: "10px", borderRadius: "8px 8px 0 0", color: "white"
//           }}>
//             <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "white" }}>
//               <img src={userPng} alt="User" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
//             </div>
//             <p style={{ margin: 0, paddingLeft: 10, fontSize: 14 }}>
//               {phone ? `${phone}` : "919876543210"}
//             </p>
//             <div style={{ marginLeft: "auto", cursor: "pointer" }}>
//               <i className="bi bi-three-dots-vertical"></i>
//             </div>
//           </div>

//           <div className="absolute bottom-0 right-0 px-2 " style={{ width: "100%" }}>
//             <UniversalTextArea
//               placeholder="Ex.: Hello World!"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               readOnly="true"
//             />
//           </div>
//         </div>
//       </div>

//       {/* QR Code */}
//       <div className="bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col gap-[15px] h-120">
//         <div className=" flex items-center justify-center rounded-[5px] border border-[#ddd] p-0">

//           {qrImage && <img src={qrImage} alt="WhatsApp QR Code" className="h-60 w-60" />}
//         </div>
//         <InputField
//           label="Your WhatsApp Click-To-Chat Link"
//           id="whatsappclicktochatlink"
//           name="whatsappclicktochatlink"
//           placeholder="https://wa.me/xxxxx?text=hello"
//           value={qrLink}
//           readOnly="true"
//         />
//         <UniversalButton
//           id="copytoclipboard"
//           name="copytoclipboard"
//           label="Copy to Clipboard"
//           onClick={copyToClipboard}
//         />
//         <UniversalButton
//           id="openinwhatsapp"
//           name="openinwhatsapp"
//           label="Open in WhatsApp"
//           onClick={() => window.open(qrLink, "_blank")}
//         />
//       </div>
//     </div>
//   );
// };

// export default WhatsappQrCode;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { toPng } from "html-to-image";

import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { Checkbox } from "primereact/checkbox";

// icons
import {
  FaWhatsapp,
  FaQrcode,
  FaInfoCircle,
  FaCopy,
  FaVideo,
  FaPhone,
  FaDownload,
  FaShareAlt,
  FaLink,
} from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { RiQrScan2Line } from "react-icons/ri";

// ASSETS
import qrPlaceholder from "@/assets/images/QRcode.png";
import userPng from "@/assets/images/user.png";

// COMPONENTS
import InputField from "../components/InputField";
import UniversalTextArea from "../components/UniversalTextArea";
import UniversalButton from "../components/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

const QrCardClassic = ({ active, qrInstance, phoneNo }) => (
  <div className="flex flex-col justify-center h-full gap-4 rounded-2xl bg-white px-6 py-4 overflow-hidden">
    <div className="flex gap-1 w-full  items-center justify-center text-center  text-sm  text-gray-600">
      <span>
        {" "}
        Get prompt replies! Send us any queries bg scanning the QR Code{" "}
      </span>
    </div>

    <div className="flex justify-center border-5 border-t-0 border-b-0 border-[#25d366] rounded-lg p-2">
      <QRBox isActive={active} qrInstance={qrInstance} />
    </div>

    <button className="w-full bg-black text-white p-2 rounded-full text-sm">
      SCAN QR CODE
    </button>

    <div className="bg-[#25d366] text-white text-xs p-2 rounded-lg space-y-1">
      <p>1. Open WhatsApp</p>
      <p>2. Scan QR Code</p>
      <p>3. Send us a message</p>
    </div>
  </div>
);

const QrCardMinimal = ({ active, qrInstance }) => (
  <div className="flex flex-col justify-center h-full gap-3 border-8 px-6 py-4 border-[#25d366] rounded-2xl bg-white  overflow-hidden">
    <div className=" flex flex-col gap-1 text-center ">
      <p className="text-xl font-semibold text-[#25d366]  ">WhatsApp</p>
      <span className=" text-3xl font-medium text-gray-500 "> Scan Here </span>
    </div>

    <div className="flex justify-center  ">
      <QRBox isActive={active} qrInstance={qrInstance} />
    </div>

    {/* <button className="w-full bg-black text-white p-2 rounded-full text-sm">
      SCAN QR CODE
    </button> */}
    <div className="flex items-center justify-center gap-1 text-sm  font-medium text-gray-700">
      {/* <FaWhatsapp className="text-[#25d366] text-xl" /> */}
      <RiQrScan2Line className="text-black text-lg" />
      <span>Scan using WhatsApp</span>
    </div>
  </div>
);

const QrCardRounded = ({ active, qrInstance }) => (
  <div className="flex flex-col justify-center bg-green-500 h-full gap-3 rounded-2xl px-6 py-4 overflow-hidden">
    <div className="text-center">
      <p className="text-[22px] font-medium text-white">
        Chat with us in a tap!{" "}
      </p>
      <p className="text-[22px] font-medium text-white">Scan the QR now! </p>
    </div>

    <div className="flex justify-center border rounded-full  bg-white  p-4">
      <QRBox isActive={active} qrInstance={qrInstance} />
    </div>

    <div className="">
      <div className="text-center text-white text-sm ">
        <p>Get instant support</p>
        <p>Ask questions • Get assistance </p>
      </div>
    </div>
    {/* <button className="mx-4 my-4 w-[calc(100%-2rem)] bg-black text-white py-2 rounded-full text-sm">
      SCAN QR CODE
    </button> */}

    {/* <div className="bg-green-500 text-white text-xs px-4 py-3 space-y-1">
      <p>1. Scan QR Code</p>
      <p>2. Open WhatsApp</p>
      <p>3. Send us a message</p>
    </div> */}
  </div>
);

const QRBox = ({ isActive, qrInstance }) => {
  const qrMountRef = useRef(null);

  useEffect(() => {
    if (!isActive || !qrInstance.current || !qrMountRef.current) return;

    qrMountRef.current.innerHTML = "";
    qrInstance.current.append(qrMountRef.current);
  }, [isActive, qrInstance]);

  return (
    <div className="flex items-center justify-center w-60 h-60">
      {isActive ? (
        <div ref={qrMountRef} />
      ) : (
        <div className="flex flex-col justify-center items-center  gap-1">
          <img
            src={qrPlaceholder}
            alt="QR placeholder"
            className="w-32 opacity-40"
          />
          <span className="text-gray-400"> QR is not generated yet! </span>
        </div>
      )}
    </div>
  );
};

const WhatsappQrCode = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [qrLink, setQrLink] = useState("https://wa.me/xxxxx?text=hello");
  const [theme, setTheme] = useState("light");

  const [isQrGenerated, setIsQrGenerated] = useState(false);

  // QR Styling
  const qrInstance = useRef(null);

  const [qrConfig, setQrConfig] = useState({
    data: "https://wa.me/91XXXXXXXXXX?text=Hello",
    dotsType: "rounded",
    dotsColor: "#000",
    bgColor: "#ffffff",
    logo: true,
  });

  // QR Cards
  const [activeCard, setActiveCard] = useState(0);
  const qrCardRef = useRef(null);

  const qrCardList = [
    { id: 0, label: "Classic", component: QrCardClassic },
    { id: 1, label: "Minimal", component: QrCardMinimal },
    { id: 2, label: "Rounded", component: QrCardRounded },
  ];

  const qrStyleOptions = [
    { value: "rounded", label: "Rounded" },
    { value: "dots", label: "Dots" },
    { value: "classy", label: "Classy" },
    { value: "square", label: "Square" },
    { value: "classy-rounded", label: "classy-rounded" },
  ];

  // Phone Number Validation
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only

    if (value.length > 14) return;

    if (!phone) {
      setPhone("");
    }
    setPhone(value);
  };

  useEffect(() => {
    if (qrInstance.current) return;

    qrInstance.current = new QRCodeStyling({
      width: 200,
      height: 200,
      data: qrConfig.data,
      image: qrConfig.logo
        ? "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        : undefined,
      dotsOptions: {
        type: qrConfig.dotsType,
        color: qrConfig.dotsColor,
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      backgroundOptions: {
        color: qrConfig.bgColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
    });
  }, []);

  // 3rd card QR Transparent
  useEffect(() => {
    if (!qrInstance.current) return;

    qrInstance.current.update({
      backgroundOptions: {
        color: activeCard === 2 ? "transparent" : "#ffffff", // Rounded only
      },
    });
  }, [activeCard]);

  useEffect(() => {
    if (!qrInstance.current || !isQrGenerated) return;

    qrInstance.current.update({
      data: qrConfig.data,
      dotsOptions: {
        type: qrConfig.dotsType,
        color: qrConfig.dotsColor,
      },
      image: qrConfig.logo
        ? "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        : undefined,
    });
  }, [qrConfig, isQrGenerated]);

  // useEffect(() => {
  //   if (!phone) return;

  //   const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  //   setQrLink(link);

  //   setQrConfig((prev) => ({
  //     ...prev,
  //     data: link,
  //   }));
  // }, [phone, message]);

  // Generate QR code
  const generateQrCode = () => {
    if (!phone || phone.length < 8) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    setQrLink(link);

    setQrConfig((prev) => ({
      ...prev,
      data: link,
    }));

    setIsQrGenerated(true);

    toast.success("QR code generated successfully");
  };

  // reset QR code
  const resetQrCode = () => {
    // clear form
    setPhone("");
    setMessage("");

    // reset QR flags
    setIsQrGenerated(false);
    setQrLink("");

    // reset QR config data only
    setQrConfig((prev) => ({
      ...prev,
      data: "",
    }));

    // clear QR canvas
    if (qrInstance.current) {
      qrInstance.current.update({
        data: "",
      });
    }

    toast.success("QR cleared successfully");
  };

  const downloadQrCard = async () => {
    if (!qrCardRef.current) {
      toast.error("QR Card not found");
      return;
    }

    try {
      const dataUrl = await toPng(qrCardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High quality
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = "whatsapp-qr-card.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      toast.error("Failed to download QR Card");
    }
  };

  const reloadQR = () => {
    if (!phone) {
      toast.error("Please enter phone number first");
      return;
    }

    setQrConfig((prev) => ({
      ...prev,
      data: `https://wa.me/${phone}?text=${encodeURIComponent(
        message
      )}&t=${Date.now()}`,
    }));

    toast.success("QR code refreshed successfully");
  };

  // Whatsapp Preview Theme
  const themes = {
    light: {
      bg: "#e5ddd5",
      header: "#075e54",
      bubble: "#dcf8c6",
      text: "#000",
    },
    dark: {
      bg: "#0b141a",
      header: "#1f2c33",
      bubble: "#005c4b",
      text: "#fff",
    },
  };

  // Whatsapp Chat Background Pattern
  const chatPatterns = {
    light: {
      image:
        "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
      overlay: "rgba(0,0,0,0.03)",
    },
    dark: {
      image:
        "url('https://i.pinimg.com/564x/d3/6b/cc/d36bcceceaa1d390489ec70d93154311.jpg')",
      overlay: "rgba(255,255,255,0.04)",
    },
  };

  // Whatsapp Chat Bubble
  const formatWhatsAppText = (text) => {
    if (!text) return "";
    return text
      .replace(/ /g, "\u00A0") // preserve multiple spaces
      .replace(/\n/g, "\n"); // keep line breaks
  };

  // Light Dark Mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const sendMessage = () => {
    if (message.trim()) {
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
  };

  const copyToClipboard = (text) => {
    if (!text) {
      toast.error("Nothing to copy");
      return;
    }

    // Use modern clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("Copied to clipboard!");
        })
        .catch(() => {
          // Fallback if clipboard API fails (e.g., insecure context)
          fallbackCopy(text);
        });
    } else {
      // Fallback for older browsers
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        toast.success("Copied to clipboard!");
      } else {
        toast.error("Failed to copy to clipboard");
      }
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <>
      {/* Header */}
      {/* <div className="flex justify-center items-center  space-y-2  ">
        <h1 className="flex justify-center w-full items-center gap-2 text-xl font-semibold text-[#25d366]">
          WhatsApp QR Code Generator
        </h1>
        <div className="flex items-start max-w-xl ms-auto gap-2 bg-green-50 border border-green-200 p-3 rounded-md text-sm text-green-700 ">
          <FaInfoCircle size={20} className="mt-1  shrink-0 " />
          <p>
            Generate a WhatsApp Click-to-Chat QR code. Users can scan and
            directly message you without saving your number.
          </p>
        </div>
      </div> */}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-2  w-auto ">
        {/* form */}
        <div className=" flex flex-col gap-4  bg-gray-50 p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <div className="">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#25d366]">
              <FaWhatsapp size={24} />
              WhatsApp Details
            </h2>
          </div>
          <div className="flex items-start max-w-xl ms-auto gap-2 bg-green-50 border border-green-200 p-3 rounded-md text-sm text-green-700 ">
            <FaInfoCircle size={20} className="mt-1  shrink-0 " />
            <p>
              Generate a WhatsApp Click-to-Chat QR code. Users can scan and
              directly message you without saving your number.
            </p>
          </div>
          {/* <div className="flex gap-2 items-start bg-green-50 border border-green-200 p-3 rounded-md text-sm text-green-700 ">
            <FaInfoCircle size={20} className="mt-1  shrink-0 " />
            <p>
              Generate a WhatsApp Click-to-Chat QR code. Users can scan and
              directly message you without saving your number.
            </p>
          </div> */}
          <InputField
            label="Enter your WhatsApp Number"
            id="whatsAppqrCodeGenerator"
            name="whatsAppQrCodeGenerator"
            placeholder="Ex.: 91XXXXXXXXXX"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
          />
          <UniversalTextArea
            label="Prefilled Message"
            id="PrefilledMessage"
            name="PrefilledMessage"
            placeholder="Ex.: Hello World!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            row="11"
          />
          <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* QR Color Picker */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Select QR Color
                </span>
                <ColorPicker
                  value={qrConfig.dotsColor.replace("#", "")}
                  onChange={(e) =>
                    setQrConfig((prev) => ({
                      ...prev,
                      dotsColor: `#${e.value}`,
                    }))
                  }
                />
              </div>

              {/* Select QR Styling */}
              <div className="">
                <DropdownWithSearch
                  id="qr-dots-type"
                  name="qrDotsType"
                  label="QR Dot Style"
                  value={qrConfig.dotsType}
                  options={qrStyleOptions}
                  placeholder="Select QR style"
                  onChange={(value) =>
                    setQrConfig((prev) => ({
                      ...prev,
                      dotsType: value,
                    }))
                  }
                  tooltipContent="Choose how QR dots should appear"
                />
              </div>
            </div>

            {/* Add Whatsapp Logo  */}

            <div className="flex items-start   gap-2">
              <Checkbox
                inputId="instaLogo"
                checked={qrConfig.logo}
                onChange={() =>
                  setQrConfig((prev) => ({ ...prev, logo: !prev.logo }))
                }
              />
              <label
                htmlFor="instaLogo"
                className="text-md text-gray-700 cursor-pointer"
              >
                Add Whatsapp logo to QR center
              </label>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <UniversalButton
              id="generateQrCodeBtn"
              name="generateQrCodeBtn"
              label="Generate QR Code"
              onClick={generateQrCode}
            />
            <UniversalButton
              id="Reset"
              name="Reset"
              label="Reset"
              variant="secondary"
              onClick={resetQrCode}
            />
          </div>
        </div>

        {/* WhatsApp Preview */}
        <div className="flex flex-col gap-4 bg-gray-50 h-full min-h-120 p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] ">
          {/* Preview Header */}
          <div className="flex items-center justify-between">
            <div className="">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-[#25d366]">
                {/* <FaWhatsapp size={20} /> */}
                WhatsApp Preview
              </h2>
            </div>

            {/* Theme Switch */}
            <div className="flex gap-2 text-xs">
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${theme === "dark" ? "bg-black" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${theme === "dark" ? "translate-x-7" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {/* WhatsApp Phone Mock */}
          <div
            className="flex flex-col h-full rounded-lg overflow-hidden relative "
            style={{
              backgroundColor: themes[theme].bg,
              backgroundImage: `linear-gradient(
              ${chatPatterns[theme].overlay},
              ${chatPatterns[theme].overlay}),
              ${chatPatterns[theme].image}
            `,
              backgroundRepeat: "repeat",
            }}
          >
            {/* Top Bar */}
            <div
              className="flex items-center px-1.5 sm:px-3 py-2 text-white"
              style={{ background: themes[theme].header }}
            >
              <img
                src={userPng}
                alt="User"
                className="w-8 h-8 rounded-full bg-white"
              />

              <div className="ml-2 flex-1">
                <p className="text-sm font-medium">{phone || "91XXXXXXXX"}</p>
                <p className="text-[11px] opacity-80">online</p>
              </div>

              <div className="flex text-xs gap-1 sm:gap-3 ">
                <VideocamOutlinedIcon />
                <LocalPhoneOutlinedIcon />
                <MoreVertOutlinedIcon />
              </div>
            </div>

            {/* Chat Area */}

            {/* <div className="flex flex-col gap-2 p-3  ">
              <div
                className="self-end max-h-60 overflow-y-auto max-w-[75%] px-3 py-1 rounded-lg text-sm break-words"
                style={{
                  background: themes[theme].bubble,
                  color: themes[theme].text,
                  whiteSpace: "pre-wrap",
                }}
              >
                <span>
                  {formatWhatsAppText(
                    message || "Hello This is a preview message"
                  )}
                </span>
              </div>
            </div> */}

            {/* Message Preview Textarea (Read-only) */}
            {/* <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <UniversalTextArea
                placeholder="Ex.: Hello World!"
                value={message}
                readOnly={true}
                row={3}
                className="resize-none text-sm bg-transparent"
              /> 
            </div> */}
            <div className=" mt-auto p-2 sm:p-2.5  ">
              <div className="flex items-end  gap-2">
                <div className="flex items-end gap-2 w-full px-1  sm:px-2 py-0.5  rounded-lg sm:rounded-xl bg-white ">
                  {/* Message Input  */}
                  <div className=" flex items-center w-full">
                    <textarea
                      placeholder={`Ex.: Hii Jack!\nHow Can We Help You?`}
                      value={message}
                      readOnly
                      rows={3}
                      className=" w-full resize-none text-sm bg-transparent outline-none border-none whitespace-pre-wrap wrap-break-word leading-relaxed  px-2 py-0.5  "
                    />
                  </div>

                  {/* Link Icon */}
                  <div className=" mb-1 ">
                    <AttachFileIcon fontSize="small" />
                  </div>
                </div>

                {/* Send Message Icon */}
                <div className=" mb-0.5 ">
                  <div className=" flex justify-center items-center w-7.5 h-7.5 rounded-full bg-white">
                    <SendIcon fontSize="small" className=" " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col   items-center gap-4 bg-gray-50 p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          {/* header */}
          <div className="">
            <h2 className="flex items-center justify-center gap-2 text-xl font-semibold text-[#25d366]">
              <FaQrcode className="text-[#128c7e]" /> Your QR Code
            </h2>
          </div>

          {/* QR */}
          <div
            ref={qrCardRef}
            className=" w-80 sm:w-80 h-120 rounded-2xl overflow-hidden shadow-2xl"
          >
            {activeCard === 0 && (
              <QrCardClassic
                active={isQrGenerated}
                qrInstance={qrInstance}
                phoneNo={phone}
              />
            )}

            {activeCard === 1 && (
              <QrCardMinimal active={isQrGenerated} qrInstance={qrInstance} />
            )}

            {activeCard === 2 && (
              <QrCardRounded active={isQrGenerated} qrInstance={qrInstance} />
            )}
          </div>

          {qrLink ? (
            <div className="flex  items-center gap-2   rounded-lg bg-green-50 border border-green-200 text-green-700 px-4 py-2">
              <div className="flex w-full items-center justify-center gap-2 text-sm break-all">
                <FaLink className="shrink-0" />
                <a
                  href={qrLink}
                  target="_blank"
                  rel="noreferrer"
                  className=" line-clamp-2"
                >
                  {qrLink}
                </a>
              </div>
              <div className="flex justify-end   ">
                <button
                  type="button"
                  onClick={() => copyToClipboard(qrLink)}
                  className=" hover:text-[#25d366] text-lg hover:cursor-pointer "
                  aria-label="Copy link"
                  disabled={!isQrGenerated}
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center rounded-lg bg-green-50 border border-green-200 text-sm text-green-700 px-4 py-2">
              <span> No link generated yet </span>
            </div>
          )}

          {/* tabs */}
          <div className="flex gap-2 ">
            {qrCardList.map((card) => (
              <button
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`px-4 py-2 rounded-full text-sm border transition
                ${activeCard === card.id
                    ? "bg-[#25d366] text-white"
                    : "bg-white text-gray-600"
                  }`}
              >
                {card.label}
              </button>
            ))}
          </div>

          {/* <div className="flex flex-col gap-4 "> */}

          {/* Download QR button */}

          <div className="flex justify-center flex-wrap gap-3 ">
            <div className="flex">
              <UniversalButton
                label="Reload "
                type="button"
                variant="secondary"
                onClick={reloadQR}
                icon={<TfiReload />}
                disabled={!isQrGenerated}
              />
            </div>
            <div className="text-nowrap">
              {/* <UniversalInstaButton */}
              <UniversalButton
                label="Download"
                onClick={downloadQrCard}
                icon={<FaDownload />}
                disabled={!isQrGenerated}
              />
            </div>
            <div className="">
              <UniversalButton
                id="openinwhatsapp"
                name="openinwhatsapp"
                label="share"
                icon={<FaShareAlt />}
                disabled={!isQrGenerated}
                onClick={() => window.open(qrLink, "_blank")}
              />
            </div>

            {/* <div className="text-nowrap">
              <UniversalInstaButton
                label="Share"
                icon={<FaShareAlt />}
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(qrLink)}`,
                    "_blank"
                  )
                }
              />
            </div> */}
          </div>
          {/* </div> */}

          {/* <UniversalButton
          id="copytoclipboard"
          name="copytoclipboard"
          label="Copy to Clipboard"
          disabled={!phone}
          icon={<FaCopy />}
          onClick={copyToClipboard}
          />
          <UniversalButton
            id="openinwhatsapp"
            name="openinwhatsapp"
            label="Open in WhatsApp"
            disabled={!phone}
            onClick={() => window.open(qrLink, "_blank")}
          /> */}
        </div>
      </div>
    </>
  );
};

export default WhatsappQrCode;
