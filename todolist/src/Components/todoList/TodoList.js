import React, { useState, useEffect } from "react";
import "../todoList/todolist.css";
import Modal from "react-modal";
import AllTodos from "../allTodos/AllTodos";

Modal.setAppElement('#root');
function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedIndex, setSelectedindex] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState("");
  const [indexToDelete, setIndexToDelete] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setDeleteConfirmation(false);
    setIndexToDelete(null);

  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEdit = () => {
    setEditOpen(true);
  };

const handleDeleteConfirmation = (index) =>{
  setIndexToDelete(index);
  setDeleteConfirmation(true);
}

  useEffect(() => {
    const fetchTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(fetchTodos);
  }, []);

  const handleAdd = () => {
    if (newTodo.trim() === "") {
      handleOpen();
      return;
    }
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
    setTodos(updatedTodos); 

    setNewTodo("");
  };

  const handleDelete = () => {
    if (indexToDelete !== null) {
      const newTodos = todos.filter((_, i) => i !== indexToDelete);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
      handleClose();
    }
  };

  const handleEdit = (index) => {
    const originalTodo = todos[index];
    setSelectedTodo(originalTodo)
    setSelectedindex(index)
      handleOpenEdit();
  }

  const handleSave = () =>{
    if(selectedIndex !== null){
      const updatedTodos =  [...todos];
      updatedTodos[selectedIndex] = selectedTodo;
      localStorage.setItem("todos",JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      setSelectedTodo("");
      setSelectedindex(null);
      handleClose();
    }
  }

  return (
    <div className="container">
      <div className="title">
      <h1 style={{ color: "darkblue" }}>To-Do-List</h1>
      <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/todo-list-2058735-1738002.png?f=webp&w=256" alt="" />
      </div>
      
      <div className="add-new-todo">
        <input
          className="new-todo"
          type="text"
          placeholder="Add your task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAdd} className="add-button">
          Add
        </button>
        {/* Modal for empty addition of todo */}
        <Modal
          isOpen={open}
          onRequestClose={handleClose}
          contentLabel="Invalid Todo"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div>
            <p>Please enter a valid Todo</p>
            <button onClick={handleClose} className="modal-close-button">
              Close
            </button>
          </div>
        </Modal>
        {/* Modal for Editing the todo */}
        <Modal
          isOpen={openEdit}
          onRequestClose={handleClose}
          contentLabel="Edit Todo"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="edit-modal-div">
            <p>
              <input
                type="text"
                onChange={(e) => setSelectedTodo(e.target.value)}
                value={selectedTodo}
              />
            </p>
            <div> {/* Added div */}
              <button onClick={handleSave} className="modal-edit-button">
                Edit
              </button>
              &nbsp;&nbsp;
              <button onClick={handleClose} className="modal-close-button">
                Close
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={deleteConfirmation}
          onRequestClose={handleClose}
          contentLabel="Delete Confirmation"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div>
            <p>Are you sure you want to delete this todo?</p>
            <button  onClick={() => handleDelete()} className="modal-delete-button">
              Yes
            </button>&nbsp;&nbsp;
            <button className="modal-close-button" onClick={handleClose}>No</button>
          </div>
        </Modal>
      </div>

      <hr className="divider" />
      <AllTodos
        todos={todos}
        handleEdit={handleEdit}
        handleDeleteConfirmation ={handleDeleteConfirmation}
      />
    </div>
  );
}
export default TodoList;
