document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasks();
            taskInput.value = "";
        }
    });

    // Function to add new task
    function addTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="completeBtn">Complete</button>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li span").forEach(function(task) {
            tasks.push(task.innerText);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(function(taskText) {
                addTask(taskText);
            });
        }
    }

    // Event delegation for complete, edit, and delete buttons
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("completeBtn")) {
            const task = event.target.closest("li").querySelector("span");
            task.classList.toggle("completed");
            saveTasks();
        } else if (event.target.classList.contains("editBtn")) {
            const task = event.target.closest("li").querySelector("span");
            const newText = prompt("Edit task:", task.innerText);
            if (newText !== null && newText.trim() !== "") {
                task.innerText = newText.trim();
                saveTasks();
            }
        } else if (event.target.classList.contains("deleteBtn")) {
            event.target.closest("li").remove();
            saveTasks();
        }
    });
});
