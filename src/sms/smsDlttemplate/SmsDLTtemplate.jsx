import React, { useEffect, useRef, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import moment from "moment";

// MUI MATERIAL
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Paper, Typography, Button } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import IconButton from "@mui/material/IconButton";
import { Box, Tab, Tabs } from "@mui/material";

// ICONS
import { PhoneIcon, LayoutPanelTop } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import { FaDownload } from "react-icons/fa";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

// COMPONENTS
import InputField from "../../whatsapp/components/InputField";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay.jsx";
import { DataTable } from "@/components/layout/DataTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import InfoPopover from "@/components/common/InfoPopover";
import SmsHeaders from "./SmsHeaders/SmsHeaders";

// API
import {
  getAllTemplates,
  getSingleTemplate,
  updateTemplateBySrno,
  deleteSingleSmsTemplate,
  deleteMultipleSmsTemplate,
  importTemplate,
} from "@/apis/sms/sms";
import { uploadContactFile } from "@/apis/contact/contact";


// UTILS
import { exportToExcel } from "@/utils/utills";


const SmsDLTtemplate = () => {
  const [value, setValue] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  // const [statusOption, setStatusOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [templatedltimport, setTemplateDltImport] = useState(false);
  const [cetegory, setCetegory] = useState(null);
  const [content, setContent] = useState(null);
  const [communication, setCommunication] = useState(null);
  const [consent, setConsent] = useState(null);
  const [templateIdFilter, setTemplateIdFilter] = useState("");
  const [templateNameFilter, setTemplateNameFilter] = useState("");
  const [smsType, setSmsType] = useState(null);
  const [smsCopyCreate, setCopyCreateType] = useState(null);
  const [entityid, setEntityId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [clicked, setClicked] = useState([]);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownButtonRefs = useRef({});
  const closeDropdown = () => setDropdownOpenId(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });
  function CustomTabPanel({ children, value, index, ...other }) {
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

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (!e.target.closest(".bot-settings")) {
  //       closeDropdown();
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const [contactData, setContactData] = useState({});
  const [templateData, setTemplateData] = useState({
    templateName: "",
    templateId: "",
    type: "",
    message: "",
    status: "",
    senderId: "",
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [updateTemplateData, setUpdateTemplateData] = useState({});
  const [addtemplate, setAddTemplate] = useState(false);

  const fetchTemplates = async () => {
    setIsFetching(true);
    try {
      const rawData = await getAllTemplates("all");
      const reverseData = rawData.reverse();

      const filteredData = reverseData.filter(
        (item) =>
          item.templateId
            ?.toLowerCase()
            .includes(templateIdFilter.toLowerCase()) &&
          item.templateName
            ?.toLowerCase()
            .includes(templateNameFilter.toLowerCase())
      );

      const mappedData = filteredData.map((item, index) => ({
        id: item.srNo,
        sn: index + 1,
        userid: item.userID || "-",
        templatename: item.templateName || "-",
        templateid: item.templateId || "-",
        entityid: item.entityId || "-",
        message: item.message || "-",
        senderid: item.senderID?.split(",")?.[0]?.trim() || "-",
        smstype:
          item.type === 1
            ? "Transactional"
            : item.type === 2
              ? "Promotional"
              : item.type === 3
                ? "International"
                : "Unknown",
        // consenttype: "-",
        inserttime: item.insertDate
          ? moment(item.insertDate).format("DD-MM-YYYY HH:mm:ss")
          : "-",
        status:
          item.status === 1
            ? "Approved"
            : item.status === 2
              ? "Rejected"
              : item.status === 3
                ? "Pending"
                : "Unknown",
      }));

      setRows(mappedData);
    } catch (err) {
      toast.error("Error fetching templates.");
    } finally {
      setIsFetching(false);
    }
  };

  // useEffect(() => {
  //   fetchTemplates();
  // }, [templateIdFilter, templateNameFilter]);

  // const statusOptions = [
  //   { label: "Active", value: "active" },
  //   { label: "Inactive", value: "inactive" },
  // ];

  const handleEditClick = async (id) => {
    setSelectedTemplateId(id);
    setIsEditVisible(true);

    try {
      const res = await getSingleTemplate(id);

      setSelectedTemplate(res[0]);
      setUpdateTemplateData({
        srNo: res[0]?.sr_no,
        entityId: res[0]?.entityId,
        templateId: res[0]?.templateid,
        msgFormat: res[0]?.msg_format,
        senderId: res[0]?.senderid,
      });
    } catch (e) {
      return toast.error("Something went wrong");
    }
  };
  const handleEdit = async () => {
    try {
      const res = await updateTemplateBySrno(updateTemplateData);

      if (!res?.message.includes("successfully")) {
        return toast.error(res?.message);
      }
      toast.success("Template updated successfully");
      setSelectedTemplate("");
      setSelectedTemplateId("");
      setIsEditVisible(false);
      await fetchTemplates();
    } catch (e) {
      return toast.error("Something went wrong");
    }
  };

  // const handleDelete = async (id) => {
  //   await deleteSingleSmsTemplate(id);
  //   await fetchTemplates();
  //   setSelectedTemplateId("");
  // };

  const handleDelete = async (id) => {
    try {
      const res = await deleteSingleSmsTemplate(id);

      if (res?.message?.includes("successfully")) {
        toast.success(res.message);
        await fetchTemplates();
        setSelectedTemplateId("");
      } else {
        toast.error(res?.message || "Failed to delete the template.");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error deleting template:", error);
      toast.error("Something went wrong while deleting the template.");
    }
  };

  const handleMultipleDelete = async (selectedRows) => {
    if (selectedRows.length === 0) return;

    await deleteMultipleSmsTemplate({
      srNoList: selectedRows,
    });
    await fetchTemplates();
    setSelectedRows([]);
    setSelectedTemplateId("");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleView = (row) => {
    setClicked({
      TemplateID: row.templateid || "N/A",
      EntityID: row.entityid || "N/A",
      ConsentType: row.consentType || "N/A",
    });
    setDropdownOpenId(row.id);
    // setAnchorEl(event.currentTarget);
  };

  const cols = [
    {
      field: "sn",
      headerName: "S.No",
      flex: 0,
      width: 70,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "userid",
      headerName: "USER ID",
      flex: 0,
      minWidth: 100,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "templatename",
      headerName: "Template Name",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "templateid",
      headerName: "Template ID",
      flex: 1,
      minWidth: 110,
      hideInGrid: true,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
          {params.value}
        </div>
      ),

    },
    {
      field: "entityid",
      headerName: "Entity ID",
      flex: 1,
      minWidth: 80,
      hideInGrid: true,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      minWidth: 300,
      renderCell: (params) => (
        <div className="text-sm text-gray-700 text-wrap py-2">{params.value}</div>
      ),
    },
    {
      field: "senderid",
      headerName: "Sender ID",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "smstype",
      headerName: "SMS Type",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
          {params.value}
        </div>
      ),
    },
    // {
    //   field: "consenttype",
    //   headerName: "Consent type",
    //   flex: 1,
    //   minWidth: 120,
    // },
    {
      field: "inserttime",
      headerName: "Insert Time",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}>
          {params.value}
        </div>
      ),
    },
    // { field: "status", headerName: "Status", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center gap-1 h-full">
          <div className="">
            <CustomTooltip title="more Info" placement="top" arrow>
              <IconButton
                className="text-xs"
                ref={(el) => {
                  if (el) dropdownButtonRefs.current[params.row.id] = el;
                }}
                onClick={() => handleView(params.row)}
              >
                <InfoOutlinedIcon sx={{ fontSize: "1.2rem", color: "green" }} />
              </IconButton>
            </CustomTooltip>

            <InfoPopover
              anchorEl={dropdownButtonRefs.current[params.row.id]}
              open={dropdownOpenId === params.row.id}
              onClose={closeDropdown}
              placement="top-start"
            >
              {clicked && Object.keys(clicked).length > 0 ? (
                <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                  <tbody>
                    {Object.entries(clicked).map(([key, value], index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors border-b last:border-none"
                      >
                        <td className="px-2 py-2 font-medium text-gray-600 capitalize w-1/3">
                          {key}
                        </td>
                        <td className="px-4 py-2 text-gray-800">
                          {value || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-sm text-gray-400 italic px-2 py-2">
                  No data available
                </div>
              )}
            </InfoPopover>
          </div>
          <CustomTooltip title="Edit Template" placement="top" arrow>
            <IconButton
              onClick={() => {
                handleEditClick(params.row.id);
              }}
            >
              <EditNoteIcon sx={{ fontSize: "1.2rem", color: "gray" }} />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Template" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => {
                setIsVisible(true);
                setSelectedTemplateId(params.row.id);
                setSelectedTemplateName(params.row.templatename);
              }}
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip>
        </div >
      ),
    },
  ];

  function handleImport() {
    setTemplateDltImport(true);
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsUploaded(false);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsUploaded(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = async () => {
    if (!uploadedFile) return;
    if (!entityid) {
      return toast.error("Please insert an entity id.");
    }
    if (contactData?.filepath) {
      return toast.error(
        "File already uploaded. Please select a different one."
      );
    }
    setIsUploading(true);

    try {
      const res = await uploadContactFile(uploadedFile);
      setContactData(res);
      setIsUploading(false);
      setIsUploaded(true);
    } catch (e) {
      return toast.error("File upload failed. Please try again.");
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    setUploadedFile(null);
    setContactData({
      filePath: "",
      fileHeaders: "",
      totalRecords: "",
      selectedCountryCode: "",
      selectedMobileColumn: "",
      sampleRecords: "",
    });
    fileInputRef.current.value = "";
  };

  async function handleImportTemplate() {
    let isError = false;
    if (!entityid) {
      return toast.error("Please insert an entity id.");
    }
    if (!contactData?.filepath) {
      return toast.error("Please upload a file.");
    }

    // console.log(templateData);

    const requiredTemplateData = {
      templateName: "",
      templateId: "",
      type: "",
      message: "",
      status: "",
      senderId: "",
    };

    for (const key of Object.keys(requiredTemplateData)) {
      const value = templateData[key];
      if (value === "" || value == null || value === "null") {
        isError = true;
        toast.error(`Please fill the value of ${key}.`);
        break;
      }
    }

    if (isError) return;

    const dd = {
      entityId: entityid,
      templatename: templateData.templateName,
      templateid: templateData.templateId,
      template_type: templateData.type,
      msg_format: templateData.message,
      templatestatus: templateData.status,
      senderid: templateData.senderId,
    };

    const inverted = Object.fromEntries(
      Object.entries(dd).map(([key, value]) => [value, key])
    );

    const data = {
      entityId: entityid,
      filepath: contactData?.filepath,
      hashmap: inverted,
      // hashmap: {
      //   entityId: entityid,
      //   TemplateName: templateData.templateName,
      //   TemplateId: templateData.templateId,
      //   TemplateType: templateData.type,
      //   Message: templateData.message,
      //   Status: templateData.status,
      //   SenderId: templateData.senderId,
      // },
    };

    try {
      const res = await importTemplate(data);

      // toast.success(res?.message);
      // setTemplateDltImport(false);
      // setEntityId("");
      // setTemplateData({});
      // setContactData({});
      // setIsUploading(false);
      // setIsUploaded(false);
      // setUploadedFile(null);
      // fileInputRef.current.value = "";
      // fetchTemplates();
      if (res?.message) {
        // Split message into multiple lines for better readability
        const formattedMessage = res.message
          .split(",") // split by commas
          .map((line) => `• ${line.trim()}`) // add bullet points
          .join("\n"); // join with new lines

        toast.success(`Import Summary:\n${formattedMessage}`, {
          duration: 5000, // 5 seconds
          style: {
            whiteSpace: "pre-line",
            background: "#ffffff",
            color: "#000",
            fontWeight: 500,
            fontSize: "15px",
            padding: "12px 16px",
          },
        });
        setTemplateDltImport(false);
        setEntityId("");
        setTemplateData({});
        setContactData({});
        setIsUploading(false);
        setIsUploaded(false);
        setUploadedFile(null);
        fileInputRef.current.value = "";
        fetchTemplates();
      } else {
        toast.error("No message received from the server.", { duration: 3000 });
      }
    } catch (e) {
      return toast.error("Error importing template.");
    }
  }

  function handleDownload() {
    if (!rows.length) return toast.error("No data to download");
    const col = cols.map((col) => col.field);

    const row = rows.map((row) => col.map((field) => row[field] ?? ""));
    const name = "DLT Template List";
    exportToExcel(col, row, name);
    toast.success("File Downloaded Successfully");
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

  return (
    // <Box>
    //   <Tabs
    //     value={value}
    //     onChange={(e, newValue) => {
    //       setValue(newValue);
    //     }}
    //     aria-label="Callback Profile Tabs"
    //     textColor="primary"
    //     indicatorColor="primary"
    //   >
    //     <Tab
    //       label={
    //         <span className="flex items-center gap-1">
    //           <LibraryBooksOutlinedIcon size={20} /> Manage Templates
    //         </span>
    //       }
    //       {...a11yProps(0)}
    //       sx={{
    //         textTransform: "none",
    //         fontWeight: "bold",
    //         color: "text.secondary",
    //         "&:hover": {
    //           color: "primary.main",
    //           backgroundColor: "#f0f4ff",
    //           borderRadius: "8px",
    //         },
    //       }}
    //     />
    // {/* <Tab
    //   label={
    //     <span className="flex items-center gap-2">
    //       <TfiLayoutAccordionSeparated
    //         size={16}
    //         className="text-blue-800"
    //       />{" "}
    //       Manage Headers
    //     </span>
    //   }
    //   {...a11yProps(1)}
    //   sx={{
    //     textTransform: "none",
    //     fontWeight: "bold",
    //     color: "text.secondary",
    //     "&:hover": {
    //       color: "primary.main",
    //       backgroundColor: "#f0f4ff",
    //       borderRadius: "8px",
    //     },
    //   }}
    // /> */}
    // </Tabs>
    // <CustomTabPanel value={value} index={0}>
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* <h1 className="text-xl font-semibold text-gray-700">
                Manage Templates
              </h1> */}
          <div className="flex flex-wrap gap-2 items-end mb-4 w-full">
            <div className="sm:w-56 w-full">
              <InputField
                id="templateid"
                name="templateid"
                type="number"
                label="Template ID"
                placeholder="Enter Template ID"
                value={templateIdFilter}
                onChange={(e) => setTemplateIdFilter(e.target.value)}
              />
            </div>
            <div className="sm:w-56 w-full">
              <InputField
                id="templatename"
                name="templateidname"
                label="Template Name"
                placeholder="Enter Template Name"
                value={templateNameFilter}
                onChange={(e) => setTemplateNameFilter(e.target.value)}
              />
            </div>

            {/* <div className="sm:w-56 w-full">
              <AnimatedDropdown
                label="Status"
                options={statusOptions}
                id="templatestatus"
                name="templatestatus"
                value={statusOption}
                onChange={(newValue) => setStatusOption(newValue)}
                placeholder="Select Status"
              />
            </div> */}

            {/* Search Button */}
            <div className="w-max-content">
              <UniversalButton
                id="dlttemplatesearch"
                name="dlttemplatesearch"
                label={isFetching ? "Searching..." : "Search"}
                icon={<IoSearch />}
                disabled={isFetching}
                onClick={fetchTemplates}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                label="Delete"
                id="dlttemplatedelete"
                name="dlttemplatedelete"
                onClick={() => {
                  if (selectedRows.length === 0) return;

                  setIsMultipleDelete(true);
                  setIsVisible(true);
                  setSelectedTemplateId(selectedRows);
                }}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                id="dlttemplatedownload"
                name="dlttemplatedownload"
                label="Download"
                onClick={handleDownload}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
                label="Import"
                id="dlttemplateimport"
                name="dlttemplateimport"
                onClick={handleImport}
              />
            </div>
            {/* <div className="w-max-content">
                  <UniversalButton
                    label="Add Template"
                    id="dltAddTemplate"
                    name="dltAddTemplate"
                    type="button"
                    onClick={() => setAddTemplate(true)}
                  />
                </div> */}
          </div>

          {/* <DataTable
                id="dlttemplateTable"
                name="dlttemplateTable"
                col={cols}
                rows={rows}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                checkboxSelection={true}
              /> */}

          <Paper
            sx={{ height: 658 }}
            id="dlttemplateTablePaper"
            name="dlttemplateTablePaper"
          >
            <DataGrid
              id="dlttemplateTable"
              name="dlttemplateTable"
              rows={rows}
              // columns={cols}
              columns={cols.filter((col) => !col.hideInGrid)}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10, 20, 50]}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              checkboxSelection
              // rowHeight={45}
              getRowHeight={() => 'auto'}
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
                "& .MuiDataGrid-columnHeader": {
                  display: "flex !important",
                  justifyContent: "center !important",
                  alignItems: "center !important",
                  textAlign: "center !important",
                },
                "& .MuiDataGrid-columnHeaderTitleContainer": {
                  flex: 1,
                  display: "flex !important",
                  justifyContent: "center !important",
                  alignItems: "center !important",
                  textAlign: "center !important",
                },
                "& .MuiDataGrid-columnHeaderTitleContainerContent": {
                  textAlign: "center !important",
                  justifyContent: "center !important",
                  display: "flex !important",
                  alignItems: "center !important",
                  width: "100%",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  width: "100%",
                  textAlign: "center !important",
                },
              }}
            />
          </Paper>
        </div>
      )}

      <Dialog
        header="Import DLT Content Template"
        visible={templatedltimport}
        onHide={() => {
          setTemplateDltImport(false);
          setEntityId("");
          setTemplateData({});
          setContactData({});
          setIsUploading(false);
          setIsUploaded(false);
          setUploadedFile(null);
        }}
        className="lg:w-[55rem] md:w-[40rem] w-[20rem]"
        draggable={false}
      >
        <InputField
          label="Entity ID"
          id="importentityid"
          name="importentityid"
          placeholder="Enter Entity ID"
          type="number"
          value={entityid}
          onChange={(e) => setEntityId(e.target.value)}
        />
        <div>
          <div className="file-upload mt-2">
            <div
              className="file-upload-container"
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                name="fileInput"
                accept=".xls,.xlsx,.xlsm"
                ref={fileInputRef}
              />
              <div className="flex items-center justify-center gap-2">
                <label
                  htmlFor="fileInput"
                  className="file-upload-button inline-block bg-blue-400 hover:bg-blue-500 text-white font-medium text-sm px-3 py-2 rounded-lg cursor-pointer text-center tracking-wider"
                >
                  Choose or Drop File
                </label>
                <div className="upload-button-container ">
                  <button
                    onClick={handleFileUpload}
                    disabled={isUploading}
                    className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${isUploading ? "disabled" : ""
                      }`}
                  >
                    <FileUploadOutlinedIcon
                      sx={{ color: "white", fontSize: "23px" }}
                    />
                  </button>
                </div>
              </div>
              <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
                <br />
                Supported File Formats: .xlsx
              </p>
              <div className="mt-3">
                {uploadedFile ? (
                  <div className="file-upload-info flex items-center justify-center  gap-1">
                    <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                      {isUploaded ? "File Uploaded: " : "File Selected: "}
                      <strong>{uploadedFile.name}</strong>
                    </p>
                    <button
                      className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                      onClick={handleRemoveFile}
                    >
                      <MdOutlineDeleteForever
                        className="text-red-500 cursor-pointer hover:text-red-600"
                        size={20}
                      />
                    </button>
                  </div>
                ) : (
                  <p className="file-upload-feedback file-upload-feedback-error text-gray-500 text-sm font-semibold tracking-wide">
                    No file uploaded yet!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {contactData?.headers?.length > 0 && (
          <>
            <div
              id="headerData"
              className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6"
            >
              <div>
                <DropdownWithSearch
                  id="templateName"
                  name="templateName"
                  label="Template Name"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.templateName}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      templateName: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <DropdownWithSearch
                  id="templateId"
                  name="templateId"
                  label="Template ID"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.templateId}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      templateId: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <DropdownWithSearch
                  id="templatetype"
                  name="templatetype"
                  label="Template type"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.type}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      type: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <DropdownWithSearch
                  id="message"
                  name="message"
                  label="Message"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.message}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      message: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <DropdownWithSearch
                  id="status"
                  name="status"
                  label="Status"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.status}
                  onChange={(e) => {
                    setTemplateData({
                      ...templateData,
                      status: String(e),
                    });
                  }}
                />
              </div>
              <div>
                <DropdownWithSearch
                  id="senderId"
                  name="senderId"
                  label="sender ID"
                  options={contactData?.headers?.map((header, index) => ({
                    label: header,
                    value: header,
                  }))}
                  value={templateData?.senderId}
                  onChange={(e) => {
                    if (!e) return;
                    setTemplateData({
                      ...templateData,
                      senderId: String(e),
                    });
                  }}
                />
              </div>
            </div>

            <div
              className="w-full max-w-full overflow-auto mt-3"
              style={{
                maxHeight: "400px",
                maxWidth: "auto",
                width: "auto",
              }}
            >
              <table className="w-full border-collapse min-w-max">
                <thead className="bg-[#128C7E]">
                  <tr className="">
                    {contactData?.headers?.map((col, index) => (
                      <th
                        key={index}
                        className="border border-gray-500 px-3 py-1 text-[0.94rem] font-medium tracking-wide text-white whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {contactData?.sampleRecords?.map((row, index) => (
                    <tr key={index} className="">
                      {contactData?.headers?.map((col, idx) => {
                        return (
                          <td
                            key={idx}
                            className="px-2 py-1 text-sm font-normal tracking-wide text-gray-800 border border-gray-400 whitespace-nowrap"
                          >
                            {row[col]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <UniversalButton
          id="createTemplate"
          name="createTemplate"
          label="Submit"
          onClick={handleImportTemplate}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2rem",
          }}
        />
      </Dialog>

      <Dialog
        header="Confirm Delete"
        visible={isVisible}
        onHide={() => setIsVisible(false)}
        className="lg:w-[28rem] md:w-[24rem] w-[20rem]"
        draggable={false}
      >
        <div className="flex flex-col items-center justify-center text-center px-4 py-3">
          <CancelOutlinedIcon sx={{ fontSize: 64, color: "#f44336", mb: 1 }} />

          <h2 className="text-[1.15rem] font-semibold text-gray-700 mb-2">
            Delete Template
          </h2>

          <p className="text-gray-600 text-sm mb-4">
            You are about to delete the following template:
          </p>

          <div className="bg-gray-100 text-gray-800 font-medium rounded-md px-3 py-2 mb-4 w-full text-center break-words">
            {selectedTemplateName || "Unnamed Template"}
          </div>

          <p className="text-gray-500 text-sm">
            This action is <span className="font-semibold text-red-600">permanent</span> and cannot be undone.
          </p>

          <div className="flex justify-center gap-4 mt-5">
            <UniversalButton
              label="Cancel"
              style={{
                backgroundColor: "#4b5563",
              }}
              onClick={() => setIsVisible(false)}
            />
            <UniversalButton
              label="Delete"
              style={{
                backgroundColor: "#dc2626",
              }}
              onClick={() => {
                isMultipleDelete
                  ? handleMultipleDelete(selectedTemplateId)
                  : handleDelete(selectedTemplateId);
                setIsVisible(false);
              }}
            />
          </div>
        </div>
      </Dialog>


      <Dialog
        header="Edit Template"
        visible={isEditVisible}
        onHide={() => setIsEditVisible(false)}
        className="lg:w-[40rem] md:w-[40rem] w-full"
        draggable={false}
      >
        {selectedTemplate && (
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <InputField
                id="entityId"
                name="entityId"
                label="Entity ID"
                value={updateTemplateData.entityId}
                onChange={(e) => {
                  setUpdateTemplateData({
                    ...updateTemplateData,
                    entityId: e.target.value,
                  });
                }}
              />
              <InputField
                id="templateId"
                name="templateId"
                label="Template ID"
                value={updateTemplateData.templateId}
                onChange={(e) => {
                  setUpdateTemplateData({
                    ...updateTemplateData,
                    templateId: e.target.value,
                  });
                }}
              />
            </div>

            <UniversalTextArea
              id="message"
              name="message"
              label="Message"
              value={updateTemplateData.msgFormat}
              onChange={(e) => {
                setUpdateTemplateData({
                  ...updateTemplateData,
                  msgFormat: e.target.value,
                });
              }}
              className="min-h-35 max-h-50"
            />

            <InputField
              id="senderId"
              name="senderId"
              label="Sender ID"
              value={updateTemplateData.senderId}
              onChange={(e) => {
                setUpdateTemplateData({
                  ...updateTemplateData,
                  senderId: e.target.value,
                });
              }}
              className="resize-none "
            />

            <UniversalButton
              id="updateTemplate"
              name="updateTemplate"
              label="Update"
              onClick={handleEdit}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "1rem",
              }}
            />
          </div>
        )}
      </Dialog>

      <Dialog
        header="AddTemplate"
        visible={addtemplate}
        onHide={() => setAddTemplate(false)}
        className="lg:w-[70rem] md:w-[50rem] w-[25rem]"
        draggable={false}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="space-y-4 col-span-12 md:col-span-12 bg-gray-100 p-6 border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InputField
                  label="Template Name"
                  placeholder="Enter tempalte Name"
                />
              </div>
              <div>
                <AnimatedDropdown
                  label="Communication Type"
                  options={[
                    { label: "Select Communication", value: "" },
                    { label: "Real Estate", value: "1" },
                    { label: "Education", value: "2" },
                    { label: "Health", value: "3" },
                    { label: "Other", value: "4" },
                    { label: "Health", value: "5" },
                  ]}
                  id="Communication"
                  name="Communication"
                  value={communication}
                  onChange={setCommunication}
                />
              </div>
            </div>
            <div>
              <label className=" cursor-pointer text-sm font-semibold">
                Template Type
              </label>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mt-1">
                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                  <RadioButton
                    inputId="smsTypetrans"
                    name="smsType"
                    value="transactional"
                    onChange={(e) => setSmsType(e.value)}
                    checked={smsType === "transactional"}
                  />
                  <label
                    htmlFor="smsTypetrans"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Transactional
                  </label>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                  <RadioButton
                    inputId="smsTypepro"
                    name="smsType"
                    value="promotional"
                    onChange={(e) => setSmsType(e.value)}
                    checked={smsType === "promotional"}
                  />
                  <label
                    htmlFor="smsTypepro"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Promotional
                  </label>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                  <RadioButton
                    inputId="smsTypeIntl"
                    name="smsType"
                    value="international"
                    onChange={(e) => setSmsType(e.value)}
                    checked={smsType === "international"}
                  />
                  <label
                    htmlFor="smsTypeIntl"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    International
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <AnimatedDropdown
                  label="Consent Template ID"
                  options={[
                    { label: "Select Consent", value: "" },
                    { label: "Real Estate", value: "1" },
                    { label: "Education", value: "2" },
                    { label: "Health", value: "3" },
                    { label: "Other", value: "4" },
                    { label: "Health", value: "5" },
                  ]}
                  id="category"
                  name="category"
                  value={consent}
                  onChange={setConsent}
                />
              </div>
              <div>
                <AnimatedDropdown
                  label="Select Category"
                  options={[
                    { label: "Select Category", value: "" },
                    { label: "Real Estate", value: "1" },
                    { label: "Education", value: "2" },
                    { label: "Health", value: "3" },
                    { label: "Other", value: "4" },
                    { label: "Health", value: "5" },
                  ]}
                  id="category"
                  name="category"
                  value={cetegory}
                  onChange={setCetegory}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <AnimatedDropdown
                  label="Content Type"
                  options={[
                    { label: "Select Content", value: "0" },
                    { label: "Real Estate", value: "1" },
                    { label: "Education", value: "2" },
                    { label: "Health", value: "3" },
                    { label: "Other", value: "4" },
                    { label: "Health", value: "5" },
                  ]}
                  id="Content"
                  name="Content"
                  value={content}
                  onChange={setContent}
                />
              </div>
              <div className="flex items-end">
                <div className="space-y-2 w-full">
                  {/* File input */}
                  <input
                    type="file"
                    className="block w-full text-sm px-3 py-2 text-gray-600 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                  />

                  {/* Download sample link */}
                  {/* <a
                      href="/sample.csv" // <-- replace with your sample file path
                      download
                      className="text-green-600 text-sm font-medium flex items-center gap-1 hover:underline"
                    >
                      Download Sample File{" "}
                      <FaDownload className="text-green-600" />
                    </a> */}
                </div>
              </div>
            </div>
            <div className="text-sm leading-relaxed">
              <p>
                <span className="font-semibold text-blue-600">
                  Instructions:
                </span>
              </p>
              <p className="text-gray-700">
                When registering the template, it is mandatory to pre-tag
                each variable chosen in the content.
              </p>
              <p className="text-gray-700">
                Choose the correct tag from the dropdown menu under{" "}
                <span className="font-medium">“Select Variable Tag”</span>{" "}
                to pre-tag the variable.
              </p>
              <p className="text-gray-700">
                Please provide a sample value for each selected tag to
                proceed.{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Click here
                </a>{" "}
                for more information.
              </p>
            </div>
            <div>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mt-1">
                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                  <RadioButton
                    inputId="cpypest"
                    name="smsCopyCreate"
                    value="transactional"
                    onChange={(e) => setCopyCreateType(e.value)}
                    checked={smsCopyCreate === "transactional"}
                  />
                  <label
                    htmlFor="cpypest"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Copy/Paste Message
                  </label>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                  <RadioButton
                    inputId="create"
                    name="smsCopyCreate"
                    value="promotional"
                    onChange={(e) => setCopyCreateType(e.value)}
                    checked={smsCopyCreate === "promotional"}
                  />
                  <label
                    htmlFor="create"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Create New Message (Type)
                  </label>
                </div>
              </div>
            </div>
            <div>
              <UniversalTextArea />
            </div>
            <div>
              <UniversalButton label="Save" />
            </div>
          </div>

          {/* <div className="col-span-12 md:col-span-4">
                <div className="bg-gray-100 p-6 max-w-md border rounded-md h-full">
                  
                  <h2 className="text-lg font-semibold text-gray-800">
                    Header (Sender ID) registration:
                  </h2>

                  
                  <div className="bg-yellow-100 text-yellow-800 text-sm font-medium p-3 rounded mt-3">
                    Every header gets a unique Header ID
                  </div>

          
                  <p className="mt-4 text-gray-800 font-medium">
                    Messages are classified into:
                  </p>
                  <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
                    <li>Promotional</li>
                    <li>Transactional</li>
                    <li>Service Explicit</li>
                    <li>Service Implicit</li>
                  </ol>

                  
                  <button className="mt-4 px-4 py-2 border border-gray-800 text-gray-800 text-sm font-semibold rounded shadow hover:bg-gray-100 flex items-center gap-2">
                    KNOW MORE <span>➤</span>
                  </button>
                </div>
              </div> */}
        </div>

        <div className="w-full mt-6 p-4 bg-gray-50 border rounded-md text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Instructions
          </h2>

          {/* Copy/Paste Option */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-900">
              A) Copy/Paste Message
            </h3>
            <ol className="list-decimal list-inside space-y-1 mt-1">
              <li>Copy your desired message into the message box area.</li>
              <li>
                Select the word(s) you want to convert into a variable.
              </li>
              <li>
                Click the <strong>“Add Variable”</strong> button, or type{" "}
                <code>#var#</code>.
              </li>
              <li>
                Click <strong>“Submit”</strong> to submit your content
                template request.
              </li>
            </ol>
          </div>

          {/* Create New Message Option */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-900">
              B) Create New Message
            </h3>
            <ol className="list-decimal list-inside space-y-1 mt-1">
              <li>Type your desired message into the message box.</li>
              <li>
                To add variables, click <strong>“Add Variable”</strong> or
                type <code>#var#</code>.
              </li>
              <li>
                To insert a variable later, place the cursor and then click{" "}
                <strong>“Add Variable”</strong>.
              </li>
              <li>
                Click <strong>“Submit”</strong> to complete your request.
              </li>
            </ol>
          </div>

          {/* Notes */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md">
            <h3 className="font-medium text-yellow-800">Important Notes</h3>
            <ul className="list-disc list-inside mt-1 space-y-1 text-yellow-700">
              <li>
                One variable = maximum <strong>30 characters</strong>.
              </li>
              <li>
                Always include your <strong>brand or business name</strong>{" "}
                in the content.
              </li>
              <li>
                For regional languages, please use the{" "}
                <strong>Copy/Paste Message</strong> option.
              </li>
              <li>
                Do not manually modify <code>#var#</code> placeholders in
                the message box.
              </li>
            </ul>
          </div>

          {/* Example */}
          <div className="mt-4">
            <h3 className="font-medium text-gray-900">Sample Content</h3>
            <p className="italic text-gray-700 mt-1">
              Congratulations! You have received a shopping voucher worth
              Rs. <code>#var#</code>, valid till <code>#var#</code>. <br />–
              Brand Name
            </p>
          </div>
        </div>
      </Dialog>
    </div>
    //   </CustomTabPanel>
    //   <CustomTabPanel value={value} index={1}>
    //     <SmsHeaders />
    //   </CustomTabPanel>
    // </Box>
  );
};

export default SmsDLTtemplate;
