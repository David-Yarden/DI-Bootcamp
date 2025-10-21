// app.js

// Import the chalk package
import chalk from 'chalk';

// Print colorful text
console.log(chalk.green('✅ Success! Everything is working!'));
console.log(chalk.blue.bold('💙 Hello from Chalk!'));
console.log(chalk.yellow.underline('⚡ This is a highlighted message.'));
console.log(chalk.redBright.inverse('🚫 Warning: Something went wrong!'));

// You can also combine multiple styles
console.log(chalk.bgMagenta.white.bold('✨ Stylish and fun terminal output!'));
