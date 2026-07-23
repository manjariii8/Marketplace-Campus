const CheckoutSummary = ({ items }) => {

  const subtotal = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-2xl bg-white p-6 shadow sticky top-24">

      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

      </div>
    </div>
  );
};

export default CheckoutSummary;