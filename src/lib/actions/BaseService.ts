import { DEV_SERVER_URL } from "@/constants/api.constants";
import axios from "axios";

const BaseService = axios.create({
  timeout: 60000,
  baseURL: DEV_SERVER_URL,
});

export default BaseService;
