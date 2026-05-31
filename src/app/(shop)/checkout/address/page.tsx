import { BackLink } from "@/src/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "@/src/actions/country/get-countries";
import { getSession } from "@/src/lib/get-session";
import { redirect } from "next/navigation";
import { getUserAddress } from "@/src/actions";

export default async function AddressPage() {
  const [countries, { isLoggedIn, user }] = await Promise.all([
    getCountries(),
    getSession(),
  ]);

  if (!isLoggedIn) redirect("/auth/login");

  const userAddress = await getUserAddress(user!.id);

  return (
    <div
      className="page-container"
      style={{ paddingTop: "40px", paddingBottom: "80px" }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <BackLink href="/cart" label="Volver al carrito" />

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
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
            Dirección de entrega
          </h1>
          <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
            ¿A dónde enviamos tu pedido?
          </p>
        </div>

        {/* Formulario */}
        <AddressForm
          countries={countries}
          userId={user!.id}
          userStoredAddress={userAddress ?? undefined}
        />
      </div>
    </div>
  );
}
