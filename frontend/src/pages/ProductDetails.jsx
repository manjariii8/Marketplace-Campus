import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";
import { getProduct } from "../services/productService";
import BackButton from "../components/common/BackButton";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {

    try {

      const response = await getProduct(id);

      setProduct(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  if (!product) {

    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );

  }

  return (

    <div className="bg-slate-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-12">
        <BackButton/>

        <ProductGallery product={product} />

        <ProductInfo
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">

        <RelatedProducts />

      </div>

    </div>

  );

};

export default ProductDetails;