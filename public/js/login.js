const $ = document.querySelector.bind(document);
const showPassBtn = $(".show-password");
const iconShow = '<i class="fa-regular fa-eye"></i>';
const iconHide = '<i class="fa-regular fa-eye-slash"></i>';
const passwordEle = $(".password");
const usernameEle = $(".username");
const rememberEle = $("#remember");

passwordEle.oninput = (e) => {
    e.target.value.length > 0
        ? (showPassBtn.style.display = "block")
        : (showPassBtn.style.display = "none");
};
showPassBtn.onclick = () => {
    showPassBtn.innerHTML == iconShow
        ? (showPassBtn.innerHTML = iconHide)
        : (showPassBtn.innerHTML = iconShow);
    passwordEle.type === "password"
        ? (passwordEle.type = "text")
        : (passwordEle.type = "password");
};

let inputPassword;
let inputUsername;
let isRemember = false;

const loginBtn = $(".login-btn");
passwordEle.onchange = (e) => (inputPassword = e.target.value);
usernameEle.onchange = (e) => (inputUsername = e.target.value);
rememberEle.onchange = (e) =>
    e.target.checked ? (isRemember = true) : (isRemember = false);

function saveLocalUser() {
    if (isRemember) {
        localStorage.setItem("username", inputUsername);
        localStorage.setItem("password", inputPassword);
    }
}

loginBtn.onclick = (e) => {
    // e.preventDefault();
    // saveLocalUser();
    // $(".login-form").submit();
};

// window.onload = () => {
//     const username = (localStorage.getItem("username"));
//     const password = (localStorage.getItem("password"));
//     if (
//         $(".text-fail")?.innerText == " You must be logged in" ||
//         !$(".text-fail")
//     ) {
//         if (username && password) {
//             usernameEle.value = username;
//             passwordEle.value = password;
//             $(".login-form").submit();
//         }
//     } else {
//         if (username && password) {
//             usernameEle.value = username;
//             passwordEle.value = password;
//         }
//     }
// };
