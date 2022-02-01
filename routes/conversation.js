const express = require("express");
const router = express.Router();
const conversationControlers = require("../controlers/conversation");
const auth = require("../middleware/auth");

router.post("/", auth, conversationControlers.createConversation);
router.get("/:userId", auth, conversationControlers.getConversation);
module.exports = router;
