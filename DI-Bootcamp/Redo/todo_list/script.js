const tasks = [];

const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const listTasks = document.getElementById("listTasks");

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
    <button class="delete-btn" title="Delete task">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <input type="checkbox" id="task-${task.task_id}" />
    <label class="task-label" for="task-${task.task_id}">${task.text}</label>
  `;

  item.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.task_id, item));
  item.querySelector("input[type='checkbox']").addEventListener("change", () => doneTask(task.task_id, item));

  listTasks.appendChild(item);
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});
