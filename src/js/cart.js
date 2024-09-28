import { getLocalStorage, updateCartCount } from './utils.mjs';

function renderCartContents() {
  // Get the cart items from localStorage or use an empty array if none exist
  const cartItems = getLocalStorage('so-cart') || [];

  // Ensure we only proceed if cartItems is an array
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  } else {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty.</p>';
  }
}

function cartItemTemplate(item) {
  const newItem = `
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
    </li>`;

  return newItem;
}

// Call this to render cart contents on page load
renderCartContents();

document.addEventListener("DOMContentLoaded", updateCartCount);