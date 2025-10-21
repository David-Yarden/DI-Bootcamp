// app.js

import { TodoList } from './todo.js';

// Create an instance of TodoList
const myTodos = new TodoList();

// Add tasks
myTodos.addTask("Finish homework");
myTodos.addTask("Buy groceries");
myTodos.addTask("Walk the dog");

// Complete a task
myTodos.completeTask("Buy groceries");

// List all tasks
myTodos.listTasks();
