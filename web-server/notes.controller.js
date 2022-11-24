const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.yellowBright( 'The note was added'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async  function removeById(id) {
    const notes = await getNotes()
    const newNotes = notes.filter(note => note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(newNotes))
    console.log(chalk.red( `The note by id: ${id} was deleted`))
}

async function updateById(id, title) {
    const notes = await getNotes()

    const newNotes = notes.map(note => note.id === id ? {title, id} : note)

    await fs.writeFile(notesPath, JSON.stringify(newNotes))
    console.log(chalk.yellow( `The note by id: ${id} was updated`))
}

async function printNotes(){
    const notes = await getNotes()
    console.log(chalk.bgGreen('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.yellow( note.id),chalk.blue( note.title))
    })
}

module.exports = {
    addNote, getNotes,removeById,updateById
}