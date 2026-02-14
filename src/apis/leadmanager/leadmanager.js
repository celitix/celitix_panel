import { fetchWithAuth } from "../apiClient.js";

export const addLeadSource = async (data) => {
  return fetchWithAuth(`/lead-sources`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateLeadSourceStatus = async (data) => {
  return fetchWithAuth(
    `/lead-sources/status?srNo=${data.srNo}&status=${data.status}`,
    {
      method: "POST",
    },
  );
};

export const getLeadSourceList = async () => {
  return fetchWithAuth(`/lead-sources`, {
    method: "GET",
  });
};

export const deleteLeadSource = async (srNo) => {
  return fetchWithAuth(`/lead-sources?srNo=${srNo}`, {
    method: "DELETE",
  });
};

export const assignLeadSourceToUser = async (data) => {
  return fetchWithAuth(`/user-lead-sources/assign`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const assignLeadSourceServiceToUser = async (data) => {
  return fetchWithAuth(`/user-lead-sources/assign-service`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// {
//     "userSrNo": 0,
//     "leadSourceSrno": 2,
// "type": "rcs",
// "rcsLeadSourceConfig": {
//     "srNo": 0, //zero for insert //for save pass it as 0 or skip  // for update get value pass value for update by list we geet by tyoe
//     "agentId": "pnjtocQy1p1sqsdaFaa",
//     "templateSrno": "2041",
//     "variableList": {
//         "test": "{#mobile_number#}",
//         "cname": "{#user_id#}",
//         "user": "{#first_name#}"
//     }
// }
// }

// export const getUserLeadSourceService = async (data) => {
//   return fetchWithAuth(
//     `/user-lead-sources/get-service?userSrNo=${data.userSrNo}&leadSourceSrno=${data.leadSourceSrNo}&type=${data.type}`,
//     {
//       method: "GET",
//     },
//   );
// };
// payload
// {
//     "userSrNo": 2956,
//     "leadSourceSrno": 3,
//     "type": "whatsapp" //sms whatsapp,rcs,email,api
// }
// response
// {
//     "success": true,
//     "message": "Data fetched successfully",
//     "data": {
//         "srNo": 12,
//         "leadSourceSrno": 3,
//         "userSrno": 2956,
//         "templateSrno": 1706,
//         "wabaSrno": 1,
//         "requestJson": "{\"template\":{\"name\":\"mttlsecond2\",\"language\":{\"code\":\"en\",\"policy\":\"deterministic\"}},\"messaging_product\":\"whatsapp\",\"to\":\"${mobileNo}\",\"type\":\"template\"}",
//         "variableList": "",
//         "mediaPath": ""
//     },
//     "errors": null
// }

export const getUserLeadSourceService = async (data) => {
  // const params = new URLSearchParams(data).toString();
  return fetchWithAuth(`/user-lead-sources/get-service`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteUserLeadSourceService = async (data) => {
  return fetchWithAuth(`/user-lead-sources/delete-service`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
};

// {
//     "userSrNo": 0,
//     "leadSourceSrno": 2,
//     "srNo": 69,
//     "type": "api" //sms whatsapp,rcs,email,api
// }

export const getUserAssignedLeadSoruceList = async () => {
  return fetchWithAuth(`/user-lead-sources/`, {
    method: "GET",
  });
};

export const getLeadSourceVariable = async () => {
  return fetchWithAuth(`/user-lead-sources/variable`, {
    method: "GET",
  });
};

// {
//     "UNIQUE_QUERY_ID",
//     "QUERY_TYPE",
//     "QUERY_TIME",
//     "SENDER_NAME",
//     "SENDER_MOBILE",
//     "SENDER_EMAIL",
//     "SUBJECT",
//     "SENDER_COMPANY",
//     "SENDER_ADDRESS",
//     "SENDER_CITY",
//     "SENDER_STATE",
//     "SENDER_PINCODE",
//     "SENDER_COUNTRY_ISO",
//     "SENDER_MOBILE_ALT",
//     "SENDER_PHONE",
//     "SENDER_PHONE_ALT",
//     "SENDER_EMAIL_ALT",
//     "QUERY_PRODUCT_NAME",
//     "QUERY_MESSAGE",
//     "QUERY_MCAT_NAME",
//     "CALL_DURATION",
//     "RECEIVER_MOBILE"
// }

// ADDTAGS
export const addUpdateTags = async (data, srNo) => {
  return fetchWithAuth(`/tags/add?srNo=${srNo}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// getTagList
export const getTagList = async () => {
  return fetchWithAuth(`/tags/list`, {
    method: "GET",
  });
};

// getParticularTag
export const getParticularTag = async () => {
  return fetchWithAuth(`/tags/get?srNo=1`, {
    method: "GET",
  });
};

// deleteTag
export const deleteTag = async (srNo) => {
  return fetchWithAuth(`/tags/delete?srNo=${srNo}`, {
    method: "DELETE",
  });
};

// /tags/add?srNo=0 - POST - addUpdateTags
// {
//     "tagName": "dipdeep",
//     "tagDetails": "this is shubhsa",
//     "color": "#cf8989",
//     "status": 0, //0 and 1
//     "webhookUrl": "https://dipdeep.com"
// }

// /tags/list - GET - tagsList

// /tags/get?srNo=1 - GET - getParticularTag
// /tags/delete?srNo=2 - DELETE - deleteTag
