const baseURL = 'https://wdd330-backend.onrender.com/products/search/';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData() {
    console.log('Fetching products for category:', this.category); // Check category value
  
    const response = await fetch(baseURL + this.category); // Fetch using the stored category
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const products = await this.getData();

    const product = products.find(product => product.Id === id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    console.log(product);
    return product;
  }
}
