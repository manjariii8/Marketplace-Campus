const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center gap-3">

      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className="rounded-lg border px-5 py-2 disabled:opacity-40"
      >
        Previous
      </button>

      <span className="rounded-lg bg-blue-600 px-5 py-2 text-white">
        {page + 1}
      </span>

      <button
        disabled={page + 1 === totalPages}
        onClick={() => setPage(page + 1)}
        className="rounded-lg border px-5 py-2 disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;