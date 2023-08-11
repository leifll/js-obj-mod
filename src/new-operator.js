'use strict';

// The new operator is described in the following sequence of spec sections:
// a. 13.3.5 defines the new operator itself. It calls the abstract operation Construct.
// b. 7.3.15 defines the abstract operation Construct. It calls the 'additional
//    essential internal method' [[Construct]] of the function object used as constructor.
// c. Table 5 in 6.1.7.2 introduces [[Construct]]. 10.2.2 defines [[Construct]].

// In brief, the main success scenario is as follows:
// a. A new ordinary object is created. The value of [[prototype]] of this new object
//    is retrieved from the constructor function's "prototype" property, if it exists. Otherwise,
//    [[prototype]] is set to %Object.prototype%.
// b. 'this' is set to the object created in bullet a.
// c. All [[PrivateMethods]] and [[Fields]] of the constructor are added to the object created
//    in bullet a.
// d. The constructor function specified with the 'new' operator is called with the
//    specified arguments.
// e. If the constructor function returns an object, that object is returned by the 'new' operator.
//    If the constructor function doesn't return an object, the 'new' operator returns the object
//    created in bullet a.

/**
 * Constructor function for a Person object.
 * @param {string} firstName - The first name of the newly constructed Person object.
 * @param {number} age - The age of the newly constructed Person object.
 */
function Person(firstName, age) { // Person is a function object.
  this.firstName = firstName;
  this.age = age;
};

const myMother = new Person('Fia', 48);

/**
 * Constructor function for a Person object that returns another object.
 * @param {string} firstName - The first name of the newly constructed Person object.
 * @param {number} age - The age of the newly constructed Person object.
 * @return {Object} A newly created object, to be used instead of the object assigned to 'this'.
 */
function PersonReturningObj(firstName, age) { // Person is a function object.
  this.firstName = firstName;
  this.age = age;
  return {firstName: 'Stina', age: age};
};

console.log(Person.prototype); // Prints {}, which is a new ordinary object, created to be used as
//                                the value of the 'prototype' property of Person.
console.log(Object.getPrototypeOf(Person)); // Prints {}, which is the function
//                                             object %Function.prototype%.
console.log(Object.getPrototypeOf(myMother)); // Prints the same object as
//                                               console.log(Person.prototype)
console.log(myMother.firstName); // Prints 'Fia'.
console.log(myMother.age); // Prints 48.

const myMotherCreatedWithReturningObj = new PersonReturningObj('Fia', 48);
console.log(myMotherCreatedWithReturningObj.firstName); // Prints 'Stina'.
console.log(myMotherCreatedWithReturningObj.age); // Prints 48.
