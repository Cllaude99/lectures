import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isFlyio = process.env.NODE_ENV === "production";

const s3ImageUploader = multers3({
  s3: s3,
  bucket: "cllaudewetube",
  acl: "public-read",
  key: function (request, file, ab_callback) {
    const newFileName = Date.now() + "-" + file.originalname;
    const fullPath = "images/" + newFileName;
    ab_callback(null, fullPath);
  },
});

const s3VideoUploader = multers3({
  s3: s3,
  bucket: "cllaudewetube",
  acl: "public-read",
  key: function (request, file, ab_callback) {
    const newFileName = Date.now() + "-" + file.originalname;
    const fullPath = "videos/" + newFileName;
    ab_callback(null, fullPath);
  },
});

export const localsMiddleware = (req, res, next) => {
  // 'res.locals.변수이름 = 변수 값' 을 통해 pug와 해당 변수이름을 공유할 수 있다.
  // pug에서는 변수이름 만 사용해서 값을 불러올 수 있다.
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.siteName = "Wetube";
  res.locals.isFlyio = isFlyio;
  next(); // 미들웨어이므로 next() 필수 !!
};

// 로그인을 하지 않은 사용자가 경로에 접근하는 것을 처리해주는 미들웨어
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Log in first");
    return res.redirect("/login");
  }
};

// 로그인을 하였는데 다시 로그인 페이지로 가야하는 상황이 없도록 해주는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

// 사용자가 보낸 파일을 uploads폴더에 저장하도록 설정된 미들웨어
export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
  storage: isFlyio ? s3ImageUploader : undefined,
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
  storage: isFlyio ? s3VideoUploader : undefined,
});
