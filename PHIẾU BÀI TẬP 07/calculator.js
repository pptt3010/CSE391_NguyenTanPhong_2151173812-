function calculate(num1, operator, num2) {

    // Kiểm tra input có phải number không
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return "Lỗi: Input không phải số"
    }

    // Kiểm tra chia cho 0
    if (operator === "/" && num2 === 0) {
        return "Lỗi: Không thể chia cho 0"
    }

    // Xử lý operator
    switch (operator) {

        case "+":
            return num1 + num2

        case "-":
            return num1 - num2

        case "*":
            return num1 * num2

        case "/":
            return num1 / num2

        case "%":
            return num1 % num2

        case "**":
            return num1 ** num2

        default:
            return `Lỗi: Operator '${operator}' không hợp lệ`
    }
}
