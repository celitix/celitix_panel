import React, { useState, useEffect } from "react";
import { RadioButton } from "primereact/radiobutton";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { toast } from "react-hot-toast";

// MUI Material
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination/usePagination";

// ICONS
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

// COMPONENTS
import UniversalButton from "@/whatsapp/components/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";
import TransferList from "../components/Userlist";
import OperatorList from "../components/OperatorList";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";

// API
import { getCountryList, getOperatorList, getSendingServiceConfiguration } from "@/apis/admin/admin";
import { useUser } from "@/context/auth";
import {
  fetchUserSrno,
  getSendingService,
  saveServiceConfigurationRouting,
  getAllPlans,
} from "@/apis/admin/admin";


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

const EditRouting = ({ id, name }) => {
  const location = useLocation();
  const { row } = location.state || {};
  const [editroutinguserStatus, setEditRoutingUserStatus] = useState("disable");
  const [editroutingheaderStatus, setEditRoutingHeaderStatus] =
    useState("disable");
  const [editroutingmobileStatus, setEditRoutingMobileStatus] =
    useState("disable");
  const [editroutingoperatorsStatus, setEditRoutingOperatorsStatus] =
    useState("disable");
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleChangeeditroutinguserStatus = (event) => {
    setEditRoutingUserStatus(event.target.value);
  };
  const handleChangeeditroutingheaderStatus = (event) => {
    setEditRoutingHeaderStatus(event.target.value);
  };
  const handleChangeeditroutingmobileStatus = (event) => {
    setEditRoutingMobileStatus(event.target.value);
  };
  const handleChangeeditroutingoperatorsStatus = (event) => {
    setEditRoutingOperatorsStatus(event.target.value);
  };

  const [serviceOptions, setServiceOptions] = useState([]);

  async function fetchSendingService() {
    try {
      const sending = { type: "sending" };
      const res = await getSendingService(sending);

      // Map array of objects to dropdown options
      const formatted = res.map((item) => ({
        value: item.serviceid,
        label: item.servicename,
      }));

      setServiceOptions(formatted);
    } catch (error) {
      console.error("Error fetching sending service:", error);
    }
  }
  async function fetchThrottleService() {
    try {
      const throttle = { type: "plan" };
      const res = await getSendingService(throttle);
      // console.log(res, "throttle plan")

      // Map array of objects to dropdown options
      const formatted = res.map((item) => ({
        value: item.serviceid,
        label: item.servicename,
      }));

      // setServiceOptions(formatted);
      setPlanOptions(formatted)
    } catch (error) {
      console.error("Error fetching sending service:", error);
    }
  }

  useEffect(() => {
    fetchSendingService();
    fetchThrottleService()
  }, []);

  // getSendingServiceConfiguration(3)

  const [planOptions, setPlanOptions] = useState([]);
  const [serviceRows, setServiceRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleOperator, setVisibleOperator] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [planName, setPlanName] = useState(row?.planName || "");
  const [planId, setPlanId] = useState(row?.planId || "");
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingTable, setIsFetchingTable] = useState(false);

  const [selectedService, setSelectedService] = useState();
  const [weightage, setWeightage] = useState("");
  const [holdTime, setHoldTime] = useState("");
  const [searchData, setSearchData] = useState({
    planname: "",
    ptype: "",
    status: "",
  });

  const [editData, setEditData] = useState({
    weightage: 7
  });

  // async function handleFetchAllPlans() {
  //   try {
  //     const payload = {
  //       ...searchData,
  //       ptype: searchData.ptype || "-1",
  //       status: String(searchData.status || -1) || -1,
  //     };
  //     // setIsFetching(true);

  //     const res = await getAllPlans(payload);

  //     // normalize data for dropdown
  //     setPlanOptions(
  //       res.map((plan) => ({
  //         value: plan.serviceId,
  //         label: plan.serviceName,
  //       }))
  //     );
  //   } catch (error) {
  //     console.error("Error fetching plans:", error);
  //   } finally {
  //     // setIsFetching(false);
  //   }
  // }

  // useEffect(() => {
  //   handleFetchAllPlans();
  // }, []);

  // const matchedPlan = planOptions.find((p) => p.label === planName);
  // const planId = matchedPlan?.value;

  const fetchServiceConfig = async () => {
    setIsFetchingTable(true)

    try {
      const serviceId = row?.id;

      const resp = await getSendingServiceConfiguration({
        serviceId: serviceId,
      });
      const payload = resp?.data ?? resp;

      if (Array.isArray(payload) && payload.length > 0) {
        setPlanName(payload[0].planName ?? "");
        setSelectedService(payload[0].served_service_id ?? "");
      }

      if (Array.isArray(payload)) {
        const mappedRows = payload.map((item, index) => ({
          id: item.id ?? index + 1,
          sn: index + 1,
          plan: item.planName || "-",
          sendingservice: item.sendingServiceName || "-",
          userserialno: item.uniqueSerialNo || "-",
          senderid: item.display_senderid || "-",
          holdingtime: item.holding_time || "-",
          sendingServiceName: item.sendingServiceName ?? "-",
          status: item.status ?? "-",
          ...item,
        }));
        setServiceRows(mappedRows);
      }
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setIsFetchingTable(false)
    }
  };

  useEffect(() => {
    fetchServiceConfig();
  }, [row]);

  const rows = serviceRows;

  function handleEdit(row) {
    const serviceName = serviceOptions?.find(
      (item) => item.label == row?.sendingServiceName
    )?.value;

    if (row?.userserialno.includes("!=")) {
      setEditRoutingUserStatus("disable");
    } else {
      setEditRoutingUserStatus("enable");
    }
    setEditData({
      ...row,
      sendingServiceName: serviceName,
    });
  }

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    { field: "plan", headerName: "Plan", flex: 1, minWidth: 130 },
    {
      field: "sendingservice",
      headerName: "Sending Service",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "userserialno",
      headerName: "User Serial No",
      flex: 1,
      minWidth: 120,
    },
    { field: "senderid", headerName: "Sender ID", flex: 1, minWidth: 120 },
    {
      field: "holdingtime",
      headerName: "Holding Time",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "sendingServiceName",
      headerName: "Sending Service Name",
      flex: 1,
      minWidth: 120,
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Up Routing" placement="top" arrow>
            <IconButton onClick={() => handleUp(params.row)}>
              <ArrowDropUpOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Down Routing" placement="top" arrow>
            <IconButton onClick={() => handleDown(params.row)}>
              <ArrowDropDownOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Edit Routing" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Routing" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleDelete(params.row)}
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

  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [seedRight, setSeedRight] = useState([]);
  const items = allUsers.map((user) => ({
    id: user.srNo,
    label: user.userName,
  }));
  const [selectedThrottlePlan, setSelectedThrottlePlan] = useState("");
  const handleThrottlePlanChange = (e) => {
    setSelectedThrottlePlan(e);
  };

  const handleSaveUsers = () => {
    setSeedRight(selectedUsers);
    setVisible(false);
    toast.success(`Selected ${selectedUsers?.length} user(s) saved`);
  };

  const [seedRightOperator, setSeedRightOperator] = useState([]);
  const [operatorList, setOperatorList] = useState([]);
  const [searchOperator, setSearchOperator] = useState([]);

  const handleSaveOperators = () => {
    setSeedRightOperator(searchOperator);
    setVisibleOperator(false);
    toast.success(`Selected ${searchOperator?.length} operator(s) saved`);
  };

  useEffect(() => {
    const fetchOpertorList = async () => {
      try {
        const searchCountry = "91"
        const res = await getOperatorList(searchCountry)
        // console.log(res, "operator  list")
        setOperatorList(res);
      } catch (error) {

      }
    }
    fetchOpertorList()
  }, []);

  const operators = operatorList.map((op) => ({
    // id: op.srNo,
    id: op.operatorName,
    label: op.operatorName || "Unnamed operator",
  }));
  const timeStringToSeconds = (timeStr) => {
    if (!timeStr) return 0;

    // If user entered a number (e.g., "20" or 20)
    if (!isNaN(timeStr)) {
      return Number(timeStr);
    }

    // If it's in HH:mm:ss format
    const parts = timeStr.split(":").map(Number);

    // Handle flexible formats (e.g., "00:20" or "20")
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    } else if (parts.length === 1) {
      return parts[0];
    }

    return 0;
  };

  const handleSave = async () => {
    setIsFetching(true);
    try {
      const payload = {
        planId: Number(planId),
        planName: planName,
        sendingService: Number(editData?.sendingServiceName),
        weightage: editData?.weightage,
        // holdTime: Number(editData?.holdingtime),
        holdTime: timeStringToSeconds(editData?.holdingtime),
        // throttlePlan: String(selectedService.value),
        throttlePlan: editData?.throttlePlan,
        senderIds: editData?.senderid,
        userIds: selectedUsers?.map((u) => u.id).join(","),
        // userIds: "254,253",
        status: "1",
        senderidcontains: editroutingheaderStatus === "disable" ? 0 : 1,
        usercontains: editroutinguserStatus === "disable" ? 0 : 1,
        srno: editData?.srno,
        // operator: editData?.operators,
        operator: searchOperator?.map((u) => u.id).join(","),
        operatorcontains: editroutingoperatorsStatus === "enable" ? 1 : 0,
      };

      const res = await saveServiceConfigurationRouting(payload);
      if (res?.status === false || res?.success === false) {
        toast.error(res?.msg || "Failed to save routing configuration.");
      } else {
        toast.success(res?.msg || "Saved configuration successfully.");
        setEditData({
          weightage: 7
        })
        fetchServiceConfig();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save routing configuration.");
    } finally {
      setIsFetching(false);
      setEditData({
        weightage: 7,
      });
    }
  };

  useEffect(() => {
    const fetchAllUsersDetails = async () => {
      const data = { userSrno: "", date: "" };
      try {
        const res = await fetchUserSrno(data);
        if (Array.isArray(res)) {
          setAllUsers(res);
        } else {
          toast.error("Invalid response format!");
        }
      } catch (e) {
        toast.error("Something went wrong! Please try again later.");
      }
    };
    fetchAllUsersDetails();
  }, [user?.role]);

  const handleAddServiceChange = (selectedOption) => {
    setSelectedService(selectedOption);
  };

  return (
    <div className="bg-white md:h-fit h-fit p-4 rounded-2xl">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">SMPP Bind Settings :</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <InputField
            label="Plan"
            id="editroutingplan"
            name="editroutingplan"
            placeholder="Enter Plan"
            value={planName}
            disabled={true}
          />

          <DropdownWithSearch
            label="Sending Service"
            id="addroutingservice"
            name="addroutingservice"
            options={serviceOptions}
            placeholder="Select Sending Service"
            value={editData?.sendingServiceName}
            onChange={(e) => {
              setEditData((prev) => ({
                ...prev,
                sendingServiceName: e,
              }));
            }}
          />

          <div className="flex items-center mt-5 w-full justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-end w-full gap-2">
                <label className="text-gray-700 font-medium text-sm text-nowrap">
                  User :
                </label>
                <div className="flex gap-2">
                  <RadioButton
                    inputId="editroutinguserOption1"
                    name="editroutinguserredio"
                    value="enable"
                    onChange={handleChangeeditroutinguserStatus}
                    checked={editroutinguserStatus === "enable"}
                  />
                  <label
                    htmlFor="editroutinguserOption1"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Allow
                  </label>
                </div>

                {/* Disallow */}
                <div className="flex gap-2">
                  <RadioButton
                    inputId="editroutinguserOption2"
                    name="editroutinguserredio"
                    value="disable"
                    onChange={handleChangeeditroutinguserStatus}
                    checked={editroutinguserStatus === "disable"}
                  />
                  <label
                    htmlFor="editroutinguserOption2"
                    className="text-gray-700 font-medium text-sm cursor-pointer"
                  >
                    Disallow
                  </label>
                </div>
              </div>
            </div>
            <div className="w-max-content text-nowrap">
              <UniversalButton
                label="Select User"
                onClick={() => setVisible(true)}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-6">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="">
              <UniversalLabel
                text="Header :"
                id="editroutingheader"
                name="editroutingheader"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingheaderOption1"
                name="editroutingheaderredio"
                value="enable"
                onChange={handleChangeeditroutingheaderStatus}
                checked={editroutingheaderStatus === "enable"}
              />
              <label
                htmlFor="editroutingheaderOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div>

            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingheaderOption2"
                name="editroutingheaderredio"
                value="disable"
                onChange={handleChangeeditroutingheaderStatus}
                checked={editroutingheaderStatus === "disable"}
              />
              <label
                htmlFor="editroutingheaderOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div>

            <div className="w-full">
              <p className="text-xs font-medium text-gray-800 mb-2 tracking-wider">
                Enter comma separated values. Ex- test1,test2,test3
              </p>
              <UniversalTextArea
                id="editroutingheader"
                name="editroutingheader"
                value={editData?.senderid}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    senderid: e.target.value,
                  }));
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {/*      <div className="">
              <UniversalLabel
                text="Mobile : "
                id="editroutingmobile"
                name="editroutingmobile"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="editroutingmobileOption1"
                name="editroutingmobileredio"
                value="enable"
                onChange={handleChangeeditroutingmobileStatus}
                checked={editroutingmobileStatus === "enable"}
              />
              <label
                htmlFor="editroutingmobileOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div> */}

            {/* Disallow */}
            {/* <div className="flex gap-2">
              <RadioButton
                inputId="editroutingmobileOption2"
                name="editroutingmobileredio"
                value="disable"
                onChange={handleChangeeditroutingmobileStatus}
                checked={editroutingmobileStatus === "disable"}
              />
              <label
                htmlFor="editroutingmobileOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div> */}

            {/* <div className="w-full">
              <UniversalTextArea
                id="editroutingmobile"
                name="editroutingmobile"
              />
            </div> */}
            {/* </div> */}

            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              <div className="">
                <UniversalLabel
                  text="Operators :"
                  id="editroutingoperators"
                  name="editroutingoperators"
                  className="text-gray-700 font-medium text-sm"
                />
              </div>
              <div className="flex gap-2">
                <RadioButton
                  inputId="editroutingoperatorsOption1"
                  name="editroutingoperatorsredio"
                  value="enable"
                  onChange={handleChangeeditroutingoperatorsStatus}
                  checked={editroutingoperatorsStatus === "enable"}
                />
                <label
                  htmlFor="editroutingoperatorsOption1"
                  className="text-gray-700 font-medium text-sm cursor-pointer"
                >
                  Allow
                </label>
              </div>

              <div className="flex gap-2">
                <RadioButton
                  inputId="editroutingoperatorsOption2"
                  name="editroutingoperatorsredio"
                  value="disable"
                  onChange={handleChangeeditroutingoperatorsStatus}
                  checked={editroutingoperatorsStatus === "disable"}
                />
                <label
                  htmlFor="editroutingoperatorsOption2"
                  className="text-gray-700 font-medium text-sm cursor-pointer"
                >
                  Disallow
                </label>
              </div>

              {/* <div className="w-full">
                <p className="text-xs font-medium text-gray-800 mb-2 tracking-wider">
                  Enter comma separated values. Ex- ABCDEF,PROACCF,TEACTT
                </p>
                <UniversalTextArea
                  id="editroutingoperators"
                  name="editroutingoperators"
                  value={editData?.operators}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      operators: e.target.value,
                    }))
                  }
                />
              </div> */}
              <div className="w-full text-nowrap">
                <UniversalButton
                  label="Select Operator"
                  onClick={() => setVisibleOperator(true)}
                />
              </div>
              {/* <DropdownWithSearch
                label="Select Operator"
                id="operator"
                name="operator"
                options={operatorList.map((operator) => ({
                  label: operator.operatorName,
                  value: operator.srNo,
                }))}
                placeholder="select Operator"
                value={searchOperator}
                onChange={(e) => {
                  setSearchOperator(e);
                  // handleFetchOpertorList(e);
                }}
              /> */}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          <div>
            <InputField
              label="Weightage"
              id="weightage"
              placeholder="Enter Weightage"
              value={editData?.weightage}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  weightage: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <InputField
              label="Hold Time"
              id="holdtime"
              tooltipContent="value must be in seconds or in HH:mm:ss format and we convert it to seconds while saving ex- 20 or 00:00:20"
              placeholder="Enter Hold Time"
              value={editData?.holdingtime}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  holdingtime: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <DropdownWithSearch
              label="Throttle Plan"
              id="throttlePlan"
              name="throttlePlan"
              placeholder="select throttle Plan"
              options={planOptions}
              value={editData?.throttlePlan}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  throttlePlan: e,
                }));
              }}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4 tracking-wider">
          <UniversalButton
            // label="Update"
            label={isFetching ? "Updating..." : "Update"}
            id="update"
            name="update"
            onClick={() => handleSave()}
          />
        </div>

        <div>
          {isFetchingTable ? (
            <div className="w-full">
              <UniversalSkeleton height="25rem" width="100%" />
            </div>
          ) : (
            <Paper sx={{ height: 400 }} id={id} name={name}>
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
          )}
        </div>

        {/* Select user start */}
        <Dialog
          header="User list"
          visible={visible}
          onHide={() => setVisible(false)}
          draggable={false}
          modal
          breakpoints={{ "960px": "70vw", "640px": "90vw" }}
          style={{ width: "50vw" }}
        >
          <TransferList
            key={visible ? "open" : "closed"}
            initialLeft={
              items.filter((i) => !seedRight.some((r) => r.id === i.id))
            }
            initialRight={seedRight}
            titleLeft="Available"
            titleRight="Selected"
            onChange={(left, right) => {
              setSelectedUsers(right);
            }}
          />
          <div className="flex items-center justify-center">
            <UniversalButton label="Save" onClick={handleSaveUsers} />
          </div>
        </Dialog>
        {/* Select user End */}

        {/* Select Operators Start */}
        <Dialog
          header="Operators list"
          visible={visibleOperator}
          onHide={() => setVisibleOperator(false)}
          draggable={false}
          modal
          breakpoints={{ "960px": "70vw", "640px": "90vw" }}
          style={{ width: "50vw" }}
        >
          <OperatorList
            // key={visibleOperator ? "open" : "closed"}
            key={visibleOperator ? `open-${seedRightOperator.length}` : 'closed'}
            initialLeft={
              operators.filter((i) => !seedRightOperator.some((r) => r.id === i.id))
            }
            initialRight={seedRightOperator}
            titleLeft="Available"
            titleRight="Selected"
            onChange={(left, right) => {
              setSearchOperator(right);
            }}
          />
          <div className="flex items-center justify-center">
            <UniversalButton label="Save" onClick={handleSaveOperators} />
          </div>
        </Dialog>
        {/* Select Operators End */}
      </div>
    </div>
  );
};

export default EditRouting;
