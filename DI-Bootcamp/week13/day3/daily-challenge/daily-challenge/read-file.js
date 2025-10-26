import fs from 'fs';
import path from 'path';

export default function readFileContent() {
  const filePath = path.join('files', 'file-data.txt');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('📄 File content:');
    console.log(data);
  } catch (err) {
    console.error('❌ Error reading file:', err.message);
  }
}
