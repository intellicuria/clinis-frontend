import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { PROD_SERVER_URL } from "@/constants/api.constants";
import { Response } from "@/types/module.types";
import ClinisioApiService from "./ClinisioApiService";
const API_KEY = "123";

export async function sendOTP<T>(data: any): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = "/patient/clinis/get-otp";
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "POST",
    headers: headers,
    maxRedirects: 5,
    data,
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
export async function verifyOTP<T>(data: any): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = "/patient/clinis/verify-otp";
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "POST",
    headers: headers,
    maxRedirects: 5,
    data,
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
