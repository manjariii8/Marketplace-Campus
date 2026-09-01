import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const debouncedKeyword = useDebounce(keyword);

  useEffect(() => {
    if (!debouncedKeyword.trim()) return;

    navigate(`/products?search=${debouncedKeyword}`);
  }, [debouncedKeyword]);

  return (
    <div className="relative">

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        placeholder="Search products..."
        className="w-72 rounded-xl border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
      />

    </div>
  );
};

export default SearchBar;