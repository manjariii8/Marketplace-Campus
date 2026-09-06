import { useState } from "react";
import ProductTable from "../components/seller/ProductTable";
import { deleteProduct } from "../services/productService";
import toast from "react-hot-toast";
import ConfirmModal from "../components/common/ConfirmModal";

const SellerProducts = () => {
    const [products, setProducts] = useState([]);

    const [deleteModal, setDeleteModal] = useState({
        open: false,
        productId: null,
    });

    const [deleting, setDeleting] = useState(false);

    const loadProducts = async () => {
        // fetch products
    };

    // Open confirmation modal
    const handleDeleteClick = (id) => {
        setDeleteModal({
            open: true,
            productId: id,
        });
    };

    // Close confirmation modal
    const closeDeleteModal = () => {
        if (deleting) return;

        setDeleteModal({
            open: false,
            productId: null,
        });
    };

    // Delete product after confirmation
    const handleDelete = async () => {
        const id = deleteModal.productId;

        if (!id) return;

        try {
            setDeleting(true);

            await deleteProduct(id);
            await loadProducts();

            toast.success("Product deleted successfully.");

            setDeleteModal({
                open: false,
                productId: null,
            });
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete product.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <ProductTable
                products={products}
                onDelete={handleDeleteClick}
            />

            <ConfirmModal
                isOpen={deleteModal.open}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={closeDeleteModal}
            />
        </>
    );
};

export default SellerProducts;
