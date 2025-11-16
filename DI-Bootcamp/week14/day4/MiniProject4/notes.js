import fs from 'fs';
import _ from 'lodash';

export const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

export const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

export const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = _.find(notes, { title });

    if (!duplicateNote) {
        notes.push({ title, body });
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note already exists');
    }
};

export const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log('Note removed!');
    } else {
        console.log('Note not found');
    }
};

export const listNotes = () => {
    const notes = loadNotes();
    console.log('Your notes:');
    notes.forEach(note => console.log(`- ${note.title}`));
};

export const readNote = (title) => {
    const notes = loadNotes();
    const note = _.find(notes, { title });

    if (note) {
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    } else {
        console.log('Note not found');
    }
};
