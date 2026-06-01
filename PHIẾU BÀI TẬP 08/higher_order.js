Bài B3 — Higher-Order Functions Challenge

// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return function(value) {
        return fns.reduce((result, fn) => fn(result), value);
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));
// → "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);

        if (key in cache) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;

        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
// → "Đang tính..." → 499999500000

console.log(expensiveCalc(1000000));
// → 499999500000 (lấy từ cache)

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timer;

    return function(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Gọi liên tục → chỉ lần cuối mới chạy

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError;
}

// Ví dụ:
let count = 0;

retry(async () => {
    count++;

    if (count < 3) {
        throw new Error("Lỗi");
    }

    return "Thành công";
})
.then(console.log)
.catch(console.error);
```
