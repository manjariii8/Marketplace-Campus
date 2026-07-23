const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">
        {label}
      </label>

      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;