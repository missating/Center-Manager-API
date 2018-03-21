import user from '../controllers/usersController';
import { verifySignUp, verifyUserSignIn } from '../middleware/validation';

const routes = (app) => {
  // create a user
  app.post('/api/v1/users/signup', verifySignUp, user.createUser);

  // logs user in
  app.post('/api/v1/users/signin', verifyUserSignIn, user.userLogin);
};

export default routes;

