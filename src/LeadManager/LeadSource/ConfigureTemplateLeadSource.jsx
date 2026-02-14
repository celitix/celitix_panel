import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Tab } from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";

// ========================================================ICONS============================================================
import { Mail } from "lucide-react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

// =======================================================API================================================================
import { getUserLeadSourceService } from "@/apis/leadmanager/leadmanager";

// ========================================================COMPONENTS==========================================================
import {
  a11yProps,
  CustomTabPanel,
} from "../../whatsapp/managetemplate/components/CustomTabPanel";
import WhatsappTemplateLeadSource from "./components/WhatsappTemplateLeadSource";
import EmailTemplateLeadSource from "./components/EmailTemplateLeadSource";
import ApiTemplateLeadSource from "./components/ApiTemplateLeadSource";
import SmsTemplateLeadSource from "./components/SmsTemplateLeadSource";
import RcsTemplateLeadSouce from "./components/RcsTemplateLeadSouce";

const ConfigureTemplateLeadSource = () => {
  // const { srNo } = useParams();
  // const { state } = useLocation();

  const location = useLocation();
  const navState = location.state || {};

  console.log("NAV STATE:", navState);

  const [value, setValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [userLeadSourceService, setUserLeadSourceService] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setColumns([]);
    setRows([]);
  };

  const serviceTypeMap = ["whatsapp", "api", "sms", "email", "rcs"];

  const activeServiceType = serviceTypeMap[value];

  // useEffect(() => {
  //     if (!state || !activeServiceType) return;

  //     const fetchUserLeadSourceService = async () => {
  //         try {
  //             const payload = {
  //                 userSrNo: state.userSrno,
  //                 leadSourceSrNo: state.leadSourceSrno,
  //                 type: activeServiceType,
  //                 leadSourceName: state?.leadSourceName
  //             };

  //             console.log("Calling API:", payload);

  //             const res = await getUserLeadSourceService(payload);
  //             setUserLeadSourceService(res.data);
  //         } catch (error) {
  //             console.log("Failed to load data", error);
  //         }
  //     };

  //     fetchUserLeadSourceService();
  // }, [state, activeServiceType]);

  useEffect(() => {
    if (!navState.leadSourceSrno || !activeServiceType) return;
    const fetchUserLeadSourceService = async () => {
      try {
        const payload = {
          userSrNo: navState.userSrno,
          leadSourceSrNo: navState.leadSourceSrno,
          type: activeServiceType,
          leadSourceName: navState.leadSourceName,
        };
        console.log("Calling API:", payload);

        const res = await getUserLeadSourceService(payload);
        setUserLeadSourceService(res);
      } catch (error) {
        console.log("Failed to load data", error);
      }
    };

    fetchUserLeadSourceService();
  }, [navState, activeServiceType]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
      <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-6">
        Configure Template Lead Source
      </h2>

      <div className="flex items-center justify-between mb-6 border-b border-gray-200">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Manage Campaigns Tabs"
          textColor="primary"
          indicatorColor="primary"
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          <Tab
            label={
              <span>
                <WhatsAppIcon size={20} /> Whatsapp
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
              <span>
                <LibraryBooksOutlinedIcon size={20} /> API
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
          <Tab
            label={
              <span>
                <SmsOutlinedIcon size={20} /> SMS
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
          <Tab
            label={
              <span>
                <EmailOutlinedIcon size={20} /> Email
              </span>
            }
            {...a11yProps(3)}
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
              <span>
                <LibraryBooksOutlinedIcon size={20} /> RCS
              </span>
            }
            {...a11yProps(4)}
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
      </div>
      <CustomTabPanel value={value} index={0}>
        <WhatsappTemplateLeadSource
          userSrNo={navState?.userSrno}
          leadSourceSrno={navState?.leadSourceSrno}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ApiTemplateLeadSource
          userSrNo={navState?.userSrno}
          leadSourceSrno={navState?.leadSourceSrno}
          leadSourceName={navState?.leadSourceName}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SmsTemplateLeadSource
          userSrNo={navState?.userSrno}
          leadSourceSrno={navState?.leadSourceSrno}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <EmailTemplateLeadSource
          userSrNo={navState?.userSrno}
          leadSourceSrno={navState?.leadSourceSrno}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <RcsTemplateLeadSouce
          userSrNo={navState?.userSrno}
          leadSourceSrno={navState?.leadSourceSrno}
        />
      </CustomTabPanel>
    </div>
  );
};

export default ConfigureTemplateLeadSource;
