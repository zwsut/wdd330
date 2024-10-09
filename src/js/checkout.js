import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';


document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
});
const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();