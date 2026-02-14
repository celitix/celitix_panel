import React, { useState, useEffect } from "react";
import styled from "styled-components";

// ICONS
import RefreshIcon from "@mui/icons-material/Refresh";
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

// COMPONENTS
import UniversalButton from "@/whatsapp/components/UniversalButton";
import CustomNoRowsOverlay from "../components/CustomNoRowsOverlay";

// API
import { getMissingErrorCodeData } from "@/apis/admin/admin";

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

const SMPPMissingErrorCode = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const fetchErrorCodeConfig = async () => {
    setIsLoading(true)
    try {
      const response = await getMissingErrorCodeData();

      const rows = Array.isArray(response?.data)
        ? response?.data.map((item, index) => ({
          ...item,
          // id: item.serviceId,
          id: index + 1,
          sn: index + 1,
        }))
        : [];
      setData(rows);
      // console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchErrorCodeConfig();
  }, []);

  const handleRefresh = () => {
    fetchErrorCodeConfig();
  };


  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, width: 80 },
    { field: "insertDate", headerName: "Insert Date", flex: 1, width: 120 },
    { field: "serviceName", headerName: "Service Name", flex: 1, width: 120 },
    { field: "errorCode", headerName: "Error Code", flex: 1, minWidth: 120 },
    {
      field: "errorStatus",
      headerName: "Error Status",
      flex: 1,
      minWidth: 120,
    },
  ];

  const totalPages = Math.ceil(data.length / paginationModel.pageSize);

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
            Total Records: <span className="font-semibold">{data.length}</span>
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
    <div className="w-full ">
      <h1 className="flex justify-center items-center font-semibold text-2xl text-gray-700">
        SMPP Missing Error Code
      </h1>
      <div className="flex justify-end items-end">
        <UniversalButton
          variant="outlined"
          color="primary"
          icon={<RefreshIcon fontSize="small" />}
          label={isLoading ? "Refreshing..." : "Refresh"}
          onClick={handleRefresh}
          disabled={isLoading}
        />
      </div>
      <div className="mt-8" >
        <Paper sx={{ height: 558 }}>
          <DataGrid
            id=""
            name=""
            rows={data}
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
    </div>
  );
};

export default SMPPMissingErrorCode;
