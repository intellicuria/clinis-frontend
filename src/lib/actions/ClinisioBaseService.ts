import axios from "axios";
import appConfig from "@/configs/app.config";
import {
  TOKEN_TYPE,
  REQUEST_HEADER_AUTH_KEY,
  DEV_SERVER_URL,
  PROD_SERVER_URL,
} from "@/constants/api.constants";
import { PERSIST_STORE_NAME } from "@/constants/app.constant";
import deepParseJson from "@/utils/deepParseJson";
import store, { signOutSuccess } from "@/store";

const unauthorizedCode = [401];

const ClinisioBaseService = axios.create({
  timeout: 60000,
  baseURL: PROD_SERVER_URL,
});
ClinisioBaseService.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
    const persistData = deepParseJson(rawPersistData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let accessToken = (persistData as any).auth.session.token;

    if (!accessToken) {
      const { auth } = store.getState();
      accessToken = auth.session.token;
    }

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }
    console.log(config);
    console.log(accessToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ClinisioBaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(signOutSuccess());
      throw new Error("Session expired. Please login again.");
    }

    return Promise.reject(error);
  }
);

export default ClinisioBaseService;