import React from "react";

export function Note(props) {

    function deleteNote(setNewNotes) {
        setNewNotes((prevNotes) => {
            return prevNotes.filter((note) => {
                return note.id !== props.id
            })
        }
        )
    }

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => { deleteNote(props.onDelete) }}>DELETE</button>
        </div>
    );
}