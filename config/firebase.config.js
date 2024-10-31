const Firebase = require("firebase-admin");
const serviceAccount = require("../drive-f5dcf-firebase-adminsdk-yh15d-4aef59ba7c.json");

const firebase = Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount),
  storageBucket: "drive-f5dcf.appspot.com",
});

module.exports = Firebase;
