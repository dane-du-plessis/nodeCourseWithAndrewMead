const fs = require('fs')
const chalk = require('chalk')


const getNotes = function() {
    return "your Notes here .... "
}

const addNote = function(title, note ) {
    const notes = loadNotes()

    const noteTitleTaken = notes.filter(n => n.title === title);

    if (noteTitleTaken.length === 0) {

        notes.push({
            title: title,
            note: note
        })
        saveNotes(notes)
        console.log('Note added successfully!')
    } else {
        console.log('Note already created!')
    }
}

const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        console.error("You've got a problem buddy, no file found")
        return []
    }

}

const saveNotes = function(notes) {
    try{
        fs.writeFileSync('notes.json', JSON.stringify(notes))
    }catch(e){
        console.log("You're outta luck squirrel. File didn't save")
    }
}

const removeNote = function(title) {
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

module.exports = {
    getNotes,
    addNote,
    removeNote,
}