const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearAllButton = document.getElementById('clearAllButton');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = ''
    tasks.forEach(task => addTaskToDOM(task));
    updateTaskCount();
}
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'O\'chirish';
    deleteButton.addEventListener('click', function() {
        deleteTask(task);
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToLocalStorage(taskText);
        addTaskToDOM(taskText);
        taskInput.value = ''
        updateTaskCount();
    }
});
function addTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function deleteTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(function(t)
     {
        t !== task
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasks(); 
}
clearAllButton.addEventListener('click', function() {
    localStorage.removeItem('tasks');
    taskList.innerHTML = '';
    updateTaskCount();
});
function updateTaskCount() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskCount.textContent = `Sizda ${tasks.length} ta task bor.`;
}
loadTasks();