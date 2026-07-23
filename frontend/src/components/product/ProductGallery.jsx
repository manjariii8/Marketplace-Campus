const ProductGallery = ({ product }) => {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <img
          src="https://placehold.co/700x550/f8fafc/1e293b?text=Product"
          alt={product.name}
          className="h-[500px] w-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <img
            key={item}
            src={`https://placehold.co/150x150/f8fafc/1e293b?text=${item}`}
            alt=""
            className="rounded-xl border cursor-pointer hover:border-blue-600"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;