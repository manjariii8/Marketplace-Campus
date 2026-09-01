import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-800">
          No products found
        </h3>

        <p className="mt-2 text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;