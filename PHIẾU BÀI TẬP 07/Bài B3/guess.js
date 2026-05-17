// Random số từ 1 đến 100
const randomNumber = Math.floor(Math.random() * 100) + 1


// Số lần đoán tối đa
const maxTurns = 7


// Đếm số lần đoán
let attempts = 0


// Lưu các số đã đoán
let guessedNumbers = []


// Biến kiểm tra thắng
let isWin = false


while (attempts < maxTurns) {

    // Nhập số
    let input = prompt(
        `Nhập số từ 1 đến 100\nCòn ${maxTurns - attempts} lượt`
    )

    // Chuyển sang number
    let guess = Number(input)

    // Validate input
    if (
        isNaN(guess) ||
        guess < 1 ||
        guess > 100
    ) {

        alert("Vui lòng nhập số từ 1 đến 100")

        continue
    }

    // Kiểm tra đoán trùng
    if (guessedNumbers.includes(guess)) {

        alert("Bạn đã đoán số này rồi!")

        continue
    }

    // Lưu số đã đoán
    guessedNumbers.push(guess)

    // Tăng lượt đoán
    attempts++

    // So sánh kết quả
    if (guess === randomNumber) {

        alert(
            `Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`
        )

        isWin = true

        break
    }
    else if (guess < randomNumber) {

        alert("Cao hơn")
    }
    else {

        alert("Thấp hơn")
    }
}


// Nếu thua
if (!isWin) {

    alert(
        `Bạn đã hết lượt!\nĐáp án là: ${randomNumber}`
    )
}
