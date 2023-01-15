function getSignup(req, res) {
  res.render("customer/auth/signup");
  /*res 객체 = 응답에 대한 템플릿 렌더링 위해 express에서 제공
  render 메서드=템플릿 가져와서 ejs 구문분석, 모든 동적 부문을 텍스트로 바꿈 
  동적 세그먼트 없는 html 코드 완료되면 응답으로 방문자에게 전송됨*/
}

function getLogin(req, res) {
  //...
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,

  //왼쪽은 키, 오른쪽은 getsignup함수에 대한 포인터
};

//함수 여럿을 내보내기 위해, 그룹화 할수 있는 개체를 내보냄
