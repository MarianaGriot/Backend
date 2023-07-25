class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1; // Autoincremental ID
  }

  addProduct(product) {
    // Validate if the product code is unique
    if (this.products.some((p) => p.code === product.code)) {
      console.error("Product code already exists. Please use a different code.");
      return;
    }

    // Validate if all required fields are present
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("All fields are mandatory. Please provide values for all fields.");
      return;
    }

    // Add the product with an autoincremental id
    product.id = this.nextId++;
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error("Not found");
      return null;
    }
  }
}

// Example of how to use the ProductManager class:
const productManager = new ProductManager();

// Adding products
productManager.addProduct({
  title: "Product 1",
  description: "Description of Product 1",
  price: 29.99,
  thumbnail: "path/to/product1.jpg",
  code: "P001",
  stock: 10,
});

productManager.addProduct({
  title: "Product 2",
  description: "Description of Product 2",
  price: 19.99,
  thumbnail: "path/to/product2.jpg",
  code: "P002",
  stock: 5,
});

// Getting all products
const allProducts = productManager.getProducts();
console.log(allProducts);

// Getting product by ID
const productId = 1;
const productById = productManager.getProductById(productId);
console.log(productById);

const nonExistentProductId = 999;
const nonExistentProduct = productManager.getProductById(nonExistentProductId); // This will print "Not found"
