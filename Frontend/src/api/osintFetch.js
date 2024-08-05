import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies(null, { path: "/" });
const backendURL = import.meta.env.VITE_BASE_URL;

// Helper function to add headers
const addHeaders = () => {
  const token = cookie.get("token");
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
};

// Helper function to create Axios instance
const createAxiosInstance = () => {
  return axios.create({
    baseURL: backendURL,
    headers: addHeaders(),
  });
};

// Function to start osint
export const startOsint = async (data) => {
  try {
    const api = createAxiosInstance();
    const response = await api.post("/osint", data);
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

// Function to get all osints
export const getAllOsints = async (userID) => {
  try {
    const api = createAxiosInstance();
    const data = { user: userID };
    const response = await api.post("/osint/urls", data);
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

// Function to get comment
export const getComment = async (commentID) => {
  try {
    const api = createAxiosInstance();
    const url = `/osint/urls/${commentID}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};
