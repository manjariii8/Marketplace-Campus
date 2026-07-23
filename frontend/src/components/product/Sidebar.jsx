import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

const CategorySidebar = ({ selectedCategory, onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const response = await getCategories();
    setCategories(response.data);
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-bold mb-4">Categories</h2>

      <button
        onClick={() => onSelect("")}
        className={`block w-full text-left p-2 rounded ${
          selectedCategory === "" ? "bg-blue-100" : ""
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`block w-full text-left p-2 rounded ${
            selectedCategory === category.id ? "bg-blue-100" : ""
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySidebar;