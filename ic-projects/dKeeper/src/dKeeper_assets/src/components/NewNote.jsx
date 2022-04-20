import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import { Zoom } from '@mui/material';

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
            };
        });
    };

    function AddItem(e) {
        e.preventDefault();

        props.onAdd(newNote);

        setNewNote({
            title: "",
            content: "",
            id: ""
        });

        setExpand(false)
    }

    const [isExpanded, setExpand] = useState(false);

    return (
        <div>
            <form className="create-note" onSubmit={AddItem}>
                {isExpanded && (
                    <input onChange={writingNote}
                        name="title"
                        value={newNote.title}
                        placeholder="Title" />
                )}
                <textarea
                    onClick={() => setExpand(true)}
                    onChange={writingNote}
                    value={newNote.content}
                    name="content"
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}>
                </textarea>
                <Zoom in={isExpanded}>
                    <Fab type="submit"><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    );
}