import {
  BackLink,
  CartSummary,
  OrderBadge,
  OrderHeader,
  OrderItemList,
  ShippingInfo,
  SummaryPanel,
} from "@/src/components";

import { initialData } from "@/src/seed/seed";

interface Props {
  params: { id: string };
}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

const address = {
  firstName:  "Santiago",
  lastName:   "Rodriguez",
  phone:      "123456789",
  address:    "123 Main St",
  city:       "San Francisco",
  state:      "California",
  postalCode: "94105",
  country:    "Estados Unidos",
};

// * Cambiar a false para ver estado pendiente
const isPaid = true;

export default async function PageOrderID({ params }: Props) {
  const { id } = await params;

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
        <OrderHeader id={id} isPaid={isPaid} />
        <OrderItemList products={productsInCart} />
      </div>

      <SummaryPanel>
        <ShippingInfo address={address} />
        <CartSummary products={productsInCart} />
        <OrderBadge isPaid={isPaid} />
      </SummaryPanel>

    </div>
  );
}