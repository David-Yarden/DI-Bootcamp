const isString = (value) => typeof value === 'string';

console.log(isString('hello')); // true
console.log(isString([1,2,3])); // false
