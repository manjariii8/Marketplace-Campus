import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Store,
  Calendar,
  ShieldCheck,
  Edit,
  Loader2,
  User,
  LogOut,
} from "lucide-react";

import sellerService from "../services/sellerService";
import { getUser } from "../utils/token";
import { useAuth } from "../context/AuthContext";

const SellerProfile = () => {
  const loggedInUser = getUser();

  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    shopName: "",
    phone: "",
    address: "",
    description: "",
    businessName: "",
  });
  const { logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // rest of your code...
  const handleEdit = () => {
    setFormData({
      shopName:
        seller?.shopName || seller?.storeName || seller?.businessName || "",

      phone: seller?.phone || seller?.phoneNumber || "",

      address: seller?.address || "",

      description: seller?.description || "",

      businessName: seller?.businessName || "",
    });

    setSuccess("");
    setError("");
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await sellerService.updateProfile(formData);

      console.log("Updated seller profile:", response.data);

      const updatedProfile = response?.data?.data || response?.data || {};

      setSeller((previous) => ({
        ...previous,
        ...updatedProfile,
        ...formData,
      }));

      /*
       * Update stored user name too.
       */
      const currentUser = getUser();

      updateUser({
        name: updatedProfile.name || formData.name,
      });

      setEditing(false);

      setSuccess("Your profile has been updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      setError(
        error?.response?.data?.message || "Unable to update your profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await sellerService.getProfile();

      console.log("Seller profile response:", response.data);

      /*
       * Supports:
       *
       * {
       *   success: true,
       *   data: {...}
       * }
       *
       * and direct {...} responses.
       */

      const profile = response?.data?.data || response?.data || {};

      setSeller(profile);
    } catch (error) {
      console.error("Seller profile error:", error);

      /*
       * If seller profile doesn't exist yet,
       * still show the logged-in user's information.
       */
      setSeller({
        name: loggedInUser?.name || "",
        email: loggedInUser?.email || "",
        role: loggedInUser?.role || "SELLER",
      });

      setError(
        error?.response?.status === 404
          ? "Seller profile has not been completed yet."
          : "Unable to load seller profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-blue-600" size={40} />

          <p className="mt-4 text-slate-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const name = seller?.name || loggedInUser?.name || "Seller";

  const email = seller?.email || loggedInUser?.email || "Email not available";

  const phone = seller?.phone || seller?.phoneNumber || "Not added";

  const storeName =
    seller?.storeName || seller?.businessName || `${name}'s Store`;

  const address = seller?.address || "Address not added";

  const joinedDate =
    seller?.createdAt ||
    seller?.createdDate ||
    seller?.joinedDate ||
    seller?.dateCreated ||
    loggedInUser?.createdAt ||
    loggedInUser?.createdDate ||
    loggedInUser?.joinedDate;

  const verified = seller?.verified ?? seller?.isVerified ?? false;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* PAGE HEADER */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <User size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

              <p className="mt-1 text-slate-500">
                Manage your seller account and store information.
              </p>
            </div>
          </div>
        </div>

        {/* WARNING */}

        {error && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* EDIT PROFILE */}

        {editing && (
          <div className="mb-6 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Edit Profile
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your seller and store information.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Store */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Store Name
                  </label>

                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter store name"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Enter store address"
                  />
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && <Loader2 size={18} className="animate-spin" />}

                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PROFILE */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* COVER */}

          <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-8 py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                {/* AVATAR */}

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-700 shadow-lg">
                  {name.charAt(0).toUpperCase()}
                </div>

                <div className="text-white">
                  <h2 className="text-2xl font-bold">{name}</h2>

                  <p className="mt-1 text-blue-100">{email}</p>

                  <div className="mt-3 flex items-center gap-2 text-blue-50">
                    <Store size={18} />

                    <span>{storeName}</span>
                  </div>

                  {verified && (
                    <div className="mt-2 flex items-center gap-2 text-blue-100">
                      <ShieldCheck size={18} />

                      <span>Verified Seller</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-red-500 text-white hover:bg-red-600 transition px-5 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-sm"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* DETAILS */}

          <div className="grid gap-6 p-8 md:grid-cols-2">
            <InfoCard
              icon={<Mail size={20} />}
              title="Email Address"
              value={email}
            />

            <InfoCard
              icon={<Phone size={20} />}
              title="Phone Number"
              value={phone}
            />

            <InfoCard
              icon={<Store size={20} />}
              title="Store Name"
              value={storeName}
            />

            <InfoCard
              icon={<MapPin size={20} />}
              title="Address"
              value={address}
            />

            <InfoCard
              icon={<Calendar size={20} />}
              title="Member Since"
              value={formatDate(joinedDate)}
            />

            <InfoCard
              icon={<ShieldCheck size={20} />}
              title="Account Type"
              value="Verified Seller"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50/40">
      <div className="mb-3 flex items-center gap-3 text-blue-600">
        {icon}

        <h3 className="font-semibold text-slate-700">{title}</h3>
      </div>

      <p className="break-words font-medium text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) {
    return "Not available";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

export default SellerProfile;
