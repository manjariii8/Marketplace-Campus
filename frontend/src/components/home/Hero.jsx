import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center">

        <div>

          <span className="inline-block bg-orange-500 px-4 py-1 rounded-full text-sm font-semibold mb-5">
            Trusted Marketplace
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Buy & Sell Products
            <br />
            With Confidence
          </h1>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            Discover thousands of products from trusted sellers.
            Fast delivery, secure payments, and a seamless shopping experience.
          </p>

          <div className="flex gap-4 mt-10">

            <Link
              to="/products"
              className="bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/seller"
              className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
            >
              Become Seller
            </Link>

          </div>

        </div>

        <div className="hidden lg:flex justify-center">

          <img
            src="https://placehold.co/600x450/e2e8f0/1e293b?text=Marketplace"
            alt="Marketplace"
            className="rounded-3xl shadow-2xl"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;