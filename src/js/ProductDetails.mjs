import {  updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail">
    <h2 class="divider">${product.Brand.Name} ${product.NameWithoutBrand}</h2>
    <div class="product-detail__image">
      <img
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      ${product.FinalPrice < product.SuggestedRetailPrice ? 
        `<img src="/images/discount-flag.png" alt="Discount" class="discount-flag">` 
        : 
        ''
      }
    </div>
    ${product.FinalPrice < product.SuggestedRetailPrice ? 
      `<div class="savings-container">
      <p class="product-card__price product-card__price--discounted">
        <s class="original-price">$${product.SuggestedRetailPrice}</s> 
        <span class="discounted-price">$${product.FinalPrice}</span> 
      </p> 
      </div>
      <span class="savings" style="font-weight: bold;">You are saving: $${Math.floor(product.SuggestedRetailPrice - product.FinalPrice)}</span>` 
      : 
      `<p class="product-card__price">$${product.FinalPrice}</p>`
    }
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
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let currentCart = JSON.parse(localStorage.getItem("so-cart")) || [];
  
    const existingProduct = currentCart.find(item => item.Id === this.product.Id);
  
    if (existingProduct) {
      existingProduct.quantity = existingProduct.quantity ? existingProduct.quantity + 1 : 2;
    } else {
      this.product.quantity = 1;
      currentCart.push(this.product);
    }
  
    localStorage.setItem("so-cart", JSON.stringify(currentCart));
  
    updateCartCount();
  }
  

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
  }
}
