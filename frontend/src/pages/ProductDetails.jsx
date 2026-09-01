import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProduct } from "../services/productService";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const response =
        await getProduct(id);

      console.log(
        "Product response:",
        response.data
      );

      setProduct(response.data);

    } catch (error) {
      console.error(
        "Failed to load product:",
        error
      );

      toast.error(
        "Unable to load product."
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2">

          <ProductGallery
            product={product}
          />

          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;