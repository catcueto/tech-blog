const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

// SIGN UP, creating new user
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(202).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for LOGIN
router.post("/login", async (req, res) => {
  try {
    const loginUser = await User.findOne({
      where: { username: req.body.username },
    });

    if (!loginUser) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const compare = await bcrypt.compare(req.body.password, loginUser.password);
    if (!compare) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = loginUser.id;
      req.session.logged_in = true;

      res.json({ user: loginUser, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Route to LOG OUT
router.post("/logout", (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      // status failed
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
