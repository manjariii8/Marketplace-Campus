const QuantitySelector = ({
  quantity,
  setQuantity,
}) => {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-300">

      <button
        type="button"
        onClick={() =>
          setQuantity((prev) => Math.max(1, prev - 1))
        }
        className="px-5 py-3 text-lg font-semibold hover:bg-slate-100"
      >
        −
      </button>

      <span className="min-w-[60px] border-x border-slate-300 px-5 py-3 text-center font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() =>
          setQuantity((prev) => prev + 1)
        }
        className="px-5 py-3 text-lg font-semibold hover:bg-slate-100"
      >
        +
      </button>

    </div>
  );
};

export default QuantitySelector;