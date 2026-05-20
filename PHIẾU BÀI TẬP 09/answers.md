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


Câu A2

1. Sự khác nhau giữa innerHTML và textContent

a) innerHTML

- Dùng để lấy hoặc chèn nội dung HTML bên trong phần tử
- Có thể đọc được thẻ HTML

Ví dụ:

<div id="demo"></div>

document.querySelector("#demo").innerHTML = "<h1>Hello</h1>";

Kết quả:
→ trình duyệt sẽ tạo ra thẻ h1 thật

<h1>Hello</h1>

-----------------------------------

b) textContent

- Dùng để lấy hoặc chèn text thuần
- Không đọc HTML
- An toàn hơn innerHTML

Ví dụ:

<div id="demo"></div>

document.querySelector("#demo").textContent = "<h1>Hello</h1>";

Kết quả hiển thị trên màn hình:

<h1>Hello</h1>

(chỉ là chữ bình thường, không tạo thẻ HTML)

-----------------------------------

2. Khi nào dùng mỗi cái?

- Dùng innerHTML khi:
  + muốn thêm HTML động
  + tạo thẻ mới bằng JavaScript

Ví dụ:
document.querySelector("#box").innerHTML = "<b>Hello</b>";

-----------------------------------

- Dùng textContent khi:
  + chỉ hiển thị text
  + dữ liệu do user nhập
  + cần bảo mật

Ví dụ:
document.querySelector("#name").textContent = userName;

-----------------------------------

3. Vì sao innerHTML có thể gây XSS?

XSS = Cross Site Scripting

Nếu user nhập JavaScript độc hại rồi đưa trực tiếp vào innerHTML,
trình duyệt sẽ chạy code đó.

Ví dụ nguy hiểm:

// User nhập:
<img src=x onerror="alert('Hacked!')">

const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput;

Khi chạy:
- trình duyệt tạo thẻ img
- ảnh lỗi → onerror chạy
- alert("Hacked!") xuất hiện

=> hacker có thể chèn script độc hại

-----------------------------------

4. Cách sửa an toàn

Dùng textContent thay cho innerHTML

Code đúng:

const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;

Kết quả:
<img src=x onerror="alert('Hacked!')">

chỉ hiển thị như văn bản bình thường,
không chạy JavaScript.

-----------------------------------

5. Kết luận

- innerHTML:
  + đọc HTML
  + mạnh hơn
  + nguy hiểm nếu dùng với dữ liệu user nhập

- textContent:
  + chỉ xử lý text
  + an toàn hơn
  + nên dùng khi hiển thị dữ liệu từ user


Câu A3

1. Khi click vào button

Thứ tự output:

BUTTON
INNER
OUTER

-----------------------------------

2. Giải thích

Sự kiện click xảy ra ở button trước,
sau đó nổi bọt (event bubbling) lên các phần tử cha.

Thứ tự:

button
→ div#inner
→ div#outer

Nên console.log chạy theo thứ tự:

BUTTON
INNER
OUTER

-----------------------------------

3. Nếu uncomment:

e.stopPropagation();

Code:

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
});

Thì output:

BUTTON

-----------------------------------

4. Giải thích

stopPropagation() sẽ chặn event bubbling.

Sự kiện chỉ chạy ở button,
không nổi bọt lên inner và outer nữa.
