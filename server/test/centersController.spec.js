import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

const signinUrl = '/api/v1/users/signin';

let adminToken;

describe('Admin API test', () => {
  describe('# Add center', () => {
    before((done) => {
      request.post(signinUrl)
        .send({
          identifier: 'admin',
          password: process.env.ADMIN_PASSWORD
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          adminToken = response.body.data.token;
          done();
        });
    });

    it('Should not add a center without a centerImage', (done) => {
      request.post('/api/v1/centers')
        .set('token', adminToken)
        .send({
          centerImage: '',
          name: 'center',
          location: 'location',
          facilities: 'facilities'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.centerImage)
            .to.equal('Please provide an image for your center');
          done();
        });
    });


    it('Should not add a center without a name', (done) => {
      request.post('/api/v1/centers')
        .set('token', adminToken)
        .send({
          centerImage: 'image',
          name: '',
          location: 'location',
          facilities: 'facilities'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.name)
            .to.equal('Please provide the name of your center');
          done();
        });
    });


    it('Should not add a center without a location', (done) => {
      request.post('/api/v1/centers')
        .set('token', adminToken)
        .send({
          centerImage: 'image',
          name: 'center',
          location: '',
          facilities: 'facilities'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.location)
            .to.equal('Please provide the location of your center');
          done();
        });
    });


    it('Should not add a center without facilities', (done) => {
      request.post('/api/v1/centers')
        .set('token', adminToken)
        .send({
          centerImage: 'image',
          name: 'center',
          location: 'location',
          facilities: ''
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.facilities)
            .to.equal('Please least the facilities in your center');
          done();
        });
    });

    it('Should add a center', (done) => {
      request.post('/api/v1/centers')
        .set('token', adminToken)
        .send({
          centerImage: 'image',
          name: 'center',
          location: 'location',
          facilities: 'facilities'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.center).to.have.property('centerImage');
          expect(response.body.data.center).to.have.property('name');
          expect(response.body.data.center).to.have.property('location');
          expect(response.body.data.center).to.have.property('facilities');
          done();
        });
    });

    it('Should add a center with the same name', (done) => {
      request.post('/api/v1/centers')
        .set('token', adminToken)
        .send({
          centerImage: 'image',
          name: 'center',
          location: 'location',
          facilities: 'facilities'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(409);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Conflict');
          expect(response.body.errors.detail)
            .to.equal('You already have a center with this name');
          done();
        });
    });

    it('Should not allow a non auth user to add a center', (done) => {
      request.post('/api/v1/centers')
        .send({
          centerImage: 'image',
          name: 'center',
          location: 'location',
          facilities: 'facilities'
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
    });
  });


  describe('# Edit center', () => {
    it(
      'Should not allow a non auth user to edit the details of a center',
      (done) => {
        request.put('/api/v1/centers/1')
          .send({
            centerImage: 'center image',
            name: 'center name',
            location: 'center location',
            facilities: 'center facilities'
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

    it('Should not edit a center that the id is not a number', (done) => {
      request.put('/api/v1/centers/:centerId')
        .set('token', adminToken)
        .send({
          centerImage: 'center image',
          name: 'center name',
          location: 'center location',
          facilities: 'center facilities'
        })
        .end((errors, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.centerId)
            .to.equal('Center Id must be a number');
          done();
        });
    });

    it(
      'Should allow an auth user to edit the details of a center',
      (done) => {
        request.put('/api/v1/centers/1')
          .set('token', adminToken)
          .send({
            centerImage: 'center image',
            name: 'center name',
            location: 'center location',
            facilities: 'center facilities'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.data.center).to.have.property('centerImage');
            expect(response.body.data.center.centerImage)
              .to.equal('center image');
            expect(response.body.data.center.name).to.equal('center name');
            expect(response.body.data.center.location)
              .to.equal('center location');
            expect(response.body.data.center.facilities)
              .to.equal('center facilities');
            done();
          });
      }
    );

    it('Should not edit a center that does not exist', (done) => {
      request.put('/api/v1/centers/2')
        .set('token', adminToken)
        .send({
          centerImage: 'center image',
          name: 'center name',
          location: 'center location',
          facilities: 'center facilities'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find a center with that id by you');
          done();
        });
    });
  });


  describe('# Get all centers', () => {
    it('Should get all centers', (done) => {
      request.get('/api/v1/centers')
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data).to.have.property('numberOfItems');
          expect(response.body.data).to.have.property('limit');
          expect(response.body.data).to.have.property('pages');
          expect(response.body.data).to.have.property('currentPage');
          expect(response.body.data).to.have.property('centers');
          expect(response.body.data.centers)
            .to.be.an('array');
          done();
        });
    });


    it('Should not get all centers with wrong pagination', (done) => {
      request.get('/api/v1/centers?page=page')
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.page)
            .to.equal('Page Number must be an integer');
        });
      done();
    });
  });


  describe('# Get a center', () => {
    it('Should get a center', (done) => {
      request.get('/api/v1/centers/1')
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.center).to.have.property('centerImage');
          expect(response.body.data.center).to.have.property('name');
          expect(response.body.data.center).to.have.property('location');
          expect(response.body.data.center).to.have.property('facilities');
          done();
        });
    });


    it('Should not get a center that does not exist', (done) => {
      request.get('/api/v1/centers/20')
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find a center with that Id');
          done();
        });
    });


    it('Should not get a center id that is not a number', (done) => {
      request.get('/api/v1/centers/:centerId')
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.centerId)
            .to.equal('Center Id must be a number');
          done();
        });
    });
  });


  describe('# Delete center', () => {
    it('Should not allow a non auth user to delete a center', (done) => {
      request.delete('/api/v1/centers/1')
        .end((error, response) => {
          expect(response.statusCode).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Unauthorized');
          expect(response.body.errors.detail)
            .to
            .equal('You do not have the permission to perfrom this action');
          done();
        });
    });

    it('Should allow an auth user to delete a center', (done) => {
      request.delete('/api/v1/centers/1')
        .set('token', adminToken)
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.data.message)
            .to.equal('Center deleted successfully');
          done();
        });
    });

    it('Should not delete a center that does not exist', (done) => {
      request.delete('/api/v1/centers/2')
        .set('token', adminToken)
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find a center with that id by you');
          done();
        });
    });
  });
});
