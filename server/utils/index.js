import jwt from 'jsonwebtoken';

const generateToken = ({ id, username }) => jwt.sign(
  {
    id,
    username
  },
  process.env.MY_SECRET
);

export default generateToken;

