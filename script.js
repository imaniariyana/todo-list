const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task-btn");
const emptyImage = document.querySelector(".todos-container img");

const toggleEmptyImage = () => {
  emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
};

const handleAddTask = (evt) => {
  const taskText = taskInput.value.trim();
  evt.preventDefault();
  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = ` <input type="checkbox" class="task-checkbox"> <span>${taskText}</span>`;

  const li = document.createElement("li");
  li.textContent = taskText;
  taskList.appendChild(li);
  taskInput.value = "";
  toggleEmptyImage();
};

addTaskButton.addEventListener("click", handleAddTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleAddTask(e);
  }
});
