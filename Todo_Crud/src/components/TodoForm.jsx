
// import React, { useState } from 'react';
// import { useTodo } from '../context/TodoContext.jsx';

// function TodoForm() {
//   const [todo, setTodo] = useState('');
//   const { addTodo } = useTodo();

//   const add = (e) => {
//     e.preventDefault();
//     if (!todo) return;
//     addTodo({ todo, completed: false });
//     setTodo('');
//   };

//   return (
//     <form onSubmit={add} className="flex">
//       <input
//         type="text"
//         placeholder="Write Todo..."
//         className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
//         value={todo}
//         onChange={(e) => setTodo(e.target.value)}
//       />
//       <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
//         Add
//       </button>
//     </form>
//   );
// }

// export default TodoForm;
// TodoForm.jsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import Email.js
import { useTodo } from '../context/TodoContext';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const [email, setEmail] = useState('');
  const [reminderDateTime, setReminderDateTime] = useState('');
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    
    // Add todo to the list
    addTodo({ todo, completed: false });

    // If reminder is set, schedule the email reminder
    if (reminderDateTime && email) {
      scheduleReminder(todo, email, reminderDateTime);
    }

    // Clear form fields
    setTodo('');
    setEmail('');
    setReminderDateTime('');
  };

  // Function to send reminder email using Email.js
  const sendReminderEmail = (todo, email) => {
    const templateParams = {
      todo: todo,
    };

    emailjs.send(
      'service_am7u38g',
      'template_d7lr12j',
      templateParams,
      '6pKOC13UqIQYBm34p_N_4'
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
  };

  // Function to schedule the reminder email
  const scheduleReminder = (todo, email, reminderDateTime) => {
    const reminderTime = new Date(reminderDateTime).getTime();
    const currentTime = new Date().getTime();
    const timeUntilReminder = reminderTime - currentTime;

    if (timeUntilReminder > 0) {
      setTimeout(() => {
        sendReminderEmail(todo, email);
      }, timeUntilReminder);
    }
  };

  return (
    <form onSubmit={add} className="flex flex-col mb-4">
      <input
        type="text"
        placeholder="Write Todo..."
        className="mb-2 px-3 py-2 border rounded-lg outline-none"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter Email Address..."
        className="mb-2 px-3 py-2 border rounded-lg outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="datetime-local"
        className="mb-2 px-3 py-2 border rounded-lg outline-none"
        value={reminderDateTime}
        onChange={(e) => setReminderDateTime(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;


