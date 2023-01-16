function handleErrors(error, req, res, next) {
  console.log(error); //서버에 에러 로그 호출, 사용자한텐 안보임
  res.status(500).render("shared/500"); // 오류페이지 렌더링
}
//error : 발생한 오류에 대한 자세한 내용이 포함된 오류 객체가 됨
/*익스프레스는 다른 미들웨어/라우트 함수에 오류가 있을때마다
이 함수 호출
*/

module.exports = handleErrors;
