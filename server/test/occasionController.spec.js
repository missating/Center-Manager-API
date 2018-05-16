import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

const signupUrl = '/api/v1/users/signup';
const signinUrl = '/api/v1/users/signin';
const addCenterUrl = '/api/v1/centers';


const user1 = {
  fullname: 'testevent',
  username: 'testevent',
  email: 'testevent@test.com',
  password: '1234567890',
  confirmPassword: '1234567890'
};


let userToken;
let adminToken;

describe('Event API Test', () => {
  describe('# Add event without the needed values', () => {
    before((done) => {
      request.post(signupUrl)
        .send(user1)
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          userToken = response.body.data.token;
          done();
        });
    });

    it('Should not add an event without a title', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: '',
          description: 'birthday party',
          date: '30/1/2018',
          time: '2:00pm',
          centerId: '1'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title)
            .to.equal('Please provide a title for this event');
          done();
        });
    });


    it('Should not add an event without a description', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'party',
          description: '',
          date: '30/1/2018',
          time: '2:00pm',
          centerId: '1'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.description)
            .to.equal('Please provide a description for this event');
          done();
        });
    });


    it('Should not add an event without a specified date', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'party',
          description: 'birthday party',
          date: '',
          time: '2:00pm',
          centerId: '1'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.date)
            .to.equal('Please provide a date for the event');
          done();
        });
    });


    it('Should not add an event without the specified time', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'party',
          description: 'birthday party',
          date: '05/10/2017',
          time: '',
          centerId: '1'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.time)
            .to.equal('Please provide a time for your event');
          done();
        });
    });


    it('Should not add an event without the specified center', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'party',
          description: 'birthday party',
          date: '05/10/2017',
          time: '04:00',
          centerId: ''
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.centerId)
            .to.equal('Please pick a center for your event');
          done();
        });
    });


    it('Should not add an event without the correct date format', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'party',
          description: 'birthday party',
          date: '5/1/2017',
          time: '04:00',
          centerId: '1'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.date)
            .to.equal('The date should be in this format DD/MM/YYYY');
          done();
        });
    });


    it('Should not add an event without the correct time format', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'party',
          description: 'birthday party',
          date: '05/10/2017',
          time: '4:00',
          centerId: '1'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.time)
            .to.equal('The time must be in 24hour format 00:00');
          done();
        });
    });


    it('Should not allow a non auth user to add an event', (done) => {
      request.post('/api/v1/events')
        .send({
          title: 'owanbe',
          description: 'yoruba party',
          time: '2:00pm',
          date: '1/4/2017',
          centerId: '1'
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


  describe('# Add Event', () => {
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


    it('Should add a center', (done) => {
      request.post(addCenterUrl)
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


    it('Should allow an auth user add an event', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'owanbe',
          description: 'yoruba party',
          time: '02:00',
          date: '01/04/2017',
          centerId: '2'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.occasion).to.have.property('title');
          expect(response.body.data.occasion).to.have.property('description');
          expect(response.body.data.occasion).to.have.property('time');
          expect(response.body.data.occasion).to.have.property('date');
          done();
        });
    });


    it(
      'Should not add an event with a date that is already booked for a center',
      (done) => {
        request.post('/api/v1/events')
          .set('token', userToken)
          .send({
            title: 'owanbe',
            description: 'yoruba party',
            time: '02:00',
            date: '01/04/2017',
            centerId: '2'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(409);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.title)
              .to.equal('Conflict');
            expect(response.body.errors.detail)
              .to.equal('The above date is currently booked');
            done();
          });
      }
    );

    it('Should not add an event to a center that does not exist', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'owanbe',
          description: 'yoruba party',
          time: '02:00',
          date: '01/04/2017',
          centerId: '1'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find a center with that Id');
          done();
        });
    });
  });


  describe('# Edit event', () => {
    it(
      'Should not allow a non auth user to edit the details of an event',
      (done) => {
        request.put('/api/v1/events/1')
          .send({
            title: 'crusade',
            description: 'church prayer',
            date: '08/04/2016',
            time: '04:00',
            centerId: '2'
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


    it('Should not edit an event that the Id is not a number', (done) => {
      request.put('/api/v1/events/:eventId')
        .set('token', userToken)
        .send({
          title: 'crusade',
          description: 'church prayer',
          date: '08/04/2016',
          time: '04:00',
          centerId: '2'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.eventId)
            .to.equal('Event Id must be a number');
          done();
        });
    });


    it('Should allow an auth user to edit the details of an event', (done) => {
      request.put('/api/v1/events/1')
        .set('token', userToken)
        .send({
          title: 'cooking time',
          description: 'cook anytime and anywhere',
          date: '08/04/2016',
          time: '04:00',
          centerId: '2'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.occasion).to.have.property('title');
          expect(response.body.data.occasion.date).to.equal('08/04/2016');
          expect(response.body.data.occasion.time)
            .to.equal('04:00');
          expect(response.body.data.occasion.centerId)
            .to.equal(2);
          done();
        });
    });


    it('Should not edit an event that does not exist', (done) => {
      request.put('/api/v1/events/20')
        .set('token', userToken)
        .send({
          title: 'crusade',
          description: 'church prayer',
          date: '08/04/2016',
          time: '04:00',
          centerId: '2'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find an event with that Id');
          done();
        });
    });
  });


  describe('# Get all events', () => {
    it('Should get all centers', (done) => {
      request.get('/api/v1/events')
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data).to.have.property('numberOfItems');
          expect(response.body.data).to.have.property('limit');
          expect(response.body.data).to.have.property('pages');
          expect(response.body.data).to.have.property('currentPage');
          expect(response.body.data).to.have.property('occasion');
          expect(response.body.data.occasion)
            .to.be.an('array');
          done();
        });
    });


    it('Should not get all events with wrong pagination', (done) => {
      request.get('/api/v1/events?page=page')
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.page)
            .to.equal('Page Number must be an integer');
        });
      done();
    });
  });

  describe('# Get an event', () => {
    it('Should get an event', (done) => {
      request.get('/api/v1/events/1')
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.occasion).to.have.property('title');
          expect(response.body.data.occasion).to.have.property('description');
          expect(response.body.data.occasion).to.have.property('date');
          expect(response.body.data.occasion).to.have.property('time');
          done();
        });
    });


    it('Should not get an event that does not exist', (done) => {
      request.get('/api/v1/events/20')
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find an event with that Id');
          done();
        });
    });


    it('Should not get an event id that is not a number', (done) => {
      request.get('/api/v1/events/:eventId')
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.eventId)
            .to.equal('Event Id must be a number');
          done();
        });
    });
  });

  describe('# Get user events', () => {
    it('Should get all events by a user', (done) => {
      request.get('/api/v1/events/user')
        .set('token', userToken)
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data).to.have.property('numberOfItems');
          expect(response.body.data).to.have.property('limit');
          expect(response.body.data).to.have.property('pages');
          expect(response.body.data).to.have.property('currentPage');
          expect(response.body.data).to.have.property('occasion');
          expect(response.body.data.occasion)
            .to.be.an('array');
          done();
        });
    });

    it('Should not allow a non auth user to get all their events', (done) => {
      request.get('/api/v1/events/user')
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


  describe('# Delete an event', () => {
    it('Should not allow a non auth user to delete an event', (done) => {
      request.delete('/api/v1/events/1')
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


    it('Should allow an auth user to delete an event', (done) => {
      request.delete('/api/v1/events/1')
        .set('token', userToken)
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.data.message)
            .to.equal('The Event has been successfully deleted');
          done();
        });
    });


    it('Should not delete an event that does not exist', (done) => {
      request.delete('/api/v1/events/2')
        .set('token', adminToken)
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find an event with that Id');
          done();
        });
    });
  });

  describe('# Book an event', () => {
    it('Should not allow a non auth user book to attend an event', (done) => {
      request.post('/api/v1/events/1/register')
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


    it(
      'Should not book an event wihtout the specified number of seats',
      (done) => {
        request.post('/api/v1/events/1/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '',
            going: 'Yes'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.numberOfSeats)
              .to.equal('Please sepcify the number of seats');
            done();
          });
      }
    );


    it(
      'Should not book an event wihtout an RSVP',
      (done) => {
        request.post('/api/v1/events/1/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '1',
            going: ''
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.going)
              .to.equal('Please RSVP for the event, if you want to attend');
            done();
          });
      }
    );


    it(
      'Should not book an event if the numberOfSeats is not an integer',
      (done) => {
        request.post('/api/v1/events/1/register')
          .set('token', userToken)
          .send({
            numberOfSeats: 'one',
            going: 'Yes'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.numberOfSeats)
              .to.equal('Number of seats must be an Integer');
            done();
          });
      }
    );


    it(
      'Should not book an event if the RSVP is an integer',
      (done) => {
        request.post('/api/v1/events/1/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '1',
            going: '2'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.going)
              .to.equal('You can only RSVP with a Yes, No or Maybe');
            done();
          });
      }
    );


    it(
      'Should not book an event if the RSVP is not correct',
      (done) => {
        request.post('/api/v1/events/1/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '1',
            going: 'yes'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.going)
              .to.equal('You can only RSVP with a Yes, No or Maybe');
            done();
          });
      }
    );


    it(
      'Should not allow an auth user to book an event that does not exist',
      (done) => {
        request.post('/api/v1/events/1/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '1',
            going: 'Yes'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.title)
              .to.equal('Not Found');
            expect(response.body.errors.detail)
              .to.equal('Can\'t find an event with that Id');
            done();
          });
      }
    );

    it('Should allow an auth user add an event', (done) => {
      request.post('/api/v1/events')
        .set('token', userToken)
        .send({
          title: 'owanbe',
          description: 'yoruba party',
          time: '02:00',
          date: '05/10/2017',
          centerId: '2'
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.occasion).to.have.property('title');
          expect(response.body.data.occasion).to.have.property('description');
          expect(response.body.data.occasion).to.have.property('time');
          expect(response.body.data.occasion).to.have.property('date');
          done();
        });
    });

    it(
      'Should allow an auth user to book an event',
      (done) => {
        request.post('/api/v1/events/2/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '1',
            going: 'Yes'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(201);
            expect(response.body).to.be.an('object');
            expect(response.body.data.newAttendee)
              .to.have.property('numberOfSeats');
            expect(response.body.data.newAttendee)
              .to.have.property('going');
            done();
          });
      }
    );


    it(
      'Should allow an auth user to book for an event twice',
      (done) => {
        request.post('/api/v1/events/2/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '1',
            going: 'Yes'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(409);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.title)
              .to.equal('Conflict');
            expect(response.body.errors.detail)
              .to.equal('You already registered for this event');
            done();
          });
      }
    );
  });


  describe('# Edit an RSVP for a booked event', () => {
    it('Should not allow a non auth user edit to attend an event', (done) => {
      request.put('/api/v1/events/1/register')
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

    it(
      'Should not allow a user edit an attendee detail that does not exist',
      (done) => {
        request.put('/api/v1/events/3/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '1',
            going: 'No'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.errors.title)
              .to.equal('Not Found');
            expect(response.body.errors.detail)
              .to.equal('You don\'t have an attendee detail with that Id');
            done();
          });
      }
    );


    it(
      'Should allow an auth user edit attendee detail',
      (done) => {
        request.put('/api/v1/events/2/register')
          .set('token', userToken)
          .send({
            numberOfSeats: '3',
            going: 'No'
          })
          .end((error, response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.data.attending)
              .to.have.property('numberOfSeats');
            expect(response.body.data.attending)
              .to.have.property('going');
            done();
          });
      }
    );
  });
});

