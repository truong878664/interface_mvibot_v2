import { $, $$ } from "../../main.js";

export default function handleOverlayUpdate(type) {
    if (type == "show") {
        $("#overlay-update-mission").classList.remove("hidden");
        $(".missions-content").classList.add("editing");
        disableFunctionItem(true)
    } else if (type == "hidden") {
        $("#overlay-update-mission").classList.add("hidden");
        $(".missions-content").classList.remove("editing");
        disableFunctionItem(false)
    }
}

function disableFunctionItem(disable) {
    if (disable) {
        $$(".function-item-2").forEach((element) => {
            element.classList.add("disabled");
        });
    } else {
        $$(".function-item-2").forEach((element) => {
            element.classList.remove("disabled");
        });
    }
}
