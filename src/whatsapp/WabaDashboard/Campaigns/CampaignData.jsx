import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

// ICONS 
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

// APIS 
import {
  getWabaList,
  getWabaTemplateDetails,
  getAllCampaignWhatsapp,
  campaignSummaryInfo,
  getWhatsappCampaignReport,
  getSummaryReport,
} from "@/apis/whatsapp/whatsapp";
import { getWhatsappCampaignScheduledReport } from "@/apis/whatsapp/whatsapp.js";

// COMPONENTS 
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import ScheduleCard from "./components/Schedule";

const CampaignData = ({
  selectedWaba,
  wabaList,
  selectedMonth,
  selectedYear,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [combineLoader, setCombineLoader] = useState(false);
  // const [wabaList, setWabaList] = useState(null);
  const [wabaAccountId, setWabaAccountId] = useState("");
  // const [selectedWaba, setSelectedWaba] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedCampaignName, setSelectedCampaignName] = useState("");
  const [templateOptions, setTemplateOptions] = useState([]);
  const [selectedWabaMobileNo, setSelectedWabaMobileNo] = useState([]);
  const [selectedWabaSrno, setSelectedWabaSrno] = useState("");
  const [summaryReportData, setSummayReportData] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [campaignSummaryInfoData, setCampaignSummaryInfoData] = useState([]);
  const [campaignReportData, setCampaignReportData] = useState([]);
  const [campaignListData, setCampaignListData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const [queDate, setQueDate] = useState("");

  useEffect(() => {
    if (!selectedWaba) return;

    const matchedWaba = wabaList.find(
      (waba) => waba.mobileNo === selectedWaba?.mobileNo
    );

    if (matchedWaba) {
      setSelectedWabaSrno(matchedWaba.wabaSrno);
    }
  }, [selectedWaba, wabaList]);

  // WABA LIST
  // useEffect(() => {
  //   const fetchWabaList = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await getWabaList();
  //       if (response) {
  //         setWabaList(response);
  //       } else {
  //         console.error("Failed to fetch WABA details");
  //         toast.error("Failed to load WABA details!");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching WABA list:", error);
  //       toast.error("Error fetching WABA list.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchWabaList();
  // }, []);

  useEffect(() => {
    const fetchCampaignListAll = async () => {
      // if (!selectedWaba?.mobileNo) return;
      setIsLoading(true);
      try {
        const response = await getAllCampaignWhatsapp();
        setCampaignList(response);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching Campaign List:", error);
      }
      setIsLoading(false);
    };
    fetchCampaignListAll();
  }, []);

  useEffect(() => {
    const fetchCampaignReports = async (withCampaign = false) => {
      try {
        if (!selectedYear || !selectedMonth) return;

        // Convert month name (e.g. "October") to month index (0-based)
        const monthIndex = new Date(
          `${selectedMonth} 1, ${selectedYear}`
        ).getMonth();

        // First day of the selected month
        const fromDate = `${selectedYear}-${String(monthIndex + 1).padStart(
          2,
          "0"
        )}-01`;

        // Last day of the selected month
        const now = new Date();
        let toDate;

        // If the selected month & year are the current ones → use today's date
        if (
          selectedYear === now.getFullYear() &&
          monthIndex === now.getMonth()
        ) {
          toDate = now.toISOString().split("T")[0];
        } else {
          // Otherwise, use the last date of that selected month
          const lastDay = new Date(selectedYear, monthIndex + 1, 0).getDate();
          toDate = `${selectedYear}-${String(monthIndex + 1).padStart(
            2,
            "0"
          )}-${String(lastDay).padStart(2, "0")}`;
        }

        const filters = {
          fromQueDateTime: fromDate,
          toQueDateTime: toDate,
          campaignName: withCampaign ? selectedCampaignName.trim() : "",
          template_category: "all",
        };

        setCombineLoader(true);
        const data = await getWhatsappCampaignReport(filters);
        setCampaignReportData(data);
        if (data && data.length > 0) {
          setQueDate(data[0]?.queTime.split(" ")[0]);
        }
      } catch (e) {
        console.log("Error fetching campaign reports:", e);
      } finally {
        setCombineLoader(false);
      }
    };

    // if (selectedCampaignName && selectedMonth && selectedYear) {
    //   fetchCampaignReports();
    // }

    if (!selectedCampaignName) {
      fetchCampaignReports(false);
    } else {
      fetchCampaignReports(true);
    }
  }, [selectedCampaignName, selectedMonth, selectedYear]);

  useEffect(() => {
    const getSummaryReportWaba = async () => {
      if (!selectedWaba?.mobileNo || !selectedWabaSrno) return;

      // Convert month name (e.g. "October") to month index (0-based)
      const monthIndex = new Date(
        `${selectedMonth} 1, ${selectedYear}`
      ).getMonth();

      // First day of the selected month
      const fromDate = `${selectedYear}-${String(monthIndex + 1).padStart(
        2,
        "0"
      )}-01`;

      // Last day of the selected month
      const now = new Date();
      let toDate;

      // If the selected month & year are the current ones → use today's date
      if (selectedYear === now.getFullYear() && monthIndex === now.getMonth()) {
        toDate = now.toISOString().split("T")[0];
      } else {
        // Otherwise, use the last date of that selected month
        const lastDay = new Date(selectedYear, monthIndex + 1, 0).getDate();
        toDate = `${selectedYear}-${String(monthIndex + 1).padStart(
          2,
          "0"
        )}-${String(lastDay).padStart(2, "0")}`;
      }

      const data = {
        fromDate: fromDate,
        toDate: toDate,
        summaryType: "date,user",
        campaignType: "",
        wabaNumber: selectedWabaSrno,
      };
      try {
        const res = await getSummaryReport(data);
        setSummayReportData(res);
      } catch (e) {
        toast.error("Something went wrong.", e);
      }
    };
    getSummaryReportWaba();
  }, [selectedMonth, selectedYear, selectedWaba, selectedWabaSrno]);

  //  Fetch campaign summary when queDate changes
  useEffect(() => {
    const fetchCampaignSummaryInfo = async () => {
      if (!queDate || !selectedCampaign) return;
      try {
        setCombineLoader(true);
        const res = await campaignSummaryInfo({
          campSrno: selectedCampaign,
          fromDate: queDate,
        });

        setCampaignSummaryInfoData(res);
      } catch (e) {
        console.error("Error fetching campaign summary:", e);
      } finally {
        setCombineLoader(false);
      }
    };

    fetchCampaignSummaryInfo();
  }, [queDate, selectedCampaign]);

  useEffect(() => {
    if (selectedCampaign) {
      const matchedCampaign = campaignList.find(
        (campaign) => campaign.srno === selectedCampaign
      );

      if (matchedCampaign) {
        setSelectedCampaignName(matchedCampaign.campaignName);
      } else {
        setSelectedCampaignName("");
      }
    } else {
      setSelectedCampaignName("");
    }
  }, [selectedCampaign]);

  useEffect(() => {
    const fetchCampaignSummaryInfo = async () => {
      const data = {
        campSrno: selectedCampaign,
        fromDate: queDate,
      };

      try {
        setCombineLoader(true);
        const res = await campaignSummaryInfo(data);
        setCampaignSummaryInfoData(res);
      } catch (e) {
        console.error("Error fetching campaign summary:", e);
      } finally {
        setCombineLoader(false);
      }
    };

    if (queDate) {
      fetchCampaignSummaryInfo();
    }
  }, [queDate]);

  const fetchTemplateDetails = async (wabaNumber) => {
    try {
      const response = await getWabaTemplateDetails(wabaNumber, 0);
      if (response) {
        setTemplateList(response);

        const approvedTemplateList = response.filter(
          (template) => template.status === "APPROVED"
        );
        setTemplateOptions(approvedTemplateList);
      } else {
        toast.error("Failed to load templates!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error fetching template details.");
    }
  };

  const handleWabaSelect = async (value) => {
    setSelectedWaba(value);
    const selectedWabaDetails = wabaList.find(
      (waba) => waba.mobileNo === value
    );
    setSelectedWabaMobileNo(
      selectedWabaDetails ? [selectedWabaDetails.mobileNo] : []
    );
    setWabaAccountId(selectedWabaDetails?.wabaAccountId || "");
    if (selectedWabaDetails) {
      await fetchTemplateDetails(selectedWabaDetails.mobileNo);
    }
  };

  const [scheduleData, setScheduleData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchScheduleData = async () => {
    if (!selectedWaba) return;

    setIsFetching(true);
    try {
      const res = await getWhatsappCampaignScheduledReport();
      if (Array.isArray(res)) {
        const sorted = res.sort(
          (a, b) => new Date(b.sentTime) - new Date(a.sentTime)
        );
        setScheduleData(sorted);
      } else {
        setScheduleData([]);
      }
    } catch (error) {
      console.error("Error fetching schedule data:", error);
      setScheduleData([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, [selectedWaba]);

  const campaign = scheduleData.length > 0 ? scheduleData[0] : null;

  const handleRemoveCampaign = (campaignSrno) => {
    setScheduleData((prev) => prev.filter((c) => c.srno !== campaignSrno));

    if (campaignSrno === selectedCampaign) {
      setSelectedCampaign("");
      setSelectedCampaignName("");
    }

    toast.success("Campaign removed successfully.");
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex-col gap-10 w-full">
        <div className="w-full">
          {/* <AnimatedDropdown
            id="launchSelectWABA"
            name="launchSelectWABA"
            label="Select WABA"
            tooltipContent="Select your whatsapp business account "
            tooltipPlacement="right"
            options={wabaList?.map((waba) => ({
              value: waba.mobileNo,
              label: waba.name,
            }))}
            value={selectedWaba}
            onChange={handleWabaSelect}
            placeholder="Select WABA"
          /> */}

          {selectedWaba && (
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {/* Marketing Rate */}
              <div
                className="px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-100 text-rose-800
      rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                Marketing Rate: {summaryReportData?.[0]?.marketing}
              </div>

              {/* Utility Rate */}
              <div
                className="px-4 py-2 bg-gradient-to-r from-sky-50 to-blue-100 text-blue-800
      rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                Utility Rate: {summaryReportData?.[0]?.utility}
              </div>

              {/* Marketing Count */}
              <div
                className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-100 text-green-800
      rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                Marketing Count:{" "}
                {summaryReportData &&
                  summaryReportData
                    .filter((item) => item.whatsappType === "MARKETING")
                    .reduce(
                      (sum, item) => sum + (parseFloat(item.count) || 0),
                      0
                    )}
              </div>

              {/* Utility Count */}
              <div
                className="px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-100 text-yellow-800
      rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                Utility Count:{" "}
                {summaryReportData &&
                  summaryReportData
                    .filter((item) => item.whatsappType === "UTILITY")
                    .reduce(
                      (sum, item) => sum + (parseFloat(item.count) || 0),
                      0
                    )}
              </div>

              {/* Marketing Total User Charge */}
              <div
                className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800
      rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                Marketing Total User Charge: ₹
                {summaryReportData &&
                  summaryReportData
                    .filter((item) => item.whatsappType === "MARKETING")
                    ?.reduce(
                      (sum, item) => sum + (parseFloat(item.userCharge) || 0),
                      0
                    )
                    .toFixed(2)}
              </div>

              {/* Utility Total User Charge */}
              <div
                className="px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800
      rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                Utility Total User Charge: ₹
                {summaryReportData &&
                  summaryReportData
                    .filter((item) => item.whatsappType === "UTILITY")
                    ?.reduce(
                      (sum, item) => sum + (parseFloat(item.userCharge) || 0),
                      0
                    )
                    .toFixed(2)}
              </div>
            </div>
          )}

          {/* {openCampaignList && ( */}
          <div className="flex-col gap-6 w-full mt-6 mb-6">
            <AnimatedDropdown
              id="selectCampaign"
              name="selectCampaign"
              label="Select Campaign"
              tooltipContent="Select Campaign"
              tooltipPlacement="right"
              options={campaignList?.map((campaign) => ({
                value: campaign.srno,
                label: campaign.campaignName,
              }))}
              value={selectedCampaign}
              onChange={(value) => setSelectedCampaign(value)}
              placeholder="Select Campaign"
            />

            {combineLoader ? (
              // Loader UI
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-600 text-sm font-medium">
                  Loading campaign report...
                </p>
              </div>
            ) : campaignReportData?.length > 0 ? (
              // <>
              //   <h2 className="mt-8 text-xl font-semibold text-gray-900 flex items-center gap-3">
              //     Campaign Report Data
              //   </h2>

              //   <div className="mt-6 gap-4">
              //     {campaignReportData && (
              //       <div className="flex flex-col gap-4">
              //         <div>
              //           <div className="flex justify-between items-center mb-2">
              //             <h2 className="text-lg font-semibold text-gray-800">
              //               {selectedMonth} {selectedYear}
              //             </h2>
              //           </div>
              //         </div>
              //         <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 w-full">
              //           {/* Header */}
              //           <div className="flex justify-between items-center mb-2">
              //             <div className="flex items-center gap-2">
              //               {/* <span className="text-pink-500 text-lg"></span> */}
              //               <h2 className="font-semibold text-gray-800">
              //                 Marketing
              //               </h2>
              //             </div>
              //             <span className="text-emerald-600 font-bold text-lg">
              //               {campaignReportData?.filter(
              //                 (c) => c.templateCategory === "MARKETING"
              //               ).length || 0}
              //             </span>
              //           </div>
              //           <div className="flex justify-between items-center mb-2">
              //             <div className="flex items-center gap-2">
              //               {/* <span className="text-pink-500 text-lg"></span> */}
              //               <h2 className="font-semibold text-gray-800">
              //                 Utility
              //               </h2>
              //             </div>
              //             <span className="text-emerald-600 font-bold text-lg">
              //               {campaignReportData?.filter(
              //                 (c) => c.templateCategory === "UTILITY"
              //               ).length || 0}
              //             </span>
              //           </div>
              //           <div className="flex justify-between items-center mb-2">
              //             <div className="flex items-center gap-2">
              //               {/* <span className="text-pink-500 text-lg"></span> */}
              //               <h2 className="font-semibold text-gray-800">
              //                 Authentication
              //               </h2>
              //             </div>
              //             <span className="text-emerald-600 font-bold text-lg">
              //               {campaignReportData?.filter(
              //                 (c) => c.templateCategory === "AUTHENTICATION"
              //               ).length || 0}
              //             </span>
              //           </div>
              //         </div>

              //         <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full">
              //           {/* Header */}
              //           <div className="flex items-center justify-between mb-4">
              //             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              //               <span className="text-blue-500">📊</span> Campaign
              //               Status
              //             </h2>
              //             <span className="text-sm text-gray-500">
              //               Total: {campaignReportData?.length || 0}
              //             </span>
              //           </div>

              //           {/* Status Grid */}
              //           <div className="grid grid-cols-3 gap-4">
              //             {/* Completed */}
              //             <div className="flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-xl hover:shadow-md transition">
              //               {/* <div className="w-3 h-3 rounded-full bg-green-500"></div> */}
              //               <div>
              //                 <p className="text-gray-700 font-medium">
              //                   Completed
              //                 </p>
              //                 <p className="text-green-700 font-semibold text-lg">
              //                   {campaignReportData?.filter(
              //                     (campaign) => campaign.status === "completed"
              //                   ).length || 0}
              //                 </p>
              //               </div>
              //             </div>

              //             {/* Rejected */}
              //             <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-3 rounded-xl hover:shadow-md transition">
              //               {/* <div className="w-3 h-3 rounded-full bg-red-500"></div> */}
              //               <div>
              //                 <p className="text-gray-700 font-medium">
              //                   Rejected
              //                 </p>
              //                 <p className="text-red-700 font-semibold text-lg">
              //                   {campaignReportData?.filter(
              //                     (campaign) => campaign.status === "rejected"
              //                   ).length || 0}
              //                 </p>
              //               </div>
              //             </div>

              //             {/* Pending */}
              //             <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 p-3 rounded-xl hover:shadow-md transition">
              //               {/* <div className="w-3 h-3 rounded-full bg-yellow-400"></div> */}
              //               <div>
              //                 <p className="text-gray-700 font-medium">
              //                   Pending
              //                 </p>
              //                 <p className="text-yellow-700 font-semibold text-lg">
              //                   {campaignReportData?.filter(
              //                     (campaign) => campaign.status === "pending"
              //                   ).length || 0}
              //                 </p>
              //               </div>
              //             </div>
              //           </div>
              //         </div>
              //       </div>
              //     )}
              //   </div>
              // </>
              <>
                <section className="mt-10">
                  {/* Header */}
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                    Campaign Report Summary
                  </h2>

                  {campaignReportData && (
                    <div className="flex flex-col gap-6">
                      {/* Selected Month & Year */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-700">
                          {selectedMonth} {selectedYear}
                        </h3>
                        <span className="text-sm text-gray-500">
                          Total Campaigns:{" "}
                          <strong>{campaignReportData?.length || 0}</strong>
                        </span>
                      </div>

                      {/* Campaign Category Summary */}
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-md border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            Template Categories
                          </h3>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <span className="text-gray-800 font-medium">
                              Marketing
                            </span>
                            <span className="text-blue-600 font-bold text-xl">
                              {campaignReportData?.filter(
                                (c) => c.templateCategory === "MARKETING"
                              ).length || 0}
                            </span>
                          </div>

                          <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <span className="text-gray-800 font-medium">
                              Utility
                            </span>
                            <span className="text-green-600 font-bold text-xl">
                              {campaignReportData?.filter(
                                (c) => c.templateCategory === "UTILITY"
                              ).length || 0}
                            </span>
                          </div>

                          <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <span className="text-gray-800 font-medium">
                              Authentication
                            </span>
                            <span className="text-purple-600 font-bold text-xl">
                              {campaignReportData?.filter(
                                (c) => c.templateCategory === "AUTHENTICATION"
                              ).length || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Campaign Status Overview */}
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            Campaign Status
                          </h3>
                          <span className="text-sm text-gray-500">
                            Overall Summary
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-5">
                          {/* Completed */}
                          <div className="flex flex-col items-center bg-green-50 border border-green-200 p-4 rounded-xl hover:shadow-md transition">
                            <span className="text-green-700 font-semibold text-xl">
                              {campaignReportData?.filter(
                                (campaign) => campaign.status === "completed"
                              ).length || 0}
                            </span>
                            <p className="text-gray-700 font-medium mt-1">
                              Completed
                            </p>
                          </div>

                          {/* Rejected */}
                          <div className="flex flex-col items-center bg-red-50 border border-red-200 p-4 rounded-xl hover:shadow-md transition">
                            <span className="text-red-700 font-semibold text-xl">
                              {campaignReportData?.filter(
                                (campaign) => campaign.status === "rejected"
                              ).length || 0}
                            </span>
                            <p className="text-gray-700 font-medium mt-1">
                              Rejected
                            </p>
                          </div>

                          {/* Pending */}
                          <div className="flex flex-col items-center bg-yellow-50 border border-yellow-200 p-4 rounded-xl hover:shadow-md transition">
                            <span className="text-yellow-700 font-semibold text-xl">
                              {campaignReportData?.filter(
                                (campaign) => campaign.status === "pending"
                              ).length || 0}
                            </span>
                            <p className="text-gray-700 font-medium mt-1">
                              Pending
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </>
            ) : (
              // No data fallback
              <div className="text-center text-gray-500 py-10">
                No campaign report data available.
              </div>
            )}

            {/* {campaignSummaryInfoData?.length > 0 && (
                <>
                  <h2 className="font-semibold mt-6 underline">
                    Campaign SummaryInfo Data
                  </h2>
                  <div className="mt-6 p-8 bg-white rounded-xl shadow-sm border grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(campaignSummaryInfoData[0]).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between border-b pb-1"
                        >
                          <span className="text-gray-500 capitalize">
                            {key}
                          </span>
                          <span className="font-medium text-gray-800">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </>
              )} */}

            {campaignSummaryInfoData?.length > 0 && (
              <div
                // className="mt-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-gray-200 rounded-2xl shadow-sm px-5 py-4 text-[13px] text-gray-700"
                className="mt-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-gray-200 rounded-2xl shadow-sm px-5 py-4 text-[12px] text-gray-700"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2 tracking-wide">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.6}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      />
                    </svg>
                    Campaign Summary Info
                  </h2>
                </div>

                {/* Chips / Inline Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Object.entries(campaignSummaryInfoData[0]).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        // className="flex items-center gap-2 bg-gray-50  border border-gray-200 rounded-full px-3 py-1.5 shadow-sm hover:shadow transition-all duration-200"
                        className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200"
                      >
                        <span className="text-gray-500 capitalize">{key}:</span>
                        <span className="font-medium text-gray-800 truncate ml-2">
                          {value ?? "—"}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex items-center justify-between w-full mx-auto
            p-5 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200
            rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300
            cursor-pointer mt-10 mb-6"
        >
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
              Campaign List
            </h2>
            <p className="text-sm text-gray-500">View all active campaigns</p>
          </div>

          <div
            className="flex items-center justify-center text-gray-800
              font-semibold text-lg"
          >
            {campaignList.length}
          </div>
        </div>

        <div className="w-full bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-cyan-400 px-6 py-4 rounded-t-3xl">
            <div>
              <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                <span className="bg-white/20 p-1.5 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"
                    />
                  </svg>
                </span>
                Schedules
              </h2>
              <p className="text-indigo-100 text-sm">Upcoming Campaigns</p>
            </div>

            {/* <div className="bg-white/20 px-4 py-1.5 rounded-full text-white text-sm font-medium shadow-sm">
              Total: {scheduleData.length}
            </div> */}
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search schedules..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 placeholder-gray-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 9 16.5a7.5 7.5 0 0 0 7.65-7.85z"
                />
              </svg>
            </div>
          </div>

          {/* Schedule List */}
          <div className="px-8 py-6">
            {isFetching ? (
              <p className="text-center text-gray-500">Loading campaigns...</p>
            ) : scheduleData.length > 0 ? (
              <ul className="relative border-l border-gray-200 space-y-6">
                {scheduleData.map((campaign, index) => (
                  <li
                    key={campaign.srno || index}
                    className="relative pl-6 group"
                  >
                    {/* Timeline Dot */}
                    <span className="absolute -left-[6px] top-1.5 w-3 h-3 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full shadow-md"></span>

                    {/* Campaign Details */}
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-[15px] leading-tight">
                          {campaign.campaignName || "Untitled Campaign"}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {campaign.sentTime}
                        </p>
                      </div>

                      <div
                        className={`text-xs font-medium px-3 py-1.5 rounded-full shadow-sm ${
                          campaign.tag === "Marketing"
                            ? "bg-blue-100 text-blue-700"
                            : campaign.tag === "Engagement"
                            ? "bg-indigo-100 text-indigo-700"
                            : campaign.tag === "Notification"
                            ? "bg-yellow-100 text-yellow-700"
                            : campaign.tag === "Automation"
                            ? "bg-green-100 text-green-700"
                            : "bg-gradient-to-r from-indigo-600 to-cyan-400 text-gray-50"
                        }`}
                      >
                        <span className="text-white text-sm font-medium ">
                          {" "}
                          Audience:{" "}
                        </span>{" "}
                        {campaign.count || "General"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"
                  />
                </svg>
                <h2 className="text-base font-semibold">No Schedules Found</h2>
                <p className="text-sm text-gray-400">
                  Add or select a campaign to view upcoming schedules.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignData;
