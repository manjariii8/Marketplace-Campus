import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/common/BackButton";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await loginUser(formData);

      login(response.data.data.token);

      console.log("Token:", response.data.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5">
              <FiLogIn size={35} className="text-blue-700" />
            </div>
            <BackButton/>

            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>

            <p className="text-blue-100 mt-2">Login to continue shopping</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-300 rounded-xl p-3 text-white mt-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            <div className="relative">
              <FiMail className="absolute left-4 top-4 text-gray-500" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-white rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-4 text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full bg-white rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-4 focus:ring-blue-300"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 text-white font-semibold"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-center text-white mt-8">
            Don't have an account?
            <Link
              to="/register"
              className="text-orange-300 font-semibold ml-2 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
