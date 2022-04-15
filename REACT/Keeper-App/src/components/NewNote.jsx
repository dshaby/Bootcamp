import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"

export function NewNote(props) {

    const [newNote, setNewNote] = useState({
        title: "",
        content: "",
        id: ""
    });

    function writingNote(e) {
        // Destructuring e.target
        // "name" (title or content) & value 
        const { name, value } = e.target;

        setNewNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                id: uuidv4()
            }
        })
    }

    function AddItem(e) {
        e.preventDefault();

        props.onAdd(newNote);

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
        </div>
    );
}