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
export async function getAppointments() {
  const headers = {
    apikey: API_KEY,
  };
  const url = `/appointment/clinis/fetch-appointments`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: headers,
    maxRedirects: 5,
  };

  try {
    const response = await ClinisioApiService.fetchData<T>(axiosConfig);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
}
export async function cancelAppointment(id: any) {
  const headers = {
    apikey: API_KEY,
  };
  const url = `/appointment/decline/${id}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "PUT",
    headers: headers,
    maxRedirects: 5,
  };

  try {
    const response = await ClinisioApiService.fetchData<T>(axiosConfig);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
}
