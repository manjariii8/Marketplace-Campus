import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  Tag,
  Boxes,
  IndianRupee,
  CalendarDays,
  Store,
  User,
  Mail,
  Phone,
  Loader2,
  ShoppingBag,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProductById, deleteProduct } from "../services/productService";

import useAuth from "../hooks/useAuth";
import { getImageUrl } from "../utils/imageUrl";

const SellerProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [product, setProduct] = useState(null);

  const [seller, setSeller] = useState(null);

  const [loading, setLoading] = useState(true);

  const [sellerLoading, setSellerLoading] = useState(true);

  const [deleting, setDeleting] = useState(false);

  const loadSellerProfile = async () => {
    try {
      setSellerLoading(true);

      const response = await sellerService.getProfile();

      console.log("SELLER PROFILE:", response.data);

      const data = response?.data?.data ?? response?.data ?? {};

      setSeller(data);
    } catch (error) {
      console.error("Unable to load seller profile:", error);

      /*
       * Fallback to logged-in user
       */
      setSeller({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || user?.phoneNumber || "",
        storeName: user?.storeName || user?.sellerProfile?.storeName || "",
      });
    } finally {
      setSellerLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    loadSellerProfile();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const response = await getProductById(id);

      const data = response?.data?.data ?? response?.data;
      console.log("PRODUCT DETAIL:", data);

      setProduct(data);
    } catch (error) {
      console.error("Unable to load product:", error);

      toast.error(
        error?.response?.data?.message || "Unable to load product details.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteProduct(product.id);

      toast.success("Product deleted successfully.");

      navigate("/seller/products");
    } catch (error) {
      console.error("Delete product error:", error);

      toast.error(
        error?.response?.data?.message || "Unable to delete product.",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 size={26} className="animate-spin text-blue-600" />

          <span>Loading product details...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
          <Package size={40} className="text-slate-400" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-slate-800">
          Product not found
        </h2>

        <p className="mt-2 text-slate-500">
          The product may have been deleted or is unavailable.
        </p>

        <button
          onClick={() => navigate("/seller/products")}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Back to My Products
        </button>
      </div>
    );
  }

  /* =====================================================
     PRODUCT DATA
  ===================================================== */

  const category =
    product.categoryName || product.category?.name || "Uncategorized";

  const image =
    product.imageData ||
    product.imageUrl ||
    product.image ||
    product.imagePath ||
    null;

  const price = Number(product.price || 0);

  const stock = Number(product.stock || 0);

  /* =====================================================
     LOGGED-IN SELLER DATA
  ===================================================== */

  const sellerName = seller?.name || seller?.fullName || user?.name || "Seller";

  const sellerEmail = seller?.email || user?.email || "Email not available";

  const sellerPhone =
    seller?.phone ||
    seller?.phoneNumber ||
    user?.phone ||
    user?.phoneNumber ||
    "Phone not added";

  const storeName =
    seller?.storeName ||
    seller?.businessName ||
    seller?.shopName ||
    "Store name not added";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => navigate("/seller/products")}
            className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to My Products
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/seller/products/edit/${product.id}`)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Edit size={17} />
              Edit Product
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Trash2 size={17} />
              )}
              Delete
            </button>
          </div>
        </div>

        {/* =====================================================
            MAIN PRODUCT
        ===================================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* IMAGE */}

            {/* =====================================================
    PRODUCT IMAGE
===================================================== */}

            <div className="flex min-h-[450px] items-center justify-center bg-slate-100 p-8">
              {image ? (
                <img
                  src={image}
                  alt={product.name}
                  className="max-h-[500px] max-w-full rounded-2xl object-contain shadow-sm"
                  onError={(e) => {
                    console.error("Failed to display product image");
                    console.error("Image source:", image);

                    e.currentTarget.style.display = "none";

                    const fallback = e.currentTarget.nextElementSibling;

                    if (fallback) {
                      fallback.style.display = "flex";
                    }
                  }}
                />
              ) : null}

              {/* FALLBACK */}
              <div
                className={`flex flex-col items-center justify-center ${
                  image ? "hidden" : "flex"
                }`}
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-sm">
                  <ShoppingBag size={55} className="text-slate-400" />
                </div>

                <p className="mt-4 font-medium text-slate-500">
                  No product image
                </p>
              </div>
            </div>

            {/* PRODUCT SUMMARY */}

            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                  {category}
                </span>

                {stock > 0 ? (
                  <span className="rounded-full bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700">
                    In Stock
                  </span>
                ) : (
                  <span className="rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-700">
                    Out of Stock
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-6 flex items-center gap-2">
                <IndianRupee size={25} className="text-blue-600" />

                <span className="text-4xl font-bold text-blue-700">
                  {price.toLocaleString("en-IN")}
                </span>
              </div>

              <p className="mt-6 leading-7 text-slate-600">
                {product.description ||
                  "No description available for this product."}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <StatCard
                  icon={<Boxes size={21} />}
                  label="Available Stock"
                  value={`${stock} units`}
                />

                <StatCard
                  icon={<Tag size={21} />}
                  label="Category"
                  value={category}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            PRODUCT INFORMATION
        ===================================================== */}

        <section className="mt-8">
          <SectionHeading
            icon={<Package size={22} />}
            title="Product Information"
            subtitle="Complete information about this product"
          />

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoBlock
              icon={<Package size={21} />}
              title="Product ID"
              value={`#${product.id}`}
            />

            <InfoBlock
              icon={<Tag size={21} />}
              title="Category"
              value={category}
            />

            <InfoBlock
              icon={<Boxes size={21} />}
              title="Stock"
              value={`${stock} units`}
            />

            <InfoBlock
              icon={<IndianRupee size={21} />}
              title="Price"
              value={`₹${price.toLocaleString("en-IN")}`}
            />
          </div>
        </section>

        {/* =====================================================
            DESCRIPTION
        ===================================================== */}

        <section className="mt-8">
          <SectionHeading
            icon={<Package size={22} />}
            title="Product Description"
            subtitle="Detailed information about the product"
          />

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="whitespace-pre-line leading-8 text-slate-600">
              {product.description || "No description available."}
            </p>
          </div>
        </section>

        

        {/* =====================================================
            PRODUCT HISTORY
        ===================================================== */}

        {(product.createdAt || product.updatedAt) && (
          <section className="mt-8">
            <SectionHeading
              icon={<CalendarDays size={22} />}
              title="Product History"
              subtitle="Product creation and update information"
            />

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              {product.createdAt && (
                <InfoBlock
                  icon={<CalendarDays size={21} />}
                  title="Created At"
                  value={formatDate(product.createdAt)}
                />
              )}

              {product.updatedAt && (
                <InfoBlock
                  icon={<CalendarDays size={21} />}
                  title="Last Updated"
                  value={formatDate(product.updatedAt)}
                />
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* =====================================================
   STAT CARD
===================================================== */

const StatCard = ({ icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          {icon}
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>

          <p className="mt-1 font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   INFO BLOCK
===================================================== */

const InfoBlock = ({ icon, title, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <p className="mt-1 truncate font-semibold text-slate-800">
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   SECTION HEADING
===================================================== */

const SectionHeading = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>

        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
};

/* =====================================================
   DATE FORMAT
===================================================== */

const formatDate = (date) => {
  try {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return date;
  }
};

export default SellerProductDetails;
