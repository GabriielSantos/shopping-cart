import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import {
  createCartProductElement,
  createProductElement,
  getIdFromProduct,
} from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

async function loadProducts() {
  const productsSection = document.querySelector('.products');

  // Mensagem de Carregando na tela enquanto faz requisição da API
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerHTML = 'Carregando...';
  productsSection.appendChild(loading);

  try {
    const products = await fetchProductsList('computador');

    loading.remove();

    products.forEach(async (element) => {
      const product = await createProductElement(element);
      document.querySelector('.products').appendChild(product);

      // Adiciona os itens ao carrinho quando clicado no botão
      const buttonAddCart = product.querySelector('.product__add');
      const cartProducts = document.querySelector('.cart__products');

      buttonAddCart.addEventListener('click', async () => {
        const idProduct = getIdFromProduct(product);
        const productData = await fetchProduct(idProduct);
        const cartElement = createCartProductElement(productData);

        saveCartID(idProduct);
        cartProducts.appendChild(cartElement);
      });
    });
  } catch (error) {
    loading.remove();

    // Mensagem de Erro quando falha a requisição da API
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error';
    errorMessage.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
    productsSection.appendChild(errorMessage);
  }
}

// Função que Carrega os Produtos no Carrinho
const loadProductsCart = async () => {
  const cartProducts = document.querySelector('.cart__products');
  const productsCart = getSavedCartIDs();
  const productPromises = productsCart.map((id) => fetchProduct(id));

  Promise.all(productPromises)
    .then((products) => {
      products.forEach((product) => {
        const cartElement = createCartProductElement(product);

        cartProducts.appendChild(cartElement);
      });
    });
};

loadProductsCart();
loadProducts();
