import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

const PAYPAL_API =
  process.env.PAYPAL_API_URL ?? "https://api-m.sandbox.paypal.com";

// * Mismo helper que en create-order — obtener token de PayPal
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
    // 1. Leer el body — paypalOrderId viene del onApprove del SDK
    const { paypalOrderId } = await req.json();

    if (!paypalOrderId) {
      return NextResponse.json(
        { error: "paypalOrderId requerido" },
        { status: 400 },
      );
    }

    // 2. Obtener token de PayPal
    const token = await getPayPalToken();

    // 3. Capturar el pago en PayPal
    // * Aquí es donde el dinero realmente se mueve
    const resp = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const captureData = await resp.json();

    console.log(
      "PayPal capture response:",
      JSON.stringify(captureData, null, 2),
    );

    // 4. Verificar que el pago fue exitoso
    if (captureData.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "El pago no fue completado" },
        { status: 400 },
      );
    }

    // 5. Obtener el invoice_id — tu orderId interno que guardaste en create-order

    const { invoice_id } = captureData.purchase_units[0].payments.captures[0];
    const dbOrderId = (invoice_id as string).substring(
      0,
      invoice_id.lastIndexOf("-"),
    );

    if (!invoice_id) {
      return NextResponse.json(
        { error: "No se encontró el invoice_id" },
        { status: 400 },
      );
    }

    // 6. Actualizar la orden en tu DB
    await prisma.order.update({
      where: { id: dbOrderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        transactionId: paypalOrderId, // ← el id de PayPal como referencia
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
