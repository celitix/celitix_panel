import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
// =========================================ICONS=====================================
import { Trash2, Search } from "lucide-react";
import ErrorIcon from "@mui/icons-material/Error";
import EditIcon from "@mui/icons-material/Edit";

// =======================================COMPONENTS==================================
import { DataTable } from "@/components/layout/DataTable";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/admin/components/InputField";
import DropdownWithSearch from "@/admin/components/DropdownWithSearch";

// =========================================APIS=======================================
import {
  getLeadSourceList,
  addLeadSource,
  updateLeadSourceStatus,
  deleteLeadSource,
  getUserAssignedLeadSoruceList,
  assignLeadSourceToUser,
  deleteUserLeadSourceService,
} from "@/apis/leadmanager/leadmanager";
import { fetchAllUsers, fetchUserSrno } from "@/apis/admin/admin";

// ========================================CONTEXT============================================
import { useUserAndAdminContext } from "@/context/UserAndAdminContext";

const LeadSource = () => {
  const [leadSourceList, setLeadSourceList] = useState([]);
  const [rows, setRows] = useState([]);
  const [sourceName, setSourceName] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [userAssignedList, setUserAssignedList] = useState([]);
  const [userRows, setUserRows] = useState([]);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userLeadSourceServiceDlt, setUserLeadSourceServiceDlt] =
    useState(false);
  const [deleteService, setDeleteService] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const navigate = useNavigate();

  //   ===========================================================GET LEAD DOURCE LIST FUNCTION START HERE ================================================

  const fetchLeadSourceList = async () => {
    try {
      const res = await getLeadSourceList();

      const formattedRows = res.data.map((item, index) => ({
        id: item.srNo,
        srNo: index + 1,
        sourceName: item.sourceName,
        status: item.status,
        insertTime: item.insertTime,
      }));

      setRows(formattedRows);
    } catch (error) {
      console.log("Error fetching lead source list:", error);
    }
  };

  useEffect(() => {
    fetchLeadSourceList();
  }, [refreshKey]);

  const statusMap = {
    1: { text: "Active", color: "bg-green-100 text-green-700" },
    0: { text: "Inactive", color: "bg-red-100 text-red-700" },
  };

  const leadSourceColumns = [
    {
      field: "srNo",
      headerName: "#",
      width: 90,
    },
    {
      field: "sourceName",
      headerName: "Source Name",
      //   flex: 1,
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            params.value === 1
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {params.value === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "insertTime",
      headerName: "Created On",
      width: 250,
      renderCell: (params) => {
        return (
          <span className="text-gray-700 text-sm">
            {new Date(params.row.insertTime).toLocaleString()}
          </span>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => {
        const isEnabled = params.row.status === 1;

        return (
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => handleToggleLeadSourceStatus(params.row)}
              className={`w-10 h-4 flex items-center rounded-full p-1 transition
            ${isEnabled ? "bg-blue-500" : "bg-gray-400"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
              ${isEnabled ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>

            <button
              onClick={() => openDeleteDialog(params.row.id)}
              className="text-gray-600 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>

            <button
              onClick={() => openEditDialog(params.row.id)}
              className="text-gray-600 hover:text-gray-800"
            >
              <EditIcon size={10} />
            </button>
          </div>
        );
      },
    },
  ];

  //   ===========================================================GET LEAD DOURCE LIST FUNCTION ENDS HERE ================================================

  //   ===========================================================ADD LEAD DOURCE  FUNCTION  ================================================
  const addLeadSourceHandler = async (sourceName) => {
    try {
      const res = await addLeadSource({ sourceName });

      if (!res.success) {
        toast.error(res.message || "Failed to add");
        return;
      }

      const listRes = await getLeadSourceList();

      const formatted = listRes.data.map((item, index) => ({
        id: item.srNo,
        srNo: index + 1,
        sourceName: item.sourceName,
        status: item.status,
        insertTime: item.insertTime,
      }));

      setRows(formatted);
      toast.success("Lead source added");
    } catch (err) {
      console.log("Error adding lead source:", err);
      toast.error("Failed to add lead source");
    } finally {
      setSourceName("");
    }
  };

  //   ===========================================================UPDATE LEAD DOURCE STATUS  FUNCTION  ================================================
  const handleToggleLeadSourceStatus = async (row) => {
    try {
      const newStatus = row.status === 1 ? 0 : 1;

      await updateLeadSourceStatus({
        srNo: row.id,
        status: newStatus,
      });

      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r)),
      );
      const listRes = await getLeadSourceList();

      toast.success("Status updated");
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status");
    }
  };

  //   ===========================================================DELETE LEAD DOURCE   FUNCTION  ================================================
  const handleDeleteLeadSource = async (srNo) => {
    try {
      const res = await deleteLeadSource(srNo);
      setRows((prev) => prev.filter((row) => row.id !== srNo));
      toast.success(res.message || "Lead Source delete");
      const listRes = await getLeadSourceList();
    } catch (error) {
      toast.error(res.message || "Failed to delete Lead Souce");
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialogVisible(true);
  };

  const confirmDeleteLeadSource = () => {
    handleDeleteLeadSource(deleteId);
    setDeleteDialogVisible(false);
  };

  //   ===========================================================GET USER ASSIGNED LEADSOURCE LIST FUNCTION START HERE===============================================

  const fetchAssignedList = async () => {
    try {
      const res = await getUserAssignedLeadSoruceList();

      const formatted = res.data.map((item, index) => ({
        id: index + 1,
        srNo: item.srNo,
        userSrno: item.userSrno,
        leadSourceSrno: item.leadSourceSrno,
        rcs: item.rcs,
        whatsapp: item.whatsapp,
        sms: item.sms,
        email: item.email,
        api: item.api,
        insertTime: item.insertTime,
      }));

      setUserRows(formatted);
      console.log("User Assigned Lead Sources:", formatted);
    } catch (err) {
      console.error("Error loading assigned lead sources", err);
    }
  };

  useEffect(() => {
    fetchAssignedList();
  }, [refreshKey]);

  const leadSourceMap = useMemo(() => {
    return rows.reduce((acc, item) => {
      acc[item.id] = item.sourceName;
      return acc;
    }, {});
  }, [rows]);

  const serviceBadge = (value) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 1
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {value === 1 ? "Configured" : "Not Configured"}
    </span>
  );

  const userLeadSourceColumns = [
    { field: "id", headerName: "Srno", width: 70 },

    { field: "userSrno", headerName: "User ID", width: 100 },

    { field: "leadSourceSrno", headerName: "Lead Source ID", width: 140 },

    {
      field: "rcs",
      headerName: "RCS",
      width: 150,
      renderCell: (params) => serviceBadge(params.value),
    },
    {
      field: "whatsapp",
      headerName: "WhatsApp",
      width: 150,
      renderCell: (params) => serviceBadge(params.value),
    },
    {
      field: "sms",
      headerName: "SMS",
      width: 150,
      renderCell: (params) => serviceBadge(params.value),
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      renderCell: (params) => serviceBadge(params.value),
    },
    {
      field: "api",
      headerName: "API",
      width: 150,
      renderCell: (params) => serviceBadge(params.value),
    },
    {
      field: "insertTime",
      headerName: "Created On",
      width: 220,
      renderCell: (params) => (
        <span className="text-sm text-gray-600">
          {new Date(params.value).toLocaleString()}
        </span>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex gap-3">
            <button
              onClick={() => openDeleteServiceDialog(params.row)}
              className="text-gray-600 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>

            <button
              onClick={() => {
                const leadSourceName =
                  leadSourceMap[params.row.leadSourceSrno] || "";
                console.log("Resolved leadSourceName:", leadSourceName);

                navigate(`/configuretemplateleadsource`, {
                  state: {
                    ...params.row,
                    leadSourceName,
                    serviceType,
                  },
                });
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <EditIcon size={8} />
            </button>
          </div>
        );
      },
    },
  ];

  const handleAssignLeadSourceSearch = (e) => {
    setRefreshKey((prev) => prev + 1);
  };

  //   ========================================================EDIT LEAD SOURCE DIALOG FUNCTION========================================================================
const openEditTagDialog = (row) => {
  setTagForm({
    srNo: row.srNo,
    tagName: row.tagName,
    tagDetails: row.tagDetails,
    color: row.color || "#cf8989",
    status: row.status ?? 1,
    webhookUrl: row.webhookUrl || "",
  });

  setOpenEditDialog(true);
};


  useEffect(() => {
    const fetchAllUsersDetails = async () => {
      try {
        const res = await fetchUserSrno({ userSrno: "", date: "" });

        setAllUsers(res);
      } catch (e) {
        toast.error("Something went wrong! Please try again later.");
      }
    };

    fetchAllUsersDetails();
  }, []);

  const saveEditedLeadSource = async () => {
    try {
      const res = await assignLeadSourceToUser({
        userSrno: selectedUser,
        leadSourceSrno: editId,
      });

      console.log(res);
      if (res.success) {
        toast.success(
          "Lead Source assigned to user successfully" || res.message,
        );
      } else {
        toast.error(res.message || "Failed to assign Lead Source to user.");
      }
      getUserAssignedLeadSoruceList();
      setEditDialogVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   =========================================================DELETE USER LEAD SOURCE SERVICE FUNCTION========================================================================

  const getConfiguredServiceOptions = (row) => {
    if (!row) return [];

    const serviceMap = [
      { key: "api", label: "API" },
      { key: "whatsapp", label: "WhatsApp" },
      { key: "sms", label: "SMS" },
      { key: "rcs", label: "RCS" },
      { key: "email", label: "Email" },
    ];

    return serviceMap
      .filter((s) => row[s.key] === 1)
      .map((s) => ({
        label: `${s.label} `,
        value: s.key,
      }));
  };

  const openDeleteServiceDialog = (row) => {
    setDeleteService(row);
    setServiceType("");
    setUserLeadSourceServiceDlt(true);
  };

  const handleDeleteUserLeadSource = async () => {
    try {
      if (!deleteService || !serviceType) {
        toast.error("Please select service type");
        return;
      }

      const res = await deleteUserLeadSourceService({
        userSrNo: deleteService.userSrno,
        leadSourceSrno: deleteService.leadSourceSrno,
        srNo: deleteService.srNo,
        type: serviceType,
      });
      if (res.success === true) {
        toast.success(res.message || "Service deleted");
      } else {
        toast.error(res.message || "Failed to delete service");
      }

      getUserAssignedLeadSoruceList();

      setUserLeadSourceServiceDlt(false);
      setServiceType("");
      setDeleteService(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete service");
    }
  };

  const handleLeadSourceSearch = (e) => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Lead Source Table Card */}
      <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 gap-5 border-b bg-gradient-to-r from-gray-50 to-white flex flex-col md:flex-row items-center justify-center md:justify-between ">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Lead Sources
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage and control all your lead acquisition channels
            </p>
          </div>

          <button
            onClick={handleLeadSourceSearch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Data Grid */}
        <div className="p-2">
          <DataTable
            rows={rows}
            col={leadSourceColumns}
            getRowHeight={() => 52}
          />
        </div>
      </div>

      {/* Add Lead Source */}
      <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-4 ">
        <h3 className="text-base font-semibold text-gray-800 mb-4">
          Add New Lead Source
        </h3>

        <div className="flex flex-col items-center md:flex-row justify-between gap-4 md:items-end">
          <div className="flex-1">
            <InputField
              label="Lead Source Name"
              type="text"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="Eg. IndiaMart, Website, Facebook Ads"
            />
          </div>

          <UniversalButton
            label="Add Lead Source"
            onClick={() => addLeadSourceHandler(sourceName)}
            className="h-11 px-6 text-sm font-semibold"
          />
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white flex flex-col items-center md:flex-row justify-between gap-4 md:items-end">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              User Assigned Lead Sources
            </h2>
          </div>
          <button
            onClick={handleAssignLeadSourceSearch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
        <DataTable
          rows={userRows}
          col={userLeadSourceColumns}
          getRowHeight={() => 50}
        />
      </div>
      {/* Delete Dialog */}
      <Dialog
        header="Confirm Delete"
        visible={deleteDialogVisible}
        style={{ width: "420px" }}
        onHide={() => setDeleteDialogVisible(false)}
      >
        <div className="space-y-6">
          {/* Warning Text */}
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full  flex items-center justify-center">
              <span className="text-red-600 text-lg">
                <ErrorIcon />
              </span>
            </div>

            <div>
              <p className="text-base font-semibold text-gray-800">
                Delete Lead Source
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to delete this lead source? This action
                cannot be undone and all associated data will be removed.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              onClick={() => setDeleteDialogVisible(false)}
              className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={confirmDeleteLeadSource}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold rounded-lg "
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        header="Edit Lead Source"
        visible={editDialogVisible}
        style={{ width: "320px" }}
        onHide={() => setEditDialogVisible(false)}
      >
        <div className="space-y-5">
          <DropdownWithSearch
            id="manageuser"
            name="manageuser"
            label="Select User"
            tooltipContent="Select user you want to see reports"
            tooltipPlacement="right"
            options={(allUsers || [])
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

          <UniversalButton label="Save" onClick={saveEditedLeadSource} />
        </div>
      </Dialog>

      {/* USER LEAD SOURCE SERVICE DELETE DIALOG */}
      <Dialog
        header="Confirm Delete"
        visible={userLeadSourceServiceDlt}
        onHide={() => setUserLeadSourceServiceDlt(false)}
         style={{ width: "420px" }}
      >
        <div className="space-y-5">
          <DropdownWithSearch
            label="Select Service Type "
            placeholder="Select Service Type to Delete"
            options={getConfiguredServiceOptions(deleteService)}
            value={serviceType}
            onChange={setServiceType}
          />
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full  flex items-center justify-center">
              <span className="text-red-600 text-lg">
                <ErrorIcon />
              </span>
            </div>

            <div>
              <p className="text-base font-semibold text-gray-800">
                Delete Lead Source
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to delete this lead source? This action
                cannot be undone and all associated data will be removed.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              onClick={() => setDeleteDialogVisible(false)}
              className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleDeleteUserLeadSource}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold rounded-lg "
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default LeadSource;
