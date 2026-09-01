import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white",

  secondary:
    "bg-slate-100 hover:bg-slate-200 text-slate-900",

  outline:
    "border border-slate-300 hover:bg-slate-100",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  success:
    "bg-green-600 hover:bg-green-700 text-white",
};

const Button = ({
  children,
  variant = "primary",
  className,
  loading = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition disabled:opacity-60",
        variants[variant],
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;