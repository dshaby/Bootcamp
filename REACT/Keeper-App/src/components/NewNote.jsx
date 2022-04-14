import React from "react"

export function NewNote() {
    return (

        <form action="">
            <input name="title" placeholder="Title" />
            <textarea name="content" placeholder="Take a note..." rows="3">
            </textarea>
            <button>Add</button>
        </form>

    );
}