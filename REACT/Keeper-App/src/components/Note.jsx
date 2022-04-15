import React from "react";

export function Note(props) {

    function deleteNote() {
        props.onDelete(props.id);
    }

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={deleteNote}>DELETE</button>
        </div>
    );
}