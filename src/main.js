import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = await fetchProductsList('computador');
products.forEach(async (element) => {
  const product = await createProductElement(element);
  document.querySelector('.products').appendChild(product);
});
