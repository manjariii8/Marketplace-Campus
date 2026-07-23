const OrderSummary = ({ items }) => {

    const subtotal = items.reduce(

        (sum, item) => sum + item.totalPrice,

        0

    );

    const shipping = subtotal > 1000 ? 0 : 100;

    const tax = subtotal * 0.18;

    const total = subtotal + shipping + tax;

    return (

        <div className="bg-white rounded-xl shadow p-6 sticky top-24">

            <h2 className="text-2xl font-bold">

                Order Summary

            </h2>

            <div className="space-y-4 mt-8">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>₹ {subtotal.toFixed(2)}</span>

                </div>

                <div className="flex justify-between">

                    <span>Shipping</span>

                    <span>

                        ₹ {shipping}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Tax</span>

                    <span>

                        ₹ {tax.toFixed(2)}

                    </span>

                </div>

                <hr />

                <div className="flex justify-between font-bold text-xl">

                    <span>Total</span>

                    <span>

                        ₹ {total.toFixed(2)}

                    </span>

                </div>

            </div>

            <button
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
            >
                Proceed to Checkout
            </button>

        </div>

    );

};

export default OrderSummary;