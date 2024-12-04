import WordpressBaseService from "./WordpressBaseService";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const WordPressApiService = {
  fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>
  ) {
    return new Promise<AxiosResponse<Response>>((resolve, reject) => {
      WordpressBaseService(param)
        .then((response: AxiosResponse<Response>) => {
          resolve(response);
        })
        .catch((errors: AxiosError) => {
          reject(errors);
        });
    });
  },
};

export default WordPressApiService;
