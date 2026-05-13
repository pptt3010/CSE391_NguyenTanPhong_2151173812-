Phần A:

Câu A1: Viewport & Mobile-First
1. Thẻ <meta viewport> chuẩn
<meta name="viewport" content="width=device-width, initial-scale=1.0">

2. Nếu thiếu thẻ viewport:
iPhone sẽ hiển thị website như phiên bản desktop bị thu nhỏ.

3. Mobile-First là:
thiết kế giao diện cho điện thoại trước, sau đó mở rộng cho tablet và desktop.

Desktop-First là:
thiết kế giao diện desktop trước, sau đó chỉnh lại cho mobile.

/* Mobile trước */
.box {
    width: 100%;
    background: lightblue;
}

/* Từ 768px trở lên */
@media (min-width: 768px) {
    .box {
        width: 50%;
        background: orange;
    }
}


/* Desktop trước */
.box {
    width: 50%;
    background: orange;
}

/* Mobile */
@media (max-width: 768px) {
    .box {
        width: 100%;
        background: lightblue;
    }
}


+)Mobile-First được khuyên dùng vì:
tối ưu cho điện thoại
CSS dễ quản lý
hiệu năng tốt hơn
phù hợp xu hướng hiện đại

Câu A2 — Breakpoints
1. Breakpoint XS
Kích thước pixel:
dưới 576px
Thiết bị đại diện:
điện thoại nhỏ
Ví dụ lưới sản phẩm:
1 cột

2. Breakpoint SM
Kích thước pixel:
từ 576px trở lên
Thiết bị đại diện:
điện thoại lớn
Ví dụ lưới sản phẩm:
2 cột

3. Breakpoint MD
Kích thước pixel:
từ 768px trở lên
Thiết bị đại diện:
tablet
Ví dụ lưới sản phẩm:
2 hoặc 3 cột

4. Breakpoint LG
Kích thước pixel:
từ 992px trở lên
Thiết bị đại diện:
laptop
Ví dụ lưới sản phẩm:
3 hoặc 4 cột

5. Breakpoint XL
Kích thước pixel:
từ 1200px trở lên
Thiết bị đại diện:
desktop lớn
Ví dụ lưới sản phẩm:
4 cột

6. Breakpoint XXL
Kích thước pixel:
từ 1400px trở lên
Thiết bị đại diện:
màn hình rất lớn
Ví dụ lưới sản phẩm:
5 hoặc 6 cột





Phần C:
Câu C1 — Phân tích trang web thực
Website được chọn: YouTube
1. Mobile (375px)
Quan sát
Header nhỏ gọn
Chỉ hiện logo, search icon và avatar
Sidebar bị ẩn
Video hiển thị 1 cột
Font nhỏ hơn desktop
Khoảng cách giữa các phần tử hẹp hơn
Giải thích

YouTube dùng:

responsive design
Mobile-First layout

Mục tiêu:

tối ưu cho màn hình nhỏ
dễ thao tác bằng ngón tay
2. Tablet (768px)
Quan sát
Header rộng hơn
Thanh tìm kiếm lớn hơn
Sidebar thu gọn dạng icon
Video hiển thị khoảng 2 cột
Khoảng cách giữa các card lớn hơn mobile
Giải thích

Tablet có màn hình lớn hơn nên:

hiển thị thêm nội dung
tăng số cột video
cải thiện trải nghiệm xem
3. Desktop (1440px)
Quan sát
Sidebar hiện đầy đủ
Thanh navigation ngang đầy đủ
Video hiển thị nhiều cột (4–5 cột)
Nội dung rộng toàn màn hình
Font và thumbnail lớn hơn
Giải thích

Desktop ưu tiên:

hiển thị nhiều nội dung cùng lúc
tận dụng không gian lớn
hỗ trợ thao tác chuột và bàn phím

<img width="1901" height="937" alt="image" src="https://github.com/user-attachments/assets/aae7347e-c603-4b9b-8f28-e7391afe878c" />

<img width="1253" height="583" alt="image" src="https://github.com/user-attachments/assets/28844a0d-e010-4fc6-835c-667da70bd113" />

<img width="463" height="750" alt="image" src="https://github.com/user-attachments/assets/d7647c2a-13b7-4621-b03a-f3bbcd7666d4" />


2.
1. Mobile (375px)
Navigation thay đổi thế nào?
Header nhỏ gọn hơn
Sidebar bị ẩn
Navigation chuyển sang hamburger menu ☰
Thanh search thu nhỏ thành icon
Lưới content thay đổi mấy cột?
Video hiển thị 1 cột
Elements nào bị ẩn trên mobile?
Sidebar đầy đủ
Một số text menu
Nhiều nút chức năng trên header
Font size có thay đổi không?
Có
Font nhỏ hơn desktop để phù hợp màn hình nhỏ
2. Tablet (768px)
Navigation thay đổi thế nào?
Hamburger vẫn còn
Sidebar thu gọn dạng icon
Thanh search dài hơn mobile
Lưới content thay đổi mấy cột?
Khoảng 2 cột video
Elements nào bị ẩn?
Sidebar chưa hiện đầy đủ text
Một số menu phụ vẫn được thu gọn
Font size có thay đổi không?
Có
Font lớn hơn mobile nhưng nhỏ hơn desktop
3. Desktop (1440px)
Navigation thay đổi thế nào?
Sidebar hiện đầy đủ
Menu ngang đầy đủ
Không cần giao diện tối giản như mobile
Lưới content thay đổi mấy cột?
Khoảng 4–5 cột video
Elements nào bị ẩn?
Hầu như không ẩn
Hiển thị đầy đủ chức năng
Font size có thay đổi không?
Có
Font lớn và dễ đọc hơn mobile



Câu 2C:
1. Mobile Layout (< 768px)
Wireframe
┌────────────────────┐
│ LOGO   ☰   PHONE   │
├────────────────────┤
│                    │
│    HERO IMAGE      │
│                    │
├────────────────────┤
│    FOOD IMAGE 1    │
├────────────────────┤
│    FOOD IMAGE 2    │
├────────────────────┤
│    FOOD IMAGE 3    │
├────────────────────┤
│    FOOD IMAGE 4    │
├────────────────────┤
│    FOOD IMAGE 5    │
├────────────────────┤
│    FOOD IMAGE 6    │
├────────────────────┤
│   BOOKING FORM     │
│                    │
├────────────────────┤
│    GOOGLE MAP      │
├────────────────────┤
│      FOOTER        │
└────────────────────┘
Mobile: Những gì bị ẩn?
Navigation menu đầy đủ bị ẩn
Chỉ hiện hamburger ☰
Một số text phụ có thể bị ẩn
Form nằm đâu?
Form đặt bàn nằm dưới grid món ăn
Hiển thị full width 1 cột
2. Tablet Layout (768px - 1023px)
Wireframe
┌──────────────────────────────┐
│ LOGO      MENU      PHONE    │
├──────────────────────────────┤
│                              │
│         HERO IMAGE           │
│                              │
├────────────┬─────────────────┤
│ FOOD 1     │ FOOD 2          │
├────────────┼─────────────────┤
│ FOOD 3     │ FOOD 4          │
├────────────┼─────────────────┤
│ FOOD 5     │ FOOD 6          │
├──────────────────────────────┤
│        BOOKING FORM          │
├──────────────────────────────┤
│         GOOGLE MAP           │
├──────────────────────────────┤
│           FOOTER             │
└──────────────────────────────┘
Tablet: Grid ảnh mấy cột?
2 cột
Bản đồ nằm đâu?
Nằm dưới form đặt bàn
Chiếm toàn chiều ngang
3. Desktop Layout (≥ 1024px)
Wireframe
┌────────────────────────────────────────────┐
│ LOGO      NAVIGATION        PHONE          │
├────────────────────────────────────────────┤
│                                            │
│               HERO IMAGE                   │
│                                            │
├─────────────────┬──────────────────────────┤
│                 │                          │
│   FOOD GRID     │      BOOKING FORM        │
│    3 COLUMNS    │                          │
│                 │                          │
├─────────────────┴──────────────────────────┤
│               GOOGLE MAP                   │
├────────────────────────────────────────────┤
│                  FOOTER                    │
└────────────────────────────────────────────┘
Desktop: Layout bao nhiêu cột?
Layout chính: 2 cột
Grid món ăn: 3 cột
Sidebar có không?
Không cần sidebar riêng
Form đặt bàn đóng vai trò cột bên phải
4. CSS Skeleton (Mobile-First)
/* MOBILE FIRST */

body {
    margin: 0;
}

/* HEADER */

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* HERO */

.hero {
    width: 100%;
}

/* FOOD GRID */

.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

/* BOOKING FORM */

.booking-form {
    width: 100%;
}

/* MAP */

.map {
    width: 100%;
}

/* FOOTER */

.footer {
    text-align: center;
}

/* ======================= */
/* TABLET */
/* ======================= */

@media (min-width: 768px) {

    .food-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* ======================= */
/* DESKTOP */
/* ======================= */

@media (min-width: 1024px) {

    .main-layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 20px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
