import { useEffect, useState } from "react";
import {
  getAdminUsers,
  searchAdminUsers,
  deleteAdminUser,
} from "../services/adminService";
import ConfirmModal from "../components/common/ConfirmModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    user: null,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================
  // LOAD USERS
  // =========================
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await getAdminUsers();

      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Load users error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SEARCH USERS
  // =========================
  const handleSearch = async (e) => {
    e.preventDefault();

    const searchValue = keyword.trim();

    if (!searchValue) {
      await loadUsers();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await searchAdminUsers(searchValue);

      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Search users error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to search users."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN DELETE MODAL
  // =========================
  const handleDeleteClick = (user) => {
    if (!user || user.id == null) {
      setError("Invalid user selected.");
      return;
    }

    setError("");
    setSuccess("");

    setDeleteModal({
      open: true,
      user: user,
    });
  };

  // =========================
  // CLOSE DELETE MODAL
  // =========================
  const closeDeleteModal = () => {
    if (deletingId !== null) {
      return;
    }

    setDeleteModal({
      open: false,
      user: null,
    });
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async () => {
    const selectedUser = deleteModal.user;

    if (!selectedUser || selectedUser.id == null) {
      return;
    }

    try {
      setDeletingId(selectedUser.id);
      setError("");
      setSuccess("");

      await deleteAdminUser(selectedUser.id);

      // Remove deleted user from UI
      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.id !== selectedUser.id
        )
      );

      setSuccess(
        `User "${selectedUser.name}" deleted successfully.`
      );

      // Close modal
      setDeleteModal({
        open: false,
        user: null,
      });
    } catch (err) {
      console.error("Delete user error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to delete user."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // ROLE BADGE
  // =========================
  const getRoleStyle = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700";

      case "SELLER":
        return "bg-blue-100 text-blue-700";

      case "CUSTOMER":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Users
        </h1>

        <p className="mt-2 text-gray-500">
          Manage marketplace users and accounts.
        </p>
      </div>

      {/* =========================
          SEARCH
      ========================= */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by name or email..."
            disabled={deletingId !== null}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

          <button
            type="submit"
            disabled={loading || deletingId !== null}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            disabled={loading || deletingId !== null}
            onClick={() => {
              setKeyword("");
              loadUsers();
            }}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset
          </button>
        </form>
      </div>

      {/* =========================
          ERROR MESSAGE
      ========================= */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* =========================
          SUCCESS MESSAGE
      ========================= */}
      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

      {/* =========================
          USERS TABLE
      ========================= */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {/* LOADING */}
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                /* EMPTY STATE */
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                /* USERS */
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* ID */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      #{user.id}
                    </td>

                    {/* USER */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {user.name
                            ? user.name
                                .charAt(0)
                                .toUpperCase()
                            : "U"}
                        </div>

                        <span className="font-semibold text-gray-900">
                          {user.name || "Unknown User"}
                        </span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email || "-"}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyle(
                          user.role
                        )}`}
                      >
                        {user.role || "UNKNOWN"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-right">
                      {user.role === "ADMIN" ? (
                        <span className="text-sm font-medium text-gray-400">
                          Protected
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteClick(user)
                          }
                          disabled={deletingId !== null}
                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================
          FOOTER
      ========================= */}
      {!loading && users.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Showing {users.length} user
          {users.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* =========================
          DELETE CONFIRMATION MODAL
      ========================= */}
      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete User"
        message={
          deleteModal.user
            ? `Are you sure you want to delete "${deleteModal.user.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this user?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deletingId !== null}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default Users;