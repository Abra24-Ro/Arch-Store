"use client";

import { SizeSelector, QuantitySelector } from "@/src/components";
import { useCartStore } from "@/src/store";
import { CartProduct, Product, Size } from "@/src/types";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize]         = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    if (!size) {
      toast.error("Selecciona una talla antes de continuar");
      return;
    }

    const cartProduct: CartProduct = {
      id:       product.id,
      slug:     product.slug,
      title:    product.title,
      price:    product.price,
      quantity,
      sizes:    size,
      image:    product.images[0],
    };

    addProductToCart(cartProduct);

    // * Resetear selección tras agregar
    setSize(undefined);
    setQuantity(1);

    toast.success(`${product.title} agregado`, {
      description: `Talla ${size} · Cantidad ${quantity}`,
    });
  };

  return (
    <>
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <div style={{ height: "0.5px", background: "var(--color-border)" }} />

      <div className="flex flex-col gap-2">
        <button className="btn btn-primary w-full" onClick={addToCart}>
          Agregar al carrito
        </button>
        <button className="btn btn-secondary w-full flex items-center justify-center gap-2">
          <Heart size={14} strokeWidth={1.5} />
          Guardar en lista
        </button>
      </div>
    </>
  );
};