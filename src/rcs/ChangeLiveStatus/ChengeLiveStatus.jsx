import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import toast from "react-hot-toast";
import moment from "moment";

// COMPONENTS
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";

// API
import { changeRcsLiveStatus } from "@/apis/rcs/rcs";
import { fetchUserSrno } from "@/apis/admin/admin";

const ChengeLiveStatus = () => {
  const [isFetching, setIsFetching] = useState(false);

  // dropdown states
  const [selectedService, setSelectedService] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedFromStatus, setSelectedFromStatus] = useState(null);
  const [selectedToStatus, setSelectedToStatus] = useState(null);

  // calendar states
  const [fromData, setFromData] = useState({ time: null });
  const [toData, setToData] = useState({ time: null });
  const selectedUserObj = allUsers.find((u) => u.srNo === selectedUser);

  useEffect(() => {
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
    fetchAllUsersDetails();
  }, []);
  // static dropdown data
  const serviceOptions = [
    { label: "RCS Campaign Message", value: "rcsCampaignMsg" },
    { label: "RCS Sent Message", value: "rcsSentMsg" },
    { label: "WhatsApp", value: "whatsapp" },
  ];

  const fromstatusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Busy", value: "busy" },
    // { label: "Active", value: "active" },
    // { label: "Blocked", value: "block" },
    // { label: "Paused", value: "paused" },
  ];

  const tostatusOptions =
    selectedFromStatus === "pending"
      ? [{ label: "Failed", value: "failed" }]
      : [{ label: "Pending", value: "pending" }];

  // function formatDateTime(date) {
  //   if (!date) return "";
  //   const d = new Date(date);
  //   const year = d.getFullYear();
  //   const month = String(d.getMonth() + 1).padStart(2, "0");
  //   const day = String(d.getDate()).padStart(2, "0");
  //   const hours = String(d.getHours()).padStart(2, "0");
  //   const minutes = String(d.getMinutes()).padStart(2, "0");
  //   const seconds = String(d.getSeconds()).padStart(2, "0");
  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // }

  // ---- handle save ----
  async function handleSave() {
    if (
      !selectedService ||
      !selectedUser ||
      !selectedFromStatus ||
      !selectedToStatus ||
      !fromData.time ||
      !toData.time
    ) {
      toast.error(" Please fill all fields before saving.");
      return;
    }

    const payload = {
      service: selectedService,
      userSrno: selectedUser,
      fromStatus: selectedFromStatus,
      toStatus: selectedToStatus,
      fromTime: moment(fromData.time).format("YYYY-MM-DD"),
      toTime: moment(toData.time).format("YYYY-MM-DD"),
    };

    console.log(" Payload:", payload);

    setIsFetching(true);
    try {
      const res = await changeRcsLiveStatus(payload);

      if (!res?.status) {
        toast.error(res?.msg || "Failed to update live status");
        return;
      }
      toast.success(res?.msg);

      // reset all fields
      setSelectedService(null);
      setSelectedUser(null);
      setSelectedFromStatus(null);
      setSelectedToStatus(null);
      setFromData({ time: null });
      setToData({ time: null });
    } catch (err) {
      console.error(" API Error:", err);
      toast.error("Something went wrong while updating live status.");
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="w-full space-y-4 bg-white p-5 rounded-2xl">
      {/* Row 1 - Service & User */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
        <DropdownWithSearch
          label="Choose Service"
          tooltipContent="Select Service"
          options={serviceOptions}
          value={selectedService}
          onChange={setSelectedService}
          placeholder="Select Service"
          filter
        />

        <DropdownWithSearch
          label="Select User"
          tooltipContent="Select User"
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
          filter
        />
      </div>

      {/* Row 2 - From & To Status */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
        <DropdownWithSearch
          label="From Status"
          tooltipContent="Select Current Status"
          options={fromstatusOptions}
          value={selectedFromStatus}
          onChange={setSelectedFromStatus}
          placeholder="Select Status"
          filter
        />

        <DropdownWithSearch
          label="To Status"
          tooltipContent="Select Target Status"
          options={tostatusOptions}
          value={selectedToStatus}
          onChange={setSelectedToStatus}
          placeholder="Select Status"
          filter
        />

        <div className="w-full">
          <UniversalLabel text="From Date" />
          <Calendar
            value={fromData.time}
            onChange={(e) => setFromData({ time: e.value })}
            showTime
            hourFormat="12"
            minDate={new Date()}
            dateFormat="dd/mm/yy"
            className="w-full"
            placeholder="yyyy-mm-dd hh:mm:ss"
          />
        </div>
        <div className="w-full">
          <UniversalLabel text="To Date" />
          <Calendar
            value={toData.time}
            onChange={(e) => setToData({ time: e.value })}
            showTime
            hourFormat="12"
            minDate={new Date()}
            dateFormat="dd/mm/yy"
            className="w-full"
            placeholder="yyyy-mm-dd hh:mm:ss"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <UniversalButton
          label={isFetching ? "Saving..." : "Save"}
          onClick={handleSave}
          disabled={isFetching}
        />
      </div>
    </div>
  );
};

export default ChengeLiveStatus;
