import { BackLink } from "@/src/components";
import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/get-session";
import { getAllProducts } from "@/src/actions";
import { ProductsList } from "./ui/ProductsList";

export default async function PageProductsAdmin() {
  const { isLoggedIn, user } = await getSession();

  if (!isLoggedIn) redirect("/auth/login?callbackUrl=/admin/products");
  if (user?.role !== "admin") redirect("/");

  const { status, products } = await getAllProducts();

  if (status !== "success") redirect("/");
  return (
    <div
      className="page-container"
      style={{ paddingTop: "40px", paddingBottom: "80px" }}
    >
      <BackLink href="/admin" label="Panel admin" />

      <div style={{ marginBottom: "32px" }}>
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
          Todos los productos
        </h1>
        <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
          {products.length === 0
            ? "No hay productos aún"
            : `${products.length} productos`}
        </p>
      </div>

      {products.length === 0 ? (
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-tertiary)",
            paddingTop: "60px",
            textAlign: "center",
          }}
        >
          No hay productos registrados.
        </p>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}
