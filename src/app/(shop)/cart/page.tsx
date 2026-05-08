
import {  CartItemList, CartSummary, SummaryPanel } from "@/src/components";
import { initialData } from "@/src/seed/seed";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function PageCart() {
  if (productsInCart.length === 0) return redirect("/empty");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-screen">
      <CartItemList products={productsInCart} />

      <SummaryPanel>
        <CartSummary products={productsInCart} />

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link href="/checkout/address">
            <button className="btn btn-primary w-full">
              Proceder al pago
            </button>
          </Link>
          <p style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            textAlign: "center",
            letterSpacing: "0.06em",
          }}>
            Pago seguro · SSL encriptado
          </p>
        </div>
      </SummaryPanel>
    </div>
  );
}