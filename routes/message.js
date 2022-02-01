const express = require("express");
const router = express.Router();
const messageControlers = require("../controlers/message");
const auth = require("../middleware/auth");

router.post("/", auth, messageControlers.createMessage);
router.get("/:conversationId", auth, messageControlers.getMessage);
module.exports = router;
