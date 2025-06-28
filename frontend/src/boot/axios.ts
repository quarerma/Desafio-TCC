import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 2000000,
});

export async function get(endpoint: string, options = {}) {
  return await axiosInstance.get(endpoint, {
    ...options,
  });
}

export async function post(endpoint: string, data = {}, options = {}) {
  return await axiosInstance.post(endpoint, data, {
    ...options,
  });
}

export async function getSession() {
  try {
    const user_id = localStorage.getItem("user_id") || "";
    const params = new URLSearchParams({
      user_id,
    });
    return (await get("/users", { params })).data;
  } catch (error) {
    localStorage.removeItem("token");
    window.location.href = "/login";

    console.error(error);

    return null;
  }
}
