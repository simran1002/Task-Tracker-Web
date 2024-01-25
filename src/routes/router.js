const express = require("express");
const router = express.Router();

const Auth_route = require("./Auth");

const Task_route = require("./task");

router.use("/api/v1/auth", Auth_route);

router.use("/api/v1/", Task_route);

module.exports = router;