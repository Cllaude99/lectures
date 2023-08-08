import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  //sort({}) 함수를 통해 찾은 문서들을 정렬할 수 있다. (Query.prototype.sort({})).
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner"); // await을 통해 결과값을database에서 받을 때 까지 기다려 준다. (await은 async함수 안에서만 사용가능)
  return res.render("home", { pageTitle: "Home", videos }); // return의 용도는 어떤것을 반환하는게 아니라 종료의 의미로 사용됨. (res.render()는 한번만 사용되어야 하기 때문에 이러한 방어적인 코드가 필요하다.)
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments"); // populate("속성명") 을 통해 실제 속성 명에 있는 값을 해당 모델에 있는 객체로 변환해준다.
  console.log(video);
  if (!video) {
    return res
      .status(404)
      .render("404", { pageTitle: "Video not found.", video });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved");
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    // Video.create() 에서 Video모델의 구조에 맞게 만들어 지지 않을 경우 에러를 발생하기 때문에 try-catch로 묶어준다.
    // Video모델 구조에 따라 새로운 document를 만들어 주고 저장하느 과정
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.unshift(newVideo._id);
    await user.save(); // User.js에 있는 pre("save")안에 있는 함수가 호출되고 여기서 비밀번호가 다시 해싱되기 때문에 User.js에서 pre함수의 수정이 필요!

    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  await user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query; // method="GET" 방식에서 ?뒤에 있는 쿼리 값을 받아오기위해 사용.
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(`${keyword}`, "i") },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: `Search`, videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  await video.save();
  return res.sendStatus(201);
};
