const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// A user can add several posts
User.hasMany(Post, {
  foreignKey: "user_id",
  // if user is deleted, his comments will also be delted from databse
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

// A post can have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment };
