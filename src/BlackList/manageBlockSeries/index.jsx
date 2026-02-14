import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// MUI MATERIAL
import { IconButton } from "@mui/material";
import { Dialog } from "primereact/dialog";

// ICONS
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import RefreshIcon from "@mui/icons-material/Refresh";

// COMPONENTS
import { DataTable } from "@/components/layout/DataTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";

// API
import {
    addBlockSeries,
    deleteBlockSeries,
    getBlockSeries,
} from "@/apis/admin/admin";

const ManageBlockSeries = () => {
    const [row, setRow] = useState([]);
    const [deleteState, setDeleteState] = useState({
        isOpen: false,
        id: "",
    });
    const [isLoading, setIsLoading] = useState(false)


    const [addDataState, setAddDataState] = useState({
        isOpen: false,
        series: "",
    });

    async function handleGetBlockSeries() {
        setIsLoading(true)
        try {
            const res = await getBlockSeries();

            const formattedRow = Array.isArray(res)
                ? res?.map((item, index) => ({
                    id: index + 1,
                    sn: index + 1,
                    ...item,
                }))
                : [];
            setRow(formattedRow);
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGetBlockSeries();
    }, []);

    async function handleDelete() {
        if (!deleteState.id) return;
        setIsLoading(true)
        try {
            const res = await deleteBlockSeries(deleteState?.id);

            if (!res?.status) {
                return toast.error(res?.msg || "Something went wrong");
            }

            toast.success(res?.msg || "Deleted successfully");
            setDeleteState({ isOpen: false, id: "" });
            await handleGetBlockSeries();
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false)
        }
    }

    async function handleAddBlockSeries() {
        if (!addDataState.series) {
            toast.error("Please enter block series")
            return;
        }
        setIsLoading(true)
        try {
            delete addDataState.isOpen;
            const res = await addBlockSeries(addDataState);

            if (!res?.status) {
                return toast.error(res?.msg || "Something went wrong");
            }

            toast.success(res?.msg || "Added successfully");
            setAddDataState({ isOpen: false, series: "" });
            await handleGetBlockSeries();
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false)
        }
    }

    const col = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        {
            field: "series",
            headerName: "Block Series",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <>
                    {/* <CustomTooltip title="Edit Account" placement="top" arrow>
            <IconButton onClick={() => {}}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip> */}
                    <CustomTooltip title="Delete Account" placement="top" arrow>
                        <IconButton
                            className="no-xs"
                            onClick={() => {
                                setDeleteState({
                                    isOpen: true,
                                    id: params.row.srNo,
                                });
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

    return (
        <div>
            {/* <h1 className="mb-2 text-2xl">Block Header Series</h1> */}

            <div className="flex gap-2 justify-between">
                <UniversalButton
                    label={isLoading ? "Refreshing..." : "Refresh Data"}
                    disabled={isLoading}
                    icon={<RefreshIcon fontSize="small" />}
                    variant="primary"
                    onClick={handleGetBlockSeries}
                />
                <UniversalButton
                    label="Add Block Series"
                    variant="primary"
                    onClick={() => {
                        setAddDataState((prev) => ({ isOpen: true, series: "" }));
                    }}
                />
            </div>

            <div className="mt-2">
                <DataTable
                    id="blockHeader"
                    name="blockHeader"
                    col={col}
                    rows={row}
                    getRowHeight={null}
                />
            </div>

            <Dialog
                header="Add Block Series"
                visible={addDataState.isOpen}
                onHide={() => {
                    setAddDataState((prev) => ({ isOpen: false, series: "" }));
                }}
                className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
                draggable={false}
            >
                <div className="space-y-2">
                    <InputField
                        id="blockSeries"
                        name="blockSeries"
                        label="Block Series"
                        type="text"
                        placeholder="Enter Block series"
                        value={addDataState.series}
                        onChange={(e) => {
                            setAddDataState((prev) => ({
                                ...prev,
                                series: e.target.value,
                            }));
                        }}
                    />
                    <div className="flex items-center justify-center mt-2">
                        <UniversalButton
                            label={isLoading ? "Adding..." : "Add Block Series"}
                            disabled={isLoading}
                            variant="primary"
                            onClick={handleAddBlockSeries}
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Confirm Delete"
                visible={deleteState.isOpen}
                onHide={() => {
                    setDeleteState((prev) => ({ isOpen: false, id: "" }));
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
                            {!isLoading && (
                                <UniversalButton
                                    label="Cancel"
                                    style={{
                                        backgroundColor: "#090909",
                                    }}
                                    onClick={() => {
                                        setDeleteState((prev) => ({ isOpen: false, id: "" }));
                                    }}
                                />
                            )}
                            <UniversalButton
                                label={isLoading ? "Deleting..." : "Delete"}
                                disabled={isLoading}
                                variant="danger"
                                onClick={handleDelete}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ManageBlockSeries;