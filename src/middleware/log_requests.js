/* eslint-disable no-unused-vars */
const log = {};
log.requests = (req, res, next) => {
  const dateTime = new Date();
  const date = dateTime.getDate();
  const hour = dateTime.getHours();
  const mins = dateTime.getMinutes();
  const secs = dateTime.getSeconds();
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth();

  const time = `${date}/${month}/${year}:${hour}:${mins}:${secs}`;
  const data = `${time} | ${req.ip} | ${req.method} | ${req.originalUrl} | ${res.statusCode} `;
  process.stdout.write(data);
  next();
};

log.response = (props) => {
  console.log(`| ${props}`);
};

module.exports = log;
