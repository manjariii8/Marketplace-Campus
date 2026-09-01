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

  const [products, setProducts] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [sortBy, setSortBy] =
    useState("createdAt");

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
   * =========================
   * LOAD PRODUCTS
   * =========================
   */

  useEffect(() => {
    loadProducts();
  }, [page, sortBy]);


  async function loadProducts() {

    try {

      setLoading(true);
      setError("");

      /*
       * If filters/search are being used,
       * use /products/search
       */

      const hasFilters =
        keyword.trim() !== "" ||
        categoryId !== "" ||
        minPrice !== "" ||
        maxPrice !== "";

      if (hasFilters) {

        const params = {
          page,
          size: 12,
          sort: sortBy,
        };

        if (keyword.trim()) {
          params.keyword = keyword.trim();
        }

        if (categoryId) {
          params.categoryId = categoryId;
        }

        if (minPrice !== "") {
          params.minPrice = minPrice;
        }

        if (maxPrice !== "") {
          params.maxPrice = maxPrice;
        }

        const response =
          await searchProducts(params);

        console.log(
          "Search response:",
          response.data
        );

        const result = response?.data;

        /*
         * Spring Page:
         *
         * {
         *   content: [],
         *   totalPages: 3,
         *   totalElements: 30
         * }
         */

        const content =
          result?.content || [];

        setProducts(content);

        setTotalPages(
          result?.totalPages || 1
        );

      } else {

        /*
         * No filters:
         * GET /api/products
         */

        const response =
          await getProducts();

        console.log(
          "Products response:",
          response.data
        );

        /*
         * Your backend returns:
         *
         * ApiResponse<List<ProductResponse>>
         *
         * Usually:
         *
         * {
         *   success: true,
         *   message: "...",
         *   data: [...]
         * }
         */

        const result =
          response?.data;

        const productList =
          Array.isArray(result)
            ? result
            : result?.data || [];

        setProducts(productList);

        /*
         * /products is currently not paginated.
         */
        setTotalPages(1);

      }

    } catch (error) {

      console.error(
        "Failed to load products:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Unable to load products."
      );

      setProducts([]);

    } finally {

      setLoading(false);

    }
  }


  /*
   * =========================
   * SEARCH
   * =========================
   */

  const handleSearch = () => {

    setPage(0);

    loadProducts();

  };


  /*
   * =========================
   * FILTER
   * =========================
   */

  const handleFilter = () => {

    setPage(0);

    loadProducts();

  };


  /*
   * =========================
   * CLEAR FILTERS
   * =========================
   */

  const clearFilters = () => {

    setKeyword("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt");
    setPage(0);

  };


  return (

    <div className="min-h-screen bg-slate-50 py-12">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-900">
            All Products
          </h1>

          <p className="mt-2 text-slate-500">
            Discover products from our marketplace.
          </p>

        </div>


        {/* ================= SEARCH ================= */}

        <div className="mb-8">

          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
          />

        </div>


        {/* ================= MAIN ================= */}

        <div className="grid gap-8 lg:grid-cols-4">


          {/* ================= FILTER ================= */}

          <div>

            <FilterSidebar
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onApply={handleFilter}
            />

            {/* Clear Filters */}

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear Filters
            </button>

          </div>


          {/* ================= PRODUCTS ================= */}

          <div className="lg:col-span-3">


            {/* TOP BAR */}

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

              <p className="text-sm text-slate-500">

                {products.length} product
                {products.length !== 1
                  ? "s"
                  : ""}

              </p>


              <SortDropdown
                sortBy={sortBy}
                setSortBy={(value) => {

                  setSortBy(value);
                  setPage(0);

                }}
              />

            </div>


            {/* ================= LOADING ================= */}

            {loading && (

              <div className="py-20 text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                <p className="mt-4 text-slate-500">
                  Loading products...
                </p>

              </div>

            )}


            {/* ================= ERROR ================= */}

            {!loading && error && (

              <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">

                <h2 className="font-bold text-red-700">
                  Something went wrong
                </h2>

                <p className="mt-2 text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={loadProducts}
                  className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Try Again
                </button>

              </div>

            )}


            {/* ================= PRODUCT GRID ================= */}

            {!loading && !error && (

              <ProductGrid
                products={products}
              />

            )}


            {/* ================= PAGINATION ================= */}

            {!loading &&
              !error &&
              totalPages > 1 && (

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />

              )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default Products;