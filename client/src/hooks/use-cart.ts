import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@shared/schema";

interface CartStore {
  items: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (id: string, size?: string, color?: string) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addToCart: (newItem) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) =>
            item.id === newItem.id &&
            item.size === newItem.size &&
            item.color === newItem.color
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...items, newItem] });
        }
        
        get().calculateTotal();
      },

      updateQuantity: (id, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeFromCart(id, size, color);
          return;
        }

        const { items } = get();
        const updatedItems = items.map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity }
            : item
        );
        
        set({ items: updatedItems });
        get().calculateTotal();
      },

      removeFromCart: (id, size, color) => {
        const { items } = get();
        const updatedItems = items.filter(
          (item) =>
            !(item.id === id && item.size === size && item.color === color)
        );
        
        set({ items: updatedItems });
        get().calculateTotal();
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      },

      calculateTotal: () => {
        const { items } = get();
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        set({ total });
      },
    }),
    {
      name: "sky-pants-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.calculateTotal();
        }
      },
    }
  )
);
