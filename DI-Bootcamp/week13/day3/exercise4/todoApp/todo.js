// todo.js

export class TodoList {
  constructor() {
    this.tasks = [];
  }

  // Add a new task
  addTask(taskName) {
    const task = { name: taskName, completed: false };
    this.tasks.push(task);
    console.log(`🆕 Task added: "${taskName}"`);
  }

  // Mark a task as complete
  completeTask(taskName) {
    const task = this.tasks.find(t => t.name.toLowerCase() === taskName.toLowerCase());
    if (task) {
      task.completed = true;
      console.log(`✅ Task completed: "${taskName}"`);
    } else {
      console.log(`❌ Task not found: "${taskName}"`);
    }
  }

  // List all tasks
  listTasks() {
    console.log("\n📋 Todo List:");
    this.tasks.forEach((task, index) => {
      const status = task.completed ? "✅ Done" : "🕓 Pending";
      console.log(`${index + 1}. ${task.name} — ${status}`);
    });
    console.log();
  }
}
