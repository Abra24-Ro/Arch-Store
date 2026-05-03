import { Product } from "@/src/types";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "2px",
        background: "var(--color-border)",
        marginTop: "32px",
      }}
    >
      {products.map((product) => (
        <div
          key={product.slug}
          style={{ background: "var(--color-bg)" }}
        >
          <ProductGridItem product={product} />
        </div>
      ))}
    </div>
  );
};