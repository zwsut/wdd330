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
    } else {
      this.listElement.innerHTML = '<p>Your cart is empty.</p>';
    }
  }

  // Template for cart items
  cartItemTemplate(item) {
    return `
      <li class="cart-card divider">
        <a href="#" class="cart-card__image">
          <img src="${item.Image}" alt="${item.Name}" />
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        <span data-id="${item.Id}" class="remove-item">X</span>
      </li>`;
  }

  // Method to update the total amount
  calculateCartTotal() {
    const cartItems = getLocalStorage('so-cart') || [];
    let total = 0;
    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });
    return total.toFixed(2);
  }

  updateTotalCart() {
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
