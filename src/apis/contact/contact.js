import { fetchWithAuth } from "../apiClient.js";

// get contact by id
export const getContactListByGrpId = async (data) => {
  return await fetchWithAuth("/contact/getAllContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// payload for - getContactListByGrpId
// {
//     "groupSrNo": "96"
// }

// get group list
export const getGrpList = async () => {
  return await fetchWithAuth("/group/showGroups", {
    method: "POST",
  });
};

// add contact to group
export const addContact = async (data) => {
  return await fetchWithAuth("/contact/addContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// payload for - addContact
// {
//     "firstName": "vk",
//     "middleName": "kumar",
//     "lastName": "prajapati",
//     "gender": "m",
//     "mobileNo": "9099017261",
//     "emailId": "sindrathsirohi1@gmail.com",
//     "uniqueId": "234243212",
//     "status": 1,
//     "birthDate": "2000-12-11",
//     "anniversaryDate": "2024-12-11"
//     "allowishes": 1,
//     "groupSrNo": 96,
// }

// import contact
export const importContact = async (data) => {
  return await fetchWithAuth("/contact/importContact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// payload for importContact
// {
//     "lastName": "LastName",
//     "mobile": "MobileNumber",
//     "email": "Email",
//     "gender": null,
//     "birth": "Birthdate",
//     "marriage": "AnniversaryDate",
//     "extra": "UniqueID",
//     "groupSrNo": 16,
//     "firstName": "FirstName",
//     "middleName": "MiddleName",
//     "noOfRow": -1,
//     "fileData": [],
//     "filePath": "/opt/tomcat9/webapps/eventhandlerpro/campaignfile/1744698699556_sample_data.xlsx"
// }

// add group
export const addGrp = async (data) => {
  return await fetchWithAuth("/group/addGroup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// payload for - addGrp
// {
//     "groupName": "Team"
// }

// delete group
export const deleteGrp = async (grpName, grpSrno) => {
  return await fetchWithAuth(
    `/group/deleteGroup?groupName=${grpName}&groupSrno=${grpSrno}`,
    {
      method: "POST",
    },
  );
};

// update group name
export const updateGroupName = async (grpSrno, grpName) => {
  return await fetchWithAuth(
    `/group/updateGroup?groupSrno=${grpSrno}&groupName=${grpName}`,
    {
      method: "POST",
    },
  );
};

// get contact by srno
export const getContactBySrno = async (conSrno) => {
  return await fetchWithAuth(`/contact/getContactBySrno?srNo=${conSrno}`, {
    method: "POST",
  });
};

// upload contact file
export const uploadContactFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth("/campaignFile/UploadContactFile", {
      method: "POST",
      body: formData,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// update contact details
export const updateContactsDetails = async (data) => {
  return await fetchWithAuth("/contact/updateAddressBookData", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// payload for updateContactDetails
// {
//     "srNo": 64108,
//     "groupSrNo": 38,
//     "firstName": "henil",
//     "middleName": "A.",
//     "lastName": "patel",
//     "gender": "m",
//     "mobileNo": "9876543217",
//     "birthDate": "2000-12-11",
//     "anniversaryDate": "2024-12-21",
//     "allowishes": 1,
//     "activeStatus": 1,
//     "emailId": "john.doe@example.com",
//     "uniqueId": "abcd-1234-xyz"
// }

// delete single contact
// export const deleteContact = async (data) => {
//   return await fetchWithAuth(
//     `/contact/deleteMultipleAddressBookContacts?${data}`
//   );
// };

// delete Multiple contact
export const deleteMultipleContact = async (data) => {
  return await fetchWithAuth(
    `/contact/deleteMultipleAddressBookContacts?${data}`,
  );
};

// delete single contact
export const deleteContact = async (data) => {
  return await fetchWithAuth(
    `/contact/deleteAddressBookContact?addSrno=${data}`,
  );
};

// update contact status
export const updateContactStatus = async (data) => {
  return await fetchWithAuth(
    `/contact/updateStatus?addSrno=${data.srno}&activeStatus=${data.status}`,
    { method: "POST" },
  );
};
