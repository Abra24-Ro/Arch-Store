import {
  BackLink,
  CartItem,
  CartSummary,
  ShippingInfo,
  SummaryPanel,
} from "@/src/components";
import { initialData } from "@/src/seed/seed";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

// * Datos de envío hardcodeados — luego vendrán del store/sesión
const address = {
  firstName: "Santiago",
  lastName: "Rodriguez",
  phone: "123456789",
  address: "123 Main St",
  city: "San Francisco",
  state: "California",
  postalCode: "94105",
  country: "Estados Unidos",
};

export default function PageCheckout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-screen">
      {/* Items */}
      <div
        className="page-container"
        style={{
          paddingTop: "40px",
          paddingBottom: "40px",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <BackLink href="/cart" label="Volver al carrito" />

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            marginBottom: "4px",
          }}
        >
          Verificar pedido
        </h1>

        <p
          style={{
            fontSize: "13px",
            color: "var(--color-text-tertiary)",
            marginBottom: "32px",
          }}
        >
          {productsInCart.length}{" "}
          {productsInCart.length === 1 ? "producto" : "productos"}
        </p>

        <AnimatePresence initial={false}>
          {productsInCart.map((product, i) => (
            <CartItem key={product.slug} product={product} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Panel derecho — datos de envío + resumen + confirmar */}
      <SummaryPanel>
        <ShippingInfo address={address} />
        <CartSummary products={productsInCart} />

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link href="/orders/adf" className="btn btn-primary w-full">Confirmar pedido</Link>
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
      </SummaryPanel>
    </div>
  );
}
