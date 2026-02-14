import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
// import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MultiSelect } from "primereact/multiselect";
import toast from "react-hot-toast";
import {
  Drawer,
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { Chip } from "@mui/material";

// ICONS
import { IoSearch } from "react-icons/io5";
import { BsJournalArrowDown } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Coins, Search, User } from "lucide-react";
import {
  AccountCircle,
  MonetizationOn,
  Close,
  Loop,
} from "@mui/icons-material";

// CONTEXT
import { useUser } from "@/context/auth";

// APIS
import { dailyWalletUsage, fetchTransactions } from "@/apis/settings/setting";
import { fetchUserSrno, getUsersBalance } from "@/apis/admin/admin";

// COMPONENTS
import InputField from "@/components/layout/InputField";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import TransactionsHistoryTable from "./components/TransactionsHistoryTable";
import TransactionsSummaryTable from "./components/TransactionsSummaryTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import { DataTable } from "@/components/layout/DataTable";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import { exportToExcel } from "@/utils/utills";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip open placement="top" title={`₹${value.toLocaleString()}`}>
      {children}
    </Tooltip>
  );
}

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Transactions = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { user } = useUser();

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [open, setOpen] = useState(false);
  const [balances, setBalances] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [balanceFilter, setBalanceFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const MIN = 0;
  const MAX = 300000;

  const [range, setRange] = useState([MIN, MAX]);

  const marks = [
    { value: 0, label: "0" },
    { value: 50000, label: "₹50K" },
    { value: 100000, label: "₹1L" },
    { value: 150000, label: "₹1.5L" },
    { value: 200000, label: "₹2L" },
    { value: 250000, label: "₹2.5L" },
    { value: 300000, label: "₹3L" },
  ];

  const handleMarkClick = (e) => {
    console.log(e);
    const label = e.target.closest(".MuiSlider-markLabel, .MuiSlider-mark");
    if (!label) return;

    // Find mark value from label text
    const clickedMark = marks.find(
      (m) =>
        label.textContent?.includes(m.label.replace("₹", "")) ||
        label.getAttribute("data-index") !== null,
    );

    if (!clickedMark) return;

    setRange(([min, max]) => {
      // Move nearest thumb
      return Math.abs(clickedMark.value - min) <
        Math.abs(clickedMark.value - max)
        ? [clickedMark.value, max]
        : [min, clickedMark.value];
    });
  };

  const balanceFilters = [
    { label: "All", value: "all" },
    { label: "< ₹1K", value: "1000" },
    { label: "< ₹5K", value: "5000" },
    { label: "< ₹10K", value: "10000" },
    { label: "< ₹50K", value: "50000" },
  ];

  const roleFilters = [
    { label: "All", value: "all" },
    { label: "Reseller User", value: "reselleruser" },
    { label: "Reseller", value: "reseller" },
    { label: "Direct User", value: "directuser" },
    // { label: "Accounts", value: "accountuser" },
    // { label: "Sales Person", value: "salesperson" },
  ];

  //fetchAllUsersDetails
  const fetchAllUsersDetails = async () => {
    const data = {
      userSrNo: "-1",
      date: "",
    };
    try {
      setIsFetching(true);
      const res = await fetchUserSrno(data);
      if (res?.msg) {
        toast.error(res.msg);
        setAllUsers([]);
        return;
      }
      const defaultOption = {
        userName: "ALL",
        srNo: "-1",
      };

      const sortedData = res
        .slice()
        .sort((a, b) => a.userName.localeCompare(b.userName));

      setAllUsers([defaultOption, ...sortedData]);
    } catch (e) {
      console.log(e);
      toast.error(e?.msg || "Something went wrong! Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  const fetchUsersBalance = async () => {
    try {
      setIsFetching(true);
      const res = await getUsersBalance();
      const data = Array.isArray(res?.data) ? res.data : [];
      setBalances(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch balances");
    } finally {
      setIsFetching(false);
    }
  };

  const handleRefresh = async () => {
    setIsFetching(true);
    try {
      await fetchUsersBalance();
      toast.success("Data refreshed");
    } catch (e) {
      toast.error(e, "Something went wrong while fetching users-balance");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (
      user.role === "SALESPERSON" ||
      user.role === "ACCOUNTUSER"
    ) {
      fetchAllUsersDetails();
      fetchUsersBalance();
    }
  }, [user.role]);

  const parseBalanceNumber = (b) => {
    const n = Number(b);
    return Number.isFinite(n) ? n : 0;
  };

  const filteredUsers = useMemo(() => {
    const q = search?.toString().trim().toLowerCase();

    return balances.filter((user) => {
      // Role filter
      if (roleFilter !== "all") {
        const roleVal = (user.role || "").toString().toLowerCase();
        if (roleFilter === "reselleruser") {
          if (
            !roleVal.includes("reselleruser") &&
            !roleVal.includes("reseller_user")
          )
            return false;
        } else {
          if (!roleVal.includes(roleFilter)) return false;
        }
      }

      // Balance filter
      if (balanceFilter !== "all") {
        const cutoff = Number(balanceFilter);
        const bal = parseBalanceNumber(user.balance);
        // if (!(bal > cutoff)) return false;
        if (!(bal <= cutoff)) return false;
      }

      // Balance range filter
      const [minVal, maxVal] = range;

      if (minVal !== MIN || maxVal !== MAX) {
        const bal = parseBalanceNumber(user.balance);
        if (bal < minVal || bal > maxVal) return false;
      }

      // Search across userSrNo, userName, balance, role
      if (!q) return true;

      const sr = String(user.userSrNo || "").toLowerCase();
      const name = String(user.userName || "").toLowerCase();
      const firstName = String(user.firstName || "").toLowerCase();
      const lastName = String(user.lastName || "").toLowerCase();
      const balStr = String(user.balance ?? "").toLowerCase();
      const role = String(user.role || "").toLowerCase();

      return (
        sr.includes(q) ||
        name.includes(q) ||
        firstName.includes(q) ||
        lastName.includes(q) ||
        balStr.includes(q) ||
        role.includes(q)
      );
    });
  }, [balances, search, balanceFilter, roleFilter, range]);

  const totalBalance = balances.reduce(
    (sum, user) => sum + Number(user.balance || 0),
    0,
  );

  const totalFilteredBalance = filteredUsers.reduce(
    (sum, user) => sum + Number(user.balance || 0),
    0,
  );

  const highlightMatch = (text, query) => {
    if (text === null || text === undefined) return <>{""}</>;
    const str = String(text);
    if (!query) return <>{str}</>;

    // Escape regex chars
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = str.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-300 text-black rounded">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  };

  const [filterData, setFilterData] = useState({
    rechargeType: 0,
    toDate: new Date(),
    startDate: new Date(),
  });

  const [transactionalData, setTransactionalData] = useState([]);

  const handleSearch = async () => {
    if (
      user.role === "SALESPERSON" ||
      user.role === "ACCOUNTUSER"
    ) {
      if (!selectedUser) return toast.error("Please select a user first.");
    }

    try {
      setIsFetching(true);
      const data = {
        ...filterData,
        startDate: moment(filterData.startDate).format("YYYY-MM-DD"),
        toDate: moment(filterData.toDate).format("YYYY-MM-DD"),
        userSrNo: selectedUser || "0",
      };
      const res = await fetchTransactions(data);
      setTransactionalData(res);
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setIsFetching(false);
    }
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 10 },
    { field: "user", headerName: "UserName", flex: 1, minWidth: 120 },
    {
      field: "rechargeDate",
      headerName: "Recharge Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "before",
      headerName: "Amount Before",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "amount",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "after",
      headerName: "Amount After",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "type",
      headerName: "Recharge Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "gst",
      headerName: "Gst Amount",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "balance",
      headerName: "Amount Recharged",
      flex: 1,
      minWidth: 120,
    },
    { field: "remark", headerName: "Remarks", flex: 1, minWidth: 120 },
  ];

  const rows = Array.isArray(transactionalData)
    ? transactionalData
        .sort(
          (a, b) =>
            moment(b.rechargeDate, "DD-MM-YYYY").toDate() -
            moment(a.rechargeDate, "DD-MM-YYYY").toDate(),
        )
        .map((item, index) => ({
          ...item,
          sn: index + 1,
          id: index + 1,
          balance: Number(item.balance).toFixed(2),
        }))
    : [];

  const type = [
    { value: "Credit", label: "Credit" },
    { value: "Debit", label: "Debit" },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  function handleExport() {
    // columns
    if (!rows.length) return toast.error("No data to download");
    const col = columns.map((col) => col.field);

    const row = rows.map((row) => col.map((field) => row[field] ?? ""));

    const name = "Transaction Data";
    exportToExcel(col, row, name);
    toast.success("File Downloaded Successfully");
  }

  function handleExportWalletUsage() {
    // columns
    if (!walletusagerows.length) return toast.error("No data to download");
    const col = walletusagecolumns.map((col) => col.field);

    const row = walletusagerows.map((row) =>
      col.map((field) => row[field] ?? ""),
    );

    const name = "wallet_usage_data";
    exportToExcel(col, row, name);
    toast.success("File Downloaded Successfully");
  }

  const [filterDataWalletUsage, setFilterDataWalletUsage] = useState({
    // rechargeType: 0,
    endDate: new Date(),
    startDate: new Date(),
  });

  const [walletUsageData, setWalletUsageData] = useState([]);
  const walletusagecolumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 100 },
    { field: "recordDate", headerName: "Date", width: 300 },
    { field: "walletUsage", headerName: "Wallet Usage (₹)", width: 300 },
  ];

  const dailyAmountUsage = async () => {
    const payload = {
      fromDate: moment(filterDataWalletUsage.startDate).format("YYYY-MM-DD"),
      toDate: moment(filterDataWalletUsage.endDate).format("YYYY-MM-DD"),
    };

    setIsLoading(true);
    try {
      const response = await dailyWalletUsage(payload);
      setWalletUsageData(response.data || []);
    } catch (error) {
      console.error("Error daily wallet usage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const walletusagerows = Array.isArray(walletUsageData)
    ? walletUsageData.map((item, index) => ({
        ...item,
        sn: index + 1,
        id: index + 1,
        recordDate: item.recordDate,
        walletUsage: item.walletUsage,
      }))
    : [];

  // useEffect(() => {
  //   dailyAmountUsage();
  // }, [filterDataWalletUsage.startDate, filterDataWalletUsage.endDate]);

  return (
    <div className="w-full ">
      <Box sx={{ width: "100%" }}>
        <div className="flex items-center justify-between px-3">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Manage Transactions Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label={
                <span className="flex items-center gap-2">
                  <AccountBalanceWalletOutlinedIcon fontSize="small" />{" "}
                  Transaction History
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            {/* <Tab
              label={
                <span className="flex items-center gap-2">
                  <BsJournalArrowDown size={18} /> wallet Usage
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            /> */}
          </Tabs>
          {(user.role === "SALESPERSON" ||
            user.role === "ACCOUNTUSER") && (
            <div className="flex items-end justify-end gap-5">
              <div className="w-full sm:w-54">
                <DropdownWithSearch
                  id="manageuser"
                  name="manageuser"
                  label="Select User"
                  tooltipContent="Select user you want to see reports"
                  tooltipPlacement="right"
                  options={allUsers.map((user) => ({
                    label: user.userName,
                    value: user.srNo,
                  }))}
                  value={selectedUser}
                  onChange={setSelectedUser}
                  placeholder="Select User"
                />
              </div>
              <div className="w-max-content">
                <UniversalButton
                  id="showUsersBalanceBtn"
                  name="showUsersBalanceBtn"
                  label="Show User Balances"
                  icon={<Coins />}
                  variant="primary"
                  onClick={() => {
                    setOpen(true);
                    fetchUsersBalance();
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <CustomTabPanel value={value} index={0} className="">
          <div className="w-full">
            <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex-wrap">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="transactionshistoryfrom"
                  name="transactionshistoryfrom"
                  label="From Date"
                  defaultValue={new Date()}
                  // placeholder="Pick a start date"
                  tooltipContent="Select the starting date for your project"
                  tooltipPlacement="right"
                  errorText="Please select a valid date"
                  value={setFilterData.startDate}
                  onChange={(newValue) => {
                    setFilterData({
                      ...filterData,
                      startDate: newValue,
                    });
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="transactionshistoryto"
                  name="transactionshistoryto"
                  label="To Date"
                  // placeholder="Pick a start date"
                  tooltipContent="Select the starting date for your project"
                  tooltipPlacement="right"
                  errorText="Please select a valid date"
                  value={setFilterData.toDate}
                  defaultValue={new Date()}
                  onChange={(newValue) => {
                    setFilterData({
                      ...filterData,
                      toDate: newValue,
                    });
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <DropdownWithSearch
                  id="transactionshistorytype"
                  name="transactionshistorytype"
                  label="Type"
                  tooltipContent="Select type"
                  tooltipPlacement="right"
                  options={[
                    { value: 0, label: "All" },
                    { value: 1, label: "Recharge" },
                    { value: 3, label: "Credit" },
                    { value: 4, label: "Debit" },
                  ]}
                  placeholder="Type"
                  value={filterData.rechargeType}
                  onChange={(value) => {
                    setFilterData({
                      ...filterData,
                      rechargeType: value,
                    });
                  }}
                />
              </div>
              <div className="w-max-content ">
                <UniversalButton
                  id="manageCampaignSearchBtn"
                  name="manageCampaignSearchBtn"
                  label={isFetching ? "Searching..." : "Search"}
                  icon={<IoSearch />}
                  onClick={handleSearch}
                  variant="primary"
                  disabled={isFetching}
                />
              </div>
              <div className="w-max-content">
                <UniversalButton
                  id="manageCampaignExportBtn"
                  name="manageCampaignExportBtn"
                  label="Export"
                  icon={
                    <IosShareOutlinedIcon
                      fontSize="small"
                      sx={{ marginBottom: "3px" }}
                    />
                  }
                  variant="primary"
                  onClick={handleExport}
                />
              </div>
            </div>
            {isFetching ? (
              <div className="">
                <UniversalSkeleton height="35rem" width="100%" />
              </div>
            ) : (
              <div className="w-full">
                <DataTable
                  id="transactionshistorytable"
                  name="transactionshistorytable"
                  col={columns}
                  rows={rows}
                  getRowHeight={null}
                />
              </div>
            )}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="w-full">
            <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="walletUsage"
                  name="walletUsage"
                  label="From Date"
                  defaultValue={new Date()}
                  // value={startsDate}
                  // onChange={(e) => setStartsDate(e.target.value)}
                  placeholder="Pick a start date"
                  value={setFilterDataWalletUsage.startDate}
                  onChange={(newValue) => {
                    setFilterDataWalletUsage({
                      ...filterDataWalletUsage,
                      startDate: newValue,
                    });
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="walletUsage"
                  name="walletUsage"
                  label="To"
                  placeholder="Pick a start date"
                  defaultValue={new Date()}
                  // value={endsDate}
                  // onChange={(e) => setEndsDate(e.target.value)}
                  value={setFilterDataWalletUsage.endDate}
                  onChange={(newValue) => {
                    setFilterDataWalletUsage({
                      ...filterDataWalletUsage,
                      endDate: newValue,
                    });
                  }}
                />
              </div>
              <div className="w-max-content">
                <UniversalButton
                  id="walletUsage"
                  name="walletUsage"
                  label={isFetching ? "Searching..." : "Search"}
                  icon={<IoSearch />}
                  onClick={dailyAmountUsage}
                  variant="primary"
                  disabled={isFetching}
                />
              </div>
              <div className="w-max-content">
                <UniversalButton
                  id="manageCampaignExportBtn"
                  name="manageCampaignExportBtn"
                  label="Export"
                  icon={
                    <IosShareOutlinedIcon
                      fontSize="small"
                      sx={{ marginBottom: "3px" }}
                    />
                  }
                  variant="primary"
                  onClick={handleExportWalletUsage}
                />
              </div>
            </div>

            {isFetching ? (
              <div className="">
                <UniversalSkeleton height="35rem" width="100%" />
              </div>
            ) : (
              <div className="w-full">
                <DataTable
                  id="walletusage"
                  name="walletusage"
                  col={walletusagecolumns}
                  rows={walletusagerows}
                  getRowHeight={null}
                />
              </div>
            )}
          </div>
        </CustomTabPanel>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 500 }, padding: 2 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <div className="text-lg font-medium text-gray-800">
            <span className="bg-green-500 text-center px-3 rounded-full text-white mr-2 inline-block">
              ₹
            </span>
            User Balances
          </div>
          <div className="flex items-center gap-2">
            <CustomTooltip title={"Refresh Data"} placement="top" arrow>
              <IconButton
                onClick={handleRefresh}
                disabled={isFetching}
                size="small"
                className="border"
              >
                <motion.div
                  animate={isFetching ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    repeat: isFetching ? Infinity : 0,
                    duration: 1,
                    ease: "linear",
                  }}
                >
                  <Loop color={isFetching ? "primary" : "action"} />
                </motion.div>
              </IconButton>
            </CustomTooltip>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </div>
        </Box>

        {/* Search */}
        <div className="flex gap-2 items-center mb-2 relative">
          <div className="absolute left-2">
            <IoSearch className="text-xl" />
          </div>
          <InputField
            id="searchusers"
            name="searchusers"
            type="text"
            placeholder="Search userSrNo, username, balance, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 my-2 items-center justify-center">
          {balanceFilters.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              clickable
              color={balanceFilter === filter.value ? "primary" : "default"}
              variant={balanceFilter === filter.value ? "filled" : "outlined"}
              onClick={() => setBalanceFilter(filter.value)}
              sx={{
                fontWeight: 500,
                borderRadius: "9999px",
              }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 my-2 items-center justify-center">
          {roleFilters.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              clickable
              color={roleFilter === filter.value ? "primary" : "default"}
              variant={roleFilter === filter.value ? "filled" : "outlined"}
              onClick={() => setRoleFilter(filter.value)}
              sx={{ fontWeight: 500, borderRadius: "9999px" }}
            />
          ))}
        </div>

        <div className="flex justify-center items-center">
          <div className="w-100">
            <Slider
              value={range}
              min={MIN}
              max={MAX}
              onChange={(_, newValue) => setRange(newValue)}
              valueLabelDisplay="auto" // hover / drag only
              valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
              onClick={handleMarkClick}
              disableSwap
              marks={marks}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-700 my-3 font-medium gap-2">
          {/* Left section */}
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Total Users: <b>{balances.length}</b>
            </span>
            <span className="text-gray-500">
              | Showing: <b>{filteredUsers.length}</b>
            </span>
          </div>
          {balanceFilter !== "all" && (
            <span className="text-blue-600">
              {/* | Balances &gt; ₹{Number(balanceFilter).toLocaleString()} */}|
              Balances &le; ₹{Number(balanceFilter).toLocaleString()}
            </span>
          )}

          {/* Right section */}
          {/* <div className="text-green-600 font-semibold whitespace-nowrap">
                  Total Balance: ₹{totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div> */}
        </div>

        <Divider sx={{ mb: 1 }} />

        {/* User List */}
        <AnimatePresence mode="popLayout">
          {isFetching ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <UniversalSkeleton key={i} height="5rem" width="100%" />
              ))}
            </div>
          ) : balances.length === 0 ? (
            <div className="text-center flex items-center justify-center h-full text-gray-500 text-xl border rounded-xl font-medium">
              No users found. Please try searching with Sr. No, username or
              role.
            </div>
          ) : (
            <ul className="max-h-[80vh] overflow-y-auto divide-y divide-gray-100">
              {filteredUsers?.map((item, index) => (
                <motion.li
                  key={item.userSrNo ?? index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.01, delay: index * 0.01 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md mb-2"
                >
                  {/* Left side: avatar + text */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      {/* <span className="text-gray-900 font-semibold text-sm">
                              {highlightMatch(item.userName || "—", search)}
                            </span> */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border-r border-gray-400 pr-2">
                          <span className="text-gray-900 font-semibold text-sm">
                            {highlightMatch(item.userName || "—", search)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-900 font-semibold text-sm">
                            {highlightMatch(item.firstName || "—", search)}
                          </span>
                          <span className="text-gray-900 font-semibold text-sm">
                            {highlightMatch(item.lastName || "—", search)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap">
                        <span className="text-gray-500 text-xs">
                          Sr No: {highlightMatch(item.userSrNo ?? "", search)}
                        </span>
                        &nbsp;
                        <span className="text-gray-500 text-xs">|</span>
                        &nbsp;
                        <span className="text-gray-500 text-xs">
                          Role: {highlightMatch(item.role || "-", search)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side: balance */}
                  <span className="text-blue-500 font-semibold text-sm tracking-wider">
                    {highlightMatch(
                      `₹${parseFloat(item.balance ?? 0).toFixed(2)}`,
                      search,
                    )}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </Drawer>
    </div>
  );
};

export default Transactions;
