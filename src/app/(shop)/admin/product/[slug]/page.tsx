// page.tsx
import { BackLink } from "@/src/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories, getProductSlug } from "@/src/actions";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const isNew = slug === "new";

  const [categories, product] = await Promise.all([
    getCategories(),
    isNew ? Promise.resolve(null) : getProductSlug(slug), // ← no busca si es nuevo
  ]);

  if (!product && !isNew) redirect("/admin/products");

  return (
    <div
      className="page-container"
      style={{ paddingTop: "40px", paddingBottom: "80px" }}
    >
      <BackLink href="/admin/products" label="Todos los productos" />

      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "22px",
          fontWeight:    500,
          letterSpacing: "-0.02em",
          color:         "var(--color-text-primary)",
          marginBottom:  "4px",
        }}>
          {isNew ? "Nuevo producto" : "Editar producto"}
        </h1>
        {!isNew && (
          <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
            {slug}
          </p>
        )}
      </div>

      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
}