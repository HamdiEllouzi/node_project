const express = require("express");
const router = express.Router();
const postControlers = require("../controlers/post");
const auth = require("../middleware/auth");

router.get("/", auth, postControlers.getPost);
router.post("/", auth, postControlers.createPost);
router.delete("/", auth, postControlers.deletePost);
router.put("/like", auth, postControlers.handeLike);
module.exports = router;
