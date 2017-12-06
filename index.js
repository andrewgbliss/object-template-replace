const deepKeys = require('deep-keys');
const _ = require('lodash');

/**
 * Replace any variables that appear in an auth flow object
 * @param {*} obj1 The object to replace variables
 * @param {*} obj2 The object to look in that has the variables
 * @param {*} prefix The prefix of what variables to replace
 */
function replaceVariables(obj1, obj2, prefix) {
  const regex = new RegExp(`\{\{${prefix}\.(.*?)\}\}`, 'g');
  const obj1Copy = _.cloneDeep(obj1);
  _.each(deepKeys(obj1Copy), (path) => {
    let value = _.get(obj1Copy, path);
    if (_.isString(value)) {
      let match;
      while ((match = regex.exec(value)) !== null) {
        const varName = _.get(match, '1');
        const valueToReplace = _.get(obj2, varName);
        if (_.isObject(valueToReplace)) {
          _.set(obj1Copy, path, valueToReplace);
        } else {
          const regex2 = new RegExp(`\{\{${prefix}\.${varName}\}\}`, 'g');
          value = value.replace(regex2, valueToReplace);
          _.set(obj1Copy, path, value);
        }
      }
    }
  });
  return obj1Copy;
}

module.exports = replaceVariables;