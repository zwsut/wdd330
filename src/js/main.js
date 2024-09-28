import ProductListing from './ProductList.mjs';
import ProductData from './ProductData.mjs';
import { updateCartCount } from './utils.mjs';

const dataSource = new ProductData('tents');

const productList = new ProductListing('tents', dataSource, '.product-list');
productList.init();

document.addEventListener("DOMContentLoaded", updateCartCount);