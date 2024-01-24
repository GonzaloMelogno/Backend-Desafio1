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
    this.saveProductsToJSON();
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


deleteProductById(id) {
  const productIndex = this.products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    console.error('Product not found.');
    return;
  }

  const deletedProduct = this.products.splice(productIndex, 1)[0];

  this.saveProductsToJSON();

  console.log('Product deleted successfully:', deletedProduct);
}

saveProductsToJSON() {
  try {
    const jsonData = JSON.stringify(this.products, null, 2);
    fs.writeFileSync('./productos.json', jsonData);
    console.log('Products saved to productos.json successfully.');
  } catch (error) {
    console.error('Error saving products to JSON:', error.message);
  }
}

updateProductById (id, updatedData) {
  const productIndex = this.products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    console.error('Product not found.');
    return;
  }

  this.products[productIndex] = { ...this.products[productIndex], ...updatedData, id };

  this.saveProductsToJSON();

  console.log('Product updated successfully:', this.products[productIndex]);
}
}


// casos de uso

const productManager = new ProductManager();
productManager.getProducts();

const productIdToFind = 4;  
const productById = productManager.getProductById(productIdToFind);
console.log(`Product with ID ${productIdToFind}:`, productById);

const productIdToUpdate = 3;
const updatedData = {
  title: 'Remera',
  description: 'Nuestra remera de evermeet es una locura!! la mejor calidad y diseño de nuestro equipo desde 2021',
  price: 1890,
  thumbnail: '"../imagenes/Camiseta.png',
  stock: 50
};

productManager.updateProductById(productIdToUpdate, updatedData);

const productIdToDelete = 8;
productManager.deleteProductById(productIdToDelete);