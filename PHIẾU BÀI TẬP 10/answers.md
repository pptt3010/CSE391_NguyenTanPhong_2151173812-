PHẦN A — KIỂM TRA ĐỌC HIỂU

Câu A1 (5 điểm) – Sync vs Async

Code:

console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout 0ms"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

setTimeout(() => console.log("5 - Timeout 100ms"), 100);

Promise.resolve().then(() => {
    console.log("6 - Promise 2");
    setTimeout(() => console.log("7 - Nested timeout"), 0);
});

Thứ tự output:

1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

Giải thích:

* JavaScript chạy code đồng bộ trước.
* "1 - Start" được in ra.
* setTimeout được đưa vào Macrotask Queue.
* Promise.then được đưa vào Microtask Queue.
* "4 - End" được in ra.
* Call Stack rỗng, Event Loop xử lý toàn bộ Microtask trước.
* In ra "3 - Promise".
* In ra "6 - Promise 2".
* Trong callback này tạo thêm một setTimeout nên "7 - Nested timeout" được đưa vào Macrotask Queue.
* Sau khi Microtask Queue rỗng mới xử lý Macrotask Queue.
* Chạy "2 - Timeout 0ms".
* Chạy "7 - Nested timeout".
* Sau khoảng 100ms mới chạy "5 - Timeout 100ms".

Event Loop:

* Call Stack: nơi thực thi code hiện tại.
* Microtask Queue: Promise.then, catch, finally, queueMicrotask.
* Macrotask Queue: setTimeout, setInterval, DOM Events.

Ưu tiên xử lý:

Call Stack → Microtask Queue → Macrotask Queue.

---

Câu A2 (5 điểm) – Fetch API

Code:

async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}

Giải thích:

const response = await fetch(...);

* fetch() gửi HTTP request.
* fetch() trả về Promise.
* await dùng để chờ Promise hoàn thành và lấy đối tượng Response.

if (!response.ok)

* response.ok là true khi status nằm trong khoảng 200–299.
* response.ok là false khi request không thành công.

Ví dụ:

404 Not Found
500 Internal Server Error
403 Forbidden

const data = await response.json();

* response.json() cũng trả về Promise.
* Cần await để chờ quá trình đọc và chuyển JSON thành object JavaScript.

try...catch

Catch được:

* Network Error (mất mạng, DNS lỗi, server không phản hồi).
* Lỗi do throw Error(...) tự tạo.
* JSON Parse Error nếu dữ liệu JSON không hợp lệ.

Không tự động catch:

404
500
403

vì fetch vẫn resolve Promise bình thường. Cần tự kiểm tra bằng response.ok.

---

Câu A3 (5 điểm) – Promise States

Sơ đồ trạng thái Promise:

            Pending
           /       \
          /         \
         /           \
 Fulfilled         Rejected

Giải thích:

* Pending: đang chờ xử lý.
* Fulfilled: thực hiện thành công.
* Rejected: xảy ra lỗi.

Khi đã chuyển sang Fulfilled hoặc Rejected thì không thể quay lại Pending.

Callback Hell:

Là tình trạng nhiều callback lồng nhau gây khó đọc, khó bảo trì và khó xử lý lỗi.

Ví dụ Callback Hell:

login(user, function(userData) {
    getProfile(userData.id, function(profile) {
        getOrders(profile.id, function(orders) {
            getPayment(orders[0].id, function(payment) {
                console.log(payment);
            });
        });
    });
});

Refactor bằng async/await:

async function process() {
    try {
        const userData = await login(user);
        const profile = await getProfile(userData.id);
        const orders = await getOrders(profile.id);
        const payment = await getPayment(orders[0].id);

        console.log(payment);
    } catch (error) {
        console.error(error);
    }
}

Ưu điểm:

* Code đọc từ trên xuống như code đồng bộ.
* Dễ bảo trì.
* Dễ xử lý lỗi bằng try...catch.
* Tránh callback lồng nhau quá sâu.



PHẦN C — PHÂN TÍCH

Câu C1 (10 điểm) – Error Handling Strategy

1. Network Errors (mất mạng giữa chừng)

Cách xử lý:

* Hiển thị thông báo thân thiện cho người dùng.
* Cho phép thử lại request.
* Lưu dữ liệu tạm thời nếu cần.
* Kiểm tra navigator.onLine trước khi gửi request.

Ví dụ:

try {
    const response = await fetch(url);
} catch (error) {
    console.error("Mất kết nối mạng");
    alert("Vui lòng kiểm tra kết nối Internet.");
}

---

2. API Errors

404 Not Found

* Tài nguyên không tồn tại.
* Hiển thị trang hoặc thông báo "Không tìm thấy dữ liệu".

if (response.status === 404) {
    throw new Error("Không tìm thấy dữ liệu");
}

500 Internal Server Error

* Lỗi phía server.
* Thông báo người dùng thử lại sau.

if (response.status === 500) {
    throw new Error("Lỗi hệ thống, vui lòng thử lại sau");
}

429 Too Many Requests

* Gửi quá nhiều request.
* Chờ một khoảng thời gian rồi thử lại.

if (response.status === 429) {
    throw new Error("Quá nhiều yêu cầu, vui lòng thử lại sau");
}

Ví dụ tổng quát:

if (!response.ok) {
    switch (response.status) {
        case 404:
            throw new Error("Not Found");

        case 429:
            throw new Error("Too Many Requests");

        case 500:
            throw new Error("Internal Server Error");

        default:
            throw new Error(`HTTP ${response.status}`);
    }
}

---

3. Timeout (API chậm hơn 10 giây)

Hàm fetchWithTimeout:

async function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, ms);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

Ý tưởng:

* Dùng AbortController.
* Nếu quá thời gian quy định thì hủy request.
* Tránh chờ vô hạn khi server phản hồi chậm.

---

4. Retry Logic

Thử lại tối đa 3 lần nếu lỗi mạng:

async function fetchWithRetry(url, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response;
        } catch (error) {
            lastError = error;

            console.log(`Lần thử ${attempt} thất bại`);

            if (attempt < maxRetries) {
                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );
            }
        }
    }

    throw lastError;
}

Ý tưởng:

* Nếu lỗi mạng hoặc request thất bại thì thử lại.
* Sau mỗi lần lỗi đợi 1 giây.
* Sau maxRetries lần vẫn lỗi thì ném exception.

---

Câu C2 (10 điểm) – Promise.all vs Promise.allSettled vs Promise.race

| Method               | Khi nào resolve?              | Khi nào reject?             | Use case                               |
| -------------------- | ----------------------------- | --------------------------- | -------------------------------------- |
| Promise.all()        | Tất cả Promise thành công     | Chỉ cần 1 Promise thất bại  | Tải dữ liệu bắt buộc phải có đầy đủ    |
| Promise.allSettled() | Khi tất cả Promise hoàn thành | Không reject                | Hiển thị dữ liệu dù một số request lỗi |
| Promise.race()       | Promise đầu tiên hoàn thành   | Promise đầu tiên thất bại   | Timeout hoặc lấy phản hồi nhanh nhất   |
| Promise.any()        | Promise đầu tiên thành công   | Tất cả Promise đều thất bại | Dùng nhiều nguồn dữ liệu dự phòng      |

---

1. Promise.all()

Ví dụ tải dữ liệu trang sản phẩm:

const [product, reviews, recommendations] =
    await Promise.all([
        fetch("/api/product/1").then(r => r.json()),
        fetch("/api/reviews/1").then(r => r.json()),
        fetch("/api/recommendations").then(r => r.json())
    ]);

console.log(product);
console.log(reviews);
console.log(recommendations);

Nếu một request lỗi thì toàn bộ Promise.all() reject.

---

2. Promise.allSettled()

Ví dụ dashboard quản trị:

const results = await Promise.allSettled([
    fetch("/api/users"),
    fetch("/api/orders"),
    fetch("/api/statistics")
]);

console.log(results);

Kết quả:

[
    { status: "fulfilled", value: ... },
    { status: "rejected", reason: ... },
    { status: "fulfilled", value: ... }
]

Dù có request lỗi vẫn nhận được kết quả của các request còn lại.

---

3. Promise.race()

Ví dụ timeout API:

const response = await Promise.race([
    fetch("/api/products"),
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
    )
]);

Nếu API phản hồi trước 5 giây thì lấy dữ liệu.

Nếu timeout xảy ra trước thì báo lỗi.

---

4. Promise.any()

Ví dụ lấy dữ liệu từ nhiều server mirror:

const data = await Promise.any([
    fetch("https://server1.example.com/data")
        .then(r => r.json()),

    fetch("https://server2.example.com/data")
        .then(r => r.json()),

    fetch("https://server3.example.com/data")
        .then(r => r.json())
]);

console.log(data);

Promise.any() trả về dữ liệu từ server đầu tiên phản hồi thành công.

Chỉ reject khi tất cả server đều thất bại.
