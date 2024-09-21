import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get current cart from localStorage
  let currentCart = getLocalStorage("so-cart");

  // Check if currentCart is an array, if not, initialize it as an empty array
  if (!Array.isArray(currentCart)) {
    currentCart = [];
  }

  // Add the new product to the cart array
  currentCart.push(product);

  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", currentCart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
