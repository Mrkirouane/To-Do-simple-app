

let todos = [];

// Save to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render a single todo
function renderTodo(todo) {
  const li = document.createElement("li");
  if (todo.completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = todo.text;

  span.addEventListener("click", function () {
    todo.completed = !todo.completed;
    li.classList.toggle("completed");
    saveTodos();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    todos = todos.filter(t => t !== todo);
    li.remove();
    saveTodos();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById("todo-list").appendChild(li);
}

// Add new todo
function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (text === "") return;

  const todo = { text, completed: false };
  todos.push(todo);
  renderTodo(todo);
  saveTodos();
  input.value = "";
}

// Load todos on startup
window.onload = function () {
  const stored = localStorage.getItem("todos");
  if (stored) {
    todos = JSON.parse(stored);
    todos.forEach(renderTodo);
  }

  document.getElementById("add-btn").addEventListener("click", addTodo);
};