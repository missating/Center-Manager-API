import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {
  const token = req.headers.token || req.body.token || req.query.token;

  try {
    const verifyToken = jwt.verify(token, process.env.MY_SECRET);
    req.userId = verifyToken.id;
    req.username = verifyToken.username;
    req.roleId = verifyToken.roleId;
    return next();
  } catch (error) {
    return res.status(401).send({
      errors: {
        status: '401',
        title: 'Unauthorized',
        detail: 'You do not have the permission to perfrom this action'
      }
    });
  }
};

export default authorization;
