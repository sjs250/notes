const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
    console.log(chalk.green.inverse("Your notes"));
    const notes = loadNotes();
    const noteTitles = notes.map((note) => {
        console.log(note.title);
        return note.title;
    });
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })   
        savedNotes(notes);
        console.log("new note added");
    } else {
        console.log("note title taken");
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => {
        return note.title !== title;
    })
     
    if(newNotes.length === notes.length) {
        console.log(chalk.red.inverse("No such note title"));
    } else {
        console.log(chalk.green.inverse("Note removed"));
        savedNotes(newNotes);
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);
    if(!noteToRead) {
        console.log(chalk.inverse.red("No note with this title"));
    } else {
        console.log(chalk.inverse.blue(noteToRead.title));
        console.log(noteToRead.body);
    }
}

const savedNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}