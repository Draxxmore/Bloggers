const express = require("express");
const router = express.Router();
const { getBlogs, getUserBlogs, getBlogPost, postBlog, patchBlog } = require("../services");

router.get("/", async (request, response) => {
  await getBlogs()
    .then((data) => response.status(200).send(data))
    .catch((error) => console.log(error));
});

router.get("/:user_id", async (request, response) => {
  const userId = request.params.user_id;
  await getUserBlogs(userId)
    .then((data) => response.status(200).send(data))
    .catch((error) => response.status(500).send(error));
});

router.get("/blog-post/:post_id", async (request, response) => {
  const postId = request.params.post_id;
  await getBlogPost(postId)
    .then((data) => response.status(200).send(data))
    .catch((error) => response.status(500).send(error));
});

router.post("/:user_id", async (request, response) => {
  const userId = request.params.user_id;

  const post = {
    user_id: userId,
    title: request.body.title,
    content: request.body.content,
    creation_date: new Date(),
  };

  await postBlog(post)
    .then(() => response.status(201).json({ Message: "Blog has been posted" }))
    .catch((error) => console.log(error));
});

router.patch("/:post_id", async (request, response) => {
  const postId = request.params.post_id;

  const post = {
    title: request.body.title,
    content: request.body.content,
  };

  await patchBlog(postId, post)
    .then(() => response.status(201).json({ Message: "Blog has been edited" }))
    .catch((error) => response.status(500).json({ Error: error }));
});

module.exports = router;
