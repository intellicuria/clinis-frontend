
import { DEV_SERVER_URL } from "@/constants/api.constants";
import axios from "axios";

export const getAllDoctors = async () => {
  try {
    const response = await axios.get(`${DEV_SERVER_URL}/api/doctors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};
