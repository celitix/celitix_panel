import { fetchWithAuth } from "../apiClient.js";

// get plan service list
export const getPlanServiceList = async () => {
  return fetchWithAuth(`/routing/plan-service-list`, {
    method: "GET",
  });
};

// get sending service list- plan, sending
export const sendingServiceList = async (type) => {
  return fetchWithAuth(`/routing/getSendingServices?type=${type}`, {
    method: "POST",
  });
};

// get configured services
export const getServiceConfiguration = async (data) => {
  return fetchWithAuth(
    `/routing/getServiceConfiguration?serviceId=${data.serviceId}`,
    {
      method: "POST",
    },
  );
};

// get operator list
export const getOperatorList = async (CountrySrno) => {
  return fetchWithAuth(`/getOperatorList?CountrySrno=${CountrySrno}`, {
    method: "POST",
  });
};

// save and update service configuration
export const saveSmsServiceConfiguration = async (data) => {
  return fetchWithAuth(`/routing/saveServiceConfiguration`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getAllPlansMain = async (data) => {
  return fetchWithAuth(`/plan/getAllPlans`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getPlanDetailsByServiceMain = async (serviceId) => {
  return fetchWithAuth(
    `/plan/getPlanDetailsByServiceId?serviceId=${serviceId}`,
    {
      method: "POST",
    },
  );
};

export const createPlanMain = async (data) => {
  return fetchWithAuth(`/plan/createPlan`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const editPlanMain = async (data) => {
  return fetchWithAuth(`/plan/editPlan`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deletePlanMain = async (serviceId) => {
  return fetchWithAuth(`/plan/deletePlan?serviceId=${serviceId}`, {
    method: "POST",
  });
};

export const updatePlanStatusMain = async (data) => {
  return fetchWithAuth(`/plan/updateStatusByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateOpenContentStatusMain = async (data) => {
  return fetchWithAuth(`/plan/updateOpenContentByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateNdncStatusMain = async (data) => {
  return fetchWithAuth(`/plan/updateNdncByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateOpenMobileStatusMain = async (data) => {
  return fetchWithAuth(`/plan/updateOpenMobileByServiceId`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSMPPServices = async () => {
  return fetchWithAuth(`/smpp/getServices`, {
    method: "GET",
  });
};

export const getSMPPMappingData = async (serviceId) => {
  return fetchWithAuth(`/smpp/getErrorMappingData?serviceid=${serviceId}`, {
    method: "GET",
  });
};

export const createSMPPErrorCode = async (data) => {
  return fetchWithAuth(`/smpp/insertValues`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getSMPPErrorCodeReason = async () => {
  return fetchWithAuth(`/smpp/getAppErrorReasons`, {
    method: "GET",
  });
};

export const deleteSMPPErrCode = async (id) => {
  return await fetchWithAuth(`/smpp/deleteErrCode?Srno=${id}`, {
    method: "POST",
  });
};
// /smpp/insertValues - POST - createSMPPErrorCode
// /smpp/getServices - GET - getSMPPServices
// /smpp/getErrorMappingData?serviceid= - GET - getSMPPMappingData
