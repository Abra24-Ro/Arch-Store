import { getOrderById } from "@/src/actions";
import {
  BackLink,
  CartSummary,
  OrderBadge,
  OrderHeader,
  OrderItemList,
  PaypalButton,
  ShippingInfo,
  SummaryPanel,
} from "@/src/components";

import { mapOrderAddress, mapOrderItemsToCartProducts } from "@/src/utils";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function PageOrderID({ params }: Props) {
  const { id } = await params;
  const { status, order } = await getOrderById(id);

  if (!order || status !== "success") redirect("/orders");

  const products = mapOrderItemsToCartProducts(order.orderItems); // ← mapeo limpio

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-screen">
      <div
        className="page-container"
        style={{
          paddingTop: "40px",
          paddingBottom: "40px",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <BackLink href="/orders" label="Mis pedidos" />
        <OrderHeader
          id={id}
          isPaid={order.isPaid}
          createdAt={order.createdAt}
           paidAt={order.paidAt}

        />
        <OrderItemList products={products} />
      </div>

      <SummaryPanel>
        <ShippingInfo
          addressData={mapOrderAddress(order.orderAddress)}
          readOnly
        />
        <CartSummary
          data={{
            subtotal: order.subTotal,
            tax: order.tax,
            total: order.total,
            itemsInCart: order.itemsInOrder,
          }}
        />

        {/* ← condicional según estado de pago */}
        {order.isPaid ? (
          <OrderBadge isPaid />
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {/* Separador */}
            <div
              style={{ height: "0.5px", background: "var(--color-border)" }}
            />

            <p
              style={{
                fontSize: "11px",
                color: "var(--color-text-tertiary)",
                textAlign: "center",
                letterSpacing: "0.06em",
              }}
            >
              Selecciona un método de pago
            </p>

            <PaypalButton orderId={order.id} amount={order.total} />

            <p
              style={{
                fontSize: "11px",
                color: "var(--color-text-tertiary)",
                textAlign: "center",
                letterSpacing: "0.06em",
              }}
            >
              Pago seguro · SSL encriptado
            </p>
          </div>
        )}
      </SummaryPanel>
    </div>
  );
}
