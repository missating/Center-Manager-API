import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

const signupUrl = '/api/v1/users/signup';
const signinUrl = '/api/v1/users/signin';

const user1 = {
  fullname: 'test',
  username: 'test',
  email: 'test@test.com',
  password: '1234567890',
  confirmPassword: '1234567890'
};

const user2 = {
  fullname: 'test2',
  username: 'test2',
  email: 'test2@test.com',
  password: '1234567890',
  confirmPassword: '1234567890'
};

const user3 = {
  fullname: 'test3',
  username: 'test3',
  email: 'test3@test.com',
  password: '1234567890',
  confirmPassword: '1234567890'
};

const user4 = {
  fullname: 'test4',
  username: 'test4',
  email: 'test4@test.com',
  password: '1234567890',
  confirmPassword: '1234567890'
};

const user6 = {
  fullname: 'test6',
  username: 'test6',
  email: 'test6@test.com',
  password: '1234567890',
  confirmPassword: '1234567890'
};

let userToken;
let userToken2;
let userToken3;


describe('User API test', () => {
  describe('# Create user', () => {
    it('Should create a user', (done) => {
      request.post(signupUrl)
        .send(user1)
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.user.fullname).to.equal(user1.fullname);
          expect(response.body.data.user.username).to.equal(user1.username);
          expect(response.body.data.user.email).to.equal(user1.email);
          expect(response.body.data.user.roleId).to.equal(2);
          expect(response.body.data).to.have.property('token');
          expect(response.body.data.token).to.be.a('string');
          expect(response.body.data.user).to.not.have.property(user1.password);
          done();
        });
    });

    it(
      'Should not register a user with an already existing email',
      (done) => {
        request.post(signupUrl)
          .send(user1)
          .end((error, response) => {
            expect(response.statusCode).to.equal(409);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.title).to.equal('Conflict');
            expect(response.body.errors.detail)
              .to.equal('Username or Email already exist');
            done();
          });
      }
    );

    it(
      'Should not register a user with an empty fullname field',
      (done) => {
        request.post(signupUrl)
          .send({
            fullname: '',
            username: 'test',
            email: 'test@test.com',
            password: '1234567890',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.fullname)
              .to.equal('Full name is required');
            done();
          });
      }
    );

    it(
      'Should not register a user with an empty username field',
      (done) => {
        request.post(signupUrl)
          .send({
            fullname: 'test user',
            username: '',
            email: 'test@test.com',
            password: '1234567890',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.username)
              .to.equal('User name is required');
            done();
          });
      }
    );

    it(
      'Should not register a user with an empty email field',
      (done) => {
        request.post(signupUrl)
          .send({
            fullname: 'test user',
            username: 'test',
            email: '',
            password: '1234567890',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.email)
              .to.equal('Email is required');
            done();
          });
      }
    );


    it(
      'Should not register a user with an empty password field',
      (done) => {
        request.post(signupUrl)
          .send({
            fullname: 'test user',
            username: 'test',
            email: 'test@test.com',
            password: '',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.password)
              .to.equal('Password is required');
            done();
          });
      }
    );

    it(
      'Should not register a user with an empty confirm password field',
      (done) => {
        request.post(signupUrl)
          .send({
            fullname: 'test user',
            username: 'test',
            email: 'test@test.com',
            password: '1234567890',
            confirmPassword: ''
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.confirmPassword)
              .to.equal('Please confirm your password');
            done();
          });
      }
    );


    it(
      'Should not register a user if passwords don\'t match',
      (done) => {
        request.post(signupUrl)
          .send({
            fullname: 'test user',
            username: 'test',
            email: 'test@test.com',
            password: '123456',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.confirmPassword)
              .to.equal('Passwords don\'t match');
            done();
          });
      }
    );
  });


  describe('# Signin user', () => {
    before((done) => {
      request.post(signupUrl)
        .send(user2)
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          done();
        });
    });

    it('Should sign a user in', (done) => {
      request.post(signinUrl)
        .send({
          identifier: 'test2',
          password: '1234567890'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.user.fullname).to.equal(user2.fullname);
          expect(response.body.data.user.username).to.equal(user2.username);
          expect(response.body.data.user.email).to.equal(user2.email);
          expect(response.body.data.user.roleId).to.equal(2);
          expect(response.body.data).to.have.property('token');
          expect(response.body.data.token).to.be.a('string');
          expect(response.body.data.user).to.not.have.property(user1.password);
          done();
        });
    });

    it('Should not sign a user in with the wrong password', (done) => {
      request.post(signinUrl)
        .send({
          identifier: 'test2@test.com',
          password: '123456'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('These credentials do not match our record');
          done();
        });
    });

    it(
      'Should not sign a user in with an identifier that does not exist',
      (done) => {
        request.post(signinUrl)
          .send({
            identifier: 'wrong user',
            password: '1234567890'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.title).to.equal('Not Found');
            expect(response.body.errors.detail)
              .to.equal('These credentials do not match our record');
            done();
          });
      }
    );


    it(
      'Should not sign a user in if password is not available',
      (done) => {
        request.post(signinUrl)
          .send({
            identifier: 'test2@test.com'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.password)
              .to.equal('Password is required');
            done();
          });
      }
    );

    it(
      'Should not sign a user in if identifer is empty',
      (done) => {
        request.post(signinUrl)
          .send({
            identifier: '',
            password: '1234567890'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.identifier)
              .to.equal('Please provide your username or email');
            done();
          });
      }
    );
  });

  describe('# Get user profile', () => {
    before((done) => {
      request.post(signupUrl)
        .send(user3)
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          userToken = response.body.data.token;
          done();
        });
    });

    it('Should not get profile for a user that does not exist', (done) => {
      request.get('/api/v1/users/10/profile')
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('A user with that Id is not found');
          done();
        });
    });

    it(
      'Should not get profile for a user that the id is not a number',
      (done) => {
        request.get('/api/v1/users/number/profile')
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.userId)
              .to.equal('User Id must be a number');
            done();
          });
      }
    );

    it('Should get details of another user profile', (done) => {
      request.get('/api/v1/users/2/profile')
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.user).to.have.property('profileImage');
          expect(response.body.data.user).to.have.property('fullname');
          expect(response.body.data.user).to.have.property('username');
          expect(response.body.data.user).to.have.not.property('email');
          done();
        });
    });

    it(
      'Should get user private profile details if token id matches userid',
      (done) => {
        request.get('/api/v1/users/4/profile')
          .set('token', userToken)
          .end((error, response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.data.user).to.have.property('profileImage');
            expect(response.body.data.user).to.have.property('fullname');
            expect(response.body.data.user).to.have.property('username');
            expect(response.body.data.user).to.have.property('email');
            expect(response.body.data.user).to.have.property('joined');
            done();
          });
      }
    );

    it(
      'Should get default user details if token id does not match userId',
      (done) => {
        request.get('/api/v1/users/3/profile')
          .set('token', userToken)
          .end((error, response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.data.user).to.have.property('profileImage');
            expect(response.body.data.user).to.have.property('fullname');
            expect(response.body.data.user).to.have.property('username');
            expect(response.body.data.user).to.not.have.property('email');
            done();
          });
      }
    );
  });

  describe('# Edit user profile', () => {
    before((done) => {
      request.post(signupUrl)
        .send(user4)
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          userToken2 = response.body.data.token;
          done();
        });
    });

    it(
      'Should not allow a non authenticated user edit their profile',
      (done) => {
        request.put('/api/v1/users/profile')
          .send({
            fullname: 'test4user',
            username: 'test4username'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.title).to.equal('Unauthorized');
            expect(response.body.errors.detail)
              .to
              .equal('You do not have the permission to perfrom this action');
            done();
          });
      }
    );


    it('Should allow an authenticated user to edit their profile', (done) => {
      request.put('/api/v1/users/profile')
        .set('token', userToken2)
        .send({
          fullname: 'test4user',
          username: 'test4username'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.user).to.have.property('profileImage');
          expect(response.body.data.user.fullname).to.equal('test4user');
          expect(response.body.data.user.username).to.equal('test4username');
          expect(response.body.data.user).to.have.property('email');
          expect(response.body.data.user).to.have.property('joined');
          expect(response.body.data.user).to.not.have.property('password');
          done();
        });
    });
  });


  describe('# Recover lost user password', () => {
    it('Should not send recovery link with an empty email field', (done) => {
      request.post('/api/v1/users/recover-password')
        .send({
          email: ''
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.email).to.equal('Email is required');
          done();
        });
    });

    it('Should not send recovery link to an invalid email address', (done) => {
      request.post('/api/v1/users/recover-password')
        .send({
          email: 'testtest.com'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.email)
            .to.equal('Email is invalid or empty');
          done();
        });
    });

    it(
      'Should not send recovery link for email that does not exist',
      (done) => {
        request.post('/api/v1/users/recover-password')
          .send({
            email: 'testing@test.com'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.title).to.equal('Not Found');
            expect(response.body.errors.detail)
              .to.equal('Email not found');
            done();
          });
      }
    );
  });


  describe('# Reset user password', () => {
    before((done) => {
      request.post(signupUrl)
        .send(user6)
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          userToken3 = response.body.data.token;
          done();
        });
    });


    it('Should not reset password if password field is empty', (done) => {
      request.put('/api/v1/users/password-reset')
        .set('token', userToken3)
        .send({
          password: ''
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.password)
            .to.equal('Password is required');
          done();
        });
    });


    it(
      'Should not reset password if confirm password field is empty',
      (done) => {
        request.put('/api/v1/users/password-reset')
          .set('token', userToken3)
          .send({
            password: '1234567890',
            confirmPassword: ''
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.confirmPassword)
              .to.equal('Please confirm your password');
            done();
          });
      }
    );


    it(
      'Should not reset password if passwords don\'t match',
      (done) => {
        request.put('/api/v1/users/password-reset')
          .set('token', userToken3)
          .send({
            password: '1234567890',
            confirmPassword: '12345'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.confirmPassword)
              .to.equal('Passwords don\'t match');
            done();
          });
      }
    );


    it(
      'Should reset password for an authenticated user',
      (done) => {
        request.put('/api/v1/users/password-reset')
          .set('token', userToken3)
          .send({
            password: '1234567890',
            confirmPassword: '1234567890'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to
              .equal('You do not have the permission to perform this action');
            done();
          });
      }
    );
  });
});

