const newPostForm = async (e) => {
  e.preventDefault();

  const postTitle = document.querySelector("#postTitle").value.trim();
  const post = document.querySelector("#postContent").value.trim();

  if (postTitle && post) {
    const response = await fetch("/api/posts", {
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
