// page.tsx
import { ProductGrid, Title } from "@/src/components";
import { initialData } from "@/src/seed/seed";
import { CATEGORY_META } from "@/src/types";

const products = initialData.products;

export default function Home() {
  const meta = CATEGORY_META["all"];

  return (
    <div className="page-container page-section">
      <Title title={meta.title} subtitle={meta.subtitle} />
      <ProductGrid products={products} />
    </div>
  );
}
