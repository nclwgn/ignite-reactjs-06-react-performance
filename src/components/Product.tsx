import { memo } from "react";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
  };
}

function ProductComponent({
  product
} : ProductProps) {
  return (
    <div>{product.name} - <strong>R$ {product.price}</strong></div>
  );
}

export const Product = memo(ProductComponent, (prevProps, newProps) => {
  // Deep comparison, a little bit more costful for the application
  return Object.is(prevProps.product, newProps.product);
});