const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
let deleteBtn = document.querySelectorAll(".deleteComment");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.classList = "video__comment";
  const icon = document.createElement("i");
  icon.classList = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.classList = "deleteComment";
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);

  deleteBtn = document.querySelectorAll(".deleteComment");
  deleteBtn.forEach((value) => value.addEventListener("click", handleDelete));
};

const handleSubmit = async (event) => {
  event.preventDefault(); // form에 제출할때 기본적으로 새로고침이 일어나는데 이를 방지하는 역할을 해줌.
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "" || text.trim() === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const commentId = event.target.parentNode.dataset.id;
  await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  event.target.parentNode.remove();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtn) {
  deleteBtn.forEach((value) => value.addEventListener("click", handleDelete));
}
