import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
});

const myCheckout = new CheckoutProcess('so-cart', '.order-summary');
myCheckout.init();

document.querySelector('#zip').addEventListener('blur', myCheckout.calculateOrdertotal.bind(myCheckout));

document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  
  const myForm = document.forms['checkout-form'];
  
  const chk_status = myForm.checkValidity();
  
  myForm.reportValidity();
  
  if (chk_status) {
    myCheckout.checkout();
  }
});
