import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Switch,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import UniversalButton from "@/whatsapp/components/UniversalButton.jsx";
import toast from "react-hot-toast";
// ICONS
import EditNoteIcon from "@mui/icons-material/EditNote";

// COMPONENTS
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "@/components/common/CustomTooltip";
import VerticalBarDemo from "../components/VerticalBarChart";
import DoughnutChartDemo from "../components/DoughnChart";
import ActionAreaCard from "../components/EmailCards";
import { emailSummaryReport } from "@/apis/email/Email";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker.jsx";

import { useUser } from "@/context/auth";
import { fetchUserSrno } from "@/apis/admin/admin";
import { useUserAndAdminContext } from "@/context/UserAndAdminContext";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

const EmailReport = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [active, setActive] = useState();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const { currentRole } = useUserAndAdminContext();

  useEffect(() => {
    const fetchAllUsersDetails = async () => {
      const data = {
        userSrno: "",
        date: "",
      };
      try {
        setIsFetching(true);
        const res = await fetchUserSrno(data);
        setAllUsers(res);
      } catch (e) {
        // console.log(e);
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllUsersDetails();
  }, [user.role]);


  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const fetchEmailReport = async () => {
    // if (!fromDate || !toDate) {
    //   toast.error("Please select From Date and To Date");
    //   return;
    // }
    if (currentRole === "Admin" && !selectedUser) {
      toast.error("Please select a user first.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        userSrno: selectedUser || 0,
        fromDate: formatDate(fromDate),
        toDate: formatDate(toDate),
      };

      const res = await emailSummaryReport(payload);

      if (res?.data?.status) {
        const formattedRows = res.data.data.map((item, index) => ({
          id: index + 1,
          sn: index + 1,
          templateName: item.templateName,
          createOn: item.createOn,
          status: item.status,
        }));

        setRows(formattedRows);
      } else {
        setRows([]);
      }
    } catch (err) {
      console.error("Email Report Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailReport();
  }, []);

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },

    {
      field: "templateName",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "createOn",
      headerName: "Create On",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,

      renderCell: (params) => (
        <CustomTooltip value={params.row.status}>
          <Switch
            checked={params.row.status === "Active"}
            onChange={(e) =>
              handleStatusChange(params.row.id, e.target.checked)
            }
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#34C759",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#34C759",
              },
            }}
          />
        </CustomTooltip>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <CustomTooltip title="Delete" placement="top" arrow>
          <IconButton onClick={() => handleDuplicate(params.row)}>
            <EditNoteIcon
              sx={{
                fontSize: "1.2rem",
                color: "gray",
              }}
            />
          </IconButton>
        </CustomTooltip>
      ),
    },
  ];

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

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
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
          {selectedRow.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRow.length} Rows Selected
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
      <div className="w-full">
        {/* <p className="text-xl font-semibold mt-4">Delivery Per Country</p>
        <div className="flex flex-row gap-2 w-full justify-around">
          <div className="flex flex-row justify-ceneter items-center ">
            <DoughnutChartDemo />
          </div>

          <div className="flex flex-row-reverse gap-5 mt-4">
            <VerticalBarDemo />
            <p className="flex-col  ml-10 text-xl font-semibold ">
              Opens
              <br />
              <span className="text-sm ">Daily Page Hits</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3 mt-4 w-full">
          <ActionAreaCard />
        </div> */}
        <p className="text-2xl flex items-center justify-center w-full font-semibold my-4">Email Delivery Report</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className={`w-full ${currentRole === "Admin" ? "sm:w-60" : ""}`}>
            {currentRole === "Admin" && (
              <DropdownWithSearch
                id="manageuser"
                name="manageuser"
                label="Select User"
                tooltipContent="Select user you want to see reports"
                tooltipPlacement="right"
                options={allUsers
                  .slice()
                  .sort((a, b) => a.userName.localeCompare(b.userName))
                  .map((user) => ({
                    label: user.userName,
                    value: user.srNo,
                  }))
                }
                value={selectedUser}
                onChange={setSelectedUser}
                placeholder="Select User"
              />
            )}
          </div>

          <div className="w-full sm:w-56">
            <UniversalDatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
            />
          </div>

          <div className="w-full sm:w-56">
            <UniversalDatePicker
              label="To Date"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
            />
          </div>

          <div className="w-full sm:w-56">
            <UniversalButton
              label={loading ? "Searching..." : "Search"}
              icon={<IoSearch />}
              disabled={loading}
              onClick={fetchEmailReport}
            />
          </div>


        </div>

        <div className="mt-4">
          <Paper sx={{ height: 558 }}>
            <DataGrid
              // id={id}
              rows={rows}
              columns={columns}
              loading={loading}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10, 20, 50]}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              checkboxSelection
              rowHeight={45}
              slots={{
                footer: CustomFooter,
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              slotProps={{ footer: { totalRecords: rows.length } }}
              onRowSelectionModelChange={(ids) => setSelectedRow(ids)}
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
        </div>
      </div>
    </>
  );
};

export default EmailReport;
