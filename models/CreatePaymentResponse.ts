export interface CreatePaymentResponse {
  hpp_url: string;
  id: string;
  amount_in_minor: number;
  currency: string;
  beneficiary: Beneficiary;
  user: User;
  payment_method: PaymentMethod;
  resource_token: string;
  status: string;
  created_at: Date;
}

interface Beneficiary {
  type: string;
  scheme_identifier: SchemeIdentifier;
  name: string;
  reference: string;
}

interface SchemeIdentifier {
  type: string;
  sort_code: string;
  account_number: string;
}

interface PaymentMethod {
  type: string;
  statement_reference: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
