import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import validator from 'validator';

export const findToken = (req, res, next) => {
  const token = req.headers.token || req.body.token || req.query.token;

  try {
    const verifyToken = jwt.verify(token, process.env.MY_SECRET);
    req.userId = verifyToken.id;
    req.username = verifyToken.username;
    return next();
  } catch (error) {
    return res.status(401).send({
      errors: [
        {
          status: '401',
          title: 'Unauthorized',
          detail: 'You do not have the permission to perfrom this action'
        }
      ]
    });
  }
};

export const verifyUser = (req, res, next) => {
  const {
    fullname, username, email, password, confirmPassword
  } = req.body;

  const errors = {};

  if (!fullname) {
    errors.fullname = 'Full name is required';
  }

  if (fullname && validator.isEmpty(fullname.trim() || '')) {
    errors.fullname = 'Full name cannot be empty';
  }

  if (!username) {
    errors.username = 'User name is required';
  }

  if (username && validator.isEmpty(username.trim() || '')) {
    errors.username = 'User name cannot be empty';
  }

  if (!email) {
    errors.email = 'Email is required';
  }

  if (email && !validator.isEmail(email.trim() || '')) {
    errors.email = 'Email is invalid or empty';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  }

  if (validator.isEmpty(password || '') ||
    validator.isEmpty(confirmPassword || '') ||
    (confirmPassword.trim() !== password.trim())) {
    errors.confirmPassword = 'Passwords don\'t match';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};

