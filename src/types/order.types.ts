import { Size } from "./product.interface";

export interface OrderItemMapped {
  price:    number;
  quantity: number;
  size:     Size;
  product: {
    title:         string;
    slug:          string;
    productImages: { url: string }[];
  };
}