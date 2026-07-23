import WishlistCard from "./WishlistCard";

const WishlistGrid = ({
  items,
  onRemove,
  onMoveToCart,
}) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {items.map((item) => (
        <WishlistCard
          key={item.id}
          item={item}
          onRemove={onRemove}
          onMoveToCart={onMoveToCart}
        />
      ))}

    </div>
  );
};

export default WishlistGrid;