import { getOrderById } from "@/src/actions";
import {
  BackLink,
  CartSummary,
  OrderBadge,
  OrderHeader,
  OrderItemList,
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
        <OrderBadge isPaid={order.isPaid} />
      </SummaryPanel>
    </div>
  );
}
