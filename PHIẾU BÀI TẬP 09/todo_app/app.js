// todo_app/script.js
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const count = document.getElementById("count");

const filterButtons = document.querySelectorAll(".filter");

const clearCompleted = document.getElementById("clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

function saveTodos(){

  localStorage.setItem("todos", JSON.stringify(todos));

}

function updateCount(){

  const activeTodos = todos.filter(todo => !todo.completed);

  count.textContent = `${activeTodos.length} items left`;

}

function renderTodos(){

  todoList.innerHTML = "";

  let filteredTodos = todos;

  if(currentFilter === "active"){

    filteredTodos = todos.filter(todo => !todo.completed);

  }

  if(currentFilter === "completed"){

    filteredTodos = todos.filter(todo => todo.completed);

  }

  filteredTodos.forEach(todo => {

    const li = document.createElement("li");

    li.className = "todo-item";

    li.dataset.id = todo.id;

    const span = document.createElement("span");

    span.className = "todo-text";

    span.textContent = todo.text;

    if(todo.completed){

      span.classList.add("completed");

    }

    const deleteBtn = document.createElement("button");

    deleteBtn.className = "delete-btn";

    deleteBtn.textContent = "❌";

    li.appendChild(span);

    li.appendChild(deleteBtn);

    todoList.appendChild(li);

  });

  updateCount();

}

function addTodo(){

  const text = todoInput.value.trim();

  if(text === ""){
    return;
  }

  const newTodo = {
    id: Date.now(),
    text,
    completed:false
  };

  todos.push(newTodo);

  saveTodos();

  renderTodos();

  todoInput.value = "";

}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){

    addTodo();

  }

});

todoList.addEventListener("click", (e) => {

  const li = e.target.closest(".todo-item");

  if(!li){
    return;
  }

  const id = Number(li.dataset.id);

  const todo = todos.find(item => item.id === id);

  if(e.target.classList.contains("delete-btn")){

    todos = todos.filter(item => item.id !== id);

  }

  if(e.target.classList.contains("todo-text")){

    todo.completed = !todo.completed;

  }

  saveTodos();

  renderTodos();

});

todoList.addEventListener("dblclick", (e) => {

  if(!e.target.classList.contains("todo-text")){
    return;
  }

  const li = e.target.closest(".todo-item");

  const id = Number(li.dataset.id);

  const todo = todos.find(item => item.id === id);

  const input = document.createElement("input");

  input.type = "text";

  input.value = todo.text;

  input.className = "edit-input";

  li.replaceChild(input, e.target);

  input.focus();

  input.addEventListener("keydown", (event) => {

    if(event.key === "Enter"){

      todo.text = input.value.trim() || todo.text;

      saveTodos();

      renderTodos();

    }

  });

});

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {

      btn.classList.remove("active");

    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTodos();

  });

});

clearCompleted.addEventListener("click", () => {

  todos = todos.filter(todo => !todo.completed);

  saveTodos();

  renderTodos();

});

renderTodos();
