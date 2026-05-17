Câu A1 — var / let / const

Đoạn 1

console.log(x);
var x = 5;

Dự đoán output:
undefined

Giải thích:
Biến x được khai báo bằng var nên xảy ra hoisting. Khi JavaScript chạy, phần khai báo biến được đưa lên trên trước nhưng chưa gán giá trị.

JS hiểu gần giống:

var x;
console.log(x);
x = 5;

Vì vậy tại thời điểm console.log(x), biến x đã tồn tại nhưng chưa có giá trị nên kết quả là undefined.


--------------------------------------------------

Đoạn 2

console.log(y);
let y = 10;

Dự đoán output:
ReferenceError

Giải thích:
Biến y được khai báo bằng let nên không được sử dụng trước khi khởi tạo. Mặc dù let cũng có hoisting nhưng nó nằm trong Temporal Dead Zone (TDZ).

Khi console.log(y) chạy, biến y chưa được khởi tạo nên JavaScript báo lỗi ReferenceError.


--------------------------------------------------

Đoạn 3

const z = 15;
z = 20;
console.log(z);

Dự đoán output:
TypeError

Giải thích:
Biến z được khai báo bằng const nên không thể gán lại giá trị mới.

Dòng:

z = 20;

sẽ gây lỗi ngay lập tức nên chương trình dừng tại đó và không chạy đến console.log(z).


--------------------------------------------------

Đoạn 4

const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

Dự đoán output:
[1, 2, 3, 4]

Giải thích:
const không cho phép gán lại biến sang một mảng hoặc object khác, nhưng vẫn cho phép thay đổi dữ liệu bên trong object hoặc array.

Lệnh:

arr.push(4);

chỉ thêm phần tử vào mảng chứ không tạo mảng mới nên không bị lỗi.


--------------------------------------------------

Đoạn 5

let a = 1;

{
    let a = 2;
    console.log("Trong block:", a);
}

console.log("Ngoài block:", a);

Dự đoán output:

Trong block: 2
Ngoài block: 1

Giải thích:
Biến khai báo bằng let có block scope.

Biến a bên trong dấu {} là một biến khác hoàn toàn với biến a bên ngoài.

Do đó:
- Trong block thì a = 2
- Ngoài block thì a vẫn bằng 1


--------------------------------------------------

Kết luận

Qua bài này có thể thấy:

- var được hoisting và có thể dùng trước khai báo nhưng giá trị là undefined.
- let và const cũng được hoisting nhưng bị Temporal Dead Zone nên không thể dùng trước khi khởi tạo.
- const không cho gán lại giá trị nhưng object và array vẫn có thể thay đổi dữ liệu bên trong.
- let và const có block scope còn var thì không.


Câu A2 — Data Types & Coercion

console.log(typeof null);
Dự đoán kết quả:
"object"

Giải thích:
Đây là một lỗi lịch sử của JavaScript từ những phiên bản đầu tiên. null thực chất không phải object nhưng typeof null vẫn trả về "object".


--------------------------------------------------

console.log(typeof undefined);

Dự đoán kết quả:
"undefined"

Giải thích:
undefined là kiểu dữ liệu riêng trong JavaScript dùng để biểu thị biến chưa có giá trị.


--------------------------------------------------

console.log(typeof NaN);

Dự đoán kết quả:
"number"

Giải thích:
NaN nghĩa là “Not a Number” nhưng trong JavaScript nó vẫn thuộc kiểu number.


--------------------------------------------------

console.log("5" + 3);

Dự đoán kết quả:
"53"

Giải thích:
Khi dùng dấu + với string, JavaScript ưu tiên nối chuỗi. Số 3 được ép kiểu thành chuỗi "3", sau đó nối với "5" thành "53".


--------------------------------------------------

console.log("5" - 3);

Dự đoán kết quả:
2

Giải thích:
Dấu - chỉ dùng cho phép toán số học nên JavaScript ép chuỗi "5" thành số 5 rồi thực hiện phép trừ:

5 - 3 = 2


--------------------------------------------------

console.log("5" * "3");

Dự đoán kết quả:
15

Giải thích:
Dấu * là phép toán số học nên cả hai chuỗi đều được ép kiểu thành number:

5 * 3 = 15


--------------------------------------------------

console.log(true + true);

Dự đoán kết quả:
2

Giải thích:
Trong phép toán số học:
- true được chuyển thành 1
- false được chuyển thành 0

Do đó:

1 + 1 = 2


--------------------------------------------------

console.log([] + []);

Dự đoán kết quả:
""

Giải thích:
Array rỗng khi chuyển sang string sẽ thành chuỗi rỗng "".

Vì vậy:

"" + "" = ""


--------------------------------------------------

console.log([] + {});

Dự đoán kết quả:
"[object Object]"

Giải thích:
- [] chuyển thành ""
- {} chuyển thành "[object Object]"

Kết quả cuối cùng:

"" + "[object Object]"

=> "[object Object]"


--------------------------------------------------

console.log({} + []);

Dự đoán kết quả:
0
hoặc "[object Object]" tùy môi trường chạy.

Giải thích:
Trong nhiều trường hợp JavaScript hiểu {} là block code thay vì object.

Khi đó:
+[] sẽ được tính thành số 0.

Tuy nhiên nếu {} được hiểu là object thì kết quả có thể là:

"[object Object]"

Do đó đây là một ví dụ nổi tiếng về sự khó đoán của coercion trong JavaScript.


--------------------------------------------------

Giải thích vì sao "5" + 3 và "5" - 3 cho kết quả khác nhau

"5" + 3 cho kết quả là "53" vì dấu + có thể dùng để nối chuỗi. Khi một bên là string, JavaScript sẽ ép bên còn lại thành string rồi nối lại.

Ví dụ:
"5" + "3" = "53"

Ngược lại, dấu - chỉ dùng cho phép toán số học nên JavaScript buộc phải chuyển các giá trị thành number trước khi tính.

Ví dụ:
5 - 3 = 2

Đây được gọi là type coercion, tức là JavaScript tự động ép kiểu dữ liệu để thực hiện phép toán.



Câu A3 — So sánh == và ===

console.log(5 == "5");

Dự đoán kết quả:
true

Giải thích:
Toán tử == chỉ so sánh giá trị nên JavaScript sẽ tự động ép kiểu. Chuỗi "5" được chuyển thành số 5 trước khi so sánh.

5 == 5
=> true


--------------------------------------------------

console.log(5 === "5");

Dự đoán kết quả:
false

Giải thích:
Toán tử === so sánh cả giá trị lẫn kiểu dữ liệu.

- 5 là number
- "5" là string

Khác kiểu nên kết quả là false.


--------------------------------------------------

console.log(null == undefined);

Dự đoán kết quả:
true

Giải thích:
Trong JavaScript, null và undefined được xem là bằng nhau khi dùng ==.


--------------------------------------------------

console.log(null === undefined);

Dự đoán kết quả:
false

Giải thích:
=== yêu cầu cùng kiểu dữ liệu.

- null có kiểu null
- undefined có kiểu undefined

Khác kiểu nên kết quả là false.


--------------------------------------------------

console.log(NaN == NaN);

Dự đoán kết quả:
false

Giải thích:
NaN là giá trị đặc biệt trong JavaScript. Theo quy tắc của JS, NaN không bằng bất kỳ giá trị nào, kể cả chính nó.


--------------------------------------------------

console.log(0 == false);

Dự đoán kết quả:
true

Giải thích:
Khi dùng ==, JavaScript ép kiểu:
- false được chuyển thành 0

Sau đó so sánh:

0 == 0
=> true


--------------------------------------------------

console.log(0 === false);

Dự đoán kết quả:
false

Giải thích:
=== không ép kiểu.

- 0 là number
- false là boolean

Khác kiểu dữ liệu nên kết quả là false.


--------------------------------------------------

console.log("" == false);

Dự đoán kết quả:
true

Giải thích:
Khi dùng ==:
- false chuyển thành 0
- chuỗi rỗng "" cũng được chuyển thành 0

Kết quả:

0 == 0
=> true


--------------------------------------------------

Kết luận

Trong JavaScript nên ưu tiên dùng === thay vì ==.

Lý do:
- === không tự động ép kiểu
- dễ đọc và dễ kiểm soát hơn
- tránh các lỗi khó đoán do coercion
- code rõ ràng và an toàn hơn

Ví dụ:
0 == false
=> true

Điều này có thể gây lỗi logic nếu không để ý.

Vì vậy trong thực tế đa số lập trình viên sẽ dùng === để so sánh.


Câu A4 — Truthy & Falsy

Trong JavaScript, các giá trị Falsy là những giá trị khi đưa vào điều kiện sẽ được hiểu là false.

TẤT CẢ giá trị Falsy trong JavaScript gồm:

- false
- 0
- -0
- 0n
- ""
- ''
- ``
- null
- undefined
- NaN

Ngoài các giá trị trên thì hầu hết đều là Truthy.


--------------------------------------------------

if ("0") console.log("A");

Dự đoán:
Có in ra A

Giải thích:
"0" là chuỗi, không phải số 0. Chuỗi có ký tự nên là Truthy.


--------------------------------------------------

if ("") console.log("B");

Dự đoán:
Không in

Giải thích:
Chuỗi rỗng là Falsy.


--------------------------------------------------

if ([]) console.log("C");

Dự đoán:
Có in ra C

Giải thích:
Array rỗng vẫn là object nên là Truthy.


--------------------------------------------------

if ({}) console.log("D");

Dự đoán:
Có in ra D

Giải thích:
Object rỗng vẫn là Truthy.


--------------------------------------------------

if (null) console.log("E");

Dự đoán:
Không in

Giải thích:
null là Falsy.


--------------------------------------------------

if (0) console.log("F");

Dự đoán:
Không in

Giải thích:
0 là Falsy.


--------------------------------------------------

if (-1) console.log("G");

Dự đoán:
Có in ra G

Giải thích:
Mọi số khác 0 đều là Truthy, kể cả số âm.


--------------------------------------------------

if (" ") console.log("H");

Dự đoán:
Có in ra H

Giải thích:
Đây không phải chuỗi rỗng mà là chuỗi chứa ký tự khoảng trắng nên vẫn là Truthy.


--------------------------------------------------

Kết luận

Trong JavaScript:
- Chuỗi rỗng "", số 0, null, undefined, NaN là Falsy.
- Array và object dù rỗng vẫn là Truthy.
- Chuỗi có khoảng trắng vẫn là Truthy.
- Mọi số khác 0 đều là Truthy.


Câu A5 — Template Literals

Template literal là cách viết chuỗi bằng dấu backtick (` `) thay cho dấu nháy đơn hoặc nháy kép.

Khi muốn chèn biến vào chuỗi sẽ dùng:

${tenBien}

Cách này giúp code dễ đọc hơn và không cần nối chuỗi bằng dấu +.


--------------------------------------------------

Cách 1

Code cũ:

var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";

Viết lại bằng template literal:

var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;


--------------------------------------------------

Cách 2

Code cũ:

var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;

Viết lại bằng template literal:

var url = `https://api.example.com/users/${userId}/orders?page=${page}`;


--------------------------------------------------

Cách 3

Code cũ:

var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";

Viết lại bằng template literal:

var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;


--------------------------------------------------

Ưu điểm của template literal

- Code ngắn gọn hơn
- Dễ đọc hơn
- Không cần dùng nhiều dấu +
- Hỗ trợ xuống dòng trực tiếp
- Viết HTML hoặc URL tiện hơn rất nhiều



Câu C1 — Debug JavaScript

Code gốc:

function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}

// Test
const gia = tinhGiaGiamGia("100000", 20)
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}


--------------------------------------------------

Lỗi 1 — Dùng dấu = thay vì == hoặc ===

Đoạn lỗi:

if (giaSauGiam = 0)

Giải thích:
Dấu = là phép gán giá trị, không phải phép so sánh.

Dòng này sẽ gán:
giaSauGiam = 0

Sau đó điều kiện if(0) sẽ luôn là false.

Cách sửa:

if (giaSauGiam === 0)


--------------------------------------------------

Lỗi 2 — Truyền chuỗi thay vì number

Đoạn lỗi:

tinhGiaGiamGia("100000", 20)

Giải thích:
"100000" là string, không phải number.

JavaScript có thể tự ép kiểu nhưng đây là cách viết không an toàn và dễ gây lỗi khi dữ liệu phức tạp hơn.

Cách sửa:

tinhGiaGiamGia(100000, 20)


--------------------------------------------------

Lỗi 3 — Không kiểm tra kiểu dữ liệu đầu vào

Hàm hiện tại không kiểm tra:
- giaBan có phải number không
- phanTramGiam có phải number không

Nếu người dùng truyền sai kiểu dữ liệu có thể gây kết quả không mong muốn.

Cách sửa:

if (typeof giaBan !== "number" || typeof phanTramGiam !== "number") {
    return "Dữ liệu không hợp lệ"
}


--------------------------------------------------

Lỗi 4 — Dùng var thay vì let

Đoạn lỗi:

var giamGia = giaBan * phanTramGiam / 100

Giải thích:
var có function scope và dễ gây bug do hoisting.

Trong JavaScript hiện đại nên ưu tiên dùng let hoặc const.

Cách sửa:

let giamGia = giaBan * phanTramGiam / 100


--------------------------------------------------

Lỗi 5 — Hàm có thể trả về nhiều kiểu dữ liệu

Hàm hiện tại:
- lúc trả về string
- lúc trả về number

Ví dụ:

return "Phần trăm giảm không hợp lệ"

hoặc:

return giaSauGiam

Điều này làm code khó kiểm soát hơn.

Cách sửa:
Nên thống nhất kiểu dữ liệu trả về hoặc dùng throw Error.


--------------------------------------------------

Lỗi 6 — Bug ẩn trong vòng lặp với var

Đoạn lỗi:

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}

Nhiều người nghĩ kết quả sẽ là:

Item 0
Item 1
Item 2
Item 3
Item 4

Nhưng thực tế lại là:

Item 5
Item 5
Item 5
Item 5
Item 5

Giải thích:
var không có block scope mà chỉ có function scope.

Callback bên trong setTimeout không chạy ngay mà chạy sau 1 giây.

Khi đó vòng lặp đã kết thúc và biến i đã bằng 5.

Tất cả callback đều dùng chung một biến i nên đều in ra 5.


--------------------------------------------------

Cách sửa lỗi vòng lặp

Dùng let:

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}

Giải thích:
let có block scope nên mỗi lần lặp sẽ tạo một biến i riêng.


--------------------------------------------------

Code sau khi sửa

function tinhGiaGiamGia(giaBan, phanTramGiam) {

    if (
        typeof giaBan !== "number" ||
        typeof phanTramGiam !== "number"
    ) {
        return "Dữ liệu không hợp lệ"
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }

    let giamGia = giaBan * phanTramGiam / 100

    let giaSauGiam = giaBan - giamGia

    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!")
    }

    return giaSauGiam
}


// Test

const gia = tinhGiaGiamGia(100000, 20)

console.log("Giá sau giảm: " + gia + "đ")


const gia2 = tinhGiaGiamGia(50000, 110)

console.log("Giá: " + gia2)


for (let i = 0; i < 5; i++) {

    setTimeout(function() {

        console.log("Item " + i)

    }, 1000)

}


--------------------------------------------------

Kết luận

Qua bài này có thể thấy các lỗi phổ biến trong JavaScript gồm:
- Nhầm = với ===
- Dùng var gây lỗi scope
- Không kiểm tra kiểu dữ liệu
- Ép kiểu ngầm gây bug
- Callback bất đồng bộ trong vòng lặp
- Hàm trả về nhiều kiểu dữ liệu khác nhau
