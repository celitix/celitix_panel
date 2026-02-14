import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import moment from "moment";

// MUI MATERIAL
import {
  Paper,
  Typography,
  Box,
  Button,
  styled,
  IconButton,
} from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination/usePagination";

// ICONS
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CachedIcon from "@mui/icons-material/Cached";

// COMPONENTS
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";

// API
import { deleteRcsBot, updateRcsBotStatus } from "@/apis/admin/admin";

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

const ManageBotTableRcs = ({
  id,
  name,
  data = [],
  onEdit,
  fetchAllBotsData,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [deleteDetails, setDeleteDetails] = useState({
    isOpen: false,
    id: null,
  });

  const [editStatus, setEditStatus] = useState("");

  async function handleUpdateStatus(row) {
    setEditStatus(row.srno);
    const payload = {
      agentSrno: row.srno,
      active: row.active === "Active" ? 0 : 1,
    };
    // console.log("payload", payload);
    try {
      const res = await updateRcsBotStatus(payload);
      if (!res?.status) {
        return toast.error("Something went wrong");
      }
      toast.success("Status Updated Successfully");
      setEditStatus("");
      
      fetchAllBotsData();
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "agent_name", headerName: "Bot Name", flex: 1, minWidth: 120 },
    { field: "agent_id", headerName: "Bot Id", flex: 1, minWidth: 120 },
    { field: "user_id", headerName: "Assign To", flex: 1, minWidth: 120 },
    {
      field: "insert_time",
      headerName: "Created on",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <>{moment(params.row.insert_time).format("DD-MM-YYYY")}</>
      ),
    },
    // {
    //   field: "user_id",
    //   headerName: "Assign To User",
    //   flex: 1,
    //   minWidth: 120,
    // },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const isActive = params.value === "Active";
        const isLoading = editStatus === params.row.srno;
        const label = isActive ? "Deactivating..." : "Activating...";

        return (
          <CustomTooltip arrow title="Click to change status" placement="top">
            <button
        className={`text-white text-xs w-auto px-2 py-1.5 border rounded-2xl cursor-pointer text-center ${params.row.active === "Active" ? "bg-green-500" : "bg-red-500"
          }`}
        onClick={() => {
          handleUpdateStatus(params.row);
        }}>
              {isLoading ? (
                <>
                  <CachedIcon
                    sx={{
                      fontSize: 16,
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  {label}
                </>
              ) : (
                params.value
              )}
            </button>
          </CustomTooltip>
        );
      },
    },
    // <CustomTooltip arrow title="Click to update status" placement="top">
    //   <button
    //     className={`text-white text-xs w-20 px-2 py-1.5 border rounded-2xl cursor-pointer text-center ${params.row.active === "Active" ? "bg-green-500" : "bg-red-500"
    //       }`}
    //     onClick={() => {
    //       handleUpdateStatus(params.row);
    //     }}
    //   >
    //     {params.row.active === "Active" ? "Active" : "Inactive"}
    //   </button>
    // </CustomTooltip>
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 350,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit User Details" placement="top">
            <IconButton onClick={() => onEdit(params.row.srno)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete Bot" placement="top">
            <IconButton onClick={() => onDelete(params.row)}>
              <MdOutlineDeleteForever className="text-red-500 cursor-pointer hover:text-red-600 size-5" />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  async function onDelete(row) {
    if (!row?.srno) return;
    setDeleteDetails({ isOpen: true, id: row?.srno, name: row?.agent_name });
  }

  const [isFetching, setIsFetching] = useState(false);

  async function handleDeleteBot() {
    setIsFetching(true);
    try {
      if (!deleteDetails.id) return;
      const res = await deleteRcsBot(deleteDetails.id);
      if (!res?.success) {
        return toast.error("Something went wrong");
      }
      toast.success("Bot Deleted Successfully");
      setDeleteDetails({ isOpen: false, id: null });
      fetchAllBotsData();
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsFetching(false);
    }
  }

  // {
  //   "success": true,
  //     "message": "Record deleted successfully",
  //       "data": null,
  //         "errors": null
  // }

  const rows = Array.isArray(data)
    ? data.map((item, index) => ({
        ...item,
        active: item.active === 1 ? "Active" : "Inactive",
        sn: index + 1,
        id: index + 1,
      }))
    : [];

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
    <>
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

      <Dialog
        header="Confirm Delete"
        visible={deleteDetails.isOpen}
        onHide={() => {
          setDeleteDetails({ isOpen: false, id: null });
        }}
        className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon sx={{ fontSize: 64, color: "red" }} size={20} />
        </div>
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete{" "}
              <span className="font-semibold text-red-500">
                {deleteDetails?.name || ""}
              </span>
              ? This process cannot be undo.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              {!isFetching && (
                <UniversalButton
                  label="Cancel"
                  style={{
                    backgroundColor: "#090909",
                  }}
                  onClick={() => {
                    setDeleteDetails({ isOpen: false, id: null });
                  }}
                />
              )}
              <UniversalButton
                label={isFetching ? "Deleting..." : "Delete"}
                onClick={handleDeleteBot}
                disabled={isFetching}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ManageBotTableRcs;
