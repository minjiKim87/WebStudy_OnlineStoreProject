const express = require("express");
//app.js에서만 말고, 다른 파일에서도 express기능 사용하려면 이렇게 또 요구해줘야함

const authController = require("../controllers/auth.controller");
/*..은 한단계씩 올라감을 의미, 마지막엔 js안붙여도됨
auth.controller.js에 있는 함수들 사용 위함
router.get("/signup") - getSignup*/

const router = express.Router();

router.get("/signup", authController.getSignup);
//특정경로에 대한 get 요청 수락 가능
//가입 경로인 가입 페이지를 얻기 위해 방문하는 라우트

router.post("/signup", authController.signup);

router.get("/login", authController.getLogin);
//로그인 양식이 있는 페이지 제공

router.post("/login", authController.login);

router.post("/logout", authController.logout);
module.exports = router;
//노드 JS에게, 이 파일에 정의된 객체나 함수가 다른 파일에도 노출되어야 함을 알려줌
