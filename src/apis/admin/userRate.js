import { fetchWithAuth } from "../apiClient";

// get RCS Rate data by user
export const getRCSRateData = async (userSrno) => {
  return await fetchWithAuth(`/rcs/getRCSRateData?userSrno=${userSrno}`, {
    method: "POST",
  });
};

// save rcs rate
export const saveEditRcsRate = async (data) => {
  return await fetchWithAuth(`/rcs/saveEditRCSRate`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get rcs rate by srno
export const getRCSRateBySrno = async (srno, userSrno) => {
  return await fetchWithAuth(
    `/rcs/getRcsRateBySrno?srno=${srno}&userSrno=${userSrno}`,
    {
      method: "POST",
    },
  );
};

// delete rcs rate by srno
export const deleteRCSRateBySrno = async (srno, userSrno = null) => {
  return await fetchWithAuth(
    `/rcs/deleteRCSRate?srno=${srno}&userSrno=${userSrno}`,
    {
      method: "DELETE",
    },
  );
};

// get whatsapp rate by srno
export const getWhatsappRateBySrno = async (srno, userSrno) => {
  return await fetchWithAuth(
    `/whatsapp/getWhatsappRateBySrno?srno=${srno}&userSrno=${userSrno}`,
    {
      method: "POST",
    },
  );
};

// save whatsapp rate
export const saveEditWhatsappRate = async (data) => {
  return await fetchWithAuth("/whatsapp/saveWhatsappRate", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get Whatsapp Rate data by user
export const getWhatsappRateData = async (userSrno) => {
  return await fetchWithAuth(`/whatsapp/getWhatsappRate?userSrno=${userSrno}`, {
    method: "POST",
  });
};

// delete whatsapp rate by srno
export const deleteWhatsappRateBySrno = async (srno, userSrno = null) => {
  return await fetchWithAuth(
    `/whatsapp/deleteWhatsappRate?srno=${srno}&userSrno=${userSrno}`,
    {
      method: "DELETE",
    },
  );
};

// save voice rate
export const saveVoiceRate = async (data) => {
  return await fetchWithAuth("/voice/addVoiceRate", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get voice rate by srno
export const getVoiceRateBySrno = async (srNo, userSrno) => {
  return await fetchWithAuth(
    `/voice/getVoiceRate?srNo=${srNo}&userSrno=${userSrno}`,
    {
      method: "GET",
    },
  );
};

// get voice rate data by user
export const getVoiceRateByUser = async (userSrno) => {
  return await fetchWithAuth(`/voice/getVoiceRateByUser?userSrno=${userSrno}`, {
    method: "GET",
  });
};

// delete voice rate by srno
export const deleteVoiceRateBySrno = async (srNo, userSrno = null) => {
  return await fetchWithAuth(
    `/voice/deleteVoiceRate?srNo=${srNo}&userSrno=${userSrno}`,
    {
      method: "DELETE",
    },
  );
};

// add sms pricing
export const addSmsPricing = async (data) => {
  return await fetchWithAuth("/sms/addSmsPricing", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const addSmsServicePricing = async (data) => {
  return await fetchWithAuth("/user/assign-sms-service", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get sms rate data by user
export const getSmsRateByUser = async (userSrno) => {
  return await fetchWithAuth(`/sms/getSmsPricing?userSrno=${userSrno}`, {
    method: "GET",
  });
};

// delete sms rate data by user
export const deleteSmsRateByUser = async (userSrno) => {
  return await fetchWithAuth(`/sms/deleteSmsPricing?userSrno=${userSrno}`, {
    method: "DELETE",
  });
};

// Lookup pricing
export const addEditHlrPricing = async (data) => {
  return await fetchWithAuth(
    `/pricing/addEditHLRPricing?rate=${data.rate}&userSrno=${data.userSrno}`,
    {
      method: "POST",
    },
  );
};

export const getHlrPricing = async (data) => {
  return await fetchWithAuth(`/pricing/getHLRPricing?userSrno=${data}`, {
    method: "POST",
  });
};

export const deleteHlrPricing = async (data) => {
  return await fetchWithAuth(
    `/pricing/deleteHLRPricing?userSrno=${data.userSrno}`,
    {
      method: "POST",
    },
  );
};

// Email pricing start
export const addEditEmailPricing = async (data) => {
  return await fetchWithAuth(`/email/pricing/add`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getEmailPricing = async (data) => {
  return await fetchWithAuth(
    `/email/pricing/get?srNo=${data.srNo}&userSrno=${data.userSrno}`,
    {
      method: "GET",
    },
  );
};

export const getEmailPricingByUser = async (data) => {
  return await fetchWithAuth(`/email/pricing/get-by-user?userSrno=${data}`, {
    method: "GET",
  });
};

export const deleteEmailPricing = async (data) => {
  return await fetchWithAuth(
    `/email/pricing/delete?srNo=${data.srNo}&userSrno=${data.userSrno}`,
    {
      method: "DELETE",
    },
  );
};

export const addAiPricing = async (data) => {
  return await fetchWithAuth(`/ai/pricing/add-update`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getUserAiPricing = async (data) => {
  return await fetchWithAuth(
    `/ai/pricing/user?srNo=${data.srNo}&userSrNo=${data.userSrNo}`,
    {
      method: "GET",
    },
  );
};

export const getAiPricingList = async (data) => {
  return await fetchWithAuth(`/ai/pricing/list`, {
    method: "GET",
  });
};

export const getDeleteAiPricing = async (data) => {
  return await fetchWithAuth(
    `/ai/pricing/delete?srNo=${data.srno}&userSrNo=${data.userSrno}`,
    {
      method: "DELETE",
    },
  );
};

// /ai/pricing/add - POST

// {
//     "srNo": "",
//     "userSrNo": 0,
//     "tokenRate": 0.21
// }
// /ai/pricing/user?srNo= 1&userSrNo=2908 - GET
// /ai/pricing/list - GET
// /ai/pricing/delete?srNo= 1&userSrNo=2908 - DELETE
