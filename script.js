const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task-btn");

const handleAddTask = (evt) => {
  const taskText = taskInput.value.trim();
  evt.preventDefault();
  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;
  taskList.appendChild(li);
  taskInput.value = "";
};

addTaskButton.addEventListener("click", handleAddTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleAddTask(e);
  }
});
