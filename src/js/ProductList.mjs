import { renderListWithTemplate } from './utils.mjs';

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    async init() {
      try {
        const list = await this.dataSource.getData(this.category);
        console.log(list)
        // const filteredProducts = this.filterProducts(list);
        this.renderList(list);
      } catch (error) {
        
        console.error('Error fetching product data:', error);
      }
    }
  
    filterProducts(products) {
      const requiredIds = ['880RR', '985RF', '985PR', '344YJ'];
      return products.filter(product => requiredIds.includes(product.Id));
    }
  
    renderList(products) {
      renderListWithTemplate(productCardTemplate, this.listElement, products, 'afterbegin', true);
    }
  }
  


  export function productCardTemplate(product) {
    console.log(product)
    return `
      <li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
          <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          ${product.FinalPrice < product.SuggestedRetailPrice ? 
            `<p class="product-card__price product-card__price--discounted">
              <s class="original-price">$${product.SuggestedRetailPrice}</s> 
              <span class="discounted-price">$${product.FinalPrice}</span>
            </p>` : 
            `<p class="product-card__price">$${product.FinalPrice}</p>`
          }
        </a>
      </li>
    `;
  }
  