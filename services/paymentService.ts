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
