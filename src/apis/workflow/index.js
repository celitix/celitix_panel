import { fetchWithAuth } from "../apiClient";

export const getAllWorkflow = async (type) => {
  return await fetchWithAuth(`/workflow/getListByType?type=${type || ""}`, {
    method: "POST",
  });
};
export const saveWorkflow = async (data) => {
  return await fetchWithAuth("/workflow/saveWorkflow", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const deleteWorkflow = async (srno, type) => {
  return await fetchWithAuth(
    `/workflow/deleteWorkflow?srno=${srno}&workflowType=${type}`,
    {
      method: "DELETE",
    }
  );
};
export const getWorkflowCampaignDetails = async (data) => {
  return await fetchWithAuth(`/workflow/campaignReport`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getWorkflowCampaignDetailsReport = async (data) => {
  return await fetchWithAuth(`/workflow/campaign-details`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// payload for getWorkflowCampaignDetailsReport
// //whatsapp
// // {
// //   "campSrno": 672, 
// //   "nodeType": "whatsapp", //sms,rcs.whatsapp,
// //   "fromDate": "2025-10-14"
// //  }

// //whatsapp
// {
//   "campSrno": 4613, 
//   "nodeType": "whatsapp", //sms,rcs.whatsapp,
//   "fromDate": "2025-10-01"
//  }

// //sms
// // {
// //   "campSrno": 707, //sms707 //whatsapp672
// //   "nodeType": "sms", //sms,rcs.whatsapp,
// //   "fromDate": "2025-05-05"
// // }

// //rcs
// // {
// //   "campSrno": 1, 
// //   "nodeType": "rcs",
// //   "fromDate": "2025-11-06"
// //  }

// // //voice
// //  {
// //   "campSrno": 809, 
// //   "nodeType": "voice",
// //   "fromDate": "2025-11-06"
// //  }