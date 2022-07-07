module.exports = () => {
  let data = {
    products: []
  };

  for (let i = 0; i < 10000; i++) {
    data.products.push({
      id: i + 1,
      price: (Math.random() * 100).toLocaleString('pt-BR', {maximumFractionDigits: 2}),
      name: `Camiseta ${i}`
    });
  }

  return data;
}