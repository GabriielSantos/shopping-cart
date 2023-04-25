export const fetchProduct = async (idProduct) => {
  if (!idProduct) {
    throw new Error('ID não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/items/${idProduct}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (productList) => {
  if (!productList) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productList}`);
  const data = await response.json();
  return data.results;
};
