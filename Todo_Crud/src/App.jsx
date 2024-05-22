
import React, { useState } from 'react';
import { TodoProvider } from './context/TodoContext.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <TodoProvider>
      <div className="App">
        <div className="toggle-container">
          <button className="toggle-button" onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;

