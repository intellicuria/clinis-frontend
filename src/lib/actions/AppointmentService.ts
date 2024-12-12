import axios, { AxiosRequestConfig } from "axios";
import { PROD_SERVER_URL } from "@/constants/api.constants";
import { Response } from "@/types/module.types";
import ClinisioApiService from "./ClinisioApiService";

const API_KEY = "123";

export async function fetchAppointments<T>(id: any): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/appointment/id/${id}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    headers,
    maxRedirects: 5,
  };

  try {
    const response = await ClinisioApiService.fetchData<T>(axiosConfig);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    throw error;
  }
}
