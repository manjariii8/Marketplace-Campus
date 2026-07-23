import { Link } from "react-router-dom";
import { deleteProduct } from "../../services/productService";
import { FiEdit, FiTrash } from "react-icons/fi";

const ProductRow = ({ product, reload, onDelete }) => {
  async function removeProduct() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      reload();
      alert("Product deleted successfully.");
    } catch (e) {
      console.error(e);
      alert("Unable to delete product.");
    }
  }

  return (
    <tr className="border-b">
      <td className="p-4">
        <img src="https://placehold.co/80" alt="" className="rounded-lg" />
      </td>

      <td>{product.name}</td>
      <td>{product.categoryName}</td>
      <td>₹ {product.price}</td>

      <td>
        <div className="flex gap-3 items-center">
          <Link to={`/seller/products/edit/${product.id}`}>
            <FiEdit />
          </Link>

          <button onClick={removeProduct} className="text-red-500">
            <FiTrash />
          </button>
          <button onClick={() => onDelete(product.id)} className="text-red-500">
            <FiTrash />
          </button>
          <button onClick={() => onDelete(product.id)} className="text-red-500">
            <FiTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
