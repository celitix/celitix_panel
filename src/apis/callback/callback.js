import { fetchWithAuth } from "../apiClient";

// add callback/save
export const addCallback = async (data) => {
  return await fetchWithAuth(`/callBack/saveCallbackUrl`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// addCallback
// {
//     "srno": 0, //update value by sms srno
//     "allowCallBackDlr": 0,
//     "callBackDlrUrl": "",
//     "authorizationType": "2", //basic auth = 1 ,bearer token = 2 //sms,rcs,whatsapp
//     "password": "", //Unique Key sms
//     "userId": "wabatest", //rcs,whatsapp,sms
//     "token": "testtokenkeynew",
//     "callBackType": "whatsapp", //sms,whatsapp,rcs
//     "callBackName": "",
//     "url": "https://wabaurltest.com", //whatsapp url
//     "wabaNumber": "919251006460", // whatsapp wabanumber
//     "agentId": "henilsirjas", //rcs
//     "rcsUrl": "https://testing.com", //rcs url
//     "customHeader": { //rcs,whatsapp,url
//         "name": "testing",
//         "city": "rajkot",
//         "phoneno": "9123456700",
//         "mobile": "9123456765"
//     }
// }

// edit callback url data
export const getEditData = async (data) => {
  return await fetchWithAuth(`/callBack/getCallBackUrlData`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
// getEditData
// {
//     "srno": 0, //sms
//     "whatsappCallbackSrno": 3, //whatsapp
//     "rcsSrno": 0, //rcs
//     "selectedUserId": 0,
//     "callBackType": "whatsapp" //whatsapp,sms,rcs
// }

    // "authorizationType": "2", //basic auth = 1 ,bearer token = 2 //sms,rcs,whatsapp

// delete callback number
export const deleteData = async (data) => {
  return await fetchWithAuth(`/callBack/deleteCallBackNumber`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// update callback status
export const updateStatus = async (data) => {
  return await fetchWithAuth(`/callBack/updateCallbackStatus`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get callback Name
export const getData = async (data) => {
  return await fetchWithAuth(
    `/callBack/getCallBackDataList?callBackName=${
      data.callBackName
    }&callBackType=${data.callBackType || ""}&page=${
      data.page
    }&selectedUserId=${data.selectedUserId || ""}`,
    {
      method: "GET",
    }
  );
};

export const saveWhatsappCallback = async (data) => {
  return await fetchWithAuth(`/Whatsapp/callbackUrl`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getWhatsappCallback = async (data) => {
  return await fetchWithAuth("/Whatsapp/getDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// insert rcs callback
export const insertRcsCallback = async (data) => {
  return await fetchWithAuth("/rcsCallbackdlrUrl/insertUrl", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// payload
// {
//     "url": "https://therewardcircle.com/bud4tradelite/api/whatsapp/webhook",
//     "agentId": "testing",
// }

// get rcs callback
export const getRcsCallback = async (data) => {
  return await fetchWithAuth("/rcsCallbackdlrUrl/getUrl", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// {
//     "wabaNumber": "919251006460",
//     "agentId": "testing",
//     "wabaSrno": 105
// }
