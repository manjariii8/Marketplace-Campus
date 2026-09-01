import { Link } from "react-router-dom";
import { deleteProduct } from "../../services/productService";
import { FiEdit, FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";

const ProductRow = ({ product, reload }) => {

  async function removeProduct() {

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {

      await deleteProduct(product.id);

      toast.success("Product deleted successfully.");

      if (reload) {
        reload();
      }

    } catch (error) {

      console.error("Delete product error:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to delete product."
      );

    }
  }

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">

      <td className="p-4">

        <img
          src={
            product?.imageUrl ||
            "https://placehold.co/80x80/f1f5f9/1e293b?text=Product"
          }
          alt={product.name}
          className="h-14 w-14 rounded-xl object-cover"
        />

      </td>

      <td className="p-4 font-semibold text-slate-800">
        {product.name}
      </td>

      <td className="p-4 text-slate-600">
        {product.categoryName || "—"}
      </td>

      <td className="p-4 font-semibold text-slate-800">
        ₹{Number(product.price || 0).toLocaleString("en-IN")}
      </td>

      <td className="p-4">

        <div className="flex items-center gap-2">

          <Link
            to={`/seller/products/edit/${product.id}`}
            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
            title="Edit Product"
          >
            <FiEdit size={18} />
          </Link>

          <button
            type="button"
            onClick={removeProduct}
            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
            title="Delete Product"
          >
            <FiTrash size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default ProductRow;