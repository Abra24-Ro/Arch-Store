import { CATEGORY_META, Product } from "@/src/types";


interface ProductHeaderProps {
  product: Product;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  const category = CATEGORY_META[product.gender];

  return (
    <div className="flex flex-col gap-1">
      <p className="text-label">
        {category?.title ?? "Ropa"}
        {" · "}
        {product.tags?.[0] ?? "Ropa"}
      </p>
      <h1 className="text-h2" style={{ marginTop: "6px" }}>{product.title}</h1>
      <p className="text-price text-[22px]" style={{ marginTop: "4px" }}>${product.price}</p>
    </div>
  );
};