const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center gap-3">

      <button
        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        className="w-10 h-10 rounded-lg border text-lg"
      >
        -
      </button>

      <span className="text-xl font-semibold w-10 text-center">
        {quantity}
      </span>

      <button
        onClick={() => setQuantity(quantity + 1)}
        className="w-10 h-10 rounded-lg border text-lg"
      >
        +
      </button>

    </div>
  );
};

export default QuantitySelector;