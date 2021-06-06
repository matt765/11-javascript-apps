document.getElementById('addTask').addEventListener('click', newTask)

const removeIcons = document.querySelectorAll('[bin]');
removeIcons.forEach(e => e.addEventListener("click", () => removeTask(e)));

const tasks = document.querySelectorAll('div.singleTask');
tasks.forEach(e => e.addEventListener("click", () => crossOut(e)));

function newTask() {
    const taskText = document.getElementById('taskInput').value;
    let parentTask = document.querySelector(".singleTask");
    let childTask = parentTask.cloneNode(true);
    document.getElementById('taskList').appendChild(childTask);
    childTask.querySelector("p").innerHTML = taskText;
    childTask.classList.remove('crossedOut');
    childTask.classList.remove('invisible');
    childTask.style.opacity = '1';
    addTaskEventListeners(childTask)
}

function removeTask(e) {
    e.parentNode.parentNode.style.opacity = '0';
    setTimeout(() => {
        e.parentNode.parentNode.classList.add('invisible');
       
    }, 350);
 
}

function crossOut(e) {
    e.classList.toggle('crossedOut')
}
function addTaskEventListeners(task) {
    task.addEventListener("click", () => crossOut(task));
    const removeIcon = task.querySelector('[bin]');
    removeIcon.addEventListener("click", () => removeTask(removeIcon));
}