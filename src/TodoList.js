import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleEditMode = (index, todo) => {
    setEditMode(!editMode);
    setEditIndex(index);
    setUpdatedTodo(todo);
  };

  const updateTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = updatedTodo;
    setTodos(updatedTodos);
    setEditMode(false);
    setEditIndex(null);
    setUpdatedTodo('');
  };

  return (
    <div className="container">
      <h2>Todo List:</h2>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {editMode && editIndex === index ? (
              <>
                <input
                  type="text"
                  value={updatedTodo}
                  onChange={(e) => setUpdatedTodo(e.target.value)}
                />
                <button onClick={updateTodo}>Save</button>
              </>
            ) : (
              <>
                {todo}
                <button onClick={() => toggleEditMode(index, todo)}>Edit</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
