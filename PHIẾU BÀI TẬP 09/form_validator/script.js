// form_validator/script.js
const nameInput = document.getElementById("name");
const nameStatus = document.getElementById("nameStatus");

const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const confirmInput = document.getElementById("confirmPassword");
const confirmError = document.getElementById("confirmError");

const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

const submitBtn = document.getElementById("submitBtn");

const form = document.getElementById("registerForm");

const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");
const userInfo = document.getElementById("userInfo");

let nameValid = false;
let emailValid = false;
let passwordValid = false;
let confirmValid = false;
let phoneValid = false;

nameInput.addEventListener("input", () => {
  const value = nameInput.value.trim();

  if(value.length >= 2 && value.length <= 50){
    nameStatus.textContent = "✅";
    nameValid = true;
  }else{
    nameStatus.textContent = "❌";
    nameValid = false;
  }

  checkForm();
});

emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(email === ""){
    emailError.textContent = "Email không được để trống";
    emailValid = false;
  }
  else if(!regex.test(email)){
    emailError.textContent = "Email không đúng định dạng";
    emailValid = false;
  }
  else{
    emailError.textContent = "";
    emailValid = true;
  }

  checkForm();
});

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  let strength = 0;

  if(password.length >= 8){
    strength++;
  }

  if(/[A-Za-z]/.test(password) && /\d/.test(password)){
    strength++;
  }

  if(/[a-z]/.test(password) &&
     /[A-Z]/.test(password) &&
     /\d/.test(password) &&
     /[^A-Za-z0-9]/.test(password)){
    strength++;
  }

  if(strength === 1){
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
    strengthText.textContent = "Yếu";
    passwordValid = false;
  }
  else if(strength === 2){
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
    strengthText.textContent = "Trung bình";
    passwordValid = true;
  }
  else if(strength === 3){
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    strengthText.textContent = "Mạnh";
    passwordValid = true;
  }
  else{
    strengthBar.style.width = "0%";
    strengthText.textContent = "";
    passwordValid = false;
  }

  checkConfirmPassword();
  checkForm();
});

confirmInput.addEventListener("input", () => {
  checkConfirmPassword();
  checkForm();
});

function checkConfirmPassword(){
  if(confirmInput.value === ""){
    confirmError.textContent = "";
    confirmValid = false;
  }
  else if(confirmInput.value !== passwordInput.value){
    confirmError.textContent = "Mật khẩu không khớp";
    confirmValid = false;
  }
  else{
    confirmError.textContent = "";
    confirmValid = true;
  }
}

phoneInput.addEventListener("input", () => {
  let numbers = phoneInput.value.replace(/\D/g, "");

  numbers = numbers.substring(0,10);

  if(numbers.length > 4 && numbers.length <= 7){
    numbers = numbers.replace(/(\d{4})(\d+)/, "$1-$2");
  }
  else if(numbers.length > 7){
    numbers = numbers.replace(/(\d{4})(\d{3})(\d+)/, "$1-$2-$3");
  }

  phoneInput.value = numbers;

  const pureNumber = numbers.replace(/\D/g, "");

  if(pureNumber.length !== 10){
    phoneError.textContent = "Số điện thoại phải đủ 10 số";
    phoneValid = false;
  }
  else{
    phoneError.textContent = "";
    phoneValid = true;
  }

  checkForm();
});

function checkForm(){
  submitBtn.disabled = !(
    nameValid &&
    emailValid &&
    passwordValid &&
    confirmValid &&
    phoneValid
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  userInfo.innerHTML = `
    <strong>Họ tên:</strong> ${nameInput.value}<br>
    <strong>Email:</strong> ${emailInput.value}<br>
    <strong>SĐT:</strong> ${phoneInput.value}
  `;

  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
