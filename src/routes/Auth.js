const express = require("express");
const router = express.Router();
const auth_controller = require("../Controllers/admin");
const auth_middleWare = require("../Middleware/Auth");

router.post("/signup", auth_controller.postSignup);
router.post("/login", auth_controller.postLogin);
router.delete(
  "/delete",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isAdmin,
  auth_controller.deleteUser
);

module.exports = router;
