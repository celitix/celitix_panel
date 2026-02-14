import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import toast from "react-hot-toast";
import Lottie from "lottie-react";

// MUI MATERIAL
import CircularProgress from "@mui/material/CircularProgress";
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
import { Coins, Search, User } from "lucide-react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { AccountCircle, MonetizationOn, Close, Loop } from "@mui/icons-material";
import { IoSearch } from "react-icons/io5";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

// COMPONENTS
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import InputField from "@/components/layout/InputField";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import CustomTooltip from "@/components/common/CustomTooltip";

// ASSETS
import confirmAnimation from "@/assets/animation/confirmcheck.json";

// API
import { fetchAllUsers, fetchUserSrno, getUsersBalance } from "@/apis/admin/admin";
import { recharge } from "@/apis/recharge/recharge";

// CONTEXT
import { useUser } from "@/context/auth";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [gstAmount, setGstAmount] = useState("");
  const [includingGst, setIncludingGst] = useState("");
  const [excludingGst, setExcludingGst] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);
  const [remark, setRemark] = useState("");
  const [selectedRechargeType, setSelectedRechargeType] = useState("");
  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [open, setOpen] = useState(false);
  const [balances, setBalances] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [balanceFilter, setBalanceFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");


  const balanceFilters = [
    { label: "All", value: "all" },
    { label: "> ₹1K", value: "1000" },
    { label: "> ₹5K", value: "5000" },
    { label: "> ₹10K", value: "10000" },
    { label: "> ₹50K", value: "50000" },
  ];

  const roleFilters = [
    { label: "All", value: "all" },
    { label: "Reseller User", value: "reselleruser" },
    { label: "Reseller", value: "reseller" },
    { label: "Direct User", value: "directuser" },
    { label: "Accounts", value: "accountuser" },
    { label: "Sales Person", value: "salesperson" },
  ];

  const fetchAllUsersDetails = async () => {
    const data = { userSrno: "", date: "" };
    try {
      setIsFetching(true);
      const res = await fetchUserSrno(data);
      setAllUsers(res);
    } catch (e) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  // Fetch balances
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
      toast.error(e, "Something went wrong while fetching users-balance")
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsersBalance();
    fetchAllUsersDetails();
  }, []);

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
          if (!roleVal.includes("reselleruser") && !roleVal.includes("reseller_user"))
            return false;
        } else {
          if (!roleVal.includes(roleFilter)) return false;
        }
      }

      // Balance filter
      if (balanceFilter !== "all") {
        const cutoff = Number(balanceFilter);
        const bal = parseBalanceNumber(user.balance);
        if (!(bal > cutoff)) return false;
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
  }, [balances, search, balanceFilter, roleFilter]);

  const totalBalance = balances.reduce(
    (sum, user) => sum + Number(user.balance || 0),
    0
  );

  const totalFilteredBalance = filteredUsers.reduce(
    (sum, user) => sum + Number(user.balance || 0),
    0
  );

  useEffect(() => {
    const parsedAmount = parseFloat(amount);

    if (!isNaN(parsedAmount)) {
      if (selectedOption === "option1") {
        // Including GST means Amount is base, add 18%
        const gst = parsedAmount * 0.18;
        setGstAmount(gst.toFixed(2));
        setIncludingGst((parsedAmount + gst).toFixed(2));
      } else if (selectedOption === "option2") {
        setGstAmount(0);
        setExcludingGst(parsedAmount);
        setIncludingGst(parsedAmount.toFixed(2));
      }
    } else {
      setGstAmount("");
      setIncludingGst("");
      setExcludingGst("");
    }
  }, [amount, selectedOption]);

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
          )
        )}
      </>
    );
  };

  const handleSubmitRecharge = () => {
    if (!selectedUser) return toast.error("Please select a user.");
    if (!selectedRechargeType)
      return toast.error("Please select recharge type.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Enter a valid amount.");
    if (!remark.trim()) return toast.error("Remark is required.");
    setShowDialog(true);
  };

  const handleConfirmRecharge = async () => {
    setIsSubmitting(true);
    const payload = {
      selectedUserId: selectedUser,
      actualAmount: amount,
      amount: selectedOption === "option1" ? includingGst : excludingGst,

      rechargeType: selectedRechargeType,
      withGST: selectedOption === "option2" ? 0 : 1,
      ...(selectedOption !== "option2" && { gst: gstAmount }),
      remark: remark.trim(),
    };
    try {
      const res = await recharge(payload);
      if (res?.status === true) {
        setRechargeSuccess(true);
        toast.success(res.msg || "Recharge successful!");
        handleReset();
        fetchUsersBalance();
        setTimeout(() => {
          setShowDialog(false);
          setRechargeSuccess(false);
        }, 2000);
      } else {
        toast.error(res?.msg || "Recharge failed.");
      }
    } catch (error) {
      toast.error("Recharge failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAmount("");
    setGstAmount("");
    setIncludingGst("");
    setExcludingGst("");
    setSelectedUser("");
    setSelectedRechargeType("");
    setRemark("");
    // setSelectedOption("");
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 bg-white p-2.5 lg:p-5 rounded-xl">
        <div className="w-full py-2 lg:py-5 flex items-center md:justify-between justify-center flex-wrap gap-3">
          <div></div>
          <h1 className="text-xl font-semibold text-gray-700">
            Account Recharge Portal
          </h1>
          <div className="w-max-content">
            <UniversalButton
              id="showUsersBalanceBtn"
              name="showUsersBalanceBtn"
              label="Show User Balances"
              icon={<Coins />}
              variant="primary"
              onClick={() => {
                setOpen(true)
                fetchUsersBalance()
              }}
            />
          </div>
        </div>

        <div className="flex items-end gap-3 w-full md:flex-nowrap flex-wrap justify-center">
          <DropdownWithSearch
            id="manageuser"
            name="manageuser"
            label="Select User"
            tooltipContent="Select user you want to recharge"
            tooltipPlacement="right"
            options={allUsers
              .slice()
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((user) => ({
                label: user.userName,
                value: user.srNo,
              }))}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Select User"
          />
          <DropdownWithSearch
            id="rechargeType"
            name="rechargeType"
            label="Recharge Type"
            tooltipContent="Select recharge type"
            tooltipPlacement="right"
            options={[
              { value: "1", label: "Recharge" },
              { value: "3", label: "Credit" },
              { value: "4", label: "Debit" },
            ]}
            value={selectedRechargeType}
            onChange={setSelectedRechargeType}
            placeholder="Select Type"
          />
          <div className="flex items-end gap-2 w-max-content text-nowrap">
            <div className="cursor-pointer px-2 py-2 shadow border rounded-lg bg-white">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="radioOption1"
                  name="radioGroup"
                  value="option1"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === "option1"}
                />
                <label
                  htmlFor="radioOption1"
                  className="text-gray-700 font-medium text-sm"
                >
                  Including GST
                </label>
              </div>
            </div>
            {/* <div className="cursor-pointer px-2 py-2 shadow border rounded-lg bg-white">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="radioOption2"
                  name="radioGroup"
                  value="option2"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === "option2"}
                />
                <label
                  htmlFor="radioOption2"
                  className="text-gray-700 font-medium text-sm"
                >
                  Exclude GST
                </label>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex w-full gap-3 md:flex-nowrap flex-wrap">
          <InputField
            label="Amount"
            tooltipContent="Enter your amount of recharge"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          <InputField
            label="Remark"
            tooltipContent="remark"
            placeholder="Enter Remarks.."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        <div className="flex w-full gap-3 md:flex-nowrap flex-wrap">
          <InputField
            label="GST Amount"
            tooltipContent="Auto-calculated GST Amount"
            placeholder="GST Amount"
            value={gstAmount}
            onChange={(e) => setGstAmount(e.target.value)}
            readOnly
          />
          <InputField
            label={
              selectedOption === "option1"
                ? "Total Amount Including GST"
                : "Total Amount Exclude GST"
            }
            tooltipContent="Actual Amount of recharge"
            placeholder="Total Amount GST"
            value={selectedOption === "option1" ? includingGst : excludingGst}
            readOnly
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="flex flex-row gap-3 justify-center items-center">
            <UniversalButton
              id="fundsubmitbtn"
              name="obdvfundsubmitbtn"
              label="Submit"
              placeholder="Submit"
              onClick={handleSubmitRecharge}
            />
            <UniversalButton
              id="fundResetbtn"
              name="obdvfundResetbtn"
              label="Reset"
              placeholder="Reset"
              onClick={handleReset}
            />
          </div>
        </div>
      </div>

      <Dialog
        header={"Confirm Recharge"}
        visible={showDialog}
        style={{ width: "27rem" }}
        onHide={() => setShowDialog(false)}
        draggable={false}
      >
        {rechargeSuccess ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <Lottie
              animationData={confirmAnimation}
              loop={false}
              autoplay
              className="w-60 h-45"
            />
            <div className="mt-4 text-xl font-semibold text-green-600">
              Recharge Successful!
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <ErrorOutlineOutlinedIcon
                sx={{
                  fontSize: 64,
                  color: "red",
                }}
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-medium text-gray-800 leading-relaxed">
                Are you sure you want to recharge&nbsp;
                <span className="text-blue-700 font-semibold">
                  {allUsers.find((u) => u.srNo === selectedUser)?.userName || "None selected"}
                </span>
                &nbsp;with an amount of&nbsp;
                <span className="text-green-600 font-bold">₹{amount}</span>?
                <br />
                Please confirm to proceed.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                This action is irreversible.
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {!isSubmitting && (
                <UniversalButton
                  label="Cancel"
                  style={{
                    backgroundColor: "#090909",
                  }}
                  onClick={() => setShowDialog(false)}
                />
              )}
              <UniversalButton
                label={isSubmitting ? "Processing..." : "Confirm"}
                onClick={handleConfirmRecharge}
                disabled={isSubmitting}
              />
            </div>
          </>
        )}
      </Dialog>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 600 }, padding: 2 },
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
            <CustomTooltip
              title={"Refresh Data"}
              placement="top"
              arrow
            >
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
          <div className="absolute left-2" >
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

        {/* Summary */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-700 my-3 font-medium gap-2">
          {/* Left section */}
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Total Users: <b>{balances.length}</b>
            </span>
            <span className="text-gray-500">| Showing: <b>{filteredUsers.length}</b></span>
          </div>
          {balanceFilter !== "all" && (
            <span className="text-blue-600">
              | Balances &gt; ₹{Number(balanceFilter).toLocaleString()}
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
              No users found. Please try searching with Sr. No, username or role.
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
                          Role: {highlightMatch((item.role || "-"), search)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side: balance */}
                  <span className="text-blue-500 font-semibold text-sm tracking-wider">
                    {highlightMatch(`₹${parseFloat(item.balance ?? 0).toFixed(2)}`, search)}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </Drawer>
    </>
  );
};

export default Recharge;
