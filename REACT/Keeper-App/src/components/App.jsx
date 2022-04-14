import React, { useState } from "react"

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Note } from "./Note";
import { notes } from "../notes"
import { NewNote } from "./NewNote"
import { v4 as uuidv4 } from "uuid"


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
         return [...prevValue, newNote];
      });
   }

   return (
      <div>
         <Header />
         <NewNote
            onAdd={AddNote} />
         {allNotes.map((note) => {
            return (
               <Note
                  key={uuidv4()}
                  title={note.title}
                  content={note.content} />
            )
         })}
         {notes.map(createNote)}
         <Footer />
      </div>
   );
}