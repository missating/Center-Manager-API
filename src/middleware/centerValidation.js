import { isEmpty } from 'lodash';
import validator from 'validator';


const verifyNewCenter = (req, res, next) => {
  const {
    centerImage, name, location, facilities
  } = req.body;

  const errors = {};

  if (!centerImage) {
    errors.centerImage = 'Please provide an image for your center';
  } else if (centerImage && validator.isEmpty(centerImage.trim())) {
    errors.centerImage = 'Center Imgae cannot be empty';
  } else if (!name) {
    errors.name = 'Please provide the name of your center';
  } else if (name && validator.isEmpty(name.trim())) {
    errors.name = 'Center name cannot be empty';
  } else if (!location) {
    errors.location = 'Please provide the location of your center';
  } else if (location && validator.isEmpty(location.trim())) {
    errors.location = 'Location cannot be empty';
  } else if (!facilities) {
    errors.facilities = 'Please least the facilities in your center';
  } else if (facilities && validator.isEmpty(facilities.trim())) {
    errors.facilities = 'A center should have at least 1 facility';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};

export default verifyNewCenter;

