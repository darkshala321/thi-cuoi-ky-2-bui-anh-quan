import React, { useState, useEffect } from "react";
import { Button, Space } from 'antd';
import { DeleteOutlined, DeleteTwoTone } from '@ant-design/icons';
import Form from "../form/Form";
import TodoItem from "../todoitem/TodoItem";
import FilterTabs from "../filtertabs/FilterTabs";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    if (taskText.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
    }
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const deleteCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  const startEditingTask = (taskId, taskText) => {
    setEditingTask(taskId);
    setEditedTaskText(taskText);
  };

  const saveEditedTask = () => {
    if (editedTaskText.trim() === "") {
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTaskText("");
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !task.completed;
    } else if (filter === "completed") {
      return task.completed;
    }
    return true;
  });

  return (
    <div className="App">
      <h1>Todo List</h1>
      <FilterTabs filter={filter} setFilter={handleFilterChange} />
      <Form addTask={addTask} />
      <ul>
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
            isEditing={editingTask === task.id}
            startEditing={startEditingTask}
            saveEditedTask={saveEditedTask}
            editedTaskText={editedTaskText}
            setEditedTaskText={setEditedTaskText}
          />
        ))}
      </ul>
      <div className="buttons">
        <Button
          type="primary" danger
          onClick={deleteAllTasks}
        >
          <DeleteOutlined />
          Delete All Tasks
        </Button>
        <Button
          type="primary" ghost
          onClick={deleteCompletedTasks}

        >
          <DeleteTwoTone />
          Delete Completed
        </Button>
      </div>
    </div>
  );
}

export default TodoList;