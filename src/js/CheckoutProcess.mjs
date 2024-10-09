import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

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
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const packagedItems = items.map(item => ({
      id: item.Id,
      quantity: item.quantity
    }));
  return packagedItems;
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
      console.log(this.list.length);
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
      this.displayOrderTotals();

      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const subtotalElement = document.querySelector('#subtotal');
      const shippingElement = document.querySelector('#shipping');
      const taxElement = document.querySelector('#tax');
      const orderTotalElement = document.querySelector('#order-total');

      subtotalElement.textContent = this.itemTotal;
      shippingElement.textContent = this.shipping;
      taxElement.textContent = this.tax;
      orderTotalElement.textContent = this.orderTotal;
    }
  }