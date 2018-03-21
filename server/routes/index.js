import user from '../controllers/usersController';
import {
  verifySignUp,
  verifyUserSignIn,
  findToken
} from '../middleware/validation';

const routes = (app) => {
  // create a user
  app.post('/api/v1/users/signup', verifySignUp, user.createUser);

  // logs user in
  app.post('/api/v1/users/signin', verifyUserSignIn, user.userLogin);

  // view user's profile
  app.get('/api/v1/users/profile', findToken, user.userProfile);
};

export default routes;

