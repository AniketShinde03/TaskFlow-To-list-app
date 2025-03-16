const Tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from local storage or initialize an empty array

// Add event listener for the "Add Task" button
document.getElementById("addTaskbtn").addEventListener("click", function () {
  const inputTask = document.getElementById("inputTask").value.trim();

  if (inputTask) {
    addTasktoQueue(inputTask);
    document.getElementById("inputTask").value = ""; // Clear input field
  } else {
    alert("PLEASE ENTER A VALID TASK");
  }
});

// Function to add the task to the array and save to local storage
function addTasktoQueue(task) {
  const taskObj = { task, completed: false };
  Tasks.push(taskObj);
  saveTasksToLocalStorage();
  renderTask(taskObj, Tasks.length - 1); // Render the newly added task
}

// Function to render a single task in the task list
function renderTask(taskObj, index) {
  const taskList = document.getElementById("TaskList");

  // Create the list item (li)
  const listItem = document.createElement("li");
  listItem.className = "task-item"; // Add a class for styling

  // Create and append task text (span)
  const taskText = document.createElement("span");
  taskText.textContent = `${index + 1}. ${taskObj.task}`;
  taskText.className = "task-text"; // Add a class for styling
  listItem.appendChild(taskText);

  // Create button container
  const btnContainer = createButtonContainer(taskObj, index, taskText);
  listItem.appendChild(btnContainer);

  // Mark completed task with a strikethrough if already completed
  if (taskObj.completed) {
    taskText.classList.add("completed");
  }

  // Append the list item to the task list
  taskList.appendChild(listItem);
}

// Function to create the button container with Done and Delete buttons
function createButtonContainer(taskObj, index, taskText) {
  const btnContainer = document.createElement("div");
  btnContainer.className = "btnContainer";

  // Add Done button
  const taskComplete = document.createElement("button");
  taskComplete.textContent = "Done";
  taskComplete.className = "task-done-btn";
  taskComplete.onclick = function () {
    taskObj.completed = !taskObj.completed; // Toggle completion status
    saveTasksToLocalStorage();
    taskText.classList.toggle("completed", taskObj.completed); // Apply strikethrough
  };
  btnContainer.appendChild(taskComplete);

  // Add Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "task-delete-btn";
  deleteButton.onclick = function () {
    Tasks.splice(index, 1); // Remove the task from the array
    saveTasksToLocalStorage();
    updateTaskList(); // Re-render the list after removal
  };
  btnContainer.appendChild(deleteButton);

  return btnContainer;
}

// Function to update the task list (called when tasks are removed or page is first loaded)
function updateTaskList() {
  const taskList = document.getElementById("TaskList");
  taskList.innerHTML = ""; // Clear the existing list

  // Loop through each task object in the Tasks array and render it
  Tasks.forEach((taskObj, index) => {
    renderTask(taskObj, index);
  });
}

// Function to save the tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(Tasks));
}

// Initialize the task list on page load
updateTaskList();
