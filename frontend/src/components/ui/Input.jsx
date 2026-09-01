const Input = ({
  label,
  register,
  name,
  error,
  className = "",
  ...props
}) => {
  return (
    <div>

      {label && (
        <label className="mb-2 block font-medium">
          {label}
        </label>
      )}

      <input
        {...register(name)}
        {...props}
        className={`w-full rounded-xl border px-4 py-3 outline-none

        ${
          error
            ? "border-red-500"
            : "border-slate-300 focus:border-blue-500"
        }

        ${className}`}
      />

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      )}

    </div>
  );
};

export default Input;