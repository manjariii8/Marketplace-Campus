import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Store,
  User,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import PasswordInput from "../../components/auth/PasswordInput";
import { Button, Input } from "../../components/ui";

import { registerSchema } from "../../validation/authSchema";

import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      /*
       * Only send fields that the backend expects.
       */
      const payload = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        role: data.role,
      };

      await registerUser(payload);

      toast.success("Account created successfully!");

      navigate("/login");

    } catch (error) {

      console.error("Registration error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Registration failed. Please try again.";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-100/20 blur-3xl" />

      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

        <div className="w-full max-w-2xl">

          <div className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_25px_80px_-20px_rgba(15,23,42,0.25)]">

            {/* Top accent */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <div className="p-6 sm:p-10 lg:p-12">

              {/* Header */}
              <div className="mb-8 text-center">

                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20">

                  <Store
                    size={27}
                    className="text-white"
                  />

                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Create your account
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                  Join our marketplace and discover a smarter
                  way to shop and sell.
                </p>

              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >

                {/* Name */}
                <div>

                  <div className="mb-3">

                    <h2 className="text-sm font-bold text-slate-900">
                      Personal Information
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Enter the name you want to use for your account.
                    </p>

                  </div>

                  <Input
                    label="Full Name"
                    name="name"
                    register={register}
                    error={errors.name}
                    placeholder="Enter your full name"
                  />

                </div>

                {/* Email */}
                <div>

                  <div className="mb-3">

                    <h2 className="text-sm font-bold text-slate-900">
                      Contact Details
                    </h2>

                  </div>

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email}
                    placeholder="you@example.com"
                  />

                </div>

                {/* Password */}
                <div>

                  <div className="mb-3">

                    <h2 className="text-sm font-bold text-slate-900">
                      Account Security
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Create a strong password with at least 8 characters.
                    </p>

                  </div>

                  <div className="space-y-4">

                    <PasswordInput
                      register={register}
                      name="password"
                      error={errors.password}
                    />

                    <PasswordInput
                      label="Confirm Password"
                      register={register}
                      name="confirmPassword"
                      error={errors.confirmPassword}
                    />

                  </div>

                </div>

                {/* Role */}
                <div>

                  <div className="mb-4">

                    <h2 className="text-sm font-bold text-slate-900">
                      Choose your account type
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Select how you want to use the marketplace.
                    </p>

                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* CUSTOMER */}
                    <label
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-5 transition-all ${
                        selectedRole === "CUSTOMER"
                          ? "border-blue-600 bg-blue-50/70 shadow-md"
                          : "border-slate-200 bg-white hover:border-blue-300"
                      }`}
                    >

                      <input
                        type="radio"
                        value="CUSTOMER"
                        className="sr-only"
                        {...register("role")}
                      />

                      {selectedRole === "CUSTOMER" && (
                        <div className="absolute right-4 top-4">
                          <CheckCircle2
                            size={21}
                            className="text-blue-600"
                          />
                        </div>
                      )}

                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                          selectedRole === "CUSTOMER"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        <User size={24} />
                      </div>

                      <h3 className="font-bold text-slate-900">
                        Customer
                      </h3>

                      <p className="mt-2 text-sm leading-5 text-slate-500">
                        Discover products, add items to your cart,
                        and shop from trusted sellers.
                      </p>

                    </label>

                    {/* SELLER */}
                    <label
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-5 transition-all ${
                        selectedRole === "SELLER"
                          ? "border-indigo-600 bg-indigo-50/70 shadow-md"
                          : "border-slate-200 bg-white hover:border-indigo-300"
                      }`}
                    >

                      <input
                        type="radio"
                        value="SELLER"
                        className="sr-only"
                        {...register("role")}
                      />

                      {selectedRole === "SELLER" && (
                        <div className="absolute right-4 top-4">
                          <CheckCircle2
                            size={21}
                            className="text-indigo-600"
                          />
                        </div>
                      )}

                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                          selectedRole === "SELLER"
                            ? "bg-indigo-600 text-white"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        <Store size={24} />
                      </div>

                      <h3 className="font-bold text-slate-900">
                        Seller
                      </h3>

                      <p className="mt-2 text-sm leading-5 text-slate-500">
                        Create your store, list products,
                        and grow your business.
                      </p>

                    </label>

                  </div>

                  {errors.role && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.role.message}
                    </p>
                  )}

                </div>

                {/* Terms */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 accent-blue-600"
                    />

                    <span className="text-xs leading-5 text-slate-600 sm:text-sm">

                      I agree to the{" "}

                      <Link
                        to="/terms"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}

                      <Link
                        to="/privacy"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>

                      .

                    </span>

                  </label>

                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60"
                >

                  {loading ? (
                    <span className="flex items-center gap-2">

                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Creating Account...

                    </span>
                  ) : (
                    <span className="flex items-center gap-2">

                      Create Account

                      <ArrowRight size={18} />

                    </span>
                  )}

                </Button>

                {/* Login */}
                <div className="flex justify-center gap-2 text-sm text-slate-500">

                  <span>
                    Already have an account?
                  </span>

                  <Link
                    to="/login"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>

                </div>

              </form>

              <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400">

                <ShieldCheck
                  size={16}
                  className="text-emerald-500"
                />

                Your information is securely protected.

              </div>

            </div>

          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            By creating an account, you agree to our marketplace policies.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;