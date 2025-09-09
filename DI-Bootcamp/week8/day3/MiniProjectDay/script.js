// 1️ Create empty array
const tasks = []; // For bonus I, you can make it an array of objects instead

// 2️ Get references to DOM elements
const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('#addTaskButton');
const listTasksDiv = document.querySelector('.listTasks');

// 3️ Add event listener to the button
addTaskButton.addEventListener('click', addTask);

// 4️ Function to add a task
function addTask(event) {
    event.preventDefault(); // prevent form submission if inside a form

    const taskText = taskInput.value.trim(); // get input value

    if (taskText === '') return; // ignore empty input

    const task = {
        task_id: tasks.length, // start from 0
        text: taskText,
        done: false
    };

    tasks.push(task); // add to array

    // 5️ Add to DOM
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskItem');
    taskDiv.setAttribute('data-task-id', task.task_id);

    taskDiv.innerHTML = `
        <button class="deleteBtn"><i class="fa fa-times"></i></button>
        <input type="checkbox" class="doneCheckbox">
        <label>${taskText}</label>
    `;

    listTasksDiv.appendChild(taskDiv);

    // Clear input
    taskInput.value = '';

    // Add event listeners to new elements
    const checkbox = taskDiv.querySelector('.doneCheckbox');
    const deleteBtn = taskDiv.querySelector('.deleteBtn');

    checkbox.addEventListener('change', () => doneTask(task.task_id, checkbox, taskDiv));
    deleteBtn.addEventListener('click', () => deleteTask(task.task_id, taskDiv));
}

// 6️ Function to mark task as done
function doneTask(id, checkbox, taskDiv) {
    const task = tasks.find(t => t.task_id === id);
    if (!task) return;

    task.done = checkbox.checked; // update array

    const label = taskDiv.querySelector('label');
    if (task.done) {
        label.style.textDecoration = 'line-through';
        label.style.color = 'red';
    } else {
        label.style.textDecoration = 'none';
        label.style.color = 'black';
    }
}

const clearBtn = document.querySelector('#clearBtn');

clearBtn.addEventListener('click', () => {
    tasks.length = 0;            // clear the array
    listTasksDiv.querySelectorAll('.taskItem').forEach(task => task.remove()); // remove tasks from DOM
});
