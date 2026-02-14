import React, { useState } from "react";
import styled from "styled-components";

// MUI MATERIAL
import {
    Box,
    Button,
    IconButton,
    Paper,
    Switch,
    Typography,
} from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";

// COMPONENT
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";

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

const SMPPSummaryTable = ({ id, name, data = [], paginationModel,
    setPaginationModel, }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const rows = Array.isArray(data)
        ? data.map((item, index) => ({
            id: index + 1,
            sn: index + 1,
            servicename: item.serviceName || "N/A",
            smscount: item.smsCount || "-",
            smsunit: item.smsUnit || "-",
            blocked: item.blocked || "-",
            pending: item.pending || "-",
            failed: item.failed || "-",
            sent: item.sent || "-",
            delivered: item.delivered || "-",
            notdelivered: item.notDelivered || "-",
        }))
        : [];

    const columns = [
        { field: "servicename", headerName: "Service Name", flex: 1, minWidth: 150 },
        { field: "smscount", headerName: "SMS Count", flex: 1, minWidth: 120 },
        { field: "smsunit", headerName: "SMS Unit", flex: 1, minWidth: 120 },
        { field: "blocked", headerName: "Blocked", flex: 1, minWidth: 120 },
        { field: "pending", headerName: "Pending", flex: 1, minWidth: 120 },
        { field: "failed", headerName: "Failed", flex: 1, minWidth: 120 },
        { field: "sent", headerName: "Sent", flex: 1, minWidth: 120 },
        { field: "delivered", headerName: "Delivered", flex: 1, minWidth: 120 },
        { field: "notdelivered", headerName: "Not Delivered", flex: 1, minWidth: 150 },
    ];

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

        </div>
    )

}

export default SMPPSummaryTable;