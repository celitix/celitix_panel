import { fetchWithAuth } from "../apiClient.js";

// Get Agent List
export const getAgentList = async () => {
  return await fetchWithAuth("/agent/getAgentDetails", {
    method: "POST",
  });
};

// Update Agent Status
export const updateAgentStatus = async (srNo, status) => {
  return await fetchWithAuth("/agent/updateStatusByAgentSrNo", {
    method: "POST",
    body: JSON.stringify({ sr_no: srNo, status }),
  });
};

// Delete Agent by ID
export const deleteAgentById = async (srNo) => {
  return await fetchWithAuth("/agent/deleteAgentByid", {
    method: "POST",
    body: JSON.stringify({ srno: srNo }),
  });
};

// Get Working Hours for an Agent
export const getWorkingHours = async (agentId) => {
  return await fetchWithAuth(
    `/workinghours/getworkinghours?agentId=${agentId}`,
    {
      method: "POST",
    },
  );
};

// Update or Add Working Hours for an Agent
export const saveWorkingHours = async (agentId, schedule) => {
  return await fetchWithAuth("/workinghours/editworkinghours", {
    method: "POST",
    body: JSON.stringify({
      agentId,
      schedule,
    }),
  });
};

// Get Department List
export const getDepartmentList = async () => {
  return await fetchWithAuth("/department/getdepartment", {
    method: "POST",
  });
};

// Get Single Department by srno
export const getDepartmentBySrNo = async (srno) => {
  return await fetchWithAuth("/department/getdepartmentBysrno", {
    method: "POST",
    body: JSON.stringify({ srno }),
  });
};

// Add Department
export const addDepartment = async (departmentName) => {
  try {
    const response = await fetchWithAuth("/department/addDepartment", {
      method: "POST",
      body: JSON.stringify({ name: departmentName }),
    });
    return response;
  } catch (error) {
    console.error("Error adding department:", error);
    return { statusCode: 500, message: "Internal Server Error" };
  }
};

// Edit Department
export const editDepartment = async (srno, name) => {
  try {
    const response = await fetchWithAuth("/department/editdepartmentBysrno", {
      method: "POST",
      body: JSON.stringify({ srno, name }),
    });
    return response;
  } catch (error) {
    console.error("Error updating department:", error);
    return null;
  }
};

// Delete Department
export const deleteDepartment = async (srno) => {
  try {
    const response = await fetchWithAuth("/department/deleteDepartmentByid", {
      method: "POST",
      body: JSON.stringify({ srno }),
    });
    if (response?.statusCode !== 200) {
      console.error(" Delete failed:", response);
    }

    return response;
  } catch (error) {
    console.error("Error deleting department:", error);
    return { statusCode: 500, message: "Internal Server Error" };
  }
};

// Add Agent
export const addAgent = async (agentData) => {
  return await fetchWithAuth("/agent/AddAgent", {
    method: "POST",
    body: JSON.stringify(agentData),
  });
};

// Edit agent by srno.
export const updateAgentDetails = async (data) => {
  return await fetchWithAuth("/agent/editAgentByAgentSrNo", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Fetch Template List based on selected WABA
export const getTemplateList = async (wabaSrno) => {
  try {
    const response = await fetchWithAuth(
      `/agent/templateList?wabaSrno=${wabaSrno}`,
      {
        method: "POST",
      },
    );
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching template list:", error);
    toast.error("Failed to load template list!");
    return [];
  }
};

// Save Assigned Templates to Agent
export const saveCheckedAssignTemplate = async (agentId, assignedTemplates) => {
  try {
    const response = await fetchWithAuth(
      `/agent/saveCheckedAssignTemplate?agentId=${agentId}`,
      {
        method: "POST",
        body: JSON.stringify(assignedTemplates),
      },
    );

    return response;
  } catch (error) {
    console.error("Error saving assigned templates:", error);
    return null;
  }
};

// Assigned template by agent
export const getAssignedTemplatesByAgentId = async (agentId) => {
  try {
    const response = await fetchWithAuth(
      `/agent/getAssignTemplateByAgentId?agentId=${agentId}`,
      {
        method: "POST",
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching assigned templates:", error);
    return null;
  }
};

// Assign whatsapp agent
export const assignWhatsappAgent = async (data) => {
  return await fetchWithAuth(`/whatsapp/assign-whatsapp-agent`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// /whatsapp/assign-whatsapp-agent - POST
// payload
// {
//     "wabaSrNo": 10,
//     "agentSrNoList": [
//         10,
//         11,
//         12
//     ]
// }

// Get whatsapp agent list
export const getWhatsappAgentList = async (wabasrno) => {
  return await fetchWithAuth(
    `/whatsapp/assigned-agents-list?wabaSrNo=${wabasrno}`,
    {
      method: "GET",
    },
  );
};

// /whatsapp/assigned-agents-list?wabaSrNo=1 - GET

// Assign RCS agent
export const assignRcsAgent = async (data) => {
  return await fetchWithAuth(`/rcs/assign-rcs-agent`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// /rcs/assign-rcs-agent - POST
// payload
// {
//     "rcsAgentMstSrNo": 10,
//     "agentSrNoList": [
//         10,
//         9,
//         23,
//         29,
//         4,
//         54
//     ]
// }

// Get Rcs agent list
export const getRcsAgentList = async (srno) => {
  return await fetchWithAuth(`/rcs/list-chat-agent?rcsAgentMstSrNo=${srno}`, {
    method: "GET",
  });
};

// /rcs/list-chat-agent?rcsAgentMstSrNo=1 - GET

// Assign Instagram agent
export const assignInstagramAgent = async (data) => {
  return await fetchWithAuth(`/instagram/assign-instagram-agent`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// /instagram/assign-instagram-agent - POST
// payload
// {
//     "instaOffSrNo": 102,
//     "agentSrNoList": [
//         10,
//         120,
//         34,
//         423,
//         11,
//         1
//     ]
// }

// Get Instagram agent list
export const getInstagramAgentList = async (srno) => {
  return await fetchWithAuth(
    `/instagram/list-chat-agent?InstaOffSrNo=${srno}`,
    {
      method: "GET",
    },
  );
};

// /instagram/list-chat-agent?InstaOffSrNo=1 - GET
