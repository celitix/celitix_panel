import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import moment from "moment";

// ICONS
import { IoSearch } from "react-icons/io5";

// COMPONENTS
import UniversalButton from '@/components/common/UniversalButton';
import AnimatedDropdown from '@/whatsapp/components/AnimatedDropdown';
import UniversalDatePicker from '@/whatsapp/components/UniversalDatePicker';
import DayWiseSummaryTableSms from '../components/DayWiseSummaryTableSms';
import DropdownWithSearch from '@/whatsapp/components/DropdownWithSearch';

// API
import { getSummaryReport } from '@/apis/sms/sms';
import { fetchUserSrno, getSMPP } from '@/apis/admin/admin';

// CONTEXT
import { useUser } from '@/context/auth';


const SummaryUtilityReport = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [rows, setRows] = useState([]);

  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [smppList, setSmppList] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  //fetchAllUsersDetails
  useEffect(() => {
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
        // console.log(e);
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllUsersDetails();
  }, [user.role]);

  async function handleFetchSmppDetails() {
    setIsFetching(true);
    try {
      const res = await getSMPP();
      if (Array.isArray(res)) {
        const mapped = res.map((item) => ({
          label: item.serviceName,
          value: item.serviceId,
        }));
        setSmppList(mapped);
      } else {
        toast.error("Invalid SMPP response");
      }
    } catch (e) {
      console.error("Error fetching SMPP details:", e);
      toast.error("Error fetching SMPP details");
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    handleFetchSmppDetails();
  }, []);

  //day wise State
  const [daywiseDataToFilter, setDaywiseDataToFilter] = useState({
    summaryType: "date,user",
    smsType: "-1",
    fromDate: new Date(),
    toDate: new Date(),
    selectOption: "daywise",
  });

  const campaignType = [
    { label: "Transactional", value: "1" },
    { label: "Promotional", value: "2" },
    { label: "International", value: "3" },
    { label: "date,sendingservice,new", value: "date,sendingservice,new" },
  ];

  const summaryOptions = [
    { label: "Date And User", value: "date,user" },
    { label: "Date, user & smstype", value: "date,user,smstype" },
    // { label: "Date, SendingService and New", value: "date,sendingservice,new" },
    { label: "Date, SendingId and New", value: "date,sendingId,new" },
    { label: "Date, User, Actual Sending and Country", value: "date,user,actual_sending,country" },
  ];

  const handleDayWiseSummary = async () => {
    // if (!selectedUser) {
    //   toast.error("Please select a user first.");
    //   return;
    // }

    const fromDate = moment(daywiseDataToFilter.fromDate).isValid()
      ? moment(daywiseDataToFilter.fromDate).format("YYYY-MM-DD")
      : "";

    const toDate = moment(daywiseDataToFilter.toDate).isValid()
      ? moment(daywiseDataToFilter.toDate).format("YYYY-MM-DD")
      : "";
    const data = {
      // ...daywiseDataToFilter,
      // fromDate: moment(daywiseDataToFilter.fromDate).format("YYYY-MM-DD"),
      // toDate: moment(daywiseDataToFilter.toDate).format("YYYY-MM-DD"),
      fromDate,
      toDate,
      summaryType: daywiseDataToFilter.summaryType ?? "",
      campaignType: daywiseDataToFilter.smsType || "-1",
      selectedUserId: selectedUser || "-1",
      serviceId: selectedService || "-1",
    };

    try {
      setIsFetching(true);
      const res = await getSummaryReport(data);
      setRows(
        Array.isArray(res)
          ? res.map((item, i) => ({
            id: i + 1,
            sn: i + 1,
            ...item,
          }))
          : []
      );
    } catch (e) {
      // console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <div className="w-full">
      <h1 className="flex justify-center items-center font-semibold text-2xl text-gray-700">
        Summary Utility Report
      </h1>
      <div className="flex flex-wrap items-end w-full gap-2 mt-5">
        <div className="w-full sm:w-56">
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
              }))
            }
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Select User"
          />
        </div>
        <div className="w-full sm:w-56">
          <DropdownWithSearch
            id="serviceId"
            name="service"
            label="Select Service"
            tooltipContent="Select service to filter data"
            tooltipPlacement="right"
            value={selectedService}
            onChange={(val) => setSelectedService(val)}
            options={smppList}
            placeholder="Select service"
          />
        </div>
        <div className="w-full sm:w-56">
          <UniversalDatePicker
            label="From Date"
            id="summaryfromDate"
            name="summaryfromDate"
            value={daywiseDataToFilter.fromDate}
            onChange={(e) => {
              setDaywiseDataToFilter((prev) => ({
                ...prev,
                fromDate: e,
              }));
            }}
          />
        </div>
        <div className="w-full sm:w-56">
          <UniversalDatePicker
            label="To Date"
            id="summarytodate"
            name="summarytodate"
            value={daywiseDataToFilter.toDate}
            onChange={(e) => {
              setDaywiseDataToFilter((prev) => ({
                ...prev,
                toDate: e,
              }));
            }}
          />
        </div>
        <div className="w-full sm:w-56">
          <DropdownWithSearch
            label="Campaign Type"
            id="type"
            name="type"
            options={campaignType}
            value={daywiseDataToFilter.smsType}
            placeholder="Select Type"
            onChange={(value) => {
              setDaywiseDataToFilter((prev) => ({
                ...prev,
                smsType: value,
              }));
            }}
            disabled={daywiseDataToFilter.selectOption === 1}
          />
        </div>
        <div className="w-full sm:w-56">
          <DropdownWithSearch
            label="Summary Type"
            id="summaryType"
            name="summaryType"
            options={summaryOptions}
            value={daywiseDataToFilter.summaryType}
            placeholder="Select Summary Type"
            onChange={(value) => {
              setDaywiseDataToFilter((prev) => ({
                ...prev,
                summaryType: value,
              }));
            }}
            disabled={daywiseDataToFilter.selectOption === 1}
          />
        </div>
        <div className="w-max-content">
          <UniversalButton
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
            id="summaryshow"
            name="summaryshow"
            variant="primary"
            onClick={handleDayWiseSummary}
            disabled={isFetching}
          />
        </div>
      </div>
      <div className="w-full mt-5">
        <DayWiseSummaryTableSms
          id="DayWiseSummaryTableSms"
          name="DayWiseSummaryTableSms"
          data={rows}
        // selectedUser={selectedUser}
        />
      </div>
    </div>
  )
}

export default SummaryUtilityReport