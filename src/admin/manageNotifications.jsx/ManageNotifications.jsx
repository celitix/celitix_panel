import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// MUI MATERIAL
import { Box, IconButton, Switch } from "@mui/material";

// ICONS
import { ImInfo } from "react-icons/im";
import EditNoteIcon from "@mui/icons-material/EditNote";

// COMPONENTS
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import InfoPopover from "@/components/common/InfoPopover";
import CustomTooltip from "../components/CustomTooltip";
import UniversalSkeleton from "@/components/common/UniversalSkeleton";

// API
import { deleteNotification, getNotificationList } from "@/apis/admin/admin";


const ManageNotifications = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const dropdownButtonRefs = useRef({});
  const [clicked, setClicked] = useState([]);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const additionalInfoLabels = {
    remarks: "remarks",
  };

  async function fetchNotifications() {
    setIsLoading(true)
    try {
      const response = await getNotificationList();
      if (!response?.success) {
        return toast.error("Error fetching notifications.");
      }
      const formattedData = Array.isArray(response?.data)
        ? response?.data.map((item, index) => ({
          ...item,
          sn: index + 1,
          id: item.sr_no,
        }))
        : []; fetchNotifications
      setList(formattedData);
    } catch (error) {
      toast.error("Error fetching notifications.");
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchNotifications();
  }, []);

  const cols = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "emailfor",
      headerName: "Type",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "whatsapp_notification",
      headerName: "Whatsapp Notification",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.whatsapp_notification === "on" ? true : false}
            onChange={() => {
              handleDelete(params.row, "whatsapp");
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
      field: "rcs_notification",
      headerName: "RCS Notification",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.rcs_notification === "on" ? true : false}
            onChange={() => {
              handleDelete(params.row, "rcs");
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
      field: "sms_notification",
      headerName: "SMS Notification",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.sms_notification === "on" ? true : false}
            onChange={() => {
              handleDelete(params.row, "sms");
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
      field: "email_notification",
      headerName: "Email Notification",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <CustomTooltip arrow placement="top" title="On/Off">
          <Switch
            checked={params.row.email_notification === "on" ? true : false}
            onChange={() => {
              handleDelete(params.row, "email");
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
    // in EYE button (Action field)
    // {
    //   field: "remarks",
    //   headerName: "Remarks",
    //   flex: 1,
    //   minWidth: 120,
    // },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Info" placement="top" arrow>
            <span>
              <IconButton
                type="button"
                ref={(el) => {
                  if (el) dropdownButtonRefs.current[params.row.id] = el;
                }}
                onClick={() => handleInfo(params.row)}
                className="no-xs relative"
              >
                <ImInfo size={18} className="text-green-500 " />
              </IconButton>
              <InfoPopover
                anchorEl={dropdownButtonRefs.current[params.row.id]}
                open={dropdownOpenId === params.row.id}
                onClose={() => { }}
              >
                <table className="w-80 text-sm text-left border border-gray-200 rounded-md overflow-hidden">
                  <tbody>
                    <tr className="hover:bg-gray-50 transition-colors border-b last:border-none">
                      <td className="px-2 py-2 font-medium text-gray-600 capitalize w-1/3 text-nowrap">
                        Remarks: {clicked}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </InfoPopover>
            </span>
          </CustomTooltip>
          <CustomTooltip title="Edit Notification" placement="top" arrow>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          {/* <CustomTooltip title="Delete Notification" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => handleDelete(params.row)}
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip> */}
        </>
      ),
    },
  ];

  function handleInfo(row) {
    const id = row.id;
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
    setClicked(row.remarks);
  }

  function handleEdit(row) {
    if (!row.sr_no) return;
    navigate("/manage-notification", { state: row.sr_no });
  }

  async function handleDelete(row, type) {

    if (!row?.sr_no) return;

    const notificationType = `${type}_notification`;
    if (row[notificationType] === "off") return

    const payload = {
      reminderSrno: row?.sr_no,
      status: "off",
      type,
    };

    try {
      const res = await deleteNotification(payload);

      if (!res?.success) {
        return toast.error(res?.message);
      }
      toast.success(res?.message);
      fetchNotifications();
    } catch (e) {
      console.log(e);
      toast.error("Error deleting notification.");
    }
  }
  return (
    <Box
      sx={{
        width: "100%",
        // maxHeight: "91vh",
        overflow: "hidden",
      }}
    >
      <div className="flex items-center md:justify-between justify-between px-3 mb-2 flex-wrap">
        <div className="flex justify-between text-xl font-medium text-gray-700">Manage Notification
        </div>
        <div className="flex gap-2 justify-center items-end">
          <UniversalButton
            id="addNotification"
            name="addNotification"
            label={isLoading ? "Refreshing..." : "Refresh"}
            disabled={isLoading}
            onClick={fetchNotifications}
          />
          {/* <UniversalButton
            id="addNotification"
            name="addNotification"
            label={"Add Notification"}
            onClick={() => {
              navigate("/manage-notification");
            }}
          /> */}
        </div>
      </div>

      {isLoading ? (
        <div >
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) :
        <>
          <DataTable
            id="notificationList"
            name="notificationList"
            col={cols}
            rows={list}
            className="w-full"
            getRowHeight={null}
          />
        </>
      }
    </Box>
  );
};

export default ManageNotifications;
