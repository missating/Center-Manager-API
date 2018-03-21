import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import validator from 'validator';

export const findToken = (req, res, next) => {
  const token = req.headers.token || req.body.token || req.query.token;

  try {
    const verifyToken = jwt.verify(token, process.env.MY_SECRET);
    req.userId = verifyToken.id;
    req.username = verifyToken.username;
    req.roleId = verifyToken.roleId;
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

export const verifySignUp = (req, res, next) => {
  const {
    fullname, username, email, password, confirmPassword
  } = req.body;

  const errors = {};

  if (!fullname) {
    errors.fullname = 'Full name is required';
  } else if (fullname && validator.isEmpty(fullname.trim())) {
    errors.fullname = 'Full name cannot be empty';
  } else if (!username) {
    errors.username = 'User name is required';
  } else if (username && validator.isEmpty(username.trim())) {
    errors.username = 'User name cannot be empty';
  } else if (!email) {
    errors.email = 'Email is required';
  } else if (email && !validator.isEmail(email.trim())) {
    errors.email = 'Email is invalid or empty';
  } else if (!password) {
    errors.password = 'Password is required';
  } else if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (validator.isEmpty(password) ||
    validator.isEmpty(confirmPassword) ||
    (confirmPassword.trim() !== password.trim())) {
    errors.confirmPassword = 'Passwords don\'t match';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};

export const verifyUserSignIn = (req, res, next) => {
  const { identifier, password } = req.body;

  const errors = {};

  if (!identifier) {
    errors.identifier = 'Please provide your username or email';
  } else if (identifier && validator.isEmpty(identifier.trim())) {
    errors.identifier = 'Username or email cannot be empty';
  } else if (!password) {
    errors.password = 'Password is required';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};

