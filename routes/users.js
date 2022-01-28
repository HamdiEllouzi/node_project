const express = require('express');
const router = express.Router();
const userControlers = require('../controlers/users');
const auth = require('../middleware/auth');

router.post('/auth/signup', userControlers.signUp);
router.post('/auth/login', userControlers.login);
router.put('/update', auth, userControlers.editeUser);
module.exports = router;
