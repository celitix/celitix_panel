import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import AnimatedDropdown from "@/admin/components/AnimatedDropdown";
import UniversalButton from "@/components/common/UniversalButton";
import { DataTable } from "@/components/layout/DataTable";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// API
import { getDrAnalysisReport, getSMPP } from "@/apis/admin/admin";

const DrAnalysis = () => {
    const [smpp, setSmpp] = useState([]);
    const [serviceId, setServiceId] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState([]);

    async function handleFetchSmppDetails() {
        try {
            const res = await getSMPP();
            setSmpp(res);
        } catch (e) {
            console.log(e);
            toast.error("Error in fetching smpp details");
        }
    }

    async function handleSearch() {
        setIsFetching(true);
        try {
            const serviceIdAll = serviceId || "all"
            const res = await getDrAnalysisReport(serviceIdAll);
            const formattedData = Array.isArray(res?.data)
                ? res?.data?.map((item, index) => ({
                    ...item,
                    id: index + 1,
                    sn: index + 1,
                }))
                : [];
            setData(formattedData);
        } catch (e) {
            console.error(e);
            toast.error("Error in fetching smpp details");
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        handleFetchSmppDetails();
        // handleSearch();
    }, []);

    const col = [
        { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
        {
            field: "serviceName",
            headerName: "Service Name",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "blocked",
            headerName: "Blocked Count",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "notAvailable",
            headerName: "Not Available Count",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "delivered",
            headerName: "Delivered Count",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "notDelivered",
            headerName: "Not Delivered Count",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "total",
            headerName: "Total Count",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "totalUnit",
            headerName: "Total Units",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "rejected",
            headerName: "Rejected Count",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "other",
            headerName: "Other",
            flex: 1,
            minWidth: 130,
        },
    ];
    return (
        <div className="w-full">
            <h1 className="flex justify-center items-center font-semibold text-2xl text-gray-700">DR Analysis</h1>
            <div className="flex gap-2 w-full">
                <div className="w-[350px]">
                    <DropdownWithSearch
                        id="selectService"
                        name="selectService"
                        label="Select Service"
                        tooltipContent="Select your service"
                        tooltipPlacement="right"
                        options={smpp?.map((waba) => ({
                            value: waba.serviceId,
                            label: waba.serviceName,
                        }))}
                        value={serviceId}
                        onChange={(e) => {
                            setServiceId(e);
                        }}
                    //   onSearch={handleSearch}
                    />
                </div>

                <div className="w-max-content flex items-end">
                    <UniversalButton
                        label={isFetching ? "Searching..." : "Search"}
                        disabled={isFetching}
                        id="search"
                        name="search"
                        onClick={handleSearch}
                    />
                </div>
            </div>

            <div className="mt-5">
                <DataTable
                    id="drAnalysisTable"
                    name="drAnalysisTable"
                    col={col}
                    rows={data}
                    getRowHeight={null}
                />
            </div>
        </div>
    );
};

export default DrAnalysis;