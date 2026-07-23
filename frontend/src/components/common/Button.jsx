const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;