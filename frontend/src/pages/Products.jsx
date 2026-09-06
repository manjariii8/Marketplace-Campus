import { useEffect, useState } from "react";

import ProductGrid from "../components/product/ProductGrid";
import SearchBar from "../components/product/SearchBar";
import SortDropdown from "../components/product/SortDropdown";
import FilterSidebar from "../components/product/FilterSidebar";
import Pagination from "../components/product/Pagination";

import {
  getProducts,
  searchProducts,
} from "../services/productService";

const Products = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [products, setProducts] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Applied filters are kept separately from the fields.
  // This prevents search/filter buttons from using stale state.
  const [appliedFilters, setAppliedFilters] = useState({
    keyword: "",
    categoryId: "",
    minPrice: "",
    maxPrice: "",
  });

  // Mobile filter drawer
  const [showFilters, setShowFilters] = useState(false);

  // =========================================================
  // LOAD PRODUCTS
  // =========================================================

  useEffect(() => {
    loadProducts();
  }, [page, sortBy, appliedFilters]);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const hasFilters =
        appliedFilters.keyword.trim() !== "" ||
        appliedFilters.categoryId !== "" ||
        appliedFilters.minPrice !== "" ||
        appliedFilters.maxPrice !== "";

      if (hasFilters) {
        const params = {
          page,
          size: 12,
          sort: sortBy,
        };

        if (appliedFilters.keyword.trim()) {
          params.keyword =
            appliedFilters.keyword.trim();
        }

        if (appliedFilters.categoryId) {
          params.categoryId =
            appliedFilters.categoryId;
        }

        if (appliedFilters.minPrice !== "") {
          params.minPrice =
            appliedFilters.minPrice;
        }

        if (appliedFilters.maxPrice !== "") {
          params.maxPrice =
            appliedFilters.maxPrice;
        }

        const response =
          await searchProducts(params);

        const result = response?.data;

        const content =
          result?.content || [];

        setProducts(content);

        setTotalPages(
          result?.totalPages || 1
        );

        setTotalElements(
          result?.totalElements ||
            content.length
        );
      } else {
        const response =
          await getProducts();

        const result =
          response?.data;

        const productList =
          Array.isArray(result)
            ? result
            : result?.data || [];

        setProducts(productList);

        setTotalPages(1);

        setTotalElements(
          productList.length
        );
      }
    } catch (err) {
      console.error(
        "Failed to load products:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load products. Please try again."
      );

      setProducts([]);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = () => {
    setPage(0);

    setAppliedFilters({
      keyword,
      categoryId,
      minPrice,
      maxPrice,
    });
  };

  // =========================================================
  // FILTER
  // =========================================================

  const handleFilter = () => {
    setPage(0);

    setAppliedFilters({
      keyword,
      categoryId,
      minPrice,
      maxPrice,
    });

    setShowFilters(false);
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setKeyword("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");

    setAppliedFilters({
      keyword: "",
      categoryId: "",
      minPrice: "",
      maxPrice: "",
    });

    setSortBy("createdAt");
    setPage(0);

    setShowFilters(false);
  };

  // =========================================================
  // REMOVE INDIVIDUAL FILTER
  // =========================================================

  const removeFilter = (type) => {
    let updated = {
      ...appliedFilters,
    };

    if (type === "keyword") {
      setKeyword("");
      updated.keyword = "";
    }

    if (type === "category") {
      setCategoryId("");
      updated.categoryId = "";
    }

    if (type === "minPrice") {
      setMinPrice("");
      updated.minPrice = "";
    }

    if (type === "maxPrice") {
      setMaxPrice("");
      updated.maxPrice = "";
    }

    setPage(0);
    setAppliedFilters(updated);
  };

  // =========================================================
  // ACTIVE FILTER COUNT
  // =========================================================

  const activeFilterCount =
    [
      appliedFilters.keyword,
      appliedFilters.categoryId,
      appliedFilters.minPrice,
      appliedFilters.maxPrice,
    ].filter(
      (value) => value !== ""
    ).length;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* =====================================================
          TOP SEARCH / HERO AREA
      ===================================================== */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">

          {/* Breadcrumb */}

          <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">

            <span className="hover:text-blue-600 cursor-pointer">
              Home
            </span>

            <span>/</span>

            <span className="font-medium text-slate-700">
              Products
            </span>

          </div>

          {/* Heading */}

          <div className="mb-6">

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover quality products from trusted sellers
              across our marketplace.
            </p>

          </div>

          {/* Search */}

          <div className="max-w-4xl">

            <SearchBar
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={handleSearch}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ===================================================
            ACTIVE FILTER CHIPS
        =================================================== */}

        {activeFilterCount > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">

            <span className="mr-1 text-sm font-semibold text-slate-700">
              Applied filters:
            </span>

            {appliedFilters.keyword && (
              <FilterChip
                label={`Search: ${appliedFilters.keyword}`}
                onRemove={() =>
                  removeFilter("keyword")
                }
              />
            )}

            {appliedFilters.categoryId && (
              <FilterChip
                label="Category selected"
                onRemove={() =>
                  removeFilter("category")
                }
              />
            )}

            {appliedFilters.minPrice && (
              <FilterChip
                label={`Min ₹${appliedFilters.minPrice}`}
                onRemove={() =>
                  removeFilter("minPrice")
                }
              />
            )}

            {appliedFilters.maxPrice && (
              <FilterChip
                label={`Max ₹${appliedFilters.maxPrice}`}
                onRemove={() =>
                  removeFilter("maxPrice")
                }
              />
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="ml-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>

          </div>
        )}


        {/* ===================================================
            MOBILE FILTER BUTTON
        =================================================== */}

        <div className="mb-5 flex items-center justify-between lg:hidden">

          <button
            type="button"
            onClick={() =>
              setShowFilters(true)
            }
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-500 hover:text-blue-600"
          >

            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4h18M6 12h12M10 20h4"
              />
            </svg>

            Filters

            {activeFilterCount > 0 && (
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                {activeFilterCount}
              </span>
            )}

          </button>

          <SortDropdown
            sortBy={sortBy}
            setSortBy={(value) => {
              setSortBy(value);
              setPage(0);
            }}
          />

        </div>


        {/* ===================================================
            PRODUCT + FILTER GRID
        =================================================== */}

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">


          {/* =================================================
              DESKTOP FILTER SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-6">

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* Filter Header */}

                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Filters
                    </h2>

                    {activeFilterCount > 0 && (
                      <p className="mt-1 text-xs text-blue-600">
                        {activeFilterCount} applied
                      </p>
                    )}

                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Clear
                    </button>
                  )}

                </div>

                {/* Filter Content */}

                <div className="p-5">

                  <FilterSidebar
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    onApply={handleFilter}
                  />

                </div>

              </div>

            </div>

          </aside>


          {/* =================================================
              PRODUCTS AREA
          ================================================= */}

          <section className="min-w-0">


            {/* ===============================================
                PRODUCT TOOLBAR
            =============================================== */}

            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

              <div>

                <h2 className="font-bold text-slate-900">
                  Products
                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  {loading
                    ? "Finding the best products..."
                    : totalElements > 0
                    ? `${totalElements} ${
                        totalElements === 1
                          ? "item"
                          : "items"
                      } found`
                    : "No products found"}

                </p>

              </div>


              <div className="hidden lg:block">

                <SortDropdown
                  sortBy={sortBy}
                  setSortBy={(value) => {
                    setSortBy(value);
                    setPage(0);
                  }}
                />

              </div>

            </div>


            {/* ===============================================
                LOADING STATE
            =============================================== */}

            {loading && (
              <ProductSkeleton />
            )}


            {/* ===============================================
                ERROR STATE
            =============================================== */}

            {!loading && error && (

              <div className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">

                  <svg
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.82A2 2 0 004.62 20h14.76a2 2 0 001.73-3.32l-7.4-12.82a2 2 0 00-3.42 0z"
                    />
                  </svg>

                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  We couldn't load the products
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={loadProducts}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  Try Again
                </button>

              </div>

            )}


            {/* ===============================================
                EMPTY STATE
            =============================================== */}

            {!loading &&
              !error &&
              products.length === 0 && (

                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

                    <svg
                      className="h-10 w-10 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>

                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-900">
                    No products found
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    We couldn't find products matching your
                    current search or filters. Try changing
                    your search or clearing the filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>

                </div>

              )}


            {/* ===============================================
                PRODUCT GRID
            =============================================== */}

            {!loading &&
              !error &&
              products.length > 0 && (

                <ProductGrid
                  products={products}
                />

              )}


            {/* ===============================================
                PAGINATION
            =============================================== */}

            {!loading &&
              !error &&
              totalPages > 1 && (

                <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />

                </div>

              )}

          </section>

        </div>

      </main>


      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      {showFilters && (

        <div className="fixed inset-0 z-50 lg:hidden">

          {/* Overlay */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setShowFilters(false)
            }
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Drawer */}

          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl">

            {/* Drawer Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Filters
                </h2>

                {activeFilterCount > 0 && (
                  <p className="mt-1 text-xs text-blue-600">
                    {activeFilterCount} filters applied
                  </p>
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

            </div>

            {/* Drawer Body */}

            <div className="flex-1 overflow-y-auto p-5">

              <FilterSidebar
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                onApply={handleFilter}
              />

            </div>

            {/* Drawer Footer */}

            <div className="border-t border-slate-200 p-4">

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex-1 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleFilter}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Apply Filters
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


// =============================================================
// FILTER CHIP
// =============================================================

const FilterChip = ({
  label,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">

      <span>{label}</span>

      <button
        type="button"
        onClick={onRemove}
        className="flex h-4 w-4 items-center justify-center rounded-full text-blue-500 transition hover:bg-blue-100 hover:text-blue-800"
        aria-label={`Remove ${label}`}
      >
        ×
      </button>

    </div>
  );
};


// =============================================================
// PRODUCT SKELETON
// =============================================================

const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">

      {Array.from({ length: 8 }).map(
        (_, index) => (

          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >

            <div className="aspect-square animate-pulse bg-slate-200" />

            <div className="space-y-3 p-4">

              <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />

              <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />

            </div>

          </div>

        )
      )}

    </div>
  );
};

export default Products;
