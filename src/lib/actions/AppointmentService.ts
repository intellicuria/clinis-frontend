import axios, { AxiosRequestConfig } from "axios";
import { PROD_SERVER_URL } from "@/constants/api.constants";
import { Response } from "@/types/module.types";
import ClinisioApiService from "./ClinisioApiService";

const API_KEY = "123";

export async function fetchAppointments<T>(userId: string): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/appointments/user/${userId}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    headers,
    maxRedirects: 5,
  };

  try {
    const response = await ClinisioApiService.fetchData<T>(axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}

export async function cancelAppointment<T>(appointmentId: string): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/appointments/${appointmentId}/cancel`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "POST",
    headers,
    maxRedirects: 5,
  };

  try {
    const response = await ClinisioApiService.fetchData<T>(axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error canceling appointment:", error);
    throw error;
  }
}
