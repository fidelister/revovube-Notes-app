import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { useState } from "react";
import moment from "moment";

function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };
  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now(), timestamp: Date.now() }]);
  };
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  const editNote = (id, title, description) => {
    setEditing(id);
    const updatedNote = { title: title, description: description };
    setNewNote(updatedNote);
    // const notesUpdated = notes.map((note) => {
    //   return id === note.id ? updatedNote : note;
    // });
    // addNote(updatedNote);
    setEditing(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title.trim() === "" || newNote.description.trim() === "") {
      alert("Pls enter a title and a description");
      return;
    }
    addNote(newNote);
    setNewNote({ title: "", description: "" });
  };
  return (
    <React.Fragment>
      <header>
        <h2>Notes app</h2>
      </header>
      <section className="container d-flex flex-column align-items-center">
        <h5>Add a note here</h5>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <input
              type="text"
              name="title"
              class="form-control"
              value={newNote.title || ""}
              onChange={handleInputChange}
              placeholder="Enter note title"
            />{" "}
          </div>
          <div class="form-group">
            <textarea
              name="description"
              class="form-control my-3"
              value={newNote.description || ""}
              onChange={handleInputChange}
              placeholder="Enter note description"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            {editing ? "Edit" : "Submit"}
          </button>
        </form>
      </section>
      <section className="container">
        <h5>See all notes here</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Note number</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.length === 0 ? (
              <tr>
                <p className="">
                  No notes yet! create a new note to get started
                </p>
              </tr>
            ) : (
              notes.map((note, id) => {
                return (
                  <tr key={note.id} className="my-3">
                    <td>{note.id}</td>
                    <td>{note.title}</td>
                    <td>{note.description}</td>
                    <td>
                      {moment(note.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        editNote(note.id, note.title, note.description)
                      }
                    >
                      edit
                    </button>
                    <button
                      className="ms-2 btn btn-danger"
                      onClick={() => deleteNote(note.id)}
                    >
                      delete
                    </button>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
}

export default App;
