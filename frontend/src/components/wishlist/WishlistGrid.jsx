import WishlistCard from "./WishlistCard";

const WishlistGrid = ({
  items,
  onRemove,
  onMoveToCart,
}) => {

  const wishlistItems = Array.isArray(items)
    ? items
    : [];

  if (wishlistItems.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {wishlistItems.map((item) => (

        <WishlistCard
          key={
            item.id ??
            item.productId ??
            item.product?.id
          }
          item={item}
          onRemove={onRemove}
          onMoveToCart={onMoveToCart}
        />

      ))}

    </div>
  );
};

export default WishlistGrid;