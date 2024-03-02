import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Form = ({ fetchData }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputOwner, setInputOwner] = useState("");
  const [inputLocation, setInputLocation] = useState("");

  const titleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const ownerChange = (e) => {
    setInputOwner(e.target.value);
  };

  const locationChange = (e) => {
    setInputLocation(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    addNewTask();
    setInputTitle("");
    setInputOwner("");
    setInputLocation("");
  };

  const addNewTask = () => {
    axios
      .post("http://localhost:8000/todos", {
        id: uuidv4(),
        title: inputTitle,
        owner: inputOwner,
        location: inputLocation,
        completed: false,
        edited: false
      })
      .then(function (response) {
        fetchData();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="add a new task..."
        className="task-input"
        value={inputTitle}
        required
        onChange={titleChange}
      />
      <input
        type="text"
        placeholder="add an owner..."
        className="task-input"
        value={inputOwner}
        required
        onChange={ownerChange}
      />

      <input
        type="text"
        placeholder="add a location..."
        className="task-input"
        value={inputLocation}
        required
        onChange={locationChange}
      />

      <button type="submit" className="button-add">
        add
      </button>
    </form>
  );
};

export default Form;