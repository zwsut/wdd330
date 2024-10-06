import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
if (!category) {
  console.error('Category is missing from the URL');
} else {

  const h1 = document.getElementById('categoryh1');
  h1.textContent = category.toUpperCase();

  const dataSource = new ProductData(category);
  console.log('DataSource initialized with category:', category);

  const listElement = document.querySelector('.product-list');
  if (!listElement) {
    console.error('Product list element not found');
  } else {
    console.log('List Element found', listElement);

    const myList = new ProductListing(category, dataSource, listElement);
    console.log('Product listing instance created with category:', category);

    myList.init();
  }
}
