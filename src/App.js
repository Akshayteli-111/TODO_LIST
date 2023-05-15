import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import './App.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("todoTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() === "") {
      return;
    }
    const task = {
      id: uuidv4(),
      name: newTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  return (
    <div className="todo_app">
      <h1 className="Heading">Todo List</h1>
      <form className="frm" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul className="ulist">
        {tasks.map((task) => (
          <li key={task.id} className="lists">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span className={task.completed ? "completed" : ""}>
              {task.name}
            </span>
            <button onClick={() => handleDeleteTask(task.id)} className="btn">Delete</button>
          </li>
        ))}
      </ul>
      <h4 className="task_heading">
        {tasks.filter((task) => !task.completed).length} tasks remaining out of{" "}
        {tasks.length}
      </h4>
    </div>
  );
};

export default TodoList;
