import { useEffect, useState } from "react";
import ProductGrid from "../product/ProductGrid";
import { getProducts } from "../../services/productService";

const FeaturedProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await getProducts({
        page: 0,
        size: 8,
        sortBy: "createdAt",
        direction: "desc"
      });

      setProducts(response.data.content);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="bg-slate-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="text-blue-600 font-semibold uppercase tracking-wider">
              Latest Collection
            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">
              Featured Products
            </h2>

          </div>

        </div>

        <ProductGrid products={products} />

      </div>

    </section>
  );
};

export default FeaturedProducts;