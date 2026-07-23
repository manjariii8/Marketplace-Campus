import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import ProductTable from "../../components/seller/ProductTable";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await getAllProducts();

      console.log(response);

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-8">
      <ProductTable products={products} reload={loadProducts} />
    </div>
  );
};

export default Products;
