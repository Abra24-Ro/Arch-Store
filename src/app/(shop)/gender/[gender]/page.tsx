export  const revalidate = 60


import { getPaginationProductWithImages } from "@/src/actions";
import { Pagination, ProductGrid, Title } from "@/src/components";
import { Gender } from "@/src/generated/prisma";
import { CATEGORY_META } from "@/src/types";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function PageGender({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const meta = CATEGORY_META[gender as Gender];
  if (!meta) notFound();

  const { products, totalPages } = await getPaginationProductWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) redirect(`/gender/${gender}`);

  return (
    <div className="page-container page-section">
      <Title title={meta.title} subtitle={meta.subtitle} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
