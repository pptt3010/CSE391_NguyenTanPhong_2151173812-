Câu A1

1. DOM Tree

div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        └── li.todo-item.completed
            └── "Learn CSS"

2. querySelector

- Chọn thẻ <h1>
document.querySelector("h1")

- Chọn input trong form
document.querySelector("#todoForm input")

- Chọn tất cả .todo-item
document.querySelectorAll(".todo-item")

- Chọn link đang active
document.querySelector("a.active")

- Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li:first-child")

- Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a")
