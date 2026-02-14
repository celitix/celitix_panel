import React, { useEffect, useState } from "react";
import {
  getEmailSenderData,
  updateEmailSenderStatus,
  deleteEmailSender,
  insertEmailSender,
} from "@/apis/email/Email";
import { Dialog } from "primereact/dialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import UniversalButton from "@/whatsapp/components/UniversalButton.jsx";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import toast from "react-hot-toast";
import InputField from "@/whatsapp/components/InputField.jsx";
const EmailWhiteList = () => {
  const [emailData, setEmailData] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [search, setSearch] = useState("");
  const rowsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetchEmailData();
  }, []);

  // Fetch API Data
  const fetchEmailData = async () => {
    try {
      setLoading(true);

      const data = {
        srNo: 0,
        selectedUser: 0,
      };

      const res = await getEmailSenderData(data);

      setEmailData(res?.data);
    } catch (error) {
      toast.error(error?.message || "API Error");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Status
  const handleStatusChange = async (item, checked) => {
    const newStatus = checked ? 1 : 0;

    const oldStatus = item.status;
    setEmailData((prev) =>
      prev.map((el) => (el === item ? { ...el, status: newStatus } : el)),
    );

    try {
      const payload = {
        srNo: item.srNo,
        selectedUser: item.selectedUser || 0,
        status: newStatus,
      };

      await updateEmailSenderStatus(payload);
    } catch (error) {
      toast.error("Update failed:", error);

      setEmailData((prev) =>
        prev.map((el) => (el === item ? { ...el, status: oldStatus } : el)),
      );

      toast.error("Failed to update status. Please try again.");
    }
  };

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      setDeleting(true);

      const payload = {
        userSrno: selectedItem.srNo,
        selectedUser: selectedItem.selectedUser || 0,
      };

      await deleteEmailSender(payload);

      setEmailData((prev) => prev.filter((el) => el !== selectedItem));

      setShowDeleteDialog(false);
      setSelectedItem(null);

      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Delete failed. Try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!fromName || !fromEmail) {
      toast.error("Please fill all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(fromEmail)) {
      toast.error("Invalid Email Format");
      return;
    }

    try {
      const payload = {
        fromName: fromName.trim(),
        fromEmail: fromEmail.trim(),
        selectedUser: 0,
      };

      console.log("Saving:", payload);

      const res = await insertEmailSender(payload);

      if (!res.status) {
        toast.error(res?.message || "Failed to Add");
        return;
      }

      await fetchEmailData();

      setFromName("");
      setFromEmail("");
      setShowAddDialog(false);

      toast.success(res?.message || "Email added successfully");
    } catch (error) {
      toast.error("Insert Error:", error);
    }
  };

  // Remove duplicates (by email)
  const uniqueEmailData = Array.from(
    new Map(
      (Array.isArray(emailData) ? emailData : []).map((item) => [
        item.fromEmail,
        item,
      ]),
    ).values(),
  );

  // Search filter
  const filteredEmailData = uniqueEmailData.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      (item.fromName || "").toLowerCase().includes(searchText) ||
      (item.fromEmail || "").toLowerCase().includes(searchText)
    );
  });

  // Pagination
  const paginatedData = filteredEmailData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const totalPages = Math.ceil(filteredEmailData.length / rowsPerPage);

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="p-6 ">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Email Whitelist</h2>

          <p className="text-sm text-gray-500">Manage approved sender emails</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Name or Email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg
                   w-full sm:w-64 text-sm
                   focus:ring-2 focus:ring-indigo-400
                   focus:outline-none"
            />

            {/* Search Icon */}
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 10.5a6.15 6.15 0 11-12.3 0 6.15 6.15 0 0112.3 0z"
              />
            </svg>
          </div>

          {/* Add Button */}
          <div>
            <UniversalButton
              label="Add Email"
              onClick={() => setShowAddDialog(true)}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 border-gray-300 border-t-2 pt-2">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {!loading && filteredEmailData.length === 0 && (
        <p className="text-center text-gray-400">No records found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {!loading &&
          paginatedData.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 shadow-sm
                         hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-indigo-500
                             text-white flex items-center justify-center
                             font-semibold"
                >
                  {item.fromName?.charAt(0)}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {highlightMatch(String(item.fromName || ""), search)}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {highlightMatch(String(item.fromEmail || ""), search)}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Updated: {highlightMatch(String(item.updateTime || ""), search)}
              </p>

              <div className="border-t my-3"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    size="small"
                    checked={item.status === 1}
                    onChange={(e) => handleStatusChange(item, e.target.checked)}
                    color="success"
                  />

                  <span
                    className={`text-xs px-2 py-1 rounded
                      ${item.status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {item.status === 1 ? "Active" : "Inactive"}
                  </span>
                </div>

                <Tooltip title="Delete">
                  <button
                    onClick={() => openDeleteDialog(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteForeverIcon fontSize="small" />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-end items-center mt-4 gap-2 w-full whitespace-nowrap sm:overflow-x-scroll">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`text-sm px-3 py-1 border rounded-sm cursor-pointer ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        header={"Confirm Cancel"}
        visible={showDeleteDialog}
        style={{ width: "27rem" }}
        onHide={() => !deleting && setShowDeleteDialog(false)}
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon
            sx={{
              fontSize: 64,
              color: "#ff3f3f",
            }}
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-[1.1rem] font-semibold text-gray-700">
            Are you sure you want to delete this email? ?
          </p>
          <span className="text-green-500">
            {selectedItem?.fromName}
            {/* {selectedItem?.fromEmail} */}
          </span>
          <p className="mt-2 text-sm text-gray-500">
            This action is irreversible.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <UniversalButton
            label="Cancel"
            style={{
              backgroundColor: "#090909",
            }}
            onClick={() => setShowDeleteDialog(false)}
          />
          <UniversalButton
            label={deleting ? "Deleting..." : "Delete"}
            style={{}}
            onClick={handleDelete}
          />
        </div>
      </Dialog>
      <Dialog
        header="Add New Email"
        visible={showAddDialog}
        style={{ width: "400px" }}
        draggable={false}
        onHide={() => setShowAddDialog(false)}
      >
        <div className="flex flex-col gap-4">
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              From Name
            </label>

            <InputField
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder="Enter name"
              className="w-full"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              From Email
            </label>

            <InputField
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <UniversalButton label="Save" onClick={handleSaveEmail} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EmailWhiteList;
