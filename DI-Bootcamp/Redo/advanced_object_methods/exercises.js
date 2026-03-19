// ── Exercise 1: Location ──────────────────────────────────────
// Output:
// "I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)"

const person = {
  name: 'John Doe',
  age: 25,
  location: {
    country: 'Canada',
    city: 'Vancouver',
    coordinates: [49.2827, -123.1207]
  }
};

const { name, location: { country, city, coordinates: [lat, lng] } } = person;
console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);


// ── Exercise 2: Display Student Info ─────────────────────────
function displayStudentInfo({ first, last }) {
  return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({ first: 'Elie', last: 'Schoppik' }));
// Output: "Your full name is Elie Schoppik"


// ── Exercise 3: User & id ─────────────────────────────────────
const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1 – turn object into array of [key, value] pairs
const usersArray = Object.entries(users);
console.log(usersArray);
// [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ]

// Part 2 – multiply each ID by 2
const usersDoubled = usersArray.map(([user, id]) => [user, id * 2]);
console.log(usersDoubled);
// [ [ 'user1', 36546 ], [ 'user2', 185666 ], [ 'user3', 180630 ] ]


// ── Exercise 4: Person class ──────────────────────────────────
// Output: "object"
// typeof returns "object" for any class instance.

class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member); // "object"


// ── Exercise 5: Dog class ─────────────────────────────────────
// Answer: Option 2 is correct.
//
// Option 1 – WRONG: calls this.size before super(), which throws a ReferenceError.
// Option 2 – CORRECT: calls super(name) first, then sets this.size.
// Option 3 – WRONG: constructor only takes (size), so name is undefined when passed to super.
// Option 4 – WRONG: sets this.name without calling super(), which throws a ReferenceError.

class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Labrador extends Dog {
  constructor(name, size) {
    super(name);       // must call super() before using 'this'
    this.size = size;
  }
}

const myDog = new Labrador('Buddy', 'Large');
console.log(myDog); // Labrador { name: 'Buddy', size: 'Large' }


// ── Exercise 6: Challenges ────────────────────────────────────

// Part 1 – Evaluate
console.log([2] === [2]); // false – arrays are objects, compared by reference not value
console.log({} === {});   // false – two separate objects in memory, different references

// Part 2 – Object references
const object1 = { number: 5 };
const object2 = object1;   // object2 points to the SAME object as object1
const object3 = object2;   // object3 also points to the SAME object
const object4 = { number: 5 }; // new independent object

object1.number = 4;        // mutates the shared object

console.log(object2.number); // 4 – same reference as object1
console.log(object3.number); // 4 – same reference as object1
console.log(object4.number); // 5 – independent object, unaffected

// Part 3 – Animal / Mammal / farmerCow
class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  constructor(name, type, color) {
    super(name, type, color);
  }

  sound(soundStr) {
    return `${soundStr} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo'));
// "Moooo I'm a cow, named Lily and I'm brown and white"
