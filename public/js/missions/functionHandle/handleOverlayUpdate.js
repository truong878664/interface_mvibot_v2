import { $ } from "../../main.js";

export default function handleOverlayUpdate(type) {
    if (type == "show") {
        $("#overlay-update-mission").classList.remove("hidden");
    } else if (type == "hidden") {
        $("#overlay-update-mission").classList.add("hidden");
    }
}
