import { isEmpty } from 'lodash';

const verifyUserId = (req, res, next) => {
  const { userId } = req.params;

  const errors = {};

  if (Number.isNaN(parseInt(userId, 10))) {
    errors.userId = 'UserId must be a number';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

export default verifyUserId;

