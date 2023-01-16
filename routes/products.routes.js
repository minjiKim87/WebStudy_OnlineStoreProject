const express = require("express");

const router = express.Router();

router.get("/products", function (req, res) {
  res.render("customer/prodcuts/all-products");
});

module.exports = router;
