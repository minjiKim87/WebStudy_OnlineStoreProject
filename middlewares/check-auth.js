function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;
  //사용자 지정 미들웨어의 도움으로 들어오는 모든 요청에 대해 이 uid필드를 찾을것
  if (!uid) {
    return next();
  }
  res.locals.uid = uid;
  res.locals.isAuth = true; //현재 작업중인 사용자가 인증되었다
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuthStatus;
