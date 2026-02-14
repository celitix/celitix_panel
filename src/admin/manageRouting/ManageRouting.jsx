import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// ICONS
import { IoSearch } from "react-icons/io5";
import RefreshIcon from "@mui/icons-material/Refresh";

// COMPONENTS
import UniversalButton from "@/whatsapp/components/UniversalButton";
import ManageRoutingTable from "./components/ManageRoutingTable";
import UniversalSkeleton from "@/components/common/UniversalSkeleton.jsx";

// API
import { getRoutingPlanList } from "@/apis/admin/admin"

const ManageRouting = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [routingPlanList, setRoutingPlanList] = useState([])

  const navigate = useNavigate();

  const handleAddRouting = () => {
    navigate("/addrouting");
  };
  const handleEditRouting = () => {
    navigate("/editrouting");
  };

  const getManageRoutingData = async () => {
    try {
      setIsFetching(true)
      const res = await getRoutingPlanList();
      if (res.success === true) {
        setIsFetching(false)
      }
      setRoutingPlanList(res?.data)
      // toast.success(res?.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save routing configuration.");
    }
  };

  useEffect(() => {
    getManageRoutingData()
  }, [])

  return (
    <div className="w-full">
      {/* {isLoading ? (
    <>
      <Loader />
    </>
  ) : ( */}
      <div>
        <h1 className="flex justify-center items-center font-semibold text-2xl text-gray-700">Manage Routing</h1>
        <div className="flex flex-wrap gap-2 items-end justify-end pb-3 w-full mt-2">
          <div className="w-max-content">
            <UniversalButton
              label={isFetching ? "Refreshing..." : "Refresh"}
              icon={<RefreshIcon fontSize="small" />}
              disabled={isFetching}
              id="reloadRoutes"
              name="reloadRoutes"
              onClick={getManageRoutingData}
            />
          </div>
          {/* <div className="w-max-content">
            <UniversalButton
              label="Add Routing"
              id="addrouting"
              name="addrouting"
              onClick={handleAddRouting}
            />
          </div> */}
        </div>

        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <ManageRoutingTable
              id="manageRoutingTable"
              name="manageRoutingTable"
              isFetching={isFetching}
              routingPlanList={routingPlanList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRouting;
