import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { saveCartID } from './helpers/cartFunctions';
import {
  createCartProductElement,
  createProductElement,
  getIdFromProduct,
} from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

async function loadProducts() {
  const productsSection = document.querySelector('.products');

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

      const buttonAddCart = product.querySelector('.product__add');
      const cartProducts = document.querySelector('.cart__products');

      buttonAddCart.addEventListener('click', async () => {
        const id = getIdFromProduct(product);
        const productData = await fetchProduct(id);
        const cartElement = createCartProductElement(productData);

        saveCartID(id);
        cartProducts.appendChild(cartElement);
      });
    });
  } catch (error) {
    loading.remove();

    const errorMessage = document.createElement('p');
    errorMessage.className = 'error';
    errorMessage.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
    productsSection.appendChild(errorMessage);
  }
}

loadProducts();
