import CartItem from "./CartItem";

const CartList = ({
    items = [],
    onIncrease,
    onDecrease,
    onDelete
}) => {

    const safeItems = Array.isArray(items)
        ? items
        : [];

    if (safeItems.length === 0) {

        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

                <p className="text-slate-500">
                    No items in your cart.
                </p>

            </div>
        );

    }

    return (

        <div className="space-y-6">

            {safeItems.map((item) => (

                <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );
};

export default CartList;