import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/product/SearchBar";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const value = keyword.trim();

    if (!value) return;

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Search Products
            </h1>

            <p className="mt-2 text-slate-500">
              Find products from our marketplace.
            </p>
          </div>

          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
          />

        </div>
      </div>
    </div>
  );
};

export default Search;