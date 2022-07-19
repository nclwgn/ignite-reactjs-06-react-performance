import { FormEvent, useCallback, useMemo, useState } from "react";
import { Product } from "./Product";

type Results = {
  totalPrice: number;
  data: any[];
}

export function ProductListing() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>();
  
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!search.trim())
      return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const totalPrice = data.reduce((total: number, product: any) => {
      // Costful operation with strings
      return total + Number(product.price.replace('R$ ', '').replace(',', '.'));
    }, 0);

    setResults({ totalPrice, data });
  }

  const addToWishlist = useCallback((id: number) => {
    console.log(`added ${id} to wishlist`);
  }, []);

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

      <h2>Total: R$ {results?.totalPrice.toLocaleString('pt-BR', {maximumFractionDigits: 2})}</h2>

      {results?.data.map((product: any) => (
        <Product
          key={product.id}
          product={product}
          onAddToWishlist={addToWishlist}
        />
      ))}
    </>
  )
}