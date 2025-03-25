import { Method } from "@/services";
import axiosInstance from "@/utils/axios.interceptor";

export function fetchMiddleware<T = unknown>(
  url: string,
  method: Method,
  data: T
) {
  const config = {
    method,
    url: `${import.meta.env.VITE_API_URL}${url}`,
    data,
  };

  return axiosInstance(config);
}
