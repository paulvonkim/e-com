// "use client";

// import Stripe from "stripe";
// import { Card, CardContent, CardTitle } from "./ui/card";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// interface Props {
//   products: Stripe.Product[];
// }

// export const Carousel = ({ products }: Props) => {
//   // Early return if products is empty
//   if (!products || products.length === 0) {
//     return <div>No products available</div>;
//   }

//   const [current, setCurrent] = useState<number>(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % products.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [products.length]);

//   // Get the current product safely
//   const currentProduct = products[current];

//   // Safely access the price (if it exists)
//   const price = currentProduct?.default_price as Stripe.Price | undefined;

//   if (!currentProduct) {
//     return <div>Loading product...</div>;
//   }

//   return (
//     <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
//       {currentProduct.images && currentProduct.images[0] && (
//         <div className="relative h-80 w-full">
//           <Image
//             src={currentProduct.images[0]}
//             alt={currentProduct.name || "Product"}
//             width={450}
//             height={450}
//             style={{ objectFit: "cover", width: "100%", height: "100%" }}
//             className="transition-opacity duration-500 ease-in-out"
//           />
//         </div>
//       )}
//       <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
//         <CardTitle className="text-xl font-bold text-white mb-2">
//           {currentProduct.name}
//         </CardTitle>
//         {price && price.unit_amount && (
//           <p className="text-lg text-white">
//             ${(price.unit_amount / 100).toFixed(2)}
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

"use client";

import Stripe from "stripe";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardTitle } from "./ui/card";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface Props {
  products: Stripe.Product[];
}

export const ProductCarousel = ({ products }: Props) => {
  const [api, setApi] = useState<CarouselApi>();

  // Early return if products is empty
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  // Limit to 5 products
  const limitedProducts = products.slice(0, 5);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(0);
  }, [api]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-center mb-8">
        Featured Products
      </h3>

      {/* Container with padding on sides for buttons */}
      <div className="relative px-14">
        {" "}
        {/* Increased horizontal padding */}
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {limitedProducts.map((product) => {
              const price = product?.default_price as Stripe.Price | undefined;

              return (
                <CarouselItem key={product.id} className="basis-full">
                  <Card className="overflow-hidden rounded-lg shadow-md border-gray-300">
                    {product.images && product.images[0] && (
                      <div className="relative h-100 w-full">
                        <Image
                          src={product.images[0]}
                          alt={product.name || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p- text-center">
                      <CardTitle className="text-sm font-medium mb-2">
                        {product.name}
                      </CardTitle>
                      {price && price.unit_amount && (
                        <p className="text-gray-700 font-semibold">
                          ${(price.unit_amount / 100).toFixed(2)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Position buttons outside of content */}
          <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
};
