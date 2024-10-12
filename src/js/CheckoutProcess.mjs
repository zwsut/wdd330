import { getLocalStorage, alertMessage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';


const services = new ExternalServices();

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }

    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }

    calculateItemSummary() {

        this.list.forEach(item => {
            this.itemTotal += item.FinalPrice * (item.quantity || 1);
        });
        this.itemTotal = parseFloat(this.itemTotal.toFixed(2));
        this.calculateOrdertotal();
        this.displayOrderTotals();
    }

    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      if(this.list.length === 1)
        {
          this.shipping = 10;
        }
        else if(this.list.length > 1)
        {
          this.shipping = 10 + (this.list.length - 1) * 2;
        }
        else
        {
          this.shipping = 0;
        }
      // Calcular el impuesto
      this.tax = this.itemTotal * 0.06;

      // Calcular el total del pedido
      this.orderTotal = this.itemTotal + this.shipping + this.tax;

      // Redondear a dos decimales
      this.shipping = parseFloat(this.shipping.toFixed(2));
      this.tax = parseFloat(this.tax.toFixed(2));
      this.orderTotal = parseFloat(this.orderTotal.toFixed(2));
      // this.tax = this.tax.toString()
      // this.orderTotal = this.orderTotal.toString()
      this.displayOrderTotals();

      // display the totals.
      this.displayOrderTotals();
    }

    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const subtotalElement = document.querySelector('#subtotal');
      const shippingElement = document.querySelector('#shipping');
      const taxElement = document.querySelector('#tax');
      const orderTotalElement = document.querySelector('#orderTotal');

      subtotalElement.textContent = this.itemTotal.toFixed(2);
      shippingElement.textContent = this.shipping.toFixed(2);
      taxElement.textContent = this.tax.toFixed(2);
      orderTotalElement.textContent = this.orderTotal.toFixed(2);
    }


    async checkout() {
      const formElement = document.forms['checkout-form'];

      const json = formDataToJSON(formElement);

      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      // try {
      //   const res = await services.checkout(json);
      //   console.log(res);
      // } catch (err) {
      //   console.log(err);
      // }
      
      try {
        const res = await services.checkout(json);
        console.log(res);

        localStorage.removeItem(this.key);
        
        window.location.href = '/checkout/success.html';
      } catch (err) {
        console.error('Checkout failed:', err);

        alertMessage('An error occurred during checkout. Please check your information and try again.');
        
        const errorElement = document.querySelector('#error-message');
        if (errorElement) {
          errorElement.textContent = 'An error occurred during checkout. Please try again or contact support at (555) 555-1234.';
        }
    
        console.log('Detailed error:', err.message);
      }

    }
  }