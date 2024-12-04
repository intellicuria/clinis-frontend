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
const WordPressBaseService: CustomAxiosInstance = axios.create({
  baseURL: "https://phoecloud.com/wp-json/wp/v2",
});

export default WordPressBaseService;
