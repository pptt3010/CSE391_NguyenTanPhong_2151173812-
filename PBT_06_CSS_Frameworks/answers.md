Phần A:
Câu A1 — Grid System
1. Layout ở từng kích thước màn hình
2.
<img width="404" height="80" alt="image" src="https://github.com/user-attachments/assets/794b16a7-fdc8-4553-bf9e-bbf7f4e7d085" />
Màn hình < 768px
col-12 → mỗi box chiếm toàn bộ 12 cột
<img width="114" height="151" alt="image" src="https://github.com/user-attachments/assets/1b48cda6-befd-4c18-a0f0-e55afd34ab69" />

Màn hình 768px - 991px
col-md-6 → mỗi box chiếm 6/12 cột
<img width="155" height="84" alt="image" src="https://github.com/user-attachments/assets/b1aed374-7bf9-47b5-b5bb-7f07830067ee" />

Màn hình ≥ 992px
col-lg-3 → mỗi box chiếm 3/12 cột
<img width="167" height="52" alt="image" src="https://github.com/user-attachments/assets/1dfb9f22-19ad-434a-8a0d-0bd6840c8ec9" />


col-md-6 nghĩa là:
md = medium screen (màn hình trung bình)
Áp dụng từ 768px trở lên
6 nghĩa là chiếm 6/12 cột trong Grid System

 Vì grid Bootstrap có tổng cộng 12 cột nên:


không cần viết col-sm-12 vì đã có:
col-12 áp dụng cho mọi kích thước màn hình từ nhỏ nhất trở lên.
Nên ở màn hình nhỏ <768px, box tự động chiếm toàn bộ chiều ngang mà không cần thêm col-sm-12.

Câu A2 (10đ) — Utilities & Components

1. Giải thích class d-none d-md-block

* d-none:
  Ẩn element ở mọi kích thước màn hình (display: none).

* d-md-block:
  Từ màn hình md (≥768px) trở lên, element sẽ hiển thị dạng block.

Kết luận:

* Màn hình <768px:
  Element bị ẩn.

* Màn hình ≥768px:
  Element hiển thị.

Ví dụ:

<div class="d-none d-md-block">
    Nội dung
</div>

→ Nội dung chỉ hiện trên tablet, laptop, desktop; không hiện trên mobile.

---

2. Liệt kê 5 spacing utilities và giải thích

a) mt-3

* m = margin
* t = top
* 3 = mức spacing

→ Tạo margin-top.

Ví dụ:
margin-top: 1rem;

---

b) mb-auto

* m = margin
* b = bottom
* auto = tự động

→ Margin-bottom tự động.

---

c) px-4

* p = padding
* x = left + right
* 4 = mức spacing

→ Tạo padding trái và phải.

---

d) py-2

* p = padding
* y = top + bottom
* 2 = mức spacing

→ Tạo padding trên và dưới.

---

e) ms-5

* m = margin
* s = start (trái trong LTR)
* 5 = mức spacing lớn

→ Tạo margin-left.

---

Quy tắc chung:

m = margin
p = padding

t = top
b = bottom
s = start
e = end
x = left + right
y = top + bottom

Các mức spacing:
0 → 0
1 → nhỏ
2 → vừa nhỏ
3 → vừa
4 → lớn
5 → rất lớn

---

3. Sự khác nhau giữa .container, .container-fluid, .container-md

a) .container

* Có chiều rộng cố định theo từng breakpoint.
* Tự động căn giữa.
* Responsive.

Ví dụ:
Mobile → full width
Desktop → width cố định.

---

b) .container-fluid

* Luôn chiếm 100% chiều rộng màn hình.
* Không giới hạn max-width.

Thường dùng cho:

* Banner
* Full screen layout
* Dashboard

---

c) .container-md

* Full width ở màn hình nhỏ.
* Từ md (≥768px) trở lên mới có max-width cố định.

Kết luận:

* Mobile:
  full width

* Tablet/Desktop:
  giống .container

---

Tóm tắt:

.container
→ Responsive + width cố định theo breakpoint.

.container-fluid
→ Luôn full width 100%.

.container-md
→ Full width ở mobile, fixed width từ md trở lên.



Phần C:
1. Đổi màu $primary sang #E63946

Để đổi màu mặc định của Bootstrap cần dùng Sass/SCSS.

Các bước:

Cài Bootstrap và Sass bằng npm:
npm install bootstrap
npm install sass
Tạo file custom.scss
$primary: #E63946;

@import "../node_modules/bootstrap/scss/bootstrap";
Compile SCSS sang CSS:
sass custom.scss custom.css
Link file custom.css vào HTML.

Sau khi build lại thì các class như:

btn-primary
bg-primary
text-primary

sẽ đổi sang màu mới.

2. Tại sao không nên override trực tiếp .btn-primary?

Ví dụ:

.btn-primary{
    background:red;
}

Cách này chỉ đổi màu button, còn các class khác như:

bg-primary
alert-primary
text-primary

vẫn giữ màu cũ.

Ngoài ra còn:

khó bảo trì
dễ bị ghi đè CSS
không đồng bộ giao diện

Dùng Sass variables sẽ giúp Bootstrap tự generate lại toàn bộ theme đồng nhất hơn.

Câu C2 (10đ) — So sánh

Ví dụ CSS thuần:

.navbar{
    display:flex;
    justify-content:space-between;
    background:#222;
    padding:15px;
}

.menu{
    display:flex;
    gap:20px;
}

.card{
    width:250px;
    border:1px solid #ddd;
    border-radius:10px;
}

.card img{
    width:100%;
}

@media(max-width:768px){

    .navbar{
        flex-direction:column;
    }

}

So sánh với Bootstrap:

1. Số dòng CSS
CSS thuần: phải tự viết nhiều.
Bootstrap: ít viết CSS hơn vì có class sẵn.
2. Thời gian phát triển
CSS thuần: lâu hơn.
Bootstrap: nhanh hơn vì có grid, navbar, card,...
3. Khả năng tùy biến
CSS thuần: tùy biến cao.
Bootstrap: nhanh nhưng dễ bị giống template.
4. Khi nào nên dùng Bootstrap?

Nên dùng:

làm bài tập
admin dashboard
prototype nhanh
deadline ngắn

Không nên dùng:

UI quá đặc biệt
cần custom mạnh
cần design riêng hoàn toàn
