import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import "../allTodos/alltodos.css";

function AllTodos({ todos, handleEdit , handleDeleteConfirmation}) {
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleClick = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((i) => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  return (
    <div className="tasks">
      <h2>Tasks</h2>
      {todos.length === 0 ? (
        <p style={{"font-weight": "bold"}}>No todos added</p>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className="to-do-list">
            <button
              onClick={() => handleClick(index)}
              className={
                completedTasks.includes(index)
                  ? "button orangered"
                  : "button white"
              }
            >
              {completedTasks.includes(index) && (
                <span className="checkmark">✔</span>
              )}
            </button>
            &nbsp;&nbsp;
            <div
              className={`todo-item ${
                completedTasks.includes(index) ? "strikethrough" : ""
              }`}
            >
              {todo}
            </div>
            <div className="icons">
            <div
                className={`todo-edit ${
                  completedTasks.includes(index) ? "disabled" : ""
                }`}
                onClick={() =>
                  !completedTasks.includes(index) && handleEdit(index)
                }
                disabled={completedTasks.includes(index)}
              >
                <RiEdit2Fill />
              </div>
              <div
                className="todo-delete"
                onClick={() => handleDeleteConfirmation(index)}
              >
                <ImCross />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllTodos;