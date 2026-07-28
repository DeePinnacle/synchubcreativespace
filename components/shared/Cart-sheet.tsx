"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useCartStore,
  selectItemCount,
  selectSubtotal,
} from "@/lib/stores/cart-store";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  month: "short",
  day: "numeric",
});

export function CartSheet() {
  const [open, setOpen] = useState(false);

//   const items = useCartStore((state) => state.items);
//   const updateQuantity = useCartStore((state) => state.updateQuantity);
//   const removeItem = useCartStore((state) => state.removeItem);
const subtotal = useCartStore(selectSubtotal);
const itemCount = useCartStore(selectItemCount);
const { 
    items,
    removeItem,
    updateQuantity
} = useCartStore()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-off-white transition-colors hover:bg-white/5"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-linear-to-r from-primary to-secondary px-1 text-[11px] font-semibold leading-none text-white">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col bg-muted-gray">
        <SheetHeader>
          <SheetTitle className="font-display text-off-white">Your Cart</SheetTitle>
          <SheetDescription className="text-off-white">
            Review your selected tickets before checkout.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingCart className="h-10 w-10 text-off-white" />
            <p className="text-sm text-off-white">Your cart is empty.</p>
            <SheetClose asChild>
              <Link
                href="/schedule"
                className="bg-linear-to-r from-primary to-secondary bg-clip-text text-sm font-semibold text-transparent"
              >
                Browse the Events
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-1 py-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border p-3"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-linear-to-r from-primary to-secondary px-2 py-0.5 text-[11px] font-semibold text-white">
                        {item.day}
                      </span>
                      <span className="text-xs text-off-white">
                        {dateFormatter.format(new Date(item.date))}
                      </span>
                    </div>

                    <span className="text-sm font-medium text-off-white">{item.title}</span>
                    <span className="text-xs text-off-white">
                      {currency.format(item.price)} each
                    </span>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-off-white hover:bg-white/5"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm text-off-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-off-white hover:bg-white/5"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch">
                    <span className="text-sm font-semibold text-off-white">
                      {currency.format(item.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${item.title}`}
                      onClick={() => removeItem(item.id)}
                      className="text-muted-gray transition-colors hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="flex flex-col gap-3 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-off-white">Subtotal</span>
                <span className="font-semibold text-off-white">
                  {currency.format(subtotal)}
                </span>
              </div>
              {/* TODO: point at the real checkout route once
                  features/tickets/actions/create-ticket-order.ts (Section 7)
                  exists — that action should read useCartStore().items,
                  post them to the server, then call clearCart() on success. */}
              <SheetClose asChild>
                <Link
                  href="/events/checkout"
                  className="group inline-flex items-center justify-center rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(76,175,80,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  Proceed to Checkout
                </Link>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}