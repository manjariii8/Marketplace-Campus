import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/seller/ProductForm";
import { createProduct } from "../services/productService";
import BackButton from "../components/common/BackButton";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createProduct(formData);

      alert("Product added successfully.");
      navigate("/seller");
    } catch (error) {
      console.error(error);
      alert("Unable to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-2xl bg-white shadow-lg border border-slate-200">
      {/* Header */}
      <div className="border-b border-slate-200 px-8 py-6">
        <BackButton />
        <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>
        <p className="mt-2 text-sm text-slate-500">
          Fill in the details below to list your product in the marketplace.
        </p>
      </div>

      {/* Form */}
      <div className="p-8">
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddProduct;
