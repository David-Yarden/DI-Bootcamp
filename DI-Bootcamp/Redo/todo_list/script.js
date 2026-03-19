const tasks = [];

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const listTasks = document.getElementById("listTasks");
const clearBtn = document.getElementById("clear-btn");

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = {
    task_id: tasks.length,
    text: text,
    done: false,
  };
  tasks.push(task);

  const item = document.createElement("div");
  item.classList.add("task-item");
  item.dataset.taskId = task.task_id;

  item.innerHTML = `
    <button class="delete-btn" title="Delete"><i class="fa-solid fa-xmark"></i></button>
    <input type="checkbox" id="task-${task.task_id}" />
    <label class="task-label" for="task-${task.task_id}">${task.text}</label>
  `;

  item.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.task_id, item));
  item.querySelector("input[type='checkbox']").addEventListener("change", () => doneTask(task.task_id, item));

  // Insert before the Clear button
  listTasks.insertBefore(item, clearBtn);

  taskInput.value = "";
  taskInput.focus();
}

function doneTask(task_id, item) {
  const task = tasks.find(t => t.task_id === task_id);
  task.done = !task.done;
  item.classList.toggle("done", task.done);
}

function deleteTask(task_id, item) {
  const index = tasks.findIndex(t => t.task_id === task_id);
  tasks.splice(index, 1);
  item.remove();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

clearBtn.addEventListener("click", () => {
  tasks.length = 0;
  document.querySelectorAll(".task-item").forEach(item => item.remove());
});
