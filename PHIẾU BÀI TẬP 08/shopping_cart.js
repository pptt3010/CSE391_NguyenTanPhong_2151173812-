Bài B2 — Giỏ hàng (Shopping Cart)
function createCart() {
    let items = [];
    let discount = { type: null, value: 0 };

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);

            if (!item) return;

            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
            }
        },

        getTotal() {
            const subtotal = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            if (discount.type === "percent") {
                return subtotal * (1 - discount.value);
            }

            if (discount.type === "fixed") {
                return Math.max(0, subtotal - discount.value);
            }

            return subtotal;
        },

        applyDiscount(code) {
            switch (code) {
                case "SALE10":
                    discount = { type: "percent", value: 0.1 };
                    break;

                case "SALE20":
                    discount = { type: "percent", value: 0.2 };
                    break;

                case "FREESHIP":
                    discount = { type: "fixed", value: 30000 };
                    break;

                default:
                    discount = { type: null, value: 0 };
            }
        },

        printCart() {
            const table = items.map(item => ({
                "Sản phẩm": item.name,
                "SL": item.quantity,
                "Đơn giá": item.price.toLocaleString("vi-VN") + "đ",
                "Tổng": (item.price * item.quantity).toLocaleString("vi-VN") + "đ"
            }));

            console.table(table);

            console.log(
                "Tổng cộng:",
                this.getTotal().toLocaleString("vi-VN") + "đ"
            );
        },

        getItemCount() {
            return items.reduce(
                (total, item) => total + item.quantity,
                0
            );
        },

        clearCart() {
            items = [];
            discount = { type: null, value: 0 };
        }
    };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());

cart.removeItem(3);

console.log("Sau xóa:", cart.getItemCount());
