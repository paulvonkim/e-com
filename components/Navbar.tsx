import Link from "next/link";

export const Navbar = () => {
  return (
    <nav
      style={{ backgroundColor: "#ECF0E9" }}
      className="sticky top-0 z-50 bg-[#ECF0E9] shadow rounded-lg m-4"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-semibold [&:hover]:text-[#5F6D5C]"
          >
            My Ecommerce
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="[&:hover]:text-[#5F6D5C]">
              Home
            </Link>
            <Link href="/products" className="[&:hover]:text-[#5F6D5C]">
              Products
            </Link>
            <Link href="/checkout" className="[&:hover]:text-[#5F6D5C]">
              Checkout
            </Link>
          </div>

          <div className="flex items-center space-x-4">🛒</div>
        </div>
      </div>
    </nav>
  );
};
