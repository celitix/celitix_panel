import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import { Position } from "@xyflow/react";
import moment from "moment";
import Lottie from "lottie-react";

// ICONS
import { MdOutlineDeleteForever } from "react-icons/md";
import { ImInfo } from "react-icons/im";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { IoSearch } from "react-icons/io5";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaFacebookF,
} from "react-icons/fa";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CachedIcon from "@mui/icons-material/Cached";

// MUI MATERIAL
import { Paper, Typography, Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";

// COMPONENTS
import DropdownMenuPortal from "@/utils/DropdownMenuPortal.jsx";
import UniversalButton from "../components/UniversalButton";
import UniversalLabel from "../components/UniversalLabel";
import InputField from "@/components/layout/InputField";
// import AnimatedDropdown from '../components/AnimatedDropdown';
import CustomTooltip from "../components/CustomTooltip";
import AnimatedDropdown from "../components/AnimatedDropdown";
import Loader from "../components/Loader";
import InfoPopover from "@/components/common/InfoPopover.jsx";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker.jsx";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch.jsx";
import UniversalSkeleton from "../components/UniversalSkeleton.jsx";
// import DropdownWithSearch from "../components/DropdownWithSearch.jsx";

// ASSETS
import logo from "@/assets/images/celitix-cpaas-solution-logo.svg";
import dummyimg from "@/assets/images/uploadimage.png";
import verified from "@/assets/animation/verified.json";
// import metaAiAnimation from "..//assets/animation/metaai.json";

// API
import { fetchUserSrno, getWabaList } from "@/apis/admin/admin.js";
import {
  getwabadetails,
  updateWabaDetails,
  refreshWhatsApp,
  uploadImageFile,
  updateWabaStatus,
} from "@/apis/whatsapp/whatsapp";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const MIN_DIMENSION = 192; // Minimum 192px width/height
const RECOMMENDED_DIMENSION = 640; // Recommended 640px width/height

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPagination = ({
  totalPages,
  paginationModel,
  setPaginationModel,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) =>
      setPaginationModel({ ...paginationModel, page: newPage - 1 }),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <Button
                key={index}
                variant={selected ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: "27px" }}
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <Button
                key={index}
                variant="outlined"
                size="small"
                {...item}
                sx={{}}
              >
                {type === "previous" ? "Previous" : "Next"}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </PaginationList>
    </Box>
  );
};

const ManageWabaAdmin = ({ id, name }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [view, setView] = useState(false);
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
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [loadingRow, setLoadingRow] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [instaStatus, setInstaStatus] = useState(1);


  // const [wabaName, setWabaName] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const [isCelebrating, setIsCelebrating] = useState(false);
  const handleCelebration = () => {
    setIsCelebrating(true);
    setTimeout(() => setIsCelebrating(false), 5000);
  };
  const [allUsers, setAllUsers] = useState([]);
  // const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    //fetchAllUsersDetails
    const fetchAllUsersDetails = async () => {
      const data = {
        userSrno: "",
        date: "",
      };
      try {
        setIsFetching(true);
        const res = await fetchUserSrno(data);
        setAllUsers(res);
      } catch (e) {
        console.log("e", e);
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllUsersDetails();
  }, []);

  const [searchData, setSearchData] = useState({
    wabaName: "",
    wabaNo: "",
    selectedUser: "",
    searchDate: null,
  });

  const fileInputRef = useRef(null);

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

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // const API_BASE_URL = "/api";

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

  const handleView = async (waba) => {
    setSelectedWaba(waba);
    const details = await getwabadetails(waba.wabaNumber);
    // console.log(details)
    setwabadetails(details.data[0]);
    setView(true);
  };

  // const handleEdit = async (row) => {
  //   console.log(row, "handle edit")
  //   setWabaEdit(true);
  //   setSelectedWaba(row);
  //   const details = await getwabadetails(row.wabaNumber);
  //   const wabaDetails = details.data[0];
  //   setAbout(wabaDetails.about);
  //   setDescription(wabaDetails.description);
  //   setAddress(wabaDetails.address);
  //   setEmail(wabaDetails.email);
  //   setVertical(wabaDetails.vertical);
  //   seteditWebsite1(wabaDetails.websites[0] || "");
  //   seteditWebsite2(wabaDetails.websites[1] || "");
  //   setPreview(wabaDetails.profile_picture_url || null);
  // };

  const handleEdit = async (row) => {
    try {
      console.log(row, "handle edit");
      setWabaEdit(true);
      setSelectedWaba(row);

      const details = await getwabadetails(row.wabaNumber);

      // Safety checks
      const wabaDetails = details?.data?.[0] || {};

      setAbout(wabaDetails.about || "");
      setDescription(wabaDetails.description || "");
      setAddress(wabaDetails.address || "");
      setEmail(wabaDetails.email || "");
      setVertical(wabaDetails.vertical || "");

      // Websites safe access
      const websites = Array.isArray(wabaDetails.websites)
        ? wabaDetails.websites
        : [];

      seteditWebsite1(websites[0] || "");
      seteditWebsite2(websites[1] || "");

      setPreview(wabaDetails.profile_picture_url || null);
    } catch (err) {
      console.error("Error in handleEdit:", err);
    }
  };

  const handleWabaCreate = (e) => {
    setWabaCreatebtn(true);
  };

  const handleWabaMMCreate = (e) => {
    setWabaCreateMMbtn(true);
  };

  // const handleSync = async (data) => {
  //   // if (!data.wabaSrno) return toast.error("Please select a WABA");
  //   try {
  //     const res = await refreshWhatsApp(data?.wabaSrno);
  //     if (res.status) {
  //       toast.success("Refreshed Successfully");
  //       await fetchWabaList();
  //     } else {
  //       toast.error("Error Refreshing Data");
  //     }
  //   } catch (e) {
  //     toast.error("Error Refreshing Data");
  //   }
  // };

  // const handleSync = async (data) => {
  //   const id = data?.wabaSrno;
  //   setLoadingRow(id); // mark this row as loading
  //   try {
  //     const res = await refreshWhatsApp(id);
  //     if (res.status) {
  //       toast.success("Refreshed Successfully");
  //       await fetchWabaList();
  //     } else {
  //       toast.error("Error Refreshing Data");
  //     }
  //   } catch (e) {
  //     toast.error("Error Refreshing Data");
  //   } finally {
  //     setLoadingRow(null); // reset loading state
  //   }
  // };

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

  // const updateDetails = async () => {
  //   const website = [editWebsite1, editWebsite2];

  //   const data = {
  //     messaging_product: "whatsapp",
  //     about: about,
  //     description: description,
  //     email: email,
  //     profile_picture_handle: file,
  //     address: address,
  //     websites: website,
  //     vertical: vertical,
  //   };
  //   const updateData = await updateWabaDetails(data, selectedWaba.wabaNumber);
  // };

  const updateDetails = async () => {
    try {
      const websites = [
        editWebsite1?.trim() || null,
        editWebsite2?.trim() || null,
      ].filter(Boolean); // removes null/empty values

      const payload = {
        messaging_product: "whatsapp",
        about,
        description,
        email,
        profile_picture_handle: file || wabadetails?.profile_picture_url,
        address,
        websites,
        vertical,
      };
      console.log(payload);

      const response = await updateWabaDetails(
        payload,
        selectedWaba?.wabaNumber,
      );

      console.log("Update Response:", response);

      if (response?.statusCode === 200) {
        setWabaEdit(false);
        fetchWabaList();
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating WABA details:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const statusMessages = {
    CONNECTED: {
      title: "Connected",
      description:
        "A phone number is associated with this account and is working properly.",
    },
    RESTRICTED: {
      title: "Restricted",
      description:
        "This phone number has reached its 24-hour messaging limit and can no longer send messages to customers. Please wait until the messaging limit resets.",
    },
    FLAGGED: {
      title: "Flagged",
      description:
        "This number has been flagged. Review the quality rating or check the account health.",
    },
    BANNED: {
      title: "Banned",
      description:
        "This number has been banned. Contact support for resolution.",
    },
    DISCONNECTED: {
      title: "Disconnected",
      description:
        "This account has been disconnected. Contact support for resolution.",
    },
    UNKNOWN: {
      title: "Unknown",
      description: "The status of this number is unknown or not reported.",
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

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, width: 80 },
    { field: "name", headerName: "Display Name", flex: 1, minWidth: 160 },
    {
      field: "wabaNumber",
      headerName: "WABA Mobile No.",
      flex: 1,
      minWidth: 180,
    },
    { field: "createdOn", headerName: "Created On", flex: 1, minWidth: 140 },
    {
      field: "businessStatus",
      headerName: "Business Verification Status",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => {
        // Get the verification status and capitalize it
        const verificationStatus =
          (params.row.businessVerificationStatus || "")
            .charAt(0)
            .toUpperCase() +
          (params.row.businessVerificationStatus || "").slice(1).toLowerCase();

        return (
          <div className="flex items-center gap-2">
            <span>{verificationStatus || "N/A"}</span>
            {params.row.businessVerificationStatus === "verified" && (
              <Lottie
                animationData={verified}
                loop
                autoplay
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Phone Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => {
        const status = params.value || "UNKNOWN";
        const statusMap = {
          CONNECTED: { color: "bg-green-500", text: "Connected" },
          FLAGGED: { color: "bg-orange-500", text: "Flagged" },
          RESTRICTED: { color: "bg-red-500", text: "Restricted" },
          BANNED: { color: "bg-red-700", text: "Banned" },
          DISCONNECTED: { color: "bg-red-800", text: "Disconnected" },
          UNKNOWN: { color: "bg-gray-400", text: "Unknown" },
        };
        const { color, text } = statusMap[status] || statusMap.UNKNOWN;
        const content = statusMessages[status] || statusMessages.UNKNOWN;

        const [showHover, setShowHover] = useState(false);
        return (
          <>
            <div
              onMouseEnter={() => setShowHover(true)}
              onMouseLeave={() => setShowHover(false)}
            >
              <span
                className={`px-4 py-1.5 rounded-full text-white text-xs tracking-wider font-semibold cursor-pointer ${color}`}
                style={{
                  minWidth: 90,
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                {text}
              </span>

              <AnimatePresence>
                {showHover && (
                  <motion.div
                    key="status-hover"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute z-50 bg-white shadow-xl border rounded-lg w-78 p-4 text-sm text-gray-700"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "0.25rem",
                    }}
                  >
                    <p className="font-bold text-gray-900 mb-1">
                      {content.title}
                    </p>
                    <p className="text-gray-600 text-wrap">
                      {content.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        );
      },
    },
    {
      field: "quality",
      headerName: "Quality",
      flex: 0,
      minWidth: 130,
      renderCell: (params) => {
        const quality = params.value || "UNKNOWN";
        const qualityMap = {
          GREEN: { color: "bg-green-500", text: "High" },
          YELLOW: { color: "bg-yellow-400", text: "Medium" },
          RED: { color: "bg-red-500", text: "Low" },
          UNKNOWN: { color: "bg-gray-400", text: "Unknown" },
        };

        const { color, text } = qualityMap[quality] || qualityMap.UNKNOWN;
        const content = qualityMessages[quality] || qualityMessages.UNKNOWN;

        const [showHover, setShowHover] = useState(false);

        return (
          <div
            onMouseEnter={() => setShowHover(true)}
            onMouseLeave={() => setShowHover(false)}
          >
            <div className="flex items-center gap-2 py-3 cursor-pointer">
              <span className={`inline-block w-4 h-4 rounded-full ${color}`} />
              <span className="text-sm font-semibold text-gray-700">
                {text}
              </span>
            </div>

            <AnimatePresence>
              {showHover && (
                <motion.div
                  key="quality-hover"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute z-50 bg-white shadow-xl border rounded-lg w-78 p-4 text-sm text-gray-700"
                  style={{
                    left: "65%",
                    transform: "translateX(-50%)",
                    marginTop: "0.25rem",
                  }}
                >
                  <p className="font-bold text-gray-900 mb-1">
                    {content.title}
                  </p>
                  <p className="text-gray-600 text-wrap">
                    {content.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      },
    },
    { field: "expiryDate", headerName: "Expiry Date", flex: 1, minWidth: 130 },
    {
      field: "instaStatus",
      headerName: "Waba Status",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => {
        const isActive = params.value === "Active";
        const isLoading = editStatus === params.row.wabaAccountId;
        const label = isActive ? "Deactivating..." : "Activating...";

        return (
          <CustomTooltip arrow title="Click to change status" placement="top">
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
                color: isActive ? "#065F46" : "#991B1B",
                backgroundColor: isActive ? "#D1FAE5" : "#FEE2E2",
                cursor: "pointer",
              }}
              onClick={() =>
                handleUpdateStatus(params.row)
              }
            >
              {isLoading ? (
                <>
                  <CachedIcon
                    sx={{
                      fontSize: 16,
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  {label}
                </>
              ) : (
                params.value
              )}
            </span>
          </CustomTooltip>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      width: 220,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Info" placement="top" arrow>
            <span>
              <IconButton
                type="button"
                ref={(el) => {
                  if (el) dropdownButtonRefs.current[params.row.id] = el;
                }}
                onClick={() => handleInfo(params.row)}
                className="no-xs relative"
              >
                <ImInfo size={18} className="text-green-500 " />
              </IconButton>
              <InfoPopover
                anchorEl={dropdownButtonRefs.current[params.row.id]}
                open={dropdownOpenId === params.row.id}
                onClose={closeDropdown}
              >
                {clicked && Object.keys(clicked).length > 0 ? (
                  <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                    <tbody>
                      {Object.entries(clicked).map(([key, value], index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors border-b last:border-none"
                        >
                          <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3 text-nowrap">
                            {additionalInfoLabels[key] || key}
                          </td>
                          <td className="px-4 py-2 text-gray-800">
                            {key === "isEnabledForInsights"
                              ? value === true || value === "true"
                                ? "True"
                                : "False"
                              : value || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-sm text-gray-400 italic px-2 py-2">
                    No data
                  </div>
                )}
              </InfoPopover>
            </span>
          </CustomTooltip>
          <CustomTooltip title="View Profile" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleView(params.row)}
            >
              <VisibilityIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip>
          {/* <CustomTooltip title="Sync Status" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleSync(params.row)}
            >
              <SyncOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "green",
                }}
              />
            </IconButton>
          </CustomTooltip> */}

          <CustomTooltip title="Sync Status" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleSync(params.row)}
              disabled={loadingRow === params.row.wabaSrno}
            >
              {loadingRow === params.row.wabaSrno ? (
                <CircularProgress size={18} color="success" />
              ) : (
                <SyncOutlinedIcon
                  sx={{
                    fontSize: "1.2rem",
                    color: "green",
                  }}
                />
              )}
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Edit Profile" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  // WABA LIST
  const fetchWabaList = async () => {
    setIsFetching(true);
    try {
      const payload = {
        wabaName: searchData.wabaName?.trim() || "",
        wabaNo: searchData.wabaNo?.trim() || "",
        wabaDate: searchData.searchDate
          ? moment(searchData.searchDate).format("YYYY-MM-DD")
          : "",
        userSrno: searchData.selectedUser || -1,
      };
      const response = await getWabaList(payload);
      setWabaList(response?.length > 0 ? response : []);
    } catch (error) {
      console.error("Error fetching WABA list:", error);
      toast.error("Error fetching WABA list.");
      setWabaList([]);
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateStatus = async (row) => {
    console.log(row, "update status");
    setEditStatus(row.wabaAccountId);
    const data = {
      srno: row.wabaSrno,
      status: row.status === "Active" ? 0 : 1,
    };
    try {
      const res = await updateWabaStatus(data);
      if (res.status) {
        instaStatus === 1 ? setInstaStatus(0) : setInstaStatus(1);
        // fetchWabaList()
        setEditStatus("")
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchWabaList();
  }, []);

  // Map API Data to DataGrid Rows
  const rows = wabaList?.map((waba, index) => ({
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
    instaStatus: instaStatus === 1 ? "Active" : "Inactive",

    additionalInfo: {
      // messagingLimit: waba.messagingLimits || "N/A",
      messagingLimit: waba.messagingLimits == 2147483647 ? "Unlimited" : (waba.messagingLimits || "N/A"),
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

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            lg: "space-between",
          },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {selectedRows.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography variant="body2">
            Total Records: <span className="font-semibold">{rows?.length}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomPagination
            totalPages={totalPages}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Box>
      </GridFooterContainer>
    );
  };

  return (
    <div>
      <div className="text-2xl text-gray-700 font-medium w-full text-center">
        Manage Waba Accounts
      </div>
      <div className="flex items-end w-full gap-2 my-4 flex-wrap">
        <div className="w-full sm:w-60">
          <DropdownWithSearch
            id="manageuser"
            name="manageuser"
            label="Select User"
            tooltipContent="Select user you want to see waba"
            tooltipPlacement="right"
            options={allUsers
              .slice()
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((user) => ({
                label: user.userName,
                value: user.srNo,
              }))}
            // value={selectedUser}
            // onChange={setSelectedUser}
            onChange={(e) => {
              setSearchData({
                ...searchData,
                selectedUser: e,
              });
            }}
            value={searchData.selectedUser}
            placeholder="Select User"
          />
        </div>
        <div className="w-full md:w-56">
          <InputField
            id="wabaName"
            name="wabaName"
            placeholder="Search by wabaName"
            type="text"
            className="w-full"
            label="Waba Name"
            onChange={(e) => {
              setSearchData({
                ...searchData,
                wabaName: e.target.value,
              });
            }}
            value={searchData.wabaName}
          />
        </div>
        <div className="w-full md:w-56">
          <InputField
            id="wabaNo"
            name="wabaNo"
            placeholder="Search by Waba No."
            type="text"
            className="w-full"
            label={"waba No."}
            onChange={(e) => {
              setSearchData({
                ...searchData,
                wabaNo: e.target.value,
              });
            }}
            value={searchData.wabaNo}
          />
        </div>
        <div className="w-full md:w-56">
          <UniversalDatePicker
            label="Expiry Date"
            id="expiryDate"
            name="expiryDate"
            // defaultValue={new Date()}
            placeholder="Enter Expiry Date"
            value={searchData.searchDate}
            onChange={(newValue) =>
              setSearchData({ ...searchData, searchDate: newValue })
            }
          />
        </div>
        <div>
          <UniversalButton
            onClick={fetchWabaList}
            icon={<IoSearch />}
            label={isFetching ? "Searching..." : "Search"}
            disabled={isFetching}
          />
        </div>
      </div>

      <div style={{ transition: "filter 0.3s ease" }}>
        {isFetching || isLoading ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <Paper sx={{ height: 558 }} id={id} name={name}>
            <DataGrid
              id={id}
              name={name}
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10, 20, 50]}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              // checkboxSelection
              rowHeight={45}
              slots={{ footer: CustomFooter }}
              slotProps={{ footer: { totalRecords: rows?.length } }}
              onRowSelectionModelChange={(ids) => handleRowSelection(ids)}
              disableRowSelectionOnClick
              // autoPageSize
              disableColumnResize
              disableColumnMenu
              sx={{
                border: 0,
                "& .MuiDataGrid-cellCheckbox": {
                  outline: "none !important",
                },
                "& .MuiDataGrid-cell": {
                  outline: "none !important",
                },
                "& .MuiDataGrid-columnHeaders": {
                  color: "#193cb8",
                  fontSize: "14px",
                  fontWeight: "bold !important",
                },
                "& .MuiDataGrid-row--borderBottom": {
                  backgroundColor: "#e6f4ff !important",
                },
                "& .MuiDataGrid-columnSeparator": {
                  // display: "none",
                  color: "#ccc",
                },
              }}
            />
          </Paper>
        )}

        {/* Waba Profile */}
        <Dialog
          visible={view}
          onHide={() => setView(false)}
          className="p-0 w-[34rem] max-w-full"
          modal
          draggable={false}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden border border-gray-200 shadow-xl bg-gradient-to-b rounded-2xl from-white to-gray-50"
          >
            <div className="flex flex-col items-center p-6 text-white bg-gradient-to-r rounded-t-2xl from-purple-400 to-blue-300">
              <motion.img
                src={wabadetails?.profile_picture_url || dummyimg}
                alt="Profile"
                className="w-24 h-24 border-4 border-white rounded-full shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <h1 className="mt-3 text-2xl font-semibold">
                {selectedWaba?.wabaName || "WhatsApp Profile"}
              </h1>
              <p className="text-sm opacity-90">
                {wabadetails?.about || "Business WhatsApp Profile"}
              </p>
            </div>

            <div className="relative z-10 p-6">
              <div className="flex flex-col items-center gap-2">
                <p className="flex items-center gap-2 text-lg font-medium text-gray-900">
                  <FaWhatsapp className="text-[#25D366] text-lg" />
                  {selectedWaba?.wabaNumber || "N/A"}
                </p>
                {/* <a
                href={`https://wa.me/${selectedWaba?.wabaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] text-sm hover:underline"
              >
                {whatsappLinkPreview}
              </a> */}
                <div>
                  <a
                    href={`https://wa.me/${selectedWaba?.wabaNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] text-sm hover:underline"
                  >
                    {whatsappLinkPreview}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard
                        .writeText(whatsappLinkPreview)
                        .then(() => {
                          toast.success("Copied to clipboard!");
                        })
                        .catch(() => {
                          toast.error("Failed to copy password.");
                        });
                    }}
                    className="p-1 bg-transparent rounded-full shadow-2xl cursor-pointer hover:bg-gray-200 focus:outline-none"
                  >
                    <ContentCopyOutlinedIcon
                      sx={{
                        fontSize: "1rem",
                        color: "#999",
                      }}
                    />
                  </button>
                </div>
              </div>

              <motion.div
                className="p-4 mt-5 overflow-y-auto text-sm leading-relaxed text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-semibold text-gray-900">Description</p>
                <p>
                  {wabadetails?.description || "Hey there, I'm using WhatsApp."}
                </p>
              </motion.div>

              {wabadetails?.email && (
                <div className="flex items-center gap-3 mt-6 text-gray-800">
                  <FaEnvelope className="text-lg text-gray-600" />
                  <a
                    href={`mailto:${wabadetails.email}`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    {wabadetails.email}
                  </a>
                </div>
              )}
              {wabadetails?.address && (
                <div className="flex items-center gap-3 mt-4 text-gray-800">
                  <FaMapMarkerAlt className="text-lg text-blue-500" />
                  <p className="text-sm">{wabadetails.address || "N/A"}</p>
                </div>
              )}
              {wabadetails?.websites?.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 text-sm font-semibold text-gray-900">
                    Websites
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {wabadetails.websites.map((website, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaGlobe className="text-[#128C7E] text-lg" />
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-sm text-gray-800 truncate hover:underline"
                        >
                          {website.replace("https://", "")}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </Dialog>

        {/* Update waba profile */}
        <Dialog
          header="Business Profile"
          visible={wabaedit}
          onHide={() => {
            setWabaEdit(false);
          }}
          draggable={false}
          className="w-[50rem]"
          modal
        >
          <div className="p-2 space-y-4">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center lg:items-start">
              <UniversalLabel
                text="Profile Picture"
                tooltipContent="Max size of 5MB allowed. Image size of 640x640 is recommended. Images with a height or width of less than 192px may cause issues."
                tooltipPlacement="top"
                className="font-semibold tracking-wide text-gray-700"
                id="profilepicture"
                name="profilepicture"
              />

              <div className="flex items-center mt-2 space-x-4">
                {/* Image Preview */}
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

            {/* Action Buttons */}
            <div className="flex justify-center mt-4 space-x-3">
              <UniversalButton
                id="editsave"
                name="editsave"
                label="Save"
                onClick={() => {
                  setWabaEdit(false);
                  updateDetails();
                  toast.success("Profile updated Successfully");
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
        </Dialog>
      </div>
    </div>
  );
};

export default ManageWabaAdmin;
