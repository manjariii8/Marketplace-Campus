import {
    FiMinus,
    FiPlus,
    FiTrash
} from "react-icons/fi";

const CartItem = ({
    item,
    onIncrease,
    onDecrease,
    onDelete
}) => {

    return (

        <div className="bg-white rounded-xl shadow p-5 flex gap-6">

            <img
                src="https://placehold.co/120"
                alt=""
                className="rounded-lg"
            />

            <div className="flex-1">

                <h2 className="font-bold text-xl">

                    {item.productName}

                </h2>

                <p className="text-gray-500 mt-2">

                    ₹ {Number(item.price || 0).toFixed(2)}

                </p>

                <div className="flex items-center gap-4 mt-5">

                    <button
                        onClick={() => onDecrease(item)}
                        className="border p-2 rounded"
                    >
                        <FiMinus />
                    </button>

                    <span>

                        {item.quantity}

                    </span>

                    <button
                        onClick={() => onIncrease(item)}
                        className="border p-2 rounded"
                    >
                        <FiPlus />
                    </button>

                    <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 ml-auto"
                    >
                        <FiTrash />
                    </button>

                </div>

            </div>

            <div className="text-2xl font-bold">

                ₹ {Number(item.totalPrice || 0).toFixed(2)}

            </div>

        </div>

    );

};

export default CartItem;