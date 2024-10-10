import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';


document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
});
const myCheckout = new CheckoutProcess('so-cart', '.order-summary');

myCheckout.init();


document
  .querySelector('#zip').addEventListener('blur', myCheckout.calculateOrdertotal.bind(myCheckout));

  document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();

  myCheckout.checkout();
});