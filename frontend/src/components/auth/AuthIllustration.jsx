import { ShoppingBag } from "lucide-react";

const AuthIllustration = () => {
  return (
    <div className="hidden lg:flex bg-gradient-to-br from-blue-700 to-indigo-700 text-white flex-col justify-center items-center p-16">

      <ShoppingBag size={90} />

      <h2 className="text-4xl font-bold mt-8">
        Marketplace
      </h2>

      <p className="mt-6 text-center text-blue-100 leading-8">

        Buy from trusted sellers.

        <br />

        Sell products effortlessly.

        <br />

        Secure payments.

        <br />

        Fast delivery.

      </p>

      <div className="grid grid-cols-3 gap-6 mt-14">

        <div className="text-center">
          <h3 className="text-3xl font-bold">
            10K+
          </h3>
          <p className="text-blue-100">
            Products
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold">
            500+
          </h3>
          <p className="text-blue-100">
            Sellers
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold">
            25K+
          </h3>
          <p className="text-blue-100">
            Customers
          </p>
        </div>

      </div>

    </div>
  );
};

export default AuthIllustration;