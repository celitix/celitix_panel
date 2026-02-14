import { fetchWithAuth } from "../apiClient.js";

export const getCountryList = async () => {
  return await fetchWithAuth("/getcountryList", {
    method: "POST",
  });
};

export const getAllGroups = async () => {
  return await fetchWithAuth("/group/showGroups", {
    method: "POST",
  });
};

export const getBaseUrl = async (paramName) => {
  return await fetchWithAuth(`/whatsapp/getParamValue?paramName=${paramName}`, {
    method: "GET",
  });
};