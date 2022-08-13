const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATING a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    //   const newPost = await Post.create({
    //     postTitle: req.body.postTitle,
    //     post: req.body.post,
    //     user_id: req.session.user_id,
    // });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATING a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = {
      post_title: req.body.title,
      post_content: req.body.post_content,
    };
    const updated = await Post.update(updatedPost, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: updated });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETING a post by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // destroy post where id
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
