import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); // route()함수를 통해 동일한 url로 get방식 post방식을 진행할 수 있도록 한다.
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
