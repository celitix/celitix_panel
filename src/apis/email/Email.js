import { fetchWithAuth } from "../apiClient.js";

// add email template
export const addEmailTemplate = async (data) => {
  return await fetchWithAuth("/email/add-template", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// update email template
export const updateEmailTemplate = async (data, srNo) => {
  return await fetchWithAuth(`/email/update-template?srNo=${srNo}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get email template
export const getEmailSingleTemplate = async (srNo) => {
  return await fetchWithAuth(`/email/get-template?srNo=${srNo}`, {
    method: "GET",
  });
};

// get email All template
export const getEmailAllTemplate = async (data) => {
  return await fetchWithAuth(
    `/email/list-template?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&templateName=${data.templateName}`,
    {
      method: "GET",
    }
  );
};

// delete email template
export const deleteEmailTemplate = async (srNo) => {
  return await fetchWithAuth(`/email/delete-template?srNo=${srNo}`, {
    method: "DELETE",
  });
};

// ==============================SMTP=======================

// add SMTP
export const addSMTP = async (data) => {
  return await fetchWithAuth("/email/smtp/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get userdata SMTP
export const getUserDataSMTP = async (userSrno) => {
  return await fetchWithAuth(`/email/smtp/get-user-data?userSrno=${userSrno}`, {
    method: "GET",
  });
};

// get SMTP list
export const getSMTPList = async () => {
  return await fetchWithAuth(`/email/smtp/list`, {
    method: "GET",
  });
};

// add SMTP
export const sendSMTP = async (data) => {
  return await fetchWithAuth("/email/smtp/send-email", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// delete SMTP
export const deleteSMTP = async (userSrno) => {
  return await fetchWithAuth(`/email/smtp/delete?userSrno=${userSrno}`, {
    method: "DELETE",
  });
};
