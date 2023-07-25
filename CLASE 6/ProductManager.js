const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = this.getNextId(products);
    products.push(product);
    this.saveProducts(products);
    return product.id;
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist or there's an error reading it, return an empty array
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProducts(products);
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter((product) => product.id !== id);
    this.saveProducts(filteredProducts);
  }

  getNextId(products) {
    const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }
}

// Example of how to use the ProductManager class:
const filePath = './products.json';
const productManager = new ProductManager(filePath);

const productId = productManager.addProduct({
  title: "Product 1",
  description: "Description of Product 1",
  price: 29.99,
  thumbnail: "path/to/product1.jpg",
  code: "P001",
  stock: 10,
});

console.log(productManager.getProductById(productId));

productManager.updateProduct(productId, { price: 19.99, stock: 5 });
console.log(productManager.getProductById(productId));

productManager.deleteProduct(productId);
console.log(productManager.getProducts());
