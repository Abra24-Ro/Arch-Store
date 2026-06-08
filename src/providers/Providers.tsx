"use client";

import {
  PayPalProvider,
  PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <PayPalProvider
      clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""}
      components={["paypal-payments", "paypal-guest-payments"]}
      pageType="checkout"
    >
      {children}
    </PayPalProvider>
  );
};
