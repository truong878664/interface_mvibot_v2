import { $ } from "../../main.js";

export default function showAction() {
    const showActionSwitch = $("#check-show-action");
    showActionSwitch.addEventListener("change", handleShowAction);
}

function handleShowAction(e) {
    const isShow = e.target.checked;
    $("[data-action-step]").dataset.actionStep = isShow ? "show" : "hidden";
}
