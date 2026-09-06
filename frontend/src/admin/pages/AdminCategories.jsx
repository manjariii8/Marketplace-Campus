import { useEffect, useState } from "react";
import {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
} from "../services/adminService";
import ConfirmModal from "../components/common/ConfirmModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    category: null,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  // Load all categories
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminCategories();

      setCategories(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setName("");
    setEditingId(null);
    setError("");
  };

  // Create / Update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const categoryData = {
        name: name.trim(),
      };

      if (editingId !== null) {
        const response = await updateAdminCategory(
          editingId,
          categoryData
        );

        setCategories((current) =>
          current.map((category) =>
            category.id === editingId ? response.data : category
          )
        );

        setSuccess("Category updated successfully.");
      } else {
        const response = await createAdminCategory(categoryData);

        setCategories((current) => [...current, response.data]);

        setSuccess("Category created successfully.");
      }

      resetForm();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  // Edit category
  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Open delete confirmation modal
  const handleDeleteClick = (category) => {
    setDeleteModal({
      open: true,
      category,
    });

    setError("");
    setSuccess("");
  };

  // Close delete modal
  const closeDeleteModal = () => {
    if (deletingId !== null) return;

    setDeleteModal({
      open: false,
      category: null,
    });
  };

  // Delete category
  const handleDelete = async () => {
    const category = deleteModal.category;

    if (!category) return;

    try {
      setDeletingId(category.id);
      setError("");
      setSuccess("");

      await deleteAdminCategory(category.id);

      setCategories((current) =>
        current.filter((item) => item.id !== category.id)
      );

      // If currently editing the deleted category, reset the form
      if (editingId === category.id) {
        resetForm();
      }

      setSuccess("Category deleted successfully.");

      setDeleteModal({
        open: false,
        category: null,
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to delete category."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Create and manage product categories.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

      {/* Category Form */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            {editingId !== null ? "Edit Category" : "Add Category"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {editingId !== null
              ? "Update the category name."
              : "Create a new product category."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : editingId !== null
                ? "Update Category"
                : "Add Category"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Categories Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">
            All Categories
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {categories.length} categor
            {categories.length === 1 ? "y" : "ies"}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                /* Empty State */
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              ) : (
                /* Categories */
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* ID */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      #{category.id}
                    </td>

                    {/* Category Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          #
                        </div>

                        <span className="font-semibold text-gray-900">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          disabled={deletingId !== null}
                          className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteClick(category)
                          }
                          disabled={deletingId !== null}
                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete Category"
        message={
          deleteModal.category
            ? `Are you sure you want to delete "${deleteModal.category.name}"? This action cannot be undone.`
            : ""
        }
        confirmText={
          deletingId !== null ? "Deleting..." : "Delete"
        }
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        loading={deletingId !== null}
      />
    </div>
  );
};

export default Categories;