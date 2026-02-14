import React, { useEffect, useState, useMemo } from "react";
import { RadioButton } from "primereact/radiobutton";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

// MUI MATERIAL
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

// API
import {
  fetchUserSrno,
  getAllPlans,
  getSendingService,
  saveServiceConfigurationRouting,
} from "@/apis/admin/admin";

// CONTEXT
import { useUser } from "@/context/auth";

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

const AddRouting = ({ id, name }) => {
  const [visible, setVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [seedRight, setSeedRight] = useState([]);

  const [planOptions, setPlanOptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedThrottlePlan, setSelectedThrottlePlan] = useState("");

  const [searchData, setSearchData] = useState({
    planname: "",
    ptype: "",
    status: "",
  });

  const [header, setHeader] = useState("");

  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  async function handleFetchAllPlans() {
    try {
      const payload = {
        ...searchData,
        ptype: searchData.ptype || "-1",
        status: String(searchData.status || -1) || -1,
      };
      setIsFetching(true);

      const res = await getAllPlans(payload);

      // normalize data for dropdown
      setPlanOptions(
        res.map((plan) => ({
          value: plan.serviceId,
          label: plan.serviceName,
        }))
      );
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    handleFetchAllPlans();
  }, []);
  const handlePlanChange = (e) => {
    setSelectedPlan(e);
  };
  const handleThrottlePlanChange = (e) => {
    setSelectedThrottlePlan(e);
  };

  // getSendingService()  throttle  - pass this parameter

  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  // async function fetchSendingService() {
  //   try {
  //     const sending = { type: "sending" };
  //     const res = await getSendingService(sending);

  //     const formatted = Object.entries(res).map(([key, value]) => ({
  //       value: key,
  //       label: value,
  //     }));
  //     setServiceOptions(formatted);
  //   } catch (error) {
  //     console.error("Error fetching sending service:", error);
  //   }
  // }

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


  const handleAddServiceChange = (selectedOption) => {
    setSelectedService(selectedOption);
  };

  useEffect(() => {
    fetchSendingService();
  }, []);

  // User
  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // const items = [
  //   { id: 1, label: "Apple" },
  //   { id: 2, label: "Banana" },
  //   { id: 3, label: "Cherry" },
  //   { id: 4, label: "Dates" },
  //   { id: 5, label: "Elderberry" },
  // ];

  const items = allUsers.map((user) => ({
    id: user.srNo,
    label: user.userName,
  }));

  // fetchAllUsersDetails
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

  const userOptions = useMemo(() => {
    return allUsers
      .slice()
      .sort((a, b) => (a?.userName || "").localeCompare(b?.userName || ""))
      .map((u) => ({
        label: u.userName,
        value: String(u.srNo),
      }));
  }, [allUsers]);

  const handleSaveUsers = () => {
    // persist staged selection
    setSeedRight(selectedUsers);
    setVisible(false);
    toast.success(`Selected ${selectedUsers?.length} user(s) saved`);
  };

  const [addroutinguserStatus, setAddRoutingUserStatus] = useState("disable");
  const [addroutingheaderStatus, setAddRoutingHeaderStatus] =
    useState("disable");
  const [addroutingmobileStatus, setAddRoutingMobileStatus] =
    useState("disable");
  const [addroutingoperatorsStatus, setAddRoutingOperatorsStatus] =
    useState("disable");
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleChangeaddroutinguserStatus = (event) => {
    setAddRoutingUserStatus(event.target.value);
  };
  const handleChangeaddroutingheaderStatus = (event) => {
    setAddRoutingHeaderStatus(event.target.value);
  };
  const handleChangeaddroutingmobileStatus = (event) => {
    setAddRoutingMobileStatus(event.target.value);
  };
  const handleChangeaddroutingoperatorsStatus = (event) => {
    setAddRoutingOperatorsStatus(event.target.value);
  };

  const [headerText, setHeaderText] = useState("");
  const [weightage, setWeightage] = useState("");
  const [holdTime, setHoldTime] = useState("");

  const handleSave = async () => {
    try {
      if (!selectedPlan) return toast.error("Please select a Plan.");
      if (!selectedService)
        return toast.error("Please select a Sending Service.");

      const planNameFetch = planOptions.find((p) => p.value === selectedPlan);
      const throttlePlanNameFetch = planOptions.find(
        (p) => p.value === selectedThrottlePlan
      );

      const payload = {
        planId: Number(selectedPlan),
        planName: planNameFetch?.label,
        sendingService: Number(selectedService),
        throttlePlan: Number(selectedThrottlePlan),
        holdTime: holdTime || 0,
        senderIds: header,
        userIds: selectedUsers?.map((u) => u.id).join(","),
        weightage: weightage || 0,
        status: "1",
        senderidcontains: addroutingheaderStatus === "enable" ? 1 : 0
        ,
        usercontains: addroutinguserStatus === "disable" ? 0 : 1,
        // srno: String(user?.srNo ?? ""),
      };

      const res = await saveServiceConfigurationRouting(payload);
      if (res?.status === false) {
        toast.error(res?.msg || "Failed to save routing configuration.");
      } else {
        toast.success(res?.msg || "Saved configuration successfully.");
      }
      if (res?.status === true) {
        navigate("/managerouting");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save routing configuration.");
    }
  };

  // const rows = Array.from({ length: 5 }, (_, i) => ({
  //   id: i + 1,
  //   sn: i + 1,
  //   plan: "Otp",
  //   sendingservice: "Operator1",
  //   userserialno: "!=%",
  //   senderid: "!=,",
  //   holdingtime: "00:00:00",
  //   routingstatus: "Make Disable",
  //   status: "pending",
  // }));

  // const columns = [
  //   { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
  //   { field: "plan", headerName: "Plan", flex: 1, minWidth: 130 },
  //   {
  //     field: "sendingservice",
  //     headerName: "Sending Service",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "userserialno",
  //     headerName: "User Serial No",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   { field: "senderid", headerName: "Sender ID", flex: 1, minWidth: 120 },
  //   {
  //     field: "holdingtime",
  //     headerName: "Holding Time",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   {
  //     field: "routingstatus",
  //     headerName: "Routing Status",
  //     flex: 1,
  //     minWidth: 120,
  //   },
  //   { field: "status", headerName: "Status", flex: 1, minWidth: 80 },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     flex: 1,
  //     minWidth: 180,
  //     renderCell: (params) => (
  //       <>
  //         <CustomTooltip title="Up Routing" placement="top" arrow>
  //           <IconButton onClick={() => handleUp(params.row)}>
  //             <ArrowDropUpOutlinedIcon
  //               sx={{
  //                 fontSize: "1.2rem",
  //                 color: "gray",
  //               }}
  //             />
  //           </IconButton>
  //         </CustomTooltip>
  //         <CustomTooltip title="Down Routing" placement="top" arrow>
  //           <IconButton onClick={() => handleDown(params.row)}>
  //             <ArrowDropDownOutlinedIcon
  //               sx={{
  //                 fontSize: "1.2rem",
  //                 color: "gray",
  //               }}
  //             />
  //           </IconButton>
  //         </CustomTooltip>
  //         <CustomTooltip title="Edit Routing" placement="top" arrow>
  //           <IconButton onClick={() => handleEdit(params.row)}>
  //             <EditNoteIcon
  //               sx={{
  //                 fontSize: "1.2rem",
  //                 color: "gray",
  //               }}
  //             />
  //           </IconButton>
  //         </CustomTooltip>
  //         <CustomTooltip title="Delete Routing" placement="top" arrow>
  //           <IconButton
  //             className="no-xs"
  //             onClick={() => handleDelete(params.row)}
  //           >
  //             <MdOutlineDeleteForever
  //               className="text-red-500 cursor-pointer hover:text-red-600"
  //               size={20}
  //             />
  //           </IconButton>
  //         </CustomTooltip>
  //       </>
  //     ),
  //   },
  // ];

  // const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  // const CustomFooter = () => {
  //   return (
  //     <GridFooterContainer
  //       sx={{
  //         display: "flex",
  //         flexWrap: "wrap",
  //         justifyContent: { xs: "center", lg: "space-between" },
  //         alignItems: "center",
  //         padding: 1,
  //         gap: 2,
  //         overflowX: "auto",
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           display: "flex",
  //           alignItems: "center",
  //           flexWrap: "wrap",
  //           gap: 1.5,
  //         }}
  //       >
  //         {selectedRows.length > 0 && (
  //           <Typography
  //             variant="body2"
  //             sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
  //           >
  //             {selectedRows.length} Rows Selected
  //           </Typography>
  //         )}

  //         <Typography variant="body2">
  //           Total Records: <span className="font-semibold">{rows.length}</span>
  //         </Typography>
  //       </Box>

  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           width: { xs: "100%", sm: "auto" },
  //         }}
  //       >
  //         <CustomPagination
  //           totalPages={totalPages}
  //           paginationModel={paginationModel}
  //           setPaginationModel={setPaginationModel}
  //         />
  //       </Box>
  //     </GridFooterContainer>
  //   );
  // };
  return (
    <div className="bg-white h-full p-4 rounded-2xl overflow-scroll">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">SMPP Bind Settings :</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <DropdownWithSearch
            label="Plan"
            id="addroutingplan"
            name="addroutingplan"
            placeholder="Select Plan"
            options={planOptions}
            value={selectedPlan}
            onChange={handlePlanChange}
          />

          <DropdownWithSearch
            label="Sending Service"
            id="addroutingservice"
            name="addroutingservice"
            options={serviceOptions}
            placeholder="Select Sending Service"
            value={selectedService}
            onChange={handleAddServiceChange}
          />

          <div className="flex items-center w-full justify-between ">
            <div className="flex flex-col gap-3">
              <label className="text-gray-700 font-medium text-sm text-nowrap">
                User :
              </label>
              <div className="flex items-end w-full gap-2">
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <RadioButton
                      inputId="addroutinguserOption1"
                      name="addroutinguserredio"
                      value="enable"
                      onChange={handleChangeaddroutinguserStatus}
                      checked={addroutinguserStatus === "enable"}
                    />
                    <label
                      htmlFor="addroutinguserOption1"
                      className="text-gray-700 font-medium text-sm cursor-pointer"
                    >
                      Contains
                    </label>
                  </div>

                  {/* Disallow */}
                  <div className="flex gap-2">
                    <RadioButton
                      inputId="addroutinguserOption2"
                      name="addroutinguserredio"
                      value="disable"
                      onChange={handleChangeaddroutinguserStatus}
                      checked={addroutinguserStatus === "disable"}
                    />
                    <label
                      htmlFor="addroutinguserOption2"
                      className="text-gray-700 font-medium text-sm cursor-pointer"
                    >
                      Not Contain
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-max-content text-nowrap">
              <UniversalButton
                label="Select Users"
                onClick={() => setVisible(true)}
              />
            </div>

            <Dialog
              header="User list"
              visible={visible}
              onHide={() => setVisible(false)}
              draggable={false}
              modal
              breakpoints={{ "960px": "70vw", "640px": "90vw" }}
              style={{ width: "50vw" }} // responsive + nice default
            // footer={footer}
            >
              <TransferList
                key={visible ? "open" : "closed"}
                initialLeft={
                  // left = all items minus whatever is seeded to the right
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
                <UniversalButton label="Save user" onClick={handleSaveUsers} />
              </div>
            </Dialog>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="">
              <UniversalLabel
                text="Header :"
                id="addroutingheader"
                name="addroutingheader"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="addroutingheaderOption1"
                name="addroutingheaderredio"
                value="enable"
                onChange={handleChangeaddroutingheaderStatus}
                checked={addroutingheaderStatus === "enable"}
              />
              <label
                htmlFor="addroutingheaderOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div>

            {/* Disallow */}
            <div className="flex gap-2">
              <RadioButton
                inputId="addroutingheaderOption2"
                name="addroutingheaderredio"
                value="disable"
                onChange={handleChangeaddroutingheaderStatus}
                checked={addroutingheaderStatus === "disable"}
              />
              <label
                htmlFor="addroutingheaderOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div>

            <div className="w-full">
              <UniversalTextArea
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                id="addroutingheader"
                name="addroutingheader"
                className="w-25 resize:none"
              />
            </div>
          </div>

          {/* <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="">
              <UniversalLabel
                text="Mobile : "
                id="addroutingmobile"
                name="addroutingmobile"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="addroutingmobileOption1"
                name="addroutingmobileredio"
                value="enable"
                onChange={handleChangeaddroutingmobileStatus}
                checked={addroutingmobileStatus === "enable"}
              />
              <label
                htmlFor="addroutingmobileOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div>

            <div className="flex gap-2">
              <RadioButton
                inputId="addroutingmobileOption2"
                name="addroutingmobileredio"
                value="disable"
                onChange={handleChangeaddroutingmobileStatus}
                checked={addroutingmobileStatus === "disable"}
              />
              <label
                htmlFor="addroutingmobileOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div>

            <div className="w-full">
              <UniversalTextArea
                id="addroutingmobile"
                name="addroutingmobile"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="">
              <UniversalLabel
                text="Operators :"
                id="addroutingoperators"
                name="addroutingoperators"
                className="text-gray-700 font-medium text-sm"
              />
            </div>
            <div className="flex gap-2">
              <RadioButton
                inputId="addroutingoperatorsOption1"
                name="addroutingoperatorsredio"
                value="enable"
                onChange={handleChangeaddroutingoperatorsStatus}
                checked={addroutingoperatorsStatus === "enable"}
              />
              <label
                htmlFor="addroutingoperatorsOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Allow
              </label>
            </div>

            <div className="flex gap-2">
              <RadioButton
                inputId="addroutingoperatorsOption2"
                name="addroutingoperatorsredio"
                value="disable"
                onChange={handleChangeaddroutingoperatorsStatus}
                checked={addroutingoperatorsStatus === "disable"}
              />
              <label
                htmlFor="addroutingoperatorsOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Disallow
              </label>
            </div>

            <div className="w-full">
              <UniversalTextArea
                id="addroutingoperators"
                name="addroutingoperators"
              />
            </div>
          </div> */}
          <div>
            <InputField
              label="Weightage"
              id="weightage"
              value={weightage}
              placeholder="Enter Weightage"
              onChange={(e) => setWeightage(e.target?.value ?? e?.value ?? e)}
            />
          </div>
          <div>
            <InputField
              label="Hold Time"
              id="holdtime"
              placeholder="Enter Hold Time"
              value={holdTime}
              onChange={(e) => setHoldTime(e.target?.value ?? e?.value ?? e)}
            />
          </div>
          <div>
            <DropdownWithSearch
              label="Throttle Plan"
              id="throttlePlan"
              name="throttlePlan"
              placeholder="select throttle Plan"
              options={planOptions}
              value={selectedThrottlePlan}
              onChange={handleThrottlePlanChange}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center mt-4 tracking-wider">
          <UniversalButton
            label="Save"
            id="saveadd"
            name="saveadd"
            onClick={handleSave}
          />
        </div>
        {/* <div>
          <Paper sx={{ height: 300 }} id={id} name={name}>
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
        </div> */}
      </div>
    </div>
  );
};

export default AddRouting;
