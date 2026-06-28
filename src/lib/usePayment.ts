"use client";

import { usePaymentContext } from "@/components/PaymentProvider";

export function usePayment() {
  const { initiatePayment } = usePaymentContext();
  return () => initiatePayment(99);
}

