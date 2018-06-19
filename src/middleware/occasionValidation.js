import { isEmpty } from 'lodash';
import validator from 'validator';


export const verifyNewOccasion = (req, res, next) => {
  const {
    title, description, date, time, centerId
  } = req.body;

  const errors = {};

  if (!title) {
    errors.title = 'Please provide a title for this event';
  } else if (title && validator.isEmpty(title.trim())) {
    errors.title = 'The title of this event cannot be empty';
  } else if (!description) {
    errors.description = 'Please provide a description for this event';
  } else if (description && validator.isEmpty(description.trim())) {
    errors.description = 'Description cannot be empty';
  } else if (!date) {
    errors.date = 'Please provide a date for the event';
  } else if (date && validator.isEmpty(date.trim())) {
    errors.date = 'You must provide a date for this event';
  } else if
  (!/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/.test(date)) {
    errors.date = 'The date should be in this format DD/MM/YYYY';
  } else if (!time) {
    errors.time = 'Please provide a time for your event';
  } else if (time && validator.isEmpty(time.trim())) {
    errors.time = 'Please provide a time for this event';
  } else if (!/^([01]\d|2[0-3])[:]([0-5]\d)$/.test(time)) {
    errors.time = 'The time must be in 24hour format 00:00';
  } else if (!centerId) {
    errors.centerId = 'Please pick a center for your event';
  } else if (centerId && validator.isEmpty(centerId.trim())) {
    errors.centerId = 'The centerId cannot be empty';
  } else if (Number.isNaN(parseInt(centerId, 10))) {
    errors.centerId = 'Center Id must be a number';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

export const verifyEditOccassion = (req, res, next) => {
  const {
    title, description, date, time, centerId
  } = req.body;

  const errors = {};

  if (title && validator.isEmpty(title.trim())) {
    errors.title = 'Please provide a valid title';
  }
  if (description && validator.isEmpty(description.trim())) {
    errors.description = 'Please provide a valid description';
  }

  if (date && validator.isEmpty(date.trim())) {
    errors.date = 'Please provide a valid date';
  }

  if (date && !/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/
    .test(date)) {
    errors.date = 'The date should be in this format DD/MM/YYYY';
  }

  if (time && validator.isEmpty(time.trim())) {
    errors.time = 'Please provide a valid time';
  }

  if (time && !/^([01]\d|2[0-3])[:]([0-5]\d)$/.test(time)) {
    errors.date = 'The time must be in 24hour format 00:00';
  }

  if (centerId && validator.isEmpty(centerId.trim())) {
    errors.centerId = 'Please provide a valid centerId';
  }

  if (centerId && Number.isNaN(parseInt(centerId, 10))) {
    errors.centerId = 'CenterId must be an integer';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

