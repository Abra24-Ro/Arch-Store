import { Size } from "./product.interface";

export interface OrderItemMapped {
  price: number;
  quantity: number;
  size: Size;
  product: {
    title: string;
    slug: string;
    productImages: { url: string }[];
  };
}

export interface OrderSummary {
  id: string;
  isPaid: boolean;
  total: number;
  createdAt: Date;
  orderAddress: {
    firstName: string;
    lastName: string;
  } | null;
}
