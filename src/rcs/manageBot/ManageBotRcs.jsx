import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";

// MUI MATERIAL
import { Box, Tab, Tabs, tabsClasses } from '@mui/material';

// ICONS
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

// COMPONENTS
import ManageBotTableRcs from "./components/ManageBotTableRcs";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import Loader from "@/whatsapp/components/Loader";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/components/layout/InputField";
import { a11yProps, CustomTabPanel } from '@/components/common/CustomTabPanel';
import ChengeLiveStatus from "../ChangeLiveStatus/ChengeLiveStatus";
import RcsCallback from "../RcsCallback/RcsCallback";

// API
import { fetchAllBotsList, fetchAllUsers, saveAgentRcs, getBotDetailsBySrNo, fetchUserSrno } from "@/apis/admin/admin";

// CONTEXT
import { useUserAndAdminContext } from "@/context/UserAndAdminContext";




const ManageBotRcs = () => {
  const [isFetching, setIsFetching] = useState(false);

  //allBotState
  const [allBots, setAllBots] = useState([]);
  const [selectedBotId, setselectedBotId] = useState(null);
  const [displayedBots, setDisplayedBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addBotDialog, setAddBotDialog] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { currentRole } = useUserAndAdminContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [agentName, setAgentName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientKey, setClientKey] = useState("");
  const [editBotDialog, setEditBotDialog] = useState(false);
  const [editBotDetails, setEditBotDetails] = useState(null);

  const handleEdit = async (srno) => {
    // console.log("srno bot", srno);
    try {
      setIsFetching(true);
      const response = await getBotDetailsBySrNo(srno);
      // console.log("Bot Details Response:", response);

      if (Array.isArray(response) && response.length > 0) {
        const botDetails = response[0];

        const mappedResponse = {
          srno: botDetails.srno,
          agentName: botDetails.agent_name,
          agentId: botDetails.agent_id,
          clientId: botDetails.client_id,
          clientKey: botDetails.client_key,
          assignUserSrNo: botDetails.sr_no,
        };

        setEditBotDetails(mappedResponse);
        setEditBotDialog(true);
      } else {
        toast.error("Failed to fetch bot details.");
      }
    } catch (error) {
      console.error("Error fetching bot details:", error.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateBot = async () => {
    setIsFetching(true);
    if (
      !editBotDetails.agentName ||
      !editBotDetails.agentId ||
      !editBotDetails.clientId ||
      !editBotDetails.clientKey ||
      !editBotDetails.assignUserSrNo
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const payload = {
      srno: editBotDetails.srno,
      agentName: editBotDetails.agentName,
      agentId: editBotDetails.agentId,
      clientId: editBotDetails.clientId,
      clientKey: editBotDetails.clientKey,
      assignUserSrNo: editBotDetails.assignUserSrNo,
    };

    try {
      // console.log("Updating bot with payload:", payload);
      const response = await saveAgentRcs(payload);
      // console.log("API Response:", response);

      if (response.status) {
        toast.success(response.msg || "Bot updated successfully!");
        setEditBotDialog(false);
        setEditBotDetails(null);
        await fetchAllBotsData();

      } else {
        toast.error(response.msg || "Failed to update bot.");
      }
    } catch (error) {
      console.error("Error updating bot:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
    finally {
      setIsFetching(false);
    }
  };

  const fetchAllBotsData = async () => {
    try {
      setIsFetching(true);
      setIsLoading(true);
      const res = await fetchAllBotsList();
      setAllBots(res);
      setDisplayedBots(res);
    } catch (e) {
      toast.error("Something went wrong while fetching bots.");
      // console.log(e);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  // const fetchAllUserData = async () => {
  //   try {
  //     setIsFetching(true);
  //     setIsLoading(true);
  //     const res = await fetchAllUsers(data);
  //     setAllUsers(res.userMstPojoList);
  //   } catch (e) {
  //     toast.error("Something went wrong while fetching bots.");
  //     // console.log(e);
  //   } finally {
  //     setIsFetching(false);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchAllBotsData();
  }, []);

  // state


  // const handleBotSearch = async () => {
  //   // bail fast if already fetching
  //   if (isFetching) return;

  //   setIsFetching(true);
  //   const allBots = await fetchAllBotsList();
  //   // let the UI update the button label before heavy work (optional)
  //   setTimeout(() => {
  //     const list = Array.isArray(allBots) ? allBots : [];

  //     // normalize IDs to strings so 123 === "123"
  //     const norm = (v) => (v === undefined || v === null ? "" : String(v).trim());

  //     const agentId = norm(selectedBotId);
  //     const userId = norm(selectedUser);

  //     const filtered = list.filter((bot) => {
  //       const matchAgent = !agentId || norm(bot.agent_id) === agentId;
  //       const matchUser = !userId || norm(bot.user_id) === userId;
  //       return matchAgent && matchUser;
  //     });

  //     setDisplayedBots(filtered);
  //     setIsFetching(false);

  //     // optional: feedback
  //     // if (!filtered.length) toast("No matching bots found");
  //   }, 0);
  // };

  const handleBotSearch = async () => {

    const allBots = await fetchAllBotsList();
    const filterBot = allBots.filter((bot) => {
      const matchAgent = selectedBotId ? bot.agent_id == selectedBotId : true;
      const matchUser = selectedUser ? bot.user_id == selectedUser : true;
      return matchAgent && matchUser;
    });
    setDisplayedBots(filterBot);
  };


  useEffect(() => {
    const fetchAllUsersDetails = async () => {
      // const data = {
      //   userId: "",
      //   mobileNo: "",
      //   companyName: "",
      //   status: "-1",
      // };
      const data = {
        userSrno: "",
        date: "",
      };
      try {
        setIsFetching(true);
        const res = await fetchUserSrno(data);
        setAllUsers(res);
        // console.log("res user list in manage bot", res)
      } catch (e) {
        // console.log(e);
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllUsersDetails();
  }, []);

  const [saveBot, setSaveBot] = useState(false)

  const handleAddBot = async () => {
    // setIsFetching(true);
    if (!selectedUser || !agentName || !agentId || !clientId || !clientKey) {
      toast.error("Please fill all fields.");
      return;
    }
    setSaveBot(true)
    const payload = {
      agentName,
      agentId,
      clientId,
      clientKey,
      assignUserSrNo: selectedUser,
    };
    try {
      // console.log("Saving bot with payload:", payload);
      const response = await saveAgentRcs(payload);
      // console.log("API Response:", response);

      if (response.status) {
        toast.success(response.msg || "Bot added successfully!");
        setAddBotDialog(false);
        setSelectedUser(null);
        setAgentName("");
        setAgentId("");
        setClientId("");
        setClientKey("");

        await fetchAllBotsData();
      } else {
        if (response.msg === "Agent already Exist.") {
          toast.error("Agent already exists. Please use a different Agent ID.");
        } else {
          toast.error(response.msg || "Failed to add bot.");
        }
      }
    } catch (error) {
      console.error("Error saving bot:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
    finally {
      setSaveBot(false)
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }} className="">
        <div className="flex items-end justify-between pr-2">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Block list Tabs"
            textColor="primary"
            indicatorColor="primary"
            scrollButtons="auto"
            allowScrollButtonsMobile
            className="w-full"
            variant="scrollable"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab
              label={
                <span>
                  <GradingOutlinedIcon size={20} /> Manage RCS Bot
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
            {currentRole === "Admin" && (
              <Tab
                label={
                  <span>
                    <LibraryBooksOutlinedIcon size={20} /> Change Live Status
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
            )}
            {/* {currentRole === "Admin" && (

              <Tab
                label={
                  <span>
                    <GradingOutlinedIcon size={20} /> RCS Callback
                  </span>
                }
                {...a11yProps(2)}
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
            )} */}
          </Tabs>
        </div>
        <CustomTabPanel value={value} index={0}>
          <div className="w-full">
            {/* <h1 className="text-2xl text-gray-700 font-medium text-center my-2">Manage RCS Bot</h1> */}
            <div className="flex flex-wrap items-end justify-between w-full gap-2 mb-4">
              <div className="flex items-end flex-wrap gap-3">
                <div className="w-full sm:w-56">
                  <DropdownWithSearch
                    label="Bot Name"
                    id="botName"
                    name="botName"
                    tooltipContent="Select your Bot"
                    options={allBots.map((bot) => ({
                      label: bot.agent_name,
                      value: bot.agent_id,
                    }))}
                    value={selectedBotId}
                    onChange={(e) => {
                      setselectedBotId(e);
                      // handleBotSearch();
                    }}
                    placeholder="select bot "
                    filter
                  />
                </div>

                {currentRole === "Admin" && (
                  <div className="w-full sm:w-56">
                    <DropdownWithSearch
                      label="Assign To"
                      id="assignTo"
                      name="assignTo"
                      tooltipContent="Select user to filter bots"
                      // options={allUsers.map((user) => ({
                      //   label: user.firstName,
                      //   value: user.srno,
                      // }))}
                      options={allUsers
                        .slice()
                        .sort((a, b) => a.userName.localeCompare(b.userName))
                        .map((user) => ({
                          label: user.userName,
                          value: user.userName,
                        }))
                      }
                      value={selectedUser}
                      onChange={(e) => {
                        setSelectedUser(e);
                        // handleBotSearch();
                      }}
                      placeholder="Select User"
                      filter
                    />
                  </div>
                )}

                {/* <DropdownWithSearch
              label="Users"
              id="manageuser"
              name="manageuser"
              tooltipContent="Select user you want to see reports"
              tooltipPlacement="right"
              // options={allUsers.map((user) => ({
              //   label: user.userId,
              //   value: user.srno,
              // }))}
              options={allUsers
                .slice()
                .sort((a, b) => a.userName.localeCompare(b.userName))
                .map((user) => ({
                  label: user.userName,
                  value: user.srNo,
                }))
              }
              value={editBotDetails?.assignUserSrNo || ""}
              onChange={(e) =>
                setEditBotDetails((prev) => ({ ...prev, assignUserSrNo: e }))
              }
            /> */}

                <div className="w-max-content">
                  <UniversalButton
                    label={isFetching ? "Searching..." : "Search"}
                    disabled={isFetching}
                    onClick={handleBotSearch}
                  />
                </div>
              </div>

              <div className="w-max-content">
                <UniversalButton
                  label="Add Bot"
                  disabled={isFetching}
                  onClick={() => setAddBotDialog(true)}
                />
              </div>
            </div>

            <div className="w-full">
              <ManageBotTableRcs
                id="suggestionreport"
                name="suggestionreport"
                data={displayedBots}
                onEdit={handleEdit}
                fetchAllBotsData={fetchAllBotsData}
              />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ChengeLiveStatus />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <RcsCallback />
        </CustomTabPanel>
      </Box>

      {/* Add Bot start */}
      <Dialog
        header="Add Bot"
        visible={addBotDialog}
        onHide={() => setAddBotDialog(false)}
        className="lg:w-[35rem] md:w-[20rem] w-[35rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <DropdownWithSearch
            label="Select User"
            id="manageuser"
            name="manageuser"
            tooltipContent="Select user you want to add bot"
            // options={allUsers?.map((user) => ({
            //   label: user.userId,
            //   value: user.srno,
            // }))}
            options={allUsers
              .slice()
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((user) => ({
                label: user.userName,
                value: user.srNo,
              }))
            }
            value={selectedUser}
            onChange={(e) => setSelectedUser(e)}
          />

          <InputField
            label="Agent Name"
            id="agentName"
            name="agentName"
            placeholder="Enter Agent Name"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />

          <InputField
            label="Agent ID"
            id="agentId"
            name="agentId"
            placeholder="Enter Agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
          />

          <InputField
            label="Client ID"
            id="clientId"
            name="clientId"
            placeholder="Enter Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />

          <InputField
            label="Client Key"
            id="clientKey"
            name="clientKey"
            placeholder="Enter Client Key"
            value={clientKey}
            onChange={(e) => setClientKey(e.target.value)}
          />

          <div className="flex justify-center">
            <UniversalButton
              onClick={handleAddBot}
              label={saveBot ? "Saveing..." : "Save Bot"}
              disabled={saveBot}
            />
          </div>
        </div>
      </Dialog>
      {/* Add Bot end */}

      {/* edit bot start */}
      <Dialog
        header="Edit Bot"
        visible={editBotDialog}
        onHide={() => setEditBotDialog(false)}
        className="lg:w-[35rem] md:w-[20rem] w-[35rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <DropdownWithSearch
            label="Users"
            id="manageuser"
            name="manageuser"
            tooltipContent="Select user you want to see reports"
            tooltipPlacement="right"
            // options={allUsers.map((user) => ({
            //   label: user.userId,
            //   value: user.srno,
            // }))}
            options={allUsers
              .slice()
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((user) => ({
                label: user.userName,
                value: user.srNo,
              }))
            }
            value={editBotDetails?.assignUserSrNo || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({ ...prev, assignUserSrNo: e }))
            }
          />

          <InputField
            label="Agent/Bot Name"
            id="agentName"
            name="agentName"
            placeholder="Enter Agent Name"
            value={editBotDetails?.agentName || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({ ...prev, agentName: e.target.value }))
            }
          />

          <InputField
            label="Agent ID"
            id="agentId"
            name="agentId"
            placeholder="Enter Agent ID"
            value={editBotDetails?.agentId || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({ ...prev, agentId: e.target.value }))
            }
          />

          <InputField
            label="Client ID"
            id="clientId"
            name="clientId"
            placeholder="Enter Client ID"
            value={editBotDetails?.clientId || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({ ...prev, clientId: e.target.value }))
            }
          />

          <InputField
            label="Client Key"
            id="clientKey"
            name="clientKey"
            placeholder="Enter Client Key"
            value={editBotDetails?.clientKey || ""}
            onChange={(e) =>
              setEditBotDetails((prev) => ({ ...prev, clientKey: e.target.value }))
            }
          />

          <div className="flex justify-center">
            <UniversalButton
              label={isFetching ? "Updating..." : "Update Bot"}
              onClick={handleUpdateBot}
              disabled={isFetching}
            />
          </div>
        </div>
      </Dialog>
      {/* edit bot end */}
    </>
  );
};

export default ManageBotRcs;
