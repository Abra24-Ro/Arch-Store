import { ProductGrid, Title } from "@/src/components";
import { initialData } from "@/src/seed/seed";
import { CATEGORY_META, Category } from "@/src/types";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
  params: { id: string };
}

export default async function PageCategory({ params }: Props) {
  const { id } = await params;

  const meta = CATEGORY_META[id as Category];
  const products =
    id === "all" ? seedProducts : seedProducts.filter((p) => p.gender === id as Category);

  if (!meta || products.length === 0) notFound();

  return (
    <div className="page-container page-section">
      <Title title={meta.title} subtitle={meta.subtitle} />
      <ProductGrid products={products} />
    </div>
  );
}
