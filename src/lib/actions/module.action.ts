import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { PROD_SERVER_URL } from "@/constants/api.constants";
import { Response } from "@/types/module.types";
import ClinisioApiService from "./ClinisioApiService";
const API_KEY = "123";

export async function getAllModules<T>(): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = "modules/noauth";
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

export async function getAllCategories<T>(): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = "modules/category/noauth";
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

export async function getModulesbyId<T>({
  moduleID,
}: {
  moduleID: string;
}): Promise<T> {
  // Assuming dbConnect is defined elsewhere
  const headers = {
    apikey: API_KEY,
  };

  const url = `modules/noauth/${moduleID}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: headers,
    maxRedirects: 5,
  };

  try {
    const response = await ClinisioApiService.fetchData<T>(axiosConfig);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
}

export async function getFilteredModules<T>({
  page = 1,
  pageSize = 10,
  category,
  search,
  rating,
}: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
  rating?: number;
}) {
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(category && { category: String(category) }),
    ...(search && { search }),
    ...(rating && { rating: String(rating) }),
  });
  const headers = {
    apikey: API_KEY,
  };

  const url = `modules/noauth/filter?${queryParams}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: headers,
    maxRedirects: 5,
  };

  try {
    const response = await ClinisioApiService.fetchData<T>(axiosConfig);
    console.log(response.data);
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
}
