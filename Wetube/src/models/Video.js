import mongoose from "mongoose";

//video의 스키마를 아래와 같이 정의
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 }, // title : {type: String} 과 동일한 의미
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, default: Date.now }, // default를 통해 기본값 설정이 가능하며, Date.now()로 하지 않은 이유는 바로 실행되지 않게 하기 위함이다.
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

// static 함수를 만들어주는 과정 (사용하기 위해서는 '모델명.함수이름'의 형태로 사용한다.)
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

// 모델을 생성하는 부분
const Video = mongoose.model("Video", videoSchema); // mongoose.model(모델 이름, 모델 스키마)
export default Video;
