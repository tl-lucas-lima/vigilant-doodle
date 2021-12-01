import axios from "axios";
import { Constants } from "../common/constants";

export const apiClient = axios.create({
  baseURL: Constants.TelegramAPI,
});

apiClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response.data);
    return Promise.reject(error);
  }
);
