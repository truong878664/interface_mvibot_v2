export default function showUpdateBtn(isShow, type) {
    $(`.update-wrapper-${type}`).classList.toggle("hidden", !isShow);
    $(`.add-wrapper-${type}`).classList.toggle("hidden", isShow);
}
