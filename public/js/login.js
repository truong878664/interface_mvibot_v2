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
        document.cookie = `username = ${inputUsername}`;
        document.cookie = `password = ${inputPassword}`;
    }
}

loginBtn.onclick = (e) => {
    e.preventDefault();
    saveLocalUser();
    $(".login-form").submit();
};

// window.onload = () => {
//     if (
//         $(".text-fail")?.innerText == " You must be logged in" ||
//         !$(".text-fail")
//     ) {
//         if (getCookie("username") && getCookie("password")) {
//             usernameEle.value = getCookie("username");
//             passwordEle.value = getCookie("password");
//             $(".login-form").submit();
//         }
//     } else {
//         if (getCookie("username") && getCookie("password")) {
//             usernameEle.value = getCookie("username");
//             passwordEle.value = getCookie("password");
//         }
//     }
// };

// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == " ") {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// const deleteCookie = function (cname) {
//     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
// };
