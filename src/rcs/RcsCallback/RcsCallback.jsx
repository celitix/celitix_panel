import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// COMPONENTS
import DropdownWithSearch from "../../whatsapp/components/DropdownWithSearch";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import { showInfoToast } from "@/components/GlobalToaster";

// API
import { fetchAllAgents } from "../../apis/rcs/rcs.js";
import { insertRcsCallback, getRcsCallback } from "../../apis/rcs/rcs";
import { getWabaList } from "@/apis/whatsapp/whatsapp";

const RcsCallback = () => {
  const [wabaList, setWabaList] = useState([]);
  const [selectedWaba, setSelectedWaba] = useState(null);
  const [selectedWabaSno, setSelectedWabaSno] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allAgents, setAllAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectUrl, setSelectUrl] = useState(null);

  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();

        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA details");
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  useEffect(() => {
    async function fetchAllBotsData() {
      try {
        setIsFetching(true);
        const res = await fetchAllAgents();
        setAllAgents(res);
      } catch (e) {
        toast.error("Something went wrong.");
      } finally {
        setIsFetching(false);
      }
    }

    fetchAllBotsData();
  }, []);

  useEffect(() => {
    const fetchRcsCallbackData = async () => {
      try {
        const data = {
          wabaNumber: "",
          agentId: selectedAgent,
          wabaSrno: "",
        };
        const response = await getRcsCallback(data);
        // setSelectUrl(response.url || "");
        const resData = response?.data ?? response;

        if (!resData || Object.keys(resData).length === 0 || !resData.url) {
          setSelectUrl("");
          showInfoToast("No callback URL found for this agent.");
          console.warn("Empty RCS callback response:", resData);
          return;
        }

        setSelectUrl(resData.url);
      } catch (error) {
        console.error("Error fetching RCS callback data:", error);
      }
    };
    if (selectedAgent) {
      fetchRcsCallbackData();
    }
  }, [selectedAgent]);

  const handleInsertCallback = async () => {
    if (!selectedAgent) {
      toast.error("Please select an Agent.");
      return;
    }
    if (!selectUrl) {
      toast.error("Please enter a URL.");
      return;
    }
    try {
      const payload = {
        wabaNumber: selectedWaba,
        url: selectUrl,
        agentId: selectedAgent,
        wabaSrno: selectedWabaSno,
      };

      const response = await insertRcsCallback(payload);

      if (response.status === true) {
        toast.success(response?.msg || "RCS callback inserted successfully.");
      } else {
        toast.error("Failed to insert RCS callback.");
      }
    } catch (error) {
      toast.error("Error inserting RCS callback.");
      console.error("Error inserting RCS callback:", error);
    } finally {
      setSelectedWaba(null);
      setSelectedWabaSno(null);
      setSelectedAgent(null);
      setSelectUrl("");
    }
  };

  return (
    <>
      <div className="w-full bg-white p-6 rounded-md shadow-md">
        <div className="flex md:flex-nowrap flex-wrap items-end gap-4 w-full mb-4">
          {/* WABA Dropdown */}
          {/* <div className="w-full sm:w-56 flex-shrink-0">
            <DropdownWithSearch
              id="manageTemplateWaba"
              name="manageTemplateWaba"
              label="Select WABA"
              tooltipContent="Select your WhatsApp Business Account"
              tooltipPlacement="right"
              options={wabaList.map((waba) => ({
                value: JSON.stringify({
                  mbno: waba.mobileNo,
                  sno: waba.wabaSrno,
                }),
                label: waba.name,
              }))}
              value={
                selectedWaba
                  ? JSON.stringify({
                    mbno: selectedWaba,
                    sno: selectedWabaSno,
                  })
                  : ""
              }
              onChange={(e) => {
                const selected =
                  typeof e === "string" ? JSON.parse(e) : JSON.parse(e.value);
                setSelectedWaba(selected.mbno);
                setSelectedWabaSno(selected.sno);
              }}
              placeholder="Select WABA"
            />
          </div> */}

          {/* Agent Dropdown */}

          <div className="w-full">
            <DropdownWithSearch
              id="selectAgent"
              name="selectAgent"
              label="Select Agent"
              tooltipContent="Select your Agent to add or view callback"
              tooltipPlacement="right"
              options={allAgents?.map((agent) => ({
                value: agent.agent_name,
                label: agent.agent_name,
              }))}
              value={selectedAgent}
              onChange={setSelectedAgent}
              placeholder="Select Agent"
            />
          </div>

          {/* URL Input */}
          <div className="w-full">
            <InputField
              label="Callback URL"
              id="url"
              name="url"
              placeholder="Enter URL"
              value={selectUrl}
              onChange={(e) => setSelectUrl(e.target.value)}
            />
          </div>

        </div>
        {/* Search Button */}
        <div className="flex items-center justify-start sm:justify-center w-full sm:w-auto mt-2 sm:mt-0">
          <UniversalButton
            label="Add Callback"
            // disabled={isFetching}
            onClick={handleInsertCallback}
          />
        </div>
      </div>
    </>
  );
};

export default RcsCallback;
