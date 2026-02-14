import { fetchWithAuth } from "../apiClient.js";

// add email template
export const addEmailTemplate = async (data) => {
  return await fetchWithAuth("/email/add-template", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


// {
//     "templateName": "amrit testing",
//     "emailContent": " this is demo template testing by amrit {#var1#}{#var2#}",
//     "attachmentId": 60,
//     "variableCount": 2 //  number of the varibale
// }

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
    },
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

//  {
//   "hostName": "transemail.dove-soft.com",
//   "userName": "mobicomm@dovesoft.ltd",
//   "port": 2525,//Port must be greater than 0.Port must be less than or equal to 65535.
//   "password": "16C502C431EBA84FF85906F21F5553B7C929",
//   "toEmail":"sindrathsirohi@gmail.com",
//   "subject":"Greeting",
//   "message":"Hey amrit how are u",
//   "authentication":"plain"
// }

// delete SMTP
export const deleteSMTP = async (userSrno) => {
  return await fetchWithAuth(`/email/smtp/delete?userSrno=${userSrno}`, {
    method: "DELETE",
  });
};

// =============================Email reports=========================

// email summary report
export const emailSummaryReport = async (data) => {
  return await fetchWithAuth(
    `/email/summaryReport?userSrno=${data.userSrno}&fromDate=${data.fromDate}&toDate=${data.toDate}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};

// email details report
export const emailDetailsReport = async (data) => {
  return await fetchWithAuth(
    `/email/detailsReport?userSrno=${userSrno}&sentDate=${data.sentDate}&email=${data.email}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};

// ================Domain white list ==========================

// insert email sender white label data
export const insertEmailSender = async (data) => {
  return await fetchWithAuth(`/emailSender/insert`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// delete email sender data
export const deleteEmailSender = async (data) => {
  return await fetchWithAuth(
    `/emailSender/delete?srNo=${data.userSrno}&selectedUser=${data.selectedUser}`,
    {
      method: "DELETE",
    },
  );
};

// get email sender data
export const getEmailSenderData = async (data) => {
  return await fetchWithAuth(
    `/emailSender/getEmailTemplateData?srNo=${data.srNo}&selectedUser=${data.selectedUser}`,
    {
      method: "POST",
    },
  );
};

// update email sender data status
export const updateEmailSenderStatus = async (data) => {
  return await fetchWithAuth(
    `/emailSender/updateEmailStatus?srNo=${data.srNo}&selectedUser=${data.selectedUser}&status=${data.status}`,
    {
      method: "POST",
    },
  );
};

// =================email library===================

// add or update email template creation
export const emailLibraryAddorUpdate = async (data) => {
  return await fetchWithAuth(`/emailLibrary/saveOrUpdate`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// {
//     "srNo": 2520,
//     "name": "email",
//     "emailBody": "<html><h1><b>email body</b></h1></html>",
//     "subject": "subject",
//     "category": "email"

    // "attachmentId": 60,
    // "variableCount": 2 //  number of the varibale
// }

// Get email library data
export const getEmailLibraryData = async (data) => {
  return await fetchWithAuth(
    `/emailLibrary/getEmailTemplateData?userSrno=${data.userSrno}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};


// ===================Send Email================
// /api/email/sendEmail POST - sendSingleEmail
// {
//     "templateId": 36, //optional
//     "subject": "Email Update Email",
//     "fromEmail": "mobicomm@dovesoft.ltd",
//     "fromName": "deep",
//     "toEmail": "sindrathsirohi@gmail.com",
//     "cc": "abc@gmail.com",
//     "bodyHtml": "Amrit", //If you want to add an attachment, please provide both: attachmentName : The name of the file (e.g., name.jpg).attachment : The Base64 encoded content of the file.
//       "varList": { // if you want to pass templateid required
//         "var1": "demouser",
//         "var2":"dummm"
//     },
//     "attachmentName": "test.jpg",
//     "attachment": "/9j/4R2CRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIA
//   }

export const testEmail = async (data) => {
  return await fetchWithAuth(`/api/email/sendEmail`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
// /api/email/sendEmailOnTamplate - POST - sendMultipleEmail

export const sendMultipleEmail = async (data) => {
  return await fetchWithAuth(`/api/email/sendEmailOnTemplate`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
// {
//     "templateId": 34,
//     "subject": "Happy New Year",
//     "fromEmail": "mobicomm@dovesoft.ltd",
//     "fromName": "John Sir",
//     "replyEmail": "reply@example.com",
//     "list": [
//         {
//             "toEmail": "sindrathsirohi@gmail.com",
//             "varList": {
//                 "var1": "value"//,
//              //   "var2": "value"
//             }
//         },
//         {
//             "toEmail": "amritkp2113@gmail.com",
//             "varList": {
//                 "var1": "value"//,
//               //  "var2": "value"
//             }
//         }
//     ]
// }


// {
//     "templateId": 35,
//     "subject": "Subject",
//     "fromEmail": "From Email",
//     "fromName": "From Name",
//     "replyEmail": "Reply Email",
//     "list": [
//         {
//             "toEmail": "To Email 1",
//             "varList": {
//                 "var1": "Variable 1"
//             }
//         },
//         {
//             "toEmail": "To Email 2",
//             "varList": {
//                 "var1": "Variable 2"
//             }
//         },
//         {
//             "toEmail": "To Email 3",
//             "varList": {
//                 "var1": "Variable 3"
//             }
//         }
//     ]
// }


