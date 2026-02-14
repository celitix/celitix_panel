import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { toast } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

// ============================================================ICONS=============================================================
import ErrorIcon from "@mui/icons-material/Error";
import EditIcon from "@mui/icons-material/Edit";
import { Trash2, Search } from "lucide-react";

// ==============================================================APIS=============================================================
import {
  getAllPlansMain,
  updatePlanStatusMain,
  updateOpenContentStatusMain,
  updateNdncStatusMain,
  updateOpenMobileStatusMain,
  deletePlanMain,
  editPlanMain,
  createPlanMain,
  getPlanDetailsByServiceMain,
} from "@/apis/managerouting/managerouting";

// ========================================================COMPONENT=============================================================
import { DataTable } from "@/components/layout/DataTable";
import InputField from "@/admin/components/InputField";
import UniversalButton from "@/admin/components/UniversalButton";
import DropdownWithSearch from "@/admin/components/DropdownWithSearch";

const ManagePlanConfiguration = () => {
  const [planRows, setPlanRows] = useState([]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [planName, setPlanName] = useState("");
  const [selectPlanType, setSelectPlanType] = useState(-1);
  const [selectStatus, setSelectStatus] = useState(-1);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [triggerQueueSize, setTriggerQueueSize] = useState("");
  const [initialQueueSize, setInitialQueueSize] = useState("");
  const [orderQueueSize, setOrderQueueSize] = useState("");
  const [characterLimit, setCharacterLimit] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [createPlanName, setCreatePlanName] = useState("");

  const fetchPlans = async ({
    planName = "",
    planType = "-1",
    status = "-1",
  } = {}) => {
    try {
      const payload = {
        planname: planName,
        ptype: planType,
        status: status,
      };

      const res = await getAllPlansMain(payload);

      const formatted = res.map((item, index) => ({
        ...item,
        id: item.planId ?? index + 1,
        serialNo: index + 1,
        planName: item.planName,
        planType: item.planType,
        characterLimit: item.characterLimit,
        allowedTime:
          item.fromAllowSmsTime && item.toAllowSmsTime
            ? `${item.fromAllowSmsTime} - ${item.toAllowSmsTime}`
            : "-",
        openContent: item.openContent === 1 ? "Yes" : "No",
        openMobile: item.openMobile === 1 ? "Yes" : "No",
        ndnc: item.ndnc === 1 ? "Yes" : "No",
        status: item.status === 1 ? "Active" : "Inactive",
      }));

      setPlanRows(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const openDeleteDialogHandler = (planId) => {
    setSelectedPlanId(planId);
    setOpenDeleteDialog(true);
  };

  const planColumns = [
    {
      field: "serialNo",
      headerName: "S.No",
      width: 80,
    },
    {
      field: "planName",
      headerName: "Plan Name",
      width: 150,
    },
    {
      field: "planType",
      headerName: "Plan Type",
      width: 120,
    },
    {
      field: "characterLimit",
      headerName: "Character Limit",
      width: 150,
    },
    {
      field: "allowedTime",
      headerName: "Allowed Time",
      width: 200,
    },
    {
      field: "openContent",
      headerName: "Open Content",
      width: 120,
      renderCell: (params) => {
        const isOpenContentEnabled =
          params.row.openContent === 1 || params.row.openContent === "Yes";

        const handleToggle = async () => {
          const newValue = isOpenContentEnabled ? 0 : 1;

          const updatedRows = planRows.map((row) =>
            row.id === params.row.id ? { ...row, openContent: newValue } : row,
          );

          setPlanRows(updatedRows);

          try {
            const payload = {
              serviceId: params.row.planId,
              openContent: newValue,
            };

            const res = await updateOpenContentStatusMain(payload);

            if (res.status === true) {
              toast.success(res.msg || "Status Updated");
              // await fetchPlans();
            } else {
              toast.error(res.msg || "Failed to update status.");
            }
          } catch (error) {
            const revertedRows = planRows.map((row) =>
              row.id === params.row.id
                ? { ...row, openContent: isOpenContentEnabled ? 1 : 0 }
                : row,
            );
            setPlanRows(revertedRows);
            toast.error("Failed to update Open Mobile status");
          }
        };

        return (
          <div
            onClick={handleToggle}
            className={`w-10 h-4 flex items-center rounded-full p-1 cursor-pointer transition mt-5 ${
              isOpenContentEnabled ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-3 h-3 rounded-full shadow-md transform transition ${
                isOpenContentEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        );
      },
    },
    {
      field: "openMobile",
      headerName: "Open Mobile",
      width: 120,
      renderCell: (params) => {
        const isOpenMobileEnabled =
          params.row.openMobile === 1 || params.row.openMobile === "Yes";

        const handleToggle = async () => {
          const newValue = isOpenMobileEnabled ? 0 : 1;

          const updatedRows = planRows.map((row) =>
            row.id === params.row.id ? { ...row, openMobile: newValue } : row,
          );

          setPlanRows(updatedRows);

          try {
            const payload = {
              serviceId: params.row.planId,
              openMobile: newValue,
            };

            const res = await updateOpenMobileStatusMain(payload);

            if (res.status === true) {
              toast.success(res.msg || "Status Updated");
              // await fetchPlans();
            } else {
              toast.error(res.msg || "Failed to update status.");
            }
          } catch (error) {
            const revertedRows = planRows.map((row) =>
              row.id === params.row.id
                ? { ...row, openMobile: isOpenMobileEnabled ? 1 : 0 }
                : row,
            );
            setPlanRows(revertedRows);
            toast.error("Failed to update Open Mobile status");
          }
        };

        return (
          <div
            onClick={handleToggle}
            className={`w-10 h-4 flex items-center rounded-full p-1 cursor-pointer transition mt-5 ${
              isOpenMobileEnabled ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-3 h-3 rounded-full shadow-md transform transition ${
                isOpenMobileEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        );
      },
    },

    {
      field: "ndnc",
      headerName: "NDNC",
      width: 110,
      renderCell: (params) => {
        const isNdncEnabled =
          params.row.ndnc === 1 || params.row.ndnc === "Yes";

        const handleToggle = async () => {
          const newValue = isNdncEnabled ? 0 : 1;

          const updatedRows = planRows.map((row) =>
            row.id === params.row.id ? { ...row, ndnc: newValue } : row,
          );
          setPlanRows(updatedRows);

          try {
            const payload = {
              serviceId: params.row.planId,
              ndnc: newValue,
            };

            const res = await updateNdncStatusMain(payload);

            if (res.status === true) {
              toast.success(res.msg || "Status Updated");
              // await fetchPlans();
            } else {
              toast.error(res.msg || "Failed to update status.");
            }
          } catch (error) {
            const revertedRows = planRows.map((row) =>
              row.id === params.row.id
                ? { ...row, ndnc: isNdncEnabled ? 1 : 0 }
                : row,
            );
            setPlanRows(revertedRows);

            toast.error("Failed to update NDNC status");
          }
        };

        return (
          <div
            onClick={handleToggle}
            className={`w-10 h-4 flex items-center rounded-full p-1 cursor-pointer transition mt-5 ${
              isNdncEnabled ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-3 h-3 rounded-full shadow-md transform transition ${
                isNdncEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        const isActive = params.row.status === "Active";

        const handleToggle = async () => {
          const newStatus = isActive ? 0 : 1;

          const updatedRows = planRows.map((row) =>
            row.id === params.row.id
              ? { ...row, status: newStatus === 1 ? "Active" : "Inactive" }
              : row,
          );
          setPlanRows(updatedRows);

          try {
            const payload = {
              serviceId: params.row.planId,
              status: newStatus,
            };

            const res = await updatePlanStatusMain(payload);

            if (res.status === true) {
              toast.success(res.msg || "Status Updated");
              // await fetchPlans();
            } else {
              toast.error(res.msg || "Failed to update status.");
            }
          } catch (error) {
            const revertedRows = planRows.map((row) =>
              row.id === params.row.id
                ? { ...row, status: isActive ? "Active" : "Inactive" }
                : row,
            );
            setPlanRows(revertedRows);

            toast.error("Failed to update status");
          }
        };

        return (
          <div
            onClick={handleToggle}
            className={`w-10 h-4 flex items-center rounded-full p-1 cursor-pointer transition mt-5 ${
              isActive ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-3 h-3 rounded-full shadow-md transform transition ${
                isActive ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-3">
            <button onClick={() => handleEdit(params.row)}>
              <EditIcon size={6} />
            </button>

            <button
              onClick={() => openDeleteDialogHandler(params.row.planId)}
              className="text-red-400 hover:text-red-700"
            >
              <Trash2 size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  const handleDeletePlan = async () => {
    try {
      const res = await deletePlanMain(selectedPlanId);

      if (res.success || res.status) {
        toast.success(res.msg || "Plan deleted successfully");

        setSelectedPlanId(null);
        setOpenDeleteDialog(false);

        await fetchPlans();
      } else {
        toast.error(res.msg || "Failed to delete plan");
        setOpenDeleteDialog(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = async (row) => {
    try {
      setIsEditMode(true);
      setSelectedPlanId(row.planId);

      const res = await getPlanDetailsByServiceMain(Number(row.planId));

      console.log("Plan Details:", res);

      setCreatePlanName(res.planName);
      setCharacterLimit(res.characterLimit);
      setOrderQueueSize(res.orderQueueSize);
      setInitialQueueSize(res.initialQueueSize);
      setTriggerQueueSize(res.triggerQueueSize);

      setSelectPlanType(res.planType);

      if (res.fromTime) {
        const [h, m] = res.fromTime.split(":");
        const time = dayjs().hour(+h).minute(+m);
        if (time.isValid()) setFromTime(time);
      }

      if (res.toTime) {
        const [hours, minutes] = res.toTime.split(":");
        setToTime(dayjs().hour(Number(hours)).minute(Number(minutes)));
      }

      setOpenCreateDialog(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch plan details");
    }
  };

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const formattedFrom = fromTime?.format("HH:mm");
  const formattedTo = toTime?.format("HH:mm");

  const handleUpdate = async () => {
    try {
      const payload = {
        serviceId: selectedPlanId,
        planName: createPlanName,
        planType: selectPlanType ?? -1,
        characterLimit: characterLimit,
        orderQueueSize: orderQueueSize,
        initialQueueSize: initialQueueSize,
        triggerQueueSize: triggerQueueSize,
        isPlanTimeout: 1,
        fromTime: formattedFrom,
        toTime: formattedTo,
      };

      const res = await editPlanMain(payload);
      console.log("Edit plan response:", res);

      if (res.success || res.status) {
        toast.success(res.msg || "Plan Create successfully!");

        setIsEditMode(false);
        setSelectedPlanId(null);
        setOpenCreateDialog(false);

        await fetchPlans();
      } else {
        toast.error(res.msg || "Failed to create plan!");
      }
    } catch (error) {}
  };

  const resetForm = () => {
    setCreatePlanName("");
    setCharacterLimit("");
    setOrderQueueSize("");
    setInitialQueueSize("");
    setTriggerQueueSize("");
    setSelectPlanType(null);
    setFromTime(null);
    setToTime(null);
    setIsActive(false);
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setSelectedPlanId(null);
    resetForm();
    setOpenCreateDialog(true);
  };

  const handleSave = async () => {
    try {
      if (!createPlanName) {
        toast.error("Please Fill the Plan Name");
        return;
      }
      const payload = {
        planName: createPlanName,
        planType: selectPlanType ?? -1,
        characterLimit: characterLimit,
        orderQueueSize: orderQueueSize,
        initialQueueSize: initialQueueSize,
        triggerQueueSize: triggerQueueSize,

        isPlanTimeout: 1,
        fromTime: formattedFrom,
        toTime: formattedTo,
      };
      const res = await createPlanMain(payload);
      console.log("SAVING RESPONSE:", res);

      if (res.success || res.status) {
        toast.success(res.msg || "Plan Create successfully!");

        resetForm();
        setOpenCreateDialog(false);
        await fetchPlans();
      } else {
        toast.error(res.msg || "Failed to create plan!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchPlans({
      planName,
      planType: selectPlanType,
      status: selectStatus,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Manage Plan Configuration
        </h2>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Filters Section */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <InputField
              label="Plan Name"
              placeholder="Enter Plan Name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />

            <DropdownWithSearch
              label="Plan Type"
              placeholder="Select Plan Type"
              options={[
                { label: "Transactional", value: "1" },
                { label: "Promotional", value: "2" },
                { label: "International", value: "3" },
              ]}
              value={selectPlanType}
              onChange={setSelectPlanType}
            />

            <DropdownWithSearch
              label="Status"
              placeholder="Select Status"
              options={[
                { label: "Active", value: "1" },
                { label: "Inactive", value: "-1" },
              ]}
              value={selectStatus}
              onChange={setSelectStatus}
            />
          </div>

          {/* Buttons Section */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row gap-3 w-full">
            <UniversalButton
              label="Search"
              onClick={handleSearch}
              className="w-full sm:w-auto"
            />

            <UniversalButton
              label="Create Plan"
              onClick={handleOpenCreate}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mt-5">
        <DataTable rows={planRows} col={planColumns} getRowHeight={() => 52} />
      </div>

      {/* CREATE/EDIT DIALOG */}
      <Dialog
        header={isEditMode ? "Update Plan" : "Create Plan"}
        visible={openCreateDialog}
        onHide={() => setOpenCreateDialog(false)}
        style={{ width: "800px" }}
        className="rounded-2xl"
      >
        <div className="space-y-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Plan Name"
              placeholder="Enter Plan Name"
              value={createPlanName}
              onChange={(e) => setCreatePlanName(e.target.value)}
            />

            <InputField
              label="Character Limit"
              placeholder="Enter Character Limit"
              type="Number"
              value={characterLimit}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setCharacterLimit(value);
                }
              }}
            />

            <InputField
              label="Order Queue Size"
              placeholder="Enter Order Queue Size"
              value={orderQueueSize}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setOrderQueueSize(value);
                }
              }}
            />

            <InputField
              label="Initial Queue Size"
              placeholder="Enter Initial Queue Size"
              value={initialQueueSize}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setInitialQueueSize(value);
                }
              }}
            />

            <InputField
              label="Trigger Queue Size"
              placeholder="Enter Trigger Queue Size"
              value={triggerQueueSize}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setTriggerQueueSize(value);
                }
              }}
            />

            <DropdownWithSearch
              label="Plan Type"
              placeholder="Select Plan Type"
              options={[
                { label: "Transactional", value: 1 },
                { label: "Promotional", value: 2 },
                { label: "International", value: 3 },
              ]}
              value={selectPlanType}
              onChange={setSelectPlanType}
            />

            {/* Toggle */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mt-2">
                <label className="font-medium text-gray-700">Plan Active</label>

                <button
                  type="button"
                  onClick={handleToggle}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                    isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                      isActive ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>

                <span className="text-sm text-gray-600">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Time Pickers */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  From Time
                </label>
                <TimePicker
                  value={fromTime}
                  onChange={(newValue) => setFromTime(newValue)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  To Time
                </label>
                <TimePicker
                  value={toTime}
                  onChange={(newValue) => setToTime(newValue)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </div>
            </LocalizationProvider>
            <div className="md:col-span-2 flex justify-end pt-4 border-t">
              <UniversalButton
                label={isEditMode ? "Update Plan" : "Save Plan"}
                onClick={isEditMode ? handleUpdate : handleSave}
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        header="Confirm Delete"
        style={{ width: "420px" }}
        visible={openDeleteDialog}
        onHide={() => setOpenDeleteDialog(false)}
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
                Delete Plan Configuration.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to delete this Plan Configuration? This
                action cannot be undone and all associated data will be removed.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              onClick={() => setOpenDeleteDialog(false)}
              className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleDeletePlan}
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

export default ManagePlanConfiguration;
