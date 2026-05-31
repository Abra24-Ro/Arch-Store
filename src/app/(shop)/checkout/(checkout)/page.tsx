import {
  BackLink,
  CartSummary,
  ShippingInfo,
  SummaryPanel,
} from "@/src/components";
import Link from "next/link";
import { CheckoutProductList } from "./ui/CheckoutProductList";
import { PlaceOrderButton } from "@/src/components/checkout/PlaceOrderButton";
import { getCountries } from "@/src/actions";

// * Datos de envío hardcodeados — luego vendrán del store/sesión

export default async function PageCheckout() {
  
  const countries = await getCountries();
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

        <CheckoutProductList />
      </div>

      <SummaryPanel>
        <ShippingInfo countries={countries} />
        <CartSummary />

        <PlaceOrderButton />
      </SummaryPanel>
    </div>
  );
}
