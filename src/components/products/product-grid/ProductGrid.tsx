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
        marginTop: "32px",
      }}
    >
      {products.map((product) => (
        <div
          key={product.slug}
          style={{
            borderRight: "0.5px solid var(--color-border)",
            borderBottom: "0.5px solid var(--color-border)",
          }}
        >
          <ProductGridItem product={product} />
        </div>
      ))}
    </div>
  );
};