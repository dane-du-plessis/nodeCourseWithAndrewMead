const chalk = require('chalk')
const yargs = require('yargs')
const log = console.log
const noteCRUD = require('./notes')

yargs.version('1.0.0')

// log(process.argv)

// crud for notes

// Add note command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            descrive: 'Note body text',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        log('title: ' +  argv.title)
        log('body: ' +  argv.body)
        noteCRUD.addNote(argv.title, argv.body)
    }    
})

// Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            describe: 'Title of note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        log("removing note with title: " + argv.title)
        noteCRUD.removeNote(argv.title)
    }
})

// List command
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        noteCRUD.listNotes()
    }
})

// Read command
yargs.command({
    command: 'read',
    describe: 'Read notes',
    builder: {
        title: {
            describe: 'Title of note to retrieve and read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        noteCRUD.readNote(argv.title)
    }
})


yargs.parse()
// log(yargs.argv)