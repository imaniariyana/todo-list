const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const todoForm = document.getElementById("todo-form");
const emptyImage = document.querySelector(".todos-container-img");

const toggleEmptyImage = () => {
  emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
};

const handleAddTask = (evt) => {
  evt.preventDefault();

  const taskText = taskInput.value.trim();

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" class="task-checkbox">
    <span>${taskText}</span>
  `;

  taskList.appendChild(li);

  taskInput.value = "";
  toggleEmptyImage();
};

todoForm.addEventListener("submit", handleAddTask);

toggleEmptyImage();

addTaskButton.addEventListener("click", handleAddTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleAddTask(e);
  }
});
