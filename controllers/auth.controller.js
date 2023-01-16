const User = require("../models/user.model");
const authUtil = require("../util/authentication");

function getSignup(req, res) {
  res.render("customer/auth/signup");
  /*res 객체 = 응답에 대한 템플릿 렌더링 위해 express에서 제공
  render 메서드=템플릿 가져와서 ejs 구문분석, 모든 동적 부문을 텍스트로 바꿈 
  동적 세그먼트 없는 html 코드 완료되면 응답으로 방문자에게 전송됨*/
}

async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup();

  res.redirect("/login");
}
function getLogin(req, res) {
  res.render("customer/auth/signup");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    //잘못된 이메일
    res.redirect("/login");
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
  //왼쪽은 키, 오른쪽은 getsignup함수에 대한 포인터
};

//함수 여럿을 내보내기 위해, 그룹화 할수 있는 개체를 내보냄
