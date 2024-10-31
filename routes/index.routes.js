const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const fileModel = require("../models/files.model");
const authMiddleWare = require("../middlewares/auth");
const firebase = require("../config/firebase.config");

router.get("/home", authMiddleWare, async (req, res) => {
  try {
    const userFiles = await fileModel.find({
      user: req.user.userId,
    });

    res.render("home", {
      files: userFiles,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post(
  "/upload",
  authMiddleWare,
  upload.single("file"),
  async (req, res) => {
    const newFile = await fileModel.create({
      path: req.file.path,
      originalname: req.file.originalname,
      user: req.user.userId,
    });

    res.json(newFile);
  }
);

router.get("/download/:path", authMiddleWare, async (req, res) => {
  const loggedInUserId = req.user.userId;
  const path = req.params.path;

  const file = await fileModel.findOne({
    user: loggedInUserId,
    path: path,
  });

  if (!file) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const signredUrl = await firebase
    .storage()
    .bucket()
    .file(path)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 1000,
    });

  res.redirect(signredUrl[0]);
});

module.exports = router;
