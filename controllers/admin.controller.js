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

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res) {
  try {
    const product = await Product.findById(req, params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}
async function updateProduct(req, res) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    //replace the old image with the new one
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Deleted product!" });
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
