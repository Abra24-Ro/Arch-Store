// CheckoutItemSkeleton.tsx
export const CheckoutItemSkeleton = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "20px 0",
        borderBottom: "0.5px solid var(--color-border)",
      }}
    >
      {/* Imagen */}
      <div
        style={{
          width: "80px",
          height: "100px",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-border)",
          flexShrink: 0,
        }}
        className="skeleton"
      />

      {/* Info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          paddingTop: "4px",
        }}
      >
        <div
          style={{
            height: "13px",
            width: "60%",
            borderRadius: "4px",
            background: "var(--color-border)",
          }}
          className="skeleton"
        />
        <div
          style={{
            height: "12px",
            width: "30%",
            borderRadius: "4px",
            background: "var(--color-border)",
          }}
          className="skeleton"
        />
        <div
          style={{
            height: "14px",
            width: "20%",
            borderRadius: "4px",
            background: "var(--color-border)",
            marginTop: "auto",
          }}
          className="skeleton"
        />
      </div>
    </div>
  );
};
