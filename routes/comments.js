const express = require('express');
const router = express.Router();
const commentsControlers = require('../controlers/comments');
const auth = require('../middleware/auth');

router.get('/comments', auth, commentsControlers.getComments);
router.post('/comments', auth, commentsControlers.createComment);
router.delete('/comments', auth, commentsControlers.deleteComment);
module.exports = router;
