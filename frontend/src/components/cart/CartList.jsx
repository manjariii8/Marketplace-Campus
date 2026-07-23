import CartItem from "./CartItem";

const CartList = ({
    items,
    onIncrease,
    onDecrease,
    onDelete
}) => {

    return (

        <div className="space-y-6">

            {items.map(item => (

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