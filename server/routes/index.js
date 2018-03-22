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
  app.get('/api/v1/users/:userId/profile', user.userProfile);

  // edit user's profile
  app.put('/api/v1/users/profile', findToken, user.editUserProfile);
};

export default routes;

