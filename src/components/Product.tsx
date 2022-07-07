interface ProductProps {
  id: number;
  name: string;
  price: string;
}

export function Product({
  id,
  name,
  price
} : ProductProps) {
  return (
    <div>{name} -<strong> R$ {price}</strong></div>
  );
}