"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md md:max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        {/* Custom card content with even padding */}
        <div className="p-6">
          {" "}
          {/* Even padding on all sides */}
          <ul className="space-y-6">
            {" "}
            {/* Increased spacing between items */}
            {items.map((item) => (
              <li key={item.id} className="border-b pb-6">
                {" "}
                {/* More padding at bottom */}
                <div className="flex gap-4">
                  {/* Image */}
                  {item.imageUrl && (
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-grow justify-center">
                    {" "}
                    {/* Added justify-center */}
                    {/* Mobile layout - stacked vertically with better spacing */}
                    <div className="flex flex-col space-y-3 md:space-y-0 md:grid md:grid-cols-[minmax(150px,1fr)_auto_auto] md:gap-6 md:items-center">
                      {/* Product name */}
                      <span className="font-medium text-base mb-1 md:mb-0 md:truncate md:pr-4">
                        {item.name}
                      </span>

                      {/* Quantity controls - centered on mobile */}
                      <div className="flex items-center gap-1 self-start md:self-auto md:justify-self-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => removeItem(item.id)}
                        >
                          –
                        </Button>
                        <span className="text-sm font-semibold min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => addItem({ ...item, quantity: 1 })}
                        >
                          +
                        </Button>
                      </div>

                      {/* Price - aligned left on mobile */}
                      <span className="font-semibold text-left mt-1 md:mt-0 md:w-24 md:justify-self-end">
                        €{((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Total aligned with price */}
          <div className="mt-6 pt-3 flex justify-between md:grid md:grid-cols-[minmax(150px,1fr)_auto_auto] md:gap-6 md:items-center">
            <div></div>
            <div className="font-bold text-base md:justify-self-center">
              Total:
            </div>
            <span className="text-lg font-bold md:w-24 md:justify-self-end">
              €{(total / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant="default" className="w-full">
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}
