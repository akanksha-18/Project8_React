
import React, { createContext, useReducer, useContext } from 'react';

const TodoContext = createContext();

const initialState = {
  todos: [
    {
      id: 1,
      todo: 'Initial Todo',
      completed: false,
    },
  ],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, { id: Date.now(), ...action.payload }] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload.id) };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (todo) => dispatch({ type: 'ADD_TODO', payload: todo });
  const updateTodo = (id, todo) => dispatch({ type: 'UPDATE_TODO', payload: { id, ...todo } });
  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: { id } });
  const toggleComplete = (id) => dispatch({ type: 'TOGGLE_COMPLETE', payload: { id } });

  return (
    <TodoContext.Provider value={{ state, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
