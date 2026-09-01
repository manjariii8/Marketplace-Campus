import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  keyword,
  setKeyword,
  onSearch,
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full"
    >

      <FiSearch
        className="absolute left-4 top-4 text-slate-400"
        size={20}
      />

      <input
        type="text"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        placeholder="Search products..."
        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-28 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="submit"
        className="absolute right-2 top-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
      >
        Search
      </button>

    </form>
  );
};

export default SearchBar;