import { Package } from "lucide-react";

const ProductGallery = ({ product }) => {
  console.log("PRODUCT GALLERY:", product);
  console.log("IMAGE DATA:", product?.imageData);

  return (
    <div className="space-y-4">

      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex h-[500px] items-center justify-center bg-slate-50">

          {product?.imageData ? (
            <img
              src={product.imageData}
              alt={product?.name || "Product"}
              className="h-full w-full object-contain p-6"
              onError={(e) => {
                console.error("IMAGE FAILED TO LOAD");
                console.error("IMAGE:", product.imageData);
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">

              <Package
                size={80}
                strokeWidth={1.2}
              />

              <p className="mt-4 text-sm">
                No product image available
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductGallery;