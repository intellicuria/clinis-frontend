import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { PROD_SERVER_URL } from "@/constants/api.constants";
import { Response } from "@/types/module.types";
import ClinisioApiService from "./ClinisioApiService";
const API_KEY = "123";

export async function searchDoctors<T>(
  searchText: string | null,
  location: string | null,
  page?: number
): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `/search/clinis/patient?searchText=${searchText}&location=${location}&page=${page}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "POST",
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
export async function searchOrganization<T>(
  searchText: string | null,
  location: string | null,
  page?: number
): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `/search/clinis/organization?searchText=${searchText}&location=${location}&page=${page}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "POST",
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
