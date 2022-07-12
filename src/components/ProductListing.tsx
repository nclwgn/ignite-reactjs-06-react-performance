import { FormEvent, useState } from "react";
import { Product } from "./Product";

export function ProductListing() {
  const [search, setSearch] = useState('');
  const [productList, setProductList] = useState<{
    id: number,
    name: string,
    price: string
  }[]>([]);
  
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

      {productList.map(product => (
        <Product
          product={product}
        />
      ))}
    </>
  )
}