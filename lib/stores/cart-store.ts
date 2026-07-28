import { create } from "zustand";
import { persist } from "zustand/middleware";

// The six event days per AGENT.md Section 1 (23–28 Nov 2026).
export type EventDay = "Day 1" | "Day 2" | "Day 3" | "Day 4" | "Day 5" | "Day 6";

/**
 * A single ticket line in the cart.
 *
 * This shape mirrors what will eventually be sent to
 * features/tickets/actions/create-ticket-order.ts (Section 7, Ticket
 * purchase flow) to create a `TicketOrder` + `Ticket` records. Keep this in
 * sync with that payload once the server action exists — do not redefine a
 * parallel shape there.
 */
export type CartTicketItem = {
  id: string;
  day: EventDay;
  date: string;
  title: string;
  quantity: number;
  price: number;
};

type NewCartTicketItem = Omit<CartTicketItem, "id" | "quantity">;

type CartState = {
  items: CartTicketItem[];
  addItem: (item: NewCartTicketItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

function makeId(day: EventDay, title: string) {
  return `${day}-${title}`.toLowerCase().trim().replace(/\s+/g, "-");
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set((state) => {
          const id = makeId(item.day, item.title);
          const existing = state.items.find((i) => i.id === id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, id, quantity }],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "synchub-ticket-cart", // localStorage key
    },
  ),
);

// Derived selectors — prefer these over recomputing totals inline so
// components only re-render when the specific value they read changes.
export const selectItemCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);