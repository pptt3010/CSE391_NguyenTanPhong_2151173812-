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


