import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../services/productService";
import { FiEdit, FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmModal from "../common/ConfirmModal";

const ProductRow = ({ product, reload }) => {
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    product: null,
  });

  const [deleting, setDeleting] = useState(false);

  // Open confirmation modal
  const handleDeleteClick = () => {
    setDeleteModal({
      open: true,
      product,
    });
  };

  // Close confirmation modal
  const handleCancelDelete = () => {
    if (deleting) return;

    setDeleteModal({
      open: false,
      product: null,
    });
  };

  // Delete product
  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await deleteProduct(product.id);

      toast.success("Product deleted successfully.");

      setDeleteModal({
        open: false,
        product: null,
      });

      if (reload) {
        reload();
      }
    } catch (error) {
      console.error("Delete product error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <tr className="border-b border-slate-100 hover:bg-slate-50">
        {/* Product Image */}
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

        {/* Product Name */}
        <td className="p-4 font-semibold text-slate-800">
          {product.name}
        </td>

        {/* Category */}
        <td className="p-4 text-slate-600">
          {product.categoryName || "—"}
        </td>

        {/* Price */}
        <td className="p-4 font-semibold text-slate-800">
          ₹{Number(product.price || 0).toLocaleString("en-IN")}
        </td>

        {/* Actions */}
        <td className="p-4">
          <div className="flex items-center gap-2">
            {/* Edit */}
            <Link
              to={`/seller/products/edit/${product.id}`}
              className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
              title="Edit Product"
            >
              <FiEdit size={18} />
            </Link>

            {/* Delete */}
            <button
              type="button"
              onClick={handleDeleteClick}
              disabled={deleting}
              className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              title="Delete Product"
            >
              <FiTrash size={18} />
            </button>
          </div>
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete Product"
        message={
          deleteModal.product
            ? `Are you sure you want to delete "${deleteModal.product.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default ProductRow;
