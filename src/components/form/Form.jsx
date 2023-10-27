import React, { useState } from "react";
import "./Form.css";
import { Input, Button } from "antd";

function Form({ addTask }) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-content">
        <div className="input-field">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div className="add-button">
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default Form;