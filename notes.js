const fs = require("fs");
const chalk = require("chalk")

const addNote = (title, body) => {
    const notes = loadData();

    if(!checkDuplicate(notes, title)) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log("New note added!");
    } else {
        console.log("Duplicate note title!");
    }
}

const removeNote = (title) => {
    const notes = loadData();
    let updatedNotes = [];

    notes.forEach(note => {
        if(note.title !== title) {
            updatedNotes.push(note)
        }
    })

    if(updatedNotes.length !== notes.length) {
        saveNotes(updatedNotes);
        console.log(chalk.green.inverse("Removed note '" + title + "'"))
    } else {
        console.log(chalk.red.inverse("Note does not exist!"))
    }
}

const listNotes = () => {
    const notes = loadData();
    console.log(chalk.yellow("Your notes..."))
    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadData();
    let requestedNote = {};

    notes.forEach(note => {
        if(note.title === title) {
            requestedNote = note;
        }
    })

    if(requestedNote.title) {
        console.log(chalk.green(requestedNote.title))
        console.log(requestedNote.body)
    } else {
        console.log(chalk.red("No note found"));
    }
}

const loadData = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {

    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const checkDuplicate = (notes, title) => {

    let isDuplicate = false;
    notes.forEach(note => {
        if(note.title === title) {
            isDuplicate = true;
        }
    })

    return isDuplicate;
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}