'use strict';

/*
Mina föreläsningsanteckningar finns i ~/pCloudDrive/BACKUPS_DONT_TOUCH/
   id1354-bup190213-final2018/lectures/js-language/js-language.pdf.

Kolla i ECMA-script specen, tex kap 20. Den finns på https://tc39.es/ecma262/
Läs också gärna https://v8.dev/blog/understanding-ecmascript-part-1, och
https://timothygu.me/es-howto/ som båda förklarar specen.
*/

// Note that internal slots, represented in double square brackets, [[]],
// aren't properties. Internal slots are not inherited and can not be accessed
// from a JS program. (6.1.7.2)

// AN OBJECT'S PROTOTYPE IS CONTAINED IN THE [[prototype]]
// INTERNAL SLOT, NOT IN THE prototype PROPERTY. See the fifth and sixth bullet under 20.2.3,
// and also 20.2.4.3.

// Table 4 in section 6.1.7.2 defines getPrototypeOf. It returns "the object that
// provides inherited properties for this object. A null value indicates that
// there are no inherited properties." getPrototypeOf is an internal method,
// which means it's not reachable from a JS program. To call someObj.getPrototypeOf,
// instead call Object.getPrototypeOf(someObj), which does in fact return
// someObj.[[GetPrototypeOf]]().

// I haven't found it explicitly stated, but "the object that provides inherited
// properties for this object", see above, reasonably means the value of the
// [[prototype]] internal slot. This should mean that Object.getPrototypeOf(someObj)
// actually returns someObj.[[prototype]]).
// According to https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
// "The property of an object that points to its prototype is not called prototype.
// Its name is not standard, but in practice all browsers use __proto__. The standard
// way to access an object's prototype is the Object.getPrototypeOf() method.

// A function object is an object that supports the [[Call]] internal method.
// A constructor is an object that supports the [[Construct]] internal method.
// Every object that supports [[Construct]] must support [[Call]]; that is,
// every constructor must be a function object. Therefore, a constructor may
// also be referred to as a constructor function or constructor function object. (6.1.7.2)

// Well-known intrinsics are built-in objects. A reference such as %name% means
// the intrinsic object corresponding to 'name'. (6.1.7.4)

// 1. The Object constructor is %Object% (20.1.1). 'Object constructor' means
// 'the object constructor function' (or just 'the Object function'). Note that
// Object (or Object function) isn't the empty object, {}, but instead
// a constructor that creates an empty object.

// 2. The Function constructor is %Function% (20.2.1). The 'Function constructor' is a
// function that can be used to create other functions, with the statement
// 'Function(...parameterArgs, bodyArg)'. (20.2.1.1)

// 3. The prototype of an object is set to the value of the prototype property (not of
// the [[prototype]] internal slot) of that object's constructor (4.4.7 and 4.4.8). See also
// bullet 10 below.

// 4. The Object.[[Prototype]] internal slot is %Function.prototype% (20.1.2). This is a
// consequence of bullets 1, 2, 3 and 7.
console.log(Object.getPrototypeOf(Object)); // Prints {}, which is correct according to 9.

// 5. The Object prototype object is called %Object.prototype% in the spec. (20.1.3)

// 6. %Object.prototype%.[[prototype]] is null (20.1.3)

// 7. The Function.[[prototype]] internal slot is %Function.prototype% (20.2.2). The
// Function.prototype property is also %Function.prototype% (20.2.2.1).

// 8. The %Function.prototype%.[[prototype]] internal slot is %Object.prototype%. (20.2.3)

// 4 & 8 => Object.[[Prototype]].[[prototype]] = %Object.prototype%
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object)));
// Prints [Object: null prototype] {}, which is correct according to 5 and 6.

// 9. The Function prototype object is called %Function.prototype% in the spec. It is itself a
// function object (20.2.3).

// 4, 8 & 9 => Object.[[Prototype]].[[prototype]].[[prototype]] = null
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object))));
// Prints null.

// 10. Function instances that can be used as a constructor have a "prototype" property.
// Whenever such a Function instance is created another ordinary object is also created
// and is the initial value of the function's "prototype" property. Unless otherwise
// specified, the value of the "prototype" property is used to initialize the [[Prototype]]
// internal slot of the object created when that function is invoked as a constructor. (20.2.4.3)

// 11. The initial value of the property Object.prototype is %Object.prototype%.

// 12. 'new Object()', 'new Object' and '{}' all mean exactly the same thing. Just
// 'Object', on the other hand, is the function named 'Object', not an actual object.

// 10, 11, 12 => {}.[[prototype]] = [Object: null prototype] {}
console.log(Object.getPrototypeOf({})); // Prints [Object: null prototype] {}

// 13. The property 'constructor' of the property 'prototype' of a function contains a reference to
// the function itself. This means that, if 'a' is a function, a.prototype.constructor === a. The
// purpose is to be able to find the constructor function of any object. This is stated at
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/
// Inheritance_and_the_prototype_chain#constructors. I haven't found it explicitly stated in
// the spec, but it's indicated in 20.2.3.4.
console.log(Object.prototype.constructor); // Prints [Function: Object]

/*
-------------------------- utilities used to illustrate prototype chains -----------
*/

const printSeparator = () => console.log('---------------------------------\n');

const logPrototype = (name, obj) => {
  if (obj === null) {
    return;
  }
  console.log('\nObject.getPrototypeOf(' + name + '):');
  console.log(Object.getPrototypeOf(obj));
  console.log();
  logPrototype(name + '.prototype', Object.getPrototypeOf(obj));
};

const logObj = (name, obj) => {
  console.log(name + ':' + obj); // calls obj.toString()
  console.log(name + '.constructor:' + obj.constructor);
  logPrototype(name, obj);
  printSeparator();
};

/*
------------------ end of utilities used to illustrate prototype chains -----------
*/

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

printSeparator();

logObj('Person', Person);
// The constructor of any function is the Function constructor.
// The prototype of any function is, according to bullets 7 and 10, %Function.prototype%. It is,
// according to bullet 9, a function object.
// The prototype of %Function.prototype% is, according to bullet 8, %Object.prototype%.
// The prototype of %Object.prototype% is, according to bullet 6, null.

logObj('myMother', myMother);
// The constructor of any object is the function invoked to instantiate that object.
// The prototype of any object is the value of the prototype property of the function used to
// instantiate that object. This value is an ordinary object according to bullet 10.
// The default prototype of an ordinary object is %Object.prototype%, according to
// bullets 10, 11 and 12.
// The prototype of %Object.prototype% is, according to bullet 6, null.

console.log(Object.getPrototypeOf(myMother).constructor);
// The constructor property of the prototype of an object is the constructor function
// used to create that object, according to bullets 3 and 13.
