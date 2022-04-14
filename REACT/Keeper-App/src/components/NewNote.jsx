import React, { useState } from "react";
import { Note } from "./Note"
import { v4 as uuidv4 } from "uuid"

export function NewNote(props) {

    const [newNote, setNewNote] = useState({
        key: "",
        title: "",
        content: "",
    });

    function writingNote(e) {
        // Destructuring e.target
        // "name" (title or content) & value (what's written)
        const { name, value } = e.target;

        setNewNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    const [newNotes, setNewNotes] = useState([]);

    function AddItem(e) {
        e.preventDefault();

        props.onAdd(newNote);

        // setNewNotes((preValue) => [...preValue, {
        //     id: uuidv4(),
        //     title: newNote.title,
        //     content: newNote.content
        // }])

        setNewNote({
            title: "",
            content: "",
        })
    }

    return (
        <div>
            <form onSubmit={AddItem} action="">
                <input onChange={writingNote} name="title" value={newNote.title} placeholder="Title" />
                <textarea onChange={writingNote} value={newNote.content} name="content" placeholder="Take a note..." rows="3">
                </textarea>
                <button type="submit">Add</button>
            </form>
            {/* {newNotes.map((note) => {
                return (
                    <Note
                        key={note.id}
                        id={note.id}
                        onDelete={setNewNotes}
                        title={note.title}
                        content={note.content}
                    />
                )
            })} */}
        </div>
    );
}