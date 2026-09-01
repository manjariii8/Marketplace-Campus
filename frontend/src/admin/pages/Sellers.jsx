import { useEffect, useState } from "react";
import {
  getAdminSellers,
  approveSeller,
  rejectSeller,
} from "../services/adminService";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSellers();
  }, []);

  const loadSellers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminSellers();


      setSellers(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load sellers."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (sellerId) => {
    try {
      setProcessingId(sellerId);
      setError("");

      await approveSeller(sellerId);

      setSellers((current) =>
        current.map((seller) =>
          seller.sellerId === sellerId
            ? {
                ...seller,
                status: "APPROVED",
              }
            : seller
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to approve seller."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (sellerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this seller?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(sellerId);
      setError("");

      await rejectSeller(sellerId);

      setSellers((current) =>
        current.map((seller) =>
          seller.sellerId === sellerId
            ? {
                ...seller,
                status: "REJECTED",
              }
            : seller
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to reject seller."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const filteredSellers =
    filter === "ALL"
      ? sellers
      : sellers.filter(
          (seller) => seller.status === filter
        );

  const getStatusStyle = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Sellers
        </h1>

        <p className="mt-2 text-gray-500">
          Review and manage marketplace sellers.
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-3">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                filter === status
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {status === "ALL"
                ? "All Sellers"
                : status.charAt(0) +
                  status.slice(1).toLowerCase()}
            </button>
          )
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Seller
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Shop
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading sellers...
                  </td>
                </tr>
              ) : filteredSellers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No sellers found.
                  </td>
                </tr>
              ) : (
                filteredSellers.map((seller) => (
                  <tr
                    key={seller.sellerId}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Seller */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {seller.sellerName
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {seller.sellerName}
                          </p>

                          <p className="text-xs text-gray-400">
                            ID #{seller.sellerId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Business */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {seller.businessName || "—"}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {seller.email}
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {seller.phone || "—"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          seller.status
                        )}`}
                      >
                        {seller.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {seller.status === "PENDING" && (
                          <>
                            <button
                              onClick={() =>
                                handleApprove(
                                  seller.sellerId
                                )
                              }
                              disabled={
                                processingId ===
                                seller.sellerId
                              }
                              className="rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                            >
                              {processingId ===
                              seller.sellerId
                                ? "Processing..."
                                : "Approve"}
                            </button>

                            <button
                              onClick={() =>
                                handleReject(
                                  seller.sellerId
                                )
                              }
                              disabled={
                                processingId ===
                                seller.sellerId
                              }
                              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {seller.status === "APPROVED" && (
                          <span className="text-sm font-medium text-green-600">
                            Approved
                          </span>
                        )}

                        {seller.status === "REJECTED" && (
                          <span className="text-sm font-medium text-red-600">
                            Rejected
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Count */}
      {!loading && (
        <p className="mt-4 text-sm text-gray-500">
          Showing {filteredSellers.length} seller
          {filteredSellers.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default Sellers;