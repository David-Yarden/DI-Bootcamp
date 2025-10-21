// challenge.js (ESM)

import greet from './greeting.js';
import { displayMessage } from './colorful-message.js';
import readFileContent from './read-file.js';

// Step 1: Greet the user
console.log(greet('David'));

// Step 2: Display colorful message
displayMessage();

// Step 3: Read and display file content
readFileContent();
