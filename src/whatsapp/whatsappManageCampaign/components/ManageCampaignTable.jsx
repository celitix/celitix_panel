import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// MUI MATERIAL
import IconButton from "@mui/material/IconButton";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// ICONS
import { MdOutlineCallToAction } from "react-icons/md";
import { AiOutlineInfo } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { InfoOutlined, Link, Reply, ChatOutlined } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ReportIcon from "@mui/icons-material/Report";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import { SlGraph } from "react-icons/sl";
import { ImStatsDots } from "react-icons/im";
import { IoAnalyticsSharp } from "react-icons/io5";
import { SlInfo } from "react-icons/sl";


// COMPONENTS
import CustomTooltip from "../../../components/common/CustomTooltip.jsx";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";
import DropdownMenuPortalCampaign from "@/utils/DropdownMenuCampaign.jsx";
import InfoPopover from "../../../components/common/InfoPopover.jsx";
import Loader from "@/whatsapp/components/Loader.jsx";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton.jsx";
import CampaignSummaryUI from "./CampaignSummaryUI.jsx";
import { CampaignTemplatePreview } from "./CampaignTemplatePreview.jsx";

// API
import {
  campaignSummaryInfo,
  getWhatsappCampaignReport,
  fetchCtaTrackingReport,
  downloadCtaTrackingReport,
  clickReportList,
  clickDetailsReport,
  getWabaList,
  getWabaTemplate,
} from "../../../apis/whatsapp/whatsapp.js";
import { getUserDetails } from "@/apis/user/user";

// CONTEXT
import { useUserDetailsContext } from "@/context/UserDetailsContext";
import { useDownload } from "@/context/DownloadProvider.jsx";

// import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";
// import DropdownMenuPortalCampaign from "@/utils/DropdownMenuCampaign.jsx";
// import InfoPopover from "../../../components/common/InfoPopover.jsx";
// import CampaignSummaryUI from "./CampaignSummaryUI.jsx";
// import moment from "moment";
// import { Dialog } from "primereact/dialog";
// import { FiDownload } from "react-icons/fi";
// import toast from "react-hot-toast";
// import { useDownload } from "@/context/DownloadProvider.jsx";

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

const ManageCampaignTable = ({
  id,
  name,
  data = [],
  fromDate,
  selectedUser,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [dropdownCTAOpenId, setDropdownCTAOpenId] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [campaignInfoMap, setCampaignInfoMap] = useState({});
  const [campaignCTAMap, setCampaignCTAMap] = useState({});
  const [campaignCTAMapLoading, setCampaignCTAMapLoading] = useState(false);
  // const [selectedUser, setSelectedUser] = useState("");

  const dropdownButtonRefs = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const [replySrno, setReplySrno] = useState("");
  const [reportListOpen, setIsReportListOpen] = useState(false);
  const dropdownCTAButtonRefs = useRef({});
  const navigate = useNavigate();
  const { triggerDownloadNotification } = useDownload();
  const [loadingId, setLoadingId] = useState(null);
  const [clickListActionData, setClickListActionData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [reportDetails, setReportDetails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [totalCount, setTotalCount] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [wabaList, setWabaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [templateData, setTemplateData] = useState([]);
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        setUserDetails(response?.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (reportListOpen === false) {
      setReportDetails([]);
    }
  }, [reportListOpen]);

  const closeDropdown = () => setDropdownOpenId(null);

  const COLORS = ["#7c93d9", "#7766d2", "#82ca9d", "#facc15", "#ef4444"];

  const pieData = Object.entries(
    (campaignCTAMap?.campaignReplies || []).reduce((acc, reply) => {
      Object.entries(reply).forEach(([key, value]) => {
        acc[key] = (acc[key] || 0) + Number(value);
      });
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const handleReplyDownload = async (srno) => {
    try {
      const payload = {
        campaignSrno: srno,
        type: 3,
        selectedUserId: selectedUser || "0",
      };

      const res = await downloadCtaTrackingReport(payload);

      // console.log("res", res)

      if (!res) {
        toast.error("Failed to download reply data");
        return;
      } else {
        toast.success(res.msg)
        setIsOpen(false)
        triggerDownloadNotification();
      }
    } catch (err) {
      toast.error(err?.message || "Download failed");
    }
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".bot-settings")) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = async (row) => {
    const id = row.id;

    // Reset for this row
    setDropdownOpenId(null);
    setLoadingId(id);
    const fromDateStr = moment(fromDate).format("YYYY-MM-DD");

    const data = {
      campSrno: row?.campaignSrno,
      fromDate: fromDateStr,
      selectedUserId: selectedUser || "0",
    };

    try {
      const res = await campaignSummaryInfo(data);

      setCampaignInfoMap((prev) => ({
        ...prev,
        [id]: res[0] || null,
      }));

      setDropdownOpenId(id); // Open only after data is ready
    } catch (e) {
      console.error("Error fetching campaign summary:", e);
    } finally {
      setLoadingId(null); // stop loader
    }
  };


  const handleCTAView = async (row) => {
    // setIsOpen(true);
    const id = row.id;
    setReplySrno(row?.campaignSrno)
    // setDropdownCTAOpenId(null);

    const data = {
      campSrno: row?.campaignSrno,
    };
    setCampaignCTAMapLoading(true);
    try {
      const res = await fetchCtaTrackingReport(data);
      setCampaignCTAMap((prev) => ({
        ...prev,
        campaignReplies: res?.data || [],
      }));

      // setDropdownCTAOpenId(id);
    } catch (e) {
      console.error("Error fetching campaign summary:", e);
    } finally {
      setCampaignCTAMapLoading(false);
    }
  };


  const handleSummaryReport = (row) => {
    navigate("/wcampaigndetailsreport", {
      state: {
        campaignSrno: row.campaignSrno,
        campaignName: row.campaignName,
        selectedUser: selectedUser || "0",
      },
    });
  };

  const reportListAction = async (data) => {
    // setIsReportListOpen(true);
    try {
      const payload = {
        userSrno: userDetails[0].userSrno,
        startDate: data?.queTime.split(" ")[0],
        campaignSrno: data?.campaignSrno,
      };

      const res = await clickReportList(payload);
      // setClickListActionData(res);
      setClickListActionData(
        res.map((r) => ({
          ...r,
          campaignSrno: data?.campaignSrno,
        }))
      );
    } catch (e) {
      console.log("error", e);
    }
  };

  const getDetailedReports = async (data, event) => {
    try {
      // open popover anchored to this button
      setAnchorEl(event.currentTarget);
      setPopoverOpen(true);
      const payload = {
        userSrno: userDetails[0].userSrno,
        campaignSrno: data?.campaignSrno,
      };
      const res = await clickDetailsReport(payload);
      setReportDetails(res);
    } catch (error) {
      console.log("error", error);
      setReportDetails([]);
    }
  };

  const fetchWabaList = async () => {
    try {
      setIsLoading(true);
      const response = await getWabaList();
      setWabaList(response || []);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching WABA accounts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWabaList();
  }, []);

  const [ctaAnalyticsLoading, setCtaAnalyticsLoading] = useState(false);

  const handleCtaAnalytics = (row) => {
    setSelectedRow(row);
    setCtaAnalyticsLoading(true);
    setVisible(true);
    handleCTAView(row);
    reportListAction(row);

    const wabaAccount = wabaList?.find(
      (waba) => String(waba.wabaSrno) === String(row.wabaSrno)
    );
    fetchTemplateData(wabaAccount.wabaAccountId, row.templateName);
  };

  const fetchTemplateData = async (wabaAccountId, templateName) => {
    if (!wabaAccountId || !templateName) {
      toast.error("Missing WABA or Template Name");
      return;
    }

    try {
      const response = await getWabaTemplate(wabaAccountId, templateName);
      const template = response?.data?.[0];

      if (template) {
        setTemplateData(template);
      } else {
        toast.error("No template data found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching template data");
    }
    finally {
      setCtaAnalyticsLoading(false); // hide loader after all done
    }
  };


  // **Format Date Function** (Ensures proper date format)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "queTime",
      headerName: "Created On",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => moment(params.row.queTime).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      field: "campaignName",
      headerName: "Campaign Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "templateName",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "templateCategory",
      headerName: "Template Category",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "templateType",
      headerName: "Template Type",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => params.row.templateType?.toUpperCase(),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => params.row.status?.toUpperCase(),
    },
    {
      field: "totalAudience",
      headerName: "Total Audience",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          {/* <CustomTooltip title="View Campaign" placement="top" arrow>
            <IconButton
              className="text-xs"
              ref={(el) => {
                if (el) dropdownButtonRefs.current[params.row.id] = el;
              }}
              onClick={() => handleView(params.row)}
            >
              <InfoOutlinedIcon sx={{ fontSize: "1.2rem", color: "green" }} />
            </IconButton>
          </CustomTooltip> */}
          <CustomTooltip
            title={
              loadingId === params.row.id ? (
                <div className="text-center">
                  <span className="font-semibold">
                    Fetching Campaign Report...
                  </span>{" "}
                  <br />
                  <span className=" text-white">
                    This may take a few seconds. Please wait while we load the
                    latest metrics.
                  </span>
                </div>
              ) : (
                "View Campaign Details"
              )
            }
            placement="top"
            arrow
          >
            <IconButton
              className="text-xs"
              ref={(el) => {
                if (el) dropdownButtonRefs.current[params.row.id] = el;
              }}
              onClick={() => handleView(params.row)}
              disabled={loadingId === params.row.id}
            >
              {loadingId === params.row.id ? (
                <CircularProgress size={20} thickness={5} color="success" />
              ) : (
                <InfoOutlinedIcon sx={{ fontSize: "1.2rem", color: "green" }} />
              )}
            </IconButton>
          </CustomTooltip>

          <CustomTooltip
            title="Campaign CTA Analytics"
            placement="top"
            arrow={true}
          >
            <IconButton onClick={() => handleCtaAnalytics(params.row)}>
              <IoAnalyticsSharp
                className="text-[1.2rem] text-red-500 font-semibold"
                sx={{ fontSize: "1.2rem", color: "orange" }}
              />
            </IconButton>
          </CustomTooltip>

          <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId === params.row.id}
            onClose={closeDropdown}
          >
            {campaignInfoMap[params.row.id] ? (
              <div className="w-[280px] max-w-full">
                {/* <div className="text-base font-semibold mb-2 text-gray-800">
                  Campaign Summary
                </div> */}
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  {[
                    "total",
                    "block",
                    "failed",
                    "submitted",
                    "pending",
                    "sent",
                    "delivered",
                    "undelivered",
                    "read",
                    "source",
                    // "queTime",
                  ].map((key) => (
                    <React.Fragment key={key}>
                      <div className="font-medium capitalize text-gray-600 border-b border-gray-200 pb-2">
                        {key.replace(/([A-Z])/g, " $1")}
                      </div>
                      <div className="text-right font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        {campaignInfoMap[params.row.id][key] ?? "N/A"}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover>

          <CustomTooltip
            title="Campaign Detail Report"
            placement="top"
            arrow={true}
          >
            <IconButton onClick={() => handleSummaryReport(params.row)}>
              <DescriptionOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  // use this when you want to create rows dynamically
  // const rows = Array.from({ length: 500 }, (_, i) => ({
  //     id: i + 1,
  //     sn: i + 1,
  //     queTime: '11/05/2024 14:58:39',
  //     campaignName: 'Demo',
  //     templateName: 'NewTemplate',
  //     templateCategory: 'Utility',
  //     templateType: 'Text',
  //     status: 'Pending',
  //     totalAudience: '10000',
  //     action: 'True',
  // }));

  const sortedData = data.sort(
    (a, b) => new Date(b.queTime) - new Date(a.queTime)
  );

  const rows = Array.isArray(sortedData)
    ? data.map((item, index) => ({
      id: index + 1,
      sn: index + 1,
      // queTime: formatDate(item.queTime) || "N/A",
      queTime: moment(item.queTime).format("YYYY-MM-DD HH:mm:ss") || "N/A",
      campaignName: item.campaignName || "N/A",
      templateName: item.templateName || "N/A",
      templateCategory: item.templateCategory || "N/A",
      templateType: item.templateType || "N/A",
      status: item.status || "N/A",
      totalAudience: item.totalAudience || "0",
      campaignSrno: item.campaignSrno,
      ...item,
    }))
    : [];

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

  const COLORScta = ["#17877b", "#13b38b", "#37cc77", "#2a9e90", "#e67e22"];

  const CustomPieChart = ({ data }) => (
    <div className="w-full bg-white border border-gray-200 shadow-md rounded-xl p-4">
      <h3 className="text-base font-semibold text-gray-700 text-center mb-3">
        CTA Click Distribution
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={4}
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORScta[index % COLORScta.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "white",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

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
          // checkboxSelection
          rowHeight={45}
          slots={{
            footer: CustomFooter,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
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
      <Dialog
        header={
          <div className="flex items-center  gap-3 w-full">
            <h3 className="text-lg font-semibold">Campaign CTA Analytics</h3>
            <CustomTooltip title="Export Report" placement="top" arrow={true}>
              <button
                className="flex items-center gap-1 px-2 py-2 text-sm text-blue-600 cursor-pointer hover:text-white rounded-full border border-blue-200 hover:border-blue-400 transition hover:bg-blue-400"
                onClick={() => handleReplyDownload(replySrno)}
              >
                <FiDownload size={14} />
              </button>
            </CustomTooltip>
          </div>
        }
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => {
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        {ctaAnalyticsLoading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
            <CircularProgress color="success" thickness={4} />
            <p className="text-gray-600 text-sm">Loading CTA analytics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200">
              <div className="p-4 rounded-lg border bg-white shadow-md md:order-1 order-2 h-full flex items-center justify-center">
                <div className="flex items-center justify-center">
                  <CampaignTemplatePreview templateData={templateData} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center bg-[#f5f1ea] p-6">
              <div className="flex flex-col gap-3 w-full">
                {campaignCTAMap?.campaignReplies
                  ?.slice(0, 3)
                  .map((reply, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap items-center justify-center gap-1 w-full py-2 rounded-full border-2 border-[#17877b] text-[#17877b] bg-white font-medium hover:bg-[#17877b] hover:text-white transition"
                    >
                      {/* CTA Chip */}

                      {reply.message || reply.replyText || `CTA ${index + 1}`}

                      {/* Count */}
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-200 text-gray-700 font-semibold">
                        {reply.count || reply.replyCount || 0} Clicks
                      </span>
                    </div>
                  ))}
              </div>

              {clickListActionData && clickListActionData.length > 0 ? (
                clickListActionData.map((item, index) => (
                  <>
                    <button className="flex items-center justify-center gap-1 w-full py-2 rounded-full border-2 border-[#17877b] text-[#17877b] bg-white font-medium hover:bg-[#17877b] hover:text-white transition">
                      <i className="pi pi-reply" />
                      URL
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-200 text-gray-700 font-semibold">
                        {/* {reply.count || reply.replyCount || 0}  */}
                        {item.clickCount} Clicks
                      </span>
                      <span onClick={(event) => getDetailedReports(item, event)}>
                        <InfoOutlinedIcon />
                      </span>
                    </button>
                    {popoverOpen && reportDetails && reportDetails.length > 0 && (
                      <>
                        <InfoPopover
                          anchorEl={anchorEl}
                          open={popoverOpen}
                          onClose={handlePopoverClose}
                        >
                          <div className="w-[280px] max-w-full">
                            {reportDetails.map((detail, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-2 gap-y-1 text-sm text-gray-700 border-b border-gray-200 py-1"
                              >
                                <div className="font-medium text-gray-600">
                                  Mobile No
                                </div>
                                <div className="text-right font-semibold text-gray-800">
                                  {detail.Mobileno || "N/A"}
                                </div>

                                <div className="font-medium text-gray-600">
                                  Click Time
                                </div>
                                <div className="text-right font-semibold text-gray-800">
                                  {detail.clickTime || "N/A"}
                                </div>

                                <div className="font-medium text-gray-600">
                                  Info
                                </div>
                                <div className="text-right font-semibold text-gray-800">
                                  {detail.info || "N/A"}
                                </div>
                              </div>
                            ))}
                          </div>
                        </InfoPopover>
                      </>
                    )}
                  </>
                ))
              ) : (
                <div>
                  <div className="text-center py-4 text-gray-500 border-b">
                    No data available
                  </div>
                </div>
              )}

              <div className="chart w-full">
                <CustomPieChart
                  data={[
                    ...(campaignCTAMap?.campaignReplies?.map((reply, index) => ({
                      name:
                        reply.message || reply.replyText || `CTA ${index + 1}`,
                      value: Number(reply.count || reply.replyCount || 0),
                    })) || []),

                    ...(clickListActionData && clickListActionData.length > 0
                      ? (() => {
                        const totalURLClicks = clickListActionData.reduce(
                          (sum, item) => sum + Number(item.clickCount || 0),
                          0
                        );

                        return totalURLClicks > 0
                          ? [
                            {
                              name: "URL Clicks",
                              value: totalURLClicks,
                            },
                          ]
                          : [];
                      })()
                      : []),
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </Dialog>

      <Dialog
        onHide={() => setIsOpen(false)}
        visible={isOpen}
        className="lg:w-[50vw] md:w-[70vw] w-full"
        draggable={false}
      >
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h2 className="text-base font-semibold text-gray-800">
              Campaign CTA Details
            </h2>

            <div className="flex items-center gap-3">
              <CustomTooltip title="Export Report" placement="top" arrow={true}>
                <button
                  className="flex items-center gap-1 px-2 py-2 text-sm text-blue-600 cursor-pointer hover:text-white rounded-full border border-blue-200 hover:border-blue-400 transition hover:bg-blue-400 "
                  onClick={() => handleReplyDownload(replySrno)}
                >
                  <FiDownload size={14} />
                </button>
              </CustomTooltip>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="p-4 rounded-lg border bg-white shadow-md md:order-1 order-2">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <InfoOutlined className="text-green-600" fontSize="small" />
                <h3 className="text-base font-semibold text-gray-800">
                  WhatsApp CTA Reports
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed text-center">
                Below is a real-like WhatsApp template preview. The{" "}
                <strong>CTA buttons</strong> (Quick Reply & Website) are what
                users tap inside WhatsApp. These clicks are tracked in your
                reports to measure engagement and lead conversions.
              </p>

              <div className="flex justify-center">
                <div className="w-[300px] rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-[#ECE5DD] relative">
                  <div className="h-10 bg-gradient-to-b from-gray-200/60 to-transparent blur-sm"></div>

                  <div className="p-4">
                    <div className="bg-white blur rounded-lg p-3 text-sm text-gray-800 shadow-sm max-w-full border border-gray-200">
                      👋 Hi there! Thanks for showing interest. Please choose
                      one of the options below:
                    </div>

                    <div className="mt-3 flex flex-col gap-2 w-full">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border-b border-b-[#128c7e]  text-xs tracking-wide font-medium hover:bg-[#128c7e] text-[#128c7e] transition bg-white hover:text-white">
                        <Reply fontSize="small" />
                        Quick Reply
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border-b border-b-[#128c7e]  text-xs tracking-wide font-medium hover:bg-[#128c7e] text-[#128c7e] transition bg-white hover:text-white">
                        <Reply fontSize="small" />
                        Know More
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border-b border-b-[#128c7e]  text-xs tracking-wide font-medium hover:bg-[#128c7e] text-[#128c7e] transition bg-white hover:text-white">
                        <Link fontSize="small" />
                        Visit Website
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500 italic text-center">
                Example WhatsApp template cropped to highlight CTA buttons.
                These actions are tracked in your reports.
              </p>
            </div>

            <div className="md:order-2 order-1">
              {/* Body Section */}
              {campaignCTAMapLoading ? (
                <div className="h-full flex flex-col justify-center gap-2 w-full">
                  <UniversalSkeleton height="20rem" width="100%" />
                </div>
              ) : campaignCTAMap?.campaignReplies?.length > 0 ? (
                <div className="space-y-3 p-4 rounded-lg border shadow bg-white">
                  {/* --- Header --- */}
                  <h3 className="text-base font-semibold text-gray-800 text-center">
                    CTA Engagement Overview
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    Track how your WhatsApp template{" "}
                    <strong>CTA buttons</strong> are performing in real time.
                  </p>

                  {/* --- CTA Chips with Counts --- */}
                  <div className="flex flex-col gap-3">
                    {campaignCTAMap?.campaignReplies
                      ?.slice(0, 3)
                      .map((reply, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 border"
                        >
                          {/* CTA Chip */}
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#e9f8f3] text-[#128c7e] flex items-center gap-2">
                            {reply.message ||
                              reply.replyText ||
                              `CTA ${index + 1}`}
                          </span>

                          {/* Count */}
                          <span className="px-2 py-1 text-xs rounded-md bg-gray-200 text-gray-700 font-semibold">
                            {reply.count || reply.replyCount || 0} Clicks
                          </span>
                        </div>
                      ))}
                  </div>

                  {/* --- Pie Chart --- */}
                  <div className="mt-4 w-full h-64">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* --- Footer --- */}
                  <p className="text-xs text-gray-500 italic text-center">
                    Each CTA click is tracked to help you understand user
                    interest and improve lead conversions.
                  </p>
                </div>
              ) : (
                <div className="p-8 max-w-md w-full text-center bg-white border rounded-lg shadow h-full flex flex-col items-center justify-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#e9f8f3]">
                      <ChatOutlined
                        className="text-[#128c7e]"
                        fontSize="large"
                      />
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    No Data Available
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    It looks like there are no <strong>CTA reports</strong> yet.
                    Once users start engaging with your WhatsApp template
                    buttons, the performance metrics and charts will appear
                    here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        onHide={() => setIsReportListOpen(false)}
        visible={reportListOpen}
        className="lg:w-[80vw] md:w-[70vw] w-full"
        draggable={false}
      >
        <div className="flex flex-col gap-5  w-full">
          {/* <h2 className="font-semibold text-center">Click Report List</h2> */}
          {/* --- First Table (Click List) --- */}
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">Sr.No</th>
                <th className="px-4 py-2 text-left border-b">Mobile No</th>
                <th className="px-4 py-2 text-left border-b">Campaign Name</th>
                <th className="px-4 py-2 text-left border-b">Click Count</th>
                <th className="px-4 py-2 text-left border-b">Queue Time</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clickListActionData && clickListActionData.length > 0 ? (
                clickListActionData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{item.Mobileno}</td>
                    <td className="px-4 py-2 border-b">{item.campaignName}</td>
                    <td className="px-4 py-2 border-b">{item.clickCount}</td>
                    <td className="px-4 py-2 border-b">{item.queTime}</td>
                    {item.clickCount > 0 ? (
                      <td className="px-4 py-2 border-b text-center">
                        <MdOutlineCallToAction
                          onClick={() => getDetailedReports(item)}
                          className="text-blue-600 cursor-pointer text-xl hover:text-blue-800"
                        />
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-500 border-b"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* --- Second Table (Report Details) --- */}
          {reportDetails && reportDetails.length > 0 && (
            <>
              <h2 className="font-semibold text-center mt-6">Report Details</h2>
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Sr.No</th>
                    <th className="px-4 py-2 text-left border-b">Mobile No</th>
                    <th className="px-4 py-2 text-left border-b">Click Time</th>
                    <th className="px-4 py-2 text-left border-b">Info</th>
                  </tr>
                </thead>
                <tbody>
                  {reportDetails.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td className="px-4 py-2 border-b">{item.Mobileno}</td>
                      <td className="px-4 py-2 border-b">{item.clickTime}</td>
                      <td className="px-4 py-2 border-b">{item.info}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ManageCampaignTable;
