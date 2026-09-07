import { Laptop, Shirt, Smartphone, Watch, Sofa, BookOpen } from "lucide-react";

import { Link } from "react-router-dom";

const categories = [
  {
    icon: Laptop,
    title: "Electronics",
  },
  {
    icon: Shirt,
    title: "Fashion",
  },
  {
    icon: Smartphone,
    title: "Mobiles",
  },
  {
    icon: Sofa,
    title: "Furniture",
  },
  {
    icon: Watch,
    title: "Accessories",
  },
  {
    icon: BookOpen,
    title: "Books",
  },
];

const Categories = () => {
  return (
    <div className="bg-slate-50 pt-15 pb-15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Shop by Category
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Explore our marketplace by category and discover products that match
            your needs.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                to={`/products?category=${encodeURIComponent(category.title)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition group-hover:bg-blue-600">
                  <Icon
                    size={32}
                    className="text-blue-600 transition group-hover:text-white"
                  />
                </div>

                <h2 className="mt-5 font-semibold text-slate-800">
                  {category.title}
                </h2>

                <p className="mt-2 text-xs text-slate-400">Explore products</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
