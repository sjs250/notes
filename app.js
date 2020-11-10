const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//customize yargs version

yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }, 
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);
    }
})

yargs.command({ 
    command: 'listNotes',
    describe: 'List your notes',
    handler: function () {
        notes.listNotes();
    }
})

yargs.command({ 
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title);
    }
})


yargs.parse();