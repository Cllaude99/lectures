import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      // 올바르지 않은 처리가 되었을 경우 상태코드 값을 같이 보내주어야 한다.
      // (res.status(400)) + 상태코드 숫자의 의미는 위키피디아에서 찾아볼 수 있음.
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/emial is already taken.",
    });
  }
  try {
    await User.create({
      // document가 만들어 질때 User모델에서의 pre 미들웨어 중 "save"로 설정한 것이 실행된다.
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password.",
    });
  }
  // 'req.session.추가할 값 = 값' 을 통해 세션에 정보를 추가한다.
  // console.log(req.session) 을 통해 세션에 무엇이 저장되었는지 확인가능하다.
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.user = null;
  return res.redirect("/");
};
export const see = (req, res) => res.send("See User");
