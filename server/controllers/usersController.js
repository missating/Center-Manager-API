import bcrypt from 'bcrypt';
import generateToken from '../utils';
import db from '../models/index';


/**
 *@class usersController
 *
 * @export
 *
 */
export default class usersController {
  /**
   * @description - Creates a new user
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
   */
  static createUser(req, res) {
    const {
      fullname, username, email, password
    } = req.body;

    db.User.findOne({
      where: {
        $or: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    }).then((existingUser) => {
      if (existingUser) {
        return res.status(409)
          .json({
            errors: [
              {
                status: '409',
                title: 'Conflict',
                detail: 'Username or Email already exist'
              }
            ]
          });
      }
      return db.User.create({
        fullname,
        username,
        email,
        password
      }).then((newUser) => {
        const token = generateToken(newUser);
        res.status(201).json({
          data: {
            user: {
              fullname: newUser.fullname,
              username: newUser.username,
              email: newUser.email,
              roleId: newUser.roleId
            },
            token
          }
        });
      });
    })
      .catch(() => res.status(500).json({
        errors: [
          {
            status: '500',
            detail: 'Internal server error'
          }
        ]
      }));
  }


  /**
   * @description - Logs a user in
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
   */
  static userLogin(req, res) {
    const { identifier, password } = req.body;

    db.User.findOne({
      where: {
        $or: [
          { username: identifier },
          { email: identifier }
        ]
      }
    }).then((foundUser) => {
      if (!foundUser) {
        return res.status(404)
          .json({
            errors: [
              {
                status: '404',
                title: 'Not Found',
                detail: 'These credentials do not match our record'
              }
            ]
          });
      }
      if (!bcrypt.compareSync(password, foundUser.password)) {
        return res.status(404)
          .json({
            errors: [
              {
                status: '404',
                title: 'Not Found',
                detail: 'These credentials do not match our record'
              }
            ]
          });
      }
      const token = generateToken(foundUser);
      res.status(200)
        .json({
          data: {
            user: {
              fullname: foundUser.fullname,
              username: foundUser.username,
              email: foundUser.email,
              roleId: foundUser.roleId
            },
            token
          }
        });
    })
      .catch(() => res.status(500).json({
        errors: [
          {
            status: '500',
            detail: 'Internal server error'
          }
        ]
      }));
  }

  /**
   * @description - Gets a user's profile
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
   */
  static userProfile(req, res) {
    db.User.findOne({
      where: {
        id: req.userId,
        username: req.username
      }
    }).then((existingUser) => {
      if (!existingUser) {
        return res.status(404)
          .json({
            errors: [
              {
                status: '404',
                title: 'Not Found',
                detail: 'A user with that Id is not found'
              }
            ]
          });
      }
      if (existingUser) {
        return res.status(200)
          .json({
            data: {
              user: {
                profileImage: existingUser.profileImage,
                fullname: existingUser.fullname,
                username: existingUser.username,
                email: existingUser.email,
                joined: new Date(existingUser.createdAt).toDateString()
              }
            }
          });
      }
    })
      .catch(() => res.status(500).json({
        errors: [
          {
            status: '500',
            detail: 'Internal server error'
          }
        ]
      }));
  }
}

