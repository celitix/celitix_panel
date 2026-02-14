import React, { useEffect, useState } from "react";
import moment from "moment";

// APIS
import { fetchUserSrno, getServices } from "@/apis/admin/admin";
import { getSummaryReport } from "@/apis/sms/sms";

// COMPONENTS
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { DataTable } from "@/components/layout/DataTable";
import UniversalButton from "@/components/common/UniversalButton";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";

const ManaegeUtilitReport = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [summaryType, setSummaryType] = useState("");
  const [dates, setDates] = useState({
    toDate: new Date(),
    fromDate: new Date(),
  });
  const [summaryReport, setSummaryReport] = useState([]);

  const getUserSrno = async () => {
    try {
      const res = await fetchUserSrno();
      setUserList(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await getServices();
      setServiceList(res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserSrno();
    fetchServices();
  }, []);

  const fetchSummaryReport = async () => {
    const payload = {
      fromDate: moment(dates.fromDate).format("YYYY-MM-DD"),
      toDate: moment(dates.toDate).format("YYYY-MM-DD"),
      summaryType: summaryType,
      campaignType: selectedCampaign,
      selectedUserId: selectedUser || "-1",
      serviceId: selectedService || "-1",
    };
    try {
      const res = await getSummaryReport(payload);
      setSummaryReport(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const userOption = userList.map((user) => ({
    label: user?.userName,
    value: user?.srNo,
  }));

  const serviceOption = serviceList?.map((service) => ({
    label: service?.servicename,
    value: service?.serviceid,
  }));

  const campaignOption = [
    { label: "Transactional", value: 1 },
    { label: "Promotional", value: 2 },
    { label: "International", value: 3 },
    { label: "date,sendingservice,new", value: "date,sendingservice,new" },
  ];

  const summaryTypeOption = [
    { label: "date,user", value: "date,user" },
    { label: "date,user,smstype", value: "date,user,smstype" },
    {
      label: "smstype,date,sendingId,new",
      value: "smstype,date,sendingId,new",
    },
    {
      label: "date,user,actual_sending,country",
      value: "date,user,actual_sending,country",
    },
  ];

  const columns = [
    { field: "srno", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "queuedate",
      headerName: "Queue Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "smscount",
      headerName: "SMS Count",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "pending",
      headerName: "Pending",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "failed",
      headerName: "Failed",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "blocked",
      headerName: "Blocked",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "sent",
      headerName: "Sent",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "delivered",
      headerName: "Delivered",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "not_delivered",
      headerName: "Not Delivered",
      flex: 1,
      minWidth: 120,
    },
  ];

  const rows = summaryReport.map((report, i) => ({
    id: i + 1,
    srno: i + 1,
    queuedate: report.queuedate,
    smscount: report.smscount,
    pending: report.pending,
    failed: report.failed,
    blocked: report.blocked,
    sent: report.sent,
    delivered: report.delivered,
    not_delivered: report.not_delivered,
  }));

  const columnTotals = summaryReport.reduce(
    (acc, report) => {
      acc.smscount += Number(report.smscount) || 0;
      acc.pending += Number(report.pending) || 0;
      acc.failed += Number(report.failed) || 0;
      acc.blocked += Number(report.blocked) || 0;
      acc.sent += Number(report.sent) || 0;
      acc.delivered += Number(report.delivered) || 0;
      acc.not_delivered += Number(report.not_delivered) || 0;

      return acc;
    },
    {
      smscount: 0,
      pending: 0,
      failed: 0,
      blocked: 0,
      sent: 0,
      delivered: 0,
      not_delivered: 0,
    },
  );

  return (
    <div>
      <div className="flex items-center justify-center text-xl font-semibold my-2 text-gray-700">
        Manage Utility Report
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-full md:w-56">
          <DropdownWithSearch
            label="User List"
            id="userList"
            name="userList"
            placeholder="Enter User Name"
            value={selectedUser}
            onChange={(option) => setSelectedUser(option)}
            options={userOption}
          />
        </div>
        <div className="w-full md:w-56">
          <DropdownWithSearch
            label="Service List"
            id="serviceList"
            name="serviceList"
            placeholder="Enter Service Name"
            value={selectedService}
            onChange={(option) => setSelectedService(option)}
            options={serviceOption}
          />
        </div>
        <div className="w-full md:w-56">
          <UniversalDatePicker
            label="From Date"
            id="fromDate"
            name="fromDate"
            placeholder="Enter From Date"
            value={dates.fromDate}
            onChange={(newValue) => setDates({ ...dates, fromDate: newValue })}
          />
        </div>
        <div className="w-full md:w-56">
          <UniversalDatePicker
            label="To Date"
            id="toDate"
            name="toDate"
            placeholder="Enter To Date"
            value={dates.toDate}
            onChange={(newValue) => setDates({ ...dates, toDate: newValue })}
          />
        </div>

        <div className="w-full md:w-56">
          <DropdownWithSearch
            label="Campaign List"
            id="campaignList"
            name="campaignList"
            placeholder="Campaign Name"
            value={selectedCampaign}
            onChange={(option) => setSelectedCampaign(option)}
            options={campaignOption}
          />
        </div>
        <div className="w-full md:w-56">
          <DropdownWithSearch
            label="Symmary Type"
            id="summaryType"
            name="summaryType"
            placeholder="Enter Summary Type"
            value={summaryType}
            onChange={(option) => setSummaryType(option)}
            options={summaryTypeOption}
          />
        </div>
        <div className="">
          <UniversalButton label="Search" onClick={fetchSummaryReport} />
        </div>
      </div>
      {summaryReport?.length > 0 && (
        <div className="flex flex-wrap items-end gap-4 my-4">
          <p className="text-sm font-semibold bg-gray-300 p-1 rounded-xl text-gray-700 flex justify-center px-2">
            Sms Count: {columnTotals.smscount}
          </p>
          <p className="text-sm font-semibold bg-gray-300 p-1 rounded-xl text-gray-700 flex justify-center px-2">
            Sent Count: {columnTotals.sent}
          </p>
          <p className="text-sm font-semibold bg-gray-300 p-1 rounded-xl text-gray-700 flex justify-center px-2">
            Pending Count: {columnTotals.pending}
          </p>
          <p className="text-sm font-semibold bg-gray-300 p-1 rounded-xl text-gray-700 flex justify-center px-2">
            Not delivered Count: {columnTotals.not_delivered}
          </p>
          <p className="text-sm font-semibold bg-gray-300 p-1 rounded-xl text-gray-700 flex justify-center px-2">
            Failed Count: {columnTotals.failed}
          </p>
          <p className="text-sm font-semibold bg-gray-300 p-1 rounded-xl text-gray-700 flex justify-center px-2">
            Delivered Count: {columnTotals.delivered}
          </p>
          <p className="text-sm font-semibold bg-gray-300 p-1 rounded-xl text-gray-700 flex justify-center px-2">
            Blocked Count: {columnTotals.blocked}
          </p>
        </div>
      )}

      <div className="my-4">
        <DataTable
          id="summaryReport"
          name="summaryReport"
          rows={rows}
          col={columns}
          getRowHeight={null}
        />
      </div>
    </div>
  );
};

export default ManaegeUtilitReport;

// fetchUserSrno - admin.js - dropdownwithsearch - map this api response
// getServices - admin.js- dropdownwithsearch - map this api response
// create two calendar - fromDate, toDate -
// campaignType - dropdown - Transactional - 1, promotional - 2, international - 3, date,sendingservice,new
// summaryType - dropdown - date,user|| date,user,smstype || smstype,date,sendingId,new || date,user,actual_sending,country

// sample payload getSummaryReport
// {
//     "fromDate": "2026-02-13",
//     "toDate": "2026-02-13",
//     "summaryType": "date,user,actual_sending,country",
//     "campaignType": "date,sendingservice,new",
//     "selectedUserId": "-1",
//     "serviceId": "-1"
// }
// getSummaryReport - sms.js -

// table columns - s.no, QueDate, SMS Count, SMS Units, Pending, Failed, Blocked, Sent, Delivered, Undelivered, Pending DR
