import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// MUI MATERIAL
import IconButton from "@mui/material/IconButton";
import { select } from "@material-tailwind/react";

// ICONS
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IoSearch } from "react-icons/io5";

// COMPONENTS
import CustomTooltip from "../../../whatsapp/components/CustomTooltip";
import InputField from "../../../whatsapp/components/InputField";
import UniversalButton from "../../../whatsapp/components/UniversalButton";
import { DataTable } from "../../../components/layout/DataTable";
import UniversalSkeleton from "../../../whatsapp/components/UniversalSkeleton";
import SmsCampaignDetailedLogsTable from "../components/SmsCampaignDetailedLogsTable";

// API
import { getCampaignDetails } from "../../../apis/sms/sms";



const Smscampaigndetaillogs = () => {
  const navigate = useNavigate();
  let { state } = useLocation();

  const [mobileNo, setMobileNo] = useState("");
  const [smsDetailedData, setSmsDetailedData] = useState([])
  // console.log("smsDetailedData", smsDetailedData)

  if (!state.id) {
    navigate("/smsreports");
  }
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchCampaignDetailsReport = async () => {
    try {
      setIsFetching(true);
      const data = {
        receiptNo: state.id,
        mobileNo,
        selectedUserId: state.userId,
      };
      const res = await getCampaignDetails(data);

      setSmsDetailedData(res.data)
    } catch (e) {
      console.log(e);
      toast.error("Error fetching campaign details report");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCampaignDetailsReport();
  }, []);

  return (
    <>
      <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
        <div className="w-full sm:w-56">
          <InputField
            label="Mobile Number"
            id="detailslogmobile"
            name="detailslogmobile"
            type="number"
            placeholder="Enter Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-56">
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="detailslogsearch"
              name="detailslogsearch"
              variant="primary"
              icon={<IoSearch />}
              onClick={fetchCampaignDetailsReport}
            />
          </div>
        </div>
      </div>
      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : (
         <SmsCampaignDetailedLogsTable
          id={"SmsCampaignDetailLogs"}
          name={"SmsCampaignDetailLogs"}
          data={smsDetailedData}
        />
      )}
    </>
  );
};

export default Smscampaigndetaillogs;
