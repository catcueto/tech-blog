const router = require("express").Router();
const { Session } = require("express-session");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Getting ALL POSTS
router.get("/", async (req, res) => {
  try {
    // Get all posts and join w/ user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
        {
          model: Comment,
        },
      ],
    });

    // Serialize data so the template can easily read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Getting a SINGLE post (id)
router.get("/post/:id", async (req, res) => {
  // find selected post
  const postData = await Post.findByPk(req.params.id, {
    include: [{ model: User }, { model: Comment, include: { model: User } }],
  });
  // serializing data
  const post = postData.get({ plain: true });
  const session = req.session;
  // render user res
  console.log(session);
  res.render("allPosts", { post, session });
});

// Getting SINGLE post + UPDATE option
router.get("/post/update/:id", async (req, res) => {
  // find requested post for update
  const postData = await Post.findByPk(req.params.id, {
    include: [{ model: User }, { model: Comment, include: { model: User } }],
  });
  const post = postData.get({ plain: true });
  // check to ensure users can only edit THEIR posts
  if (session.user_id !== post.user_id) {
    res.redirect("/login");
  } else {
    res.render("postUpdatePage", { post, session });
  }
});

// Get request for DASHBOARD (displays all posts and comments associated with the user)
router.get("/dashboard", withAuth, async (req, res) => {
  const userPosts = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
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

  const user = userPosts.map((post) => {
    return post.get({ plain: true });
  });
  console.log(user);
  res.render("dashboard", {
    user,
    loggedIn: true,
  });

  // Get request to UPDATE a COMMENT
  router.get("/comment/update/:id", async (req, res) => {
    const commentData = await Comment.findByPk(req.params.id);
    const comment = await commentData.get({ plain: true });
    const session = req.session;

    res.render("commentUpdate", { comment, session });
  });
});

// Get request for LOGIN
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
