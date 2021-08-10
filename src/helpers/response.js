const log = require('../middleware/log_requests');

function respon(res, statusCode, data = [], message = '', error = false) {
  let desc = '';

  switch (statusCode) {
    case 200:
      desc = 'OK';
      break;
    case 201:
      desc = 'Created';
      break;
    case 400:
      desc = 'Bad Request';
      break;
    case 401:
      desc = 'Unauthorized';
      break;
    case 500:
      desc = 'Internal Server Error';
      break;
    case 501:
      desc = 'Bad Gateway';
      break;
    case 304:
      desc = 'Not Modified';
      break;
    default:
      desc = '';
  }

  const isObject = (cekData) => !!cekData && cekData.constructor === Object;

  const results = {
    statusCode,
    description: desc,
    isError: error,
    message,
    // eslint-disable-next-line no-nested-ternary
    data: isObject(data) ? [data] : Array.isArray(data) ? data : data,
  };
  log.response(JSON.stringify(results));
  res.status(statusCode).json(results);
}

module.exports = respon;
