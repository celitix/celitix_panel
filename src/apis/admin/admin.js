import { data } from "react-router-dom";

// API
import { fetchWithAuth } from "../apiClient";

// ============================Users===========================================
// fetch all users
export const fetchAllUsers = async (data) => {
  return await fetchWithAuth("/user/getUserList", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch user by srno
export const fetchUserbySrno = async (srNo) => {
  return await fetchWithAuth("/user/getuserdetailsById", {
    method: "POST",
    body: JSON.stringify({ srNo }),
  });
};

// fetch srno and name of user
export const fetchUserSrno = async (data) => {
  return await fetchWithAuth("/user/getUserNameList", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// update user by srno
export const updateUserbySrno = async (data) => {
  return await fetchWithAuth("/user/updateUserById", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// update user status by srno
export const updateUserStatusbySrno = async (data) => {
  return await fetchWithAuth(
    `/user/updateStatusBySrno?userSrno=${data.userSrno}&status=${data.status}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};

// update reseller virtualbalance by srno
export const updateVirtualBalance = async (data) => {
  console.log("data in api", data);
  return await fetchWithAuth(`/user/update-virtual-balance`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// ============================RCS ADMIN===========================================

// Save RCS Bot
export const saveAgentRcs = async (data) => {
  return await fetchWithAuth("/rcs/bot/saveAgent", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// fetch all bots list RCS
export const fetchAllBotsList = async (agent_id = "") => {
  return await fetchWithAuth(`/rcs/bot/getListOfAgents?agentId=${agent_id}`, {
    method: "POST",
  });
};

// get bot details by srno
export const getBotDetailsBySrNo = async (botSrNo) => {
  return await fetchWithAuth(
    `/rcs/bot/getBotDetailsBySrNo?botSrNo=${botSrNo}`,
    {
      method: "POST",
    },
  );
};

// delete RCS Bot by srno
export const deleteRcsBot = async (srno) => {
  return await fetchWithAuth(`/rcs/bot/delete-bot?srNo=${srno}`, {
    method: "DELETE",
  });
};

// update RCS Bot Status
export const updateRcsBotStatus = async (data) => {
  return await fetchWithAuth(
    `/rcs/updateActiveInactiveStatus?agentSrno=${data.agentSrno}&active=${data.active}`,
    {
      method: "POST",
    },
  );
};

// ============================Manage Users Services===========================================

// get Panel services
export const getPanelServices = async () => {
  return await fetchWithAuth(`/service/list-service`, {
    method: "GET",
  });
};

// get Allowed services
export const getAllowedServices = async (userSrno = "") => {
  return await fetchWithAuth(
    `/service/getAllowedServices?userSrno=${userSrno}`,
    {
      method: "POST",
    },
  );
};

// save services by user
export const saveServicesByUser = async (data) => {
  return await fetchWithAuth("/user/saveServicesByUser", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// {
//     "userSrNo": "2907",
//     "allowService": 1,
//     "serviceTypeSrNo": "12"
// }

// get transaction services
export const getTransServices = async () => {
  return await fetchWithAuth("/service/getTransServices", {
    method: "POST",
  });
};

// get promotional services
export const getPromoServices = async () => {
  return await fetchWithAuth("/service/getPromoServices", {
    method: "POST",
  });
};

// add mobile numbers
export const addMobileNumbers = async (data) => {
  return await fetchWithAuth(
    `/user/saveRegMobiles?userSrno=${data.userSrno}&mobileNumbers=${data.mbno}`,
    {
      method: "POST",
    },
  );
};

// get mobile numbers
export const getMobileNumbers = async (data) => {
  return await fetchWithAuth(`/user/getRegMobileno?userSrno=${data}`, {
    method: "POST",
  });
};

// add user
export const addUser = async (data) => {
  return await fetchWithAuth(`/user/createUser`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// save PETM Chain
export const savePETMChain = async (data) => {
  return await fetchWithAuth(`/user/setPetmData`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get PETM Chain
export const getPETMChain = async (data) => {
  return await fetchWithAuth(`/user/getPetmData?selectedUserId=${data}`, {
    method: "GET",
  });
};

// get whatsapp monthly charges
export const getCharges = async (userSrno) => {
  return await fetchWithAuth(
    `/WhatsappUserMonthlyRent/getWhatsappMontlyRate?userSrno=${userSrno}`,
    {
      method: "POST",
    },
  );
};

// save whatsapp monthly charges
export const saveCharges = async (data) => {
  return await fetchWithAuth(
    `/WhatsappUserMonthlyRent/SaveUpdateRate?selectedUserId=${data.userSrno}&monthlyRate=${data.monthlyRate}`,
    {
      method: "POST",
    },
  );
};

// ============================SMPP===========================================

export const saveSMPP = async (data) => {
  return await fetchWithAuth(`/smpp/createSmppConnection`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSMPP = async () => {
  return await fetchWithAuth(`/smpp/showSmppRecords`, {
    method: "POST",
  });
};

export const updateSmppStatus = async (data) => {
  return await fetchWithAuth("/smpp/updateSmppStatusByServiceId", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteSMPP = async (id) => {
  return await fetchWithAuth(`/smpp/deleteSmpp?serviceId=${id}`, {
    method: "DELETE",
  });
};
// ============================Whatsapp Admin===========================================
export const getWabaList = async (data) => {
  return await fetchWithAuth("/getWabaDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getOperatorList = async (srno) => {
  return await fetchWithAuth(`/getOperatorList?CountrySrno=${srno}`, {
    method: "POST",
  });
};
export const getPrefixList = async (data) => {
  return await fetchWithAuth(
    `/getPrefixList?countrySrno=${data.country}&operatorSrno=${data.operator}`,
    {
      method: "POST",
    },
  );
};

export const addPrefix = async (data) => {
  return await fetchWithAuth(`/addPrefixList`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deletePrefix = async (data) => {
  return await fetchWithAuth(`/deletePrefix`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getCountryList = async () => {
  return await fetchWithAuth(`/getcountryList`, {
    method: "POST",
  });
};
// ============================SMS Admin===========================================
export const getAllPlans = async (data) => {
  return await fetchWithAuth(`/plan/getAllPlans`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const createPlan = async (data) => {
  return await fetchWithAuth(`/plan/createPlan`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deletePlan = async (id) => {
  return await fetchWithAuth(`/plan/deletePlan?serviceId=${id}`, {
    method: "POST",
    // body: JSON.stringify(data),
  });
};
export const updateServiceStatus = async (data) => {
  return await fetchWithAuth(`/plan/updateStatusByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateOpenContentStatus = async (data) => {
  return await fetchWithAuth(`/plan/updateOpenContentByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateNdncStatus = async (data) => {
  return await fetchWithAuth(`/plan/updateNdncByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateOpenMobileStatus = async (data) => {
  return await fetchWithAuth(`/plan/updateOpenMobileByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getPlanDetailsByServiceId = async (srno) => {
  return await fetchWithAuth(
    `/plan/getPlanDetailsByServiceId?serviceId=${srno}`,
    {
      method: "POST",
    },
  );
};
export const updatePlan = async (data) => {
  return await fetchWithAuth(`/plan/editPlan`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const addOperator = async (data) => {
  return await fetchWithAuth(`/saveOperator`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deleteOperator = async (data) => {
  return await fetchWithAuth(`/deleteOperatorBySrno?srNo=${data}`, {
    method: "POST",
  });
};

export const editOperatorData = async (data) => {
  return await fetchWithAuth(`/editOperator`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSMPPDetailsById = async (id) => {
  return await fetchWithAuth(
    `/smpp/getSmppDetailsByServiceId?serviceId=${id}`,
    {
      method: "POST",
    },
  );
};

export const updateSMPP = async (data) => {
  return await fetchWithAuth(`/smpp/editSmppConnection`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// ============================LIVE MONITORING===========================================

export const liveMonitoringWhatsapp = async () => {
  return await fetchWithAuth(`/liveMonitoring/whatsapp-report`, {
    method: "GET",
  });
};

export const liveMonitoringRCS = async () => {
  return await fetchWithAuth(`/liveMonitoring/rcs-report`, {
    method: "GET",
  });
};

export const liveMonitoringRCSStatus = async () => {
  return await fetchWithAuth(`/liveMonitoring/rcs-status-report`, {
    method: "GET",
  });
};

export const liveMonitoringSendingService = async (type) => {
  return await fetchWithAuth(
    `/liveMonitoring/sending-service-data?type=${type}`,
    {
      method: "GET",
    },
  );
};

// ============================MANAGE NOTIFICATIONS===========================================
export const getNotificationList = async () => {
  return await fetchWithAuth(`/notification/list`, {
    method: "GET",
  });
};

export const getNotification = async (data) => {
  return await fetchWithAuth(
    `/notification/get-notification?reminderSrno=${data.reminderSrno}&type=${data.type}`,
    {
      method: "GET",
    },
  );
};

export const deleteNotification = async (data) => {
  return await fetchWithAuth(
    `/notification/delete-notification?reminderSrno=${data.reminderSrno}&notificationStatus=${data.status}&type=${data.type}`,
    {
      method: "DELETE",
    },
  );
};

export const saveNotification = async (type, data) => {
  return await fetchWithAuth(`/notification/save-notification?type=${type}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSpeicificNotification = async (data) => {
  return await fetchWithAuth(
    `/notification/get-notification?reminderSrno=${data.srno}&type=${data.type}`,
    {
      method: "GET",
    },
  );
};

export const getNotificationVariable = async (data) => {
  return await fetchWithAuth(`/notification/get-variable-list`, {
    method: "GET",
  });
};

// getPincodeData
export const getPincodeData = async (pincode) => {
  return await fetchWithAuth(`/getPincodeData?pincode=${pincode}`, {
    method: "GET",
  });
};

// ============================SMPP Error code===========================================
export const getErrorMappingData = async (serviceid) => {
  return await fetchWithAuth(
    `/smpp/getErrorMappingData?serviceid=${serviceid}`,
    {
      method: "GET",
    },
  );
};

export const deleteErrCode = async (id) => {
  return await fetchWithAuth(`/smpp/deleteErrCode?Srno=${id}`, {
    method: "POST",
  });
};

export const getAppErrorReasons = async (id) => {
  return await fetchWithAuth(`/smpp/getAppErrorReasons`, {
    method: "GET",
  });
};
export const getServices = async (id) => {
  return await fetchWithAuth(`/smpp/getServices`, {
    method: "GET",
  });
};
export const smppServiceWiseSummaryData = async (data) => {
  return await fetchWithAuth(
    `/smpp/smppServiceWiseSummaryData?month=${data.month}&year=${data.year}`,
    {
      method: "POST",
    },
  );
};
export const getMissingErrorCodeData = async (data) => {
  return await fetchWithAuth(`/smpp/getMissingErrorCodeData`, {
    method: "POST",
  });
};

export const insertValuesSMPP = async (data) => {
  return await fetchWithAuth(`/smpp/insertValues`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSendingService = async (data) => {
  return await fetchWithAuth(`/routing/getSendingServices?type=${data.type}`, {
    method: "POST",
  });
};

export const getSendingServiceConfiguration = async (data) => {
  return await fetchWithAuth(
    `/routing/getServiceConfiguration?serviceId=${data.serviceId}`,
    {
      method: "POST",
    },
  );
};
export const getRoutingPlanList = async () => {
  return await fetchWithAuth(`/routing/plan-service-list`, {
    method: "GET",
  });
};

export const saveServiceConfigurationRouting = async (data) => {
  return await fetchWithAuth(`/routing/saveServiceConfiguration`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// HLR Lookup
export const addSingleHlrData = async (data) => {
  return await fetchWithAuth(`/HLRLookUp/single?mobileno=${data.mobileno}`, {
    method: "POST",
  });
};

export const hlrLookupReport = async (data) => {
  return await fetchWithAuth(
    `/HLRLookUp/Report?fromdate=${data.fromdate}&todate=${data.todate}&mobileno=${data.mobileno}&userSrNo=${data.userSrNo}`,
    {
      method: "POST",
    },
  );
};

// Sales person list
export const getSalesPersonList = async (data) => {
  return await fetchWithAuth("/getSalesPersonList", {
    method: "POST",
  });
};

// =========================DR analysis report============================

export const getDrAnalysisReport = async (id) => {
  return await fetchWithAuth(`/drAnalysis?serviceId=${id}`, {
    method: "GET",
  });
};

// =====================Block List========================
export const getBlockNumberList = async (data) => {
  return await fetchWithAuth(
    `/blockmobile/list?pageIndex=${data.pageIndex}&pageSize=10&mobileNo=${data.mobileNo}`,
    {
      method: "GET",
    },
  );
};
export const addBlockNumber = async (data) => {
  return await fetchWithAuth("/blockmobile/add-update", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const getBlockNumberById = async (data) => {
  return await fetchWithAuth(
    `/blockmobile/get?blockSrNo=${data.blockSrNo}&userSrNo=${data.userSrNo}`,
    {
      method: "GET",
    },
  );
};
export const deleteBlockNumber = async (data) => {
  return await fetchWithAuth(
    `/blockmobile/delete?blockSrNo=${data.blockSrNo}&userSrNo=${data.userSrNo}`,
    {
      method: "DELETE",
    },
  );
};

export const getBlockContentByUserId = async (id) => {
  return await fetchWithAuth(
    `/condition/getBlockConditionDetailed?userSrno=${id}`,
    {
      method: "POST",
    },
  );
};
export const addBlockContent = async (data) => {
  return await fetchWithAuth("/condition/addBlockCondition", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deleteBlockContent = async (id) => {
  return await fetchWithAuth(`/condition/deleteBlockCondition?blockId=${id}`, {
    method: "POST",
  });
};

export const getBlockHeader = async (id) => {
  return await fetchWithAuth(`/getBlockHeaderDetailed`, {
    method: "POST",
  });
};
export const addBlockHeader = async (data) => {
  return await fetchWithAuth("/addBlockHeader", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deleteBlockHeader = async (id) => {
  return await fetchWithAuth(`/deleteBlockHeader?blockId=${id}`, {
    method: "POST",
  });
};

export const getBlockSeries = async (id) => {
  return await fetchWithAuth("/getBlockSeriesDetailed", {
    method: "POST",
  });
};

export const addBlockSeries = async (data) => {
  return await fetchWithAuth("/addBlockSeries", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deleteBlockSeries = async (id) => {
  return await fetchWithAuth(`/deleteBlockSeries?seriesId=${id}`, {
    method: "POST",
  });
};

// get users balance
export const getUsersBalance = async () => {
  return await fetchWithAuth(`/wallet/users-balance`, {
    method: "GET",
  });
};

// Restart specific engine
export const restartEngine = async (data) => {
  return await fetchWithAuth(
    `/api/admin/restart-engine?serverType=${data.serverType}`,
    {
      method: "GET",
    },
  );
};

// Restart specific engine
// export const restartEngine = async (data) => {
//   const { serverType, restart_enigne_url1 } = data;

//   return await fetchWithAuth(
//     `/api/admin/restart-engine?serverType=${encodeURIComponent(
//       serverType
//     )}&restart_enigne_url1=${encodeURIComponent(restart_enigne_url1)}`,
//     {
//       method: "GET",
//     }
//   );
// };
