import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { PROD_SERVER_URL } from "@/constants/api.constants";
import { Response } from "@/types/module.types";
import ClinisioApiService from "./ClinisioApiService";
const API_KEY = "123";

export async function getPatientProfile() {
  const headers = {
    apikey: API_KEY,
  };
  const url = "/patient/me";
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

export async function updatePatientProfile(data: any) {
  const headers = { apikey: API_KEY };
  const url = "/patient/update";
  return ClinisioApiService.fetchData({ url, method: "PUT", headers, data });
}

export async function updateProfileImage(formData: FormData) {
  const headers = { apikey: API_KEY, 'Content-Type': 'multipart/form-data' };
  const url = "/patient/update-image";
  try {
    const response = await ClinisioApiService.fetchData({
      url,
      method: "PATCH",
      headers,
      data: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Update profile image error:", error);
    throw error;
  }
}

export async function getPatientRecords(patientId: string) {
  const headers = { apikey: API_KEY };
  const url = `/patient/records/${patientId}`;
  return ClinisioApiService.fetchData({ url, method: "GET", headers });
}

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