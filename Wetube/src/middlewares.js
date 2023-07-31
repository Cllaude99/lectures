export const localsMiddleware = (req, res, next) => {
  // 'res.locals.변수이름 = 변수 값' 을 통해 pug와 해당 변수이름을 공유할 수 있다.
  // pug에서는 변수이름 만 사용해서 값을 불러올 수 있다.
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.siteName = "Wetube";
  next(); // 미들웨어이므로 next() 필수 !!
};

// 로그인을 하지 않은 사용자가 경로에 접근하는 것을 처리해주는 미들웨어
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인을 하였는데 다시 로그인 페이지로 가야하는 상황이 없도록 해주는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
