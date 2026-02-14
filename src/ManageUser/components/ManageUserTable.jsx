import * as React from "react";
import toast from "react-hot-toast";
import { useState, useRef, useMemo, useEffect } from "react";
import {
  IconButton,
  Paper,
  Typography,
  Box,
  Button,
  Tooltip,
  Popover,
} from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import moment from "moment";
import { InputSwitch } from "primereact/inputswitch";

// ICONS
import { AccountBalanceWalletOutlined as WalletIcon } from "@mui/icons-material";
import { CiCreditCard2 } from "react-icons/ci";
import { GrChannel } from "react-icons/gr";
import { HiLink } from "react-icons/hi2";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { BsJournalArrowDown } from "react-icons/bs";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmergencyOutlinedIcon from "@mui/icons-material/EmergencyOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import PhoneMissedOutlinedIcon from "@mui/icons-material/PhoneMissedOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { IoAddSharp } from "react-icons/io5";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Loop as LoopIcon } from "@mui/icons-material";
import { TbAnalyze } from "react-icons/tb";

// APIS
import { fetchUserbySrno, getAllowedServices } from "@/apis/admin/admin";
import { fetchBalance } from "@/apis/settings/setting";

// COMPONENTS
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import RadioGroupField from "@/whatsapp/components/RadioGroupField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import GeneratePasswordSettings from "@/profile/components/GeneratePasswordSettings";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import { DataTable } from "@/components/layout/DataTable";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const ManageUserTable = ({ id, name, allUsers = [], fetchAllUsersDetails }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [value, setValue] = useState(0);
  const [countryOptions, setCountryOptions] = useState([]);
  const [virtualBalance, setVirtualBalance] = useState(0);

  const [accountManager, setAccountManager] = useState([]);

  // Function to validate input
  const validateInput = (value, setter) => {
    value = value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");

    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[0].length > 1 && !value.includes(".")) {
      value = parts[0][0] + "." + parts[0].slice(1);
    }

    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].substring(0, 2);
    }

    let floatVal = parseFloat(value);
    if (floatVal > 9.99) {
      value = "9.99";
    }

    if (value && floatVal < 0.01) {
      value = "";
    }

    setter(value);
    return value;
  };

  //=======================================FETCH USER BALANCE START=======================================
  const [userBalance, setUserBalance] = useState([]);
  const [userBalanceDialogVisible, setUserBalanceDialogVisible] = useState({
    isOpen: false,
    balance: 0,
    userId: "",
  });

  const handleFetchBalance = async (id, userId) => {
    try {
      const res = await fetchBalance(id);
      // const data = {
      //   id,
      //   balance: res?.balance || 0,
      // };
      // const updatedBalance = [...userBalance];
      // if (updatedBalance.findIndex((item) => item.id === id) != "-1") {
      //   updatedBalance[updatedBalance.findIndex((item) => item.id === id)] =
      //     data;
      // } else {
      //   updatedBalance.push(data);
      // }
      // setUserBalance(updatedBalance);
      setUserBalanceDialogVisible({
        isOpen: true,
        balance: res?.balance,
        rechargableCredit: res?.rechargableCredit,
        userId: userId,
      });
    } catch (e) {
      toast.error("Error in fetching balance");
    }
  };
  //=======================================FETCH USER BALANCE END=======================================

  //=======================================VIEW USER DETAILS START=======================================
  // [
  //     {
  //         "service_type_id": 1,
  //         "display_name": "SMS"
  //     },
  //     {
  //         "service_type_id": 2,
  //         "display_name": "WHATSAPP"
  //     },
  //     {
  //         "service_type_id": 3,
  //         "display_name": "RCS"
  //     },
  //     {
  //         "service_type_id": 4,
  //         "display_name": "VOICE"
  //     },
  //     {
  //         "service_type_id": 7,
  //         "display_name": "OBD"
  //     },
  //     {
  //         "service_type_id": 12,
  //         "display_name": "INSTAGRAM"
  //     }
  // ]
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [viewService, setViewService] = useState(false);
  const [allowedServices, setAllowedServices] = useState([]);

  // view user details
  const handleView = async (srNo) => {
    try {
      const response = await fetchUserbySrno(srNo);
      const res = await getAllowedServices(srNo);
      if (res.status === 200) {
        setAllowedServices(res?.data);
      } else {
        setAllowedServices([
          {
            service_type_id: 1,
            display_name: "SMS",
          },
          {
            service_type_id: 2,
            display_name: "WHATSAPP",
          },
          {
            service_type_id: 3,
            display_name: "RCS",
          },
          {
            service_type_id: 4,
            display_name: "VOICE",
          },
          {
            service_type_id: 7,
            display_name: "OBD",
          },
          {
            service_type_id: 12,
            display_name: "INSTAGRAM",
          },
        ]);
      }
      console.log("res", res);
      if (response?.userMstPojoList?.length > 0) {
        setSelectedUserDetails(response.userMstPojoList[0]);
        setViewService(true);
      } else {
        toast.error("No user details found for the selected user.");
      }
    } catch (error) {
      toast.error("Failed to fetch user details. Please try again.");
    }
  };
  //=======================================VIEW USER DETAILS END=======================================

  //=======================================MANAGE USERS START=======================================
  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, width: 60 },
    { field: "userId", headerName: "User ID", flex: 0, minWidth: 160 },
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 140 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 140 },
    { field: "mobileNo", headerName: "Mobile No", flex: 1, minWidth: 140 },
    {
      field: "emailId",
      headerName: "Email",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => {
        return (
          <div
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: "auto",
            }}
          >
            {params.value}
          </div>
        );
      },
    },
    // { field: "role", headerName: "Role", flex: 1, minWidth: 120 },
    {
      field: "userCreateDate",
      headerName: "Onboard Date",
      flex: 0,
      minWidth: 170,
    },
    { field: "expiryDate", headerName: "Expiry Date", flex: 0, minWidth: 170 },
    {
      field: "status",
      headerName: "Status",
      flex: 0,
      minWidth: 160,
      renderCell: (params) => {
        const isActive = params.value === 1;

        return (
          <button className="flex items-center justify-center gap-2 px-3 rounded-full h-full">
            <div
              className={`text-white text-xs min-w-20 w-max px-2 py-1.5 border rounded-2xl text-center ${isActive ? "bg-green-500" : "bg-red-500"
                }`}
            >
              {isActive ? "Active" : "Inactive"}
            </div>
          </button>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      width: 120,
      renderCell: (params) => (
        <>
          <CustomTooltip
            arrow
            title={
              userBalance
                .find((balance) => balance.id == params.row.srno)
                ?.balance?.toString() || "Click to fetch balance"
            }
            placement="top"
          >
            <IconButton
              onClick={() =>
                handleFetchBalance(params.row.srno, params.row.userId)
              }
            >
              <WalletIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="View User Details" placement="top">
            <IconButton onClick={() => handleView(params.row.srno)}>
              <RemoveRedEyeOutlinedIcon
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

  // console.log("allUsers", allUsers);
  const rows = Array.isArray(allUsers)
    ? allUsers.map((item, i) => ({
      id: i + 1,
      sn: i + 1,
      ...item,
      role: item.role === "Direct End User" ? "Direct User" : item.role,
    }))
    : [];

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          // justifyContent: { xs: "center", lg: "space-between" },
          alignItems: "center",
          padding: 1,
          // gap: 2,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            // gap: 1.5,
          }}
        >
          {selectedRows.length > 0 && (
            <Typography
            // variant="body2"
            // sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography sx={{ fontSize: "15px" }}>
            Total Records: <span className="font-semibold">{rows.length}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            // width: { xs: "100%", sm: "auto" },
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
  //=======================================MANAGE USERS END=======================================

  const baseBadgeClass =
    "mb-2 shadow w-max px-2 py-1 text-sm tracking-wider font-medium rounded-2xl";

  const badgeClasses = {
    enabled: `${baseBadgeClass} text-green-500 bg-green-100`,
    disabled: `${baseBadgeClass} text-red-500 bg-red-100`,
  };

  return (
    <>
      {/* User Table Start */}
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
          rowHeight={45}
          slots={{
            footer: CustomFooter,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnMenu
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": { outline: "none !important" },
            "& .MuiDataGrid-columnHeaders": {
              color: "#193cb8",
              fontSize: "14px",
              fontWeight: "bold !important",
            },
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "#e6f4ff !important",
            },
            "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
          }}
        />
      </Paper>
      {/* User Table End */}

      {/* Dialog Section Start */}

      {/* View user balance start */}
      <Dialog
        header="Balance"
        visible={userBalanceDialogVisible.isOpen}
        onHide={() =>
          setUserBalanceDialogVisible({ isOpen: false, balance: 0 })
        }
        className="w-[25rem]"
        draggable={false}
      >
        <div className="space-y-5">
          <div className="text-sm text-gray-600">
            User ID:
            <span className="ml-1 font-medium text-gray-900">
              {userBalanceDialogVisible?.userId || "Unknown"}
            </span>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Available Balance
            </p>
            <p className="text-3xl font-semibold text-gray-900">
              {/* ₹{Number(userBalanceDialogVisible?.balance || "-").toLocaleString()} */}
              {userBalanceDialogVisible?.balance
                ? `₹${Number(userBalanceDialogVisible.balance).toLocaleString('en-IN')}`
                : "No balance added"}
            </p>
          </div>

          <p className="text-xs text-gray-400">
            Balance reflects your current usable amount.
          </p>
        </div>
      </Dialog>

      {/* with rechargable credit */}

      {/* <Dialog
        header="Balance"
        visible={userBalanceDialogVisible.isOpen}
        onHide={() =>
          setUserBalanceDialogVisible({ isOpen: false, balance: 0, rechargableCredit: 0 })
        }
        className="w-[25rem]"
        draggable={false}
      >
        <div className="space-y-5">
          <div className="text-sm text-gray-600">
            User ID:
            <span className="ml-1 font-medium text-gray-900">
              {userBalanceDialogVisible?.userId || "Unknown"}
            </span>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 space-y-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Available Balance
              </p>
              <p className="text-3xl font-semibold text-gray-900">
                ₹{Number(userBalanceDialogVisible?.balance || 0).toLocaleString()}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Rechargeable Credit
              </p>
              <p
                className={`text-2xl font-semibold ${Number(userBalanceDialogVisible?.rechargableCredit || 0) < 0
                  ? "text-red-600"
                  : "text-green-600"
                  }`}
              >
                ₹{Number(userBalanceDialogVisible?.rechargableCredit || 0).toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Balance reflects your current usable amount. Rechargeable credit shows additional credit
            adjustments.
          </p>
        </div>
      </Dialog> */}
      {/* View user balance end */}

      {/* View User details Start */}
      <Dialog
        header="View details"
        visible={viewService}
        onHide={() => setViewService(false)}
        className="w-[48rem] max-w-full"
        draggable={false}
      >
        {selectedUserDetails ? (
          <div className="space-y-6 p-3 border rounded-xl shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-2 text-sm">
                <RemoveRedEyeOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">User ID : </strong>
                  {selectedUserDetails.userId || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarTodayOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Virtual Balance : </strong>
                  {selectedUserDetails?.virtualBalance === 1
                    ? "Enable"
                    : selectedUserDetails?.virtualBalance === 0
                      ? "Disable"
                      : "Not Available"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-2 text-sm">
                <CalendarTodayOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">Expiry Date : </strong>
                  {selectedUserDetails.expiryDate || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PersonOutlineOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>First Name : </strong>
                  {selectedUserDetails.firstName || "Not Available"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <PersonOutlineOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">Last Name : </strong>{" "}
                  {selectedUserDetails.lastName || "Not Available"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <EmailOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">Email ID : </strong>{" "}
                  {selectedUserDetails.emailId || "Not Available"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <PhoneOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">Mobile No. : </strong>{" "}
                  {selectedUserDetails.mobileNo || "Not Available"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <BusinessOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">Company Name : </strong>{" "}
                  {selectedUserDetails.companyName || "Not Available"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <LocationOnOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">Address : </strong>{" "}
                  {selectedUserDetails.address || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <LocationCityOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">City : </strong>{" "}
                  {selectedUserDetails.city || "Not Available"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">State : </strong>{" "}
                  {selectedUserDetails.state || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PublicOutlinedIcon className="text-gray-600" />
                <p>
                  <strong className="text-sm">Country : </strong>{" "}
                  {selectedUserDetails.country || "Not Available"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <PinDropOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Pincode : </strong>{" "}
                  {selectedUserDetails.pinCode || "Not Available"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircleOutlineOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Status : </strong>{" "}
                  {selectedUserDetails.status === 1
                    ? "Active"
                    : selectedUserDetails.status === 0
                      ? "Inactive"
                      : "Not Available"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <KeyOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Domain : </strong>{" "}
                  {selectedUserDetails.domain || "Not Available"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SupportAgentOutlinedIcon className="text-gray-600" />
                <p>
                  <strong>Agent Limit : </strong>{" "}
                  {selectedUserDetails.agentLimit || "Not Available"}
                </p>
              </div>
            </div>
            {/* <div className="grid grid-cols-[auto_1fr] gap-1 items-start">
              <MiscellaneousServicesIcon className="text-gray-600 mt-1" />

              <p>
                <strong className="block mb-2">Allowed Services :</strong>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {allowedServices?.length ? (
                    allowedServices.map((ser) => (
                      <span
                        key={ser.id || ser.display_name}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md text-center"
                      >
                        {ser.display_name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 col-span-full">None</span>
                  )}
                </div>
              </p>
            </div> */}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user details...</p>
        )}
      </Dialog>
      {/* View User details End */}
    </>
  );
};

export default ManageUserTable;
