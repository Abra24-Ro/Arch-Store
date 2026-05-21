import { CartItemList, CartSummary, SummaryPanel } from "@/src/components";
import Link from "next/link";

export default function PageCart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-screen">
      <CartItemList />

      <SummaryPanel>
        <CartSummary />

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link href="/checkout/address">
            <button className="btn btn-primary w-full">Proceder al pago</button>
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