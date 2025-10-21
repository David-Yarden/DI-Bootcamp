// copy-file.js

const fs = require('fs');

// Read content from source.txt
try {
  const content = fs.readFileSync('source.txt', 'utf8');
  console.log('✅ source.txt read successfully!');
  
  // Write content to destination.txt
  fs.writeFileSync('destination.txt', content, 'utf8');
  console.log('✅ Content copied to destination.txt successfully!');
} catch (err) {
  console.error('❌ Error:', err.message);
}
