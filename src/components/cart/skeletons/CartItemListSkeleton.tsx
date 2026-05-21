import { SkeletonBox } from "./SkeletonBox";

export const CartItemListSkeleton = () => (
  <div className="page-container" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
    <SkeletonBox width={140} height={12} />
    <div style={{ marginTop: "32px", marginBottom: "8px" }}>
      <SkeletonBox width={80} height={22} />
    </div>
    <div style={{ marginBottom: "36px" }}>
      <SkeletonBox width={60} height={12} />
    </div>

    {[1, 2].map((i) => (
      <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", paddingBottom: "24px", marginBottom: "24px", borderBottom: "0.5px solid var(--color-border)" }}>
        <SkeletonBox width={80} height={80} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
          <SkeletonBox width="55%" height={13} />
          <SkeletonBox width={60} height={11} />
          <SkeletonBox width={50} height={13} />
        </div>
        <SkeletonBox width={100} height={36} />
      </div>
    ))}
  </div>
);