const router = require("express").Router();
const { User, Post, Comment } = require("../models");
// route for login
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all posts and join w/ user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
        },
      ],
    });

    // Serialize data so the template can easily read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Get all comments and join w/ user data
    const commentData = await Comment.findAll();
    // Serialize data so the template can easily read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
