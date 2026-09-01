import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/seller/ProductForm";
import {
  getProduct,
  updateProduct,
} from "../services/productService";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "",
  });

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    try {
      const response = await getProduct(id);

      setFormData({
        name: response.data.name,
        description: response.data.description,
        price: response.data.price,
        stock: response.data.stock,
        categoryId: response.data.categoryId,
      });
    } catch (error) {
      console.error(error);
      toast.error("Unable to load product.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateProduct(id, formData);

      toast.success("Product updated successfully.");

      navigate("/seller");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <h1 className="mb-8 text-4xl font-bold text-slate-800">
          Edit Product
        </h1>

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

export default EditProduct;