import React from "react";

export const ShippingInfoSkeleton = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "10px",
            borderRadius: "4px",
            background: "var(--color-bg-surface)",
          }}
        />
        <div
          style={{
            width: "44px",
            height: "10px",
            borderRadius: "4px",
            background: "var(--color-bg-surface)",
          }}
        />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "0.5px solid var(--color-border)",
          }}
        >
          <div
            style={{
              width: `${60 + i * 8}px`,
              height: "10px",
              borderRadius: "4px",
              background: "var(--color-bg-surface)",
            }}
          />
          <div
            style={{
              width: `${80 + i * 6}px`,
              height: "10px",
              borderRadius: "4px",
              background: "var(--color-bg-surface)",
            }}
          />
        </div>
      ))}
    </div>
  );
};
