const express = require("express");
const router = express.Router();
const commentsControlers = require("../controlers/comments");
const auth = require("../middleware/auth");

router.get("/", auth, commentsControlers.getComments);
router.post("/", auth, commentsControlers.createComment);
router.delete("/", auth, commentsControlers.deleteComment);
module.exports = router;
