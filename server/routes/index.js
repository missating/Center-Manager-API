import User from '../controllers/usersController';
import { verifyUser } from '../middleware/validation';

const routes = (app) => {
  // create a user
  app.post('/api/v1/users/signup', verifyUser, User.createUser);
};

export default routes;

