const yargs = require("yargs")
const noteUtil = require("./notes")

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        noteUtil.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Title of the note to be removed",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        noteUtil.removeNote(argv.title)
    }
})

yargs.command({
    command: "list",
    describe: "Lists all notes",
    handler() {
        noteUtil.listNotes()
    }
})

yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Read out a specific note",
            demandOption: true,
            type: "string"
        }
    }
    ,
    handler(argv) {
        noteUtil.readNote(argv.title);
    }
})

yargs.parse();