const RelatedProducts = () => {
  return (
    <section className="mt-24">

      <h2 className="text-3xl font-bold mb-8">
        Related Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {[1,2,3,4].map((item)=>(
          <div
            key={item}
            className="bg-white rounded-xl shadow p-4"
          >

            <img
              src="https://placehold.co/300x250"
              alt=""
              className="rounded-lg"
            />

            <h3 className="mt-4 font-semibold">
              Product Name
            </h3>

            <p className="text-blue-600 font-bold">
              ₹999
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default RelatedProducts;