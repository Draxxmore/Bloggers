const express = require("express");
const router = express.Router();
const { getBlogs, getUserBlogs, postBlog } = require("../services");

router.get("/", async (request, response) => {
  await getBlogs()
    .then((data) => response.status(200).send(data))
    .catch((error) => console.log(error));
});

router.get("/:user_id", async (request, response) => {
  const userId = request.params.user_id;

  await getUserBlogs(userId).then((data) => response.status(200).send(data));
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

module.exports = router;
