"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { Address, Country, FIELDS } from "@/src/types";
import { ShippingInfoSkeleton } from "./skeletons/ShippingInfoSkeleton";
import { useHydration } from "@/src/hooks";
import { useAddressStore } from "@/src/store";

interface Props {
  countries?: Country[]; // opcional
  addressData?: Partial<Address>; // ← datos externos de la DB
  readOnly?: boolean;
}

export const ShippingInfo = ({
  countries = [],
  addressData,
  readOnly = false,
}: Props) => {
  const hydrated = useHydration();
  const storeAddress = useAddressStore((state) => state.address);

  if (!hydrated && !addressData) return <ShippingInfoSkeleton />;

  // ← si vienen datos externos los usa, sino usa el store
  const address = addressData ?? storeAddress;
  const countryName =
    countries.find((c) => c.id === address.country)?.name ?? address.country;

  if (!hydrated) return <ShippingInfoSkeleton />;

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
          }}
        >
          Datos de envío
        </p>
        {!readOnly && (
          <Link
            href="/checkout/address"
            className="link-edit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              color: "var(--color-text-tertiary)",
              letterSpacing: "0.08em",
              transition: "color 150ms ease",
            }}
          >
            <Pencil size={11} strokeWidth={1.5} />
            Editar
          </Link>
        )}
      </div>

      {/* Filas — solo los campos de FIELDS, en ese orden */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {FIELDS.filter(({ key }) => address[key]) // oculta address2 si está vacío
          .map(({ key, label }) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "0.5px solid var(--color-border)",
                fontSize: "13px",
              }}
            >
              <span style={{ color: "var(--color-text-tertiary)" }}>
                {label}
              </span>
              <span
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: 400,
                  textAlign: "right",
                  maxWidth: "60%",
                  wordBreak: "break-word",
                }}
              >
                {key === "country" ? countryName : address[key]}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
