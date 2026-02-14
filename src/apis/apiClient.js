import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = "/api";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // console.error("No token found, redirecting to login.");
    window.location.href = "/login";
    return;
  }

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
  };

  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  try {
    // console.log(`Fetching API: ${API_BASE_URL}${endpoint}`);
    const instance = axios.create({ timeout: 100000 });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );

    const response = await instance({
      method: options.method || "GET",
      url: `${API_BASE_URL}${endpoint}`,
      data: options.body,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    });

    // if (response.statusText !== "OK") {
    //   console.error(`API Error: ${response.status} ${response.statusText}`);
    //   return;
    // }

    if (response.status !== 200) {
      // console.error(`API Error: ${response.status}`);
      return;
    }

    return response.data;
  } catch (error) {
    if (error?.status === 401) {
      // console.error("Session expired. Redirecting to login...");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
      return null;
    }
    // if (error?.status === 400) {
    //   console.log(error);
    //   return error;
    // }
    if (error?.response?.data) {
      // Return the data so the component can read { status: false, msg: "..." }
      return error.response.data;
    }
    // console.error("Network Error:", error);
    return error;
  }
};
