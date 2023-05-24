import { $, $$ } from "../../main.js";
import disableActionTypeMission from "./disableActionTypeMission.js";

export default function handleOverlayUpdate(type) {
    const isShow = type === "show";

    $("#overlay-update-mission").classList.toggle("hidden", !isShow);
    // $(".missions-content").classList.toggle("editing", isShow);
    // $$(".multi-btn").forEach((element) => {
    //     element.disabled = isShow;
    // });
    disableActionTypeMission({ disable: isShow });
}
