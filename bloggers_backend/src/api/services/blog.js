const env = "development";
const config = require("../../../knexfile.js")[env];
const knex = require("knex")(config);

const getBlogs = async () => {
  return knex("posts");
};

const getUserBlogs = async (userId) => {
  return knex("posts").where("user_id", userId);
};

const getBlogPost = async (postId) => {
  return await knex("posts")
    .select(
      "posts.id as post_id",
      "posts.title",
      "posts.content",
      "posts.creation_date",
      "users.id",
      "users.first_name",
      "users.last_name"
    )
    .join("users", "posts.user_id", "users.id")
    .where("posts.id", postId);
};

const postBlog = async (post) => {
  return knex("posts").insert(post);
};

const patchBlog = async (postId, post) => {
  return await knex("posts").where("id", postId).update(post);
};

module.exports = { getUserBlogs, getBlogs, getBlogPost, postBlog, patchBlog };
