import { useNavigate } from "react-router-dom";

const OrderSummary = ({ items = [] }) => {

    const navigate = useNavigate();

    const safeItems = Array.isArray(items)
        ? items
        : [];

    const subtotal = safeItems.reduce(
        (sum, item) => {
            return sum + Number(item.totalPrice || 0);
        },
        0
    );

    const shipping =
        subtotal === 0
            ? 0
            : subtotal > 1000
                ? 0
                : 100;

    const tax = subtotal * 0.18;

    const total =
        subtotal +
        shipping +
        tax;


    return (

        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
                Order Summary
            </h2>


            <div className="mt-8 space-y-4">

                <div className="flex justify-between text-slate-600">

                    <span>
                        Subtotal
                    </span>

                    <span className="font-medium text-slate-900">
                        ₹ {subtotal.toFixed(2)}
                    </span>

                </div>


                <div className="flex justify-between text-slate-600">

                    <span>
                        Shipping
                    </span>

                    <span className="font-medium text-slate-900">

                        {shipping === 0
                            ? "FREE"
                            : `₹ ${shipping}`
                        }

                    </span>

                </div>


                <div className="flex justify-between text-slate-600">

                    <span>
                        Tax (18%)
                    </span>

                    <span className="font-medium text-slate-900">
                        ₹ {tax.toFixed(2)}
                    </span>

                </div>


                <hr className="border-slate-200" />


                <div className="flex justify-between text-xl font-bold">

                    <span>
                        Total
                    </span>

                    <span className="text-blue-700">
                        ₹ {total.toFixed(2)}
                    </span>

                </div>

            </div>


            <button
                disabled={safeItems.length === 0}
                onClick={() => navigate("/checkout")}
                className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
                Proceed to Checkout
            </button>

        </div>

    );
};

export default OrderSummary;