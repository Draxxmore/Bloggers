const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUsers } = require("../services");
require("dotenv").config();

router.use(express.json());

router.post("/", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  console.log(username);
  console.log(password);

  if (!username || !password) {
    return response.status(403).json({ Error: "Username/password cannot be blank" });
  }

  const userInDb = await getUsers().then((data) => {
    if (data.length === 0) {
      return response.status(400).json({ Error: "User does not does not exist" });
    }

    const user = data.filter((user) => user.username === request.body.username);

    return user;
  });

  const passwordCheck = await bcrypt.compare(password, userInDb[0].password);

  if (passwordCheck) {
    const signedJWT = jwt.sign(JSON.stringify(userInDb), process.env.ACCESS_TOKEN);
    return response.status(201).json({ access_token: signedJWT });
  } else {
    return response.status(403).send({ Error: "Username/password incorrect" });
  }
});

module.exports = router;
