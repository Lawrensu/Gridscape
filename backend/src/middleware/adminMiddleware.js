const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (verified.role !== 'admin') {
      return res.status(403).send('Access Forbidden');
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = adminMiddleware;