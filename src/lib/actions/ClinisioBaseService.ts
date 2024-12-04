import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { PROD_SERVER_URL } from "@/constants/api.constants";
// Define the interface for the Axios instance
interface CustomAxiosInstance extends AxiosInstance {
  // Add custom methods or properties if needed
}

// Create an Axios instance
const ClinisioBaseService: CustomAxiosInstance = axios.create({
  baseURL: PROD_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
ClinisioBaseService.interceptors.request.use(
  (config) => {
    console.log("Request sent:", config);
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor
ClinisioBaseService.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response received:", response);
    return response;
  },
  (error: AxiosError) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

// Example usage of the Axios instance
export default ClinisioBaseService;
