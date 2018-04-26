import { isEmpty } from 'lodash';

export const verifyUserId = (req, res, next) => {
  const { userId } = req.params;

  const errors = {};

  if (Number.isNaN(parseInt(userId, 10))) {
    errors.userId = 'User Id must be a number';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

export const verifyCenterId = (req, res, next) => {
  const { centerId } = req.params;

  const errors = {};

  if (Number.isNaN(parseInt(centerId, 10))) {
    errors.centerId = 'Center Id must be a number';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

export const verifyEventId = (req, res, next) => {
  const { eventId } = req.params;

  const errors = {};

  if (Number.isNaN(parseInt(eventId, 10))) {
    errors.eventId = 'Event Id must be a number';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

