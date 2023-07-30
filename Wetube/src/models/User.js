import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique -> mongoose 공식문서에서 SchemaTypes참고
  avatarUrl: { type: String },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: { type: String },
});

userSchema.pre("save", async function () {
  // this는 저장하고자 하는 문서를 의미한다.
  this.password = await bcrypt.hash(this.password, 5);
  // bcrpyt 사용방법 -> npm bcrpyt 공식문서 참고
});
const User = mongoose.model("User", userSchema);
export default User;
