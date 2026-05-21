import { SkeletonBox } from "./SkeletonBox";

export const CartSummarySkeleton = () => (
  <div>
    <div style={{ marginBottom: "24px" }}>
      <SkeletonBox width={70} height={11} />
    </div>

    {[1, 2, 3].map((i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid var(--color-border)" }}>
        <SkeletonBox width={90} height={12} />
        <SkeletonBox width={55} height={12} />
      </div>
    ))}

    <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0" }}>
      <SkeletonBox width={40} height={15} />
      <SkeletonBox width={70} height={15} />
    </div>
  </div>
);