import { renderListWithTemplate } from './utils.mjs'; // Import the utility function

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = document.querySelector(listElement);
    }
  
    async init() {
      try {
        const products = await this.dataSource.getData(); // Fetch the product data
        const filteredProducts = this.filterProducts(products); // Filter the products to the ones with specific IDs
        this.renderList(filteredProducts); // Render the filtered product list
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
  
    // Method to filter the product list by specific IDs
    filterProducts(products) {
      const requiredIds = ['880RR', '985RF', '985PR', '344YJ']; // The list of specific IDs you need
      return products.filter(product => requiredIds.includes(product.Id)); // Filter products by matching IDs
    }
  
    renderList(products) {
      renderListWithTemplate(productCardTemplate, this.listElement, products, 'afterbegin', true);
    }
  }
  


  export function productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
          <img src="${product.Image}" alt="Image of ${product.Name}">
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }
  