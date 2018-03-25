import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from '../utils';
import db from '../models/index';
import sendEmail from '../helperFunctions/sendEmail';


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
    const { token } = req.headers;

    db.User.findOne({
      where: {
        id: req.params.userId
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
      if (existingUser && token) {
        jwt.verify(token, process.env.MY_SECRET, (error, decoded) => {
          if (error) {
            return res.status(200)
              .json({
                data: {
                  user: {
                    profileImage: existingUser.profileImage,
                    fullname: existingUser.fullname,
                    username: existingUser.username
                  }
                }
              });
          }
          if (decoded.id === parseInt(req.params.userId, 10)) {
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
          return res.status(200)
            .json({
              data: {
                user: {
                  profileImage: existingUser.profileImage,
                  fullname: existingUser.fullname,
                  username: existingUser.username
                }
              }
            });
        });
      } else {
        return res.status(200)
          .json({
            data: {
              user: {
                profileImage: existingUser.profileImage,
                fullname: existingUser.fullname,
                username: existingUser.username
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


  /**
   * @description - edit's a user's profile
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
   */
  static editUserProfile(req, res) {
    const { fullname, username } = req.body;

    let { profileImage } = req.body;

    if (!profileImage) {
      // eslint-disable-next-line
      profileImage = 'https://res.cloudinary.com/dxayftnxb/image/upload/v1521588039/profile-icon-9_njp1mb.png';
    }

    db.User.findOne({
      where: {
        id: req.userId
      }
    }).then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({
          error: [
            {
              status: '404',
              title: 'Not Found',
              detail: `Can't find user with id ${req.userId}`
            }
          ]
        });
      }
      if (foundUser) {
        const userDetails = {
          profileimage: profileImage ? profileImage.trim()
            : foundUser.profileImage,
          fullname: fullname ? fullname.trim() : foundUser.fullname,
          username: username ? username.trim() : foundUser.username
        };
        foundUser.update(userDetails)
          .then(updatedUser => res.status(200)
            .json({
              data: {
                user:
                  {
                    profileImage: updatedUser.profileImage,
                    fullname: updatedUser.fullname,
                    username: updatedUser.username,
                    email: updatedUser.email,
                    joined: new Date(updatedUser.createdAt).toDateString()
                  }
              }
            }));
      }
    }).catch(() => res.status(500)
      .json({
        errors: [
          {
            status: '500',
            detail: 'internal Server error'
          }
        ]
      }));
  }


  /**
   * @description - Request by user to recover lost password
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof usersController
   *
   * @returns {object} Class instance
   */
  static recoverPassword(req, res) {
    const { email } = req.body;

    db.User.findOne({
      where: {
        email
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(404).json({
            error: [
              {
                status: '404',
                title: 'Not Found',
                detail: 'Email not found'
              }
            ]
          });
        }
        if (foundUser) {
          const token = generateToken(foundUser);
          foundUser.update({ token })
            .then(() => {
              const url =
                `http://${req.headers.host}/users/password-reset/${token}`;
              sendEmail(foundUser.email, url, res);
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          errors: [
            {
              status: '500',
              detail: 'internal Server error'
            }
          ]
        }));
  }
}

