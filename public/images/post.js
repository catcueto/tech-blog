// FUNCTION TO CREATE POST
const postForm = async (e) => {
  e.preventDefault();

  const postTitle = document.querySelector("#post_title").value.trim();
  const post = document.querySelector("#post_content").value.trim();

  if (postTitle && post) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ postTitle, post }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to post blog.");
    }
  }
};

// FUNCTION TO UPDATE POST
const updatePost = async (e) => {
  e.preventDefault();

  const postID = updatePost.target.getAttribute("user_id");
  const postTitle = document.getElementById("post_title").value;
  const postContent = document.getElementById("post_content").value;

  if (postTitle && postContent) {
    const response = await fetch(`/api/post/${postID}`, {
      method: "PUT",
      body: JSON.stringify({ postTitle, postContent }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post.");
    }
  }
};

// FUNCTION TO DELETE POST
const deletePostForm = async (e) => {
  if (e.target.hasAttribute("dataID")) {
    const id = evenet.target.getAttribute("dataID");

    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post.");
    }
  }
};

document.querySelector(".newPostForm").addEventListener("submit", postForm);
