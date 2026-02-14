import { fetchWithAuth } from "../apiClient.js";

// get file URL by type

//type values -  all,image,video,document,carousel
export const getFileUrlByType = async (type) => {
  return await fetchWithAuth(`/utility/getFileUrlByType?type=${type}`, {
    method: "GET",
  });
};

// upload file utility
export const utilityFileUpload = async (file, generateHandler = 0) => {
  const formData = new FormData();
  formData.append("file", file);
  if (generateHandler) {
    formData.append("generateHandler", generateHandler);
  }
  try {
    const response = await fetchWithAuth("/utility/upload-file", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// add pdf template
export const addPdfTemplate = async (data) => {
  return await fetchWithAuth("/saveOrUpdatePdfTemplate", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get pdf All template
export const getPdfAllTemplate = async (data) => {
  return await fetchWithAuth(`/getDynamicPdfTemplate`, {
    method: "GET",
  });
};

// update pdf template
export const updatePdfTemplate = async (data, srNo) => {
  return await fetchWithAuth(`/pdf/update-template?srNo=${srNo}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// delete PDF template
export const deletePdfTemplate = async (srNo) => {
  return await fetchWithAuth(`/deletePdfTemplate?srNo=${srNo}`, {
    method: "POST",
  });
};

// delete PDF template
export const updatePdfTemplateStatus = async (data) => {
  return await fetchWithAuth(
    `/activeInactiveStatus?srNo=${data.srNo}&status=${data.status}`,
    {
      method: "POST",
    }
  );
};
