import React, { useState } from "react";
import { Paper, Typography, Box, Button, styled } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination/usePagination";
import IconButton from "@mui/material/IconButton";
import { Dialog } from "primereact/dialog";

// ICONS 
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaReply } from "react-icons/fa6";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// COMPONENTS 
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";

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


const SmsHeadersTableTable = ({ id, name }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "headerid", headerName: "Headerid", flex: 1, minWidth: 80 },
    {
      field: "header",
      headerName: "Header",
      flex: 1,
      minWidth: 120,
    },
    { field: "telemarketer", headerName: "Telemarketer", flex: 1, minWidth: 110 },
    { field: "explanation", headerName: "Explanation", flex: 1, minWidth: 80 },
    { field: "registered", headerName: "Registered TSP", flex: 1, minWidth: 250 },
    { field: "requested", headerName: "Requested Date", flex: 1, minWidth: 95 },
    {
      field: "statusdate",
      headerName: "Status Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        let bg = "bg-gray-200";
        let text = "text-gray-700";

        if (params.value === "PENDING") {
          bg = "bg-yellow-100";
          text = "text-yellow-800";
        } else if (params.value === "PROCESSING") {
          bg = "bg-blue-100";
          text = "text-blue-800";
        } else if (params.value === "COMPLETED") {
          bg = "bg-green-100";
          text = "text-green-800";
        } else if (params.value === "Unknown") {
          bg = "bg-red-100";
          text = "text-red-800";
        }

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          {/* <CustomTooltip title="Edit Template" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip> */}
          <CustomTooltip title="Delete Template" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => setIsVisible(true)}
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



  const rows = Array.from({ length: 20 }, (_, i) => {
    const insert_flag = (i % 3) + 1; // cycle through 1,2,3 for demo

    return {
      id: i + 1,
      headerid: "1452278526358",
      header: "397134",
      telemarketer: "-",
      explanation: "Tanndr",
      registered: "BSNL",
      requested: "16Sep2021 16:24:56",
      statusdate: "-",
      status:
        insert_flag === 1
          ? "PENDING"
          : insert_flag === 2
            ? "PROCESSING"
            : insert_flag === 3
              ? "COMPLETED"
              : "Unknown",
    };
  });


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
          checkboxSelection
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
        visible={isVisible}
        onHide={() => setIsVisible(false)}
        className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon
            sx={{ fontSize: 64, color: "ff3f3f" }}
            size={20}
          />
        </div>
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete
              this
              record ?
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <UniversalButton
                label="Cancel"
                style={{
                  backgroundColor: "#090909",
                }}
                onClick={() => setIsVisible(false)}
              />
              <UniversalButton
                label="Delete"
                style={
                  {
                    // backgroundColor: "red",
                  }
                }

              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SmsHeadersTableTable;