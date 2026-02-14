
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaFacebookF,
} from "react-icons/fa";

import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { Dialog } from "primereact/dialog";
import { MdOutlineDeleteForever } from "react-icons/md";
import { ImInfo } from "react-icons/im";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import toast from "react-hot-toast";
import DropdownMenuPortal from "../../utils/DropdownMenuPortal.jsx";
import UniversalButton from "../components/UniversalButton";
import UniversalLabel from "../components/UniversalLabel";
import InputField from "../../components/layout/InputField";
// import AnimatedDropdown from '../components/AnimatedDropdown';
import CustomTooltip from "../components/CustomTooltip";
import AnimatedDropdown from "../components/AnimatedDropdown";
import {
  getWabaList,
  getwabadetails,
  updateWabaDetails,
  refreshWhatsApp,
  uploadImageFile,
} from "../../apis/whatsapp/whatsapp";
import Loader from "../components/Loader";

import logo from "../../assets/images/celitix-cpaas-solution-logo.svg";
import dummyimg from "../../assets/images/uploadimage.png";
import { Position } from "@xyflow/react";
import InfoPopover from "@/components/common/InfoPopover.jsx";
import moment from "moment";
import Lottie from "lottie-react";
import verified from "../../assets/animation/verified.json";
// import metaAiAnimation from "..//assets/animation/metaai.json";

import {
  MapPin,
  Mail,
  AlignJustify,
  Info,
  Building2,
  Boxes,
  Globe,
  BadgeCheck,
  PhoneCall,
  BarChart3,
  ExternalLink,
  CircleCheckBig,
  TriangleAlert,
  CircleX,
  CircleHelp,
  PlugIcon,
} from "lucide-react";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import { SiPagespeedinsights } from "react-icons/si";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";

import DropdownWithSearch from "../components/DropdownWithSearch.jsx";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const MIN_DIMENSION = 192; // Minimum 192px width/height
const RECOMMENDED_DIMENSION = 640; // Recommended 640px width/height

const verticalLabelMap = {
  PROF_SERVICES: "Professional Services",
  AUTO: "Automotive",
  BEAUTY: "Beauty & Wellness",
  APPAREL: "Apparel & Fashion",
  EDU: "Education",
  ENTERTAIN: "Entertainment",
  EVENT_PLAN: "Event Planning",
  FINANCE: "Financial Services",
  GROCERY: "Grocery",
  GOVT: "Government",
  HOTEL: "Hospitality",
  HEALTH: "Healthcare",
  NONPROFIT: "Nonprofit",
  RETAIL: "Retail",
  TRAVEL: "Travel & Tourism",
  RESTAURANT: "Restaurant",
  NOT_A_BIZ: "Not a Business",
  OTHER: "Other",
  UNDEFINED: "Undefined",
};

const WabaDetails = ({
  item,
  allWabaDetails,
  handlers,
  activeWaba,
  loadingRow,
  hoverStatus,
  setHoverStatus,
  qualityMap,
  qualityMessages,
  hoverQuality,
  setHoverQuality,
  statusMessages,
}) => {
  const { handleSync, handleEdit, setSelectedItem, setInfo } = handlers;

  const statusKey = item.wabaStatus?.toUpperCase() || "UNKNOWN";
  const statusData = statusMessages[statusKey] || statusMessages.UNKNOWN;

  return (
    <div className="flex flex-col gap-6 w-full transition-all duration-300">
      {activeWaba && (
        <div className="flex flex-col gap-6 w-full h-full  transition-all duration-300 backdrop-blur-md ">
          <div className="flex flex-col gap-4 h-full p-4 bg-white rounded-2xl  w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6">
              <div className="flex flex-col sm:flex-row items-center  sm:items-center gap-1 md:gap-3 flex-wrap">
                <img
                  src={item?.profile_picture_url || dummyimg}
                  alt="profile"
                  className="w-18 h-18 rounded-full shadow-md border-2 border-indigo-300 object-cover"
                />
                <div className="flex flex-col items-center  md:items-start ">
                  <div className="flex justify-center  items-center gap-1">
                    <h2 className="text-2xl font-semibold text-[#075E54]">
                      {item.name}
                    </h2>
                    <div className="flex justify-center text-center ">
                      {item.businessVerificationStatus === "verified" ? (
                        <Lottie
                          animationData={verified}
                          loop
                          autoplay
                          style={{ width: 26, height: 26 }}
                        />
                      ) : (
                        <span className="text-xs text-[#075e54]">
                          {item.businessVerificationStatus || "-"}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-500">
                    {allWabaDetails[item.wabaNumber]?.about || "-"}
                  </span>
                </div>
              </div>

              <div className="flex md:flex-nowrap flex-wrap gap-4 w-max  items-start">
                <div className="flex gap-2 items-start  ">
                  <button
                    onClick={() => handleSync(item)}
                    className="flex items-center justify-center w-10 h-10 p-2 rounded-xl bg-green-50 text-[#128c7e] hover:bg-green-100 transition-all border border-green-200 hover:border-green-300"
                  >
                    {loadingRow === item.wabaSrno ? (
                      <CircularProgress size={16} />
                    ) : (
                      <SyncOutlinedIcon size={16} />
                    )}
                  </button>

                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center justify-center w-10 h-10 p-2 rounded-xl bg-green-50 text-[#128c7e] hover:bg-green-100 transition-all border border-green-200 hover:border-green-300"
                  >
                    <EditNoteIcon size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setInfo(true);
                    }}
                    className="flex items-center justify-center w-10 h-10 p-3 rounded-xl bg-green-50 text-[#128c7e] hover:bg-green-100 transition-all border border-green-200 hover:border-green-300"
                  >
                    <ImInfo size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-center  md:justify-between gap-4  text-sm">
                <div className="flex text-center md:text-start gap-2 ">
                  <span className="text-[#075e54] font-medium text-base">
                    {" "}
                    {allWabaDetails[item.wabaNumber]?.description || "-"}{" "}
                  </span>
                </div>

                <div className="flex  md:flex-col lg:flex-row gap-2 ">
                  <div
                    className={`relative flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm cursor-pointer ${statusData.bg} ${statusData.textColor} ${statusData.border}`}
                    onMouseEnter={() => setHoverStatus(statusKey)}
                    onMouseLeave={() => setHoverStatus(null)}
                  >
                    <PhoneCall size={16} />
                    <span>{statusData.title}</span>

                    {hoverStatus === statusKey && (
                      <div className="absolute top-9 right-0 z-50 w-64 p-3 rounded-xl shadow-xl bg-white border border-gray-200 animate-fadeIn">
                        <p className="text-sm font-semibold text-gray-900">
                          {statusData.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {statusData.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className="relative group flex flex-col gap-1"
                    onMouseEnter={() => setHoverQuality(item.quality)}
                    onMouseLeave={() => setHoverQuality(null)}
                  >
                    {(() => {
                      const quality = item.quality || "UNKNOWN";
                      const qData = qualityMap[quality] || qualityMap.UNKNOWN;
                      const qContent =
                        qualityMessages[quality] || qualityMessages.UNKNOWN;

                      return (
                        <>
                          <span
                            className={`flex gap-1 px-3 py-1 rounded-full text-sm font-semibold shadow-sm border cursor-pointer text-center ${qData.bg} ${qData.text} ${qData.border}`}
                          >
                            <span className="text-black font-medium ">
                              Quality:
                            </span>
                            {qData.label}
                          </span>

                          {hoverQuality === quality && (
                            <div className="absolute top-9 right-0 z-50 w-64 p-3 rounded-xl shadow-xl bg-white border border-gray-200 animate-fadeIn">
                              <p className="text-sm font-semibold text-gray-900">
                                {qContent.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {qContent.description}
                              </p>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 2xl:grid-cols-12 gap-4 2xl:divide-x">
                <div className="flex flex-col gap-4 col-span-1 2xl:col-span-8  2xl:p-2">
                  <div className="flex flex-col gap-2  ">
                    <div className="">
                      <span className="text-[#075e54] font-semibold text-lg ">
                        {" "}
                        Contact Details:{" "}
                      </span>
                    </div>
                    <div className="grid grid-cols-1  md:grid-cols-2 md:divide-x  gap-2 md:gap-5 text-sm">
                      <div className="flex flex-col gap-2  p-0.5  ">
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                            <PhoneCall size={14} />
                          </div>
                          <span className="text-gray-900 uppercase font-semibold ">
                            WABA No.:
                          </span>
                          <a
                            href={`tel:${item.wabaNumber}`}
                            className="text-[#128c7e] font-medium hover:text-[#25d366] hover:underline break-all transition"
                          >
                            {item.wabaNumber}
                          </a>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                            <MapPin size={16} />
                          </div>
                          <span className="text-gray-900 uppercase font-semibold ">
                            ADDRESS:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {allWabaDetails[item.wabaNumber]?.address ||
                              "-"}{" "}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2  p-0.5 ">
                        <div className="flex items-center gap-2 text-nowrap">
                          <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                            <Mail size={16} />
                          </div>
                          <span className="text-gray-900 uppercase font-semibold ">
                            EMAIL ADDRESS:{" "}
                          </span>
                          <a
                            href={`mailto:${allWabaDetails[item.wabaNumber]?.email
                              }`}
                            className="text-[#128c7e] font-medium hover:text-[#25d366] hover:underline break-all transition"
                          >
                            {allWabaDetails[item.wabaNumber]?.email || "-"}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                            <Building2 size={16} />
                          </div>
                          <span className="text-gray-900 uppercase font-semibold ">
                            VERTICAL:
                          </span>
                          <span className="text-gray-700">
                            {verticalLabelMap[
                              allWabaDetails[item.wabaNumber]?.vertical
                            ] || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <div className="">
                      <span className="text-[#075e54] font-semibold text-lg ">
                        {" "}
                        Business Details:{" "}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x  gap-2 md:gap-5 text-sm">
                      <div className="flex flex-col gap-2 p-0.5 ">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                            <StoreOutlinedIcon sx={{ fontSize: 18 }} />
                          </div>
                          <span className="text-gray-900 uppercase font-semibold ">
                            Business Name:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {item.businessName}{" "}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                            <WhatsAppIcon sx={{ fontSize: 18 }} />
                          </div>
                          <span className="text-gray-900 uppercase font-semibold ">
                            WABA Name:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {item.wabaName}{" "}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                            <FactCheckOutlinedIcon sx={{ fontSize: 18 }} />
                          </div>
                          <span className="text-gray-900 uppercase font-semibold ">
                            Business Status:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {item.businessStatus}{" "}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 p-0.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                            <CorporateFareOutlinedIcon sx={{ fontSize: 18 }} />
                          </div>
                          <span className="text-gray-900 uppercase font-semibold ">
                            Business ID:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {/* {item.wabaAccountId} */}
                            {item.businessId}
                          </span>
                        </div>
                        <div className="flex items-center text-sm gap-2">
                          <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                            <ContactPhoneOutlinedIcon sx={{ fontSize: 18 }} />
                          </div>
                          <span className="text-gray-900 font-semibold ">
                            Phone Number ID:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {item.phoneNumberId}
                          </span>
                        </div>

                        <div className="flex items-center text-sm gap-2">
                          <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                            <AccountCircleOutlinedIcon sx={{ fontSize: 18 }} />
                          </div>
                          <span className="text-gray-900 font-semibold ">
                            WABA Account ID:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {item.wabaAccountId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 col-span-1 2xl:col-span-4 2xl:p-2 ">
                  <div className="">
                    <span className="text-[#075e54] font-semibold text-lg ">
                      {" "}
                      Account Details:{" "}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-1 md:divide-x 2xl:divide-x-0 gap-2 md:gap-5 2xl:gap-2 text-sm">
                    <div className="flex flex-col gap-2 p-0.5">
                      <div className="flex items-center text-sm gap-2">
                        <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                          <EventAvailableOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <span className="text-gray-900 uppercase font-semibold ">
                          Created:
                        </span>
                        <span className="text-gray-700"> {item.createdOn}</span>
                      </div>

                      <div className="flex items-center text-sm gap-2">
                        <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                          <EventBusyOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <span className="text-gray-900 uppercase font-semibold ">
                          Expiry:
                        </span>
                        <span className="text-gray-700">
                          {" "}
                          {item.expiryDate}
                        </span>
                      </div>

                      <div className="flex items-center text-sm gap-2">
                        <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                          <CurrencyRupeeOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <span className="text-gray-900 uppercase font-semibold ">
                          Currency:
                        </span>
                        <span className="text-gray-700"> {item.currency}</span>
                      </div>

                      <div className="flex items-center text-sm gap-2">
                        <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                          <Boxes size={18} />
                        </div>
                        <span className="text-gray-900 uppercase font-semibold ">
                          PRODUCT:
                        </span>
                        <span className="text-gray-700">
                          {" "}
                          {allWabaDetails[item.wabaNumber]?.messaging_product ||
                            "-"}{" "}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 p-0.5">
                      <div className="flex items-center text-sm gap-2">
                        <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                          <ForumOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <span className="text-gray-900 uppercase font-semibold ">
                          Message Limit:
                        </span>
                        <span className="text-gray-700">
                          {" "}
                          {item.messagingLimits}
                        </span>
                      </div>
                      <div className="flex items-center text-sm gap-2">
                        <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                          <CloudSyncOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <span className="text-gray-900 font-semibold ">
                          MM Lite Eligibility:
                        </span>
                        <span className="text-gray-700"> {item.apiStatus}</span>
                      </div>

                      <div className="flex items-center text-sm gap-2">
                        <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                          <InsightsOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <span className="text-gray-900 font-semibold ">
                          Insights:
                        </span>
                        <span className="text-gray-700">
                          {" "}
                          {item.isEnabledForInsights === true
                            ? "Eligible"
                            : "Not Eligible"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full p-4 bg-white rounded-2xl  w-full">
            <div className=" space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#075e54] font-semibold text-lg ">
                  Websites Links :
                </span>
              </div>

              <div className="">
                {allWabaDetails[item.wabaNumber]?.websites?.length ? (
                  <ul className="space-y-1">
                    {allWabaDetails[item.wabaNumber]?.websites.map(
                      (site, idx) => (
                        <li key={idx} className="flex items-center gap-2 group">
                          <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                            <Globe size={16} />
                          </div>
                          <div className="flex items-center gap-2">
                            <ExternalLink
                              size={14}
                              className="hidden lg:flex text-[#128c7e] opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <a
                              href={site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#128c7e] font-medium hover:text-[#25d366] hover:underline break-all transition"
                            >
                              {site}
                            </a>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NewWabaUI = ({ id, name }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [wabaedit, setWabaEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [vertical, setVertical] = useState("");
  const [websites, setWebsites] = useState([""]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [wabaList, setWabaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [wabaCreatebtn, setWabaCreatebtn] = useState(false);
  const [wabaCreateMMbtn, setWabaCreateMMbtn] = useState(false);
  const [clicked, setClicked] = useState([]);
  const [wabadetails, setwabadetails] = useState(null);
  const [editWebsite1, seteditWebsite1] = useState("");
  const [editWebsite2, seteditWebsite2] = useState("");
  const dropdownButtonRefs = useRef({});
  const [loadingRow, setLoadingRow] = useState(null);
  const [activeWaba, setActiveWaba] = useState(null);

  const [info, setInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allWabaDetails, setAllWabaDetails] = useState({});

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [hoveredQuality, setHoveredQuality] = useState(null);

  const [hoverStatus, setHoverStatus] = useState(null);
  const [hoverQuality, setHoverQuality] = useState(null);
  const fileInputRef = useRef(null);
  const [fbData, setFbData] = useState({ waba_id: null, phone_number_id: null, accessToken: null, event: null });



  //  For Quality Messages
  const getQualityStatusUI = (key) => {
    switch (key) {
      case "GREEN":
        return {
          icon: <CircleCheckBig className="w-5 h-5 text-green-600" />,
          badge: (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
              High
            </span>
          ),
        };
      case "YELLOW":
        return {
          icon: <TriangleAlert className="w-5 h-5 text-amber-500" />,
          badge: (
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">
              Medium
            </span>
          ),
        };
      case "RED":
        return {
          icon: <CircleX className="w-5 h-5 text-red-600" />,
          badge: (
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">
              Low
            </span>
          ),
        };
      default:
        return {
          icon: <CircleHelp className="w-5 h-5 text-gray-500" />,
          badge: (
            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
              Unknown
            </span>
          ),
        };
    }
  };

  // For Phone Status Messages
  const getPhoneStatusUI = (key) => {
    switch (key) {
      case "CONNECTED":
        return {
          icon: <CircleCheckBig className="w-5 h-5 text-green-600" />,
          badge: (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
              Connected
            </span>
          ),
        };
      case "RESTRICTED":
        return {
          icon: <TriangleAlert className="w-5 h-5 text-amber-500" />,
          badge: (
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">
              Restricted
            </span>
          ),
        };
      case "FLAGGED":
        return {
          icon: <TriangleAlert className="w-5 h-5 text-orange-500" />,
          badge: (
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs">
              Flagged
            </span>
          ),
        };
      case "BANNED":
        return {
          icon: <CircleX className="w-5 h-5 text-red-600" />,
          badge: (
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">
              Banned
            </span>
          ),
        };
      case "DISCONNECTED":
        return {
          icon: <PlugIcon className="w-5 h-5 text-gray-600" />,
          badge: (
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              Disconnected
            </span>
          ),
        };
      default:
        return {
          icon: <CircleHelp className="w-5 h-5 text-gray-500" />,
          badge: (
            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
              Unknown
            </span>
          ),
        };
    }
  };

  const statusMessages = {
    CONNECTED: {
      title: "Connected",
      description:
        "A phone number is associated with this account and is working properly.",
      bg: "bg-[#DCF4E3]",
      textColor: "text-[#075E54]",
      border: "border border-[#87E0B3]",
    },
    RESTRICTED: {
      title: "Restricted",
      description:
        "This phone number has reached its 24-hour messaging limit and can no longer send messages to customers. Please wait until the messaging limit resets.",
      bg: "bg-red-100",
      textColor: "text-red-700",
      border: "border border-red-300",
    },
    FLAGGED: {
      title: "Flagged",
      description:
        "This number has been flagged. Review the quality rating or check the account health.",
      bg: "bg-orange-100",
      textColor: "text-orange-700",
      border: "border border-orange-300",
    },
    BANNED: {
      title: "Banned",
      description:
        "This number has been banned. Contact support for resolution.",
      bg: "bg-red-200",
      textColor: "text-red-800",
      border: "border border-red-400",
    },
    DISCONNECTED: {
      title: "Disconnected",
      description:
        "This account has been disconnected. Contact support for resolution.",
      bg: "bg-gray-200",
      textColor: "text-gray-800",
      border: "border border-gray-400",
    },
    MIGRATED: {
      title: "MIGRATED",
      description:
        "This account has been MIGRATED. Contact support for resolution.",
      bg: "bg-blue-100",
      textColor: "text-blue-700",
      border: "border border-blue-300",
    },
    UNKNOWN: {
      title: "Unknown",
      description: "The status of this number is unknown or not reported.",
      bg: "bg-gray-300",
      textColor: "text-gray-700",
      border: "border border-gray-400",
    },
  };

  const qualityMessages = {
    GREEN: {
      title: "High Quality",
      description:
        "This account's quality rating is High. Messages are rarely flagged and deliverability is optimal.",
    },
    YELLOW: {
      title: "Medium Quality",
      description:
        "This phone number is at risk of being banned. See our guidelines about how best to send messages to your customers.",
    },
    RED: {
      title: "Low Quality",
      description:
        "This account's quality rating is Low. High risk of message failures or blocks—investigate account health immediately.",
    },
    UNKNOWN: {
      title: "Unknown Quality",
      description: "The quality rating for this account is not available.",
    },
  };

  const qualityMap = {
    GREEN: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
      label: "High",
    },
    YELLOW: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-300",
      label: "Medium",
    },
    RED: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300",
      label: "Low",
    },
    UNKNOWN: {
      bg: "bg-gray-200",
      text: "text-gray-700",
      border: "border-gray-300",
      label: "Unknown",
    },
  };

  // Function to check image dimensions
  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectURL = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
          toast.error(
            `Image too small. Minimum size required: ${MIN_DIMENSION}px x ${MIN_DIMENSION}px.`,
          );
          resolve(false);
        } else {
          resolve(true);
        }
        URL.revokeObjectURL(objectURL);
      };

      img.onerror = () => {
        toast.error("Invalid image file.");
        resolve(false);
        URL.revokeObjectURL(objectURL);
      };

      img.src = objectURL;
    });
  };

  // Function to handle file selection and preview
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error(
        "File size exceeds 5MB limit. Please upload a smaller image.",
      );
      return;
    }

    const isValidDimensions = await validateImageDimensions(selectedFile);
    if (!isValidDimensions) return;

    if (preview) URL.revokeObjectURL(preview);

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
    const res = await uploadImageFile(selectedFile, 1);
    setFile(res?.handlerid || null);
    toast.success("Image uploaded successfully.");
  };

  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "819027950096451",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v20.0",
        });
      };

      // Load the SDK script
      if (!document.getElementById("facebook-jssdk")) {
        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        // script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
      }
    };
    loadFacebookSDK();
  }, []);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // const API_BASE_URL = "/api";

  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "819027950096451",
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v24.0',
        });
      };

      // Load the SDK script
      if (!document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        // script.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
      }
      const messageHandler = (event) => {

        if (!event.origin.endsWith('facebook.com')) return;
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'WA_EMBEDDED_SIGNUP') {
            // console.log('message event: ', data);
            // if (data.event === 'FINISH') {
            if (data.event === 'FINISH' || data.event === 'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING') {
              const { phone_number_id, waba_id } = data.data;
              const event = data.event;
              setFbData((prev) => ({ ...prev, waba_id, phone_number_id, event }));
              // handleFacebookBusinessAppOnboarding(waba_id, phone_number_id);
              // console.log("Phone number ID:", phone_number_id, "WABA ID:", waba_id, "EVent:", event);
            } else if (data.event === 'CANCEL') {
              const { current_step } = data.data;
              console.warn("User cancelled at:", current_step);
            } else if (data.event === 'ERROR') {
              const { error_message } = data.data;
              console.error("Signup error:", error_message);
            }
          }
        } catch {
          // console.log('message event: ', event.data);
        }
      };

      window.addEventListener('message', messageHandler);

      return () => {
        window.removeEventListener('message', messageHandler);
      };
    };
    loadFacebookSDK();
  }, []);

  // When pass data in body
  async function onboardUserNewUser(accessToken, wabaId, phoneNumberId, event) {

    // console.log("onboardUserNewUser>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", wabaId, phoneNumberId);
    const bodyData = {
      code: accessToken,
      wabaId: wabaId,
      phoneId: phoneNumberId,
      vendor: "smartping",
      dataEvent: event
    };

    // console.log("Sending Payload:", bodyData);

    const res = await fetch(`${API_BASE_URL}/whatsapp/whatsappOnboardProcess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyData)
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message || "Onboarding successful");
      getWabaList();
    } else {
      toast.error("Onboarding Failed!");
      getWabaList();
    }
  }
  useEffect(() => {
    // console.log("<<<<<<<fbData>>>>>>>", fbData)
    if (!fbData?.accessToken) return;
    onboardUserNewUser(fbData?.accessToken, fbData?.waba_id, fbData?.phone_number_id, fbData?.event)
  }, [fbData])

  // code - 30 jan - 2026 - panel  v2.1 live
  const handleFacebookBusinessAppOnboarding = async () => {
    if (!window.FB) {
      toast.error("Facebook SDK not loaded");
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.code;

          if (!accessToken) {
            // console.log("<<<<<<<<<<error>>>>>>>>>>>>>></error>")
          }

          setFbData((prev) => ({
            ...prev,
            accessToken
          }))
          // console.log('Access Token:', accessToken);
          // onboardUser(accessToken);
          // onboardUserNewUser(accessToken, finalWabaId, finalPhoneId);
          // await onboardUserNewUser(accessToken, wabaId, phoneId);

          // getWabaList();
          // setFbData({ waba_id: null, phone_number_id: null });
        } else {
          toast.error("User cancelled login");
          setTimeout(() => {
            setWabaCreateMMbtn(false);
          }, 1500);
        }
      },
      {
        config_id: '4382163352067488',
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {
            "solutionID": "1544803499906564",
          },
          version: "v4",
          sessionInfoVersion: "3",
          featureType: "whatsapp_business_app_onboarding",
          // featureType: "coexistence",
          features: [
            // { name: "coexistence" },
            // { name: "marketing_messages_lite" },
            // { name: "app_only_install" },
            // { name: "whatsapp_embedded_signup" }
          ]
        }
      }
    );
  };



  const handleSelectFile = () => {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    fileInputRef.current.value = "";
    toast.success("Image removed successfully.");
  };


  const handleEdit = async (row) => {
    setWabaEdit(true);
    setSelectedWaba(row);
    const details = await getwabadetails(row.wabaNumber);
    const wabaDetails = details.data[0];
    // UPDATE ACTIVE ROW DATA
    setActiveWaba((prev) => ({ ...prev, ...wabaDetails }));

    // ALSO UPDATE LIST
    setWabaList((prev) =>
      prev.map((w) =>
        w.wabaNumber === row.wabaNumber ? { ...w, ...wabaDetails } : w,
      ),
    );

    setAbout(wabaDetails.about);
    setDescription(wabaDetails.description);
    setAddress(wabaDetails.address);
    setEmail(wabaDetails.email);
    setVertical(wabaDetails.vertical);
    seteditWebsite1(wabaDetails.websites[0] || "");
    seteditWebsite2(wabaDetails.websites[1] || "");
    setPreview(wabaDetails.profile_picture_url || null);
  };

  const handleWabaCreate = (e) => {
    setWabaCreatebtn(true);
  };

  const handleWabaMMCreate = (e) => {
    setWabaCreateMMbtn(true);
  };

  const handleSync = async (data) => {
    const id = data?.wabaSrno;
    setLoadingRow(id);

    try {
      await toast.promise(
        (async () => {
          const res = await refreshWhatsApp(id);

          if (!res || !res.status) {
            throw new Error("Error refreshing data");
          }

          await fetchWabaList();
          return "Refreshed Successfully";
        })(),
        {
          loading: "Syncing WABA Details...",
          success: (msg) => msg,
          error: (err) => err?.message || "Error Refreshing Data",
        },
      );
    } catch (error) {
      console.error("Sync error:", error);
      toast.error(error?.message || "Something went wrong while syncing.");
    } finally {
      setLoadingRow(null);
    }
  };

  const handleRowSelection = (ids) => {
    setSelectedRows(ids);
  };

  const handleInfo = (row) => {
    const id = row.id;
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
    setClicked(row.additionalInfo || []);
  };

  const closeDropdown = () => setDropdownOpenId(null);
  const updateDetails = async () => {
    try {
      const data = {
        messaging_product: "whatsapp",
        about: about || "",
        description: description || "",
        email: email || "",
        address: address || "",
        vertical: vertical || "",
        profile_picture_handle: file, // until media upload flow added
        websites: [editWebsite1, editWebsite2].filter(Boolean),
      };

      console.log("SENDING:", data);

      const res = await updateWabaDetails(data, selectedWaba.wabaNumber);
      if (res.statusCode === 200) {
        toast.success("Updated successfully");
        setWabaEdit(false);
        fetchWabaList();
      } else {
        toast.error("Somthing Went Wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const fetchWabaList = async () => {
    setIsLoading(true);
    try {
      const response = await getWabaList();

      if (!response || response.length === 0) {
        setWabaList([]);
        return;
      }

      const enrichedList = await Promise.all(
        response.map(async (waba) => {
          try {
            const number = waba.wabaNumber || waba.mobileNo;

            const res = await getwabadetails(number);
            const details = res?.data?.[0] || {};

            return {
              ...waba,
              ...details,
              rawDetails: details,
            };
          } catch (err) {
            console.error("Error fetching details for:", waba.wabaNumber, err);
            return {
              ...waba,
              rawDetails: null,
            };
          }
        }),
      );

      setWabaList(enrichedList);
    } catch (error) {
      console.error("Error fetching WABA list:", error);
      toast.error("Error fetching WABA list.");
      setWabaList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWabaList();
  }, []);

  // Map API Data to DataGrid Rows
  const rows = useMemo(() => {
    return wabaList.map((waba, index) => ({
      id: index + 1,
      sn: index + 1,
      name: waba.name || "N/A",
      wabaNumber: waba.mobileNo || "N/A",
      businessVerificationStatus: waba.businessVerificationStatus || "N/A",
      createdOn: moment(waba.insertTime).format("YYYY-MM-DD") || "N/A",
      status: waba.wabaStatus || "N/A",
      wabaAccountId: waba.wabaAccountId || "N/A",
      phoneNumberId: waba.phoneNumberId || "N/A",
      quality: waba.qualityRate || "N/A",
      expiryDate: moment(waba.expiryDate).format("YYYY-MM-DD") || "N/A",

      additionalInfo: {
        messagingLimit: waba.messagingLimits || "N/A",
        businessStatus: waba.businessStatus || "N/A",
        wabaAccountId: waba.wabaAccountId || "N/A",
        wabaName: waba.wabaName || "N/A",
        phoneNumberId: waba.phoneNumberId || "N/A",
        businessName: waba.businessName || "N/A",
        businessId: waba.businessId || "N/A",
        MM_Lite_Eligibility: waba.apiStatus || "N/A",
        isEnabledForInsights: waba.isEnabledForInsights || "N/A",
      },

      ...waba,
    }));
  }, [wabaList]);

  // const rows = [
  //   {
  //     id: 1,
  //     sn: "001",
  //     name: "Proactive",
  //     wabaNumber: "919251006460",
  //     businessVerificationStatus: "verified",
  //     createdOn: "2025-05-14",
  //     status: "CONNECTED",
  //     wabaAccountId: "WABA_1001",
  //     phoneNumberId: "PN_2001",
  //     quality: "GREEN",
  //     expiryDate: "2026-01-31",
  //     additionalInfo: {
  //       messagingLimit: "1000",
  //       businessStatus: "Approved",
  //       wabaAccountId: "WABA_1001",
  //       wabaName: "Proactive_WABA",
  //       phoneNumberId: "PN_2001",
  //       businessName: "Proactive Pvt Ltd",
  //       businessId: "BIZ_5001",
  //       MM_Lite_Eligibility: "Eligible",
  //       isEnabledForInsights: true,
  //     },
  //   },
  //   {
  //     id: 2,
  //     sn: "002",
  //     name: "Celitix",
  //     wabaNumber: "4531876516461",
  //     businessVerificationStatus: "verified",
  //     createdOn: "2025-05-14",
  //     status: "CONNECTED",
  //     wabaAccountId: "WABA_1002",
  //     phoneNumberId: "PN_2002",
  //     quality: "YELLOW",
  //     expiryDate: "2026-01-31",
  //     additionalInfo: {
  //       messagingLimit: "150",
  //       businessStatus: "Approved",
  //       wabaAccountId: "WABA_1002",
  //       wabaName: "Celitix_WABA",
  //       phoneNumberId: "PN_2002",
  //       businessName: "Celitix Pvt Ltd",
  //       businessId: "BIZ_5002",
  //       MM_Lite_Eligibility: "Eligible",
  //       isEnabledForInsights: true,
  //     },
  //   },
  //   {
  //     id: 3,
  //     sn: "003",
  //     name: "QuickMart",
  //     wabaNumber: "919251006462",
  //     businessVerificationStatus: "verified",
  //     createdOn: "2025-05-14",
  //     status: "CONNECTED",
  //     wabaAccountId: "WABA_1003",
  //     phoneNumberId: "PN_2003",
  //     quality: "RED",
  //     expiryDate: "2026-01-31",
  //     additionalInfo: {
  //       messagingLimit: "200",
  //       businessStatus: "Approved",
  //       wabaAccountId: "WABA_1003",
  //       wabaName: "QuickMart_WABA",
  //       phoneNumberId: "PN_2003",
  //       businessName: "QuickMart Pvt Ltd",
  //       businessId: "BIZ_5003",
  //       MM_Lite_Eligibility: "Eligible",
  //       isEnabledForInsights: true,
  //     },
  //   },
  // ];


  useEffect(() => {
    if (rows.length > 0 && !activeWaba) {
      setActiveWaba(rows[0]);
    }
  }, [rows, activeWaba]);

  const additionalInfoLabels = {
    businessStatus: "Business Status",
    messagingLimit: "Messaging Limit",
    wabaAccountId: "WABA Account ID",
    wabaName: "WABA Name",
    phoneNumberId: "Phone Number ID",
    businessName: "Business Name",
    businessId: "Business ID",
    MM_Lite_Eligibility: "MM Lite Eligibility",
    isEnabledForInsights: "Insights",
  };

  const website =
    wabadetails?.websites?.length > 0
      ? wabadetails.websites[0].replace("https://www.", "").replace(/\/$/, "")
      : "";
  const phoneNumber = selectedWaba?.wabaNumber || "";
  const whatsappLinkPreview = `wa.me/${phoneNumber}`;

  const FloatingIcons = () => {
    const icons = Array.from({ length: 15 });
    return (
      <div className="absolute inset-0 overflow-hidden pointerevents-none z-0">
        {icons.map((_, idx) => {
          const left = Math.floor(Math.random() * window.innerWidth);
          return (
            <motion.div
              key={idx}
              className="absolute text-green-500 opacity-30"
              style={{ left: `${left}px`, bottom: -50 }}
              initial={{ y: 0, rotate: 0 }}
              animate={{
                y: -window.innerHeight - 100,
                rotate: 0,
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3,
              }}
            >
              <FaWhatsapp size={74 + Math.random() * 24} />
            </motion.div>
          );
        })}
      </div>
    );
  };



  useEffect(() => {
    const fetchAllDetails = async () => {
      if (!rows || rows.length === 0) return;

      const results = {};

      for (const waba of rows) {
        try {
          const details = await getwabadetails(waba.wabaNumber);
          results[waba.wabaNumber] = details.data[0] || {};
          // const firstItem = Array.isArray(details?.data) ? details.data[0] : {};
          // results[waba.wabaNumber] = firstItem || {};
        } catch (err) {
          console.error("Details fetch failed", err);
        }
      }

      setAllWabaDetails(results);
    };

    fetchAllDetails();
  }, [rows]);



  return (
    <div className="p-2">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : rows.length > 0 ? (
        <>
          <div className="w-full flex flex-col gap-6 justify-center">
            {/* Header */}
            <div className="flex flex-col md:flex-row  items-center justify-between bg-white  rounded-2xl px-4 py-4  w-full gap-4 ">
              <div>
                <label className="flex items-center gap-2 text-[22px] font-medium ">
                  <FaWhatsapp className="text-3xl  text-green-600 shrink-0 " />{" "}
                  Manage Waba Accounts
                </label>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-max-content">
                  <UniversalButton
                    label="Connect WABA"
                    id="handlefacebookbusinessapponboarding"
                    name="handlefacebookbusinessapponboarding"
                    onClick={() => handleFacebookBusinessAppOnboarding()}

                    style={{
                      backgroundColor: "rgba(209, 250, 223, 0.6)",

                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(34,197,94,0.4)",
                      color: "#075E54",
                      fontWeight: 600,
                      padding: "0.5rem 1.25rem",
                      borderRadius: "0.75rem",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>
              </div>
            </div>
            {rows.length === 1 ? (
              <div className="w-full flex flex-col gap-6 justify-center   ">
                {rows.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-6 w-full h-full  transition-all duration-300 backdrop-blur-md "
                  >
                    <div className="flex flex-col gap-4 h-full p-4 bg-white rounded-2xl  w-full">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6">
                        <div className="flex flex-col sm:flex-row items-center  sm:items-center gap-1 md:gap-3 flex-wrap">
                          <img
                            src={item?.profile_picture_url || dummyimg}
                            alt="profile"
                            className="w-18 h-18 rounded-full shadow-md border-2 border-indigo-300 object-cover"
                          />
                          <div className="flex flex-col items-center  md:items-start ">
                            <div className="flex justify-center  items-center gap-1">
                              <h2 className="text-2xl font-semibold text-[#075E54]">
                                {item.name}
                              </h2>
                              <div className="flex justify-center text-center ">
                                {item.businessVerificationStatus ===
                                  "verified" ? (
                                  <Lottie
                                    animationData={verified}
                                    loop
                                    autoplay
                                    style={{ width: 26, height: 26 }}
                                  />
                                ) : (
                                  <span className="text-xs text-[#075e54]">
                                    {item.businessVerificationStatus || "-"}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-gray-500">
                              {allWabaDetails[item.wabaNumber]?.about || "-"}
                            </span>
                          </div>
                        </div>

                        <div className="flex md:flex-nowrap flex-wrap gap-4 w-max  items-start">
                          <div className="flex gap-2 items-start ">
                            <button
                              onClick={() => handleSync(item)}
                              className="flex items-center justify-center w-10 h-10 p-2 rounded-xl bg-green-50 text-[#128c7e] hover:bg-green-100 transition-all border border-green-200 hover:border-green-300"
                            >
                              {loadingRow === item.wabaSrno ? (
                                <CircularProgress size={16} />
                              ) : (
                                <SyncOutlinedIcon size={16} />
                              )}
                            </button>

                            <button
                              onClick={() => handleEdit(item)}
                              className="flex items-center justify-center w-10 h-10  p-2 rounded-xl bg-green-50 text-[#128c7e] hover:bg-green-100 transition-all border border-green-200 hover:border-green-300"
                            >
                              <EditNoteIcon size={16} />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setInfo(true);
                              }}
                              className="flex items-center justify-center w-10 h-10  p-3 rounded-xl bg-green-50 text-[#128c7e] hover:bg-green-100 transition-all border border-green-200 hover:border-green-300"
                            >
                              <ImInfo size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row items-center md:items-center  md:justify-between gap-4  text-sm">
                          <div className="flex text-center md:text-start gap-2 ">
                            <span className="text-[#075e54] font-medium text-base">
                              {" "}
                              {allWabaDetails[item.wabaNumber]?.description ||
                                "-"}{" "}
                            </span>
                          </div>

                          <div className="flex  md:flex-col lg:flex-row gap-2 ">
                            <div
                              className={`relative group flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm cursor-pointer
                              ${item.status === "CONNECTED"
                                  ? "bg-[#DCF4E3] text-[#075E54] border border-[#87E0B3]"
                                  : item.status === "FLAGGED"
                                    ? "bg-orange-100 text-orange-700 border border-orange-300"
                                    : "bg-gray-300 text-gray-700"
                                }`}
                              onMouseEnter={() => setHoverStatus(item.status)}
                              onMouseLeave={() => setHoverStatus(null)}
                            >
                              <span className="text-black ">
                                <PhoneCall size={16} />
                              </span>
                              <span>{item.status}</span>

                              {hoverStatus && (
                                <div className="absolute top-9 right-0 z-50 w-64 p-3 rounded-xl shadow-xl bg-white border border-gray-200 animate-fadeIn">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {statusMessages[hoverStatus]?.title}
                                  </p>
                                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                    {statusMessages[hoverStatus]?.description}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div
                              className="relative group flex flex-col gap-1"
                              onMouseEnter={() => setHoverQuality(item.quality)}
                              onMouseLeave={() => setHoverQuality(null)}
                            >
                              {(() => {
                                const quality = item.quality || "UNKNOWN";
                                const qData =
                                  qualityMap[quality] || qualityMap.UNKNOWN;
                                const qContent =
                                  qualityMessages[quality] ||
                                  qualityMessages.UNKNOWN;

                                return (
                                  <>
                                    <span
                                      className={`flex gap-1 px-3 py-1 rounded-full text-sm font-semibold shadow-sm border cursor-pointer text-center
                                            ${qData.bg} ${qData.text} ${qData.border}`}
                                    >
                                      <span className="text-black font-medium ">
                                        Quality:
                                      </span>
                                      {qData.label}
                                    </span>

                                    {hoverQuality === quality && (
                                      <div
                                        className="absolute top-9 right-0 z-50 w-64 p-3 rounded-xl shadow-xl bg-white
                                          border border-gray-200 animate-fadeIn"
                                      >
                                        <p className="text-sm font-semibold text-gray-900">
                                          {qContent.title}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                          {qContent.description}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-0 xl:gap-4 xl:divide-x">
                          <div className="flex flex-col gap-4 col-span-1 xl:col-span-8  p-2">
                            <div className="flex flex-col gap-2 ">
                              <div className="">
                                <span className="text-[#075e54] font-semibold text-lg ">
                                  {" "}
                                  Contact Details:{" "}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x  gap-2 md:gap-5 text-sm">
                                <div className="flex flex-col gap-2  ">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                                      <PhoneCall size={14} />
                                    </div>
                                    <span className="text-gray-900 uppercase font-semibold ">
                                      WABA No.:
                                    </span>
                                    <a
                                      href={`tel:${item.wabaNumber}`}
                                      className="text-[#128c7e] font-medium hover:text-[#25d366] hover:underline break-all transition"
                                    >
                                      {item.wabaNumber}
                                    </a>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                                      <MapPin size={16} />
                                    </div>
                                    <span className="text-gray-900 uppercase font-semibold ">
                                      ADDRESS:
                                    </span>
                                    <span className="text-gray-700">
                                      {" "}
                                      {allWabaDetails[item.wabaNumber]
                                        ?.address || "-"}{" "}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-col  gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                                      <Mail size={16} />
                                    </div>
                                    <span className="text-gray-900 uppercase font-semibold ">
                                      EMAIL ADDRESS:{" "}
                                    </span>
                                    <a
                                      href={`mailto:${allWabaDetails[item.wabaNumber]?.email}`}
                                      className="text-[#128c7e] font-medium hover:text-[#25d366] hover:underline break-all transition"
                                    >
                                      {allWabaDetails[item.wabaNumber]?.email ||
                                        "-"}
                                    </a>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                                      <Building2 size={16} />
                                    </div>
                                    <span className="text-gray-900 uppercase font-semibold ">
                                      VERTICAL:
                                    </span>
                                    <span className="text-gray-700">
                                      {verticalLabelMap[
                                        allWabaDetails[item.wabaNumber]
                                          ?.vertical
                                      ] || "-"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 ">
                              <div className="">
                                <span className="text-[#075e54] font-semibold text-lg ">
                                  {" "}
                                  Business Details:{" "}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x  gap-2 md:gap-5 text-sm">
                                <div className="flex flex-col gap-2  ">
                                  <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                                      <StoreOutlinedIcon
                                        sx={{ fontSize: 18 }}
                                      />
                                    </div>
                                    <span className="text-gray-900 uppercase font-semibold ">
                                      Business Name:
                                    </span>
                                    <span className="text-gray-700">
                                      {" "}
                                      {item.businessName}{" "}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                                      <WhatsAppIcon sx={{ fontSize: 18 }} />
                                    </div>
                                    <span className="text-gray-900 uppercase font-semibold ">
                                      WABA Name:
                                    </span>
                                    <span className="text-gray-700">
                                      {" "}
                                      {item.wabaName}{" "}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                                      <FactCheckOutlinedIcon
                                        sx={{ fontSize: 18 }}
                                      />
                                    </div>
                                    <span className="text-gray-900 uppercase font-semibold ">
                                      Business Status:
                                    </span>
                                    <span className="text-gray-700">
                                      {" "}
                                      {item.businessStatus}{" "}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-col  gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                                      <CorporateFareOutlinedIcon
                                        sx={{ fontSize: 18 }}
                                      />
                                    </div>
                                    <span className="text-gray-900 uppercase font-semibold ">
                                      Business ID:
                                    </span>
                                    <span className="text-gray-700">
                                      {" "}
                                      {item.businessId}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm gap-2">
                                    <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                                      <ContactPhoneOutlinedIcon
                                        sx={{ fontSize: 18 }}
                                      />
                                    </div>
                                    <span className="text-gray-900 font-semibold ">
                                      Phone Number ID:
                                    </span>
                                    <span className="text-gray-700">
                                      {" "}
                                      {item.phoneNumberId}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm gap-2">
                                    <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                                      <AccountCircleOutlinedIcon
                                        sx={{ fontSize: 18 }}
                                      />
                                    </div>
                                    <span className="text-gray-900 font-semibold ">
                                      WABA Account ID:
                                    </span>
                                    <span className="text-gray-700">
                                      {" "}
                                      {item.wabaAccountId}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 col-span-1 xl:col-span-4 p-2">
                            <div className="">
                              <span className="text-[#075e54] font-semibold text-lg ">
                                {" "}
                                Account Details:{" "}
                              </span>
                            </div>

                            <div className="flex flex-col gap-2 lg:gap-2.5">
                              <div className="flex items-center text-sm gap-2">
                                <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                                  <EventAvailableOutlinedIcon
                                    sx={{ fontSize: 18 }}
                                  />
                                </div>
                                <span className="text-gray-900 uppercase font-semibold ">
                                  Created:
                                </span>
                                <span className="text-gray-700">
                                  {" "}
                                  {item.createdOn}
                                </span>
                              </div>

                              <div className="flex items-center text-sm gap-2">
                                <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                                  <EventBusyOutlinedIcon
                                    sx={{ fontSize: 18 }}
                                  />
                                </div>
                                <span className="text-gray-900 uppercase font-semibold ">
                                  Expiry:
                                </span>
                                <span className="text-gray-700">
                                  {" "}
                                  {item.expiryDate}
                                </span>
                              </div>

                              <div className="flex items-center text-sm gap-2">
                                <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                                  <ForumOutlinedIcon sx={{ fontSize: 18 }} />
                                </div>
                                <span className="text-gray-900 uppercase font-semibold ">
                                  Message Limit:
                                </span>
                                <span className="text-gray-700">
                                  {" "}
                                  {item.messagingLimits}
                                </span>
                              </div>
                              <div className="flex items-center text-sm gap-2">
                                <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                                  <CurrencyRupeeOutlinedIcon
                                    sx={{ fontSize: 18 }}
                                  />
                                </div>
                                <span className="text-gray-900 uppercase font-semibold ">
                                  Currency:
                                </span>
                                <span className="text-gray-700">
                                  {" "}
                                  {item.currency}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="p-1 rounded-lg bg-green-100 text-[#128c7e]">
                                  <Boxes size={18} />
                                </div>
                                <span className="text-gray-900 uppercase font-semibold ">
                                  PRODUCT:
                                </span>
                                <span className="text-gray-700">
                                  {" "}
                                  {allWabaDetails[item.wabaNumber]
                                    ?.messaging_product || "-"}{" "}
                                </span>
                              </div>

                              <div className="flex items-center text-sm gap-2">
                                <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                                  <CloudSyncOutlinedIcon
                                    sx={{ fontSize: 18 }}
                                  />
                                </div>
                                <span className="text-gray-900 font-semibold ">
                                  MM Lite Eligibility:
                                </span>
                                <span className="text-gray-700">
                                  {" "}
                                  {item.apiStatus}
                                </span>
                              </div>
                              <div className="flex items-center text-sm gap-2">
                                <div className="p-1 rounded-lg bg-green-100  text-[#128c7e]">
                                  <InsightsOutlinedIcon sx={{ fontSize: 18 }} />
                                </div>
                                <span className="text-gray-900 font-semibold ">
                                  Insights:
                                </span>
                                <span className="text-gray-700">
                                  {" "}
                                  {item.isEnabledForInsights === true
                                    ? "Eligible"
                                    : "Not Eligible"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 h-full p-4 bg-white rounded-2xl  w-full">
                      <div className=" space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[#075e54] font-semibold text-lg ">
                            Websites Links :
                          </span>
                        </div>

                        <div className="">
                          {allWabaDetails[item.wabaNumber]?.websites?.length ? (
                            <ul className="space-y-1">
                              {allWabaDetails[item.wabaNumber]?.websites.map(
                                (site, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center gap-2 group"
                                  >
                                    <div className="p-1.5 rounded-lg bg-green-100 text-[#128c7e]">
                                      <Globe size={16} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <ExternalLink
                                        size={14}
                                        className="hidden lg:flex text-[#128c7e] opacity-0 group-hover:opacity-100 transition-opacity"
                                      />
                                      <a
                                        href={site}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#128c7e] font-medium hover:text-[#25d366] hover:underline break-all transition"
                                      >
                                        {site}
                                      </a>
                                    </div>
                                  </li>
                                ),
                              )}
                            </ul>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-6 justify-center">
                <div className="flex flex-col lg:flex-row  gap-4">
                  <div className="bg-white p-3 rounded-lg w-full lg:w-72  ">
                    {/* Title */}
                    <div className="border-b p-1 mb-2">
                      <span className="text-lg font-medium">WABA Accounts</span>
                    </div>
                    <div className=" flex gap-2 flex-row lg:flex-col pb-2 md:pb-0 overflow-x-auto lg:overflow-visible whitespace-nowrap ">
                      {rows.map((item) => {
                        const isActive = activeWaba?.id === item.id;

                        return (
                          <button
                            key={item.id}
                            onClick={(e) => {
                              setActiveWaba(item);
                              e.currentTarget.scrollIntoView({
                                behavior: "smooth",
                                inline: "center",
                                block: "nearest",
                              });
                            }}
                            className="relative px-4 py-2 text-sm text-start rounded-lg min-w-max  hover:bg-gray-200"
                          >
                            {isActive && (
                              <motion.div
                                layoutId="active-waba-tab"
                                className="absolute inset-0 bg-green-100 rounded-lg"
                              />
                            )}

                            <span
                              className={`font-medium  relative z-10 ${isActive ? " text-[#075E54]" : "text-gray-700"
                                }`}
                            >
                              {item.additionalInfo.wabaName}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* RIGHT: DETAILS PANEL */}
                  <div className="flex w-full ">
                    {activeWaba && (
                      <WabaDetails
                        activeWaba={activeWaba}
                        item={activeWaba}
                        qualityMap={qualityMap}
                        qualityMessages={qualityMessages}
                        hoverStatus={hoverStatus}
                        setHoverStatus={setHoverStatus}
                        hoverQuality={hoverQuality}
                        setHoverQuality={setHoverQuality}
                        loadingRow={loadingRow}
                        allWabaDetails={allWabaDetails}
                        statusMessages={statusMessages}
                        handlers={{
                          handleSync,
                          handleEdit,
                          setSelectedItem,
                          setInfo,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        // Waba Account is not Created
        <div className="relative h-[91vh] w-full border-2 flex items-center justify-center rounded-4xl border-green-600 shadow-2xl bg-gradient-to-tr from-blue-50 to-green-50">
          <FloatingIcons />
          <div className="flex justify-center items-center z-50">
            <div className="bg-white w-170 px-6 py-10 md:px-10 space-y-6 text-center border-2 border-[#1877F2] rounded-2xl shadow-2xl bg-gradient-to-tr from-green-100 to-blue-50">
              <div className="space-y-2">
                <h2 className="text-4xl font-[500] playf mb-4 text-green-600">
                  Set Up Your WhatsApp Business Account
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Welcome! To get started with managing your business on
                  WhatsApp, you need to link your official WhatsApp Business
                  Account (WABA). This will allow you to securely communicate
                  with your customers and manage interactions effectively.
                  <br className="hidden md:block" />
                  Click the button below to securely link your account via
                  Facebook Business.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    "0 0 0px #1877F2",
                    "0 0 8px #1877F2",
                    "0 0 0px #1877F2",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                onClick={() => handleFacebookBusinessAppOnboarding()}
                className="bg-[#1877F2] hover:bg-[#166fe5]
                        transition-all px-6 py-3 rounded-xl text-white text-base fontmedium flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <span className="bg-blue-900 p-1.5 rounded-full">
                  <FaFacebookF size={20} />
                </span>
                Link with Facebook
              </motion.button>
              <p className="text-xs text-gray-400 mt-2">
                Rest assured, your privacy and security are our top priority. We
                do not store any of your credentials. This login is exclusively
                for linking your new WABA through Meta's official authorization
                process.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* INFO DIALOG */}
      <Dialog
        visible={info}
        onHide={() => setInfo(false)}
        className="w-[900px]  rounded-xl shadow-2xl bg-white"
        modal
        draggable={false}
      >
        <div className="flex flex-wrap gap-10">
          <div className="space-y-4 w-full">
            <h3 className="text-gray-800 font-semibold text-lg">
              Phone Status :
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {Object.entries(statusMessages).map(([key, value]) => {
                const { icon, badge } = getPhoneStatusUI(key);

                return (
                  <div
                    key={key}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col gap-3 min-h-[140px]"
                  >
                    <div className="flex  items-center gap-3">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25, type: "spring" }}
                      >
                        {icon}
                      </motion.div>
                      <p className="font-semibold text-gray-900 flex items-center gap-2 leading-tight break-words">
                        {value.title} {badge}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed break-words">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 w-full">
            <h3 className="text-gray-800 font-semibold text-lg">
              Quality Status :
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {Object.entries(qualityMessages).map(([key, value]) => {
                const { icon, badge } = getQualityStatusUI(key);

                return (
                  <div
                    key={key}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col gap-3 min-h-[140px]"
                  >
                    <div className="flex  items-center gap-3">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25, type: "spring" }}
                      >
                        {icon}
                      </motion.div>

                      <p className="font-semibold text-gray-900 flex items-center gap-2 leading-tight break-words">
                        {value.title} {badge}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed break-words">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Dialog>
      {/* INFO DIALOG */}

      {/* Update waba profile */}
      <Dialog
        header="Business Profile"
        visible={wabaedit}
        onHide={() => {
          setWabaEdit(false);
        }}
        draggable={false}
        className=" w-[20rem] md:w-[40rem] lg:w-[63rem] xl:w-[75rem] 2xl:w-[90rem] divide-y-2 "
        modal
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4   ">
          <div className="space-y-4 ">
            <div className="flex flex-col items-center lg:items-start">
              <UniversalLabel
                text="Profile Picture"
                tooltipContent="Max size of 5MB allowed. Image size of 640x640 is recommended. Images with a height or width of less than 192px may cause issues."
                tooltipPlacement="top"
                className="font-semibold tracking-wide text-gray-700"
                id="profilepicture"
                name="profilepicture"
              />

              <div className="flex items-center  space-x-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Company Logo"
                    className="object-cover w-20 h-20 p-1 shadow-md rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center w-20 h-20 p-1 bg-gray-200 shadow-md rounded-xl">
                    <span className="text-sm text-gray-500">No Image</span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <CustomTooltip title="Upload image" placement="top" arrow>
                    <button
                      onClick={handleSelectFile}
                      className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer`}
                    >
                      <FileUploadOutlinedIcon
                        sx={{ color: "white", fontSize: "23px" }}
                      />
                    </button>
                  </CustomTooltip>

                  {preview && (
                    <CustomTooltip title="remove image" placement="top" arrow>
                      <button
                        onClick={handleDeleteImage}
                        className="p-2 rounded-full cursor-pointer focus:outline-none hover:bg-gray-200"
                      >
                        <MdOutlineDeleteForever
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          size={20}
                        />
                      </button>
                    </CustomTooltip>
                  )}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div>
              <InputField
                label="About"
                id="about"
                name="about"
                tooltipContent="About Your Business. Maximum of 139 characters."
                tooltipPlacement="top"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full"
                placeholder="About Your Business"
                labelStyle={{ fontWeight: "bold" }}
                readOnly={false}
                maxLength="139"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-2">
              <div>
                <InputField
                  label="Description"
                  id="description"
                  name="description"
                  tooltipContent="Description of the business. Maximum of 256 characters."
                  tooltipPlacement="top"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                  placeholder="Enter business description"
                  labelStyle={{ fontWeight: "bold" }}
                  readOnly={false}
                  maxLength="256"
                />
              </div>
              <div>
                <InputField
                  id="address"
                  name="address"
                  label="Address"
                  tooltipContent="Address of the business. Maximum of 256 characters."
                  tooltipPlacement="top"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full"
                  placeholder="Enter business address"
                  labelStyle={{ fontWeight: "bold" }}
                  readOnly={false}
                />
              </div>
              <div>
                <InputField
                  id="email"
                  name="email"
                  label="Email"
                  tooltipContent=" Email address (in valid email format) to contact the business. Maximum of 128 characters."
                  tooltipPlacement="top"
                  value={email}
                  className="w-full"
                  onChange={(e) => setEmail(e.target.value)}
                  labelStyle={{ fontWeight: "bold" }}
                  placeholder="Enter email address"
                  readOnly={false}
                />
              </div>
              <div>
                <DropdownWithSearch
                  id="vertical"
                  name="vertical"
                  label="Vertical"
                  tooltipContent="Industry of the business.Maximum of 256 characters."
                  tooltipPlacement="top"
                  value={vertical}
                  options={[
                    { label: "Professional Services", value: "PROF_SERVICES" },
                    // { label: "Technology", value: "TECH" },
                    // { label: "E-commerce", value: "ECOMMERCE" },
                    { label: "Automotive", value: "AUTO" },
                    { label: "Beauty & Wellness", value: "BEAUTY" },
                    { label: "Apparel & Fashion", value: "APPAREL" },
                    { label: "Education", value: "EDU" },
                    { label: "Entertainment", value: "ENTERTAIN" },
                    { label: "Event Planning", value: "EVENT_PLAN" },
                    { label: "Financial Services", value: "FINANCE" },
                    { label: "Grocery", value: "GROCERY" },
                    { label: "Government", value: "GOVT" },
                    { label: "Hospitality", value: "HOTEL" },
                    { label: "Healthcare", value: "HEALTH" },
                    { label: "Nonprofit", value: "NONPROFIT" },
                    { label: "Retail", value: "RETAIL" },
                    { label: "Travel & Tourism", value: "TRAVEL" },
                    { label: "Restaurant", value: "RESTAURANT" },
                    { label: "Not a Business", value: "NOT_A_BIZ" },
                    { label: "Other", value: "OTHER" },
                    { label: "Undefined", value: "UNDEFINED" },
                  ]}
                  onChange={(value) => setVertical(value)}
                  className="w-full"
                  placeholder="Select vertical"
                />
              </div>
              <div>
                <InputField
                  id="website1"
                  name="website1"
                  label="Websites"
                  tooltipContent="URLs (including http:// or https://) associated with the business (e.g., website, Facebook Page, Instagram). Maximum of 2 websites with a maximum of 256 characters each."
                  tooltipPlacement="top"
                  className="w-full"
                  placeholder="Enter URL Address"
                  labelStyle={{ fontWeight: "bold" }}
                  readOnly={false}
                  value={editWebsite1}
                  onChange={(e) => seteditWebsite1(e.target.value)}
                />
              </div>
              <div className="flex items-end space-x-2">
                <InputField
                  id="website2"
                  name="website2"
                  className="w-full"
                  placeholder="Enter URL Address"
                  readOnly={false}
                  value={editWebsite2}
                  onChange={(e) => seteditWebsite2(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-3">
              <UniversalButton
                id="editsave"
                name="editsave"
                label="Save"
                onClick={() => {
                  // setWabaEdit(false);
                  updateDetails();
                  // toast.success("Profile updated Successfully");
                }}
              />
              <UniversalButton
                id="editcancel"
                name="editcancel"
                label="Cancel"
                onClick={() => {
                  setWabaEdit(false);
                  toast.error("No changes.");
                }}
              />
            </div>
          </div>

          <div className="   ">
            <div className=" hidden lg:flex relative mx-auto w-[280px] md:w-[300px] h-[635px] bg-black rounded-[3.5rem] p-2 shadow-2xl">
              <div className="flex flex-col gap-1 w-full h-full bg-white/95 rounded-[2.8rem] overflow-hidden border-2 border-gray-800">
                <div className="flex flex-col ">
                  <div className="flex justify-center bg-white ">
                    <div className=" w-28 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
                      <div className="w-10 h-1 bg-gray-800 rounded-full" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 items-center justify-between bg-white border-b border-gray-100 p-2 pb-3 ">
                    <div className=" flex items-center justify-center   ">
                      <div className="w-16 h-16 rounded-full border-2 border-green-500 bg-gray-100 p-0.5 overflow-hidden ">
                        {preview && (
                          <img
                            src={preview}
                            alt="Logo"
                            className="object-contain rounded-full "
                          />
                        )}
                      </div>

                      <div className="absolute top-16 -left-19 flex items-center">
                        <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                          Profile
                        </div>
                        <div className="flex items-center">
                          <div className="w-35 h-0.5 bg-black"></div>
                          <div className="w-3 h-3 border-3 border-black rounded-full bg-white -ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 items-center ">
                      <div className="">
                        <h3 className="text-md text-black font-semibold">
                          {selectedWaba?.name || "Business Name"}
                        </h3>

                        <div className="absolute top-27.5 left-52 flex items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 border-3 border-black rounded-full bg-white -ml-1"></div>
                            <div className="w-32 h-0.5 bg-black"></div>
                          </div>
                          <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                            Name
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <span className="text-sm font-medium text-gray-500 ">
                          {selectedWaba?.wabaNumber || "Waba Number"}
                        </span>

                        <div className="absolute top-34 -left-25 flex items-center">
                          <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                            Number
                          </div>
                          <div className="flex items-center">
                            <div className="w-30 h-0.5 bg-black"></div>
                            <div className="w-3 h-3 border-3 border-black rounded-full bg-white -ml-1"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center w-full  max-w-[230px] mx-auto gap-2  text-black ">
                        <span className="text-xs text-center text-gray-600 ">
                          {" "}
                          {about}{" "}
                        </span>

                        <div className="absolute top-40.25 left-61 flex items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 border-3 border-black rounded-full bg-white "></div>
                            <div className="w-22 h-0.5 bg-black"></div>
                          </div>
                          <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                            About
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center bg-white  justify-between p-3">
                  <div className="flex flex-col justify-center">
                    <span className="text-[13px] text-black font-medium ">
                      {" "}
                      Offers & announcements{" "}
                    </span>
                    <span className="text-[10px] text-gray-600 ">
                      {" "}
                      Get Offers & announcements from this Business{" "}
                    </span>
                  </div>
                  <div className="flex items-center justify-end w-10 h-5.75 p-1 rounded-full bg-green-500">
                    <div className="w-4 h-4 rounded-full bg-black"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 bg-white px-4 py-3 ">
                  <div className="flex items-start gap-3 text-green-500   ">
                    <StoreMallDirectoryOutlinedIcon />
                    <span className="text-xs text-gray-600 ">
                      {" "}
                      {description}{" "}
                    </span>

                    <div className="absolute top-75 -left-25  flex items-center">
                      <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                        Description
                      </div>
                      <div className="flex items-center">
                        <div className="w-14 h-0.5 bg-black"></div>
                        <div className="w-3 h-3 border-3 border-black rounded-full bg-white -ml-1"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-green-500  ">
                    <CategoryOutlinedIcon />
                    <span className="text-xs text-gray-600">
                      {vertical ? verticalLabelMap[vertical] || "Unknown" : "—"}
                    </span>

                    <div className="absolute top-85 left-49 flex items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 border-3 border-black rounded-full bg-white "></div>
                        <div className="w-32 h-0.5 bg-black"></div>
                      </div>
                      <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                        Vertical
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-green-500  ">
                    <LocationOnOutlinedIcon />
                    <span className="text-xs text-gray-600 "> {address} </span>

                    <div className="absolute top-93 -left-23  flex items-center">
                      <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                        Address
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-0.5 bg-black"></div>
                        <div className="w-3 h-3 border-3 border-black rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-green-500  ">
                    <MailOutlinedIcon />
                    <span className="text-xs text-gray-600 "> {email} </span>

                    <div className="absolute top-101 left-48 flex items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 border-3 border-black rounded-full bg-white "></div>
                        <div className="w-32 h-0.5 bg-black"></div>
                      </div>
                      <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                        Email
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-green-500  ">
                    <PublicOutlinedIcon />
                    <span className="text-xs text-gray-600 ">
                      {" "}
                      {editWebsite1}{" "}
                    </span>
                    <div className="absolute bottom-38 left-61 flex items-center">
                      <div className="flex items-center">
                        <div className="relative w-10 h-9 bg-white border-[2.5px] border-black border-l-0 ">
                          <div className=" absolute -top-1.5 w-3 h-3 border-3 border-black rounded-full bg-white "></div>
                          <div className=" absolute -bottom-1.75 w-3 h-3 border-3 border-black rounded-full bg-white "></div>
                        </div>
                        <div className="w-12 h-0.5 bg-black"></div>
                        <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                          Websites
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-green-500  ">
                    <PublicOutlinedIcon />
                    <span className="text-xs text-gray-600 ">
                      {" "}
                      {editWebsite2}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex items-center bg-white gap-2 p-2">
                  <PersonAddAltOutlinedIcon />
                  <span className="text-[13px] text-black font-medium ">
                    {" "}
                    Add to contacts{" "}
                  </span>
                </div>

                <div className="flex items-center bg-white gap-2 p-2">
                  <InfoOutlinedIcon />
                  <div className="flex flex-col">
                    <span className="text-[13px] text-black font-medium ">
                      {" "}
                      Business Account{" "}
                    </span>
                    <span className="text-[11px] text-gray-700  ">
                      {" "}
                      This Account Uses Whatsapp Business{" "}
                    </span>
                  </div>
                </div>
                <div className="relative z-10 p-2  bg-white  mt-auto">
                  <div className="w-28 h-1 bg-black rounded-full mx-auto " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default NewWabaUI;
