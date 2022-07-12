import { FormEvent, useMemo, useState } from "react";
import { Product } from "./Product";

export function ProductListing() {
  const [search, setSearch] = useState('');
  const [productList, setProductList] = useState<{
    id: number,
    name: string,
    price: string
  }[]>([]);

  const totalPrice = useMemo(() => {
    return productList.reduce((total, product) => {
      // Costful operation with strings
      return total + Number(product.price.replace('R$ ', '').replace(',', '.'));
    }, 0);
  }, [productList]);
  
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!search.trim())
      return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setProductList(data);
  }

  return (
    <>
      <h1>Minha listagem de produtos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type='submit'>
          Buscar
        </button>
      </form>

      <h2>Total: R$ {totalPrice.toLocaleString('pt-BR', {maximumFractionDigits: 2})}</h2>

      {productList.map(product => (
        <Product
          product={product}
        />
      ))}
    </>
  )
}