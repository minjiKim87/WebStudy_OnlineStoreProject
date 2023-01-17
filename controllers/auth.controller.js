const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

const userCredentialsAreValid = require("../util/validation");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      confirmPassword: "",
      password: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
  /*res 객체 = 응답에 대한 템플릿 렌더링 위해 express에서 제공
  render 메서드=템플릿 가져와서 ejs 구문분석, 모든 동적 부문을 텍스트로 바꿈 
  동적 세그먼트 없는 html 코드 완료되면 응답으로 방문자에게 전송됨*/
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };

  if (
    //1.유효성 검사 실패할 경우에
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your input. Password must be at least 6 characters. long postal code must be 5 characters long ",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    //1.가입으로 리디렉션되거나
    res.redirect("/signup");
    return;
  }

  const user = new User( //위의 것들 검증후에 사용하겠다
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "User exists already! Try logging in instead!",
          ...enteredData,
        },
        function () {
          res.redirect("/signup"); //1.해당 이메일 주소 가진 사용자가 있다는것
        }
      );

      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}
function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    const existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  const sessionErrorData = {
    errorMessage:
      "Invalid credentials - Please double check your email and password!",

    email: user.email,
    password: user.password,
  };

  if (!existingUser) {
    //잘못된 이메일
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    /*물론 우리는 입력된 데이터와 오류 메시지를 세션으로 플래시하고 싶습니다

따라서 다시 리디렉션하는 로그인 페이지에서도 이를 표시할 수 있죠 */

    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });

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
