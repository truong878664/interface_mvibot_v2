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
