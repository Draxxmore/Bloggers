const express = require("express");
const router = express.Router();
const registrationRoutes = require("./registration");
const userRoutes = require("./users");
const loginRoute = require("./login");

router.use("/registration", registrationRoutes);
router.use("/users", userRoutes);

module.exports = router;
