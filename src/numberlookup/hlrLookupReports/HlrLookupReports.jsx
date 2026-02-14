import React, { useState, useEffect } from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { Box, Tab } from "@mui/material";
import moment from "moment";
import toast from "react-hot-toast";

// ICONS 
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { IoSearch } from "react-icons/io5";

// APIS 
import { fetchUserSrno } from "@/apis/admin/admin";
import { hlrLookupReport } from "@/apis/HlrLookup/HlrLookup";

// COMPONENTS 
import LookUpReportTable from "./components/LookUpReportTable";
import DayWiseHLRSummary from "./components/DayWiseHLRSummary";
import InputField from "@/components/layout/InputField";
import {
  a11yProps,
  CustomTabPanel,
} from "@/whatsapp/managetemplate/components/CustomTabPanel";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import DropdownWithSearch from "@/admin/components/DropdownWithSearch";

// CONTEXT 
import { useUser } from "@/context/auth";

const HlrLookupReports = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [lookupReportTableData, setLookupReportTableData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const { user } = useUser();

  useEffect(() => {
    //fetchAllUsersDetails
    if (user.role === "RESELLER") {
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
    }
  }, []);

  const [tableParams, setTableParams] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    mobileNo: null,
  });

  const handleLookupReportSearch = async () => {
    try {
      if (user.role === "RESELLER" && !selectedUser) {
        toast.error("Please select a user first.");
        return;
      }
      setIsFetching(true);
      const payload = {
        fromdate: moment(tableParams.fromDate).format("YYYY-MM-DD"),
        todate: moment(tableParams.toDate).format("YYYY-MM-DD"),
        mobileno: tableParams.mobileNo || "",
        userSrNo: selectedUser || 0,
      };

      const res = await hlrLookupReport(payload);
      setLookupReportTableData(res);
    } catch (err) {
      console.error("Error fetching LookupReport data:", err);
      setLookupReportTableData([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      handleLookupReportSearch();
    }
  }, [
    // tableParams.fromDate,
    // tableParams.toDate,
    // tableParams.mobileNo,
    // selectedUser,
  ]);


  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex flex-wrap items-center justify-between pr-2">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="HLR LookUpReport Tabs"
          textColor="primary"
          indicatorColor="primary"
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          <Tab
            label={
              <span>
                <GradingOutlinedIcon size={20} /> HLR LookUp Report
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
          <Tab
            label={
              <span>
                <LibraryBooksOutlinedIcon size={20} /> DayWise HLR Summary
              </span>
            }
            {...a11yProps(1)}
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
        {user.role === "RESELLER" && (
          <div className="w-full sm:w-60 px-2 flex justify-end">
            <DropdownWithSearch
              id="manageuser"
              name="manageuser"
              label="Select User"
              tooltipContent="Select user you want to see reports"
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
          </div>
        )}

      </div>

      <CustomTabPanel value={value} index={0}>
        <div className="w-full">
          <div className="flex flex-wrap items-end w-full gap-2 mb-5">
            <div className="w-full sm:w-52">
              <UniversalDatePicker
                label="From Date"
                id="fromdate"
                name="fromdate"
                placeholder="Select Date"
                value={tableParams.fromDate}
                onChange={(date) =>
                  setTableParams((prev) => ({
                    ...prev,
                    fromDate: date,
                  }))
                }
                defaultValue={new Date()}
              />
            </div>
            <div className="w-full sm:w-52">
              <UniversalDatePicker
                label="To Date"
                id="todate"
                name="todate"
                placeholder="Select Date"
                value={tableParams.toDate}
                onChange={(date) =>
                  setTableParams((prev) => ({
                    ...prev,
                    toDate: date,
                  }))
                }
                defaultValue={new Date()}
              />
            </div>
            <div className="w-full sm:w-52">
              <InputField
                label="Mobile Number"
                id="mobilenumber"
                name="mobilenumber"
                placeholder="Enter Mobile Number"
                value={tableParams.mobileNo}
                onChange={(e) =>
                  setTableParams((prev) => ({
                    ...prev,
                    mobileNo: e.target.value,
                  }))
                }
              />
            </div>

            <div className="w-full sm:w-52 flex gap-2">
              <div className="mt-5">
                <UniversalButton
                  variant="outlined"
                  color="primary"
                  label={isFetching ? "Searching..." : "Search"}
                  id="hlrsearch"
                  name="hlrsearch"
                  onClick={handleLookupReportSearch}
                  icon={<IoSearch />}
                  disabled={isFetching}
                />
              </div>
              {/* <div className="mt-5 ml-5 md:ml-0">
                <UniversalButton
                  label={"Export"}
                  id="exportCampaign"
                  name="exportCampaign"
                  variant="primary"
                  icon={
                    <IosShareOutlinedIcon
                      sx={{ marginBottom: "3px", fontSize: "1.1rem" }}
                    />
                  }
                />
              </div> */}
            </div>
          </div>
          <div className="w-full ">
            <LookUpReportTable data={lookupReportTableData} />
          </div>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <div className="w-full">

          <DayWiseHLRSummary selectedUser={selectedUser} />

        </div>
      </CustomTabPanel>
    </Box>
  );
}

export default HlrLookupReports
