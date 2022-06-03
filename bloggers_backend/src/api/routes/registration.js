const express = require("express");
const router = express.Router();
const { getUsers, postRegistration } = require("../services");
const bcrypt = require("bcryptjs");
const cors = require("cors");

router.use(cors());

router.post("/", async (request, response) => {
  const usernameInDB = await getUsers().then((data) =>
    data.filter((username) => username.username === request.body.username)
  );

  if (usernameInDB.length > 0) {
    return response.status(400).json({ Error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(request.body.password, 10);

  const user = {
    first_name: request.body.firstName,
    last_name: request.body.lastName,
    username: request.body.username,
    password: hashedPassword,
  };

  await postRegistration(user)
    .then((data) => response.status(201).send({ Success: data }))
    .catch((error) => response.status(500).send(error));
});

module.exports = router;
