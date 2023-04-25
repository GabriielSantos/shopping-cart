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

export const loading = () => {
  const loaded = document.createElement('p');
  loaded.className = 'loading';
  loaded.innerHTML = 'carregando...';
  document.querySelector('.products').appendChild(loaded);
};

export const errorLoading = () => {
  const loaded = document.createElement('p');
  loaded.className = 'error';
  loaded.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  document.querySelector('.products').appendChild(loaded);
};

export const cleanLoading = () => {
  const loaded = document.createElement('p');
  loaded.innerHTML = '';
  document.querySelector('.products').appendChild(loaded);
};
