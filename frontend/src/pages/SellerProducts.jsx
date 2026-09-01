import { useState } from "react";
import ProductTable from "../components/seller/ProductTable";
import { deleteProduct } from "../services/productService";
import toast from "react-hot-toast";

const SellerProducts = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        // fetch products
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {
            await deleteProduct(id);
            await loadProducts();
            toast.success("Product deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete product.");
        }
    };

    return (
        <ProductTable
            products={products}
            onDelete={handleDelete}
        />
    );
};

export default SellerProducts;