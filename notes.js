const fs = require('fs')
const chalk = require('chalk')
const log = console.log

const getNotes = () => {
    return "Your Notes here .... "
}

const addNote = (title, note ) => {
    const notes = loadNotes()
    const existingNotesWithTitle = notes.find(n => n.title === title);
    if (!existingNotesWithTitle) {
        notes.push({
            title: title,
            note: note
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("SUCCESS: "), "Note added")
    } else {
        console.log(chalk.red.inverse("ERROR: "), 'Note already created!')
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        console.error(chalk.red.inverse("ERROR: "), "You've got a problem buddy, no file found")
        return []
    }

}

const saveNotes = (notes) => {
    try{
        fs.writeFileSync('notes.json', JSON.stringify(notes))
        console.log(chalk.green.inverse("SUCCESS: "), "Note saved")
    }catch(e){
        console.log(chalk.red.inverse("ERROR: "), "You're outta luck squirrel. File didn't save")
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    try {
        const newNotes = notes.filter(n => n.title !== title)
        if (notes.find(n => n.title === title) === undefined) {
            throw "Note not found"
        }
        console.log('note to remove: ', title)
        console.log(newNotes);
        saveNotes(newNotes)
        console.log(chalk.green.inverse("Note removed successfully."))
    } catch(e) {
        console.log(chalk.red.inverse("ERROR: "), e)

    }
}

const listNotes = () => {
    const notes = loadNotes();
    log(chalk.magenta('Your notes:'))
    notes.forEach(note => {
        log(chalk.blue(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    try {
        const noteToRead = notes.find(note => note.title === title)
        if(!noteToRead) {
            throw 'Note not found'
        }
        log(chalk.magenta.inverse(title))
        log(noteToRead.note)
    } catch(e) {
        log(chalk.red.inverse(e))
    }
}


module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}