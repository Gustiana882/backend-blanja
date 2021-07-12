const log = require('../middleware/log_requests');

function respon(res, status, result = '', error = 'false') {
  let desc = '';

  switch (status) {
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

  const isObject = (data) => !!data && data.constructor === Object;

  const results = {
    status,
    description: desc,
    isError: error,
    // eslint-disable-next-line no-nested-ternary
    data: isObject(result) ? [result] : Array.isArray(result) ? result : result,
  };
  log.response(JSON.stringify(result));
  res.status(status).json(results);
}

module.exports = respon;
