// Adding a new comment
const addComment = document.getElementById("comment");
const commentContent = document.getElementById("comment-content");

addComment.addEventListener("click", async () => {
  const newComment = await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({ comment }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (newComment.ok) {
    // reload to show newly added comment
    document.location.reload();
  } else {
    console.log("this didn't work");
    alert("Failed to post comment.");
  }
});
