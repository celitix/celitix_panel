import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { MultiSelect } from "primereact/multiselect";

// MUI MATERIAL
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// ICONS
import { IoSearch } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsJournalArrowDown } from "react-icons/bs";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

// COMPONENTS
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import TransactionsHistoryTable from "./components/TransactionsHistoryTable";
import TransactionsSummaryTable from "./components/TransactionsSummaryTable";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import CustomTooltip from "../../components/common/CustomTooltip";
import { DataTable } from "../../components/layout/DataTable";
import InputField from "../../components/layout/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// API
import { fetchTransactions } from "../../apis/settings/setting";
import { fetchAllUsers, fetchUserSrno, getUsersBalance } from "@/apis/admin/admin";

// CONTEXT
import { useUser } from "@/context/auth";

// UTILS
import { exportToExcel } from "@/utils/utills";



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
const TransactionsUser = () => {
  const { user } = useUser();
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMultiHistory, setSelectedMultiHistory] = useState(null);
  const [selectedMultiSummary, setSelectedMultiSummary] = useState(null);
  const [selectedHistoryFrom, setSelectedHistoryFrom] = useState(null);
  const [selectedHistoryTo, setSelectedHistoryTo] = useState(new Date());
  const [selectedFromSummary, setselectedFromSummary] = useState(new Date());
  const [selectedToSummary, setselectedToSummary] = useState(new Date());
  const [selectedHistoryService, setSelectedHistoryService] = useState("");
  const [selectedHistoryType, setSelectedHistoryType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputValueMobileLogs, setInputValueMobileLogs] = useState("");
  const [selectedOptionServiceSummary, setSelectedOptionServiceSummary] =
    useState("");
  const [selectedOptionTypeSummary, setSelectedOptionTypeSummary] =
    useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("-1");

  const [filterData, setFilterData] = useState({
    rechargeType: 0,
    toDate: new Date(),
    startDate: new Date(),
  });
  const [transactionalData, setTransactionalData] = useState([]);

  useEffect(() => {
    //fetchAllUsersDetails
    const fetchAllUsersDetails = async () => {
      const data = {
        userSrno: "-1",
        date: "",
      };
      try {
        setIsFetching(true);
        const res = await fetchUserSrno(data);
        const defaultOption = {
          userName: "ALL",
          srNo: "-1",
        };

        const sortedData = res
          .slice()
          .sort((a, b) => a.userName.localeCompare(b.userName));
        const allUser = [defaultOption, ...sortedData];
        setAllUsers(allUser);
      } catch (e) {
        // console.log(e);
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllUsersDetails();
  }, [user.role]);

  const handleSearch = async () => {
    if (!selectedUser) return toast.error("Please select a user first.");
    try {
      const payload = {
        ...filterData,
        userSrNo: selectedUser,
        startDate: moment(filterData.startDate).format("YYYY-MM-DD"),
        toDate: moment(filterData.toDate).format("YYYY-MM-DD"),
      };
      setIsFetching(true);
      const res = await fetchTransactions(payload);
      setTransactionalData(res);
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setIsFetching(false);
    }
  };

  // useEffect(() => {
  //   handleSearch();
  // }, [selectedUser]);

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, width: 70 },
    { field: "user", headerName: "UserName", flex: 1, minWidth: 120 },
    {
      field: "rechargeDate",
      headerName: "Recharge Data",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "before",
      headerName: "Amount Before",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "balance",
      headerName: "Amount Recharged",
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
      field: "amount",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 120,
    },
    { field: "remark", headerName: "Remarks", flex: 1, minWidth: 120 },
  ];

  const rows = Array.isArray(transactionalData)
    ? transactionalData.map((item, index) => ({
      ...item,
      sn: index + 1,
      id: index + 1,
    }))
    : [];

  const type = [
    { value: "Credit", label: "Credit" },
    { value: "Debit", label: "Debit" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChangeMobileLogs = (e) => {
    setInputValueMobileLogs(e.target.value);
  };

  const handleShowSearch = async () => {
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsFetching(false);
    setFilteredData([]); // Reset data
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

  return (
    <div className="w-full">
      <Box sx={{ width: "100%" }}>
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="flex items-center justify-between px-3 mb-2">
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
            </Tabs>
          </div>
          <div className="flex items-center justify-end mx-2">
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
          </div>
        </div>
        <CustomTabPanel value={value} index={0} className="">
          <div className="w-full">
            <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex-wrap">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  id="transactionshistoryfrom"
                  name="transactionshistoryfrom"
                  label="From"
                  defaultValue={new Date()}
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
                  label="To"
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
                <AnimatedDropdown
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
                      sx={{ marginBottom: "3px", fontSize: "17px" }}
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
      </Box>
    </div>
  );
};

export default TransactionsUser;
