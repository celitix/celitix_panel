import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// MUI MATERIAL
import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import IconButton from "@mui/material/IconButton";

// ICONS
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { ImInfo } from "react-icons/im";

// COMPONENTS
import CustomNoRowsOverlay from "../../../whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import InfoPopover from "@/components/common/InfoPopover.jsx";

// UTILS
import { exportToExcel } from "@/utils/utills";

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

  const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
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

const infoFieldsToShow = [
  "pending",
  "failed",
  "blocked",
  "sent",
  "delivered",
  "not_delivered",
];

const DayWiseSummaryTableSms = ({ id, name, data = [], exportFunction }) => {
  // console.log("data", data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const handleDownload = () => {
    navigate("/download");
  };

  const dropdownButtonRefs = useRef({});
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [clicked, setClicked] = useState({});
  const additionalInfoLabels = {
    // Example mapping: 'queuedate': 'Queue Date'
  };

  const handleInfo = (row) => {
    setClicked(row);
    setDropdownOpenId(row.id);
  };

  const closeDropdown = () => {
    setDropdownOpenId(null);
  };

  const rows = data.map((item, index) => ({
    id: index + 1,
    sn: index + 1,
    quedate: item.queuedate || "-",
    smscount: item.smscount ?? 0,
    smsunits: item.smsunits ?? 0,
    pending: item.pending ?? 0,
    failed: item.failed ?? 0,
    blocked: item.blocked ?? 0,
    sent: item.sent ?? 0,
    delivered: item.delivered ?? 0,
    notdelivered: item.not_delivered ?? 0,
    pendingdr: item.dr_not_available ?? 0,
  }));

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "quedate", headerName: "Que Date", flex: 1, minWidth: 150 },
    { field: "smscount", headerName: "SMS Count", flex: 1, minWidth: 100 },
    { field: "smsunits", headerName: "SMS Units", flex: 1, minWidth: 100 },
    { field: "pending", headerName: "Pending", flex: 1, minWidth: 90 },
    { field: "failed", headerName: "Failed", flex: 1, minWidth: 70 },
    { field: "blocked", headerName: "Blocked", flex: 1, minWidth: 90 },
    { field: "sent", headerName: "Sent", flex: 1, minWidth: 60 },
    { field: "delivered", headerName: "Delivered", flex: 1, minWidth: 90 },
    {
      field: "notdelivered",
      headerName: "Undelivered",
      flex: 1,
      minWidth: 120,
    },
    { field: "pendingdr", headerName: "Pending DR", flex: 1, minWidth: 110 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1,
    //   minWidth: 120,
    //   renderCell: (params) => (
    //     <CustomTooltip title="Info" placement="top" arrow>
    //       <span>
    //         <IconButton
    //           type="button"
    //           ref={(el) => {
    //             if (el) dropdownButtonRefs.current[params.row.id] = el;
    //           }}
    //           onClick={() => handleInfo(params.row)}
    //           className="no-xs relative"
    //         >
    //           <ImInfo size={18} className="text-green-500" />
    //         </IconButton>

    //         <InfoPopover
    //           anchorEl={dropdownButtonRefs.current[params.row.id]}
    //           open={dropdownOpenId === params.row.id}
    //           onClose={closeDropdown}
    //         >
    //           {clicked && Object.keys(clicked).length > 0 ? (
    //             <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
    //               <tbody>
    //                 {Object.entries(clicked)
    //                   .filter(([key]) => infoFieldsToShow.includes(key))
    //                   .map(([key, value], index) => (
    //                     <tr
    //                       key={index}
    //                       className="hover:bg-gray-50 transition-colors border-b last:border-none"
    //                     >
    //                       <td className="px-4 py-2 font-medium text-gray-600 capitalize w-1/3 text-nowrap">
    //                         {additionalInfoLabels[key] || key}
    //                       </td>
    //                       <td className="px-4 py-2 text-gray-800">
    //                         {key === "isEnabledForInsights"
    //                           ? value === true || value === "true"
    //                             ? "True"
    //                             : "False"
    //                           : value || "N/A"}
    //                       </td>
    //                     </tr>
    //                   ))}
    //               </tbody>
    //             </table>
    //           ) : (
    //             <div className="text-sm text-gray-400 italic px-2 py-2">
    //               No data
    //             </div>
    //           )}
    //         </InfoPopover>
    //       </span>
    //     </CustomTooltip>
    //   ),
    // },
  ];

  const rowsRef = useRef(rows);
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

 

  const handleFileToExport = useCallback(() => {
    const col = columns.map((col) => col.field);
    const row = rowsRef.current.map((row) =>
      col.map((field) => row[field] ?? "")
    );
    exportToExcel(col, row, "Sms Report");
    toast.success("File Downloaded Successfully");
  }, [columns]);

  // useEffect(() => {
  //   if (rows.length) {
  //     exportFunction(handleFileToExport);
  //   }
  // }, [rows.length, exportFunction]);

  const totalPages = Math.ceil(data.length / paginationModel.pageSize);
  const CustomFooter = () => {
    const totalSmsCount = data.reduce(
      (sum, item) => sum + (item.smscount ?? 0),
      0
    );
    const totalSmsunits = data.reduce((sum, item) => sum + (item.smsunits ?? 0), 0);
    const totalPending = data.reduce((sum, item) => sum + (item.pending ?? 0), 0);
    const totalBlocked = data.reduce((sum, item) => sum + (item.blocked ?? 0), 0);
    const totalSent = data.reduce((sum, item) => sum + (item.sent ?? 0), 0);
    const totalDelivered = data.reduce(
      (sum, item) => sum + (item.delivered ?? 0),
      0
    );
    const totalFailed = data.reduce((sum, item) => sum + (item.failed ?? 0), 0);
    const totalUndelivered = data.reduce((sum, item) => sum + (item.not_delivered ?? 0), 0);
    const totalPendingdr = data.reduce((sum, item) => sum + (item.dr_not_available ?? 0), 0);
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
            Total Records: <span className="font-semibold">{data.length}</span>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}
          >
            SMS Count:{" "}
            <span className="font-semibold">{totalSmsCount}</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}
          >
            SMS Units:{" "}
            <span className="font-semibold">{totalSmsunits}</span>
          </Typography>
          <Typography variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}>
            Pending: <span className="font-semibold">{totalPending}</span>
          </Typography>
          <Typography variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}>
            Failed: <span className="font-semibold">{totalFailed}</span>
          </Typography>
          <Typography variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}>
            Blocked: <span className="font-semibold">{totalBlocked}</span>
          </Typography>
          <Typography variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}>
            Sent: <span className="font-semibold">{totalSent}</span>
          </Typography>

          <Typography variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}>
            Delivered: <span className="font-semibold">{totalDelivered}</span>
          </Typography>
          <Typography variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}>
            Undelivered: <span className="font-semibold">{totalUndelivered}</span>
          </Typography>
          <Typography variant="body2"
            sx={{
              marginLeft: "0px",
              borderLeft: "1px solid #ccc",
              paddingLeft: "10px",
            }}>
            Pending DR: <span className="font-semibold">{totalPendingdr}</span>
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
    </div>
  );
};

export default DayWiseSummaryTableSms;
