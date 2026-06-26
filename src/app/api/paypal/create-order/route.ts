"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// * PayPal sandbox URL — cambiar a producción cuando sea necesario
const PAYPAL_API =
  process.env.PAYPAL_API_URL ?? "https://api-m.sandbox.paypal.com";

// * Obtener token de acceso de PayPal
const getPayPalToken = async (): Promise<string> => {
  const credentials = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
  ).toString("base64");

  const resp = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
  });

  const { access_token } = await resp.json();
  return access_token;
};

export async function POST(req: NextRequest) {
  try {
    // 1. Leer el body
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "orderId requerido" }, { status: 400 });
    }

    // 2. Buscar la orden en la DB
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { total: true, isPaid: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 },
      );
    }

    if (order.isPaid) {
      return NextResponse.json(
        { error: "La orden ya está pagada" },
        { status: 400 },
      );
    }

    // 3. Obtener token de PayPal
    const token = await getPayPalToken();

    // 4. Crear la orden en PayPal
    const resp = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            invoice_id: `${orderId}-${Date.now()}`, // ← tu orderId interno como referencia
            amount: {
              currency_code: "USD",
              value: order.total.toFixed(2),
            },
          },
        ],
      }),
    });

    const paypalOrder = await resp.json();

    // 5. Retornar el orderId de PayPal al cliente
    return NextResponse.json({ orderId: paypalOrder.id });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error creating PayPal order:", error);
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
