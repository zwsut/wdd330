import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

const category = getParam('category');
const productId = getParam('product');

const dataSource = new ExternalServices(category);

const product = new ProductDetails(productId, dataSource);
product.init();

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
});
