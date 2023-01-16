const path = require("path"); // 내장된 경로
const express = require("express");
//익스프레스 패키지 가져와서 요청

const csrf = require("csurf");
const expressSession = require("express-session");
//npm install express-session connect-mongodb-session 한거 불러옴

const createSessionConfig = require("./config/session");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth.routes");

//app.js는 이미 메인폴더라, ..말고 .으로 현재 내폴더=프로젝트 폴더에서 살펴보아라

const app = express();
//익스프레스 함수로 실행, app 객체

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//npm install ejs 하고 활성화

app.use(express.static("public"));
//public 폴더의 모든 내용을 요청 가능
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
//csrf미들웨어 사용전에 세션 필요, expressSession을 함수로 호출해서 모든 세션 관리를 수행할 세션 미들웨어 얻을 수 있다
app.use(csrf());

app.use(addCsrfTokenMiddleware);
//이건 최종 미들웨어 함수라 위의 csrf랑 달리 직접 실행()하지 않음

app.use(authRoutes);
//모든 수신 요청에 대해 트리거될 미들웨어-authRoutes- 추가 가능

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!hh");
    console.log(error);
  });

//이 app 객체에서 특정 포트에서 수신대기 시작
