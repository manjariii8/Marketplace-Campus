const CheckoutSummary = ({ items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.totalPrice || 0),
    0
  );

  // Marketplace-style delivery policy
  const FREE_DELIVERY_THRESHOLD = 499;
  const DELIVERY_CHARGE = 40;

  const shipping =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;

  // Tax should come from product/category GST data.
  // Until GST is implemented in the backend, don't add
  // an arbitrary 18% tax automatically.
  const tax = 0;

  const discount = 0;

  const total = subtotal + shipping + tax - discount;

  return (
    <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Order Summary
      </h2>

      <div className="space-y-4">

        {/* Subtotal */}
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        {/* Delivery */}
        <div className="flex items-center justify-between text-gray-600">
          <span>Delivery</span>

          {shipping === 0 ? (
            <span className="font-semibold text-green-600">
              FREE
            </span>
          ) : (
            <span className="font-medium text-gray-900">
              ₹{shipping.toFixed(2)}
            </span>
          )}
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between text-gray-600">
          <span>Tax</span>

          {tax === 0 ? (
            <span className="font-medium text-gray-900">
              ₹0.00
            </span>
          ) : (
            <span className="font-medium text-gray-900">
              ₹{tax.toFixed(2)}
            </span>
          )}
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between text-gray-600">
            <span>Discount</span>

            <span className="font-semibold text-green-600">
              -₹{discount.toFixed(2)}
            </span>
          </div>
        )}

        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            Total
          </span>

          <span className="text-2xl font-bold text-gray-900">
            ₹{total.toFixed(2)}
          </span>
        </div>

        {/* Free delivery message */}
        {subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
            Add ₹
            {(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)}
            {" "}more to get FREE delivery.
          </p>
        )}

        {shipping === 0 && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
            🎉 You are eligible for FREE delivery.
          </p>
        )}

      </div>
    </div>
  );
};

export default CheckoutSummary;