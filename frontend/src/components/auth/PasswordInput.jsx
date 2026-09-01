import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({
  label = "Password",
  error,
  register,
  name = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>

      <label className="block mb-2 font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          {...register(name)}
          className={`w-full rounded-xl border px-4 py-3 pr-12 outline-none transition

          ${
            error
              ? "border-red-500"
              : "border-slate-300 focus:border-blue-500"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 -translate-y-1/2 right-4"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>

      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      )}

    </div>
  );
};

export default PasswordInput;