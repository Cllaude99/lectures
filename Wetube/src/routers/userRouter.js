import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  remove,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout); // 로그인된 사용자만 해당 경로에 접근할 수 있도록 protectorMiddleware 미들웨서 적용.
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit); // 로그인된 사용자만 해당 경로에 접근할 수 있도록 protectorMiddleware 미들웨서 적용.
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin); // 로그인이 된 사용자라면 해당경로에 접근했을때 실행이 되면 안되므로 publicOnlyMiddleware 미들웨서 적용.
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin); // 로그인이 된 사용자라면 해당경로에 접근했을때 실행이 되면 안되므로 publicOnlyMiddleware 미들웨서 적용.
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/remove", remove);
userRouter.get("/:id([0-9a-f]{24})", see);

export default userRouter;
