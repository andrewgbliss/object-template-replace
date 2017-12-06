const { expect } = require('chai');
const replaceVariables = require('./index');

describe('replace variables', () => {
  it('should replace a number', () => {
    const obj1 = {
      age: '{{user.age}}'
    };
    const obj2 = {
      age: 25
    };
    const newObj = replaceVariables(obj1, obj2, 'user');
    expect(newObj).to.have.property('age');
    expect(newObj.age).to.equal('25');
  });
  it('should replace 2 numbers', () => {
    const obj1 = {
      age: 'Your age is {{user.age}}. Next year you will be {{user.nextYearAge}}'
    };
    const obj2 = {
      age: 25,
      nextYearAge: 26
    };
    const newObj = replaceVariables(obj1, obj2, 'user');
    expect(newObj).to.have.property('age');
    expect(newObj.age).to.equal('Your age is 25. Next year you will be 26');
  });
  it('should replace an object', () => {
    const obj1 = {
      age: '{{user.obj}}'
    };
    const obj2 = {
      obj: {
        born: 1995
      }
    };
    const newObj = replaceVariables(obj1, obj2, 'user');
    expect(newObj).to.have.property('age');
    expect(newObj.age).to.have.property('born');
    expect(newObj.age.born).to.equal(1995);
  });
});
