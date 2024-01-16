const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
    this.loadProductsFromJSON();
  }

  loadProductsFromJSON() {
    try {
      const rawData = fs.readFileSync('./productos.json');
      const productsData = JSON.parse(rawData);

      productsData.forEach((product) => {
        this.addProduct(product);
      });
    } catch (error) {
      console.error('Error loading products from JSON:', error.message);
    }
  }

  addProduct(productData) {
    if (!this.validateProductData(productData)) {
      console.error('Invalid product data. All fields are mandatory. Product data:', productData);
      return;
    }

    productData.id = this.nextId++;
    this.products.push(productData);
    console.log('Product added successfully:', productData);
  }

  validateProductData(productData) {
    const requiredFields = ['title', 'description', 'price', 'thumbnail','stock'];

    return requiredFields.every(field => productData[field]);
  }

  getProducts() {
    console.log('Products:', this.products);
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);

    if (!product) {
      console.error('Product not found.');
    }

    return product;
  }

}



// casos de uso

const productManager = new ProductManager();
productManager.getProducts();

const productIdToFind = 4;  
const productById = productManager.getProductById(productIdToFind);
console.log(`Product with ID ${productIdToFind}:`, productById);