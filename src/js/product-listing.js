import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const h1 = document.getElementById('categoryh1');

const category = getParam('category');
// console.log('Category:', category);
h1.textContent = category.toUpperCase();

const dataSource = new ProductData();
// console.log('DataSource initialized', dataSource);

const listElement = document.querySelector('.product-list');
// console.log('List Element found', listElement);

const myList = new ProductListing(category, dataSource, listElement);
// console.log('Product listing instance created', myList);

myList.init();
