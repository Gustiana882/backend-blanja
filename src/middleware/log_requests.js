/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
const { appendFile, unlink, readdir } = require('fs');

let logreq = '';

const deleteLog = (time) => {
  readdir('log', (err, file) => {
    if (err) throw err;
    file.map((list) => {
      if (list !== time) {
        unlink(`log/${list}`, (error) => {
          if (error) console.log(error);
        });
      }
    });
  });
};

const logSave = (data) => {
  try {
    const dateTime = new Date();
    const date = dateTime.getDate();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth();
    const time = `${date}-${month}-${year}-`;
    if (date === 1) {
      deleteLog(`${time}log.txt`);
    }
    appendFile(`log/${time}log.txt`, data, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const log = {};

log.requests = (req, res, next) => {
  if (process.env.APP_STATUS === 'test') {
    return next();
  }
  const dateTime = new Date();
  const date = dateTime.getDate();
  const hour = dateTime.getHours();
  const mins = dateTime.getMinutes();
  const secs = (dateTime.getSeconds() < 10) ? `0${dateTime.getSeconds()}` : dateTime.getSeconds();
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth();

  const time = `${date}/${month}/${year}:${hour}:${mins}:${secs}`;
  logreq = `${time} | ${req.ip} | ${req.method} | ${req.originalUrl} | ${res.statusCode}`;
  next();
};

log.response = (props) => {
  logSave(`${logreq} | ${props}\n`);
  if (process.env.APP_STATUS === 'test') {
    return;
  }
  return console.log(`${logreq} | ${props}`);
};

module.exports = log;
