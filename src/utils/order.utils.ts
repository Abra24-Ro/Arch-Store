import { Address, CartProduct, OrderItemMapped, Size } from "@/src/types";
import { getOrderById } from "../actions";
import { Prisma } from "../generated/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

interface ProductFromDB {
  id: string;
  title: string;
  price: number;
  inStock: number;
}

interface OrderTotals {
  subtotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
}

export const calculateOrderTotals = (
  productIds: ProductToOrder[],
  productsDB: ProductFromDB[],
): OrderTotals => {
  const subtotal = productIds.reduce((acc, item) => {
    const product = productsDB.find((p) => p.id === item.productId);
    if (!product) return acc;
    return acc + product.price * item.quantity;
  }, 0);

  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  const itemsInOrder = productIds.reduce((acc, item) => acc + item.quantity, 0);

  return { subtotal, tax, total, itemsInOrder };
};

export const getProductStock = (
  product: ProductFromDB,
  productIds: ProductToOrder[],
): number => {
  return productIds
    .filter((p) => p.productId === product.id)
    .reduce((count, p) => count + p.quantity, 0);
};

export const findOutOfStockProduct = (
  productsDB: ProductFromDB[],
  productIds: ProductToOrder[],
): ProductFromDB | undefined => {
  return productsDB.find((product) => {
    const ordered = getProductStock(product, productIds);
    return product.inStock < ordered;
  });
};

export const mapOrderItemsToCartProducts = (
  orderItems: OrderItemMapped[], // ← tipo propio, sin depender de getOrderById
): CartProduct[] =>
  orderItems.map((item) => ({
    id: item.product.slug,
    slug: item.product.slug,
    title: item.product.title,
    price: item.price,
    quantity: item.quantity,
    sizes: item.size,
    image: item.product.productImages[0]?.url ?? "",
  }));

type OrderAddress = Prisma.OrderAddressGetPayload<{}> | null;

export const mapOrderAddress = (
  orderAddress: OrderAddress,
): Partial<Address> | undefined => {
  if (!orderAddress) return undefined;

  return {
    firstName:  orderAddress.firstName,
    lastName:   orderAddress.lastName,
    address:    orderAddress.address,
    address2:   orderAddress.address2 ?? undefined,
    city:       orderAddress.city,
    postalCode: orderAddress.postalCode,
    phone:      orderAddress.phone,
    country:    orderAddress.countryId,
  };
};