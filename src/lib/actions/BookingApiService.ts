import axios, { AxiosRequestConfig } from "axios";
import { PROD_SERVER_URL } from "@/constants/api.constants";
import { Response } from "@/types/module.types";
import ClinisioApiService from "./ClinisioApiService";

const API_KEY = "123";

/**
 * Fetches doctor information from the Clinisio API.
 *
 * @param doctorId - The ID of the doctor to retrieve information for.
 * @returns A promise that resolves with the doctor information.
 */
export async function getAllDoctor<T>(): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/doctors/clinis/get-all-doctor/`;
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
    console.error("Error fetching doctor information:", error);
    throw error;
  }
}
export async function getAllOrganizations<T>(): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/organizations/clinis/get-all-organizations/`;
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
    console.error("Error fetching doctor information:", error);
    throw error;
  }
}
export async function getDoctor<T>(username: string): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/doctors/clinis/get-doctor/${username}`;
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
    console.error("Error fetching doctor information:", error);
    throw error;
  }
}

export async function getWorkspaces<T>(doctorId: string): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/workspaces/clinis/get-workspaces/${doctorId}`;
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

export async function getOrg<T>(organizationId: string): Promise<T> {
  const headers = {
    apikey: API_KEY,
    "Content-Type": "application/json", // Ensure the body is sent as JSON
  };

  const url = `${PROD_SERVER_URL}/organizations/clinis/org/${organizationId}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET", // Change the method to POST
    headers,

    maxRedirects: 5,
  };

  try {
    const response = await axios(axiosConfig); // Use axios directly instead of a custom service method
    return response.data;
  } catch (error) {
    console.error("Error fetching organization details:", error);
    throw error;
  }
}

export async function getOrgWorkspaces<T>(organizationId: string): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/workspaces/clinis/org/get-workspaces/${organizationId}`;
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
export async function getSlots<T>(
  doctorId: number,
  workspaceId: string,
  body: any
): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/slots/clinis/all/slots/${doctorId}/${workspaceId}`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "POST",
    data: body,
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

export async function bookAppointment<T>(body: any): Promise<T> {
  const headers = {
    apikey: API_KEY,
  };

  const url = `${PROD_SERVER_URL}/appointment/clinis/book-appointment`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "POST",
    data: body,
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
