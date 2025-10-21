// app.js

// Import the array of person objects
import people from './data.js';

// Function to calculate average age
function calculateAverageAge(persons) {
  if (persons.length === 0) return 0;
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  return totalAge / persons.length;
}

// Calculate and display the result
const averageAge = calculateAverageAge(people);
console.log(`👥 The average age is: ${averageAge.toFixed(1)} years.`);
