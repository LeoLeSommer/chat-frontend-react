import axios, { AxiosInstance } from "axios";
import configurations from "../configurations";

const api: AxiosInstance = axios.create({
  baseURL: configurations.baseApiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
