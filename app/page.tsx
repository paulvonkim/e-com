import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCarousel } from "@/components/carousel";

export default async function Home() {
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 5,
    });

    if (!products || !products.data || products.data.length === 0) {
      return <div>No products available</div>;
    }

    return (
      <div className="flex flex-col gap-16">
        <section className="rounded py-8 shadow-md sm:py-12">
          <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
            <div className="max-w-md space-y-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Welcome to My Ecommerce
              </h2>
              <p className="text-neutral-600">
                Discover the latest products at the best prices.
              </p>
              <Button
                asChild
                variant="default"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
              >
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
            {products.data[0]?.images?.[0] && (
              <Image
                alt="Hero Image"
                src={products.data[0].images[0]}
                className="rounded"
                width={450}
                height={450}
              />
            )}
          </div>
        </section>
        <section className="py-8 mb-8">
          <ProductCarousel products={products.data} />
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products</div>;
  }
}
