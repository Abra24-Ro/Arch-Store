"use client";

import {
  PayPalOneTimePaymentButton,
  PayPalGuestPaymentButton,
  usePayPal,
  INSTANCE_LOADING_STATE,
} from "@paypal/react-paypal-js/sdk-v6";
import type {
  OnApproveDataOneTimePayments,
  OnCancelDataOneTimePayments,
  OnErrorData,
  OnCompleteData,
} from "@paypal/react-paypal-js/sdk-v6";
import { toast } from "sonner";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const { loadingStatus, error } = usePayPal();

  const roundedAmount = amount.toFixed(2);

  if (loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <div
          className="skeleton"
          style={{
            height: "52px",
            borderRadius: "var(--radius-md)",
            background: "#F5BB30",
            opacity: 0.4,
          }}
        />
        <div
          className="skeleton"
          style={{
            height: "52px",
            borderRadius: "var(--radius-md)",
            background: "var(--color-text-primary)",
            opacity: 0.08,
          }}
        />
      </div>
    );
  }

  if (error || loadingStatus === INSTANCE_LOADING_STATE.REJECTED) {
    return (
      <p
        style={{
          fontSize: "13px",
          color: "var(--color-error)",
          textAlign: "center",
        }}
      >
        No se pudo cargar PayPal. Intenta de nuevo.
      </p>
    );
  }

  const createOrder = async () => {
    const resp = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ← falta el header
      body: JSON.stringify({ orderId, amount: roundedAmount }),
    });
    const data = await resp.json();
    return { orderId: data.orderId };
  };

  const onApprove = async () => {
    return async ({ orderId: paypalOrderId }: OnApproveDataOneTimePayments) => {
      const resp = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paypalOrderId }),
      });

      const data = await resp.json();

      if (!data.success) {
        toast.error("No se pudo completar el pago.");
        return;
      }

      toast.success("¡Pago completado!");
      // ← recargar la página para mostrar el estado actualizado
      window.location.reload();
    };
  };
  const handlers = {
    createOrder,
    onApprove: async ({
      orderId: paypalOrderId,
    }: OnApproveDataOneTimePayments) => {
      const resp = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paypalOrderId }),
      });

      const data = await resp.json();

      if (!data.success) {
        toast.error("No se pudo completar el pago.");
        return;
      }

      toast.success("¡Pago completado!");
      // ← recargar la página para mostrar el estado actualizado
      window.location.reload();
    },
    onCancel: (_data: OnCancelDataOneTimePayments) => {
      toast.info("Pago cancelado.");
    },
    onError: (data: OnErrorData) => {
      toast.error("Ocurrió un error con el pago.");
      console.error("PayPal error:", data);
    },
    onComplete: (data: OnCompleteData) => {
      console.log("Flujo completado:", data);
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      <PayPalOneTimePaymentButton presentationMode="auto" {...handlers} />
      <PayPalGuestPaymentButton {...handlers} />
    </div>
  );
};
