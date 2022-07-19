import { memo, useState, lazy, Suspense } from "react";

const AddProductToWishlist = lazy(() => {
  return import('./AddProductToWishlist');
})

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
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.name} - <strong>R$ {product.price}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      <Suspense fallback='Carregando...'>
        { isAddingToWishlist && 
          <AddProductToWishlist
            onAddToWishlist={() => onAddToWishlist(product.id)}
            onRequestClose={() => setIsAddingToWishlist(false)}
          />
        }
      </Suspense>
    </div>
  );
}

export const Product = memo(ProductComponent, (prevProps, newProps) => {
  // Deep comparison, a little bit more costful for the application
  return Object.is(prevProps.product, newProps.product);
});