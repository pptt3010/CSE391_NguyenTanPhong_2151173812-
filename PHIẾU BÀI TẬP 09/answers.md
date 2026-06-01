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



PHẦN C — DEBUG & PHÂN TÍCH

Câu C1 (8 điểm) – Debug DOM Code

Các lỗi và cách sửa:

1. Sai tên sự kiện ở nút decrement:

addEventListener("onclick", ...)

Sửa thành:

addEventListener("click", ...)

2. Gán sai giá trị cho countDisplay trong hàm reset:

countDisplay = count;

Sửa thành:

countDisplay.textContent = count;

3. countDisplay được khai báo bằng const nên không thể gán lại:

countDisplay = count;

Đây là lỗi vì đang thay đổi tham chiếu của biến.

4. Xóa history chưa đúng:

historyList.innerHTML = null;

Sửa thành:

historyList.innerHTML = "";

5. Xóa tất cả history không hoạt động:

item.remove;

Sửa thành:

item.remove();

6. Khi lấy dữ liệu từ localStorage:

count = localStorage.getItem("count");

Giá trị trả về là chuỗi nên cần ép kiểu:

count = Number(localStorage.getItem("count")) || 0;

7. Chưa khôi phục danh sách history từ localStorage khi tải lại trang.

Thêm:

historyList.innerHTML = localStorage.getItem("history") || "";

8. Sau khi khôi phục history từ localStorage, các thẻ li không còn sự kiện click để xóa. Cần gắn lại event hoặc sử dụng Event Delegation.

9. Nên dùng:

historyList.appendChild(li);

thay vì:

historyList.append(li);

để tương thích tốt hơn.

Câu C2 (7 điểm) – Performance

Việc gắn event listener cho 1000 phần tử riêng lẻ là bad practice vì:

* Tạo ra 1000 event listener trong bộ nhớ.
* Tốn RAM và CPU.
* Làm giảm hiệu năng khi số lượng phần tử lớn.
* Khó bảo trì và quản lý code.
* Khi thêm phần tử mới phải gắn listener lại.

Event Delegation giải quyết bằng cách chỉ gắn một event listener lên phần tử cha. Khi người dùng tương tác với phần tử con, sự kiện sẽ bubbling lên phần tử cha và được xử lý thông qua event.target.

Ví dụ:

document.body.addEventListener("click", function(event) {
    if (event.target.matches(".item")) {
        console.log(event.target.textContent);
    }
});

Code ban đầu:

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);
}

Mỗi lần appendChild() vào DOM có thể gây reflow và repaint. Thực hiện 1000 lần sẽ làm giảm hiệu năng.

Refactor bằng DocumentFragment:

const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

document.body.appendChild(fragment);

Giải thích:

* Các phần tử được thêm vào DocumentFragment trong bộ nhớ thay vì DOM thật.
* Trình duyệt không phải tính toán layout liên tục sau mỗi lần thêm phần tử.
* Chỉ khi append fragment vào document.body mới cập nhật DOM một lần.
* Giảm số lần reflow và repaint từ khoảng 1000 lần xuống còn 1 lần.
* Tiết kiệm tài nguyên, tăng tốc độ render và cải thiện hiệu năng của trang web.
