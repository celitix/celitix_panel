import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import styled from "styled-components";
import toast from "react-hot-toast";

// MUI MATERIAL
import {
  Box,
  Button,
  IconButton,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination/usePagination";

// ICONS
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";

// COMPONENTS
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import InputField from "@/whatsapp/components/InputField";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/whatsapp/components/UniversalButton";

// API
import {
  deletePlan,
  getPlanDetailsByServiceId,
  updateNdncStatus,
  updateOpenContentStatus,
  updateOpenMobileStatus,
  updatePlan,
  updateServiceStatus,
} from "@/apis/admin/admin";

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});
const CustomPagination = ({
  totalPages,
  paginationModel,
  setPaginationModel,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) =>
      setPaginationModel({ ...paginationModel, page: newPage - 1 }),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <Button
                key={index}
                variant={selected ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: "27px" }}
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <Button
                key={index}
                variant="outlined"
                size="small"
                {...item}
                sx={{}}
              >
                {type === "previous" ? "Previous" : "Next"}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </PaginationList>
    </Box>
  );
};

const ManagePlanTable = ({
  id,
  name,
  data = [],
  handleFetchAllPlans,
  paginationModel,
  setPaginationModel,
}) => {
  // const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 10,
  // });
  const [selectedRows, setSelectedRows] = useState([]);
  const [manageCreatePlan, setManageCreatePlan] = useState(false);
  const [plantypeoptionedit, setPlantypeoptionedit] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [deleteData, setDeleteData] = useState({ isOpen: false, id: null });


  const [editData, setEditData] = useState({});

  const planeditOptions = [
    { label: "Transactional", value: 1 },
    { label: "Promotional", value: 2 },
    { label: "International", value: 3 },
  ];

  const handleToggle = (e) => {
    setIsChecked((prev) => !prev);
    setEditData((prev) => ({
      ...prev,
      isPlanTimeout: e.target.checked ? 1 : 0,
      fromTime: undefined,
      toTime: undefined,
    }));
  };

  // isPlanTimeout

  const handleEdit = async (row) => {
    try {
      const res = await getPlanDetailsByServiceId(row?.planId);

      setEditData({
        ...res,
        // isPlanTimeout:
        //   res?.fromTime == "00:00" ||
        //     res?.toTime == "00:00"
        //     ? "0"
        //     : "1",
        serviceId: row?.planId,
      });
      // if (res?.fromTime === "00:00" || res?.toTime === "00:00") {
      //   setIsChecked(false);
      // } else {
      //   setIsChecked(true);
      // }
      if (res?.isPlanTimeout) {
        setIsChecked(true)
      }
      else {
        setIsChecked(false);
      }
      setManageCreatePlan(true);
    } catch (e) {
      console.error("Error fetching plan details:", e);
      toast.error("Failed to fetch plan details");
    }
  };

  const rows = Array.isArray(data)
    ? data.map((item, index) => ({
      ...item,
      id: item.planId,
      sn: index + 1,
    }))
    : [];

  function renderCol(functionName, params) {
    return (
      <button
        className={`text-white text-xs px-3 py-1 border rounded-full text-center ${params.value ? "bg-green-500" : "bg-red-500"
          }`}
        title="Change Status"
        onClick={() => functionName(params.row)}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </button>
    );
  }
  const columns = [
    { field: "sn", headerName: "S.No", width: 90 },
    { field: "planName", headerName: "Plan Name", flex: 1, minWidth: 130 },
    {
      field: "planType",
      headerName: "Plan Type",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => {
        return params.value === 1 ? (
          <span>Transactional</span>
        ) : params.value === 2 ? (
          <span>Promotional</span>
        ) : (
          <span>International</span>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return renderCol(handleUpdateServiceStatus, params);
      },
    },
    {
      field: "ndnc",
      headerName: "NDNC",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return renderCol(handleUpdateNdncStatus, params);
      },
    },
    {
      field: "openContent",
      headerName: "Open content",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return renderCol(handleUpdateOpenContentStatus, params);
      },
    },
    {
      field: "openMobile",
      headerName: "Open Mobile",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return renderCol(handleUpdateOpenMobileStatus, params);
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Plan" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Plan" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() =>
                setDeleteData({ isOpen: true, id: params.row?.planId })
              }
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteData?.id) return;
    setIsFetching(true);
    try {
      const res = await deletePlan(deleteData?.id);
      // console.log("res", res);
      if (!res?.msg.includes("successfully")) {
        return toast.error(res?.msg, "Something went wrong");
      }
      toast.success(res?.msg, "Plan deleted successfully");
      setDeleteData((prev) => ({ isOpen: false, id: "" }));
      await handleFetchAllPlans();
    } catch (e) {
      console.error(e);
      toast.error("Error in fetching smpp details");
    } finally {
      setIsFetching(false);
    }
  };

  async function handleUpdateServiceStatus(row) {
    try {
      const data = {
        serviceId: row?.planId,
        status: row?.status,
      };
      const res = await updateServiceStatus(data);
      if (!res?.status) {
        return toast.error("Failed to update status");
      }
      toast.success("Status updated successfully");
      await handleFetchAllPlans();
    } catch (e) {
      toast.error("Failed to update status");
    }
  }

  async function handleUpdateOpenContentStatus(row) {
    try {
      const data = {
        serviceId: row?.planId,
        openContent: row?.openContent,
      };
      const res = await updateOpenContentStatus(data);
      if (!res?.status) {
        return toast.error("Failed to update status");
      }
      toast.success("Status updated successfully");
      await handleFetchAllPlans();
    } catch (e) {
      toast.error("Failed to update status");
    }
  }

  async function handleUpdateNdncStatus(row) {
    try {
      const data = {
        serviceId: row?.planId,
        ndnc: row?.ndnc,
      };
      const res = await updateNdncStatus(data);
      if (!res?.status) {
        return toast.error("Failed to update status");
      }
      toast.success("Status updated successfully");
      await handleFetchAllPlans();
    } catch (e) {
      toast.error("Failed to update status");
    }
  }

  async function handleUpdateOpenMobileStatus(row) {
    try {
      const data = {
        serviceId: row?.planId,
        openMobile: row?.openMobile,
      };
      const res = await updateOpenMobileStatus(data);
      if (!res?.status) {
        return toast.error("Failed to update status");
      }
      toast.success("Status updated successfully");
      await handleFetchAllPlans();
    } catch (e) {
      toast.error("Failed to update status");
    }
  }

  async function handleupdatePlan(row) {
    // if (isChecked) {
    //   if (!editData.fromTime || editData.fromTime === "00:00") {
    //     toast.error("Please select From Time");
    //     return;
    //   }
    //   if (!editData.toTime || editData.toTime === "00:00") {
    //     toast.error("Please select To Time");
    //     return;
    //   }
    // }
    setIsFetching(true);
    try {
      // const res = await updatePlan(editData);
      const payload = { ...editData };

      if (!isChecked) {
        // Remove time keys entirely
        delete payload.fromTime;
        delete payload.toTime;
        payload.isPlanTimeout = 0;
      } else {
        payload.isPlanTimeout = 1;
      }

      const res = await updatePlan(payload);
      if (!res?.status) {
        return toast.error(res?.msg, "Failed to update plan");
      }
      toast.success("Plan updated successfully");
      handleFetchAllPlans()
      setManageCreatePlan(false);
    } catch (e) {
      toast.error("Failed to update plan");
    } finally {
      setIsFetching(false);
    }
  }

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);
  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", lg: "space-between" },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {selectedRows.length > 0 && (
            <Typography
              variant="body2"
              sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography variant="body2">
            Total Records: <span className="font-semibold">{rows.length}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomPagination
            totalPages={totalPages}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Box>
      </GridFooterContainer>
    );
  };
  return (
    <div>
      <Paper sx={{ height: 558 }} id={id} name={name}>
        <DataGrid
          id={id}
          name={name}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50]}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowHeight={45}
          slots={{
            footer: CustomFooter,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          // checkboxSelection
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnMenu
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": { outline: "none !important" },
            "& .MuiDataGrid-columnHeaders": {
              color: "#193cb8",
              fontSize: "14px",
              fontWeight: "bold !important",
            },
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "#e6f4ff !important",
            },
            "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
          }}
        />
      </Paper>

      {/* Update plan start */}
      <Dialog
        header="Update Plan"
        visible={manageCreatePlan}
        onHide={() => setManageCreatePlan(false)}
        className="lg:w-[40rem] md:w-[25rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Plan Name"
              id="createplannameedit"
              name="createplannameedit"
              placeholder="Enter Plan Name"
              value={editData?.planName || ""}
              onChange={(e) =>
                setEditData({ ...editData, planName: e.target.value })
              }
            />
            <AnimatedDropdown
              label="Plan Type"
              options={planeditOptions}
              id="createplantypeedit"
              name="createplantypeedit"
              value={editData?.planType || ""}
              onChange={(e) => setEditData({ ...editData, planType: e })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Order Queue Size"
              id="createplanorderqueuesizeedit"
              name="createplanorderqueuesizeedit"
              placeholder="Enter Order Queue Size"
              value={editData?.orderQueueSize || ""}
              onChange={(e) =>
                setEditData({ ...editData, orderQueueSize: e.target.value })
              }
            />
            <InputField
              label="Initial Queue Size"
              id="createplaninitialqueuesizeedit"
              name="createplaninitialqueuesizeedit"
              placeholder="Enter Initial Queue Size"
              value={editData?.initialQueueSize || ""}
              onChange={(e) =>
                setEditData({ ...editData, initialQueueSize: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Trigger Queue Size"
              id="createplantriggerqueuesizeedit"
              name="createplantriggerqueuesizeedit"
              placeholder="Enter Trigger Queue Size"
              value={editData?.triggerQueueSize || ""}
              onChange={(e) =>
                setEditData({ ...editData, triggerQueueSize: e.target.value })
              }
            />
            <InputField
              label="Character Limit"
              id="createplancharlimitedit"
              name="createplancharlimitedit"
              placeholder="Enter Character Limit"
              value={editData?.characterLimit || ""}
              onChange={(e) =>
                setEditData({ ...editData, characterLimit: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
            <p>Allow Plan Time Bound Feature</p>
            <div>
              <CustomTooltip arrow placement="top" title="Allow/ Disallow">
                <Switch
                  checked={isChecked}
                  onChange={handleToggle}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#34C759",
                    },
                    "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                    {
                      backgroundColor: "#34C759",
                    },
                  }}
                />
              </CustomTooltip>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="From Time"
              id="createplanfromtimecreate"
              name="createplanfromtimecreate"
              placeholder="Enter From Time"
              onChange={(e) =>
                setEditData({
                  ...editData,
                  fromTime: e.target.value,
                })
              }
              value={editData.fromTime}
            />
            <InputField
              label="To Time"
              id="createplantotimecreate"
              name="createplantotimecreate"
              placeholder="Enter To Time"
              onChange={(e) =>
                setEditData({
                  ...editData,
                  toTime: e.target.value,
                })
              }
              value={editData.toTime}
            />
          </div>
          <div className="flex items-center justify-center">
            <UniversalButton
              // label="Save"
              label={isFetching ? "Updating..." : "Update"}
              id="createplansavebtn"
              name="createplansavebtn"
              type="submit"
              onClick={handleupdatePlan}
              disabled={isFetching}
            />
          </div>
        </div>
      </Dialog>
      {/* Update plan End */}



      {/* Delete Plan Start */}
      <Dialog
        header="Confirm Delete"
        visible={deleteData.isOpen}
        onHide={() => {
          setDeleteData((prev) => ({ isOpen: false, id: "" }));
        }}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete this? This process cannot be undo.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              {!isFetching && (
                <UniversalButton
                  label="Cancel"
                  style={{
                    backgroundColor: "#090909",
                  }}
                  onClick={() => {
                    setDeleteData((prev) => ({ isOpen: false, id: "" }));
                  }}
                />
              )}
              <UniversalButton
                label={isFetching ? "Deleting..." : "Delete"}
                disabled={isFetching}
                variant="danger"
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* Delete Plan End */}


    </div>
  );
};

export default ManagePlanTable;
