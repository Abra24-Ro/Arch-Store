import {
  ProductHeader,
  QuantitySelector,
  SizeSelector,
  SlideShow,
  SlideShowMobile,
  TrustBadges,
} from "@/src/components";
import { initialData } from "@/src/seed/seed";
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";

interface Props {
  params: { slug: string };
}

export default async function PageProduct({ params }: Props) {
  const { slug } = await params;
  const product = initialData.products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Galería desktop — sticky compensa nav + barra de anuncio */}
      <div className="hidden md:block md:sticky md:top-[65px] md:h-[calc(100vh-65px)]">
        <SlideShow images={product.images} title={product.title} />
      </div>

      {/* Galería mobile */}
      <SlideShowMobile
        images={product.images}
        title={product.title}
        className="block md:hidden"
      />

      {/* Panel derecho */}
      <div className="flex justify-center bg-[#F5F4F2]">
        <div
          className="w-full max-w-lg px-8 sm:px-10 md:px-12 lg:px-14 flex flex-col gap-6"
          style={{ paddingTop: "48px", paddingBottom: "48px" }}
        >
          <ProductHeader product={product} />

          <div style={{ height: "0.5px", background: "var(--color-border)" }} />

          <SizeSelector
            selectedSize={product.sizes[0]}
            availableSizes={product.sizes}
          />

          <QuantitySelector quantity={1} />

          <div style={{ height: "0.5px", background: "var(--color-border)" }} />

          <div className="flex flex-col gap-2">
            <button className="btn btn-primary w-full">
              Agregar al carrito
            </button>
            <button className="btn btn-secondary w-full flex items-center justify-center gap-2">
              <Heart size={14} strokeWidth={1.5} />
              Guardar en lista
            </button>
          </div>

          <TrustBadges />

          <div className="flex flex-col gap-3">
            <p className="text-label">Descripción</p>
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.9,
              }}
            >
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
