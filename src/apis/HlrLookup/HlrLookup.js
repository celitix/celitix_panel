import { fetchWithAuth } from "../apiClient.js";

// add single HLR Lookup data
export const addSingleHlrData = async (data) => {
  return await fetchWithAuth(`/HLRLookUp/single?mobileno=${data.mobileno}`, {
    method: "POST",
  });
};

// lookup report data
export const hlrLookupReport = async (data) => {
  return await fetchWithAuth(
    `/HLRLookUp/Report?fromdate=${data.fromdate}&todate=${data.todate}&mobileno=${data.mobileno}&userSrNo=${data.userSrNo}`,
    {
      method: "POST",
    }
  );
};

export const hlrLookupSummaryReport = async (data) => {
  return await fetchWithAuth(`/HLRLookUp/summaryReport?userSrNo=${data.userSrNo}&fromdate=${data.fromdate}&todate=${data.todate}`, {
    method: "POST",
  });
};