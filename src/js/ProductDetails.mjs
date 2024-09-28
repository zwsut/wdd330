import { setLocalStorage, updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    
    // once the HTML is rendered we can add a listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    // Retrieve the cart from localStorage
    let currentCart = JSON.parse(localStorage.getItem("so-cart"));
  
    // Log what currentCart contains for debugging
    console.log('Current Cart:', currentCart);
  
    // If currentCart is not an array (i.e., it could be an object or null), reset it to an empty array
    if (!Array.isArray(currentCart)) {
      currentCart = [];
    }
  
    // Add the product to the cart array
    currentCart.push(this.product);
  
    // Save the updated cart array back to localStorage
    localStorage.setItem("so-cart", JSON.stringify(currentCart));
  
    // Log the updated cart
    console.log('Updated Cart:', currentCart);
  
    // Optionally update the cart count display
    updateCartCount();
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
  }
}
