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


// const $ = document.querySelector.bind(document);
// const showPassBtn = $(".show-password");
// const iconShow = '<i class="fa-regular fa-eye"></i>';
// const iconHide = '<i class="fa-regular fa-eye-slash"></i>';
// const passwordEle = $(".password");
// const usernameEle = $(".username");
// const rememberEle = $("#remember");
// const loginForm = $(".login-form");
// const user = localStorage.getItem("user");

// if (user) {
//     const { username, password } = JSON.parse(user);
//     login({ username, password });
// }

// passwordEle.oninput = (e) => {
//     e.target.value.length > 0
//         ? (showPassBtn.style.display = "block")
//         : (showPassBtn.style.display = "none");
// };
// showPassBtn.onclick = () => {
//     showPassBtn.innerHTML == iconShow
//         ? (showPassBtn.innerHTML = iconHide)
//         : (showPassBtn.innerHTML = iconShow);
//     passwordEle.type === "password"
//         ? (passwordEle.type = "text")
//         : (passwordEle.type = "password");
// };

// $(".login-btn").onclick = (e) => {
//     e.preventDefault();
//     const dataLogin = {
//         username: usernameEle.value,
//         password: passwordEle.value,
//     };
//     if (rememberEle.checked) {
//         localStorage.setItem("user", JSON.stringify(dataLogin));
//     }
//     login(dataLogin);
// };

// function login({ username, password }) {
//     fetch("/check", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             username: username,
//             password: password,
//             _token: $("[name=_token]").value,
//         }),
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             if (data.logged) {
//                 window.location = "/";
//                 console.log(data);
//             } else {
//                 $(".text-message").textContent = data.message;
//                 console.log(data);
//             }
//         });
// }
