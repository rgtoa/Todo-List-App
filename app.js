document.addEventListener("DOMContentLoaded"), () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        storedTasks.forEach(task => {
            tasks.push(task);
        });
    }
}

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();  

    if (text) {
        tasks.push({text: text, completed: false});
    }
    updateTaskList();
    updateStats();
    saveTasks();
}

const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;  
    updateTaskList();
    updateStats
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);  // Remove the task being edited
    updateTaskList();
    updateStats
}   

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks / totalTasks )* 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completeTasks} / ${totalTasks}`;
}

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox ${task.completed ? "checked" : ""}"/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" width="25px" onClick="editTask(${index})"/>
                    <img src="./img/delete.png" width="25px" onClick="deleteTask(${index})"/>
                </div>
            </div>`;

        listItem.addEventListener('change', () => toggleTaskCompletion(index));   
        taskList.append(listItem);
    })
}

document.getElementById("newTask").addEventListener("click", function(event) {
    event.preventDefault();
    addTask();
});