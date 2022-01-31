const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, process.env.TOKEN);
    let userId = decodedToken.userId;
    if (req.body.userId && req.body.userId != userId) {
      throw 'wrrong user ID';
    } else {
      req.userId = userId;
      next();
    }
  } catch (error) {
    res.status(403).json({
      error: error | 'request not authentication !',
      msg: 'request not authentication',
    });
  }
};
