import { isEmpty } from 'lodash';

const verifyAdmin = (req, res, next) => {
  let errors;

  if (req.roleId !== 1) {
    errors = {
      status: 401,
      title: 'Unauthorized',
      detail: 'You do not have the permission to perform this action'
    };
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

export default verifyAdmin;

