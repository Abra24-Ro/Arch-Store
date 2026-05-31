"use client";

import { useAddressStore, useCartStore } from "@/src/store";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { placeOrder } from "@/src/actions";
import { useRouter } from "next/navigation";

export const PlaceOrderButton = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const router = useRouter();
  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart); // ← del store

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const productsToOrder = cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.sizes,
      }));

      const resp = await placeOrder(productsToOrder, address);

      if (!resp.success) {
        toast.error(resp.message ?? "No se pudo confirmar el pedido.");
        return;
      }

      // ← redirigir ANTES de limpiar
      toast.success("Pedido confirmado.");
      router.replace(`/checkout/confirmed/${resp.orderId}`);
    } catch {
      toast.error("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <motion.button
        onClick={onPlaceOrder}
        disabled={isPlacingOrder}
        className="btn btn-primary w-full"
        whileTap={!isPlacingOrder ? { scale: 0.98 } : {}}
        style={{
          opacity: isPlacingOrder ? 0.7 : 1,
          cursor: isPlacingOrder ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {isPlacingOrder && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={14} strokeWidth={1.5} />
          </motion.div>
        )}
        {isPlacingOrder ? "Confirmando..." : "Confirmar pedido"}
      </motion.button>

      <p
        style={{
          fontSize: "11px",
          color: "var(--color-text-tertiary)",
          textAlign: "center",
          letterSpacing: "0.06em",
        }}
      >
        Pago seguro · SSL encriptado
      </p>
    </div>
  );
};
