const CheckoutForm = ({
  formData,
  setFormData,
  onSubmit,
  loading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-8 shadow"
    >
      <h2 className="mb-6 text-2xl font-bold">
        Shipping Information
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block font-medium">
            Shipping Address
          </label>

          <textarea
            rows="4"
            required
            value={formData.shippingAddress}
            onChange={(e) =>
              setFormData({
                ...formData,
                shippingAddress: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                phoneNumber: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-4 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>
    </form>
  );
};

export default CheckoutForm;