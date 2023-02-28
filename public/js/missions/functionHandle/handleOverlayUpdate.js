import { $ } from "../../main.js";

export default function handleOverlayUpdate(type) {
    if (type == "show") {
        $("#overlay-update-mission").classList.remove("hidden");
        $('.missions-content').classList.add('editing')
    } else if (type == "hidden") {
        $("#overlay-update-mission").classList.add("hidden");
        $('.missions-content').classList.remove('editing')
    }
}
