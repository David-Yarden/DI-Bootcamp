// read-directory.js

const fs = require('fs');
const path = require('path');

// Specify the directory to read (current directory)
const directoryPath = __dirname;

try {
  const files = fs.readdirSync(directoryPath);
  console.log(`📂 Files in directory "${directoryPath}":`);
  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
} catch (err) {
  console.error('❌ Error reading directory:', err.message);
}
