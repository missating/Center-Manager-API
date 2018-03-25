import user from '../controllers/usersController';
import authorization from '../middleware/authorization';
import {
  verifyUserSignUp,
  verifyUserSignIn,
  verifyEmail,
  verifyPassword
} from '../middleware/userValidation';
import verifyUserId from '../middleware/idValidation';


const routes = (app) => {
  // create a user
  app.post('/api/v1/users/signup', verifyUserSignUp, user.createUser);

  // logs user in
  app.post('/api/v1/users/signin', verifyUserSignIn, user.userLogin);

  // view user's profile
  app.get('/api/v1/users/:userId/profile', verifyUserId, user.userProfile);

  // edit user's profile
  app.put('/api/v1/users/profile', authorization, user.editUserProfile);

  app.post('/api/v1/users/recover-password', verifyEmail, user.recoverPassword);

  // reset passowrd route
  app.put(
    '/api/v1/users/password-reset',
    authorization, verifyPassword, user.resetPassword
  );
};

export default routes;
