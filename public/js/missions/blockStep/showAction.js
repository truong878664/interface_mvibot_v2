import { $ } from "../../main.js";

export default function showAction() {
    const showActionSwitch = $("#check-show-action");
    showActionSwitch.addEventListener("change", handleShowAction);

    const localIsShow = localStorage.getItem("isShowAction") * 1;
    actionShow(localIsShow);
    showActionSwitch.checked = localIsShow;
}

function handleShowAction(e) {
    const isShow = e.target.checked;
    localStorage.setItem("isShowAction", isShow * 1);
    actionShow(isShow);
}

function actionShow(isShow) {
    $("[data-action-step]").dataset.actionStep = isShow ? "show" : "hidden";
}
