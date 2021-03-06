import { BasicPaymentRequest } from "../models/BasicPaymentRequest";
import { CreatePaymentResponse } from "../models/CreatePaymentResponse";
import { paymentClient } from "./paymentClient";

export const createPayment = async (
  request: BasicPaymentRequest
): Promise<CreatePaymentResponse> => {
  const res = await paymentClient.post<CreatePaymentResponse>(
    "/v3/payment",
    request
  );
  return res.data;
};

export const getPayment = async (paymentId: string): Promise<CreatePaymentResponse> => {
  const res = await paymentClient.get(`/v3/payment/${paymentId}`);
  return res.data;
};
