const getUsers = require("./users");
const postRegistration = require("./registration");
const { getBlogs, getUserBlogs, postBlog } = require("./blog");

module.exports = { getUsers, getBlogs, getUserBlogs, postRegistration, postBlog };
