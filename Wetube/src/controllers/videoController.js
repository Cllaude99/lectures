import Video from "../models/Video";

export const home = async (req, res) => {
  //sort({}) 함수를 통해 찾은 문서들을 정렬할 수 있다. (Query.prototype.sort({})).
  const videos = await Video.find({}).sort({ createdAt: "desc" }); // await을 통해 결과값을database에서 받을 때 까지 기다려 준다. (await은 async함수 안에서만 사용가능)
  return res.render("home", { pageTitle: "Home", videos }); // return의 용도는 어떤것을 반환하는게 아니라 종료의 의미로 사용됨. (res.render()는 한번만 사용되어야 하기 때문에 이러한 방어적인 코드가 필요하다.)
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    // Video.create() 에서 Video모델의 구조에 맞게 만들어 지지 않을 경우 에러를 발생하기 때문에 try-catch로 묶어준다.
    // Video모델 구조에 따라 새로운 document를 만들어 주고 저장하느 과정
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
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
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query; // method="GET" 방식에서 ?뒤에 있는 쿼리 값을 받아오기위해 사용.
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(`${keyword}`, "i") },
    });
  }
  return res.render("search", { pageTitle: `Search`, videos });
};
