const taskInput = document.querySelector("#task-input");
let addbtn = document.querySelector("#add-btn");
const taskListContainer = document.querySelector("#task-list");
let tasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
renderTasks(tasks);

// Event Delegation
taskListContainer.addEventListener("click", (e) => {
  // 1. Check if the user clicked the Delete button
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.dataset.id); // Grab the ID from the button's dataset
    deleteTask(id);
  }

  // 2. Check if the user clicked the Edit button
  if (e.target.classList.contains("edit-btn")) {
    const id = Number(e.target.dataset.id); // Grab the ID
    editTask(id);
  }
});

addbtn.addEventListener("click", (e) => {
  if (taskInput.value.trim() === "") return;
  console.log(taskInput.value);
  const newTask = {
    id: Date.now(),
    text: taskInput.value,
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks(tasks);
  taskInput.value = "";
});
function renderTasks(t) {
  taskListContainer.innerHTML = "";
  t.forEach((element) => {
    let tasklist = document.createElement("li");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    tasklist.textContent = element.text;

    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn"); // Give it a class
    editBtn.dataset.id = element.id;

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn"); // Give it a class to check later
    deleteBtn.dataset.id = element.id;

    // deleteBtn.addEventListener("click", () => {
    //   deleteTask(element.id);
    // });
    // editBtn.addEventListener("click", () => {
    //   editTask(element.id);
    // });
    tasklist.appendChild(editBtn);
    tasklist.appendChild(deleteBtn);
    taskListContainer.appendChild(tasklist);
  });
}
function editTask(ttt) {
  let temp = tasks.find((task) => task.id === ttt);
  taskInput.value = temp.text;
  deleteTask(temp.id);
  saveTasks();
  taskInput.focus();
}
function deleteTask(tt) {
  tasks = tasks.filter((task) => task.id != tt);
  saveTasks();
  renderTasks(tasks);
}
function saveTasks() {
  localStorage.setItem("savedTasks", JSON.stringify(tasks));
}
