import axios from "axios";

const backendURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  try {
    const response = await api.post("/auth/register", {
      firstname,
      lastname,
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};
