import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Header from "./Components/Header";
import axios from "axios";
import Map from "./Components/Map";

function App() {

  const [todos, setTodos] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:8000/todos").then((response) => {
      setTodos(response.data);
      return response;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

    // delete
    const updateDelete = (id)=> {
      deleteTask(id)
     }
  
    const deleteTask = (id) => {
      axios
        .delete("http://localhost:8000/todos/" + id)
        .then(function (response) {
          fetchData();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    

//complete
const completedHandler = (todo) => {
  setTodos(
    todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    })
  );
};


  return (
    <div className="container">
      <div className="app-wrapper">

         <div>
          <Header />
         </div>

         <div>
          <Form fetchData={fetchData} />
         </div>

         <div>
      <table>
        <tbody>
         
      {todos.map((todos) => {
          return <Map key={todos.id} fetchData={fetchData} setTodos={setTodos} completedHandler={completedHandler} todos={todos} updateDelete={updateDelete}/>
      }
)}
        
        </tbody>
      </table>
         </div>

      </div>
    </div>
  );
}

export default App;
