import ClinisioBaseService from "./ClinisioBaseService";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const ClinisioApiService = {
  fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>
  ) {
    return new Promise<AxiosResponse<Response>>((resolve, reject) => {
      ClinisioBaseService(param)
        .then((response: AxiosResponse<Response>) => {
          resolve(response);
        })
        .catch((errors: AxiosError) => {
          reject(errors);
        });
    });
  },
};

export default ClinisioApiService;
