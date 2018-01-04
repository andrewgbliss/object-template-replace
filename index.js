const deepKeys = require('deep-keys');
const _ = require('lodash');

/**
 * Replace any variables that appear in an auth flow object
 * @param {object} obj1 The object to replace variables
 * @param {object} store The object to look in that has the variables
 * @param {*} prefix The prefix of what variables to replace
 */
function replaceFromStore(obj, store, prefix) {
  const regex = new RegExp(`\{\{${prefix}\.(.*?)\}\}`, 'g');
  _.each(deepKeys(obj), (path) => {
    let value = _.get(obj, path);
    if (_.isString(value)) {
      let match;
      while ((match = regex.exec(value)) !== null) {
        const varName = _.get(match, '1');
        const valueToReplace = _.get(store, varName);
        if (_.isObject(valueToReplace)) {
          _.set(obj, path, valueToReplace);
        } else {
          const regex2 = new RegExp(`\{\{${prefix}\.${varName}\}\}`, 'g');
          value = value.replace(regex2, valueToReplace);
          _.set(obj, path, value);
        }
      }
    }
  });
  return obj;
}

/**
 * Replace any variables that appear in an auth flow object
 * @param {object} obj The object to replace variables
 * @param {array} stores An array of stores to use for replacing
 */
function replaceVariables(obj, stores) {
  let objCopy = _.cloneDeep(obj);
  _.each(stores, (store) => {
    objCopy = replaceFromStore(objCopy, store.store, store.prefix);
  });
  return objCopy;
}

module.exports = replaceVariables;