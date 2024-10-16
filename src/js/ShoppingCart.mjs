import { getLocalStorage, setLocalStorage, renderListWithTemplate } from './utils.mjs';

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = document.querySelector(listElement);
  }

  init() {
    this.renderCartContents();
    this.updateTotalCart();
  }

  // Method to get cart items and render them
  renderCartContents() {
    const cartItems = getLocalStorage('so-cart') || [];
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      renderListWithTemplate(this.cartItemTemplate, this.listElement, cartItems, 'afterbegin', true);
      this.addEventListenersToRemoveButtons(); // Adds listeners to remove buttons
      this.calculateQuantity();
    } else {
      this.listElement.innerHTML = '<p>Your cart is empty.</p>';
    }
  }


  cartItemTemplate(item) {
    const imageUrl = item.Image || (item.Images && item.Images.PrimaryLarge);
  
    return `
      <li class="cart-card divider">
        <a href="#" class="cart-card__image">
          <img src="${imageUrl}" alt="${item.Name}" />
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors ? item.Colors[0].ColorName : ''}</p>
        <label for="quantity">Quantity:</label>
        <select name="quantity" class="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        <span data-id="${item.Id}" class="remove-item">X</span>
      </li>`;
  }
  
  // This function gets the value from the quantity select button

  calculateQuantity() {
    const quantity = document.querySelectorAll('.quantity');
    const quantities = [];
    quantity.forEach((selectButton) => {
      selectButton.addEventListener('change', this.updateTotalCart);
      var value = selectButton.value;
      value = parseInt(value);
      quantities.push(value);
    });
    return quantities;
  }

  // Method to update the total amount
  calculateCartTotal() {
    const cartItems = getLocalStorage('so-cart') || [];
    let total = 0;
    var quantities = []
    quantities = this.calculateQuantity();
    let subtotal = 0
    for (let i = 0; i < quantities.length; i++) {
      subtotal = quantities[i] * cartItems[i].FinalPrice;
      total += subtotal
    }  
    return total.toFixed(2);
  }

  updateTotalCart = () => {
    const cartFooter = document.querySelector('.cart-footer');
    const cartItems = getLocalStorage('so-cart') || [];

    if (cartItems.length > 0) {
      const total = this.calculateCartTotal();
      document.getElementById('cart-total-amount').textContent = total;
      cartFooter.classList.remove('hide');
    } else {
      cartFooter.classList.add('hide');
    }
  }

  // Method to remove an item from the cart
  removeItem(event) {
    const itemId = event.target.getAttribute('data-id');
    let cartItems = getLocalStorage('so-cart');
    cartItems = cartItems.filter((item) => item.Id !== itemId);
    setLocalStorage('so-cart', cartItems);
    this.renderCartContents();
    this.updateTotalCart();
  }

  // Method to add event listeners to remove buttons
  addEventListenersToRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach((button) => {
      button.addEventListener('click', (event) => this.removeItem(event));
    });
  }
}
