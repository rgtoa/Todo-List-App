let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();  

    if (text) {
        tasks.push({text: text, completed: false});
    }
    updateTaskList();
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
                    <img src="./img/edit.png" width="50px" onClick="editTask(${index})"/>
                    <img src="./img/delete.png" width="50px" onClick="editTask(${index})"/>
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