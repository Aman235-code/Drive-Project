const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebase = require("./firebase.config");
const serviceAccount = require("../drive-f5dcf-firebase-adminsdk-yh15d-4aef59ba7c.json");

const storage = firebaseStorage({
  credentials: firebase.credential.cert(serviceAccount),
  bucketName: "drive-f5dcf.appspot.com",
  unique: true,
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
