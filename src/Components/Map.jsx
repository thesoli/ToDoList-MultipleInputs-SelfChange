import axios from "axios";
import { useEffect, useState } from "react";

const Map = ({key,todos,setTodos, completedHandler,updateDelete, editId, fetchData}) => {

const [title, setTitle] = useState("");
const [owner, setOwner] = useState("");
const [location, setLocation] = useState("");
const [editTodo, setEditTodo] = useState(null);
const [editingTodo, setEditingTodo] = useState(false);


// edit
const editHandler = () => {
  setEditTodo(todos);
};

const editTask = (id) => {
  axios
    .put("http://localhost:8000/todos/" + id, {
      id: id,
      title: title,
      owner: owner,
      location: location,
      completed: false,
      edited:false
    })
    .then(function (response) {
      fetchData();
    })
    .catch(function (error) {
      console.log(error);
    });
};

useEffect(() => {
  if (editingTodo) {
    setTitle(editTodo.title);
    setOwner(editTodo.owner);
    setLocation(editTodo.location);
  }
}, [setTitle, setOwner, setLocation, editingTodo, editTodo]);

  return (
    <tr className="list-item" >
        <td
                className={`list ${todos.completed ? "complete" : ""}`}
                onChange={(e) => e.preventDefault()}
               >
                {editingTodo ? (
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                ) : (
                  todos.title
                )}{" "}
        </td>

        <td
                className={`list ${todos.completed ? "complete" : ""}`}
                onChange={(e) => e.preventDefault()}
              >
                {editingTodo ? (
                  <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
                ) : (
                  todos.owner
                )}{" "}
        </td>

        <td
                className={`list ${todos.completed ? "complete" : ""}`}
                onChange={(e) => e.preventDefault()}
              >
                {editingTodo ? (
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                ) : (
                  todos.location
                )}
        </td>

        <button
                className="button-complete task-button"
                onClick={() => completedHandler(todos)}
              >
                
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                  </svg>
        </button>


{
  !editingTodo? (
    <button className="button-edit task-button" onClick={(e)=>{ setEditingTodo(true); editHandler()}}>
       <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil"
          viewBox="0 0 16 16">    
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
       </svg>
    </button>
                 )
              :  (
     <button className="button-edit task-button" onClick={(e)=>{setEditingTodo(false); editTask(editTodo.id)}}>
         <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-floppy"
              viewBox="0 0 16 16">
              <path d="M11 2H9v3h2z" />
              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
          </svg>
     </button>    
              )
}

     <button className="button-delete task-button" onClick={() => updateDelete(todos.id)}>
         <svg
             xmlns="http://www.w3.org/2000/svg"
             width="16"
             height="16"
             fill="currentColor"
             className="bi bi-x-circle"
             viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
             <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
         </svg>         
     </button>
    
    </tr>
  )
}

export default Map