const env = "development";
const config = require("../../../knexfile.js")[env];
const knex = require("knex")(config);

const getBlogs = async () => {
  return knex("posts");
};

const getUserBlogs = async (userId) => {
  return knex("posts").where("user_id", userId);
};

const postBlog = async (post) => {
  return knex("posts").insert(post);
};

module.exports = { getUserBlogs, getBlogs, postBlog };
