import { fetchWithAuth } from "../apiClient.js";

export const recharge = async (data) => {
  return await fetchWithAuth("/recharge", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const rechargeCreateOrderCashFree = async (data) => {
  return await fetchWithAuth("/cashfree/create-order", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const verifyRechargeStatus = async (data) => {
  return await fetchWithAuth("/cashfree/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
