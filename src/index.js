'use strict';

/* Mina föreläsningsanteckningar finns i ~/pCloudDrive/BACKUPS_DONT_TOUCH/
   id1354-bup190213-final2018/lectures/js-language/js-language.pdf.*/

/*
Kolla i ECMA-script specen, tex kap 20. Den finns på https://tc39.es/ecma262/
Läs också gärna https://v8.dev/blog/understanding-ecmascript-part-1, och
https://timothygu.me/es-howto/ som båda förklarar specen.

Note that internal slots, represented in double square brackets, [[]],
aren't properties. Internal slots are not inherited and can not be accesses
from a JS program. (6.1.7.2)

The Object constructor is %Object%. (20.1.1)
Object.[[Prototype]] internal slot is %Function.prototype%. (20.1.2)
The Function prototype object is %Function.prototype%. (20.2.3)
Function.[[Prototype]].[[Prototype]] internal slot is %Object.prototype%. (20.2.3)
The Object prototype object is %Object.prototype%. (20.1.3)
Object.[[Prototype]].[[Prototype]] internal slot is null. (20.1.3)

ANLEDNINGEN TILL ATT DET INTE STÄMMER VID PROVKÖRNING ÄR KANSKE ATT JAG BLANDAR IHOP
PROTOTYPE PROPERTY OCH INTERNAL SLOT, SE  5:E OCH 6:e PUNKTEN UNDER 20.2.3.

*/

/**
 * Constructor function for a Person object.
 * @param {string} firstName - The first name of the newly constructed Person object.
 * @param {number} age - The age of the newly constructed Person object.
 */
function Person(firstName, age) { // Person is a function object.
  firstName = firstName;
  age = age;
};

const myMother = new Person('Fia', 48);

/*
Table 4 in section 6.1.7.2 defines getPrototypeOf. It returns "the object that
provides inherited properties for this object. A null value indicates that
there are no inherited properties." getPrototypeOf is an internal method, which
means it's not reachable from a JS program. To call someObj.getPrototypeOf
instead call Object.getPrototypeOf(someObj), which does in fact return
someObj.[[GetPrototypeOf]]()
*/

const printSeparator = () => console.log('---------------------------------');

const logPrototype = (name, obj) => {
  if (obj === undefined) {
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
/*
console.log(util.inspect(Person, {showHidden: true, depth: null, colors: true}));
printSeparator();
console.log(util.inspect(Object.getPrototypeOf(Person),
    {showHidden: true, depth: null, colors: true}));
printSeparator();
console.log(util.inspect(Object, {showHidden: true, depth: null, colors: true}));
printSeparator();
console.log(util.inspect(Object.getPrototypeOf(Object),
    {showHidden: true, depth: null, colors: true}));
*/
