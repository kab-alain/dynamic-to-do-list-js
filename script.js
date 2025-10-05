document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Function to render a task in the DOM
    function renderTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = () => {
            taskList.removeChild(li);
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Function to add a task
    function addTask(taskText = null) {
        const text = taskText || taskInput.value.trim();

        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        renderTask(text);

        if (!taskText) { // Only save if this is a new input
            tasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = "";
        }
    }

    // Load tasks from LocalStorage
    function loadTasks() {
        tasks.forEach(task => addTask(task));
    }

    // Button click event
    addButton.addEventListener('click', () => addTask());

    // Enter key event
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when page loads
    loadTasks();
});
