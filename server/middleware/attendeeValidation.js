import { isEmpty } from 'lodash';
import validator from 'validator';

export const verifyBookOccasion = (req, res, next) => {
  const { numberOfSeats, going } = req.body;

  const errors = {};
  if (!numberOfSeats) {
    errors.numberOfSeats = 'Please sepcify the number of seats';
  } else if (numberOfSeats && validator.isEmpty(numberOfSeats.trim())) {
    errors.numberOfSeats = 'Number of seats booked cannot be empty';
  } else if (Number.isNaN(parseInt(numberOfSeats, 10))) {
    errors.numberOfSeats = 'Number of seats must be an Integer';
  } else if (!going) {
    errors.going = 'Please RSVP for the event, if you want to attend';
  } else if (going && validator.isEmpty(going.trim())) {
    errors.going = 'Your RSVP cannot be empty';
  } else if (validator.isInt(going)) {
    errors.going = 'You can only RSVP with a Yes, No or Maybe';
  } else if (!((going === 'Yes') || (going === 'No') || (going === 'Maybe'))) {
    errors.going = 'You can only RSVP with a Yes, No or Maybe';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

export const editBookOccasion = (req, res, next) => {
  const { numberOfSeats, going } = req.body;

  const errors = {};

  if (numberOfSeats && validator.isEmpty(numberOfSeats.trim())) {
    errors.numberOfSeats = 'Please provide a valid number of seats';
  }

  if (numberOfSeats && Number.isNaN(parseInt(numberOfSeats, 10))) {
    errors.centerId = 'Number of seats must be an integer';
  }

  if (going && validator.isEmpty(going)) {
    errors.going = 'Please provide a valid RSVP';
  }

  if (going && validator.isInt(going)) {
    errors.centerId = 'Number of seats must be an integer';
  }

  if (!((going === 'Yes') || (going === 'No') || (going === 'Maybe'))) {
    errors.going = 'You can only RSVP with a Yes, No or Maybe';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

