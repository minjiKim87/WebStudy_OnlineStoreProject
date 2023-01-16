const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "online-shop",
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: "super-secret", //세션 보호하는 키, 그냥 super-secret이라함
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(), // 위 함수 결과 저장
    cookie: {
      //설정안하면 매번 초기화되니까
      maxAge: 2 * 24 * 60 * 60 * 1000, //쿠키가 유효한 밀리초단위
    },
  };
}

module.exports = createSessionConfig;
