// import fs from 'fs';
const fs = require('fs'); // same thing

// fs.readFile('users.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err);
//     return;
//   }
//   console.log(data);
//   console.log(JSON.parse(data));
// });
// const users = [{name: "Tom"},];
// fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
//   if (err) {
//     console.error("Error writing file:", err);
//     return;
//   }
// });
// fs.appendFile('text.abc', 'def\n', (err) => {
//   if (err) {
//     console.error("Error appending file:", err);
//     return;
//   }
// });
// fs.copyFile('text.abc', 'text2.abc', (err) => {
//   if (err) {
//     console.error("Error copying file:", err);
//     return;
//   } 