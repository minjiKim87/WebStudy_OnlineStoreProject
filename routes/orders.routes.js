const express = require("express");
//app.js에서만 말고, 다른 파일에서도 express기능 사용하려면 이렇게 또 요구해줘야함

const ordersController = require("../controllers/cart.controller");

const router = express.Router();

router.post("/", ordersController.addOrder);

module.exports = router;
