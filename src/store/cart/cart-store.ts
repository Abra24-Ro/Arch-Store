import { CartProduct } from "@/src/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subtotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getSummaryInformation: () => {
        const { cart } = get();
        const subtotal = cart.reduce(
          (subtotal, product) => product.quantity * product.price + subtotal,
          0,
        );
        const tax = subtotal * 0.18;
        const total = subtotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0,
        );

        return {
          subtotal,
          tax,
          total,
          itemsInCart,
        };
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // * 1. Revisar si el producto existe con la misma talla
        const productInCart = cart.some(
          (item) => item.id === product.id && item.sizes === product.sizes,
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // * 2. El producto ya existe con esa talla — incrementar cantidad
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.sizes === product.sizes) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCart });
      },

      //* Modificar el carrito

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.sizes === product.sizes) {
            return {
              ...item,
              quantity: quantity,
            };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },

      //eliminar del cart
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.sizes !== product.sizes,
        );
        set({ cart: updatedCartProducts });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shopping-cart",
    },
  ),
);
