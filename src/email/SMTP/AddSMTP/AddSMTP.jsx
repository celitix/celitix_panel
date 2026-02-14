import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { IconButton } from "@mui/material";
import { RadioButton } from "primereact/radiobutton";
import toast from "react-hot-toast";


// ICONS
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";


// APIS
import { getSMTPList, addSMTP, getUserDataSMTP, deleteSMTP } from "@/apis/email/Email";

// COMPONENTS
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import InputField from "@/components/layout/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";

const AddSMTP = () => {
    const [rows, setRows] = useState([]);
    const [addSMTPDialog, setAddSMTPDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editDetails, setEditDetails] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [deleteData, setDeleteData] = useState({ isOpen: false, id: null });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [encryption, setEncryption] = useState("disable");
    const [editMode, setEditMode] = useState(false);
    const [smtpData, setSmtpData] = useState({
        srNo: 0,
        hostName: "",
        userName: "",
        port: "",
        password: "",
        encryption: 0,
        authentication: "",
        apiKey: "",
        selectedUserId: 0,
    });

    const smtpColumns = [
        { field: "id", headerName: "S.No", width: 80 },
        { field: "hostName", headerName: "Host Name", flex: 1, minWidth: 180 },
        { field: "userName", headerName: "User Name", flex: 1, minWidth: 180 },
        { field: "port", headerName: "Port", flex: 0.5, minWidth: 100 },
        {
            field: "encryption",
            headerName: "Encryption",
            flex: 0.7,
            minWidth: 130,
            renderCell: (params) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${params.value === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                        }`}
                >
                    {params.value === 1 ? "Enabled" : "Disabled"}
                </span>
            ),
        },
        {
            field: "authentication",
            headerName: "Authentication Type",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "apiKey", headerName: "API Key", flex: 1, minWidth: 220,
            renderCell: (params) => (
                <span
                    className={`text-wrap break-words`}
                >
                    {params.value}
                </span>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            flex: 0,
            minWidth: 140,
            renderCell: (params) => (
                <>
                    <CustomTooltip title="Edit SMTP" placement="top" arrow>
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditNoteIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: "gray",
                                }}
                            />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip title="Delete SMTP" placement="top" arrow>
                        <IconButton className="no-xs"
                            onClick={() =>
                                setDeleteData({ isOpen: true, id: params.row.userSrno })
                            }>
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

    // const fetchAllUsers = async () => {
    //     try {
    //         const res = await fetchUserSrno({ userSrno: "", date: "" });
    //         setUsers(res || []);
    //     } catch {
    //         toast.error("Error fetching user list");
    //     }
    // };

    const fetchSMTPList = async () => {
        setLoading(true)
        try {
            const res = await getSMTPList();
            if (res?.success && Array.isArray(res.data)) {
                setRows(
                    res.data.map((item, index) => ({
                        id: index + 1,
                        srNo: item.srNo,
                        hostName: item.hostName,
                        userName: item.userName,
                        port: item.port,
                        encryption: item.encryption,
                        authentication: item.authentication,
                        apiKey: item.apiKey,
                        ...item,
                    }))
                );
            } else {
                toast.info("No SMTP records found");
                setRows([]);
            }
        } catch (error) {
            console.error("Error fetching SMTP list:", error);
            toast.error("Failed to fetch SMTP list");
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchSMTPList();
        fetchAllUsers();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const payload = {
                ...smtpData,
                port: Number(smtpData.port),
                encryption: Number(smtpData.encryption),
                selectedUserId: Number(smtpData.selectedUserId),
            };

            const res = await addSMTP(payload);

            if (res?.success) {
                if (
                    typeof res.message === "string" &&
                    res.message.toLowerCase().includes("record already exist")
                ) {
                    toast.error(res.message || "SMTP record already exists");
                    return;
                }
                toast.success(
                    editMode ? "SMTP updated successfully" : "SMTP added successfully"
                );
                fetchSMTPList();
                setDialogOpen(false);
            } else {
                toast.error(res?.message || "Operation failed");
            }
        } catch {
            toast.error("Error saving SMTP data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (row) => {
        setEditMode(true);
        try {
            const res = await getUserDataSMTP(row.userSrno);
            const smtp = res?.data?.[0];
            setSmtpData({
                srNo: smtp?.srNo || 0,
                hostName: smtp?.hostName || "",
                userName: smtp?.userName || "",
                port: smtp?.port || "",
                password: smtp?.password || "",
                encryption: smtp?.encryption ?? 0,
                authentication: smtp?.authentication || "",
                apiKey: smtp?.apiKey || "",
                selectedUserId: smtp?.userSrno || 0,
            });
            setDialogOpen(true);
        } catch {
            toast.error("Failed to fetch SMTP details");
        }
    };

    const handleDelete = async () => {
        if (!deleteData?.id) return;
        setLoading(true);
        try {
            const res = await deleteSMTP(deleteData?.id);
            // console.log("res", res);
            if (!res?.success) {
                return toast.error("Something went wrong");
            }
            toast.success(res?.message, "SMTP deleted successfully");
            setDeleteData((prev) => ({ isOpen: false, id: "" }));
            await fetchSMTPList();
        } catch (e) {
            toast.error("Error in fetching smpp details");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setSmtpData((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <>
            <h1 className="flex justify-center items-center font-semibold text-2xl text-gray-700">Manage SMTP</h1>
            <div className="flex flex-wrap gap-2 items-end justify-End w-full my-4">
                <div className="w-max-content">
                    <UniversalButton
                        label={loading ? "Searching..." : "Search"}
                        id="search"
                        name="search"
                        onClick={fetchSMTPList}
                        disabled={loading}
                    />
                </div>
                <div className="w-max-content">
                    <UniversalButton
                        label="Add SMTP"
                        onClick={() => {
                            setEditMode(false);
                            setSmtpData({
                                srNo: 0,
                                hostName: "",
                                userName: "",
                                port: "",
                                password: "",
                                encryption: 0,
                                authentication: "",
                                apiKey: "",
                                selectedUserId: 0,
                            });
                            setDialogOpen(true);
                        }}
                    />
                </div>
            </div>
            <div className="w-full">
                <DataTable rows={rows} col={smtpColumns} getRowHeight={null} />
            </div>
            <Dialog
                header={`${editMode ? "Edit SMTP" : "Add SMTP"}`}
                visible={dialogOpen}
                onHide={() => setDialogOpen(false)}
                className="lg:w-[40rem] md:w-[25rem] w-[20rem]"
                draggable={false}
            >
                <div className="space-y-4">
                    <div className={`grid grid-cols-1 ${editMode ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-2`}>
                        <DropdownWithSearch
                            label="Authentication"
                            placeholder="Select Authentication"
                            value={smtpData.authentication}
                            onChange={(valueOrEvent) => {
                                const value = valueOrEvent?.target?.value ?? valueOrEvent?.value ?? valueOrEvent;
                                handleChange("authentication", value);
                            }}
                            options={[
                                { label: "Plain", value: "plain" },
                                { label: "Login", value: "login" },
                                { label: "Cram MD5", value: "cram md-5" },
                            ]}
                        />
                        {/* {!editMode && (
                            <DropdownWithSearch
                                label="Select User"
                                placeholder="Select User"
                                value={smtpData.selectedUserId}
                                onChange={(value) => handleChange("selectedUserId", value)}
                                options={users
                                    .sort((a, b) => a.userName.localeCompare(b.userName))
                                    .map((u) => ({
                                        label: u.userName,
                                        value: u.srNo,
                                    }))}
                            />
                        )} */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InputField
                            label="Host Name"
                            value={smtpData.hostName}
                            onChange={(e) => handleChange("hostName", e.target.value)}
                            placeholder="Enter Host Name"
                        />
                        <InputField
                            label="User Name"
                            value={smtpData.userName}
                            onChange={(e) => handleChange("userName", e.target.value)}
                            placeholder="Enter User Name"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <UniversalLabel
                                text="Encryption"
                                className="text-gray-700 font-medium text-sm"
                            />
                            <div className="flex gap-4 mt-1">
                                <div className="flex items-center gap-2">
                                    <RadioButton
                                        inputId="enable"
                                        name="encryption"
                                        value={1}
                                        onChange={(e) => handleChange("encryption", e.value)}
                                        checked={smtpData.encryption === 1}
                                    />
                                    <label htmlFor="enable" className="text-sm cursor-pointer">
                                        Enable
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioButton
                                        inputId="disable"
                                        name="encryption"
                                        value={0}
                                        onChange={(e) => handleChange("encryption", e.value)}
                                        checked={smtpData.encryption === 0}
                                    />
                                    <label htmlFor="disable" className="text-sm cursor-pointer">
                                        Disable
                                    </label>
                                </div>
                            </div>
                        </div>
                        <InputField
                            label="Port"
                            value={smtpData.port}
                            tooltipContent="Port must be greater than 0.Port must be less than or equal to 65535."
                            onChange={(e) => handleChange("port", e.target.value)}
                            placeholder="Enter Port"
                            type="number"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InputField
                            label="Password"
                            type="text"
                            value={smtpData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            placeholder="Enter Password"
                        />
                        <InputField
                            label="API Key"
                            value={smtpData.apiKey}
                            onChange={(e) => handleChange("apiKey", e.target.value)}
                            placeholder="Enter API Key"
                        />
                    </div>
                    <div>
                        <UniversalButton
                            // label="Save"
                            label={loading ? "Saving..." : editMode ? "Update" : "Save"}
                            id="saveadd"
                            name="saveadd"
                            onClick={handleSave}
                            disabled={loading}
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Confirm Delete"
                visible={deleteData.isOpen}
                onHide={() => {
                    setDeleteData((prev) => ({ isOpen: false, id: "" }));
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
                            {!loading && (
                                <UniversalButton
                                    label="Cancel"
                                    style={{
                                        backgroundColor: "#090909",
                                    }}
                                    onClick={() => {
                                        setDeleteData((prev) => ({ isOpen: false, id: "" }));
                                    }}
                                />
                            )}
                            <UniversalButton
                                label={loading ? "Deleting..." : "Delete"}
                                disabled={loading}
                                variant="danger"
                                onClick={handleDelete}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddSMTP;
