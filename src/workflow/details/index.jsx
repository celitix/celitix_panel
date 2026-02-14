import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import { Paper, Typography, Button } from "@mui/material";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import { IconButton } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import moment from "moment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

// ICONS
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { MdOutlineCampaign } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import SendIcon from "@mui/icons-material/Send";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { FaWhatsapp } from "react-icons/fa";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// ASSETS
import nothinganimation from "@/assets/animation/nothinganimation.json";

// APIS
import {
  deleteWorkflow,
  getAllWorkflow,
  getWorkflowCampaignDetails,
  getWorkflowCampaignDetailsReport,
} from "@/apis/workflow";

// COMPONENTS
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InfoPopover from "@/components/common/InfoPopover.jsx";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

export const WorkflowDetails = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [publishingId, setPublishingId] = useState(null);
  const [flowList, setFlowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFlow, setCurrentPageFlow] = useState(0);
  const [search, setSearch] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownButtonRefs = useRef({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedRows, setSelectedRows] = useState([]);

  const [visibleDialog, setVisibledialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({
    srno: "",
    type: "",
  });
  const [campaignReportData, setCampaignReportData] = useState([]);
  const [campaignReportDataFetch, setCampaignReportDataFetch] = useState(false);

  const [value, setValue] = useState(0);

  // const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [campaignInfoMap, setCampaignInfoMap] = useState({});
  // const dropdownButtonRefs = useRef({});
  const closeDropdown = () => setDropdownOpenId(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const rowsPerPage = 4;

  const filteredFlows = (Array.isArray(flowList) ? flowList : [])
    .filter((flow) => {
      const searchText = search.toLowerCase();
      const flowName = (flow?.workflow_name || "").toLowerCase();
      return flowName.includes(searchText);
    })
    .sort((a, b) => {
      const dateA = new Date(a.insert_time);
      const dateB = new Date(b.insert_time);
      return dateA - dateB;
    });

  const pagesPerRowReport = 10;
  const totalPages = Math.ceil(filteredFlows.length / rowsPerPage);
  const totalPagesReport = Math.ceil(
    campaignReportData?.length / pagesPerRowReport
  );

  // const paginatedFlows = [];
  const paginatedFlows = filteredFlows
    .reverse()
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  async function handleFetchAllWorkflow() {
    try {
      setIsLoading(true);
      const res = await getAllWorkflow(type);
      setFlowList(res);
    } catch (e) {
      toast.error("Unable to fetch workflow");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFetchAllWorkflow();
  }, [type]);

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(row) {
    if (!row.sr_no || !row.node_type) return;
    const srno = row.sr_no;
    const type = row.node_type;

    setSelectedRowData({
      srno,
      type,
    });
    setVisibledialog(true);
  }

  // function handleUpdate() { }
  async function handleConfirmDelete(row) {
    const srno = selectedRowData.srno;
    const type = selectedRowData.type;
    setIsDeleting(true);

    try {
      const res = await deleteWorkflow(srno, type);
      if (!res?.status) {
        return toast.error(res?.message || "Unable to delete workflow");
      }
      toast.success(res?.message || "Workflow deleted successfully");
      setVisibledialog(false);
      await handleFetchAllWorkflow();
    } catch (e) {
      toast.error("Unable to delete workflow");
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    if (value === 0) {
      setCampaignReportDataFetch(false);
    }
  }, [value]);

  const fetchWorkflowDetails = async (data) => {
    setCampaignReportDataFetch(true);
    setValue(1);
    try {
      const payload = {
        workflowSrno: data?.sr_no,
        fromDate: data?.insert_time?.split(" ")[0],
      };
      // const payload = {
      //   workflowSrno: 72,
      //   fromDate: "2025-10-01",
      // };

      const res = await getWorkflowCampaignDetails(payload);
      setCampaignReportData(res);
    } catch (e) {
      console.log("e", e);
    }
  };

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
            totalPages={totalPagesReport}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Box>
      </GridFooterContainer>
    );
  };

  const rows = Array.isArray(campaignReportData)
    ? campaignReportData.flatMap((item, index1) =>
      (item.data || []).map((inner, index2) => ({
        id: `${index1 + 1}-${index2 + 1}`,
        sr_No: index1 * (item.data?.length || 1) + index2 + 1,
        node_index: inner.node_index || "N/A",
        campaign_name: inner.campaign_name || "N/A",
        workflow_name: inner.workflow_name || "N/A",
        node_type: inner.node_type || "N/A",
        parent_camp_name: inner.parent_camp_name || "N/A",
        que_date:
          item.que_date?.split(" ")[0] ||
          inner.que_date?.split(" ")[0] ||
          "N/A",
        main_camp_srno: item.main_camp_srno || inner.main_camp_srno || "N/A",
      }))
    )
    : [];

  const columns = [
    {
      field: "sr_No",
      headerName: "Sr. No.",
      flex: 0,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "que_date",
      headerName: "Campaign Date",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "campaign_name",
      headerName: "Campaign Name",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "workflow_name",
      headerName: "Workflow Name",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "node_type",
      headerName: "Node Type",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "node_index",
      headerName: "Node Index",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "parent_camp_name",
      headerName: "Parent Campaign",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Campaign Detail Report" placement="top" arrow>
            <IconButton
              ref={(el) => (dropdownButtonRefs.current[params.row.id] = el)}
              onClick={() => handleWorkflowReport(params.row)}
            >
              <InfoOutlinedIcon sx={{ fontSize: "1.2rem", color: "green" }} />
            </IconButton>
          </CustomTooltip>

          <InfoPopover
            anchorEl={dropdownButtonRefs.current[params.row.id]}
            open={dropdownOpenId === params.row.id}
            onClose={closeDropdown}
          >
            {campaignInfoMap[params.row.id] &&
              campaignInfoMap[params.row.id][0] ? (
              <div className="w-[280px] max-w-full">
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">

                  {[
                    { label: "Total", key: "total" },
                    { label: "Pending", key: "pending" },
                    { label: "Blocked", key: "block" },
                    { label: "Failed", key: "failed" },
                    { label: "Submitted", key: "submitted" },
                    { label: "Sent", key: "sent" },
                    { label: "Delivered", key: "delivered" },
                    { label: "Undelivered", key: "undelivered" },
                    { label: "Read", key: "read" },
                    { label: "Busy", key: "busy" },
                    { label: "Charged Unit", key: "chargedUnit" },
                    { label: "Source", key: "source" },
                  ].map(({ label, key }) => (
                    <React.Fragment key={key}>
                      <div className="font-medium text-gray-600 border-b pb-2">{label}</div>
                      <div className="text-right font-semibold text-gray-800 border-b pb-2">
                        {/* {campaignInfoMap[params.row.id][0]?.data?.[key] ?? "N/A"} */}
                        {campaignInfoMap[params.row.id][0]?.normalizedData?.[key] ?? "N/A"}
                      </div>
                    </React.Fragment>
                  ))}

                </div>
              </div>
            ) : (
              <div className="p-2 text-sm text-gray-500">No Data Available</div>
            )}
          </InfoPopover>
        </>
      )

    },
  ];

const normalizeCampaignData = (nodeType, rawData) => {
  if (!rawData) return {};

  // SMS node mapping
  if (nodeType === "sms") {
    return {
      total: rawData.totalSMS ?? "N/A",
      pending: rawData.undelivered ?? 0,
      block: rawData.OperatorRejected ?? 0,
      failed: rawData.cuting ?? 0,
      submitted: rawData.sentCount ?? 0,
      sent: rawData.sentCount ?? 0,
      delivered: rawData.deliverd ?? rawData.deliverdCount ?? 0,
      undelivered: rawData.undelivered ?? rawData.undeliveredCount ?? 0,
      read: "N/A",          // SMS doesn't support read
      busy: "N/A",          // SMS doesn't support busy
      chargedUnit: rawData.deliveredUnitCount ?? "N/A",
      source: "SMS"
    };
  }

  // Default (RCS / WhatsApp / Voice etc.)
  return {
    total: rawData.submitted ?? "N/A",
    pending: rawData.pending ?? 0,
    block: rawData.block ?? 0,
    failed: rawData.failed ?? 0,
    submitted: rawData.submitted ?? 0,
    sent: rawData.sent ?? 0,
    delivered: rawData.delivered ?? 0,
    undelivered: rawData.undelivered ?? 0,
    read: rawData.read ?? "N/A",
    busy: rawData.busy ?? 0,
    chargedUnit: rawData.submitted ?? "N/A",
    source: "Workflow"
  };
};



  const handleWorkflowReport = async (row) => {
    console.log(row)
    const payload = {
      campSrno: row?.main_camp_srno,
      nodeType: row?.node_type,
      fromDate: row?.que_date
    };

    try {
      const res = await getWorkflowCampaignDetailsReport(payload);
      // console.log("Report API Response:", res);

      // setCampaignInfoMap(prev => ({
      //   ...prev,
      //   [row.id]: res?.data || []
      // }));

      
const normalizedData = res?.data?.map(item => ({
  ...item,
  normalizedData: normalizeCampaignData(item.node_type, item.data)
}));

setCampaignInfoMap(prev => ({
  ...prev,
  [row.id]: normalizedData || []
}));

      setDropdownOpenId(row.id);

    } catch (err) {
      toast.error("Unable to fetch report");
      console.error(err);
    }
  };


  return (
    <>
      <div className="flex">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Manage Campaigns Tabs"
            textColor="primary"
            indicatorColor="primary"
            scrollButtons="auto"
            allowScrollButtonsMobile
            className="w-full"
            variant="scrollable"
          >
            <Tab
              label={
                <span className="flex items-center gap-1">
                  <CampaignOutlinedIcon size={20} /> Manage Workflow
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            <Tab
              label={
                <span className="flex items-center gap-1">
                  <CampaignOutlinedIcon size={20} /> Workflow Report
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
          </Tabs>

          <CustomTabPanel value={value} index={0}>
            {/* <div className="flex items-center justify-center ">
              <h1 className="text-2xl font-semibold text-gray-700 mb-3">
                Manage WorkFlows
              </h1>
            </div> */}

            <div className="flex flex-col gap-4">
              <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-y-auto p-3">
                <div className="flex justify-between md:items-end  items-center w-full flex-col md:flex-row gap-3">
                  <div className="flex items-end gap-2 w-full order-1 md:order-1">
                    <div className="w-64">
                      <DropdownWithSearch
                        id="type"
                        name="type"
                        options={[
                          { label: "ALL", value: "" },
                          { label: "OBD", value: "voice" },
                          { label: "Whatsapp", value: "whatsapp" },
                          { label: "RCS", value: "rcs" },
                          { label: "SMS", value: "sms" },
                        ]}
                        label="Select Node Type"
                        value={type}
                        onChange={(e) => setType(e)}
                        placeholder="Select Type"
                      />
                    </div>

                    <UniversalButton
                      id="Search"
                      name="Search"
                      label={isLoading ? "Searching..." : "Search"}
                      disabled={isLoading}
                      onClick={handleFetchAllWorkflow}
                    />
                  </div>
                  <div className="flex items-center justify-center bg-blue-50 border border-blue-300 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm text-nowrap order-3 md:order-2">
                    Total Workflows:
                    <span className="ml-2 text-blue-800 font-bold">
                      {filteredFlows.length}
                    </span>
                  </div>

                  <div className="flex items-end gap-2 justify-start md:justify-end w-full mt-2 md:mt-0 mr-1 order-2 md:order-3">
                    <input
                      type="text"
                      placeholder="Search by Flow Name & Id..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-64 text-sm"
                    />

                    <UniversalButton
                      id="Add WorkFlow"
                      name="Add WorkFlow"
                      label="Add WorkFlow"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => navigate("/workflow/create")}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-300 rounded-xl shadow-sm md:overflow-hidden overflow-y-auto">
                <div className="space-y-4 px-5 pt-5 md:h-130 h-120 relative lg:overflow-hidden overflow-y-auto">
                  {isLoading ? (
                    <div className="w-full flex flex-col gap-3">
                      {[...Array(4)].map((_, i) => (
                        <UniversalSkeleton key={i} height="6rem" width="100%" />
                      ))}
                    </div>
                  ) : paginatedFlows.length === 0 ? (
                    <div className="bg-white flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center border-2 border-dashed p-5 rounded-3xl shadow-2xl border-blue-300">
                        <div className="w-60 h-60">
                          <Lottie animationData={nothinganimation} loop />
                        </div>
                        <div className="text-xl font-semibold text-gray-500 text-center">
                          No workflows found.
                          <br />
                          <span className="text-base font-normal text-gray-400">
                            Start your professional journey by creating a new
                            workflow!
                          </span>
                        </div>
                        <div className="mt-4">
                          <UniversalButton
                            label="+ Add WorkFlow"
                            onClick={() => navigate("/workflow/create")}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    paginatedFlows.map((flow, index) => (
                      <div
                        key={index}
                        className="relative bg-blue-100 border border-blue-200 rounded-xl px-4 py-5 grid grid-cols-1 lg:grid-cols-5 gap-1 lg:gap-1 gap-5 items-center "
                      >
                        {/* Workflow Details */}
                        <div className="flex xl:gap-18 gap-2 items-center justify-center">
                          <div className="flex flex-col items-center">
                            <div className="font-semibold text-sm lg:text-xs 2xl:text-sm mb-1">
                              Sr.no
                            </div>
                            <div className="font-semibold text-sm lg:text-xs 2xl:text-sm px-2 py-1 bg-blue-200 text-blue-900 rounded-md break-words text-left md:text-center">
                              {index + 1 + (currentPage - 1) * rowsPerPage}
                            </div>
                          </div>
                          <div className="flex flex-col items-center ">
                            <div className="font-semibold text-sm lg:text-xs 2xl:text-sm mb-1">
                              WorkFlow Name
                            </div>
                            <div className="font-semibold text-sm lg:text-xs 2xl:text-sm px-2 py-1 bg-blue-200 text-blue-900 rounded-md break-words text-left md:text-center">
                              {highlightMatch(
                                String(flow.workflow_name || ""),
                                search
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm flex flex-col items-center">
                          <div className="font-semibold text-sm lg:text-xs 2xl:text-sm mb-1">
                            Node Type
                          </div>
                          <span className="text-sm lg:text-xs 2xl:text-sm font-semibold px-2 py-1 bg-blue-200 text-blue-900 rounded-md">
                            {flow.node_type}
                          </span>
                        </div>

                        <div className="text-sm lg:text-xs 2xl:text-sm flex flex-col items-center">
                          <div className="font-semibold mb-1">
                            Is OTP Workflow
                          </div>
                          <div className="text-gray-600">
                            <span className="text-sm lg:text-xs 2xl:text-sm font-semibold px-2 py-1 bg-blue-200 text-blue-900 rounded-md">
                              {" "}
                              {flow.isOtpWorkflow === 1 ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>

                        <div className="text-sm lg:text-xs 2xl:text-sm flex flex-col items-center">
                          <div className="font-semibold mb-1">
                            Inserted Time
                          </div>
                          <div className="text-gray-700">
                            {flow.insert_time}
                          </div>
                        </div>

                        {/* Buttons for desktop */}
                        <div className="flex justify-center md:gap-0 gap-0">
                          <CustomTooltip
                            title="Edit Workflow"
                            placement="top"
                            arrow
                          >
                            <button
                              className="px-2 py-2 rounded-full text-sm text-slate-600 flex items-center gap-1 cursor-pointer hover:bg-slate-200"
                              onClick={() =>
                                navigate("/workflow/edit", {
                                  state: {
                                    data: flow?.node_json || "[]",
                                    workflow_meta_data: flow,
                                  },
                                })
                              }
                            >
                              <EditNoteIcon sx={{ fontSize: "1.5rem" }} />
                            </button>
                          </CustomTooltip>
                          <CustomTooltip
                            title="Delete Workflow"
                            placement="top"
                            arrow
                          >
                            <button
                              className="px-2 py-2 text-sm text-slate-600  flex items-center gap-1 cursor-pointer hover:bg-slate-200 rounded-full"
                              onClick={() => handleDelete(flow)}
                            >
                              <MdOutlineDeleteForever
                                fontSize="20px"
                                color="red"
                              />
                            </button>
                          </CustomTooltip>

                          <CustomTooltip
                            title="Show Reports"
                            placement="top"
                            arrow
                          >
                            <button
                              className="px-2 py-2 text-sm text-slate-600 flex items-center gap-1 cursor-pointer hover:bg-slate-200 rounded-full"
                              onClick={() => fetchWorkflowDetails(flow)}
                            >
                              <BiSolidReport fontSize="20px" color="green" />
                            </button>
                          </CustomTooltip>
                        </div>
                      </div>
                    ))
                  )}
                  <div className="sticky bottom-0 left-0 right-0 bg-white py-2 border-t border-gray-200">
                    <div className="flex justify-center md:justify-end items-center gap-2 px-4">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          className={`text-sm px-3 py-1 border rounded-sm cursor-pointer ${currentPage === i + 1
                            ? "bg-blue-500 text-white border-blue-500"
                            : "text-gray-700 hover:bg-blue-50"
                            }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            {/* <div className="overflow-x-auto bg-white border border-gray-300 rounded-xl shadow-sm p-4"> */}
            {campaignReportDataFetch ? (
              campaignReportData.length === 0 ? (
                // <div className="w-full h-[35rem] flex items-center justify-center bg-gradient-to-b from-white to-blue-50 border border-blue-200 rounded-2xl shadow-lg p-10">
                //   <div className="max-w-lg text-center space-y-5">
                //     <div className="flex justify-center">
                //       <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow-inner">
                //         <MdOutlineCampaign className="text-blue-600 text-4xl" />
                //       </div>
                //     </div>

                //     <h2 className="text-2xl font-semibold text-blue-800">
                //       No Campaigns Found
                //     </h2>

                //     <p className="text-lg text-blue-700 leading-relaxed">
                //       This workflow is active but hasn’t been used to launch any{" "}
                //       <span className="font-semibold text-blue-800">campaigns</span> yet.
                //     </p>

                //     <p className="text-sm text-blue-500">
                //       You can initiate a new campaign for this workflow from the{" "}
                //       <span className="font-semibold text-blue-700">Campaign Management</span> section once it's ready.
                //     </p>

                //     <div className="mt-4 flex items-center justify-center w-full">
                //       <UniversalButton
                //         label="Back to Workflow List"
                //         onClick={() => {
                //           setCampaignReportDataFetch(false);
                //           setValue(0);
                //         }}
                //       />
                //     </div>
                //   </div>
                // </div>
                <div className="w-full h-[35rem] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-100 border border-indigo-100 rounded-2xl shadow-lg p-10">
                  <div className="max-w-lg text-center space-y-6">
                    {/* Icon Circle */}
                    <div className="flex justify-center">
                      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-200 to-sky-300 shadow-md">
                        <MdOutlineCampaign className="text-indigo-700 text-4xl" />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-semibold bg-gradient-to-r from-indigo-700 to-sky-600 bg-clip-text text-transparent">
                      No Campaigns Found
                    </h2>

                    {/* Description */}
                    <p className="text-base text-gray-700 leading-relaxed">
                      This workflow is ready but hasn’t been used to launch any{" "}
                      <span className="font-semibold text-indigo-700">
                        campaigns
                      </span>{" "}
                      yet.
                    </p>

                    {/* Sub Text */}
                    <p className="text-sm text-gray-500">
                      You can create or schedule a campaign for this workflow
                      from the{" "}
                      <span className="font-medium text-sky-700">
                        Campaign Management
                      </span>{" "}
                      section whenever you’re ready.
                    </p>

                    {/* Action Button */}
                    <div className="mt-6 flex justify-center">
                      <UniversalButton
                        label="← Back to Workflow List"
                        onClick={() => {
                          setCampaignReportDataFetch(false);
                          setValue(0);
                        }}
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(79,70,229,1) 0%, rgba(14,165,233,1) 100%)",
                          color: "white",
                          fontWeight: "600",
                          borderRadius: "0.75rem",
                          padding: "0.75rem 1.5rem",
                          boxShadow: "0 4px 14px rgba(79,70,229,0.25)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Paper sx={{ height: 558 }}>
                  <DataGrid
                    // id={id}
                    name="new"
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
                      // noRowsOverlay: CustomNoRowsOverlay,
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
              )
            ) : (
              <div className="w-full h-[35rem] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-2xl shadow-lg p-10">
                <div className="max-w-lg text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow-inner">
                      <FiInfo className="text-blue-600 text-4xl" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold text-blue-800">
                    Action Required
                  </h2>

                  <p className="text-lg text-blue-700 leading-relaxed">
                    Please click the{" "}
                    <span className="font-semibold">report icon</span>
                    <BiSolidReport
                      fontSize="30px"
                      color="green"
                      className="inline-block mx-3 border rounded-full p-1"
                    />
                    of the flow you want to fetch details for.
                  </p>
                  <p className="text-sm text-blue-500">
                    You can select one from the workflow list.
                  </p>
                </div>
              </div>
            )}
            {/* </div> */}
          </CustomTabPanel>

          <Dialog
            header="Delete Workflow"
            visible={visibleDialog}
            className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
            onHide={() => {
              setVisibledialog(false);
              setSelectedRowData({ srno: "", type: "" });
            }}
            draggable={false}
          >
            <div>
              <div className="flex items-center justify-center">
                <CancelOutlinedIcon
                  sx={{ fontSize: 64, color: "red" }}
                  size={20}
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-[1.1rem] font-semibold text-gray-600">
                  Are you sure ?
                </p>
                <p>
                  Do you really want to delete this workflow? This process
                  cannot be undo.
                </p>
                <div className="flex justify-center mt-2 gap-5">
                  {!isDeleting && (
                    <UniversalButton
                      id="cancel"
                      name="cancel"
                      label="Cancel"
                      style={{
                        backgroundColor: "#090909",
                      }}
                      onClick={() => {
                        setVisibledialog(false);
                        setSelectedRowData({ srno: "", type: "" });
                      }}
                    />
                  )}
                  <UniversalButton
                    id="Delete"
                    name="Delete"
                    label={isDeleting ? "Deleting Workflow..." : "Delete"}
                    disabled={isDeleting}
                    style={{
                      backgroundColor: "red",
                    }}
                    onClick={handleConfirmDelete}
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </Box>
      </div>
    </>
  );
};
