const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weather = document.getElementById("weather");
const historyContainer = document.getElementById("history");

function showLoading() {
    loading.style.display = "block";
    weather.innerHTML = "";
    error.style.display = "none";
}

function showError(message) {
    loading.style.display = "none";
    error.style.display = "block";
    error.textContent = message;
}

function showWeather(data) {
    loading.style.display = "none";
    error.style.display = "none";

    const current = data.current_condition[0];

    weather.innerHTML = `
        <h2>${cityInput.value}</h2>
        <p>Nhiệt độ: ${current.temp_C}°C</p>
        <p>Độ ẩm: ${current.humidity}%</p>
        <p>Mô tả: ${current.weatherDesc[0].value}</p>
        <img src="${current.weatherIconUrl[0].value}" alt="weather">
    `;
}

async function fetchWeather(city) {
    try {
        showLoading();

        const response = await fetch(
            `https://wttr.in/${encodeURIComponent(city)}?format=j1`
        );

        if (!response.ok) {
            throw new Error("Không thể lấy dữ liệu");
        }

        const data = await response.json();

        if (!data.current_condition) {
            throw new Error("Không tìm thấy thành phố");
        }

        showWeather(data);

        saveHistory(city);

    } catch (err) {
        showError("Có lỗi xảy ra hoặc mất kết nối mạng");
    }
}

function saveHistory(city) {
    let history =
        JSON.parse(localStorage.getItem("weatherHistory")) || [];

    history = history.filter(item => item !== city);

    history.unshift(city);

    history = history.slice(0, 5);

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(history)
    );

    renderHistory();
}

function renderHistory() {
    const history =
        JSON.parse(localStorage.getItem("weatherHistory")) || [];

    historyContainer.innerHTML = "";

    history.forEach(city => {
        const div = document.createElement("div");

        div.className = "history-item";
        div.textContent = city;

        div.addEventListener("click", () => {
            cityInput.value = city;
            fetchWeather(city);
        });

        historyContainer.appendChild(div);
    });
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        return;
    }

    fetchWeather(city);
});

renderHistory();
