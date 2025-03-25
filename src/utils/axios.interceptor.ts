/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import axios from "axios";
import { redirect } from "@/utils/redirect";
import { getToken, tokenFlush } from "./token";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${getToken()}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        tokenFlush();
        redirect();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
