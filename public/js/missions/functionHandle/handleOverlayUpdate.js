import { $, $$ } from "../../main.js";

export default function handleOverlayUpdate(type, typeMission) {
    const isShow = type === "show";

    // $(`.${typeMission}-update-wrapper`).dataset.update = isShow && "yes";
    $("#overlay-update-mission").classList.toggle("hidden", !isShow);
    // disableFunctionItem(isShow);
    $(".missions-content").classList.toggle("editing", isShow);
}

function disableFunctionItem(disable) {
    $$(".function-item-2").forEach((element) => {
        element.classList.toggle("disabled", disable);
    });
}
