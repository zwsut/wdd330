import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const category = getParam('category');
const productId = getParam('product');

const dataSource = new ProductData(category);

const product = new ProductDetails(productId, dataSource);
product.init();

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
});
