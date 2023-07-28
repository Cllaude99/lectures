export const localsMiddleware = (req, res, next) => {
  // 'res.locals.변수이름 = 변수 값' 을 통해 pug와 해당 변수이름을 공유할 수 있다.
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  res.locals.siteName = "Wetube";
  next(); // 미들웨어이므로 next() 필수 !!
};
