export  const revalidate = 60
// page.tsx
import { getPaginationProductWithImages } from "@/src/actions";
import { Pagination, ProductGrid, Title } from "@/src/components";
import { CATEGORY_META } from "@/src/types";
import { redirect } from "next/navigation";

// page.tsx
interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const meta = CATEGORY_META["all"];
  const { page: pageParam } = await searchParams;  // ← await aquí
  const page = pageParam ? Number(pageParam) : 1;
  
  const { products,totalPages } = await getPaginationProductWithImages({ page });




  if(products.length === 0){
    return redirect("/")
  }

  return (
    <div className="page-container page-section">
      <Title title={meta.title} subtitle={meta.subtitle} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}