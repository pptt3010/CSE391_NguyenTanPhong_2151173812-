// keyboard_app/script.js
const images = [
  "https://picsum.photos/id/1015/700/400",
  "https://picsum.photos/id/1025/700/400",
  "https://picsum.photos/id/1035/700/400",
  "https://picsum.photos/id/1045/700/400",
  "https://picsum.photos/id/1055/700/400",
  "https://picsum.photos/id/1065/700/400",
  "https://picsum.photos/id/1075/700/400",
  "https://picsum.photos/id/1084/700/400",
  "https://picsum.photos/id/1080/700/400"
];

let currentIndex = 0;
let playing = false;
let slideInterval;

const galleryImage = document.getElementById("galleryImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

const overlay = document.getElementById("commandOverlay");
const commandInput = document.getElementById("commandInput");
const commandList = document.getElementById("commandList");
const openCommand = document.getElementById("openCommand");

const commands = [
  "Next Image",
  "Previous Image",
  "Play Slideshow",
  "Stop Slideshow",
  "Open Modal",
  "Close Modal"
];

function showImage(index){
  galleryImage.src = images[index];
  modalImage.src = images[index];
}

function nextImage(){
  currentIndex++;

  if(currentIndex >= images.length){
    currentIndex = 0;
  }

  showImage(currentIndex);
}

function prevImage(){
  currentIndex--;

  if(currentIndex < 0){
    currentIndex = images.length - 1;
  }

  showImage(currentIndex);
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

function startSlide(){
  slideInterval = setInterval(() => {
    nextImage();
  }, 2000);

  playing = true;
  playBtn.textContent = "Pause Slideshow";
}

function stopSlide(){
  clearInterval(slideInterval);

  playing = false;
  playBtn.textContent = "Play Slideshow";
}

playBtn.addEventListener("click", () => {
  if(playing){
    stopSlide();
  }else{
    startSlide();
  }
});

galleryImage.addEventListener("click", () => {
  modal.style.display = "flex";
});

document.addEventListener("keydown", (e) => {

  if(e.ctrlKey && e.key.toLowerCase() === "k"){
    e.preventDefault();

    overlay.style.display = "flex";

    commandInput.focus();

    renderCommands(commands);
  }

  if(e.key === "ArrowRight"){
    nextImage();
  }

  if(e.key === "ArrowLeft"){
    prevImage();
  }

  if(e.key >= "1" && e.key <= "9"){
    const index = Number(e.key) - 1;

    if(images[index]){
      currentIndex = index;
      showImage(currentIndex);
    }
  }

  if(e.code === "Space"){
    e.preventDefault();

    if(playing){
      stopSlide();
    }else{
      startSlide();
    }
  }

  if(e.key === "Escape"){
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  if(e.key === "Enter" && overlay.style.display === "flex"){
    const active = document.querySelector(".active");

    if(active){
      runCommand(active.textContent);
    }
  }

});

function renderCommands(data){

  commandList.innerHTML = "";

  data.forEach((item, index) => {

    const li = document.createElement("li");

    li.textContent = item;

    li.setAttribute("tabindex", "0");

    li.setAttribute("aria-label", item);

    if(index === 0){
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      runCommand(item);
    });

    commandList.appendChild(li);

  });

}

commandInput.addEventListener("input", () => {

  const keyword = commandInput.value.toLowerCase();

  const filtered = commands.filter(cmd =>
    cmd.toLowerCase().includes(keyword)
  );

  renderCommands(filtered);

});

function runCommand(command){

  if(command === "Next Image"){
    nextImage();
  }

  if(command === "Previous Image"){
    prevImage();
  }

  if(command === "Play Slideshow"){
    startSlide();
  }

  if(command === "Stop Slideshow"){
    stopSlide();
  }

  if(command === "Open Modal"){
    modal.style.display = "flex";
  }

  if(command === "Close Modal"){
    modal.style.display = "none";
  }

  overlay.style.display = "none";
}

openCommand.addEventListener("click", () => {

  overlay.style.display = "flex";

  commandInput.focus();

  renderCommands(commands);

});

showImage(currentIndex);
