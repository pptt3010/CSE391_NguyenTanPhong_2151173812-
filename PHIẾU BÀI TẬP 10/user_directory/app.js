const usersContainer = document.getElementById("users");
const loadingContainer = document.getElementById("loading");
const toast = document.getElementById("toast");

const form = document.getElementById("userForm");
const searchInput = document.getElementById("searchInput");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

let users = [];
let editingId = null;

const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);

        if (!response.ok) {
            throw new Error("Không tải được users");
        }

        return response.json();
    },

    async getUser(id) {
        const response = await fetch(
            `${this.baseURL}/users/${id}`
        );

        if (!response.ok) {
            throw new Error("Không tải được user");
        }

        return response.json();
    },

    async createUser(data) {
        const response = await fetch(
            `${this.baseURL}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error("Tạo user thất bại");
        }

        return response.json();
    },

    async updateUser(id, data) {
        const response = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error("Cập nhật thất bại");
        }

        return response.json();
    },

    async deleteUser(id) {
        const response = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Xóa thất bại");
        }

        return true;
    }
};

const ui = {
    renderUsers(data) {
        usersContainer.innerHTML = "";

        data.forEach(user => {
            const card = document.createElement("div");

            card.className = "user-card";

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>${user.email}</p>

                <button onclick="editUser(${user.id})">
                    Edit
                </button>

                <button onclick="deleteUser(${user.id})">
                    Delete
                </button>
            `;

            usersContainer.appendChild(card);
        });
    },

    showLoading() {
        loadingContainer.innerHTML = `
            <div class="loading">
                Đang tải dữ liệu...
            </div>
        `;
    },

    hideLoading() {
        loadingContainer.innerHTML = "";
    },

    showError(message) {
        toast.style.display = "block";
        toast.style.background = "red";
        toast.textContent = message;

        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    },

    showSuccess(message) {
        toast.style.display = "block";
        toast.style.background = "green";
        toast.textContent = message;

        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    }
};

async function loadUsers() {
    try {
        ui.showLoading();

        users = await api.getUsers();

        ui.renderUsers(users);

        ui.hideLoading();

    } catch (error) {
        ui.hideLoading();
        ui.showError(error.message);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: nameInput.value,
        email: emailInput.value
    };

    try {
        if (editingId) {
            const updatedUser =
                await api.updateUser(editingId, data);

            users = users.map(user =>
                user.id === editingId
                    ? { ...user, ...updatedUser }
                    : user
            );

            ui.showSuccess("Cập nhật thành công");

            editingId = null;

        } else {
            const newUser =
                await api.createUser(data);

            users.unshift({
                ...newUser,
                id: Date.now()
            });

            ui.showSuccess("Thêm thành công");
        }

        ui.renderUsers(users);

        form.reset();

    } catch (error) {
        ui.showError(error.message);
    }
});

async function editUser(id) {
    try {
        const user = await api.getUser(id);

        editingId = id;

        nameInput.value = user.name;
        emailInput.value = user.email;

    } catch (error) {
        ui.showError(error.message);
    }
}

async function deleteUser(id) {
    const confirmed = confirm(
        "Bạn có chắc muốn xóa?"
    );

    if (!confirmed) return;

    try {
        await api.deleteUser(id);

        users = users.filter(
            user => user.id !== id
        );

        ui.renderUsers(users);

        ui.showSuccess("Đã xóa user");

    } catch (error) {
        ui.showError(error.message);
    }
}

searchInput.addEventListener("input", () => {
    const keyword =
        searchInput.value.toLowerCase();

    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    );

    ui.renderUsers(filtered);
});

loadUsers();
