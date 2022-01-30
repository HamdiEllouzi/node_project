const express = require('express');
const router = express.Router();
const userControlers = require('../controlers/users');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/auth/signup', userControlers.signUp);
router.post('/auth/login', userControlers.login);
router.put('/update/photo', auth, multer, userControlers.updatePhoto);
router.put('/update/user', auth, userControlers.updateUser);
module.exports = router;
