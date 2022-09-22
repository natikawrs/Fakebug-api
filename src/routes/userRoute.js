const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../controllers/userController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.patch(
  "/",
  authenticate,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  userController.updateUser
);

module.exports = router;
