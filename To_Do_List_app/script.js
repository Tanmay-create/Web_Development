// Get references to HTML elements
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

/**
 * Function to add a new task to the list
 */
function addTodo() {
    const taskText = todoInput.value.trim(); // Get and trim user input
    
    // Validation: Only add if there's text in the input
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new list item element to represent the task
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"; // Add CSS class for styling
    
    // Checkbox to mark task as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.onclick = () => toggleTask(taskItem);

    // Task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Delete button to remove the task
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => deleteTask(taskItem);

    // Append checkbox, task text, and delete button to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteBtn);
    
    // Append the new task to the list
    todoList.appendChild(taskItem);

    // Clear the input field for new entries
    todoInput.value = "";
}

/**
 * Function to toggle task completion status
 * @param {HTMLElement} taskItem - The task item element
 */
function toggleTask(taskItem) {
    // Toggle the 'completed' CSS class for the task
    taskItem.classList.toggle("Completed");
}

/**
 * Function to delete a task from the list
 * @param {HTMLElement} taskItem - The task item element
 */
function deleteTask(taskItem) {
    // Remove the task item from the list
    taskItem.remove();
}


toggle("Completed");                            

