import React, { useState, useEffect } from "react"
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Note } from "./Note";
import { notes } from "../notes"
import { NewNote } from "./NewNote"
import { v4 as uuidv4 } from "uuid";
import { dKeeper } from "../../../declarations/dKeeper";


export function createNote(note) {
   return (
      <Note
         key={note.key}
         title={note.title}
         content={note.content} />
   )
};

export function App() {

   const [allNotes, setAllNotes] = useState([]);

   function AddNote(newNote) {
      setAllNotes((prevValue) => {
         dKeeper.createNote(newNote.title, newNote.content, newNote.id);
         return [newNote, ...prevValue];
      });
   }

   useEffect(() => {
      fetchNotes();
   }, []);

   async function fetchNotes() {
      const notesArray = await dKeeper.readNotes();
      setAllNotes(notesArray);
   }

   function deleteNote(id, index) {
      dKeeper.removeNote(index);
      setAllNotes((prevNotes) => {
         return prevNotes.filter((note) => {
            return note.id !== id;
         })
      })
   }

   return (
      <div>
         <Header />
         <NewNote
            onAdd={AddNote} />
         {allNotes.map((note, index) => {
            return (
               <Note
                  key={uuidv4()}
                  title={note.title}
                  content={note.content}
                  onDelete={deleteNote}
                  id={note.id}
                  index={index} />
            )
         })}
         {notes.map(createNote)}
         <Footer />
      </div>
   );
}