function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  //_id는 몽고DB에서 사용하는 id 양식
  req.session.save(action);
  //action을 save메서드에 저장, 업데이ㅡㅌ된 세션 데이터를 데이터베이스에 저장하면 완료됨
}

function destroyUserAuthSession(req) {
  req.session.uid = null;
  req.session.save();
}
module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
