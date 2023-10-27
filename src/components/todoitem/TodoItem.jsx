import React, { useState } from "react";
import { Button, Space } from 'antd';
import { EditFilled, DeleteOutlined } from '@ant-design/icons';

function TodoItem({
  task,
  completeTask,
  deleteTask,
  isEditing,
  startEditing,
  saveEditedTask,
  editedTaskText,
  setEditedTaskText,
}) {
  const [isEditingLocal, setIsEditingLocal] = useState(isEditing);

  const handleEditClick = () => {
    startEditing(task.id, task.text);
    setIsEditingLocal(true);
  };

  const handleSaveClick = () => {
    saveEditedTask();
    setIsEditingLocal(false);
  };

  return (
    <li>
      {isEditingLocal ? (
        <>
          <input
            type="text"
            value={editedTaskText}
            onChange={(e) => setEditedTaskText(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => completeTask(task.id)}
          />
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.text}
          </span>
          <div className="item-button">
          <Button onClick={handleEditClick}> <EditFilled />Edit</Button>
          <Button onClick={() => deleteTask(task.id)}> <DeleteOutlined />Delete</Button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
