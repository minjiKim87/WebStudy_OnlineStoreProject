function addCsrfToken(req, res, next) {
  //우리가 호출할 미들웨어가 받게될 매개변수 세개 req res next
  res.locals.csrfToken = req.csrfToken();
  next();
}

module.exports = addCsrfToken;
