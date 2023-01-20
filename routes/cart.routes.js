const express = require("express");
//app.js에서만 말고, 다른 파일에서도 express기능 사용하려면 이렇게 또 요구해줘야함

const cartController = require("../controllers/cart.controller");

const authController = require("../controllers/auth.controller");

const router = express.Router();
router.get("/", cartController.getCart);
router.post("/items", cartController.addCartItem);

router.patch("/items", cartController.updateCartItem);
module.exports = router;
//노드 JS에게, 이 파일에 정의된 객체나 함수가 다른 파일에도 노출되어야 함을 알려줌
