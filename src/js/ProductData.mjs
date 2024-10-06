const baseURL = '/api/';


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`/api/products/search/${category}`); // Use the proxy path
    const data = await convertToJson(response);
    return data.Result;
  }
  
  async findProductById(id) {
    const response = await fetch(`/api/product/${id}`); // Use the proxy path
    const data = await convertToJson(response);
    return data.Result;
  }
}