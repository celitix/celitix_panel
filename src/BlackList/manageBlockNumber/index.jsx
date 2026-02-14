import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { is } from "date-fns/locale";

// MUI MATERIAL
import { IconButton, Switch } from "@mui/material";

// ICONS
import { IoSearch } from "react-icons/io5";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";

// COMPONENTS
import { PaginationTable } from "@/components/layout/PaginationTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// API
import {
    addBlockNumber,
    deleteBlockNumber,
    fetchUserSrno,
    getBlockNumberList,
} from "@/apis/admin/admin";

const BlockNumber = () => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [totalPage, setTotalPage] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const [deleteData, setDeleteData] = useState({
        isOpen: false,
        blockSrNo: null,
        userSrNo: null,
    });
    const [editData, setEditData] = useState({
        isOpen: false,
    });

    const [addDataDialog, setAddDataDialog] = useState(false);

    const [mobileNo, setMobileNo] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState([]);

    const [services, setServices] = useState([
        { name: "obd", status: false, },
        { name: "c2c", status: false },
        { name: "rcs", status: false },
        { name: "ibd", status: false },
        { name: "misscall", status: false },
        { name: "whatsapp", status: false },
        { name: "sms", status: false },
    ]);

    const [addData, setAddData] = useState({
        userSrNo: -1,
        mobileNo: "",
        type: "all",
        remark: "",
    });

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
    }, []);

    async function handleFetchBlockNumberList() {
        setIsFetching(true);
        try {
            const payload = { pageIndex: currentPage, mobileNo };

            const res = await getBlockNumberList(payload);

            const filterBlocked = (data) => {
                const keysWithZero = Object.keys(data)
                    .filter((key) => data[key] === 0)
                    ?.map((key) => key.toUpperCase());
                return keysWithZero;
            };
            // const formattedRow = Array.isArray(res?.data?.content)
            //     ? res?.data?.content?.map((item, index) => ({
            //         ...item,
            //         id: index + 1,
            //         sn: index + 1,
            //         blocked:
            //             filterBlocked(item).length === 0 ? "-" : filterBlocked(item),
            //     }))
            //     : [];

            const formattedRow = Array.isArray(res?.data?.content)
                ? res?.data?.content?.map((item, index) => {
                    const matchedUser = allUsers.find((u) => u.srNo === item.userSrNo);
                    return {
                        ...item,
                        id: index + 1,
                        sn: index + 1,
                        blocked:
                            filterBlocked(item).length === 0 ? "-" : filterBlocked(item),
                        // add a separate display name
                        userName:
                            item.userSrNo === -1
                                ? "All Users"
                                : matchedUser?.userName || "Unknown",
                    };
                })
                : [];


            setRows(formattedRow);
            setTotalPage(res?.data?.totalElements);
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsFetching(false);
        }
    }

    function handleDelete(row) {
        if (!row?.blockSrNo || !row?.userSrNo)
            return toast.error("Something went wrong");
        setDeleteData({
            isOpen: true,
            blockSrNo: row.blockSrNo,
            userSrNo: row.userSrNo,
        });
    }

    async function handleBlockNumberDelete() {
        setIsFetching(true);
        try {
            const res = await deleteBlockNumber(deleteData);

            if (!res?.success) {
                return toast.error("Something went wrong");
            }
            toast.success("Block number deleted successfully");
            setDeleteData({
                isOpen: false,
                blockSrNo: null,
                userSrNo: null,
            });
            handleFetchBlockNumberList();
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsFetching(false);
        }
    }

    async function handleAddBlockNumber() {
        setIsFetching(true);
        try {
            const service = {};
            services?.forEach((item, index) => {
                service[item.name] = Number(item.status);
            });

            if (editData?.type === "single" && !editData?.userSrNo) {
                return toast.error("Please select user");
            }
            if (!addData?.mobileNo) return toast.error("Please enter mobile number");
            const payload = {
                ...addData,
                ...service,
            };

            const res = await addBlockNumber(payload);

            if (!res?.success) {
                // return toast.error("Something went wrong");
                return toast.error(res?.message || "Something went wrong");
            }

            toast.success("Block number added successfully");
            setAddDataDialog(false);
            setAddData({
                userSrNo: -1,
                mobileNo: "",
                type: "all",
                remark: "",
            });

            setServices([
                {
                    name: "obd",
                    status: false,
                },
                { name: "c2c", status: false },
                { name: "rcs", status: false },
                { name: "ibd", status: false },
                { name: "misscall", status: false },
                { name: "whatsapp", status: false },
                { name: "sms", status: false },
            ]);
            handleFetchBlockNumberList();
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsFetching(false);
        }
    }

    const columns = [
        { field: "sn", headerName: "S.No", flex: 0, width: 70 },
        { field: "mobileNo", headerName: "Mobile No", flex: 0, minWidth: 200 },
        { field: "type", headerName: "Type", flex: 0, minWidth: 120 },
        { field: "blocked", headerName: "Blocked Service", flex: 1, minWidth: 200 },
        // {
        //   field: "whatsapp",
        //   headerName: "Whatsapp",
        //   flex: 1,
        //   minWidth: 80,
        //   renderCell: (params) => (
        //     <CustomTooltip arrow placement="top" title="On/Off">
        //       <Switch
        //         checked={params.row.whatsapp}
        //         onChange={() => {}}
        //         sx={{
        //           "& .MuiSwitch-switchBase.Mui-checked": {
        //             color: "#34C759",
        //           },
        //           "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        //             {
        //               backgroundColor: "#34C759",
        //             },
        //         }}
        //       />
        //     </CustomTooltip>
        //   ),
        // },
        // {
        //   field: "sms",
        //   headerName: "SMS",
        //   flex: 1,
        //   minWidth: 80,
        //   renderCell: (params) => (
        //     <CustomTooltip arrow placement="top" title="On/Off">
        //       <Switch
        //         checked={params.row.sms}
        //         onChange={() => {}}
        //         sx={{
        //           "& .MuiSwitch-switchBase.Mui-checked": {
        //             color: "#34C759",
        //           },
        //           "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        //             {
        //               backgroundColor: "#34C759",
        //             },
        //         }}
        //       />
        //     </CustomTooltip>
        //   ),
        // },
        // {
        //   field: "rcs",
        //   headerName: "RCS",
        //   flex: 1,
        //   minWidth: 80,
        //   renderCell: (params) => (
        //     <CustomTooltip arrow placement="top" title="On/Off">
        //       <Switch
        //         checked={params.row.rcs}
        //         onChange={() => {}}
        //         sx={{
        //           "& .MuiSwitch-switchBase.Mui-checked": {
        //             color: "#34C759",
        //           },
        //           "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        //             {
        //               backgroundColor: "#34C759",
        //             },
        //         }}
        //       />
        //     </CustomTooltip>
        //   ),
        // },
        // {
        //   field: "ibd",
        //   headerName: "IBD",
        //   flex: 1,
        //   minWidth: 80,
        //   renderCell: (params) => (
        //     <CustomTooltip arrow placement="top" title="On/Off">
        //       <Switch
        //         checked={params.row.ibd}
        //         onChange={() => {}}
        //         sx={{
        //           "& .MuiSwitch-switchBase.Mui-checked": {
        //             color: "#34C759",
        //           },
        //           "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        //             {
        //               backgroundColor: "#34C759",
        //             },
        //         }}
        //       />
        //     </CustomTooltip>
        //   ),
        // },
        // {
        //   field: "obd",
        //   headerName: "OBD",
        //   flex: 1,
        //   minWidth: 80,
        //   renderCell: (params) => (
        //     <CustomTooltip arrow placement="top" title="On/Off">
        //       <Switch
        //         checked={params.row.obd}
        //         onChange={() => {}}
        //         sx={{
        //           "& .MuiSwitch-switchBase.Mui-checked": {
        //             color: "#34C759",
        //           },
        //           "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        //             {
        //               backgroundColor: "#34C759",
        //             },
        //         }}
        //       />
        //     </CustomTooltip>
        //   ),
        // },
        // {
        //   field: "misscall",
        //   headerName: "Miss Call",
        //   flex: 1,
        //   minWidth: 80,
        //   renderCell: (params) => (
        //     <CustomTooltip arrow placement="top" title="On/Off">
        //       <Switch
        //         checked={params.row.misscall}
        //         onChange={() => {}}
        //         sx={{
        //           "& .MuiSwitch-switchBase.Mui-checked": {
        //             color: "#34C759",
        //           },
        //           "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        //             {
        //               backgroundColor: "#34C759",
        //             },
        //         }}
        //       />
        //     </CustomTooltip>
        //   ),
        // },
        // {
        //   field: "c2c",
        //   headerName: "C2C",
        //   flex: 1,
        //   minWidth: 80,
        //   renderCell: (params) => (
        //     <CustomTooltip arrow placement="top" title="On/Off">
        //       <Switch
        //         checked={params.row.c2c}
        //         onChange={() => {}}
        //         sx={{
        //           "& .MuiSwitch-switchBase.Mui-checked": {
        //             color: "#34C759",
        //           },
        //           "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        //             {
        //               backgroundColor: "#34C759",
        //             },
        //         }}
        //       />
        //     </CustomTooltip>
        //   ),
        // },

        { field: "userName", headerName: "Blocked For", flex: 1, minWidth: 120 },
        { field: "remark", headerName: "Remarks", flex: 1, minWidth: 150 },
        {
            field: "action",
            headerName: "Action",
            flex: 0,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <CustomTooltip title="Edit Account" placement="top" arrow>
                        <IconButton
                            onClick={() => {
                                handleEdit(params.row);
                            }}
                        >
                            <EditNoteIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title="Delete Account" placement="top" arrow>
                        <IconButton
                            className="no-xs"
                            onClick={() => {
                                handleDelete(params.row);
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

    function handleEdit(row) {
        if (!row?.blockSrNo || !row?.userSrNo) return;

        const allServices = [...services];
        allServices.forEach((item) => {
            if (row.hasOwnProperty(item.name)) {
                item.status = Boolean(row[item.name]);
            }
        });

        const type = row.userSrNo === -1 ? "all" : "single";


        setServices(allServices);
        setEditData({
            isOpen: true,
            ...row,
            type,
            userSrNo: row.userSrNo,
        });
    }

    async function handleEditBlockRecord() {
        setIsFetching(true);
        try {
            const service = {};
            services?.forEach((item, index) => {
                service[item.name] = Number(item.status);
            });
            if (editData?.type === "single" && !editData?.userSrNo) {
                return toast.error("Please select user");
            }
            if (!editData?.mobileNo) return toast.error("Please enter mobile number");

            // delete editData.blocked;
            // delete editData.sn;
            // delete editData.isOpen;
            // delete editData.id;
            // const payload = {
            //     ...editData,
            //     ...service,
            // };

            const { blocked, sn, isOpen, id, userName, ...rest } = editData;

            const payload = {
                ...rest,
                ...service,
            };

            if (payload.type === "all") {
                payload.userSrNo = -1;
            }
            const res = await addBlockNumber(payload);

            if (!res?.success) {
                return toast.error("Something went wrong");
            }

            toast.success("Block number updated successfully");
            // setEditData(false);
            setEditData({
                isOpen: false,
            });

            setServices([
                {
                    name: "obd",
                    status: false,
                },
                { name: "c2c", status: false },
                { name: "rcs", status: false },
                { name: "ibd", status: false },
                { name: "misscall", status: false },
                { name: "whatsapp", status: false },
            ]);
            handleFetchBlockNumberList();
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        handleFetchBlockNumberList();
    }, [currentPage, allUsers]);

    return (
        <div>
            <div className="flex flex-wrap justify-center items-center gap-6 ">
                {/* <h1 className="text-2xl font-medium text-gray-800 ">
                    Manage Block Number
                </h1> */}
                <div className="flex gap-2 w-full items-end flex-wrap md:flex-nowrap justify-center">
                    <div className="flex gap-2 w-full items-end">
                        <div className="w-[350px]">
                            <InputField
                                id="blocknumber"
                                name="blocknumber"
                                label="Block Number"
                                value={mobileNo}
                                placeholder="Search Block Number"
                                onChange={(e) => setMobileNo(e.target.value)}
                            />
                        </div>

                        <div className="w-full w-max-content">
                            <UniversalButton
                                icon={<IoSearch />}
                                label={isFetching ? "Searching..." : "Search"}
                                disabled={isFetching}
                                id="search"
                                name="search"
                                onClick={handleFetchBlockNumberList}
                            />
                        </div>
                    </div>
                    <div className="w-max-content flex items-end text-nowrap">
                        <UniversalButton
                            label="Add Block Number"
                            id="addblocknumber"
                            name="addblocknumber"
                            onClick={() => setAddDataDialog(true)}
                        />
                    </div>
                </div>
            </div>


            <div className="mt-4">
                <PaginationTable
                    id="blocknumberlist"
                    name="blocknumberlist"
                    rows={rows}
                    col={columns}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                />
            </div>

            {/* Delete mobile number start */}
            <Dialog
                header="Confirm Delete"
                visible={deleteData.isOpen}
                onHide={() => {
                    setDeleteData((prev) => ({
                        isOpen: false,
                        blockSrNo: any,
                        userSrNo: any,
                    }));
                }}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div>
                    <div className="p-4 text-center">
                        <p className="text-[1.1rem] font-semibold text-gray-600">
                            Are you sure ?
                        </p>
                        <p>
                            Do you really want to delete this? This process cannot be undo.
                        </p>
                        <div className="flex justify-center gap-4 mt-2">
                            {!isFetching && (

                                <UniversalButton
                                    label="Cancel"
                                    style={{
                                        backgroundColor: "#090909",
                                    }}
                                    onClick={() => {
                                        setDeleteData((prev) => ({
                                            isOpen: false,
                                            blockSrNo: any,
                                            userSrNo: any,
                                        }));
                                    }}
                                />
                            )}
                            <UniversalButton
                                label={isFetching ? "Deleting..." : "Delete"}
                                disabled={isFetching}
                                variant="danger"
                                onClick={handleBlockNumberDelete}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
            {/* Delete mobile number End */}

            {/* Add Mobile Dialoag */}
            <Dialog
                header="Add Mobile Number To Blacklist"
                visible={addDataDialog}
                onHide={() => {
                    setAddDataDialog(false);
                    setAddData({
                        userSrNo: -1,
                        mobileNo: "",
                        type: "all",
                        remark: "",
                    });

                    setServices([
                        {
                            name: "obd",
                            status: false,
                        },
                        { name: "c2c", status: false },
                        { name: "rcs", status: false },
                        { name: "ibd", status: false },
                        { name: "misscall", status: false },
                        { name: "whatsapp", status: false },
                        { name: "sms", status: false },
                    ]);
                }}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div className="space-y-2">
                    <div className="flex gap-6 items-center justify-center">
                        <label
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition-all duration-200
      ${addData.type === "all"
                                    ? "bg-green-50 border-green-500 text-green-700 shadow-sm"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            <input
                                type="radio"
                                name="type"
                                value="all"
                                checked={addData.type === "all"}
                                onChange={() =>
                                    setAddData((prev) => ({
                                        ...prev,
                                        type: "all",
                                        userSrNo: -1,
                                    }))
                                }
                                className="hidden"
                            />
                            <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center
        ${addData.type === "all" ? "border-green-600" : "border-gray-400"}`}
                            >
                                {addData.type === "all" && (
                                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                                )}
                            </span>
                            <span className="font-medium text-sm">All Users</span>
                        </label>

                        <label
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition-all duration-200
      ${addData.type === "single"
                                    ? "bg-green-50 border-green-500 text-green-700 shadow-sm"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            <input
                                type="radio"
                                name="type"
                                value="single"
                                checked={addData.type === "single"}
                                onChange={() =>
                                    setAddData((prev) => ({
                                        ...prev,
                                        type: "single",
                                        userSrNo: 0,
                                    }))
                                }
                                className="hidden"
                            />
                            <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center
        ${addData.type === "single" ? "border-green-600" : "border-gray-400"}`}
                            >
                                {addData.type === "single" && (
                                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                                )}
                            </span>
                            <span className="font-medium text-sm">Single User</span>
                        </label>
                    </div>

                    {/* <div className="grid grid-cols-2">
                        {services?.map((item, index) => (
                            <div className="flex items-center gap-2" key={item.name}>
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    id={item.name}
                                    checked={item.status}
                                    onChange={(e) => {
                                        const allServices = [...services];
                                        allServices[index].status = e.target.checked;
                                        setServices(allServices);
                                    }}
                                />
                                <label htmlFor={item.name}>{item.name.toUpperCase()}</label>
                            </div>
                        ))}
                    </div> */}

                    <div className="grid grid-cols-2 gap-3 my-4">
                        {services?.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-2 border p-2 rounded-md ">
                                <input
                                    type="checkbox"
                                    id={item.name}
                                    name={item.name}
                                    checked={item.status}
                                    onChange={(e) => {
                                        const allServices = [...services];
                                        allServices[index].status = e.target.checked;
                                        setServices(allServices);
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <label
                                    htmlFor={item.name}
                                    className="text-sm text-gray-700 cursor-pointer select-none"
                                >
                                    {item.name.toUpperCase()}
                                </label>
                            </div>
                        ))}
                    </div>


                    <div className="space-y-2">
                        <div className="flex items-center flex-wrap md:flex-nowrap gap-2">
                            {addData.type === "single" && (
                                <div className="w-full">
                                    <DropdownWithSearch
                                        id="manageuser"
                                        name="manageuser"
                                        label="Select User"
                                        tooltipContent="Select user you want to block number for"
                                        tooltipPlacement="top"
                                        options={allUsers
                                            .slice()
                                            .sort((a, b) => a.userName.localeCompare(b.userName))
                                            .map((user) => ({
                                                label: user.userName,
                                                value: user.srNo,
                                            }))}
                                        value={addData.userSrNo}
                                        onChange={(e) =>
                                            setAddData((prev) => ({
                                                ...prev,
                                                userSrNo: e,
                                            }))
                                        }
                                        placeholder="Select User"
                                    />
                                </div>
                            )}

                            <InputField
                                id="addMobile"
                                name="addMobile"
                                label="Mobile Number"
                                tooltipContent="Enter mobile number you want to block"
                                value={addData.mobileNo}
                                placeholder="Enter Mobile Number"
                                onChange={(e) =>
                                    setAddData((prev) => ({
                                        ...prev,
                                        mobileNo: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <InputField
                            id="addRemarks"
                            name="addRemarks"
                            label="Remarks"
                            tooltipContent="Enter remarks/reason for blocking this number"
                            value={addData.remark}
                            placeholder="Enter Remarks"
                            onChange={(e) =>
                                setAddData((prev) => ({
                                    ...prev,
                                    remark: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <UniversalButton
                            id="save"
                            name="save"
                            // label="Save"
                            label={isFetching ? "Saving..." : "Save"}
                            disabled={isFetching}
                            onClick={handleAddBlockNumber}
                        />
                    </div>
                </div>
            </Dialog>

            {/* Edit Mobile Dialoag */}
            <Dialog
                header="Edit Blacklist Mobile Number"
                visible={editData.isOpen}
                onHide={() => {
                    setEditData((prev) => ({
                        isOpen: false,
                    }));
                }}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div className="space-y-2">

                    <div className="flex gap-6 items-center justify-center">
                        {["all", "single"].map((type) => (
                            <label
                                key={type}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition-all duration-200
          ${editData.type === type
                                        ? "bg-green-50 border-green-500 text-green-700 shadow-sm"
                                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    value={type}
                                    checked={editData.type === type}
                                    onChange={() =>
                                        setEditData((prev) => ({
                                            ...prev,
                                            type,
                                            userSrNo: type === "all" ? -1 : 0,
                                        }))
                                    }
                                    className="hidden"
                                />
                                <span
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center
            ${editData.type === type ? "border-green-600" : "border-gray-400"}`}
                                >
                                    {editData.type === type && (
                                        <span className="w-2 h-2 rounded-full bg-green-600"></span>
                                    )}
                                </span>
                                <span className="font-medium text-sm">
                                    {type === "all" ? "All Users" : "Single User"}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 my-4">
                        {services?.map((item, index) => (
                            <div className="flex items-center border gap-2 rounded-md p-2" key={item.name}>
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    id={item.name}
                                    checked={item.status}
                                    onChange={(e) => {
                                        const allServices = [...services];
                                        allServices[index].status = e.target.checked;
                                        setServices(allServices);
                                    }}
                                />
                                <label
                                    htmlFor={item.name}
                                    className="text-sm text-gray-700 cursor-pointer select-none"

                                >
                                    {item.name.toUpperCase()}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center flex-wrap md:flex-nowrap gap-2" >
                            {editData.type === "single" && (

                                <div className="w-full">
                                    <DropdownWithSearch
                                        id="manageuser"
                                        name="manageuser"
                                        label="Select User"
                                        tooltipContent="Select user you want to block number for"
                                        tooltipPlacement="top"
                                        options={allUsers
                                            .slice()
                                            .sort((a, b) => a.userName.localeCompare(b.userName))
                                            .map((user) => ({
                                                label: user.userName,
                                                value: user.srNo,
                                            }))}
                                        value={editData.userSrNo}
                                        onChange={(e) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                userSrNo: e,
                                            }))
                                        }
                                        placeholder="Select User"
                                    />
                                </div>
                            )}

                            <InputField
                                id="addMobile"
                                name="addMobile"
                                label="Mobile Number"
                                tooltipContent="Enter mobile number you want to block"
                                value={editData.mobileNo}
                                placeholder="Enter Mobile Number"
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        mobileNo: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <InputField
                            id="addRemarks"
                            name="addRemarks"
                            label="Remarks"
                            tooltipContent="Enter remarks/reason for blocking this number"
                            value={editData.remark}
                            placeholder="Enter Remarks"
                            onChange={(e) =>
                                setEditData((prev) => ({
                                    ...prev,
                                    remark: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="flex justify-center items-center">
                        <UniversalButton
                            id="update"
                            name="update"
                            // label="Update"
                            label={isFetching ? "Updating..." : "Update"}
                            disabled={isFetching}
                            onClick={handleEditBlockRecord}
                        />
                    </div>
                </div>
            </Dialog>
        </div >
    );
};

export default BlockNumber;
