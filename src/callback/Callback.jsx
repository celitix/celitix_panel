import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import toast from "react-hot-toast";
import { IconButton, Switch } from "@mui/material";
import { Dialog } from "primereact/dialog";

// ICONS
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneIcon from "@mui/icons-material/Phone";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";

// ASSETS
import callback from "../assets/icons/Callback02.svg";

// APIS
import {
  getData,
  deleteData,
  updateStatus,
  getEditData,
  saveWhatsappCallback,
  getWhatsappCallback,
  insertRcsCallback,
  getRcsCallback,
} from "@/apis/callback/callback";
import { getWabaList } from "@/apis/whatsapp/whatsapp";

// COMPONENTS
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import InputField from "@/whatsapp/components/InputField";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import { PaginationTable } from "@/components/layout/PaginationTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import TerminalApp from "./components/TerminalApp";
import { DataTable } from "@/components/layout/DataTable";
import { fetchAllAgents } from "@/apis/rcs/rcs";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import CPaaSTerminal from "./components/CPaaSTerminal";
import CPaaSTerminalLight from "./components/CPaaSTerminal";

// Custom Tab Panel
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const Callback = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [formValues, setFormValues] = useState({
    callBackName: "",
    callBackType: "",
    page: "1",
  });
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [whatsappCallbackVisible, setWhatsappCallbackVisible] = useState(false);
  const [wabaCallbackRows, setWabaCallbackRows] = useState([]);
  const [whatsappCallbackDetails, setWhatsappCallbackDetails] = useState({
    wabaNumber: "",
    url: "",
    wabaSrno: "",
  });

  const [allWaba, setAllWaba] = useState([]);

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [callbackData, setCallbackData] = useState(false);

  const DetailItem = ({ label, value, isLink }) => (
    <div className="flex gap-2 items-center">
      <p className="text-gray-500 text-xs">{label}:</p>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-900 break-all">{value}</p>
      )}
    </div>
  );

  useEffect(() => {
    const fetchAllWaba = async () => {
      if (!whatsappCallbackVisible) return;
      try {
        const res = await getWabaList();
        setAllWaba(res);
      } catch {
        toast.error("Failed to load WABA list");
      }
    };
    fetchAllWaba();
  }, [whatsappCallbackVisible]);

  const fetchWhatappCallbackDetails = async () => {
    try {
      const payload = {
        wabaNumber: whatsappCallbackDetails.wabaNumber,
        wabaSrno: whatsappCallbackDetails.wabaSrno,
      };
      const res = await getWhatsappCallback(payload);
      const formattedRows = [
        {
          id: 1,
          sn: 1,
          ...res,
        },
      ];
      setWabaCallbackRows(formattedRows);
    } catch {
      toast.error("Failed to load WABA list");
    }
  };
  useEffect(() => {
    if (!whatsappCallbackDetails.wabaNumber) return;

    fetchWhatappCallbackDetails();
  }, [whatsappCallbackDetails]);

  async function handleFetchData() {
    try {
      const payload = {
        ...formValues,
        page: "1",
        selectedUserId: "",
      };
      const res = await getData(payload);
      const data = res?.data;
      setTotalPage(res.totalCount);
      const formattedData = Array.isArray(data)
        ? data.map((item, index) => ({ sn: index + 1, id: item.srno, ...item }))
        : [];
      setRows(formattedData);
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  async function handleDelete(row) {
    try {
      const data = {
        srno: row?.id,
        // selectedUserId: 0,
        callBackType: row?.callbackType,
      };
      const res = await deleteData(data);
      if (!res.status) {
        toast.error(res.msg);
        return;
      }
      toast.success(res?.msg);
      setSelectedRow(null);
      setDeleteDialogVisible(false);
      await handleFetchData();
    } catch (e) {
      toast.error("Error while deleting");
    }
  }

  useEffect(() => {
    handleFetchData();
  }, [currentPage]);

  const handleOpen = () => {
    navigate("/addcallback");
  };

  const handleWhatsappCallback = async () => {
    const url = whatsappCallbackDetails.url.trim();

    if (!url.startsWith("https://")) {
      toast.error("URL must start with https://");
      return;
    }
    try {
      const res = await saveWhatsappCallback(whatsappCallbackDetails);
      if (!res?.status) {
        toast.error(res?.msg);
        return;
      }
      toast.success(res?.msg);
      fetchWhatappCallbackDetails();
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const callBackType = [
    { value: "voice", label: "OBD" },
    { value: "rcs", label: "RCS" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "sms", label: "SMS" },
  ];

  async function handleUpdateStatus(row, e) {
    const payload = {
      srno: row?.id,
      // selectedUserId: 0,
      callBackType: row?.callbackType,
      callbackStatus: Number(e.target.checked),
    };

    try {
      const res = await updateStatus(payload);

      if (!res?.status) {
        toast.error(res?.msg);
        return;
      }

      toast.success(res?.msg);
      await handleFetchData();
    } catch (e) {
      toast.error("Error while updating status");
    }
  }

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "callbackName",
      headerName: "Callback Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "userId",
      headerName: "User Name",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "callbackType",
      headerName: "Channel",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "insertTime",
      headerName: "Created On",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip value={"Active"}>
          <Switch
            checked={params.row.allowCallbackDlr}
            onChange={(e) => {
              handleUpdateStatus(params.row, e);
            }}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#34C759",
              },
              "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
              {
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
        <>
          <CustomTooltip title="Edit" placement="top" arrow>
            <IconButton
              onClick={(e) => {
                editData(params.row);
              }}
            >
              <EditNoteOutlinedIcon size={20} />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip title="View" placement="top" arrow>
            <IconButton
              onClick={(e) => {
                viewData(params.row);
              }}
            >
              <FaEye size={20} />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip title="Delete" placement="top" arrow>
            <IconButton
              onClick={(event) => {
                setDeleteDialogVisible(true);
                setSelectedRow(params.row);
              }}
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

  const whatsappCols = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "wabaNumber",
      headerName: "WABA Number",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "url",
      headerName: "URL",
      flex: 1,
      minWidth: 120,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1,
    //   minWidth: 150,
    //   renderCell: (params) => (
    //     <>
    //       <CustomTooltip title="Edit" placement="top" arrow>
    //         <IconButton onClick={() => {}}>
    //           <EditNoteOutlinedIcon size={20} />
    //         </IconButton>
    //       </CustomTooltip>

    //       <CustomTooltip title="Delete" placement="top" arrow>
    //         <IconButton onClick={() => {}}>
    //           <MdOutlineDeleteForever
    //             className="text-red-500 cursor-pointer hover:text-red-600"
    //             size={20}
    //           />
    //         </IconButton>
    //       </CustomTooltip>
    //     </>
    //   ),
    // },
  ];

  async function editData(row) {
    try {
      // const data = {
      //   srno: row?.id,
      //   // selectedUserId: 0,
      //   callBackType: row?.callbackType,
      // };
      const data = {
        srno: row.srno, //sms
        whatsappCallbackSrno: row.whatsappCallbackSrno, //whatsapp
        rcsSrno: row.rcsCallbackSrno, //rcs
        selectedUserId: 0,
        callBackType: row?.callbackType,
      };

      console.log("data", data);
      const res = await getEditData(data);
      navigate(`/editcallback`, { state: { data: {res,row} } });
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  async function viewData(row) {
    setOpenViewDialog(true);
    console.log("row", row);
    try {
      const data = {
        srno: row.srno, //sms
        whatsappCallbackSrno: row.whatsappCallbackSrno, //whatsapp
        rcsSrno: row.rcsCallbackSrno, //rcs
        selectedUserId: 0,
        callBackType: row?.callbackType,
      };
      const res = await getEditData(data);
      setCallbackData(res);
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Box>
      <Tabs
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
        aria-label="Callback Profile Tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          label={
            <span className="flex items-center gap-1">
              <PhoneIcon size={20} /> Callback Profile
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
            <span className="flex items-center gap-2">
              <PhoneCallbackIcon size={20} /> Callback Logs
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
        <div className="w-full">
          <div className="flex flex-col w-full mb-5 ">
            <div className="flex flex-col md:flex-row md:items-end items-start gap-2 mb-2">
              <div className="w-full sm:w-56">
                <InputField
                  label={"Campaign Name"}
                  placeholder={"Campaign Name"}
                  value={formValues.callBackName}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      callBackName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full sm:w-56">
                <DropdownWithSearch
                  id={"callBackType"}
                  name={"callBackType"}
                  label={"Callback Type"}
                  placeholder={"Campaign Type"}
                  value={formValues.callBackType}
                  options={callBackType}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      callBackType: e,
                    });
                  }}
                />
              </div>
              <div className="flex gap-2">
                <UniversalButton label="Search" onClick={handleFetchData} />
                <UniversalButton label="Add Callback" onClick={handleOpen} />
                {/* <UniversalButton
                  label="Add Whatsapp Callback"
                  onClick={() => {
                    setWhatsappCallbackVisible(true);
                  }}
                /> */}
              </div>
            </div>

            {/* <div>
              <UniversalButton label="Add Callback" onClick={handleOpen} />
            </div> */}
          </div>

          <PaginationTable
            id={"callBackReports"}
            name={"callBackReports"}
            col={columns}
            rows={rows}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {/* <TerminalApp /> */}
        <CPaaSTerminalLight />
      </CustomTabPanel>

      <Dialog
        header="Confirm Delete"
        visible={deleteDialogVisible}
        onHide={() => {
          setDeleteDialogVisible(false);
          setSelectedRow(null);
        }}
        className="lg:w-[30rem] md:w-[40rem] w-[17rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          <CancelOutlinedIcon
            sx={{ fontSize: 64, color: "#ff0000ff" }}
            size={20}
          />
        </div>
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete{" "}
              <span className="font-semibold text-red-500">
                {selectedRow?.callbackName || ""}
              </span>
              ? This process cannot be undo.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <UniversalButton
                label="Cancel"
                style={{
                  backgroundColor: "#090909",
                }}
                onClick={() => {
                  setDeleteDialogVisible(false);
                  setSelectedRow(null);
                }}
              />
              <UniversalButton
                label="Delete"
                style={
                  {
                    // backgroundColor: "red",
                  }
                }
                onClick={() => handleDelete(selectedRow)}
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* add whatsapp Callback Dialog */}
      <Dialog
        header="Add Whatsapp Callback"
        visible={whatsappCallbackVisible}
        onHide={() => {
          setWhatsappCallbackVisible(false);
          setWhatsappCallbackDetails({
            wabaNumber: "",
            url: "",
            wabaSrno: "",
          });
        }}
        className="w-[50rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <DropdownWithSearch
            id="waba"
            name="waba"
            label="Select Waba"
            placeholder="Select Waba"
            options={allWaba?.map((item) => ({
              label: item.name,
              value: item.mobileNo,
            }))}
            value={whatsappCallbackDetails.wabaNumber}
            onChange={(e) => {
              const wabaSrno = allWaba.find(
                (item) => item.mobileNo === e
              )?.wabaSrno;
              setWhatsappCallbackDetails({
                ...whatsappCallbackDetails,
                wabaNumber: e,
                wabaSrno,
              });
            }}
          />

          <InputField
            id="url"
            type="url"
            name="url"
            label={"URL"}
            placeholder="Enter URL"
            value={whatsappCallbackDetails.url}
            onChange={(e) => {
              setWhatsappCallbackDetails({
                ...whatsappCallbackDetails,
                url: e.target.value,
              });
            }}
            required
            pattern="https://.*"
          />

          <UniversalButton label="Add" onClick={handleWhatsappCallback} />

          <div>
            <DataTable
              id="whatsappCallback"
              name="whatsappCallback"
              col={whatsappCols}
              rows={wabaCallbackRows}
              getRowHeight={null}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Callback Details"
        visible={openViewDialog}
        onHide={() => {
          setOpenViewDialog(false);
        }}
        className="w-[50rem]"
        draggable={false}
      >
        <div className="border rounded-xl p-5 bg-white space-y-4">
          {/* <h3 className="text-lg font-semibold text-gray-800">
            Callback Details
          </h3> */}

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <DetailItem label="Insert Time" value={callbackData.insertTime} />
            <DetailItem label="Agent ID" value={callbackData.agentId} />
            <DetailItem label="User ID" value={callbackData.userId} />
            <DetailItem
              label="Authorization Type"
              value={callbackData.authorizationType === 2 ? "Bearer Token" : "Authentication"}
            />
            <DetailItem
              label="Callback URL"
              value={callbackData.rcsUrl}
              isLink
            />
          </div>

          {/* Custom Headers */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Custom Headers
            </h4>

            <div className="border rounded-lg divide-y">
              {callbackData.custom_headers?.map((header, index) => (
                <div
                  key={index}
                  className="flex justify-between px-4 py-2 text-sm"
                >
                  <span className="text-gray-600 font-medium">
                    {header.headerKey}
                  </span>
                  <span className="text-gray-900">{header.headerValue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </Box>
  );
};

export default Callback;
