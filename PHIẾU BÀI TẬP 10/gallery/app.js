const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");

let page = 1;
let isLoading = false;

async function loadMorePhotos() {
    if (isLoading) return;

    isLoading = true;
    loading.style.display = "block";

    try {
        const response = await fetch(
            `https://picsum.photos/v2/list?page=${page}&limit=20`
        );

        const photos = await response.json();

        photos.forEach(photo => {
            const img = document.createElement("img");

            img.dataset.src = photo.download_url;
            img.alt = photo.author;

            img.addEventListener("click", () => {
                modal.style.display = "flex";
                modalImage.src = photo.download_url;
            });

            gallery.appendChild(img);

            imageObserver.observe(img);
        });

        page++;

    } catch (error) {
        console.error(error);

    } finally {
        isLoading = false;
        loading.style.display = "none";
    }
}

const imageObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                img.src = img.dataset.src;

                imageObserver.unobserve(img);
            }
        });
    },
    {
        threshold: 0.1
    }
);

const observer = new IntersectionObserver(
    entries => {
        if (entries[0].isIntersecting) {
            loadMorePhotos();
        }
    },
    {
        threshold: 1
    }
);

observer.observe(
    document.querySelector("#load-trigger")
);

modal.addEventListener("click", () => {
    modal.style.display = "none";
});

loadMorePhotos();
