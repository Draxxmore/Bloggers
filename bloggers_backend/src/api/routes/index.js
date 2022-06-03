const express = require("express");
const router = express.Router();
const registrationRoutes = require("./registration");
const userRoutes = require("./users");
const loginRoute = require("./login");
const blogRoute = require("./blog");
const cors = require("cors");

router.use(cors());

router.use("/registration", registrationRoutes);
router.use("/users", userRoutes);
router.use("/login", loginRoute);
router.use("/blog", blogRoute);

module.exports = router;
