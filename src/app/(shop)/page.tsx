// page.tsx
import { ProductGrid, Title } from "@/src/components";
import { initialData } from "@/src/seed/seed";


const products = initialData.products;

export default function Home() {
  return (
    <div className="page-container page-section"> 
      <Title title="Tienda" subtitle="Encuentra lo que buscas" />
      <ProductGrid products={products} />
    </div>
  );
}