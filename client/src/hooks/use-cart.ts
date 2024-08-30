"use client";
import { ICartItem } from "@/types/cart";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: ICartItem[];
  addItem: (item: ICartItem) => void;
  removeItem: (id: string) => void;
  removeAllItems: () => void;
  insceaseQuantityItem: (id: string) => void;
  desceaseQuantityItem: (id: string) => void;
  changeQuantityItem: (id: string, quantity: number) => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => {
      return {
        items: [],
        addItem: (data: ICartItem) => {
          const currentItems = get().items;
          const existingItem = currentItems.find((item) => item.id === data.id);

          if (existingItem) {
            const quantity = existingItem?.quantity + data.quantity;
            const updatedItems = currentItems.map((item) =>
              item.id === data.id ? { ...item, quantity } : item
            );

            set({ items: updatedItems });
            toast.success("Your cart quantity updated!");
          } else {
            set({ items: [...currentItems, data] });
            toast.success("Item added to cart successfully");
          }
        },
        removeItem: (id: string) => {
          set({
            items: get().items.filter((item) => item.id !== id),
          });
          toast("Item removed successfully!");
        },
        removeAllItems: () => {
          set({ items: [] });
        },
        insceaseQuantityItem: (id: string) => {
          const currentItems = get().items;
          const updatedItems = currentItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
          set({ items: updatedItems });
        },
        desceaseQuantityItem: (id: string) => {
          const currentItems = get().items;
          const updatedItems = currentItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
          set({ items: updatedItems });
        },
        changeQuantityItem: (id: string, quantity: number) => {
          const currentItems = get().items;
          const updatedItems = currentItems.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          );
          set({ items: updatedItems });
        },
      };
    },
    {
      name: "cart-storage",
    }
  )
);
