const getUsers = require("./users");
const postRegistration = require("./registration");
const { getBlogs, getUserBlogs, getBlogPost, postBlog, patchBlog, deleteBlogPost } = require("./blog");

module.exports = {
  getUsers,
  getBlogs,
  getUserBlogs,
  getBlogPost,
  postRegistration,
  postBlog,
  patchBlog,
  deleteBlogPost,
};
