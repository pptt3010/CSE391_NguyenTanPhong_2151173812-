// app.js

const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const count = document.querySelector("#count");
const filterButtons = document.querySelectorAll("[data-filter]");
const clearCompletedBtn = document.querySelector("#clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCount(){

    const activeTodos = todos.filter(todo => !todo.completed);

    count.textContent = activeTodos.length + " items left";
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
        span.textContent = todo.text;

        if(todo.completed){
            span.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

    updateCount();
    saveTodos();
}

function addTodo(){

    const text = todoInput.value.trim();

    if(text === ""){
        return;
    }

    const todo = {
        id: Date.now(),
        text,
        completed:false
    };

    todos.push(todo);

    todoInput.value = "";

    renderTodos();
}

function deleteTodo(id){

    todos = todos.filter(todo => todo.id !== id);

    renderTodos();
}

function toggleTodo(id){

    todos = todos.map(todo => {

        if(todo.id === id){
            todo.completed = !todo.completed;
        }

        return todo;
    });

    renderTodos();
}

function editTodo(id, newText){

    todos = todos.map(todo => {

        if(todo.id === id){
            todo.text = newText;
        }

        return todo;
    });

    renderTodos();
}

function clearCompleted(){

    todos = todos.filter(todo => !todo.completed);

    renderTodos();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (e) => {

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

    if(e.target.classList.contains("delete-btn")){
        deleteTodo(id);
    }

    if(e.target.tagName === "SPAN"){
        toggleTodo(id);
    }
});

todoList.addEventListener("dblclick", (e) => {

    if(e.target.tagName !== "SPAN"){
        return;
    }

    const li = e.target.closest(".todo-item");

    const id = Number(li.dataset.id);

    const oldText = e.target.textContent;

    const input = document.createElement("input");

    input.type = "text";
    input.value = oldText;
    input.className = "edit-input";

    li.replaceChild(input, e.target);

    input.focus();

    input.addEventListener("keypress", (event) => {

        if(event.key === "Enter"){

            const newText = input.value.trim();

            if(newText !== ""){
                editTodo(id, newText);
            }else{
                renderTodos();
            }
        }
    });
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", clearCompleted);

renderTodos();
