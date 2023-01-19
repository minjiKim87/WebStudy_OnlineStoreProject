const Product = require("../models/product.model");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }

  res.render("admin/products/all-products");
}

function getNewProduct() {
  res.render("admin/products/new-product");
}

async function createNewProduct() {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.rendirect("/admin/products");
}

async function getUpdateProduct(req, res) {
  try {
    const product = await Product.findById(req, params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}
function updateProduct() {}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
};
