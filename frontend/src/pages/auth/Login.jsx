import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema } from "../../validation/authSchema";

import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import PasswordInput from "../../components/auth/PasswordInput";

import { Button, Input } from "../../components/ui";

import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [loginType, setLoginType] = useState("CUSTOMER");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      /*
       * We send the selected login type along with
       * the email and password.
       *
       * If your current backend login API only accepts
       * email/password, you can remove loginType from
       * this object. The role should then be determined
       * from the database after authentication.
       */
      const loggedInUser = await login({
        ...data,
        loginType,
      });

      /*
       * Security check:
       *
       * The actual role must always come from the backend.
       * Do NOT trust the role selected by the frontend.
       */

      if (loggedInUser.role === "SELLER") {
        toast.success("Welcome back, Seller!");
        navigate("/seller");
      } else if (loggedInUser.role === "ADMIN") {
        toast.success("Welcome back, Admin!");
        navigate("/admin");
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="w-full">

        {/* Brand */}
        <div className="mb-8 flex justify-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2"
          >
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                bg-gradient-to-br from-blue-600 to-indigo-600
                text-lg font-bold text-white
                shadow-lg shadow-blue-600/20
                transition-transform duration-200
                group-hover:scale-105
              "
            >
              M
            </div>

            <span
              className="
                text-xl font-bold
                tracking-tight
                text-slate-900
              "
            >
              Marketplace
            </span>
          </Link>
        </div>

        {/* Header */}
        <AuthHeader
          title="Welcome back"
          subtitle="Sign in to your account to continue."
        />

        {/* Login Type */}
        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold text-slate-700">
            Login as
          </p>

          <div className="grid grid-cols-2 gap-3">

            {/* Customer */}
            <button
              type="button"
              onClick={() => setLoginType("CUSTOMER")}
              disabled={loading}
              className={`
                group
                rounded-xl
                border
                p-4
                text-left
                transition-all
                duration-200
                ${
                  loginType === "CUSTOMER"
                    ? `
                      border-blue-500
                      bg-blue-50
                      ring-2
                      ring-blue-500/10
                      shadow-sm
                    `
                    : `
                      border-slate-200
                      bg-white
                      hover:border-blue-200
                      hover:bg-slate-50
                    `
                }
              `}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`
                    flex h-10 w-10
                    items-center justify-center
                    rounded-lg
                    ${
                      loginType === "CUSTOMER"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                    />

                    <path
                      d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
                    />
                  </svg>
                </div>

                <div>
                  <p
                    className={`
                      text-sm font-semibold
                      ${
                        loginType === "CUSTOMER"
                          ? "text-blue-700"
                          : "text-slate-800"
                      }
                    `}
                  >
                    Customer
                  </p>

                  <p className="text-xs text-slate-500">
                    Shop & order
                  </p>
                </div>

              </div>
            </button>

            {/* Seller */}
            <button
              type="button"
              onClick={() => setLoginType("SELLER")}
              disabled={loading}
              className={`
                group
                rounded-xl
                border
                p-4
                text-left
                transition-all
                duration-200
                ${
                  loginType === "SELLER"
                    ? `
                      border-indigo-500
                      bg-indigo-50
                      ring-2
                      ring-indigo-500/10
                      shadow-sm
                    `
                    : `
                      border-slate-200
                      bg-white
                      hover:border-indigo-200
                      hover:bg-slate-50
                    `
                }
              `}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`
                    flex h-10 w-10
                    items-center justify-center
                    rounded-lg
                    ${
                      loginType === "SELLER"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path
                      d="M3 9l1-5h16l1 5"
                    />

                    <path
                      d="M5 9v10h14V9"
                    />

                    <path
                      d="M3 9h18"
                    />

                    <path
                      d="M8 19v-5h8v5"
                    />
                  </svg>
                </div>

                <div>
                  <p
                    className={`
                      text-sm font-semibold
                      ${
                        loginType === "SELLER"
                          ? "text-indigo-700"
                          : "text-slate-800"
                      }
                    `}
                  >
                    Seller
                  </p>

                  <p className="text-xs text-slate-500">
                    Manage your store
                  </p>
                </div>

              </div>
            </button>

          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
        >

          {/* Email */}
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            register={register}
            name="email"
            error={errors.email}
            autoComplete="email"
          />

          {/* Password */}
          <PasswordInput
            register={register}
            error={errors.password}
            name="password"
            autoComplete="current-password"
          />

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">

            <label
              className="
                flex cursor-pointer
                items-center gap-2
                text-sm text-slate-600
              "
            >
              <input
                type="checkbox"
                className="
                  h-4 w-4
                  cursor-pointer
                  rounded
                  border-slate-300
                  text-blue-600
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />

              <span>Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="
                text-sm font-semibold
                text-blue-600
                transition-colors
                hover:text-blue-700
              "
            >
              Forgot password?
            </Link>

          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="
              mt-2
              w-full
              !rounded-xl
              !py-3.5
              font-semibold
              shadow-lg
              shadow-blue-600/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-blue-600/25
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">

                <span
                  className="
                    h-4 w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/40
                    border-t-white
                  "
                />

                <span>
                  Signing in...
                </span>

              </span>
            ) : (
              `Sign in as ${
                loginType === "SELLER"
                  ? "Seller"
                  : "Customer"
              }`
            )}
          </Button>

        </form>

        {/* Selected Role Indicator */}
        <div
          className="
            mt-4
            rounded-lg
            bg-slate-50
            px-4
            py-3
            text-center
            text-xs
            text-slate-500
          "
        >
          You're signing in as{" "}
          <span className="font-semibold text-slate-700">
            {loginType === "SELLER"
              ? "Seller"
              : "Customer"}
          </span>
        </div>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">

          <div className="h-px flex-1 bg-slate-200" />

          <span
            className="
              text-xs font-medium
              uppercase tracking-wider
              text-slate-400
            "
          >
            New here?
          </span>

          <div className="h-px flex-1 bg-slate-200" />

        </div>

        {/* Register */}
        <div className="text-center">

          <p className="text-sm text-slate-500">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="
              mt-2
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              px-6
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition-all
              duration-200
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-700
              hover:shadow
            "
          >
            Create an account
          </Link>

        </div>

        {/* Security */}
        <div
          className="
            mt-7
            flex items-center
            justify-center gap-2
            text-xs text-slate-400
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5"
          >
            <rect
              width="18"
              height="11"
              x="3"
              y="11"
              rx="2"
              ry="2"
            />

            <path
              d="M7 11V7a5 5 0 0 1 10 0v4"
            />
          </svg>

          <span>
            Secure and encrypted connection
          </span>
        </div>

      </div>
    </AuthCard>
  );
};

export default Login;
