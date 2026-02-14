import { useEffect, useRef, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import { Button } from "@mui/material";
import moment from "moment";
import { id } from "date-fns/locale";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

// ICONS
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { ImInfo } from "react-icons/im";

// API
import { getListofSendMsg, downloadCustomWhatsappReport, } from "@/apis/whatsapp/whatsapp";

// COMPONENTS
import CustomNoRowsOverlay from "@/whatsapp/components/CustomNoRowsOverlay";
import UniversalButton from "@/components/common/UniversalButton";
import Loader from "@/whatsapp/components/Loader";
import UniversalSkeleton from "@/components/common/UniversalSkeleton.jsx";
import CustomTooltip from "@/components/common/CustomTooltip";
import InfoPopover from "@/components/common/InfoPopover";

// CONTEXT
import { useDownload } from "@/context/DownloadProvider";

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPaginator = ({ totalPages, paginationModel, setPaginationModel, setCurrentPage }) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page,
    onChange: (_, newPage) => {
      setCurrentPage(newPage);
      setPaginationModel({ ...paginationModel, page: newPage });
    },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 0.5 }}>
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          if (type === "start-ellipsis" || type === "end-ellipsis") return <li key={index}>…</li>;
          return (
            <li key={index}>
              <Button
                variant={selected ? "contained" : "outlined"}
                size="small"
                {...item}
                sx={{ minWidth: "30px" }}
              >
                {type === "page" ? page : type === "previous" ? "Prev" : "Next"}
              </Button>
            </li>
          );
        })}
      </PaginationList>
    </Box>
  );
};

export const ApiCampaignInfo = () => {
  const { state } = useLocation();
  if (!state) {
    return null;
  }

  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { triggerDownloadNotification } = useDownload();
  const dropdownButtonRefs = useRef({});
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [clicked, setClicked] = useState([]);
  const closeDropdown = () => setDropdownOpenId(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const additionalInfoLabels = {
    queTime: "Que Time",
    readTime: "Read Time",
    // sentTime: "Sent Time"
  };

  const handleInfo = (row) => {
    const id = row.id;
    setDropdownOpenId((prevId) => (prevId === id ? null : id));
    setClicked(row.additionalInfo || []);
  };

  const handleFetchDetails = async (page = 1) => {
    setIsLoading(true);
    try {

      // const formattedFromDate = state.selectedDate
      //   ? moment(state.selectedDate).format("YYYY-MM-DD")
      //   : moment().format("YYYY-MM-DD");

      const formattedFromDate = moment(state.selectedDate).format("YYYY-MM-DD");
      let status = "";
      let deliveryStatus = "";
      let selectedUser = state.selectedUser || 0;

      const statusBased = ["failed", "submitted", "block", "busy"];
      const deliveryBased = ["read", "delivered", "undelivered"];

      if (statusBased.includes(state.log)) {
        status = state.log;
      } else if (deliveryBased.includes(state.log)) {
        deliveryStatus = state.log;
      }

      const payload = {
        fromDate: formattedFromDate,
        selectedUserId: selectedUser,
        toDate: formattedFromDate,
        mobile: "",
        page,
        pageSize: paginationModel.pageSize,
        source: "API",
        deliveryStatus,
        status,
      };
      const res = await getListofSendMsg(payload);

      setTotalPage(res?.pages || 1);
      setTotalRecords(res?.total || 0);

      if (res?.data) {
        // const formattedData = res.data.map((item, index) => ({
        //   sn: (page - 1) * paginationModel.pageSize + index + 1,
        //   // id: item.id || `row-${index}`, // Ensure unique IDs for rows
        //   id: `${item.id || 'row'}-${(page - 1) * paginationModel.pageSize + index}`,
        //   wabaNumber: item.wabaNumber || "N/A",
        //   mobileNo: item.mobileNo || "N/A",
        //   source: item.source || "N/A",
        //   status: item.status || "N/A",
        //   deliveryStatus: item.deliveryStatus || "-",
        //   reason: item.reason || "-",
        //   requestJson: item.requestJson || "-",
        //   // readTime: item.readTime || "-",
        //   // queTime: item.queTime || "-",
        //   sentTime: item.sentTime || "-",
        //   additionalInfo: {
        //     queTime: item.queTime || "-",
        //     readTime: item.readTime || "-",
        //   },
        // }));

        const formattedData = res.data.map((item, index) => {
          let parsedJson = "-";
          let templateName = "-";

          try {
            if (item.requestJson) {
              parsedJson = JSON.parse(item.requestJson);
              templateName = parsedJson?.template?.name || "-";
            }
          } catch (e) {
            parsedJson = item.requestJson; // keep raw string if invalid JSON
            templateName = "-";
          }

          return {
            sn: (page - 1) * paginationModel.pageSize + index + 1,
            id: `${item.id || 'row'}-${(page - 1) * paginationModel.pageSize + index}`,
            wabaNumber: item.wabaNumber || "N/A",
            mobileNo: item.mobileNo || "N/A",
            source: item.source || "N/A",
            status: item.status || "N/A",
            deliveryStatus: item.deliveryStatus || "-",
            reason: item.reason || "-",
            requestJson: parsedJson,
            sentTime: item.sentTime || "-",
            templateName,
            additionalInfo: {
              queTime: item.queTime || "-",
              readTime: item.readTime || "-",
            },
          };
        });

        setData(formattedData);
      } else {
        toast.error("No data received");
      }
    } catch (e) {
      console.log(e);
      return toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (state) handleFetchDetails(currentPage);
  }, [currentPage]);



  //   const totalPages = Math.floor(totalPage / paginationModel.pageSize);
  const totalPages = totalPage;
  return (
    <>
      <div className="flex justify-between items-center w-full text-center">
        <h1 className="text-2xl mb-5 text-gray-700 text-center">Logs Detail Report</h1>
        {/* <UniversalButton
          id="export"
          name="export"
          onClick={handleExport}
          label={"Export"}
          icon={
            <IosShareOutlinedIcon
              fontSize="small"
              sx={{ marginBottom: "3px" }}
            />
          }
        /> */}
      </div>

      {isLoading ? (
        <div className="w-full">
          <UniversalSkeleton height="37rem" width="100%" />
        </div>
      ) : (
        <Paper sx={{ padding: 0, overflowX: "scroll", height: 625 }} className="flex items-center flex-col justify-between">
          <table className="w-full table-auto border-collapse overflow-x-scroll">
            <thead className="bg-[#e6f4ff] text-gray-700 text-sm">
              <tr  >
                {["S.No", "WABA Number", "Mobile No", "Source", "Status", "Delivery Status", "Reason", "Sent", "Template Name", "Request JSON", "Action"].map(
                  (header, i) => (
                    <th key={i} className="px-3 py-4 text-left border-b font-[500] border-r-2 text-[#193cb8]">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id} className="border-b hover:bg-gray-50 text-sm w-full">
                  <td className="px-3 py-2 w-10 ">{row.sn}</td>
                  <td className="px-3 py-2 w-40">{row.wabaNumber}</td>
                  <td className="px-3 py-2 w-30">{row.mobileNo}</td>
                  <td className="px-3 py-2 w-20">{row.source}</td>
                  <td className="px-3 py-2 w-30">{row.status}</td>
                  <td className="px-3 py-2 w-40">{row.deliveryStatus}</td>
                  <td className="px-3 py-2 w-35 truncate text-wrap break-words">{row.reason}</td>
                  <td className="px-3 py-2 w-45">{row.sentTime}</td>

                  <td className="px-3 py-2 w-40 font-medium text-gray-700">
                    {row.templateName}
                  </td>
                  <td className="px-3 py-2 max-w-xs">
                    {typeof row.requestJson === "object" ? (
                      <pre className="bg-gray-50 border rounded-md p-2 text-xs overflow-auto max-h-40 whitespace-pre-wrap break-words">
                        {JSON.stringify(row.requestJson, null, 2)}
                      </pre>
                    ) : (
                      <span className="text-gray-500 text-sm italic">{row.requestJson}</span>
                    )}
                  </td>
                  {/* <td className="px-3 py-2 truncate max-w-xs">{row.requestJson}</td> */}
                  
                  {/* <td className="px-3 py-2 w-0">
                    <CustomTooltip
                      className="text-white"
                      title={
                        <pre className="whitespace-pre-wrap break-words max-w-sm text-xs text-wrap">
                          {typeof row.requestJson === "object"
                            ? JSON.stringify(row.requestJson, null, 2)
                            : row.requestJson}
                        </pre>
                      }
                      arrow
                      placement="bottom"
                    >
                      <div className="truncate cursor-pointer max-w-xs">
                        {typeof row.requestJson === "object"
                          ? JSON.stringify(row.requestJson).slice(0, 40) + "..."
                          : String(row.requestJson).slice(0, 40) + "..."}
                      </div>
                    </CustomTooltip>
                  </td> */}
                  <td className="px-3 py-2 w-10">
                    <CustomTooltip title="Info" placement="top" arrow>
                      <span>
                        <IconButton
                          ref={(el) => (dropdownButtonRefs.current[row.id] = el)}
                          onClick={() => handleInfo(row)}
                        >
                          <ImInfo size={16} className="text-green-500" />
                        </IconButton>
                        <InfoPopover
                          anchorEl={dropdownButtonRefs.current[row.id]}
                          open={dropdownOpenId === row.id}
                          onClose={() => setDropdownOpenId(null)}
                        >
                          {clicked && Object.keys(clicked).length > 0 ? (
                            <table className="w-72 text-sm text-left">
                              <tbody>
                                {Object.entries(clicked).map(([key, value], i) => (
                                  <tr key={i} className="border-b">
                                    <td className="px-2 py-2 font-medium text-gray-600 w-1/3 text-nowrap">
                                      {additionalInfoLabels[key] || key}
                                    </td>
                                    <td className="px-2 py-1">{value || "N/A"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="p-2 text-gray-500 italic">No data</div>
                          )}
                        </InfoPopover>
                      </span>
                    </CustomTooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="my-2 flex items-center justify-between px-3 w-full">
            <Typography variant="body2">
              Total Records: <strong>{totalRecords}</strong>
            </Typography>
            <CustomPaginator
              totalPages={totalPage}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Paper>
      )}
    </>
  );
};
