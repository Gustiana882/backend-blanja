/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const nullValidator = (object, except = []) => {
  let result;
  for (const key in object) {
    if (!except.find((ex) => ex === key) && (object[key] === undefined || object[key] === null || object[key] === false || object[key] === '' || object[key] === 'undefined' || object[key] === 'null' || object[key] === 'false')) {
      result = false;
      break;
    }
    result = true;
  }
  return result;
};

module.exports = nullValidator;
