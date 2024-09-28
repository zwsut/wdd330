// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  // If clear is true, empty the parent element before inserting new content
  if (clear) {
    parentElement.innerHTML = ''; 
  }
  
  // Map over the list and create HTML strings using the provided template function
  const htmlStrings = list.map(templateFn);
  
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function updateCartCount() {
  // Retrieve the cart items from localStorage, or default to an empty array if none exist
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Get the cart count element in the DOM
  const cartCountElement = document.getElementById("cart-count");

  // Update the cart count with the length of the cart array (number of items)
  cartCountElement.textContent = cartItems.length;
}


