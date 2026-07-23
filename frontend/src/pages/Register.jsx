import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      await registerUser(formData);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-5">

              <FiUser
                size={36}
                className="text-blue-700"
              />

            </div>

            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-blue-100 mt-2">
              Join our marketplace today
            </p>

          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-300 text-white rounded-xl p-3 mb-6">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div className="relative">

              <FiUser className="absolute left-4 top-4 text-gray-500" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-300"
              />

            </div>

            <div className="relative">

              <FiMail className="absolute left-4 top-4 text-gray-500" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-300"
              />

            </div>

            <div className="relative">

              <FiLock className="absolute left-4 top-4 text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-4 focus:ring-blue-300"
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
              className="w-full bg-orange-500 hover:bg-orange-600 transition rounded-xl py-3 text-white font-semibold"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center text-white mt-8">

            Already have an account?

            <Link
              to="/login"
              className="text-orange-300 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;