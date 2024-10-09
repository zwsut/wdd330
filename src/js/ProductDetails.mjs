import { setLocalStorage, updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
  console.log(product)  
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    ${product.FinalPrice < product.SuggestedRetailPrice ? 
      `<p class="product-card__price product-card__price--discounted">
        <s class="original-price">$${product.SuggestedRetailPrice}</s> 
        <span class="discounted-price">$${product.FinalPrice}</span>
      </p>` : 
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
