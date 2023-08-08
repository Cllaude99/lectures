const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleSubmit = (event) => {
  event.preventDefault(); // form에 제출할때 기본적으로 새로고침이 일어나는데 이를 방지하는 역할을 해줌.
  const text = textarea.value;
  const video = videoContainer.dataset.id;
};

form.addEventListener("submit", handleSubmit);
