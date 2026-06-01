PHẦN A — KIỂM TRA ĐỌC HIỂU

Câu A1 (5 điểm) – Function Declaration vs Expression vs Arrow

Function Declaration:

function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
}

Function Expression:

const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};

Arrow Function:

const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};

Khác nhau về hoisting:

Function Declaration được hoisting toàn bộ nên có thể gọi trước khi khai báo:

console.log(tinhTong(2, 3));

function tinhTong(a, b) {
    return a + b;
}

Kết quả: 5

Function Expression và Arrow Function chỉ hoisting biến, không hoisting giá trị hàm:

console.log(tinhTong(2, 3));

const tinhTong = function(a, b) {
    return a + b;
};

hoặc

console.log(tinhTong(2, 3));

const tinhTong = (a, b) => a + b;

Kết quả: ReferenceError vì biến chưa được khởi tạo tại thời điểm gọi.

---

Câu A2 (5 điểm) – Scope & Closure

Đoạn 1:

function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const c = counter();

console.log(c.increment());
console.log(c.increment());
console.log(c.increment());
console.log(c.decrement());
console.log(c.getCount());

Kết quả:

1
2
3
2
2

Giải thích:

Biến count được giữ lại trong closure của các hàm increment, decrement và getCount. Mỗi lần gọi increment sẽ tăng count lên 1, decrement giảm 1 và getCount trả về giá trị hiện tại.

Đoạn 2:

for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}

Output:

var: 3
var: 3
var: 3
let: 0
let: 1
let: 2

Giải thích:

var có phạm vi function scope nên cả 3 callback cùng tham chiếu đến một biến i. Khi setTimeout chạy thì vòng lặp đã kết thúc và i = 3.

let có block scope nên mỗi lần lặp tạo ra một biến j mới độc lập. Vì vậy callback lưu đúng giá trị của từng lần lặp là 0, 1 và 2.

---

Câu A3 (5 điểm) – Array Methods

const nums = [1,2,3,4,5,6,7,8,9,10];

1. Lấy các số chẵn

nums.filter(n => n % 2 === 0);

2. Nhân mỗi số với 3

nums.map(n => n * 3);

3. Tính tổng tất cả

nums.reduce((sum, n) => sum + n, 0);

4. Tìm số đầu tiên lớn hơn 7

nums.find(n => n > 7);

5. Kiểm tra có số lớn hơn 10 không

nums.some(n => n > 10);

6. Kiểm tra tất cả đều lớn hơn 0

nums.every(n => n > 0);

7. Tạo mảng "Số X là [chẵn/lẻ]"

nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

8. Đảo ngược mảng nhưng không thay đổi mảng gốc

[...nums].reverse();

---

Câu A4 (5 điểm) – Object Destructuring & Spread

const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: {
        ram: 8,
        storage: 256,
        color: "Titan"
    }
};

const { name, price, specs: { ram, color } } = product;

console.log(name, price, ram, color);

Kết quả:

iPhone 16 25990000 8 Titan

console.log(specs);

Kết quả:

ReferenceError: specs is not defined

Vì chỉ destructuring các thuộc tính ram và color từ specs, không tạo biến specs.

Spread:

const updated = {
    ...product,
    price: 23990000,
    sale: true
};

console.log(updated.price);

Kết quả:

23990000

console.log(updated.sale);

Kết quả:

true

console.log(product.price);

Kết quả:

25990000

Object gốc không bị thay đổi vì spread tạo object mới.

Spread gotcha:

const copy = { ...product };
copy.specs.ram = 16;

console.log(product.specs.ram);

Kết quả:

16

Giải thích:

Spread chỉ sao chép nông (shallow copy). Thuộc tính specs vẫn tham chiếu đến cùng một object trong bộ nhớ. Khi thay đổi copy.specs.ram thì product.specs.ram cũng thay đổi theo.






PHẦN C — SUY LUẬN

Câu C1 (10 điểm) – Refactor Code

Code refactor sử dụng filter, map, sort, destructuring và arrow function:

const processOrders = orders =>
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);

Giải thích:

* filter() lọc các đơn hàng có status là "completed" và total lớn hơn 100000.
* map() tạo object mới chỉ chứa các thuộc tính cần thiết và tính discount, finalTotal.
* destructuring giúp lấy trực tiếp các thuộc tính từ object.
* sort() sắp xếp finalTotal giảm dần.
* Code ngắn gọn, dễ đọc và dễ bảo trì hơn so với việc dùng nhiều vòng lặp.

---

Câu C2 (10 điểm) – Thiết kế API

const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

Kiểm thử:

console.log(miniArray.map([1, 2, 3], x => x * 2));
// [2, 4, 6]

console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));
// [3, 4]

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// 10

Giải thích:

* map() duyệt từng phần tử, áp dụng hàm fn và lưu kết quả vào mảng mới.
* filter() duyệt từng phần tử, nếu fn trả về true thì thêm phần tử vào mảng kết quả.
* reduce() dùng biến accumulator để tích lũy kết quả sau mỗi lần gọi fn.
* Cả ba hàm đều hoạt động tương tự các phương thức map(), filter() và reduce() có sẵn trong JavaScript nhưng được tự cài đặt bằng vòng lặp.
