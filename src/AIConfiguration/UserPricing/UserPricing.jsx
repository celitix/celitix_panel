import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";

// ICONS
import { FiSearch } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { MdOutlineSearchOff } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { HiDevicePhoneMobile } from "react-icons/hi2";

// COMPONENTS
import UniversalButton from "@/whatsapp/components/UniversalButton";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";

// API
import {
  getAiPricingList,
  addAiPricing,
  getDeleteAiPricing,
} from "@/apis/admin/userRate.js";
import { fetchUserSrno } from "@/apis/admin/admin.js";

const UserPricing = () => {
  // ============================= STATES ==============================

  const [pricingList, setPricingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  // Add/Edit dialog state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tokenRate, setTokenRate] = useState("");

  // Users for dropdown
  const [allUsers, setAllUsers] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);

  // Delete dialog state
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ============================= DERIVED DATA ========================

  const usedUserSrNos = pricingList.map((p) => p.userSrNo);

  const availableUsers = allUsers.filter(
    (user) => !usedUserSrNos.includes(user.srNo)
  );

  // ============================= FETCH DATA ===========================

  const fetchPricingList = async () => {
    try {
      setLoading(true);
      const res = await getAiPricingList();
      setPricingList(res.data || []);
    } catch (e) {
      toast.error("Failed to load pricing.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsersDetails = async () => {
    try {
      setIsFetchingUsers(true);
      const data = { userSrno: "", date: "" };
      const res = await fetchUserSrno(data);
      setAllUsers(res);
    } catch (e) {
      toast.error("Unable to fetch users.");
    } finally {
      setIsFetchingUsers(false);
    }
  };

  useEffect(() => {
    fetchPricingList();
    fetchAllUsersDetails();
  }, []);

  // ============================= HIGHLIGHT MATCH ======================

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: text.replace(
            regex,
            (match) =>
              `<span class="text-indigo-600 font-semibold bg-indigo-200 rounded">${match}</span>`
          ),
        }}
      />
    );
  };

  // ============================= ADD/EDIT =============================

  const handleAddPricing = () => {
    setIsEdit(false);
    setSelectedUser(null);
    setTokenRate("");
    setEditId(null);
    setShowAddDialog(true);
  };



  const handleEditPricing = (item) => {
    setIsEdit(true);
    setEditId(item.srNo);
    setSelectedUser(item.userSrNo);
    setTokenRate(item.tokenRate);
    setShowAddDialog(true);
  };

  const submitPricing = async () => {
    if (!selectedUser) return toast.error("Select a user.");
    if (!tokenRate || isNaN(tokenRate))
      return toast.error("Enter valid token rate.");

    const payload = {
      srNo: isEdit ? editId : "",
      userSrNo: selectedUser,
      tokenRate: Number(tokenRate),
    };

    try {
      const res = await addAiPricing(payload);
      if (res?.success === true) {
        toast.success(
          res?.message || (isEdit ? "Pricing updated!" : "Pricing added!")
        );
        setShowAddDialog(false);
        fetchPricingList();
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  // ============================= DELETE ===============================

  const handleDelete = (item) => {
    setSelectedUser(item.userSrNo);
    setDeleteId(item.srNo);
    setConfirmDelete(true);
  };

  const confirmDeleteAction = async () => {
    try {
      const res = await getDeleteAiPricing({
        srno: deleteId,
        userSrno: selectedUser,
      });

      if (res?.success === true) {
        toast.success(res?.message || "Pricing deleted successfully!");
        setConfirmDelete(false);
        fetchPricingList();
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch {
      toast.error("Failed to delete pricing.");
    }
  };

  // ============================= UI RENDER ============================

  const dropdownUsers = isEdit ? allUsers : availableUsers;


  return (
    <div className="space-y-4 bg-white p-3 rounded-2xl">
      {/* ========== HEADER ========== */}
      <div className="border-b border-gray-200 pb-3 mb-4 text-center">
        <h1 className="text-3xl text-gray-700 font-medium text-center">
          Manage AI Pricing
        </h1>
      </div>

      {/* ========== SEARCH + ADD BUTTONS ========== */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 w-full items-end pb-4 justify-center border-b border-gray-200">
        <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full items-end">
          <div className="relative flex items-center gap-2 w-full sm:w-72">
            <FiSearch className="absolute right-3 top-11 -translate-y-1/2 text-slate-400 text-lg" />
            <InputField
              label="Search User"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <UniversalButton
            icon={<FiSearch />}
            label={loading ? "Searching..." : "Search"}
            disabled={loading}
            onClick={() => {
              fetchPricingList();
              fetchAllUsersDetails();
            }}
          />

          <UniversalButton label="Add Pricing" onClick={handleAddPricing} />
        </div>
      </div>

      {/* ========== LIST VIEW ========== */}
      <div className="md:h-115 lg:h-120 xl:h-170 2xl:h-200 overflow-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading ? (
            [...Array(12)].map((_, i) => (
              <UniversalSkeleton
                key={i}
                height="7rem"
                className="rounded-2xl"
              />
            ))
          ) : pricingList.length > 0 ? (
            pricingList
              .filter((item) =>
                item.userId.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <div
                  key={item.srNo}
                  className="relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-medium">
                        User
                      </span>
                      <div className="mt-1 text-lg font-semibold text-slate-900">
                        {highlightMatch(item.userId, searchQuery)}
                      </div>

                      <div className="text-sm text-slate-500 mt-1">
                        Token Rate:{" "}
                        <span className="font-semibold text-blue-600">
                          {item.tokenRate}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {/* EDIT */}
                      <button
                        onClick={() => {
                          handleEditPricing(item);
                          setSelectedName(item.userId);
                        }}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-indigo-100 border border-slate-200"
                      >
                        <EditNoteIcon className="text-slate-600" />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => {
                          handleDelete(item);
                          setSelectedName(item.userId);
                        }}
                        className="p-1.5 rounded-xl bg-red-100 hover:bg-red-200 border border-red-300"
                      >
                        <DeleteIcon className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-slate-500">
              <MdOutlineSearchOff className="text-5xl mb-3" />
              <p>No pricing records found.</p>
            </div>
          )}
        </div>
      </div>

      {/* ====================== ADD / EDIT DIALOG =================== */}
      <Dialog
        header={
          isEdit
            ? `Edit Pricing - ${selectedName || "Unnamed User"}`
            : "Add Pricing"
        }
        visible={showAddDialog}
        style={{ width: "32rem" }}
        onHide={() => setShowAddDialog(false)}
        draggable={false}
      >
        <div className="flex flex-col gap-4 px-2 py-3">
          {/* USER DROPDOWN */}
          {!isEdit && (
            <DropdownWithSearch
              label="Select User"
              id="selectUser"
              // options={allUsers
              //   .slice()
              //   .sort((a, b) => a.userName.localeCompare(b.userName))
              //   .map((u) => ({
              //     label: u.userName,
              //     value: u.srNo,
              // }))}
              options={availableUsers
                .sort((a, b) => a.userName.localeCompare(b.userName))
                .map((u) => ({
                  label: u.userName,
                  value: u.srNo,
                }))}
              value={selectedUser}
              onChange={setSelectedUser}
              placeholder="Choose user"
            />
          )}

          {/* TOKEN RATE */}
          <InputField
            label="Token Rate"
            type="number"
            value={tokenRate}
            onChange={(e) => setTokenRate(e.target.value)}
            placeholder="Example: 0.21"
          />

          <div className="flex justify-center gap-4 mt-4">
            <UniversalButton
              label="Cancel"
              onClick={() => setShowAddDialog(false)}
            />

            <UniversalButton
              label={isEdit ? "Update" : "Add"}
              onClick={submitPricing}
              style={{ backgroundColor: "#4f46e5", color: "white" }}
            />
          </div>
        </div>
      </Dialog>

      {/* ====================== DELETE DIALOG ======================== */}
      <Dialog
        header="Confirm Delete"
        visible={confirmDelete}
        style={{ width: "28rem" }}
        onHide={() => setConfirmDelete(false)}
        draggable={false}
      >
        <div className="flex flex-col items-center justify-center text-center px-4 py-3">
          <CancelOutlinedIcon sx={{ fontSize: 64, color: "#f44336", mb: 1 }} />

          <h2 className="text-[1.15rem] font-semibold text-gray-700 mb-2 flex gap-2 items-center">
            Delete Pricing Record
          </h2>

          <p className="text-gray-600 text-sm mb-4">
            Are you sure you want to delete this pricing record?
          </p>

          <div className="bg-gray-100 text-gray-800 font-medium rounded-md px-3 py-2 mb-4 w-full text-center break-words">
            {selectedName || "Unnamed User"}
          </div>

          <p className="text-sm text-gray-500 mt-1">
            This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4 mt-5">
            <UniversalButton
              label="Cancel"
              style={{
                backgroundColor: "#4b5563",
              }}
              onClick={() => setConfirmDelete(false)}
            />
            <UniversalButton
              label="Delete"
              onClick={confirmDeleteAction}
              style={{
                backgroundColor: "#dc2626",
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserPricing;
