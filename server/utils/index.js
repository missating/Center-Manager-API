import jwt from 'jsonwebtoken';

const generateToken = ({ id, roleId, username }) => jwt.sign(
  {
    id,
    roleId,
    username
  },
  process.env.MY_SECRET
);

export default generateToken;

