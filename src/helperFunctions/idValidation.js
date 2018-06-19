
const verifyPageNumber = (page) => {
  const errors = {};

  if (Number.isNaN(parseInt(page, 10))) {
    errors.page = 'Page Number must be an integer';
  }

  return errors;
};

export default verifyPageNumber;
