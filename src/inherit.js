'use strict';

/**
 * The child of an inheritance chain.
 * @param {string} name - The name of this object.
 */
function Child(name) {
  this.paramA = 1;
  this.paramC = 2;
  this.name = name;

  const self = this;
  /**
   * There's no guarantee that 'this' points to the newly created object when
   * sumParams is called. Using 'self' in this way, instead of 'this', creates a closure.
   * @return {number} - The sum of paramA and paramC
   */
  this.sumParams = function() {
    return self.paramA + self.paramC;
  };
}

const child = new Child('child obj');
console.log('1: ' + child.paramA); // 1
console.log('2: ' + child.name); // 'child obj'
console.log('3: ' + child.paramB); // undefined
console.log('4: ' + (Object.getPrototypeOf(child) === Child.prototype)); // true
console.log('5: ' + (Object.getPrototypeOf(child) === Object.getPrototypeOf(Child))); // false
console.log('6: ' + (Object.getPrototypeOf(Child.prototype) === Object.prototype)); // true
console.log('7: ' + (Object.getPrototypeOf(Object.prototype) === null)); // true

const olle = new Child('Olle');
const stina = new Child('Stina');

Child.prototype.greet = function() {
  return 'Hi ' + this.name + '!';
};

console.log('8: ' + olle.sumParams()); // 3.
console.log('9: ' + olle.greet()); // 'Hi Olle!'.
console.log('10: ' + stina.sumParams()); // 3.
console.log('10: ' + stina.greet()); // 'Hi Stina!'.

Child.prototype.badGreet = ()=> {
  return 'Hi ' + this.name + '!';
};
console.log('12: ' + stina.badGreet()); // Prints 'Hi undefined!', since arrow functions have
//                                         no binding for 'this'.

// Two important points to remember:
// 1. Don't change prototype of a constructor after it's been used to create objects, otherwise
//    objects created before and after the prototype change will have different prototypes. Also,
//    the prototype can't be used to find the constructor that created the object.
// 2. Don't update prototypes of built-in objects, like %Object.prototype%, since it will affect
//    all objects, and also might conflict with future updates to the JS language.


/**
 * The parent of an inheritance chain.
 */
function Parent() {
  this.paramB = 3;
}
Object.setPrototypeOf(Child.prototype, Parent.prototype);
const inheritingChild = new Child('inherit');

console.log('13: ' +
            (Object.getPrototypeOf(inheritingChild) === Child.prototype)); // true
console.log('14: ' +
            (Object.getPrototypeOf(Child.prototype) === Parent.prototype)); // true
console.log('15: ' + inheritingChild.paramB); // undefined, since paramB is defined in
//                                               Parent, not in Parent's prototype.
console.log('16: ' + inheritingChild.super); // undefined

Parent.prototype.paramB = 3;
console.log('17: ' + inheritingChild.paramB); // 3

/**
 * A parent class, to be extended.
 *
 * When a class definition is evaluated, a constructor function with
 * the same name as the class is created. The value of the 'prototype' property of
 * this function is a newly created object. The prototype of this newly created object
 * is %Object.prototype% if the class is not inheriting, or the value
 * of the parent's prototype property if the class is inheriting.
 *
 * The body of the newly created function is the same as the body of the class's constructor,
 * or just a call to super, if the class has no constructor.
 */
class ParentClass {
  /**
   * Constructs a new instance of the Parent class. Note that when this constructor is called
   * from the inheriting class, on line 110, 'this' on line 96 will point to the new object
   * being constructed. It will not point to some separate object related to the parent
   * class.
   */
  constructor() {
    this.paramB = 3;
  }

  /**
   * To be called from child class. A method is a function with a reference to the
   * object it's located 'in'.
   * @return {string} - a return value from this class
   */
  methodInParent() {
    return 'message from parent';
  }
}

/**
 * A child class, to be extending.
 */
class ChildClass extends ParentClass {
  /**
   * Constructs a new instance of the Child class.
   */
  constructor() {
    super();
    this.paramA = 1;
  }

  /**
   * Illustrates wrong use of 'super'.
   * @return {number} - paramB from the superclass.
   */
  readFromParent() {
    return super.paramB;
  }

  /**
   * Illustrates correct use of 'super'.
   * @return {string} - a string returned by the parent
   */
  callParent() {
    return super.methodInParent();
  }
}

const childClass = new ChildClass();
console.log('18: ' +
            (Object.getPrototypeOf(childClass) === ChildClass.prototype)); // true
console.log('19: ' +
            (Object.getPrototypeOf(ChildClass.prototype) === ParentClass.prototype)); // true
console.log('20: ' + ParentClass.prototype.paramB); // undefined
console.log('21: ' + ChildClass.prototype.paramB); // undefined
console.log('22: ' + childClass.paramB); // 3
console.log('23: ' + Object.hasOwn(childClass, 'paramB')); // true
// An important conclusion of the lines above is not to use prototypes when using classes.

console.log('24: ' + childClass.readFromParent()); // undefined, since paramB isn't
//                                                    located in the parent class.
console.log('25: ' + childClass.callParent()); // message from parent
