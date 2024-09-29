import { getLocalStorage, updateCartCount, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  // Get the cart items from localStorage or use an empty array if none exist
  const cartItems = getLocalStorage('so-cart') || [];

  // Ensure we only proceed if cartItems is an array
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    addEventListenersToRemoveButtons(); // Adds listeners
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
      <span data-id="${item.Id}" class="remove-item">X</span>
    </li>`;

  return newItem;
}

// Función para calcular el total del carrito
function calculateCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
  let total = 0;

  cartItems.forEach((item) => {
    total += item.FinalPrice;
  });
  return total.toFixed(2);
}

function updateTotalCart() {
  const cartFooter = document.querySelector('.cart-footer');
  const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];

  if (cartItems.length > 0) {
    const total = calculateCartTotal();
    document.getElementById('cart-total-amount').textContent = total;
    cartFooter.classList.remove('hide');
  } else {
    cartFooter.classList.add('hide');
  }
}

// This function removes an item from the cart

function removeItem(event) {
  const itemId = event.target.getAttribute('data-id');
  let cartItems = getLocalStorage('so-cart');
  cartItems = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
  updateTotalCart();
}

// This function adds Event Listeners to all Remove Buttons

function addEventListenersToRemoveButtons() {
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach((button) => {
    button.addEventListener('click', removeItem);
  });
}

// Call this to render cart contents on page load
renderCartContents();

document.addEventListener('DOMContentLoaded', updateCartCount);
document.addEventListener('DOMContentLoaded', updateTotalCart);
window.addEventListener('storage', function (e) {
  if (e.key === 'so-cart') {
    updateTotalCart();
  }
});
