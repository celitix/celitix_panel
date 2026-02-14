import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { is } from "date-fns/locale";

// MUI MATERIAL
import { IconButton, Switch } from "@mui/material";

// ICONS
import EditNoteIcon from "@mui/icons-material/EditNote";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

// COMPONENTS
import { PaginationTable } from "@/components/layout/PaginationTable";
import CustomTooltip from "@/components/common/CustomTooltip";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/whatsapp/components/InputField";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { DataTable } from "@/components/layout/DataTable";

// CONTEXT
import { useUser } from "@/context/auth";

// API
import { getBlockContentByUserId, fetchUserSrno, addBlockContent, deleteBlockContent } from "@/apis/admin/admin";

const BlockContent = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalPage, setTotalPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addDataDialog, setAddDataDialog] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const { user } = useUser();

  const [deleteData, setDeleteData] = useState({
    isOpen: false,
    blockSrNo: null,
    userSrNo: null,
  });

  const [addData, setAddData] = useState({
    userSrNo: -1,
    type: "all",
    smsType: 1
  });

  const [userId, setUserId] = useState(0);

  async function handleSearch() {

    setIsFetching(true);
    try {
      const finalUserId = userId || 0;
      const res = await getBlockContentByUserId(finalUserId);

      const formattedRow = Array.isArray(res)
        ? res.map((item, index) => ({
          id: item.blockId,
          sn: index + 1,
          startTime: item.startTime || "-",
          blockContain: item.blockContain || "-",
          updatedDate: item.updatedDate || "-",
          remark: item.remark || "-",
          messageType:
            item.messageType === 1 ? "Transactional" : "Promotional",
        }))
        : [];

      setRows(formattedRow);
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  }

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
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllUsersDetails();
  }, [user.role]);

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, width: 70 },
    {
      field: "updatedDate",
      headerName: "Updated Date",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "blockContain",
      headerName: "Block Contain",
      flex: 1,
      minWidth: 200,
    },
    // { field: "startTime", headerName: "Start Time", flex: 1, minWidth: 200 },
    { field: "remark", headerName: "Remark", flex: 1, minWidth: 200 },
    {
      field: "messageType",
      headerName: "Message Type",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
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

  function handleDelete(row) {
    if (!row?.id) return toast.error("Something went wrong");
    setDeleteData({
      isOpen: true,
      blockSrNo: row.id,
    });
  }

  async function handleBlockNumberDelete() {
    setIsFetching(true);
    try {
      const res = await deleteBlockContent(deleteData?.blockSrNo);

      if (!res?.status) {
        return toast.error("Something went wrong");
      }
      toast.success("Block number deleted successfully");
      setDeleteData({
        isOpen: false,
        blockSrNo: "",
      });
      handleSearch();
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsFetching(false);
    }
  }

  async function handleAddBlockContent() {
    try {
      const payload = {
        userSrno: addData?.userSrNo,
        content: addData?.content,
        smsType: addData?.smsType,
        openRout: 0,
        applyToAllUser: addData?.type == "all" ? 1 : 0,
        // ...addData,
      };
      const res = await addBlockContent(payload)

      if (!res?.status) {
        return toast.error(res?.msg || res?.error || "Something went wrong.")
      }
      toast.success(res?.msg)
      setAddDataDialog(false);
      setAddData({
        userSrNo: -1,
        type: "all",
      });
    } catch (e) {
      toast.error("Something went wrong.")
    }
  }
  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {/* <h1 className="text-2xl font-medium text-gray-800 ">
                    Manage Block Number
                </h1> */}
        <div className="flex gap-2 w-full items-end flex-wrap md:flex-nowrap justify-center">
          <div className="flex gap-2 w-full items-end">
            <div className="w-full sm:w-76 px-2">
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
                  }))}
                value={userId}
                onChange={(value) => setUserId(value)}
                placeholder="Select User"
              />
            </div>

            <div className="w-full w-max-content">
              <UniversalButton
                icon={<IoSearch />}
                label={isFetching ? "Searching..." : "Search"}
                disabled={isFetching}
                id="search"
                name="search"
                onClick={handleSearch}
              />
            </div>
          </div>
          <div className="w-max-content flex items-end text-nowrap">
            <UniversalButton
              label="Add Block Content"
              id="addblockcontent"
              name="addblockcontent"
              onClick={() => setAddDataDialog(true)}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        {/* <PaginationTable
                    id="blocknumberlist"
                    name="blocknumberlist"
                    rows={rows}
                    col={columns}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                /> */}
        <DataTable
          id="blocknumberlist"
          name="blocknumberlist"
          rows={rows}
          col={columns}
          getRowHeight={null}
        />
      </div>

      {/* Delete mobile number start */}
      <Dialog
        header="Confirm Delete"
        visible={deleteData.isOpen}
        onHide={() => {
          setDeleteData((prev) => ({
            isOpen: false,
            blockSrNo: ""
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
                      blockSrNo: "",
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
        header="Add Block Content"
        visible={addDataDialog}
        onHide={() => {
          setAddDataDialog(false);
          setAddData({
            userSrNo: -1,
            type: "all",
          });
        }}
        className="lg:w-[40rem] md:w-[30rem] w-[25rem]"
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

          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
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

              <DropdownWithSearch
                id="addSMSType"
                name="addSMSType"
                label="Select SMS Type"
                tooltipContent="Select SMS Type"
                tooltipPlacement="top"
                options={[
                  { label: "Transactional", value: 1 },
                  { label: "Promotional", value: 2 },
                ]}
                value={addData.smsType}
                onChange={(e) =>
                  setAddData((prev) => ({
                    ...prev,
                    smsType: e,
                  }))
                }
                placeholder="Select SMS Type"
              />
            </div>
            <InputField
              id="addContent"
              name="addContent"
              label="Content"
              tooltipContent="Enter Blocked Content"
              value={addData.content}
              placeholder="Enter Blocked Content"
              onChange={(e) =>
                setAddData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
            />

            {/* <div className="flex flex-col items-start">
              <label
                htmlFor="addMessagePayload"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Message Payload
              </label>

              <Switch
                checked={addData?.openRout}
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    openRout: e.target.checked,
                  }));
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
            </div> */}
          </div>
          <div className="flex justify-center items-center">
            <UniversalButton
              id="save"
              name="save"
              // label="Save"
              label={isFetching ? "Saving..." : "Save"}
              disabled={isFetching}
              onClick={handleAddBlockContent}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BlockContent;
