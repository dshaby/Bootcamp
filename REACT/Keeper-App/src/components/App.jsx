import React from "react"

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Note } from "./Note";
import { notes } from "../notes"
import { NewNote } from "./NewNote"

function createNote(note) {
   return (
      <Note
         key={note.key}
         title={note.title}
         content={note.content} />
   )
};

export function App() {
   return (
      <div>
         <Header />
         <NewNote />
         {notes.map(createNote)}
         <Footer />
      </div>
   );
}