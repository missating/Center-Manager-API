
const pagination = (req, offset, numberOfItems) => {
  const limit = 6;

  let originUrl = req.originalUrl;

  if (req.originalUrl.indexOf('?') !== -1) {
    originUrl = req.originalUrl.slice(0, req.originalUrl.indexOf('?'));
  }

  const url = `http://${req.get('host')}${originUrl}`;

  const meta = {};

  let page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page, 10);
  }

  const nextOffset = offset + limit;
  if (nextOffset < numberOfItems) {
    page += 1;
    meta.next = `${url}?page=${page}`;
  }

  const prevOffset = offset - limit;
  if (prevOffset > -1) {
    page -= 1;
    meta.previous = `${url}?page=${page}`;
  }

  return meta;
};

export default pagination;
