const globalLoading = document.getElementById("globalLoading");
const loadTime = document.getElementById("loadTime");
const refreshBtn = document.getElementById("refreshBtn");

function showWidgetLoading() {
    for (let i = 0; i < 3; i++) {
        document.getElementById(`widget-${i}`).innerHTML =
            `<p class="loading">Đang tải...</p>`;
    }
}

function renderWidget(index, data) {
    const widget = document.getElementById(`widget-${index}`);

    if (index === 0) {
        widget.innerHTML = `
            <h3>Random User</h3>
            <p><strong>${data.results[0].name.first} ${data.results[0].name.last}</strong></p>
            <p>${data.results[0].email}</p>
            <img src="${data.results[0].picture.medium}">
        `;
    }

    if (index === 1) {
        widget.innerHTML = `
            <h3>Weather</h3>
            <p>Nhiệt độ: ${data.current_weather.temperature}°C</p>
            <p>Tốc độ gió: ${data.current_weather.windspeed} km/h</p>
        `;
    }

    if (index === 2) {
        widget.innerHTML = `
            <h3>Random Dog</h3>
            <img
                src="${data.message}"
                style="width:100%;border-radius:8px;"
            >
        `;
    }
}

function renderWidgetError(index, message) {
    const widget = document.getElementById(`widget-${index}`);

    widget.innerHTML = `
        <p class="error">
            Lỗi: ${message}
        </p>
    `;
}

async function loadDashboard() {
    globalLoading.style.display = "block";

    showWidgetLoading();

    const startTime = Date.now();

    const results = await Promise.allSettled([
        fetch("https://randomuser.me/api/")
            .then(response => response.json()),

        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"
        ).then(response => response.json()),

        fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(
                index,
                result.reason.message
            );
        }
    });

    globalLoading.style.display = "none";

    loadTime.textContent =
        `Data loaded in ${Date.now() - startTime} ms`;
}

refreshBtn.addEventListener("click", () => {
    loadDashboard();
});

loadDashboard();
