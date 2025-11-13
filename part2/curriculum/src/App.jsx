import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Footer from './components/Footer'
import Notification from './components/Notification'


const App = () => {
//1 state for rendering list of notes
  const [notes, setNotes] = useState(null)
//3 accesing input element and asigning its value to the state, but we need now function to enable the acces to edit the input, becouse component app controls placeholder
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  

   useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  if (notes === null) {
    return null
  }

const toggleImportanceOf = id => {
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
     .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
       setNotes(notes.filter(n => n.id !== id))
    })
  }
  
  console.log('render', notes.length, 'notes')
//2 function for adding notes. 5 we creating object that takes random important and id, and we assign our newNote to its content, after we set with state function our new object to concat other notes with conat() methode and we update our input to be empty string after our addNote function being called
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length +1)
    }
   noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }


//4 now we added onChange to input that links to the function handleNoteChange that accesses the value every time its being called and changes it with setNewNote() inside it is the changed value that we changed in input and we assinging it to the value of newNote
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>   
      <Footer />
    </div>
  )
}

export default App 