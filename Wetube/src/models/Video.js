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

const Video = mongoose.model("Video", videoSchema); // mongoose.model(모델 이름, 모델 스키마)
export default Video;
