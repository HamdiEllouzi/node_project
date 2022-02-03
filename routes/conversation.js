const express = require("express");
const router = express.Router();
const conversationControlers = require("../controlers/conversation");
const auth = require("../middleware/auth");

router.post("/", auth, conversationControlers.createConversation);
router.get("/:userId", auth, conversationControlers.getConversation);
router.delete("/:conversationId", auth, conversationControlers.deleteConversation);
module.exports = router;
