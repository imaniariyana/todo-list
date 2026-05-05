const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const todoForm = document.getElementById("todo-form");
const emptyImage = document.querySelector(".todos-container-img");
const todosContainer = document.querySelector(".todos-container");
const progressBar = document.getElementById("progress");
const progressNumber = document.getElementById("numbers");

const Confetti = () => {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

const toggleEmptyImage = () => {
  emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
};

const updateProgress = (checkCompletion = true) => {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(
    ".task-checkbox:checked",
  ).length;

  progressBar.style.width =
    totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : "0%";

  progressNumber.textContent = `${completedTasks} / ${totalTasks}`;

  if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
    Confetti();
  }
};

const saveTaskToLocalStorage = () => {
  const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => ({
    text: li.querySelector("span").textContent,
    completed: li.querySelector(".task-checkbox").checked,
  }));

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(({ text, completed }) =>
    handleAddTask(null, text, completed),
  );

  toggleEmptyImage();
  updateProgress(false);
};

const handleAddTask = (evt, text = "", checked = false) => {
  if (evt) {
    evt.preventDefault();
  }

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
      <button type="button" class="edit-btn">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  const checkbox = li.querySelector(".task-checkbox");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");

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
    editBtn.style.cursor = isChecked ? "not-allowed" : "pointer";

    updateProgress();
    saveTaskToLocalStorage();
  });

  editBtn.addEventListener("click", () => {
    if (!checkbox.checked) {
      taskInput.value = li.querySelector("span").textContent;
      li.remove();
      toggleEmptyImage();
      updateProgress(false);
      saveTaskToLocalStorage();
    }
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    toggleEmptyImage();
    updateProgress();
    saveTaskToLocalStorage();
  });

  taskList.appendChild(li);

  taskInput.value = "";
  toggleEmptyImage();
  updateProgress(false);
  saveTaskToLocalStorage();
};

todoForm.addEventListener("submit", handleAddTask);

toggleEmptyImage();
updateProgress(false);

loadTasksFromLocalStorage();
