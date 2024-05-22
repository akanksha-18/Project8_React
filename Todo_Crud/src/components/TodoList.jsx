
import React from 'react';
import { useTodo } from '../context/TodoContext.jsx';
import TodoItem from './TodoItem';

function TodoList() {
  const { state } = useTodo();

  return (
    <div>
      {state.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
