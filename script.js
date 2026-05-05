const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const todoForm = document.getElementById("todo-form");
const emptyImage = document.querySelector(".todos-container-img");
const todosContainer = document.querySelector(".todos-container");

const toggleEmptyImage = () => {
  emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
};

const handleAddTask = (evt, text = "", checked = false) => {
  evt.preventDefault();

  const taskText = text || taskInput.value.trim();

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" class="task-checkbox" ${checked ? "checked" : ""} />
    <span>${taskText}</span>
    <div class="task-buttons">
      <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
      <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>
  `;

  const checkbox = li.querySelector(".task-checkbox");

  const editBtn = li.querySelector(".edit-btn");

  if (checkbox.checked) {
    li.classList.add("completed");
    editBtn.disabled = true;
    editBtn.style.opacity = "0.5";
    editBtn.style.cursor = "not-allowed";
  }

  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;
    li.classList.toggle("completed", isChecked);
    editBtn.disabled = isChecked;
    editBtn.style.opacity = isChecked ? "0.5" : "1";
    editBtn.style.pointerEvents = isChecked ? "none" : "auto";
  });

  editBtn.addEventListener("click", () => {
    if (!checkbox.checked) {
      taskInput.value = li.querySelector("span").textContent;
      li.remove();
      toggleEmptyImage();
    }
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    toggleEmptyImage();
  });

  taskList.appendChild(li);

  taskInput.value = "";
  toggleEmptyImage();
};

todoForm.addEventListener("submit", handleAddTask);

toggleEmptyImage();

handleAddTask.addEventListener("click", () => handleAddTask());
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleAddTask();
  }
});
