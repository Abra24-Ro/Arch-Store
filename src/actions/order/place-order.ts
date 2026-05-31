"use server";

import { auth } from "@/src/auth";
import { prisma } from "@/src/lib/prisma";
import { addressSchema } from "@/src/schemas";
import { Address, Size } from "@/src/types";
import {
  calculateOrderTotals,
  findOutOfStockProduct,
  getProductStock,
} from "@/src/utils";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "Usuario no autenticado" };
  }

  const parsed = addressSchema.safeParse(address);
  if (!parsed.success) {
    return { success: false, message: "Dirección inválida" };
  }

  // 1. Obtener productos de la DB
  const products = await prisma.product.findMany({
    where: { id: { in: productIds.map((p) => p.productId) } },
    select: { id: true, title: true, price: true, inStock: true },
  });

  // 2. Verificar stock ANTES de la transacción
  const outOfStock = findOutOfStockProduct(products, productIds);
  if (outOfStock) {
    return {
      success: false,
      message: `Sin stock suficiente para "${outOfStock.title}"`,
    };
  }

  // 3. Calcular totales
  const { subtotal, tax, total, itemsInOrder } = calculateOrderTotals(
    productIds,
    products,
  );

  // 4. Transacción
  try {
    const { order } = await prisma.$transaction(async (tx) => {
      // 4a. Decrementar stock
      await Promise.all(
        products.map((product) =>
          tx.product.update({
            where: { id: product.id },
            data: {
              inStock: { decrement: getProductStock(product, productIds) },
            },
          }),
        ),
      );

      // 4b. Crear orden
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal: subtotal,
          tax,
          total,
          orderItems: {
            createMany: {
              data: productIds.map((item) => ({
                quantity: item.quantity,
                size: item.size,
                productId: item.productId,
                price:
                  products.find((p) => p.id === item.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // 4c. Crear dirección de la orden
      const { country, ...restAddress } = parsed.data;
      await tx.orderAddress.create({
        data: { ...restAddress, countryId: country, orderId: order.id },
      });

      return { order };
    });

    return {
      success: true,
      orderId: order.id, // ← solo el id, no el objeto completo
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
