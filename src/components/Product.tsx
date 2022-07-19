import { memo } from "react";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductComponent({
  product,
  onAddToWishlist
} : ProductProps) {
  return (
    <div>
      {product.name} - <strong>R$ {product.price}</strong>
      <button onClick={() => onAddToWishlist(product.id)}>Add to wishlist</button>
    </div>
  );
}

export const Product = memo(ProductComponent, (prevProps, newProps) => {
  // Deep comparison, a little bit more costful for the application
  return Object.is(prevProps.product, newProps.product);
});