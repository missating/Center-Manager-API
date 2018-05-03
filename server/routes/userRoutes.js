import user from '../controllers/usersController';
import occasion from '../controllers/occasionsControllers';
import attendee from '../controllers/attendeesControllers';
import authorization from '../middleware/authorization';
import {
  verifyUserSignUp,
  verifyUserSignIn,
  verifyEmail,
  verifyPassword
} from '../middleware/userValidation';
import {
  verifyUserId,
  verifyEventId
} from '../middleware/idValidation';
import {
  verifyEditOccassion,
  verifyNewOccasion
} from '../middleware/occasionValidation';
import {
  verifyBookOccasion,
  editBookOccasion
} from '../middleware/attendeeValidation';


/**
 *@function userRoutes
 *
 * @export
 * @param {any} app
 *
 * @returns {void}
 */
export default function userRoutes(app) {
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

  // get all events created by a user
  app.get('/api/v1/events/user', authorization, occasion.getAllUserOccasion);

  // add an event
  // get all created events
  app.route('/api/v1/events')
    .post(authorization, verifyNewOccasion, occasion.addOccasion)
    .get(occasion.getAllOcassions);

  // edit an event
  // delete an event
  // view a particular event
  app.route('/api/v1/events/:eventId')
    .put(
      authorization,
      verifyEventId,
      verifyEditOccassion,
      occasion.editOccasion
    )
    .delete(authorization, verifyEventId, occasion.deleteOccasion)
    .get(verifyEventId, occasion.getOneOccasion);


  app.route('/api/v1/events/:eventId/register')
    .post(
      authorization,
      verifyEventId,
      verifyBookOccasion,
      attendee.bookOccasion
    )
    .put(
      authorization,
      verifyEventId,
      editBookOccasion,
      attendee.editBookOccasion
    );
}

