const menu = [

    {
        name: "Phở bò",
        price: 65000,
        quantity: 2
    },

    {
        name: "Trà đá",
        price: 5000,
        quantity: 3
    },

    {
        name: "Bún chả",
        price: 55000,
        quantity: 1
    }

]


// Có tính tip hay không
const hasTip = true


// Ngày hiện tại
const currentDay = "Wednesday"


// Tổng tiền món ăn
let subtotal = 0


console.log("╔══════════════════════════════════════╗")
console.log("║         HÓA ĐƠN NHÀ HÀNG           ║")
console.log("╠══════════════════════════════════════╣")


for (let i = 0; i < menu.length; i++) {

    let item = menu[i]

    let total = item.price * item.quantity

    subtotal += total

    console.log(
        `║ ${i + 1}. ${item.name} x${item.quantity} @${item.price / 1000}k = ${total / 1000}k`
    )
}


// Tính giảm giá
let discountPercent = 0

if (subtotal > 1000000) {

    discountPercent = 15
}
else if (subtotal > 500000) {

    discountPercent = 10
}


// Giảm thêm thứ 4
if (currentDay === "Wednesday") {

    discountPercent += 5
}


// Tiền giảm
let discountAmount = subtotal * discountPercent / 100


// Sau giảm giá
let afterDiscount = subtotal - discountAmount


// VAT 8%
let vat = afterDiscount * 0.08


// Tip 5%
let tip = 0

if (hasTip) {

    tip = afterDiscount * 0.05
}


// Tổng thanh toán
let finalTotal = afterDiscount + vat + tip


console.log("╠══════════════════════════════════════╣")

console.log(
    `║ Tổng cộng: ${subtotal.toLocaleString()}đ`
)

console.log(
    `║ Giảm giá (${discountPercent}%): ${discountAmount.toLocaleString()}đ`
)

console.log(
    `║ VAT (8%): ${vat.toLocaleString()}đ`
)

console.log(
    `║ Tip (5%): ${tip.toLocaleString()}đ`
)

console.log("╠══════════════════════════════════════╣")

console.log(
    `║ THANH TOÁN: ${finalTotal.toLocaleString()}đ`
)

console.log("╚══════════════════════════════════════╝")
