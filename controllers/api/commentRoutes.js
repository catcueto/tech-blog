const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils");

// ADDING a new comment
router.post("/", withAuth, (req, res) => {
  try {
    const userComment = Comment.create({
      comment: req.body.comment,
      comment_date: req.body.comment_date,
      username: req.body.username,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(userComment);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// UPDATING a comment
router.put("/:id", withAuth, (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(updated);
});

// DELETING a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
