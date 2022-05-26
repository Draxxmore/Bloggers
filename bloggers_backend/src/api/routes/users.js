const express = require("express");
const router = express.Router();
const { getUsers } = require("../services");

router.get("/", async (request, response) => {
  await getUsers()
    .then((data) => response.status(200).send(data))
    .catch((error) => response.status(500).send({ Error: error }));
});

module.exports = router;
