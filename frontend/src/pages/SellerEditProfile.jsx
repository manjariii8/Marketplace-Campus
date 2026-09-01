import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Store,
  Phone,
  MapPin,
  FileText,
  Save,
  ArrowLeft,
} from "lucide-react";

import {
  getSellerProfile,
  updateSellerProfile,
} from "../services/sellerProfileService";

const SellerEditProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    shopName: "",
    phone: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getSellerProfile();

      console.log("GET PROFILE:", response.data);

      /*
       Your backend returns:

       {
         message: "...",
         data: {
           id,
           shopName,
           phone,
           address,
           description,
           verified,
           ownerName,
           ownerEmail
         }
       }

       So we first check data.
      */

      const profile = response.data?.data || response.data;

      setFormData({
        shopName: profile?.shopName || "",
        phone: profile?.phone || "",
        address: profile?.address || "",
        description: profile?.description || "",
      });

    } catch (error) {
      console.error("GET PROFILE ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
        "Unable to load seller profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    /*
     Frontend validation
    */

    if (!formData.shopName.trim()) {
      toast.error("Shop name is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Phone number must contain exactly 10 digits");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }

    setSaving(true);

    try {

      /*
       IMPORTANT:

       Send ONLY the fields expected by
       SellerProfileRequest.java
      */

      const payload = {
        shopName: formData.shopName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        description: formData.description.trim(),
      };

      console.log("UPDATE PROFILE PAYLOAD:", payload);

      const response = await updateSellerProfile(payload);

      console.log("UPDATE PROFILE RESPONSE:", response.data);

      toast.success("Seller profile updated successfully!");

      navigate("/seller/profile");

    } catch (error) {

      console.error("UPDATE PROFILE ERROR:", error);

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to update seller profile";

      toast.error(message);

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="rounded-xl bg-white px-8 py-6 shadow-sm">
          <p className="font-semibold text-slate-600">
            Loading seller profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/seller/profile")}
          className="mb-6 flex items-center gap-2 font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Profile
        </button>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Edit Seller Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Update your shop information and contact details.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">

            <div className="flex items-center gap-4 text-white">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Store size={28} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Shop Information
                </h2>

                <p className="mt-1 text-sm text-blue-100">
                  Keep your seller information up to date
                </p>
              </div>

            </div>

          </div>

          {/* Fields */}
          <div className="grid gap-6 p-8 md:grid-cols-2">

            {/* Shop Name */}
            <InputField
              icon={<Store size={18} />}
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              placeholder="Enter your shop name"
              required
            />

            {/* Phone */}
            <InputField
              icon={<Phone size={18} />}
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10 digit phone number"
              maxLength={10}
              required
            />

            {/* Address */}
            <div className="md:col-span-2">

              <label className="mb-2 block font-semibold text-slate-700">
                Address
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter your shop address"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

            </div>

            {/* Description */}
            <div className="md:col-span-2">

              <label className="mb-2 block font-semibold text-slate-700">
                Shop Description
              </label>

              <div className="relative">

                <FileText
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  maxLength={1000}
                  placeholder="Tell customers about your shop..."
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <p className="mt-2 text-right text-xs text-slate-400">
                {formData.description.length}/1000
              </p>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 border-t border-slate-200 bg-slate-50 px-8 py-5">

            <button
              type="button"
              onClick={() => navigate("/seller/profile")}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />

              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

const InputField = ({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  maxLength,
}) => {
  return (
    <div>

      <label className="mb-2 block font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-4 top-3.5 text-slate-400">
          {icon}
        </span>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </div>

    </div>
  );
};

export default SellerEditProfile;