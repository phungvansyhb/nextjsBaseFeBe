import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Prisma} from "@prisma/client";

/*TODO add persist middleware example here https://hackernoon.com/how-to-build-a-shopping-cart-with-nextjs-and-zustand-state-management-with-typescript */
export interface CartState {
  products: Array<Prisma.ProductCreateInput & { quantity: number }>;
  addProduct: (product: Prisma.ProductCreateInput) => void;
  reduceProduct: (product: Prisma.ProductCreateInput) => void;
  removeProduct: (product: Prisma.ProductCreateInput) => void;
  clearCart: () => void;
  items: number;
}

const useCartStore = create(
  persist<CartState>(
    (set) => ({
      products: [],
      items: 0,
      addProduct: (product: Prisma.ProductCreateInput) =>
        set((state) => {
          state.items++;
          const hasProduct = state.products.find((p) => p.id === product.id);
          if (hasProduct) {
            return {
              products: state.products.map((p) => {
                if (p.id === product.id) {
                  return { ...p, quantity: p.quantity + 1 };
                }
                return p;
              }),
            };
          } else {
            return {
              products: [...state.products, { ...product, quantity: 1 }],
            };
          }
        }),
      reduceProduct: (product: Prisma.ProductCreateInput) =>
        set((state) => {
          return {
            products: state.products
              .map((p) => {
                if (p.id === product.id) {
                  state.items--;
                  return { ...p, quantity: p.quantity - 1 };
                }
                return p;
              })
              .filter((p) => p.quantity > 0),
          };
        }),
      removeProduct: (product: Prisma.ProductCreateInput) =>
        set((state) => {
          const removedProd = state.products.find(
            (item) => item.id === product.id
          );
          return {
            products: state.products.filter((item) => item.id !== product.id),
            items: state.items - (removedProd?.quantity || 0),
          };
        }),
      clearCart: () =>
        set(() => {
          return {
            items: 0,
            products: [],
          };
        }),
    }),
    { name: "card-store" }
  )
);

export default useCartStore;
