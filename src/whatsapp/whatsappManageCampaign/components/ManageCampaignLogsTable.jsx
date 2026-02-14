import * as React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import {
    DataGrid,
    GridFooterContainer,
    GridPagination,
} from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";

// ICONS
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// COMPONENTS
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";

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

const ManageCampaignLogsTable = ({ id, name, data = [] }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    // const paginationModel = { page: 0, pageSize: 10 };
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
        { field: "userId", headerName: "User", flex: 1, minWidth: 120 },
        { field: "total", headerName: "Total", flex: 1, minWidth: 120 },
        { field: "busy", headerName: "Busy", flex: 1, minWidth: 120 },
        { field: "failed", headerName: "Failed", flex: 1, minWidth: 120 },
        { field: "block", headerName: "Block", flex: 1, minWidth: 120 },
        { field: "submitted", headerName: "Submitted", flex: 1, minWidth: 120 },
        {
            field: "chargedUnit",
            headerName: "Charged Unit",
            flex: 1,
            minWidth: 120,
        },
        { field: "sent", headerName: "Sent", flex: 1, minWidth: 120 },
        { field: "delivered", headerName: "Delivered", flex: 1, minWidth: 120 },
        { field: "read", headerName: "Read", flex: 1, minWidth: 120 },
        { field: "undelivered", headerName: "Undelivered", flex: 1, minWidth: 120 },
        { field: "queDate", headerName: "Sent Date", flex: 1, minWidth: 120 },
    ];

    const rows = data.map((item, index) => ({
        sn: index + 1,
        id: item.UserSrno,
        userId: item.userId,
        total: item.total,
        busy: item.busy,
        failed: item.failed,
        block: item.block,
        submitted: item.submitted,
        chargedUnit: item.chargedUnit,
        sent: item.sent,
        delivered: item.delivered,
        read: item.read,
        undelivered: item.undelivered,
        queDate: item.queDate,
    }));

    const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

    const CustomFooter = () => {
        return (
            <GridFooterContainer
                sx={{
                    display: "none",
                    flexWrap: "wrap",
                    justifyContent: {
                        xs: "center",
                        lg: "space-between",
                    },
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
                            sx={{
                                borderRight: "1px solid #ccc",
                                paddingRight: "10px",
                            }}
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
        <Paper sx={{ height: 107 }} id={id} name={name}>
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
                // checkboxSelection
                rowHeight={50}
                slots={{ footer: CustomFooter, noRowsOverlay: CustomNoRowsOverlay }}
                slotProps={{ footer: { totalRecords: rows.length } }}
                onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                disableRowSelectionOnClick
                // autoPageSize
                disableColumnResize
                disableColumnMenu
                sx={{
                    border: 0,
                    "& .MuiDataGrid-cellCheckbox": {
                        outline: "none !important",
                    },
                    "& .MuiDataGrid-cell": {
                        outline: "none !important",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        color: "#193cb8",
                        fontSize: "14px",
                        fontWeight: "bold !important",
                    },
                    "& .MuiDataGrid-row--borderBottom": {
                        backgroundColor: "#e6f4ff !important",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        // display: "none",
                        color: "#ccc",
                    },
                }}
            />
        </Paper>
    );
};

export default ManageCampaignLogsTable;

