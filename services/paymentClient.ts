import axios from "axios";
import { Constants } from "../common/constants";

export const paymentClient = axios.create({
  baseURL: Constants.PaymentServiceURI,
});

paymentClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

paymentClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response.data);
    return Promise.reject(error);
  }
);
