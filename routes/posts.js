const express = require('express');
const router = express.Router();
const postControlers = require('../controlers/post');
const auth = require('../middleware/auth');

router.get('/posts', auth, postControlers.getPost);
router.post('/posts', auth, postControlers.createPost);
router.delete('/posts', auth, postControlers.deletePost);
router.put('/posts/like', auth, postControlers.handeLike);
module.exports = router;
