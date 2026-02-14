import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { toast } from "react-hot-toast";

// ICONS
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

// APIS
import {
  instaUserList,
  instaAccountDetails,
  changeInstaAccStatus,
  instaAssignNotAssignUsers,
  getInstaOtherProfile,
} from "@/apis/instagram/instagram.js";

// COMPONENTS
import { DataTable } from "@/components/layout/DataTable";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import InputField from "@/whatsapp/components/InputField";
import CustomTooltip from "@/whatsapp/components/CustomTooltip";

const ManageInstaUsers = () => {
  const [userList, setUserList] = useState([]);
  const [instaAccDetails, setInstaAccDetails] = useState([]);
  const [selectedInstaUser, setSelectedInstaUser] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState(-1);
  const [editStatus, setEditStatus] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [instaUserName, setInstaUsername] = useState("");
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [instaUserId, setInstaUserId] = useState("");
  const [instaUsers, setInstaUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);

  const fetchInstaUserList = async () => {
    try {
      const res = await instaUserList();
      if (res.statusCode === 200) {
        setUserList(res?.data);
        console.log("fetchInstaUserList :", res);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const userCols = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "businessInstaUserId",
      headerName: "Instagram User ID",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const isActive = params.value === "Active";
        const isLoading = editStatus === params.row.instaOffDetailSrNo;
        const label = isActive ? "Deactivating..." : "Activating...";

        return (
          <CustomTooltip arrow title="Click to change status" placement="top">
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
                color: isActive ? "#065F46" : "#991B1B",
                backgroundColor: isActive ? "#D1FAE5" : "#FEE2E2",
                cursor: "pointer",
              }}
              onClick={() =>
                !isLoading && handleChangeInstaAccountStatus(params.row)
              }
            >
              {isLoading ? (
                <>
                  <CachedIcon
                    sx={{
                      fontSize: 16,
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  {label}
                </>
              ) : (
                params.value
              )}
            </span>
          </CustomTooltip>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <div className="flex gap-4">
            <CustomTooltip arrow title="View user details" placement="top">
              <IconButton onClick={() => handleView(params.row)}>
                <VisibilityIcon
                  sx={{
                    color: "gray",
                    fontSize: "1.2rem",
                  }}
                />
              </IconButton>
            </CustomTooltip>
            {/* <CustomTooltip arrow title="Edit user details" placement="top">
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditIcon
                sx={{
                  color: "gray",
                  fontSize: "1.2rem",
                }}
              />
            </IconButton>
            </CustomTooltip> */}
            {/* <CustomTooltip arrow title="Delete User" placement="top">
            <IconButton onClick={() => handleDelete(params.row)}>
              <DeleteIcon
                sx={{
                  color: "gray",
                  fontSize: "1.2rem",
                }}
              />
            </IconButton>
            </CustomTooltip> */}
          </div>
        );
      },
    },
  ];

  const userRows = instaAccDetails?.map((user, index) => ({
    id: user.instaOffDetailSrNo,
    sn: index + 1,
    name: user.name,
    userName: user.userName,
    businessInstaUserId: user.businessInstaUserId,
    userId: user.userId,
    status: user.status === 1 ? "Active" : "Inactive",
    expiryDate: user.expiryDate,
    instaOffDetailSrNo: user.instaOffDetailSrNo,
  }));

  // const fetchInstaOtherProfile = async (row) => {
  //   const payload = {
  //     // instaOffDetailSrno: 1,
  //     // profileScopeId: "",
  //     instaOffDetailSrno: row.instaOffDetailSrNo,
  //     // profileScopeId: row.businessInstaUserId,
  //     profileScopeId: "4362892653931637",
  //     fields: [
  //       "name",
  //       "username",
  //       "profile_pic",
  //       "follower_count",
  //       "is_user_follow_business",
  //       "is_business_follow_user",
  //     ],
  //   };
  //   try {
  //     const res = await getInstaOtherProfile(payload);
  //     console.log("fetchInstaOtherProfile:", res);
  //     if (res.statusCode === 200) {
  //       setUserList(res.data);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchInstaOtherProfile()
  // }, [])

  const handleView = async (row) => {
    try {
      const payload = {
        instaOffDetailSrno: row.instaOffDetailSrNo,
        profileScopeId: "4362892653931637",
        fields: [
          "name",
          "username",
          "profile_pic",
          "follower_count",
          "is_user_follow_business",
          "is_business_follow_user",
          // "user_id",
          // "account_type"
          // "profile_picture_url",
          // "follows_count",
          // "media_count",
          // "biography",
          // "website"
        ],
      };

      const res = await getInstaOtherProfile(payload);

      if (res.success) {
        setViewUser(res.data);
        setOpenViewDialog(true);
      } else {
        toast.error("Failed to load Instagram profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch Instagram profile");
    }
  };

  // id,user_id,name,username,account_type,profile_picture_url,followers_count,follows_count,media_count
  // profile_picture_url,biography,followers_count,follows_count,id,media_count,name,username,website

  const fetchInstaAccountDetails = async () => {
    setIsFetching(true);
    const data = {
      businessInstaUserId: selectedInstaUser,
      status: selectedStatus,
      userName: instaUserName,
    };

    try {
      const res = await instaAccountDetails(data);
      console.log("fetchInstaAccountDetails :", res);
      if (res.statusCode === 200) {
        setInstaAccDetails(res.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChangeInstaAccountStatus = async (row) => {
    setEditStatus(row.instaOffDetailSrNo);

    const data = {
      status: row.status === "Active" ? 0 : 1,
      businessInstaUserId: row.businessInstaUserId,
      instaOffDetailSrNo: row.instaOffDetailSrNo,
    };

    try {
      const res = await changeInstaAccStatus(data);

      if (res?.statusCode === 200) {
        await fetchInstaAccountDetails();
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setEditStatus(null);
    }
  };

  const handleChangeStatus = async () => {
    const srno = 1;
    try {
      const res = await instaAssignNotAssignUsers(srno);
    } catch (error) {
      console.log("error", error);
    }
  };

  // const handleView = (row) => {
  //   setOpenViewDialog(true);
  //   console.log("Views :", row)
  //   fetchInstaOtherProfile(row)
  // };

  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleDelete = (row) => {
    console.log("Delete", row);
  };

  const handleChangeInstaStatus = (row) => {
    console.log("Change Status", row);
    handleChangeInstaAccountStatus(row);
  };

  useEffect(() => {
    fetchInstaUserList();
    handleChangeStatus();
  }, []);

  //   useEffect(() => {
  //     if (selectedInstaUser || selectedStatus !== -1) {
  //       fetchInstaAccountDetails();
  //     }
  //   }, [selectedInstaUser, selectedStatus]);

  const options = [
    { label: "All", value: "all" },
    ...userList.map((acc) => ({
      label: acc.userName,
      value: acc.businessInstaUserId,
    })),
  ];

  const statusOptions = [
    { label: "All", value: -1 },
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="my-4 text-2xl font-semibold">Manage Insta Users</h2>
      </div>
      <div className="flex flex-wrap gap-2 items-end pb-3 w-full">
        <div className="md:w-60 w-full">
          <DropdownWithSearch
            label="Select Instagram User"
            placeholder="Select Instagram User"
            value={selectedInstaUser}
            onChange={(value) => setSelectedInstaUser(value)}
            options={options}
          />
        </div>
        <div className="md:w-60 w-full">
          <DropdownWithSearch
            label="Select Status"
            placeholder="Select Status"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            options={statusOptions}
          />
        </div>
        <div className="w-full md:w-56">
          <InputField
            label="Instagram Username"
            placeholder="Enter insta username"
            value={instaUserName}
            onChange={(e) => setInstaUsername(e.target.value)}
          />
        </div>
        <div className="w-max-content">
          <UniversalButton
            label={isFetching ? "Searching" : "Search"}
            disabled={isFetching}
            onClick={fetchInstaAccountDetails}
          />
        </div>
      </div>

      <div>
        {isFetching ? (
          <UniversalSkeleton height="35rem" width="100%" />
        ) : (
          <DataTable
            id="userListTable"
            name="userListTable"
            col={userCols}
            rows={userRows}
            className="w-full"
            getRowHeight={null}
          />
        )}
      </div>

      {/* ======================================================VIEW USER DETAIL DIALOG=========================================================================== */}
      <Dialog
        header="View User Details"
        visible={openViewDialog}
        onHide={() => setOpenViewDialog(false)}
        style={{ width: "520px" }}
        modal
        draggable={false}
        resizable={false}
      >
        {viewUser ? (
          <div className="space-y-4">
            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b pb-3">
              <img
                src={viewUser.profile_pic}
                alt={viewUser.username}
                className="w-16 h-16 rounded-full border"
              />

              <div>
                <div className="font-semibold text-lg">{viewUser.name}</div>
                <div className="text-gray-500">@{viewUser.username}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="text-gray-500">Followers</div>
                <div className="font-semibold text-lg">
                  {viewUser.follower_count}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="text-gray-500">User Follows Business</div>
                <div className="font-semibold">
                  {viewUser.is_user_follow_business ? "Yes" : "No"}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-blue-200 col-span-2">
                <div className="text-gray-500">Business Follows User</div>
                <div className="font-semibold">
                  {viewUser.is_business_follow_user ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            Loading Instagram profile...
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ManageInstaUsers;
