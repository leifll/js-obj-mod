'use strict';

const util = require('util');

/* Mina föreläsningsanteckningar finns i ~/pCloudDrive/BACKUPS_DONT_TOUCH/
   id1354-bup190213-final2018/lectures/js-language/js-language.pdf.*/

/* Kolla i ECMA-script specen, tex kap 20. Den finns på https://tc39.es/ecma262/ */

/**
 * Constructor function for a Person object.
 * @param {string} firstName - The first name of the newly constructed Person object.
 * @param {number} age - The age of the newly constructed Person object.
 */
function Person(firstName, age) {
  firstName = firstName;
  age = age;
};

console.log(Person.getPrototypeOf);
console.log(Object.getPrototypeOf);
console.log(Object.getPrototypeOf());

const myMother = new Person('Fia', 48);

const printSeparator = () => console.log('---------------------------------'); 

const logPrototype = (name, obj) => {
  if (obj === undefined || Object.getPrototypeOf(obj) === undefined) {
    return;
  }
  console.log('Object.getPrototypeOf(' + name + ')):' + Object.getPrototypeOf(obj));
  logPrototype('Object.getPrototypeOf(' + name + ')' + Object.getPrototypeOf(obj));
};

const logObj = (name, obj) => {
  console.log(name + ':' + obj); // calls obj.toString()
  console.log(name + '.constructor:' + obj.constructor);
  logPrototype(name, obj);
  printSeparator();
};

logObj('myMother', myMother);
logObj('Person', Person);
logObj('Object', Object);

console.log(util.inspect(Person, {showHidden: true, depth: null, colors: true}));
printSeparator();
console.log(util.inspect(Object.getPrototypeOf(Person),
    {showHidden: true, depth: null, colors: true}));
printSeparator();
console.log(util.inspect(Object, {showHidden: true, depth: null, colors: true}));
printSeparator();
console.log(util.inspect(Object.getPrototypeOf(Object),
    {showHidden: true, depth: null, colors: true}));
